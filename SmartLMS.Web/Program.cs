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
using Serilog;
using Serilog.Events;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình Serilog - Ghi log cấu trúc cho Production
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/smartlms-.log", rollingInterval: RollingInterval.Day, outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

builder.Host.UseSerilog();

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

// 2. Cấu hình Health Checks - Giám sát sức khỏe hạ tầng
builder.Services.AddHealthChecks()
    .AddCheck("Database", () => {
        try {
            using var connection = new Microsoft.Data.SqlClient.SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            return HealthCheckResult.Healthy("Database connection is successful.");
        }
        catch (Exception ex) {
            return HealthCheckResult.Unhealthy($"Database is unreachable: {ex.Message}");
        }
    })
    .AddCheck("AI Service", () => HealthCheckResult.Healthy("AI Predictor is operational"));

// 3. Nâng cấp Rate Limiter - Bảo vệ API phân lớp
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    
    options.AddPolicy("ApiLimit", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Connection.RemoteIpAddress?.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = httpContext.User.IsInRole("Admin") ? 500 : 50, // Ưu tiên Admin
                Window = TimeSpan.FromMinutes(1)
            }));
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
        options.JsonSerializerOptions.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Configure Hangfire
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHangfireServer();

// Cookie Authentication
builder.Services.AddAuthentication(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => {
        options.LoginPath = "/Account/Login";
        options.Cookie.Name = "SmartLMS_Auth";
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

// Dependency Injection
builder.Services.AddHttpClient(); // Đăng ký HttpClient Factory mặc định
builder.Services.AddHttpClient<SmartLMS.Business.IZoomIntegrationService, SmartLMS.Business.ZoomIntegrationService>();

builder.Services.AddScoped(typeof(SmartLMS.Data.Repositories.IRepository<>), typeof(SmartLMS.Data.Repositories.Repository<>));
builder.Services.AddScoped<SmartLMS.Business.ICourseService, SmartLMS.Business.CourseService>();
builder.Services.AddScoped<SmartLMS.Business.IPredictionService, SmartLMS.Business.PredictionService>();
builder.Services.AddScoped<SmartLMS.Business.IReportingService, SmartLMS.Business.ReportingService>();
builder.Services.AddScoped<SmartLMS.Business.IStudentService, SmartLMS.Business.StudentService>();
builder.Services.AddScoped<SmartLMS.Business.ISqlService, SmartLMS.Business.SqlService>();
builder.Services.AddScoped<SmartLMS.Business.IUserService, SmartLMS.Business.UserService>();
builder.Services.AddScoped<SmartLMS.Business.ICohortService, SmartLMS.Business.CohortService>();
builder.Services.AddScoped<SmartLMS.Business.IAssessmentService, SmartLMS.Business.AssessmentService>();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddMemoryCache();

// Enterprise SaaS Core Services
builder.Services.AddSingleton(typeof(DinkToPdf.Contracts.IConverter), new DinkToPdf.SynchronizedConverter(new DinkToPdf.PdfTools()));
builder.Services.AddScoped<SmartLMS.Business.ICertificateService, SmartLMS.Business.CertificateService>();
builder.Services.AddScoped<SmartLMS.Business.IAffiliateService, SmartLMS.Business.AffiliateService>();
builder.Services.AddSingleton<SmartLMS.Business.IModerationService, SmartLMS.Business.ModerationService>();
builder.Services.AddSingleton<SmartLMS.Business.IScoringEngine, SmartLMS.Business.ScoringEngine>();
builder.Services.AddScoped<SmartLMS.Business.IWebhookService, SmartLMS.Business.WebhookService>();
builder.Services.AddScoped<SmartLMS.Business.IStorageService, SmartLMS.Business.S3StorageService>();
builder.Services.AddScoped<SmartLMS.Business.IPaymentGateway, SmartLMS.Business.VNPayGateway>();
builder.Services.AddSingleton<SmartLMS.Business.MessageBus.IMessageBus, SmartLMS.Business.MessageBus.RabbitMQBus>();
builder.Services.AddHostedService<SmartLMS.Business.Handlers.AssessmentEventHandler>();
builder.Services.AddSignalR();

builder.Services.Configure<SmartLMS.Models.SmtpSettings>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddScoped<SmartLMS.Business.IEmailService, SmartLMS.Business.EmailService>();

// 4. Tối ưu hóa hiệu năng (High-Concurrency Support)
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<Microsoft.AspNetCore.ResponseCompression.BrotliCompressionProvider>();
    options.Providers.Add<Microsoft.AspNetCore.ResponseCompression.GzipCompressionProvider>();
});

builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => builder.Cache().Expire(TimeSpan.FromSeconds(60)));
    options.AddPolicy("CourseCache", builder => builder.Expire(TimeSpan.FromSeconds(120)).Tag("Courses"));
});

// Cấu hình Forwarded Headers để xử lý SSL/HTTPS từ Cloudflare/Proxy

// Cấu hình Forwarded Headers để xử lý SSL/HTTPS từ Cloudflare/Proxy
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    // Vì chạy trong Docker/Proxy nên cần tin tưởng mọi mạng để giải quyết lỗi Mixed Content
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

var app = builder.Build();

// 4. Auto-Migration & Seed Admin - Chuẩn bị cho Docker rỗng
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try 
    {
        var db = services.GetRequiredService<SmartLMS.Data.SmartLMSContext>();
        
        // Đảm bảo Database được tạo nếu chạy lần đầu trong Docker
        await db.Database.EnsureCreatedAsync(); 
        
        // Vẫn thử chạy Migration cho các thay đổi phát sinh sau này
        if ((await db.Database.GetPendingMigrationsAsync()).Any()) {
            await db.Database.MigrateAsync();
        }

        // Kiểm tra và Seed Admin một cách an toàn
        var userService = services.GetRequiredService<SmartLMS.Business.IUserService>();
        var admin = await db.Users.FirstOrDefaultAsync(u => u.Username == "admin");
        if (admin != null && (string.IsNullOrEmpty(admin.PasswordHash) || admin.PasswordHash.Contains("X.X.X.")))
        {
            await userService.SetPasswordAsync(admin.UserId, "1");
            logger.LogInformation("Admin password has been reset to default.");
        }
    }
    catch (Exception ex) 
    {
        logger.LogError(ex, "Lỗi trong quá trình khởi tạo hệ thống (Database/Seed)");
    }
}

// Configure the HTTP request pipeline.
app.UseForwardedHeaders(); // Phải đặt đầu tiên để các middleware sau nhận diện đúng HTTPS
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
app.UseResponseCompression();
app.UseOutputCache();
app.UseStaticFiles();

app.UseSerilogRequestLogging(); 

app.UseRouting();
app.UseHttpMetrics();
app.UseCors("AllowAll");
app.UseRateLimiter(); // Phải đặt trước Authentication để chặn sớm

app.UseAuthentication();
app.UseAuthorization();

app.MapHealthChecks("/health"); // Cổng giám sát cho Docker/K8s

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
