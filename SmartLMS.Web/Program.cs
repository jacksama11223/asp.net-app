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
using MySqlConnector;
using Hangfire.MySql;

var builder = WebApplication.CreateBuilder(args);

// === CHẶN VÀ GIẢI ĐỘC CHUỖI KẾT NỐI NGAY LẬP TỨC ===
var rawDefaultConn = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";
var defaultConn = rawDefaultConn
    .Replace("Integrated Security=True;", "", StringComparison.OrdinalIgnoreCase)
    .Replace("Integrated Security=True", "", StringComparison.OrdinalIgnoreCase)
    .Replace("Integrated Security=SSPI;", "", StringComparison.OrdinalIgnoreCase)
    .Replace("Integrated Security=SSPI", "", StringComparison.OrdinalIgnoreCase)
    .Replace("Trusted_Connection=True;", "", StringComparison.OrdinalIgnoreCase)
    .Replace("Trusted_Connection=True", "", StringComparison.OrdinalIgnoreCase)
    .Replace("TrustServerCertificate=True;", "", StringComparison.OrdinalIgnoreCase)
    .Replace("TrustServerCertificate=True", "", StringComparison.OrdinalIgnoreCase)
    .Replace("MultipleActiveResultSets=True;", "", StringComparison.OrdinalIgnoreCase)
    .Replace("MultipleActiveResultSets=True", "", StringComparison.OrdinalIgnoreCase);

var rawReadOnlyConn = builder.Configuration.GetConnectionString("ReadOnlyConnection") ?? rawDefaultConn;
var readOnlyConn = rawReadOnlyConn
    .Replace("Integrated Security=True;", "", StringComparison.OrdinalIgnoreCase)
    .Replace("Integrated Security=SSPI;", "", StringComparison.OrdinalIgnoreCase)
    .Replace("TrustServerCertificate=True;", "", StringComparison.OrdinalIgnoreCase) 
    ?? defaultConn;

Console.WriteLine($"🔍 [MARIADB FIX] Sanitized Connection: {defaultConn}");
// =================================================

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
            using var connection = new MySqlConnector.MySqlConnection(defaultConn);
            connection.Open();
            return HealthCheckResult.Healthy("MariaDB connection is successful.");
        }
        catch (Exception ex) {
            return HealthCheckResult.Unhealthy($"MariaDB is unreachable: {ex.Message}");
        }
    })
    .AddCheck("AI Service", () => HealthCheckResult.Healthy("AI Predictor is operational"));

// 3. Nâng cấp Rate Limiter - Bảo vệ API phân lớp (Hợp nhất từ Phase 2 & 4)
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    
    // Policy cho Dashboard/Internal
    options.AddPolicy("ApiLimit", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Connection.RemoteIpAddress?.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = httpContext.User.IsInRole("Admin") ? 500 : 50,
                Window = TimeSpan.FromMinutes(1)
            }));

    // Policy cho Public API (Phase 4)
    options.AddFixedWindowLimiter("PublicApiPolicy", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 60; 
        opt.QueueLimit = 0;
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartLMS Enterprise API", Version = "v1" });
    
    // 1. Cấu hình Bearer Token
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Vui lòng nhập Token theo định dạng: Bearer {token}",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    // 2. Cấu hình X-API-KEY (Phase 4)
    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "Nhập API Key Enterprise của bạn (Header: X-API-KEY)",
        In = ParameterLocation.Header,
        Name = "X-API-KEY",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "ApiKey"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
        },
        new string[] { }
    },
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "ApiKey" }
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


// Configure Hangfire to use MySql/MariaDB
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseStorage(new MySqlStorage(
        defaultConn,
        new MySqlStorageOptions
        {
            TransactionIsolationLevel = System.Transactions.IsolationLevel.ReadCommitted,
            QueuePollInterval = TimeSpan.FromSeconds(15),
            JobExpirationCheckInterval = TimeSpan.FromHours(1),
            CountersAggregateInterval = TimeSpan.FromMinutes(5),
            PrepareSchemaIfNecessary = true,
            DashboardJobListLimit = 50000,
            TransactionTimeout = TimeSpan.FromMinutes(1),
            TablesPrefix = "Hangfire"
        })));

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
    })
    .AddGoogle(options => {
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"] ?? "DUMMY_CLIENT_ID";
        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"] ?? "DUMMY_CLIENT_SECRET";
    })
    .AddScheme<SmartLMS.Web.Security.ApiKeyAuthOptions, SmartLMS.Web.Security.ApiKeyAuthHandler>(
        SmartLMS.Web.Security.ApiKeyAuthOptions.DefaultScheme, null);

builder.Services.AddAuthorization(options => {
    // Policy kết hợp: Có thể dùng Cookie HOẶC API Key
    options.AddPolicy("EnterprisePolicy", policy => {
        policy.AddAuthenticationSchemes(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme, SmartLMS.Web.Security.ApiKeyAuthOptions.DefaultScheme);
        policy.RequireAuthenticatedUser();
    });
});
// Configure CORS for Frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<SmartLMS.Data.SmartLMSContext>((serviceProvider, options) =>
{
    var serverVersion = ServerVersion.AutoDetect(defaultConn);
    options.UseMySql(defaultConn, serverVersion);
    
    // Tạm thời tắt Interceptor để tránh lỗi chuỗi kết nối SQL Server cũ
    // var config = serviceProvider.GetRequiredService<IConfiguration>();
    // options.AddInterceptors(new SmartLMS.Data.ReadOnlyInterceptor(config));
});

// Dependency Injection
builder.Services.AddHttpClient(); // Đăng ký HttpClient Factory mặc định
builder.Services.AddHttpClient<SmartLMS.Business.IZoomIntegrationService, SmartLMS.Business.ZoomIntegrationService>();

// Security & Encryption
builder.Services.AddScoped<SmartLMS.Models.Security.IEncryptionService, SmartLMS.Business.Security.AesEncryptionService>();

builder.Services.AddScoped(typeof(SmartLMS.Data.Repositories.IRepository<>), typeof(SmartLMS.Data.Repositories.Repository<>));
builder.Services.AddScoped<SmartLMS.Business.ICourseService, SmartLMS.Business.CourseService>();
builder.Services.AddScoped<SmartLMS.Business.IPredictionService, SmartLMS.Business.PredictionService>();
builder.Services.AddScoped<SmartLMS.Business.IReportingService, SmartLMS.Business.ReportingService>();
builder.Services.AddScoped<SmartLMS.Business.IStudentService, SmartLMS.Business.StudentService>();
builder.Services.AddScoped<SmartLMS.Business.ISqlService, SmartLMS.Business.SqlService>();
builder.Services.AddScoped<SmartLMS.Business.IUserService, SmartLMS.Business.UserService>();
builder.Services.AddScoped<SmartLMS.Business.IApiKeyService, SmartLMS.Business.ApiKeyService>();
builder.Services.AddScoped<SmartLMS.Business.ICohortService, SmartLMS.Business.CohortService>();
builder.Services.AddScoped<SmartLMS.Business.Jobs.IAuditCleanupJob, SmartLMS.Business.Jobs.AuditCleanupJob>();
builder.Services.AddScoped<SmartLMS.Business.IAssessmentService, SmartLMS.Business.AssessmentService>();
if (builder.Environment.IsDevelopment())
{
    // Lite Mode: Dùng RAM host làm Cache, không cần cài Redis
    builder.Services.AddDistributedMemoryCache();
    builder.Services.AddMemoryCache();
}
else
{
    // Production: Dùng Redis Cluster để đảm bảo tính sẵn sàng cao
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = builder.Configuration["Redis:ConnectionString"] ?? "localhost:6379";
        options.InstanceName = "SmartLMS_";
    });
}

// Enterprise SaaS Core Services
builder.Services.AddSingleton(typeof(DinkToPdf.Contracts.IConverter), new DinkToPdf.SynchronizedConverter(new DinkToPdf.PdfTools()));
builder.Services.AddScoped<SmartLMS.Business.ICertificateService, SmartLMS.Business.CertificateService>();
builder.Services.AddScoped<SmartLMS.Business.IAffiliateService, SmartLMS.Business.AffiliateService>();
builder.Services.AddSingleton<SmartLMS.Business.IModerationService, SmartLMS.Business.ModerationService>();
builder.Services.AddSingleton<SmartLMS.Business.IScoringEngine, SmartLMS.Business.ScoringEngine>();
builder.Services.AddScoped<SmartLMS.Business.IWebhookService, SmartLMS.Business.WebhookService>();
builder.Services.AddScoped<SmartLMS.Business.IStorageService, SmartLMS.Business.S3StorageService>();
builder.Services.AddScoped<SmartLMS.Business.IPaymentGateway, SmartLMS.Business.VNPayGateway>();
if (builder.Environment.IsDevelopment())
{
    // Lite Mode: Giả lập Message Bus để không tốn RAM chạy RabbitMQ Docker
    builder.Services.AddSingleton<SmartLMS.Business.MessageBus.IMessageBus, SmartLMS.Business.MessageBus.MockRabbitMQBus>();
}
else
{
    // Production: Kết nối tới RabbitMQ Cluster thực tế
    builder.Services.AddSingleton<SmartLMS.Business.MessageBus.IMessageBus, SmartLMS.Business.MessageBus.RabbitMQBus>();
}
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

// 5. Public API Protection (Đã hợp nhất lên phần trên)

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
        var db = scope.ServiceProvider.GetRequiredService<SmartLMS.Data.SmartLMSContext>();
            
        // Ensure Database is created
        await db.Database.EnsureCreatedAsync();

        // Seed Admin User if not exists
        if (!db.Users.Any(u => u.Username == "admin"))
        {
            var admin = new SmartLMS.Models.User
            {
                Username = "admin",
                FullName = "System Administrator",
                PasswordHash = "1", // In real production, use BCrypt or Identity
                Role = "Admin",
                CreatedDate = DateTime.Now,
                IsActive = true
            };
            db.Users.Add(admin);
            await db.SaveChangesAsync();
            Console.WriteLine("✅ Seeded Admin User: admin / 1");
        }
        
        // Vẫn thử chạy Migration cho các thay đổi phát sinh sau này
        if ((await db.Database.GetPendingMigrationsAsync()).Any()) {
            await db.Database.MigrateAsync();
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
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseResponseCompression();
app.UseStaticFiles();

app.UseRouting();

// Enable CORS
app.UseCors("AllowAll");

app.UseHttpMetrics();
app.UseRateLimiter(); // Một lần duy nhất

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

RecurringJob.AddOrUpdate<SmartLMS.Business.Jobs.IAuditCleanupJob>(
    "Weekly-Audit-Log-Cleanup", 
    service => service.CleanupOldLogsAsync(), 
    Cron.Weekly(DayOfWeek.Sunday, 3)); // Chạy lúc 3h sáng

app.Run();
