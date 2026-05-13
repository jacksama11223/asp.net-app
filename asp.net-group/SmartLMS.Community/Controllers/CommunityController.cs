using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using SmartLMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartLMS.Community.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommunityController : ControllerBase
{
    private readonly ICommunityService _communityService;

    public CommunityController(ICommunityService communityService)
    {
        _communityService = communityService;
    }

    [HttpGet("posts/latest")]
    public async Task<ActionResult<IEnumerable<Post>>> GetLatestPosts(int count = 10)
    {
        var posts = await _communityService.GetLatestPostsAsync(count);
        return Ok(posts);
    }

    [HttpGet("events/upcoming")]
    public async Task<ActionResult<IEnumerable<CommunityEvent>>> GetUpcomingEvents()
    {
        var events = await _communityService.GetUpcomingEventsAsync();
        return Ok(events);
    }

    [HttpGet("resources/recent")]
    public async Task<ActionResult<IEnumerable<CommunityResource>>> GetRecentResources()
    {
        var resources = await _communityService.GetRecentResourcesAsync();
        return Ok(resources);
    }

    [HttpPost("posts")]
    public async Task<ActionResult<Post>> CreatePost([FromBody] Post post)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var createdPost = await _communityService.CreatePostAsync(post);
        return CreatedAtAction(nameof(GetLatestPosts), new { id = createdPost.PostId }, createdPost);
    }
}
