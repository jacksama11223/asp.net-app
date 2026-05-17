# Ghi chú Lỗi Build: Lỗi Tham số Null (CS1503)

## Mô tả sự cố
Khi chạy lệnh `docker compose build backend`, tiến trình biên dịch (C# build) thất bại ở tệp `DashboardController.cs` với lỗi:
`error CS1503: Argument 1/2: cannot convert from 'int?' to 'int'`

**Chi tiết nguyên nhân:**
Trong phương thức `GetAnalyticsData`, lệnh lặp qua danh sách `enrollments` (các khóa học đã đăng ký) và gọi `PredictDropoutAsync(e.UserId, e.CourseId, false)`. 
Bản thân thực thể `Enrollment` được cấu hình để `UserId` và `CourseId` có kiểu `int?` (số nguyên cho phép giá trị null). Tuy nhiên, hàm `PredictDropoutAsync` của `PredictionService` lại bắt buộc nhận tham số là `int` (không cho phép null).

Trình biên dịch C# báo lỗi vì nó lo sợ rằng trong quá trình chạy thực tế, `e.UserId` hoặc `e.CourseId` có thể mang giá trị `null` và truyền vào hàm không hợp lệ gây lỗi Runtime.

## Giải pháp (Fix)
Để khắc phục vấn đề này, tôi đã bổ sung kiểm tra an toàn (Null-check) trước khi gọi hàm AI:
```csharp
// Kiểm tra an toàn: Bỏ qua nếu dữ liệu người dùng hoặc khóa học bị thiếu (null)
if (e.UserId == null || e.CourseId == null) continue;

// Truyền giá trị bằng cách lấy .Value từ biến kiểu int?
var prediction = await _predictionService.PredictDropoutAsync(e.UserId.Value, e.CourseId.Value, false);
```

**Tại sao cách này tốt:** 
1. Loại bỏ hoàn toàn lỗi biên dịch CS1503.
2. Ngăn ngừa lỗi `NullReferenceException` tại Runtime trong tình huống dữ liệu trong CSDL bị lỗi hoặc thiếu quan hệ.
3. Đảm bảo luồng phân tích AI chỉ chạy trên các bản ghi có dữ liệu hợp lệ đầy đủ.

## Hướng dẫn xử lý tiếp theo
Do mã nguồn đã được sửa lỗi và cập nhật trên Github (Commit `430dec6`), ngài chỉ cần chạy lại lệnh tuần tự y hệt như lúc trước là hệ thống sẽ tự động Pull code mới nhất về và Build lại thành công:

```bash
cd /home/opc/asp.net-app && \
git pull && \
docker compose -f docker-compose.prod.yml build backend && \
docker compose -f docker-compose.prod.yml up -d && \
sudo docker restart smartlms-lb
```
