using System;

namespace SmartLMS.Models;

public class CommissionRate
{
    public int CommissionRateId { get; set; }
    public string RoleName { get; set; } = "Instructor";
    public decimal Percentage { get; set; } = 70.0m; // Default 70% for instructor
    public bool IsActive { get; set; } = true;
}
