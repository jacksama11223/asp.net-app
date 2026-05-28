using System;
using System.Collections.Generic;

namespace SmartLMS.Models;

public class StudyGroup
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int LeaderId { get; set; }
    public User? Leader { get; set; }
    public int ProgressPercentage { get; set; }
    public int EXP { get; set; }
    public bool IsPrivate { get; set; }
    public bool IsApproved { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<StudyGroupMember> Members { get; set; } = new List<StudyGroupMember>();
}

public class StudyGroupMember
{
    public int GroupId { get; set; }
    public StudyGroup? Group { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string Role { get; set; } = "Member"; // Leader, Member
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}

public class CommunityQuestion
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string AttachmentIds { get; set; } = string.Empty;
    public int AuthorId { get; set; }
    public User? Author { get; set; }
    public string Status { get; set; } = "Unsolved"; // Solved, Unsolved
    public int? BestAnswerId { get; set; }
    public bool IsApproved { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<CommunityAnswer> Answers { get; set; } = new List<CommunityAnswer>();
}

public class CommunityAnswer
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public CommunityQuestion? Question { get; set; }
    public string Content { get; set; } = string.Empty;
    public string AttachmentIds { get; set; } = string.Empty;
    public int AuthorId { get; set; }
    public User? Author { get; set; }
    public bool IsVerified { get; set; } // Expert verified
    public int Votes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
