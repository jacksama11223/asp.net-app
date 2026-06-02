# Danh sách các tính năng chưa hoàn động / Đang giả lập (SmartLMS.AI)

Dưới đây là danh sách chi tiết các thành phần trong mã nguồn hiện tại đang ở trạng thái giả lập (Mock data), thiếu logic xử lý hoặc click vào không thấy phản hồi thực tế.

## 1. Dashboard (Trang chủ Quản trị)
- [ ] **Biểu đồ Tương tác (Engagement Chart)**: Toàn bộ dữ liệu biểu đồ đường và biểu đồ tròn (User Structure) đang được viết cứng (Hardcoded) trong JavaScript, không lấy từ Database.
- [ ] **Hành động xem chi tiết (Eye icon)**: Nút xem chi tiết trong bảng "Giám sát hiệu suất" đang hiện thông báo "Tính năng đang phát triển".
- [ ] **Gửi Email AI (Nudge)**: Nút "Gửi Email Ngay" chỉ hiện thông báo thành công ảo, chưa thực tế tích hợp hệ thống gửi mail.

## 2. Quản lý Khóa học (Course Management)
- [ ] **Thêm/Sửa Khóa học**: Các hàm `Create` và `Edit` trong `CourseManagementController` hiện đang bị thiếu (chỉ có comment giữ chỗ), khiến các trang này không lưu được dữ liệu.
- [ ] **Sắp xếp Curriculum**: Tính năng kéo thả bài học trong trang Curriculum (`UpdateHierarchy`) chỉ trả về thành công mà chưa thực hiện cập nhật thứ tự (`OrderIndex`) vào Database.
- [ ] **Cập nhật trạng thái**: Hàm `ToggleStatusAsync` trong `CourseService` đang bị lỗi logic (Lưu thay đổi nhưng quên chưa gán giá trị mới cho trường Status).
- [ ] **Biểu đồ xu hướng (Trend chart)**: Cột biểu đồ nhỏ trong bảng danh sách khóa học đang sinh số ngẫu nhiên (`Random`) mỗi khi load trang.

## 3. Students AI Predictor
- [ ] **Hành động Nudge**: Nút "Nhắc nhở" sinh viên chỉ hiện thông báo giả lập, chưa có logic xử lý cảnh báo AI thực tế.
- [ ] **Dữ liệu Risk Level**: Các mức rủi ro (Low/Medium/High) đang được gán dựa trên logic đơn giản (chia % tiến độ), chưa thực sự chạy mô hình dự đoán AI phức tạp.

## 4. Quản lý Lớp học (Cohort Management)
- [ ] **Chỉnh sửa/Xóa Lớp**: Hiện tại mới chỉ có chức năng Tạo lớp và Quản lý thành viên. Chưa có giao diện và logic để Sửa tên lớp hoặc Xóa lớp học.

## 5. Hệ thống chung & Master Console
- [ ] **Báo cáo chuyên sâu**: Nhiều link trong Sidebar (như Lịch dạy, Tài chính, Cài đặt hệ thống) vẫn đang trỏ vào link trống (`#`) hoặc trang mặc định.
- [ ] **Master Console**: Phần "Sức khỏe hệ thống" (Health Check) phụ thuộc vào Stored Procedure `sp_GetDBHealth` có thể chưa được định nghĩa đầy đủ trong Database của bạn.

---
*Ghi chú: Đây là danh sách được tổng hợp từ việc quét toàn bộ mã nguồn hiện tại (Controllers, Services, Views).*
