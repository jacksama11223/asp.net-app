# Báo cáo Test Toàn Diện (Full Methods) API Community Hub (Port 3080)

> **Target:** http://141.253.114.218:3080
> **Lưu ý:** Các request POST/DELETE đều được gắn dữ liệu giả (Dummy Payload) và ID = 1. Nếu API trả về 400 (Bad Request), chứng tỏ API SỐNG nhưng từ chối dữ liệu giả (Chuẩn). Nếu trả về 500, API CHẾT (Crash C#).

| Method | Đường dẫn (Path) | Tên Hàm | HTTP Status | Kết quả thực tế |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/admin/moderation` | Moderation | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `POST` | `/admin/approve/1` | ApprovePost | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `POST` | `/admin/reject/1` | RejectPost | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `POST` | `/admin/approve-item` | ApproveItem | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `POST` | `/admin/reject-item` | RejectItem | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `POST` | `/api/AttachmentApi/upload` | Upload | `415` | ⚠️ Bad Request (SỐNG - Từ chối dữ liệu giả). |
| `GET` | `/api/AttachmentApi/view/1` | ViewAttachment | `404` | ❓ Lỗi 404: Endpoint không tồn tại hoặc ID=1 không có. |
| `GET` | `/api/AttachmentApi/metadata/1` | GetMetadata | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Auth` | Login | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/Auth` | Login | `400` | ⚠️ Bad Request (SỐNG - Từ chối dữ liệu giả). |
| `GET` | `/Auth` | Register | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/Auth` | Register | `400` | ⚠️ Bad Request (SỐNG - Từ chối dữ liệu giả). |
| `GET` | `/hub` | Index | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/post/new` | Create | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/hub/post/new` | SubmitPost | `500` | 💥 Lỗi 500: SERVER CRASH (Null Reference, Logic C#...). |
| `GET` | `/hub/post/1` | Details | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/hub/post/1/comment` | AddComment | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `POST` | `/hub/post/1/upvote` | Upvote | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `GET` | `/hub/resources` | Resources | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Resources` | Resources | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/resources/1` | ResourceDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Resources/1` | ResourceDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/events` | Events | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Events` | Events | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/events/1` | EventDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Events/1` | EventDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/members` | Members | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Members` | Members | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/qa` | QA | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/QA` | QA | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/qa/1` | QaDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/QA/1` | QaDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/groups` | Groups | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Groups` | Groups | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/groups/1` | GroupDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Groups/1` | GroupDetail | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/leaderboard` | Leaderboard | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Leaderboard` | Leaderboard | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/mentor` | Mentor | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Mentor` | Mentor | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/profile/me` | MyProfile | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `GET` | `/Community/Profile/Me` | MyProfile | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `GET` | `/hub/profile/1` | Profile | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/Community/Profile/1` | Profile | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/hub/messages` | Messages | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `GET` | `/Community/Messages` | Messages | `302` | 🔀 Redirect (SỐNG - Đá sang Login). |
| `POST` | `/hub/SimulateAiDraft` | SimulateAiDraft | `400` | ⚠️ Bad Request (SỐNG - Từ chối dữ liệu giả). |
| `POST` | `/hub/SimulateCompileSandbox` | SimulateCompileSandbox | `400` | ⚠️ Bad Request (SỐNG - Từ chối dữ liệu giả). |
| `POST` | `/hub/CompleteShareReward` | CompleteShareReward | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/api/seed-posts` | SeedPosts | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/api/chat/history` | GetChatHistory | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/api/EventApi` | GetEvents | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/api/EventApi/rsvp/1` | RSVPEvent | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/api/EventApi/create` | CreateEvent | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/api/EventApi/1/discussions` | GetEventDiscussions | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/api/EventApi/1/discussions` | CreateEventDiscussion | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/api/GroupApi` | GetGroups | `500` | 💥 Lỗi 500: SERVER CRASH (Null Reference, Logic C#...). |
| `POST` | `/api/GroupApi/join/1` | JoinGroup | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/api/GroupApi/create` | CreateGroup | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/api/GroupApi/1/posts` | GetGroupPosts | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/api/GroupApi/1/posts` | CreatePost | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/api/LeaderboardApi` | GetLeaderboard | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/api/LeaderboardApi/me` | GetMyRank | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/api/NotificationApi` | GetNotifications | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/api/NotificationApi/unread-count` | GetUnreadCount | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/api/NotificationApi/1/read` | MarkAsRead | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/api/NotificationApi/read-all` | MarkAllAsRead | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/api/QaApi/questions` | GetQuestions | `500` | 💥 Lỗi 500: SERVER CRASH (Null Reference, Logic C#...). |
| `POST` | `/api/QaApi/questions` | AskQuestion | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/api/QaApi/questions/1/answers` | AddAnswer | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/api/RatingApi` | RateUser | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `GET` | `/CommunityApi/ResourceApi` | GetResources | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/CommunityApi/ResourceApi` | UploadResource | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceApi/1/bookmark` | BookmarkResource | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceApi/1/rate` | RateResource | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceApi/1/view` | ViewResource | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/CommunityApi/ResourceApi/1/download` | DownloadResource | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `GET` | `/CommunityApi/ResourceDiscussion/1/comments` | GetComments | `200` | ✅ Trả về dữ liệu thành công (SỐNG). |
| `POST` | `/CommunityApi/ResourceDiscussion/1/comments` | PostComment | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceDiscussion/comments/1/upvote` | UpvoteComment | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `DELETE` | `/CommunityApi/ResourceDiscussion/comments/1` | DeleteComment | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceDiscussion/1/report` | ReportResource | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceInteraction/1/view` | RecordView | `500` | 💥 Lỗi 500: SERVER CRASH (Null Reference, Logic C#...). |
| `POST` | `/CommunityApi/ResourceInteraction/1/bookmark` | ToggleBookmark | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceInteraction/1/rate` | SubmitRating | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |
| `POST` | `/CommunityApi/ResourceInteraction/1/share` | RecordShare | `500` | 💥 Lỗi 500: SERVER CRASH (Null Reference, Logic C#...). |
| `POST` | `/api/ShareApi/share` | ShareContent | `401` | 🔒 Yêu cầu Đăng nhập (SỐNG - Chuẩn bảo mật). |

---
**Thống kê:**
- Tổng số API đã test: **87**
- Số lượng API bị Crash (500): **5**

⚠️ **Cảnh báo Đỏ:** Hệ thống đang có 5 điểm mù gây sập Server. Cần ưu tiên kiểm tra try-catch và Dependency Injection ở các API này!
