namespace SmartLMS.Models;

public class DashboardStats
{
    public int TotalStudents { get; set; }
    public decimal AvgCompletionRate { get; set; }
    public decimal DropoutRiskRate { get; set; }
}

public class RecentActivityViewModel
{
    public string StudentName { get; set; }
    public string CourseName { get; set; }
    public double Progress { get; set; }
    public string RiskLevel { get; set; }
}
