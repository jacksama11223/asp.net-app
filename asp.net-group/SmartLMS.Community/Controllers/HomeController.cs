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
        var latestPosts = await _communityService.GetLatestPostsAsync();
        var upcomingEvents = await _communityService.GetEventsAsync();
        var recentResources = await _communityService.GetResourcesAsync();
        
        ViewBag.Events = upcomingEvents;
        ViewBag.Resources = recentResources;
        
        return View(latestPosts);
    }
}
