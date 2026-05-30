# Kế Hoạch Phát Triển Module: Thảo Luận & Tương Tác Tài Liệu (Resource Discussion Module)

> **Mục tiêu:** Tách biệt hoàn toàn phần bình luận, gợi ý AI và kiểm duyệt (Moderation) của kho tài nguyên thành một module độc lập (Decoupled Module). Giúp dễ dàng bảo trì, mở rộng quy mô (Scale) và có thể tái sử dụng cho các hệ thống khác (ví dụ: bình luận bài giảng, bình luận khóa học) trong tương lai.

---

## 1. Kiến Trúc Phân Lớp (Architecture Design)

Thay vì nhồi nhét mọi thứ vào `CommunityService` và `ResourceApiController`, chúng ta sẽ tách riêng thành các thành phần độc lập:

### 1.1. Tầng Dữ liệu (Database Models)
Các bảng này **đã có sẵn** trong `SmartLMSContext.cs`:
- `ResourceComment`: Hỗ trợ đa tầng qua `ParentCommentId` (Threaded Comments). Có cơ chế đếm `Upvotes`, cờ `IsPinned`, `IsDeleted`.
- `ResourceReport`: Hệ thống cờ báo cáo vi phạm nội dung (Spam, bản quyền).

### 1.2. Tầng Business Logic (Services)
Tạo mới Service chuyên biệt xử lý tương tác tài liệu:
- **Interface:** `SmartLMS.Business/IResourceDiscussionService.cs`
- **Implementation:** `SmartLMS.Business/ResourceDiscussionService.cs`
- *Nhiệm vụ:*
  - Build cây bình luận đa tầng (Comment Tree).
  - Quản lý logic Upvote/Downvote bình luận.
  - Xử lý logic ghim (Pin) bình luận của Tác giả/Admin.
  - Gửi dữ liệu qua ML.NET để phát hiện từ ngữ độc hại trước khi lưu (Tương lai).

### 1.3. Tầng API Controller (Web/API)
- **Controller:** `SmartLMS.Community/Controllers/ResourceDiscussionApiController.cs`
- *Endpoints dự kiến:*
  - `GET /api/ResourceDiscussion/{resourceId}`: Lấy danh sách bình luận (có phân trang, trả về dạng Tree).
  - `POST /api/ResourceDiscussion/{resourceId}`: Thêm bình luận mới / Trả lời bình luận (Reply).
  - `POST /api/ResourceDiscussion/comment/{commentId}/upvote`: Thả tim/Upvote.
  - `POST /api/ResourceDiscussion/{resourceId}/report`: Báo cáo tài liệu/bình luận vi phạm.

### 1.4. Tầng Giao diện (Frontend Component)
Thay vì code cứng HTML vào `Resources.cshtml`, chúng ta sẽ thiết kế một Component độc lập:
- Tạo file JavaScript riêng: `wwwroot/js/components/resource-discussion.js` (hoặc Alpine component độc lập) để tái sử dụng.
- **UI Layout:**
  - Tích hợp thành một Side Panel trượt ra từ cạnh phải, HOẶC nằm trong Panel bên cạnh của Premium PDF Viewer.
  - UI Giống Reddit/Facebook: Comment cha -> Danh sách Comment con -> Nút "Xem thêm reply".

---

## 2. Các Tính Năng Cốt Lõi (Core Features)

### Giai đoạn 1: Bình Luận Đa Tầng Cơ Bản (Core Discussion)
- [ ] Lấy danh sách bình luận (Nested JSON).
- [ ] Viết bình luận gốc.
- [ ] Trả lời bình luận (Reply to user).
- [ ] Tính năng Upvote bình luận.
- [ ] Tác giả tài liệu có quyền **Xóa** bình luận trong bài của mình.

### Giai đoạn 2: Quản Lý & Kiểm Duyệt (Moderation & Safety)
- [ ] Báo cáo vi phạm (Nút Cờ 🚩) cho tài liệu hoặc bình luận. User chọn lý do: *Spam, Nội dung không phù hợp, Vi phạm bản quyền*.
- [ ] Lưu báo cáo vào bảng `ResourceReport` với trạng thái "Pending".
- [ ] Trang Admin ẩn dành cho Moderator duyệt các báo cáo (Chấp nhận -> Xóa bài, Từ chối -> Bỏ qua).

### Giai đoạn 3: Tương Tác Nâng Cao & AI (Tương lai)
- [ ] Đính kèm hình ảnh/code snippet vào trong bình luận.
- [x] **AI Assistant Insight:** Nút "Hỏi AI về tài liệu này" -> RAG quét nội dung PDF và sinh câu trả lời trong khu vực bình luận.

---

## 3. Quy Trình Triển Khai Thực Tế

**Bước 1: Backend Foundation (Code C#)**
1. Khởi tạo `IResourceDiscussionService` và `ResourceDiscussionService`.
2. Đăng ký Dependency Injection trong `Program.cs`.
3. Tạo `ResourceDiscussionApiController` và định nghĩa các Route RESTful.

**Bước 2: UI Component (Frontend)**
1. Trong file `Resources.cshtml`, thiết kế cấu trúc UI cho khu vực bình luận ở bên phải màn hình PDF Viewer.
2. Viết Alpine.js/JS thuần để fetch cây bình luận đệ quy và render ra giao diện.

**Bước 3: Tích hợp & Kiểm thử**
1. Kiểm tra luồng thêm comment, reply comment.
2. Xác minh dữ liệu được lưu đúng `ParentCommentId` trong MariaDB.
3. Test API Report (Báo cáo vi phạm).

---
*Tài liệu này được định hướng phát triển tách bạch hoàn toàn để đảm bảo kiến trúc Clean Architecture, giúp dự án SmartLMS dễ dàng Scale lên hàng trăm ngàn lượt tương tác.*
