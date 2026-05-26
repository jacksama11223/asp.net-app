using Microsoft.AspNetCore.Mvc;
using SmartLMS.Models;
using System.Diagnostics;

namespace SmartLMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MentorApiController : ControllerBase
    {
        // Thực tế sẽ Inject IOpenAiService hoặc IGeminiService vào đây
        public MentorApiController()
        {
        }

        [HttpPost("ask")]
        public async Task<IActionResult> AskMentor([FromBody] AiMentorRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid request");

            var sw = Stopwatch.StartNew();

            // GIẢ LẬP XỬ LÝ AI (Mocking logic cho demo, sẽ thay bằng gọi API thật)
            await Task.Delay(1500); // Giả lập độ trễ của AI Model

            var responseText = $"Xin chào học viên! Bạn vừa hỏi về: '{request.Message}'.\n\n" +
                               "Đây là phản hồi từ AI System của SmartLMS. Để tích hợp thật, " +
                               "cần điền API_KEY của OpenAI/Gemini vào biến môi trường Backend (Port 5181).";

            if (request.Message.ToLower().Contains("ef core"))
            {
                responseText = "EF Core (Entity Framework Core) là một ORM hiện đại của Microsoft. Lỗi Tracking behavior thường xảy ra khi bạn truy vấn AsNoTracking() nhưng lại cố gọi db.SaveChanges() trên Entity đó.";
            }

            sw.Stop();

            var aiResponse = new AiMentorResponse
            {
                Success = true,
                ResponseMessage = responseText,
                ProcessingTime = $"{sw.ElapsedMilliseconds}ms",
                ModelUsed = "SmartLMS-Local-Mock"
            };

            return Ok(aiResponse);
        }
    }
}
