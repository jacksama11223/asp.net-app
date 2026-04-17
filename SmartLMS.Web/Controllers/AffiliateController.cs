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
}
