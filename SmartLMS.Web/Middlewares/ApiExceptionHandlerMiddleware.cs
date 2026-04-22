using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace SmartLMS.Web.Middlewares;

public class ApiExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ApiExceptionHandlerMiddleware> _logger;

    public ApiExceptionHandlerMiddleware(RequestDelegate next, ILogger<ApiExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Đã xảy ra lỗi hệ thống (Unhandled Exception).");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        // Chỉ xử lý nếu URL là Endpoint của API
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.ContentType = "application/problem+json"; // Chuẩn RFC 7807
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var response = new
            {
                status = context.Response.StatusCode,
                message = "Đã xảy ra lỗi hệ thống. Vui lòng liên hệ Admin.", // Added for Frontend consistency
                title = "Lỗi Server Internal Error",
                detail = "Đã xảy ra lỗi không mong muốn trên hệ thống. Vui lòng liên hệ Admin.",
                type = "https://datatracker.ietf.org/doc/html/rfc7807",
                instance = context.Request.Path
            };

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
        
        // Nếu không phải API Request, throw lỗi để các Handler của MVC tiếp tục xử lý (Ví dụ: Trang lỗi 500 HTML)
        throw exception;
    }
}
