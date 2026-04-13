# Danh sách Use Case - Hệ thống SmartLMS.AI

Tài liệu này mô tả các tình huống sử dụng thực tế của 3 đối tượng chính: Quản trị viên (Admin), Sinh viên (Student) và Hệ thống AI.

## 1. Đối với Quản trị viên (Admin)
| Mã | Use Case | Mô tả | Lợi ích |
| :--- | :--- | :--- | :--- |
| **UC-01** | Theo dõi Dashboard AI | Xem thống kê số lượng sinh viên, tỷ lệ hoàn thành môn học và tỷ lệ rủi ro bỏ học trung bình toàn hệ thống. | Giúp có cái nhìn tổng quát về sức khỏe của các khóa học. |
| **UC-02** | Quản lý Khóa học (CRUD) | Thêm môn học mới, cập nhật mô tả và chỉ số "BaseSalaryImpact" (ảnh hưởng lương dự kiến). | Giúp dữ liệu AI luôn mới và chính xác. |
| **UC-03** | Can thiệp sớm (Intervention) | Nhận danh sách sinh viên có rủi ro bỏ học cao (High Risk) để gửi email nhắc nhở hoặc hỗ trợ. | Giảm tỷ lệ sinh viên bỏ học nửa chừng. |
| **UC-04** | Theo dõi Activity Logs | Xem lịch sử thao tác của sinh viên trên hệ thống (đăng nhập, thời gian học). | Hiểu được hành vi người dùng. |

## 2. Đối với Sinh viên (Student)
| Mã | Use Case | Mô tả | Lợi ích |
| :--- | :--- | :--- | :--- |
| **UC-05** | Đăng ký Khóa học | Chọn và đăng ký các khóa học phù hợp với định hướng nghề nghiệp. | Bắt đầu lộ trình học tập. |
| **UC-06** | Theo dõi Tiến độ | Xem mình đã hoàn thành bao nhiêu % môn học và điểm trung bình hiện tại qua AJAX dashboard. | Tạo động lực học tập. |
| **UC-07** | Xem Dự báo Năng lực | Xem dự báo về mức thu nhập hoặc sự thay đổi năng lực sau khi hoàn thành khóa học (tương lai). | Định hướng nghề nghiệp rõ ràng hơn. |

## 3. Đối với Hệ thống AI (System AI)
| Mã | Use Case | Mô tả | Lợi ích |
| :--- | :--- | :--- | :--- |
| **UC-08** | Huấn luyện mô hình (Training) | Tự động quét bảng `Enrollments` và `ActivityLogs` để cập nhật trọng số mô hình ML.NET. | Đảm bảo dự báo ngày càng chính xác. |
| **UC-09** | Gán nhãn rủi ro (Labeling) | Phân tích `Progress` và `AvgScore` để gán nhãn rủi ro cho từng sinh viên theo thời gian thực. | Cung cấp dữ liệu đầu vào cho Dashboard. |

---

## Mối liên hệ chính (Relationship Flow)
```mermaid
graph LR
    Admin -- Quản lý --> Course
    Student -- Đăng ký --> Enrollment
    Enrollment -- Sinh dữ liệu --> AI_Model
    AI_Model -- Cung cấp kết quả --> Admin
```
