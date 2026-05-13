using Microsoft.AspNetCore.Mvc;
using SmartLMS.Business;
using System.Threading.Tasks;

namespace SmartLMS.Community.Controllers;

public class HomeController : Controller
{
    private readonly ICommunityService _communityService;

    public HomeController(ICommunityService communityService)
    {
        _communityService = communityService;
    }

    public async Task<IActionResult> Index()
    {
        var latestPosts = await _communityService.GetLatestPostsAsync(10);
        var upcomingEvents = await _communityService.GetUpcomingEventsAsync();
        var recentResources = await _communityService.GetRecentResourcesAsync();
        
        ViewBag.Events = upcomingEvents;
        ViewBag.Resources = recentResources;
        
        return View(latestPosts);
    }
}
