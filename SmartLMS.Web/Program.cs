using Microsoft.EntityFrameworkCore;
using Hangfire;
using Hangfire.SqlServer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(options => {
    options.Filters.Add<SmartLMS.Web.Filters.AuditLogFilter>();
})
    .AddJsonOptions(options => {
        // Hỗ trợ hiển thị đầy đủ ký tự tiếng Việt trong JSON
        options.JsonSerializerOptions.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
        // Đảm bảo thuộc tính trả về dạng camelCase chuẩn cho DataTables
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// Configure Hangfire
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection"), new SqlServerStorageOptions
    {
        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.Zero,
        UseRecommendedIsolationLevel = true,
        DisableGlobalLocks = true
    }));

builder.Services.AddHangfireServer();

// Cấu hình Kestrel để dùng UTF-8 (mặc định nhưng ép kiểu để chắc chắn)
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
});

// Cookie Authentication
builder.Services.AddAuthentication(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => {
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.Cookie.Name = "SmartLMS_Auth";
    });

builder.Services.AddAuthorization();

builder.Services.AddDbContext<SmartLMS.Data.SmartLMSContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped(typeof(SmartLMS.Data.Repositories.IRepository<>), typeof(SmartLMS.Data.Repositories.Repository<>));
builder.Services.AddScoped<SmartLMS.Business.ICourseService, SmartLMS.Business.CourseService>();
builder.Services.AddScoped<SmartLMS.Business.IPredictionService, SmartLMS.Business.PredictionService>();
builder.Services.AddScoped<SmartLMS.Business.IReportingService, SmartLMS.Business.ReportingService>();
builder.Services.AddScoped<SmartLMS.Business.IStudentService, SmartLMS.Business.StudentService>();
builder.Services.AddScoped<SmartLMS.Business.ISqlService, SmartLMS.Business.SqlService>();
builder.Services.AddScoped<SmartLMS.Business.IUserService, SmartLMS.Business.UserService>();
builder.Services.AddScoped<SmartLMS.Business.ICohortService, SmartLMS.Business.CohortService>();

// Real-time SignalR
builder.Services.AddSignalR();

// Email Service
builder.Services.AddScoped<SmartLMS.Business.IEmailService, SmartLMS.Business.EmailService>();

var app = builder.Build();

// Seed Admin Account
using (var scope = app.Services.CreateScope())
{
    var userService = scope.ServiceProvider.GetRequiredService<SmartLMS.Business.IUserService>();
    var db = scope.ServiceProvider.GetRequiredService<SmartLMS.Data.SmartLMSContext>();
    var admin = await db.Users.FirstOrDefaultAsync(u => u.Username == "admin");
    if (admin != null && (string.IsNullOrEmpty(admin.PasswordHash) || admin.PasswordHash.Contains("X.X.X.")))
    {
        await userService.SetPasswordAsync(admin.UserId, "1");
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Hangfire Dashboard (Hạn chế quyền Admin có thể cấu hình AuthorizationFilter sau)
app.UseHangfireDashboard("/hangfire");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Dashboard}/{action=Index}/{id?}");

app.MapHub<SmartLMS.Web.Hubs.DashboardHub>("/dashboardHub");

app.Run();
