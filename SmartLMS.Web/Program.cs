using Microsoft.EntityFrameworkCore;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;
using System.Text;
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("ApiLimit", limiterOptions =>
    {
        limiterOptions.PermitLimit = 100;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartLMS API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Vui lòng nhập Token theo định dạng: Bearer {token}",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        },
        new string[] { }
    }});
});

builder.Services.AddControllersWithViews(options => {
    options.Filters.Add<SmartLMS.Web.Filters.AuditLogFilter>();
})
    .AddJsonOptions(options => {
        // Hỗ trợ hiển thị đầy đủ ký tự tiếng Việt trong JSON
        options.JsonSerializerOptions.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
        // Đảm bảo thuộc tính trả về dạng camelCase chuẩn cho DataTables
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        // Chống lỗi vòng lặp tham chiếu cho EF Core Entities
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
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
    })
    .AddGoogle(options => {
        // Cấu hình SSO Google - Cần điền ClientId/Secret từ Google Cloud Console
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"] ?? "YOUR_GOOGLE_CLIENT_ID";
        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"] ?? "YOUR_GOOGLE_CLIENT_SECRET";
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"] ?? "Default_Secret_Key_For_SmartLMS_AI_2026"))
        };
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
builder.Services.AddScoped<SmartLMS.Business.IAssessmentService, SmartLMS.Business.AssessmentService>();
builder.Services.AddDistributedMemoryCache(); // Sẵn sàng để chuyển sang .AddStackExchangeRedisCache khi có Redis
builder.Services.AddMemoryCache(); // Vẫn giữ lại cho các library phụ trợ nếu cần

// Enterprise SaaS Core Services
builder.Services.AddSingleton(typeof(DinkToPdf.Contracts.IConverter), new DinkToPdf.SynchronizedConverter(new DinkToPdf.PdfTools()));
builder.Services.AddHttpClient<SmartLMS.Business.IZoomIntegrationService, SmartLMS.Business.ZoomIntegrationService>();
builder.Services.AddScoped<SmartLMS.Business.ICertificateService, SmartLMS.Business.CertificateService>();
builder.Services.AddScoped<SmartLMS.Business.IAffiliateService, SmartLMS.Business.AffiliateService>();
builder.Services.AddSingleton<SmartLMS.Business.IModerationService, SmartLMS.Business.ModerationService>();
builder.Services.AddSingleton<SmartLMS.Business.IScoringEngine, SmartLMS.Business.ScoringEngine>();
builder.Services.AddScoped<SmartLMS.Business.IWebhookService, SmartLMS.Business.WebhookService>();
builder.Services.AddScoped<SmartLMS.Business.IStorageService, SmartLMS.Business.S3StorageService>();
builder.Services.AddScoped<SmartLMS.Business.IPaymentGateway, SmartLMS.Business.VNPayGateway>();
builder.Services.AddScoped<SmartLMS.Business.IVideoTranscoderService, SmartLMS.Business.MockVideoTranscoderService>();
builder.Services.AddScoped<SmartLMS.Business.ISearchEngineService, SmartLMS.Business.MockElasticsearchService>();
builder.Services.AddScoped<SmartLMS.Business.MessageBus.IMessageBus, SmartLMS.Business.MessageBus.MockRabbitMQBus>();

// Real-time SignalR
builder.Services.AddSignalR();

// Email Service Config
builder.Services.Configure<SmartLMS.Models.SmtpSettings>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddScoped<SmartLMS.Business.IEmailService, SmartLMS.Business.EmailService>();

// Zoom & Integration Config
builder.Services.Configure<SmartLMS.Models.ZoomConfig>(builder.Configuration.GetSection("Zoom"));
builder.Services.AddHttpClient<SmartLMS.Business.IZoomIntegrationService, SmartLMS.Business.ZoomIntegrationService>();

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
app.UseMiddleware<SmartLMS.Web.Middlewares.ApiExceptionHandlerMiddleware>();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmartLMS API V1");
});

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseHttpMetrics(); // Đếm tổng Request, đếm Thời gian phản hồi, phân tích nút thắt cổ chai

app.UseCors("AllowAll");
app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

// Hangfire Dashboard (Hạn chế quyền Admin có thể cấu hình AuthorizationFilter sau)
app.UseHangfireDashboard("/hangfire");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Dashboard}/{action=Index}/{id?}");

app.MapMetrics(); // Mở cổng để Grafana hút dữ liệu

app.MapHub<SmartLMS.Web.Hubs.DashboardHub>("/dashboardHub");
app.MapHub<SmartLMS.Web.Hubs.GamificationHub>("/gamificationHub");

// Schedule Hangfire Recurring Job for ML retrain
RecurringJob.AddOrUpdate<SmartLMS.Business.IPredictionService>(
    "Weekly-Retrain-AI", 
    service => service.TrainModelAsync(), 
    Cron.Weekly(DayOfWeek.Sunday, 2));

app.Run();
