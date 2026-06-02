# Báo Cáo Sự Cố & Kế Hoạch Khắc Phục Khung Chat (Port 3080)

## 1. Kết Quả Kịch Bản Kiểm Thử (Root Cause Analysis)
Khi điều tra sự kiện `onclick` bị vô hiệu hóa, tôi đã phát hiện ra nguyên nhân cốt lõi không phải do HTML sai, mà do **Phiên bản thư viện Alpine.js**.

- Trong file `_CommunityLayout.cshtml`, bạn đang dùng `<script src=".../alpinejs@3.x.x/..."></script>` (Phiên bản 3.x).
- Tuy nhiên, cú pháp `document.getElementById('...').__x.$data` là cú pháp **Đã Bị Khai Tử (Deprecated)** từ bản Alpine.js v2 sang v3. Phiên bản v3 đã gỡ bỏ hoàn toàn thuộc tính `__x` trên DOM element. 
- **Hậu quả:** Trình duyệt báo lỗi ngầm *`Cannot read properties of undefined (reading '$data')`* và hủy luôn lệnh mở chat, dẫn đến bấm vào không có tác dụng gì.

## 2. Kế Hoạch Nâng Cấp & Sửa Lỗi (Đã Thực Thi)

Để khắc phục triệt để và đúng chuẩn Alpine 3.x, tôi đã tái cấu trúc (Refactor) lại toàn bộ hệ thống Chat bằng **Alpine Global Store (`Alpine.store`)**.

### Chi tiết các bước đã làm:
1. **Khởi tạo State Toàn Cục (Global State):**
   Tạo một Store tên là `chat` chứa toàn bộ biến trạng thái (`chatOpen`, `messages`) và hàm xử lý (`sendMessage`, `receiveMessage`).
   ```javascript
   document.addEventListener('alpine:init', () => {
       Alpine.store('chat', { chatOpen: false, /* ... */ });
   });
   ```

2. **Gắn State vào UI:**
   Các thẻ HTML hiện tại không cần gọi hàm JS ngoài nữa, mà liên kết trực tiếp với Store:
   - Nút bấm (FAB): `@@click="$store.chat.chatOpen = true"` (Chuẩn Alpine v3, không còn xài onclick JS thuần).
   - Khung Chat: `x-show="$store.chat.chatOpen"`

3. **Cập nhật Logic Nhận Diện Khách Lạ (Guest):**
   Quy trình nhận diện Guest đã được đưa hẳn vào bên trong `Alpine.store`:
   - Lấy tên người dùng hiện tại từ Context C#.
   - Nếu trống (Khách), ưu tiên lấy tên từ `localStorage` để không phải hỏi lại nhiều lần.
   - Nếu `localStorage` trống, gọi hàm `prompt()` yêu cầu người dùng nhập tên (VD: `John`), sau đó lưu lại và hiển thị là `John (Khách)`.
   - Mọi tin nhắn gửi đi và nhận lại đều check trùng khớp với tên Guest này để xếp đúng vị trí (Trái/Phải).

## 3. Hướng Dẫn Triển Khai
Toàn bộ kiến trúc mới cực kỳ tinh gọn này đã được Push lên nhánh `main` (Mã commit: `bb7833d`).
Việc duy nhất bạn cần làm bây giờ là:
1. Mở VPS và Pull code mới về.
2. Build lại Container (`docker compose -f docker-compose.prod.yml up -d --build`).
3. Refresh lại trình duyệt (nhớ Clear Cache `Ctrl + F5`) để tải file JS mới.
4. Bấm vào Bong Bóng Chat: Nó sẽ nảy lên ngay lập tức!
