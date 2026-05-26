using SmartLMS.Models;
using System.Collections.Generic;

namespace SmartLMS.Community.ViewModels;

public class ProfileViewModel
{
    public User User { get; set; } = null!;
    public List<Post> RecentPosts { get; set; } = new List<Post>();
    public List<UserBadge> Badges { get; set; } = new List<UserBadge>();
    public int TotalComments { get; set; }
}
