# 🗺️ Chiến lược triển khai Group Learning Hub - SmartLMS.AI

## 1. Tầm nhìn dự án
Xây dựng một phân hệ cộng đồng (Community) tích hợp sâu vào hệ thống SmartLMS hiện tại, cho phép người dùng trao đổi, chia sẻ tài nguyên và tổ chức sự kiện thời gian thực.

## 2. Kiến trúc Kỹ thuật (Technical Stack)
Tuân thủ cấu trúc **Modular Monolith** hiện tại để đảm bảo tính đồng nhất:
- **Core Framework:** ASP.NET Core 8.0 (Sử dụng chung Solution `SmartLMS.sln`).
- **Real-time:** **SignalR** cho Forum và thông báo nhảy (Real-time notifications).
- **ORM:** Entity Framework Core (Tích hợp vào `SmartLMS.Data`).
- **UI:** Razor Pages kết hợp Tailwind CSS để đạt được độ bóng bẩy như Mockup.
- **Communication:** Sử dụng `IMediator` để giao tiếp với các module khác (Courses, Users).

## 3. Cấu trúc thư mục mới
Toàn bộ code phân hệ này sẽ nằm trong thư mục: `c:\code\asp.net\asp.net-group\` (Tên Project: `SmartLMS.Community`).

## 4. Các tính năng cốt lõi (Theo Mockup)
### A. Discussion Forum (Diễn đàn thảo luận)
- Đăng bài (Markdown support), Tagging (Python, Beginner, etc.).
- Phân luồng bình luận và đếm số lượng reply.
- Sắp xếp theo: Mới nhất, Phổ biến nhất.

### B. Resource Sharing (Kho tài nguyên)
- Upload/Download Ebook, Cheatsheet.
- Phân quyền theo khóa học (Chỉ học viên lớp Python mới thấy tài liệu Python).

### C. Event Listing & Member Directory
- Danh sách sự kiện sắp tới (Zoom/Google Meet links).
- Danh sách thành viên đang hoạt động (Active Members) sử dụng SignalR để track trạng thái online.

## 5. Kế hoạch triển khai (Phase 1)
1. **Database Schema:** Thêm các bảng `Posts`, `Comments`, `CommunityEvents`, `Resources`.
2. **Project Setup:** Khởi tạo project `SmartLMS.Community` trong folder `asp.net-group`.
3. **Internal Integration:** Cấu hình liên kết với `SmartLMS.Business` và `SmartLMS.Data`.
4. **Nginx Routing:** Cấu hình Nginx để điều hướng `/community` sang phân hệ mới.

---
*Tài liệu được lập bởi Antigravity AI - Tuân thủ hiến pháp AGENTS.md.*
