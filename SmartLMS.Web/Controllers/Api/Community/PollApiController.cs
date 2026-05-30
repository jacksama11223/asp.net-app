using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLMS.Web.Controllers.Api.Community
{
    [Route("api/community/polls")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PollApiController : ControllerBase
    {
        private readonly SmartLMSContext _context;

        public PollApiController(SmartLMSContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePoll([FromBody] Poll pollDto)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            var post = await _context.Posts.FindAsync(pollDto.PostId);
            if (post == null || post.AuthorId != userId)
                return Forbid("Chỉ tác giả bài viết mới được tạo khảo sát.");

            pollDto.CreatedAt = DateTime.Now;
            _context.Polls.Add(pollDto);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, pollId = pollDto.Id });
        }

        [HttpPost("{pollId}/vote")]
        public async Task<IActionResult> Vote(int pollId, [FromBody] int[] optionIds)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            var poll = await _context.Polls.Include(p => p.Options).FirstOrDefaultAsync(p => p.Id == pollId);
            if (poll == null) return NotFound("Poll not found");

            if (poll.ExpiresAt.HasValue && poll.ExpiresAt.Value < DateTime.Now)
                return BadRequest("Poll has expired.");

            if (!poll.IsMultipleChoice && optionIds.Length > 1)
                return BadRequest("This poll only allows a single choice.");

            // Remove existing votes by user for this poll
            var existingVotes = await _context.PollVotes
                .Include(v => v.PollOption)
                .Where(v => v.PollOption.PollId == pollId && v.UserId == userId)
                .ToListAsync();

            _context.PollVotes.RemoveRange(existingVotes);

            // Add new votes
            foreach (var optionId in optionIds)
            {
                if (poll.Options.Any(o => o.Id == optionId))
                {
                    _context.PollVotes.Add(new PollVote
                    {
                        PollOptionId = optionId,
                        UserId = userId,
                        VotedAt = DateTime.Now
                    });
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { success = true });
        }
    }
}
