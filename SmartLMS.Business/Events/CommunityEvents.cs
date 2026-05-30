using MediatR;
using System;

namespace SmartLMS.Business.Events;

public record ResourceViewedEvent(int ResourceId, int? UserId, string? IpAddress) : INotification;

public record BookmarkAddedEvent(int ResourceId, int UserId) : INotification;
public record BookmarkRemovedEvent(int ResourceId, int UserId) : INotification;

public record RatingSubmittedEvent(int ResourceId, int UserId, int Score) : INotification;

public record CommentSubmittedEvent(int ResourceId, int UserId, string Content, int? ParentCommentId) : INotification;

public record ResourceReportedEvent(int ResourceId, int ReporterId, string Reason) : INotification;

public record ResourceSharedEvent(int ResourceId, int? UserId, string SharedVia, string? IpAddress) : INotification;
