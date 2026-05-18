using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Business;

namespace SmartLMS.Web.Controllers;

[Authorize(Roles = "Admin")]
public class AffiliateController : Controller
{
    private readonly SmartLMSContext _context;
    private readonly IAffiliateService _affiliateService;

    public AffiliateController(SmartLMSContext context, IAffiliateService affiliateService)
    {
        _context = context;
        _affiliateService = affiliateService;
    }

    public IActionResult Index()
    {
        // Giả lập dữ liệu cho Dashboard
        ViewBag.QrCode = _affiliateService.GenerateQRCodeBase64("https://smartlms.ai/ref/admin");
        return View();
    }

    [HttpPost]
    public IActionResult GenerateLink()
    {
        var newLink = "https://smartlms.ai/ref/admin_" + System.Guid.NewGuid().ToString().Substring(0, 8);
        var qrCode = _affiliateService.GenerateQRCodeBase64(newLink);
        return Json(new { success = true, link = newLink, qr = qrCode });
    }
}
