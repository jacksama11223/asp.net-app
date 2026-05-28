# Báo cáo Điều tra & Kế hoạch Fix Lỗi SmartLMS.Community (Port 3080)

Theo yêu cầu của bạn, tôi đã tiến hành "mổ xẻ" toàn bộ từ Front-end (HTML/JS) đến Back-end (API, Database) của dự án `SmartLMS.Community`. Dưới đây là kết quả kiểm tra chuyên sâu và kế hoạch sửa chữa:

---

## 🔬 Kết quả Kiểm tra Database & Models
Tôi đã vào tận lõi `SmartLMS.Models` và `SmartLMSContext.cs` để kiểm tra. Tin vui là **Cơ sở dữ liệu đã chuẩn bị sẵn sàng toàn bộ**:
- Bảng Hỏi Đáp: Đã có class `CommunityQuestion` và `CommunityAnswer`. Đã map vào DB.
- Bảng Nhóm học: Đã có class `StudyGroup` và `StudyGroupMember`. Đã map vào DB.
- Bảng Sự kiện: Đã có class `CommunityEvent` và `EventParticipant`. Đã map vào DB.
👉 **Kết luận:** Database và Models đã hoàn thiện 100%, không cần phải sửa gì ở tầng Database. Vấn đề chỉ nằm ở Front-end và API.

---

## 1. Lỗi trang Hỏi Đáp (QA) không đăng được câu hỏi
**Tình trạng Backend:** API `POST /api/QaApi/questions` **ĐÃ TỒN TẠI** và hoạt động tốt. Có hỗ trợ bắn thông báo SignalR ra ngoài trang chủ khi có câu hỏi mới.
**Root Cause (Frontend):** 
- Nút "Đăng câu hỏi" đang tìm kiếm dữ liệu qua ID (VD: `qa-title`), nhưng trong mã HTML của file `QA.cshtml`, các thẻ `<input>` lại quên khai báo thuộc tính `id`.
**Kế hoạch Fix:** Chỉ cần thêm `id="qa-title"`, `id="qa-content"` vào HTML. QA sẽ lập tức sống lại và đẩy bài viết ra ngoài hệ thống thành công!

## 2. Lỗi Yêu cầu tạo Nhóm (Groups) không gửi đến Admin
**Tình trạng Backend:** Controller `GroupApiController.cs` hiện tại **CHỈ CÓ** API Xin vào nhóm (`JoinGroup`). Nó **chưa hề được viết API** để Tạo nhóm mới (`CreateGroup`).
**Root Cause (Frontend):** 
- Nút "Xác nhận Tạo Nhóm" trong `Groups.cshtml` được code "Fake". Nó chỉ làm đúng 2 việc là **ẩn form đi** và **hiện thông báo ảo**. Nó KHÔNG hề gọi lệnh `fetch` nào để gửi dữ liệu về Backend.
- Vì Frontend không gửi, và Backend cũng không có cổng để nhận, nên Admin vĩnh viễn không thấy yêu cầu nào.
**Kế hoạch Fix:** 
1. Viết thêm API `POST /api/GroupApi/create` trong C#.
2. Sửa lại nút bấm trong file HTML để gọi `fetch` đẩy dữ liệu xuống DB (trạng thái `IsApproved = false`).
3. Bên Admin sẽ đọc được và hiện nút Duyệt.

## 3. Lỗi người dùng không tạo được Sự kiện (Events)
**Tình trạng Backend:** Tương tự như Groups, `EventApiController.cs` **CHỈ CÓ** API Đăng ký tham gia sự kiện (`RSVPEvent`). Chưa có API để Tạo sự kiện (`CreateEvent`).
**Root Cause (Frontend):** 
- File `Events.cshtml` **hoàn toàn không có giao diện (Form)** để tạo sự kiện mới. Sinh viên bị khóa tính năng do thiếu UI.
**Kế hoạch Fix:** 
1. Viết thêm API `POST /api/EventApi/create`.
2. Copy giao diện Form Tạo Nhóm sang trang Sự Kiện, sửa lại thành các trường như "Thời gian, Địa điểm".

---

### 👉 Kế hoạch Triển khai (Hành động của tôi)
Nếu bạn đồng ý, tôi sẽ thực hiện theo thứ tự sau:
- **Bước 1:** Fix lỗi thiếu thẻ ID ở trang `QA.cshtml` (Dễ nhất, xong trong 1 nốt nhạc). QA sẽ chạy 100%.
- **Bước 2:** Cập nhật C# API: Thêm 2 API `CreateGroup` và `CreateEvent` vào `SmartLMS.Community`.
- **Bước 3:** Cập nhật giao diện HTML: Viết hàm JavaScript `fetch` ở trang Nhóm và dựng thêm Form ở trang Sự Kiện.
- **Bước 4:** Bắn các yêu cầu này vào bảng chờ (Pending) để Admin có thể xem được trong trang quản trị.

---

## 4. Thiếu Trang Chi tiết (Details Page) cho QA, Nhóm, Sự kiện
Theo yêu cầu kiểm tra bổ sung của bạn, tôi đã dò tìm toàn bộ `CommunityController.cs` và phát hiện thêm một thiếu sót nghiêm trọng về mặt trải nghiệm (UX):
- **Trang Nhóm (Groups):** Chỉ có thẻ hiện tên nhóm và nút "(Vào phòng ->)". Nhưng hoàn toàn **KHÔNG CÓ ĐƯỜNG LINK** hay một trang giao diện riêng (`GroupDetail.cshtml`) để vào xem thảo luận bên trong nhóm.
- **Trang Sự kiện (Events):** Tương tự, chỉ có danh sách Sự kiện. Không có trang chi tiết để xem thêm mô tả dài, tài liệu đính kèm hay danh sách người tham gia.
- **Trang Hỏi Đáp (QA):** Hiện tại đang dùng hiệu ứng trượt (Accordion) của Alpine.js để xổ câu trả lời ra ngay tại chỗ. Tạm thời có thể chấp nhận được, nhưng nếu bài viết có 100 câu trả lời thì sẽ bị lag. Đáng lẽ cần một trang `QaDetail.cshtml` riêng.
**Kế hoạch Bổ sung (Xây dựng Hệ sinh thái Detail Pages):** 
1. **Trang Chi tiết Hỏi Đáp (QA):** 
   - Xóa bỏ kiểu hiển thị Accordion cũ gây nặng máy.
   - Tạo Router `GET /hub/qa/{id}` và View `QaDetail.cshtml`. Trang này sẽ hiển thị toàn bộ nội dung câu hỏi, code block, và phân trang cho các câu trả lời bên dưới.
2. **Trang Chi tiết Nhóm học (Groups):** 
   - Tạo Router `GET /hub/groups/{id}` và View `GroupDetail.cshtml`.
   - Cung cấp không gian riêng tư: Bảng tin nhóm, danh sách thành viên, và khu vực thảo luận nội bộ.
3. **Trang Chi tiết Sự kiện (Events):**
   - Tạo Router `GET /hub/events/{id}` và View `EventDetail.cshtml`.
   - Hiển thị timeline sự kiện, link Zoom, tài liệu đính kèm, và danh sách khách mời.
