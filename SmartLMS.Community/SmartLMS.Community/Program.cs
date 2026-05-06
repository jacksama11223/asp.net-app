using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Business;

var builder = WebApplication.CreateCollection(); // Wait, mistake here

// Fix it:
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var serverVersion = ServerVersion.AutoDetect(connectionString);

builder.Services.AddDbContext<SmartLMSContext>(options =>
    options.UseMySql(connectionString, serverVersion));

// Shared Services
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped(typeof(SmartLMS.Data.Repositories.IRepository<>), typeof(SmartLMS.Data.Repositories.Repository<>));

// AWS S3 (Dummy for now to avoid crash)
var awsAccessKey = builder.Configuration["AWS:AccessKey"];
var awsSecretKey = builder.Configuration["AWS:SecretKey"];
var awsRegion = builder.Configuration["AWS:Region"] ?? "us-east-1";

builder.Services.AddSingleton<Amazon.S3.IAmazonS3>(new Amazon.S3.AmazonS3Client(
    new Amazon.Runtime.BasicAWSCredentials(awsAccessKey, awsSecretKey), 
    Amazon.RegionEndpoint.GetBySystemName(awsRegion)));

builder.Services.AddScoped<IStorageService, S3StorageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
