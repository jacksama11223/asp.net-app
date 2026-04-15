using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLMS.Data;
using SmartLMS.Models;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace SmartLMS.Web.Controllers;

public class CouponController : Controller
{
    private readonly SmartLMSContext _context;

    public CouponController(SmartLMSContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var coupons = await _context.Coupons.OrderByDescending(c => c.CreatedAt).ToListAsync();
        return View(coupons);
    }

    [HttpGet]
    public IActionResult Create()
    {
        return View(new Coupon { ExpiryDate = DateTime.Now.AddMonths(1) });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Coupon coupon)
    {
        if (ModelState.IsValid)
        {
            coupon.CreatedAt = DateTime.Now;
            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(coupon);
    }

    [HttpPost]
    public async Task<IActionResult> Delete(int id)
    {
        var coupon = await _context.Coupons.FindAsync(id);
        if (coupon != null)
        {
            _context.Coupons.Remove(coupon);
            await _context.SaveChangesAsync();
        }
        return Json(new { success = true });
    }
}
