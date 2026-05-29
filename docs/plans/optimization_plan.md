# Kế Hoạch Tối Ưu Hóa Hiệu Năng Toàn Diện (SmartLMS.AI)

Mục tiêu: Đưa thời gian phản hồi API từ mức **báo động đỏ (3561ms)** xuống mức **tiêu chuẩn (< 300ms)** và giải quyết dứt điểm tình trạng nghẽn cổ chai I/O trên MariaDB.

---

## 🚀 Giai Đoạn 1: Tối Ưu Hóa Tầng Cơ Sở Dữ Liệu (Database Indexing) - ƯU TIÊN SỐ 1
*Nguyên lý: MariaDB đang mất quá nhiều thời gian để quét toàn bộ bảng dữ liệu (Full Table Scan) mỗi khi ghép nối dữ liệu (Join) do thiếu hệ thống bảng mục lục (Index).*

**Các bước thực hiện:**
1. **Phân tích Query:** Rà soát lại `CourseService.cs` và `CommunityService.cs` để tìm ra các trường hay được dùng trong `WHERE`, `JOIN`, `ORDER BY`.
2. **Viết Script SQL Bơm Index:** Tạo file `optimize_db_indexes.sql` để thiết lập Index cho:
   - `Enrollments`: `(UserId, CourseId)`
   - `Lessons`: `(CourseId)`
   - `UserLessons`: `(UserId, LessonId)`
   - `CommunityQuestions`: `(AuthorId, Status)`
3. **Thực thi:** Tiêm file SQL này vào thẳng MariaDB trên VPS-A thông qua Docker.

---

## 🚀 Giai Đoạn 2: Tối Ưu Hóa Tầng Cache (Redis Caching)
*Nguyên lý: Tránh việc Query xuống Database liên tục cho những dữ liệu ít thay đổi (ví dụ: Danh sách khóa học Public).*

**Các bước thực hiện:**
1. **Khảo sát:** Rà soát `CourseService.GetPublicCoursesAsync()`.
2. **Tích hợp Cache:**
   - Sử dụng `IDistributedCache` của Redis.
   - Khi có request lấy danh sách khóa học, hệ thống sẽ ưu tiên móc từ Redis ra (chỉ mất ~0ms).
   - Nếu Redis chưa có, lấy từ DB ra, sau đó lưu ngược vào Redis với thời gian sống (TTL) khoảng 10-15 phút.
3. **Cơ chế xóa Cache (Invalidation):** Viết thêm logic để tự động xóa Cache khi có Admin thêm/sửa khóa học mới.

---

## 🚀 Giai Đoạn 3: Nới Lỏng Nút Thắt Cổ Chai Tài Nguyên (Docker Tuning)
*Nguyên lý: RAM hiện tại của MariaDB bị bó hẹp ở mức 300MB, khiến nó không thể nạp Buffer Pool đủ lớn, dẫn đến chậm chạp.*

**Các bước thực hiện:**
1. **Kiểm tra RAM thực tế:** Chạy lệnh `free -m` trên VPS-A để xem còn dư dả RAM hoặc Swap không.
2. **Cập nhật `docker-compose.prod.yml`:**
   - Nới `mem_limit` của `db` từ `300m` lên khoảng `400m` hoặc `512m` (nếu cho phép).
   - Tinh chỉnh tham số `--innodb-buffer-pool-size` của MariaDB cho tương xứng (khoảng 128MB).
3. **Khởi động lại:** Chạy `docker compose up -d` để áp dụng cấu hình phần cứng mới.

---

## 🚀 Giai Đoạn 4: Vá Lỗi Logic Routing (Sửa Lỗi 404 & 401)
*Nguyên lý: Trình chẩn đoán cho thấy 2 API quan trọng đang bị rớt.*

**Các bước thực hiện:**
1. Khắc phục API `My Learning` (báo lỗi 404): Kiểm tra lại Controller để xem có cấu hình nhầm `[Route]` hay bị nuốt mất Endpoint không.
2. Khắc phục API `Mistakes` (báo lỗi 401): Kiểm tra lại Token/Cookie hoặc cấu hình `[Authorize]` xem có bị siết quyền quá mức không.

---

**Kết luận:** Nếu ngài đồng ý với lộ trình này, tôi sẽ bắt tay vào **Giai đoạn 1 (Tạo Script SQL Index)** ngay lập tức vì đây là viên thuốc giảm đau nhanh và hiệu quả nhất cho hệ thống của ngài lúc này!
