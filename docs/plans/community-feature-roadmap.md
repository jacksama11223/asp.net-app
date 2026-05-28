# Lộ trình Phát triển & Nâng cấp Trải nghiệm (UX) SmartLMS.Community

Dựa trên yêu cầu mở rộng tính năng (Chia sẻ, Đính kèm tài liệu, Bình luận), tôi đã thiết kế một lộ trình chia làm 3 Giai đoạn (Phases) để đảm bảo hệ thống không bị "ngợp" và dễ dàng kiểm soát lỗi trong quá trình code.

---

## Giai đoạn 1: Sửa Lỗi Gốc & Dựng Khung Chi Tiết (Core Fixes & Details)
*Mục tiêu: Đảm bảo các luồng chức năng cơ bản hoạt động 100% trước khi lắp thêm tính năng mới.*

1. **Fix các lỗi API hiện tại (Báo cáo điều tra trước đó):**
   - Thêm `id` vào Form Hỏi Đáp (QA).
   - Viết API `CreateGroup` và `CreateEvent`.
2. **Xây dựng hệ thống Routing cho Trang Chi tiết (Details Pages):**
   - Xây dựng `QaDetail.cshtml`: Không gian đọc câu hỏi và trả lời rộng rãi.
   - Xây dựng `GroupDetail.cshtml`: Giao diện Bảng tin nhóm học.
   - Xây dựng `EventDetail.cshtml`: Thông tin sự kiện và danh sách người tham gia.

---

## Giai đoạn 2: Hệ thống Tương tác & Bình luận (Interactive Modules)
*Mục tiêu: Biến các trang tĩnh thành nơi thảo luận sôi nổi.*

1. **Bình luận trong Sự kiện (Event Comments):**
   - Thêm khu vực "Thảo luận trước/sau sự kiện" vào dưới cùng của `EventDetail.cshtml`. Sinh viên có thể đặt câu hỏi cho Diễn giả trước giờ G.
2. **Bình luận trong Nhóm (Group Discussion Board):**
   - Biến `GroupDetail.cshtml` thành một "Tiểu mạng xã hội". Thành viên trong nhóm có thể đăng status, bình luận và thả tim (Like) các hoạt động của nhóm.
3. **Đính kèm tài liệu (File Attachments):**
   - Bổ sung nút "Đính kèm" (Kẹp giấy) vào khung soạn thảo của QA, Group và Event.
   - Hỗ trợ tải lên ảnh lỗi code (PNG/JPG) hoặc tài liệu tóm tắt (PDF).

---

## Giai đoạn 3: Siêu Kết nối & Chia sẻ (Hyper-Connectivity)
*Mục tiêu: Xóa bỏ ranh giới giữa các trang, cho phép luân chuyển dữ liệu tự do.*

1. **Chia sẻ qua Tin nhắn (Share via Messages):**
   - Tại trang `QaDetail` hoặc `EventDetail`, thêm nút **[Chia sẻ]**.
   - Bấm vào sẽ hiện Popup: *"Gửi vào tin nhắn riêng cho A"* hoặc *"Gửi vào Nhóm học B"*.
   - Người nhận sẽ thấy một "Thẻ (Card) xem trước" rất đẹp trong khung chat.
2. **Chuyển tiếp Tài liệu (Document Forwarding):**
   - Nếu một thành viên tải lên một tài liệu PDF trong trang **Chia sẻ Tài nguyên (Resources)**.
   - Một người khác có thể bấm nút **[Chuyển tiếp]** để bê thẳng tài liệu đó vào trong **Nhóm học** của họ để cùng thảo luận mà không cần tải về rồi upload lại.
3. **Trích dẫn (Quote & Reference):**
   - Khi trả lời một bài viết QA, người dùng có thể gõ dấu `@` để trích dẫn một Sự kiện sắp diễn ra hoặc gõ `#` để trích dẫn một Nhóm học có liên quan.

---

### 👉 Quyết định Triển khai
Để đảm bảo tiến độ và chất lượng, tôi đề xuất chúng ta sẽ **Code dứt điểm Giai đoạn 1** trước. Sau khi trang Chi tiết chạy mượt mà, chúng ta sẽ đắp dần Giai đoạn 2 và 3 lên.

---

## Kế hoạch Triển khai Database (MariaDB / Production)
*Cập nhật sau Giai đoạn 3: Kiểm tra và Áp dụng Database Schema*

Các Entity dưới đây đã được thêm vào mã nguồn (`SmartLMSContext`) nhưng có thể **chưa tồn tại trên MariaDB Production**. Bạn có thể dùng script `check_mariadb_tables.cjs` để tự động dò tìm. Nếu thiếu, vui lòng thực hiện checklist sau để tránh lỗi 500 khi Deploy:

1. **Các bảng cần xác minh sự tồn tại:**
   - `Attachments` (Lưu trữ file đính kèm với FileSize, FileType)
   - `GroupPosts` (Bài viết trong nhóm học)
   - `GroupPostComments` (Bình luận của bài viết nhóm)
   - `EventDiscussions` (Thảo luận trong Sự kiện)
   - `SharedContents` (Bao gồm cột mới cập nhật `TargetUserId`)

2. **Lệnh Migration & Cập nhật Server:**
   Chạy lệnh sau tại máy Local (nơi có thể kết nối tới MariaDB) để áp dụng các thay đổi DB lên Production/Dev:
   ```bash
   dotnet ef database update --project SmartLMS.Data --startup-project SmartLMS.Web
   ```

3. **Checklist sau khi Update:**
   - [ ] Kiểm tra bảng `SharedContents` đã có đủ 2 cột `TargetGroupId` (int, nullable) và `TargetUserId` (int, nullable) chưa.
   - [ ] Dữ liệu cũ trong `SharedContent` không bị mất sau khi update Schema.
   - [ ] Chạy lại `node test_enterprise.cjs` để đảm bảo API chạy đúng kết nối DB.
