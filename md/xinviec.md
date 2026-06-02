# Tài liệu Giải thích Hệ thống (Cho Phỏng vấn)

Tài liệu này giải thích cách hệ thống **SmartLMS** hoạt động, tập trung vào sự tương tác giữa Frontend và Backend, giúp bạn tự tin trả lời phỏng vấn.

## 1. Kiến trúc Tổng quan (3-Layer Architecture)
Hệ thống được chia làm 3 lớp chính để đảm bảo tính tách biệt và dễ bảo trì:
- **Presentation Layer (Web)**: Chịu trách nhiệm hiển thị (HTML/CSS) và nhận tương tác (jQuery/AJAX).
- **Business Logic Layer (BLL)**: Nơi chứa "bộ não" của ứng dụng, xử lý các nghiệp vụ phức tạp và tích hợp AI (ML.NET).
- **Data Access Layer (DAL)**: Chịu trách nhiệm giao tiếp với SQL Server. Ở đây chúng ta dùng song song **Entity Framework Core** (cho CRUD cơ bản) và **Dapper** (cho các truy vấn thống kê phức tạp bằng Stored Procedures).

## 2. Cách Frontend và Backend tương tác (AJAX Workflow)

Dưới đây là luồng đi của dữ liệu khi bạn nhấn nút "Refresh" trên Dashboard:

1.  **Frontend (Trình duyệt)**:
    - Khi bạn nhấn nút, mã **jQuery** sẽ bắt sự kiện click.
    - Một yêu cầu **AJAX (GET)** được gửi đến URL `/Dashboard/GetStats`.
2.  **Backend (Controller)**:
    - `DashboardController` nhận yêu cầu và gọi đến `IReportingService` ở tầng Business.
3.  **Business Layer**:
    - `ReportingService` sử dụng **Dapper** để thực thi Stored Procedure `sp_GetDashboardStats` trong SQL Server.
4.  **Database**:
    - SQL Server chạy mã Script (T-SQL) đã được tối ưu hóa để tính toán các con số (Tổng sinh viên, tỉ lệ hoàn thành...) và trả về kết quả.
5.  **Phản hồi (Response)**:
    - Dữ liệu từ SQL Server được Dapper chuyển thành đối tượng C# (POCO).
    - Controller chuyển đối tượng này thành định dạng **JSON** và gửi ngược lại cho trình duyệt.
6.  **Cập nhật Giao diện**:
    - jQuery nhận dữ liệu JSON, sau đó dùng lệnh `.text()` hoặc `.html()` để cập nhật các con số trên màn hình mà **không cần tải lại trang**.

## 3. Tại sao dùng cả Dapper và EF Core? (Senior Thinking)
Đây là câu hỏi phỏng vấn rất phổ biến:
- **EF Core**: Rất mạnh cho việc thêm, sửa, xóa dữ liệu (Productivity). Nó giúp giảm thiểu việc viết SQL thủ công cho các thao tác đơn giản.
- **Dapper**: Là Micro-ORM cực nhanh (Performance). Nó cho phép chúng ta viết SQL thuần túy hoặc gọi Stored Procedures phức tạp, giúp tối ưu hiệu suất khi cần xử lý hàng triệu bản ghi hoặc các con số thống kê nặng.

## 4. Tích hợp AI (ML.NET)
- Chúng ta không gọi AI từ JS. Thay vào đó, AI nằm ở tầng Business.
- Khi cần dự báo, tầng Business sẽ lấy dữ liệu từ DAL, đưa vào mô hình ML.NET để tính toán xác suất, sau đó trả kết quả "High Risk" hoặc "Safe" cho Frontend hiển thị.

---
**Lời khuyên:** Khi phỏng vấn, hãy nhấn mạnh rằng bạn chọn Stored Procedure vì muốn "tận dụng sức mạnh tính toán của Database" thay vì kéo hết dữ liệu về C# rồi mới tính, giúp giảm băng thông mạng.
