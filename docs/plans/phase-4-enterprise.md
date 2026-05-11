# Phase 4: Business & Enterprise Expansion

## 1. Mục tiêu
Đưa SmartLMS.AI từ một hệ thống học tập cơ bản thành một nền tảng SaaS có khả năng thương mại hóa và phục vụ doanh nghiệp lớn.

## 2. Checklist thực thi

### 2.1 Thanh toán & Affiliate (Billing System)
- [ ] Kiểm tra lại logic `VNPayGateway` và cấu hình tham số môi trường.
- [ ] Hoàn thiện luồng tạo hóa đơn (`Invoices`) tự động sau khi thanh toán thành công.
- [ ] Kích hoạt tính năng cộng hoa hồng cho đối tác trong `AffiliateService`.

### 2.2 Lớp học trực tuyến (Live Classes)
- [ ] Cấu hình Zoom API Credentials trong `appsettings.json`.
- [ ] Kiểm tra tính năng tạo phòng họp tự động khi giảng viên đặt lịch.
- [ ] Hiển thị nút "Vào lớp học" trên giao diện React.

### 2.3 Thử thách lập trình (Coding Challenges)
- [ ] Kiểm tra Docker isolation cho `CompilerService` (đảm bảo an toàn khi thực thi code người dùng).
- [ ] Hoàn thiện giao diện Code Editor trên React.
- [ ] Kết nối hệ thống TestCase để chấm điểm tự động.

## 3. Tiêu chí nghiệm thu (Expectation)
- [ ] Thanh toán giả lập qua VNPay thành công và kích hoạt khóa học ngay lập tức.
- [ ] Tạo được link Zoom từ hệ thống SmartLMS.
- [ ] Chạy được mã nguồn Hello World (C#/JS) và nhận kết quả "Success" từ hệ thống test case.

## 4. Hướng dẫn Test
- Sử dụng `verify_apis.js` để test các endpoint của Payment và Booking.
- Manual test luồng checkout trên giao diện.
