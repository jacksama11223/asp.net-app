using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public partial class Coupon
{
    public int CouponId { get; set; }

    public string Code { get; set; } = null!;

    public decimal DiscountAmount { get; set; }

    /// <summary>Fixed | Percentage</summary>
    public string? DiscountType { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime? CreatedAt { get; set; } = DateTime.Now;
}
