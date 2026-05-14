namespace SmartLMS.Models.Security;

public interface ICurrentUserService
{
    int? UserId { get; }
    string? Username { get; }
}
