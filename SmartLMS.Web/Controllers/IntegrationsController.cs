using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class IntegrationsController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
