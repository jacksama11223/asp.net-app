using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Business;
using SmartLMS.Models.Security;
using SmartLMS.Business.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

// 1. Database Configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SmartLMSContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.WebHost.UseUrls("http://*:8080");

// 2. Security & Identity - Đồng bộ với dự án chính
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<SmartLMS.Models.Security.IEncryptionService, SmartLMS.Business.Security.AesEncryptionService>();
builder.Services.AddScoped<ICommunityService, CommunityService>();

// 3. Redis Cache
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:ConnectionString"];
    options.InstanceName = "SmartLMS_Community_";
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// BỎ HttpsRedirection vì Nginx đã xử lý SSL
// app.UseHttpsRedirection(); 

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();

app.Run();
