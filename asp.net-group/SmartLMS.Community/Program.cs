using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Business;
using SmartLMS.Models.Security;
using SmartLMS.Business.Security;
using Microsoft.AspNetCore.DataProtection;
using StackExchange.Redis;
using SmartLMS.Community.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

// 1. Database Configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SmartLMSContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.WebHost.UseUrls("http://*:8080");

// 2. Security & Identity
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<SmartLMS.Models.Security.IEncryptionService, SmartLMS.Business.Security.AesEncryptionService>();
builder.Services.AddScoped<ICommunityService, CommunityService>();
builder.Services.AddScoped<IForumService, ForumService>();

// 3. Redis Cache
var redisConnStr = builder.Configuration["Redis__ConnectionString"]
                ?? builder.Configuration["Redis:ConnectionString"]
                ?? "redis:6379";

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = redisConnStr;
    options.InstanceName = "SmartLMS_Community_";
});

// ════════════════════════════════════════════════════════════════
// 4. SHARED DATA PROTECTION (SSO KEY SHARING QUA REDIS)
//    Giúp Cookie ký bởi Backend (Port 5181) được Port 3080 nhận ra
// ════════════════════════════════════════════════════════════════
try
{
    var redisForDP = ConnectionMultiplexer.Connect(redisConnStr);
    builder.Services.AddDataProtection()
        .SetApplicationName("SmartLMS-AI")          // PHẢI khớp hoàn toàn với Backend
        .PersistKeysToStackExchangeRedis(redisForDP, "SmartLMS-DataProtection-Keys");
}
catch
{
    // Fallback: nếu Redis chưa sẵn sàng (môi trường dev local)
    builder.Services.AddDataProtection()
        .SetApplicationName("SmartLMS-AI");
}

// ════════════════════════════════════════════════════════════════
// 5. AUTHENTICATION - Cookie dùng chung với Backend
// ════════════════════════════════════════════════════════════════
builder.Services.AddAuthentication(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.Cookie.Name     = "SmartLMS_Auth"; // Phải khớp với Backend
        // Dùng chung domain để share session giữa Port 80 & 3080
        // Trong môi trường dev: để trống. Production: ".yourdomain.com"
        options.Cookie.Domain   = builder.Configuration["Auth__CookieDomain"] ?? "";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.LoginPath       = "/Auth/Login";   // Redirect khi chưa xác thực
        options.LogoutPath      = "/Auth/Logout";
        options.AccessDeniedPath = "/Auth/Login";
        options.ExpireTimeSpan  = TimeSpan.FromDays(7);
        options.SlidingExpiration = true;
    });

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseRouting();

// Thứ tự BẮT BUỘC: Authentication phải trước Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "auth",
    pattern: "Auth/{action=Login}",
    defaults: new { controller = "Auth" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();
app.MapHub<CommunityHub>("/hubs/community");

app.Run();
