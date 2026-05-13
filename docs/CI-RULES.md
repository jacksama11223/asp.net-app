# 🛡️ SMARTLMS.AI - THIẾT LUẬT PHÁT TRIỂN (CI RULES)

Tài liệu này quy định các quy tắc bắt buộc phải tuân thủ khi tạo Module, Model hoặc Service mới để đảm bảo hệ thống luôn ổn định và không bị lỗi biên dịch.

## 1. QUY TẮC ĐẶT TÊN & MODEL (Fix CS0101/CS1061)
- **Kiểm tra trước khi tạo:** Luôn chạy lệnh `grep -r "class [TênClass]" SmartLMS.Models` trước khi tạo file mới.
- **Tính tương thích ngược:** Tuyệt đối không đổi tên các trường khóa chính đã tồn tại trong Core. 
    - ✅ Đúng: `PostId`, `BadgeId`, `CourseId`, `UserId`.
    - ❌ Sai: `Id` (cho các thực thể cũ), `Post_Id`.
- **Gom nhóm Module:** Các Model thuộc cùng một phân hệ (vd: Community) nên được gom vào các tệp theo cụm (`CommunityModules.cs`, `CommunityInteraction.cs`) thay vì tạo quá nhiều tệp đơn lẻ.

## 2. QUY TẮC DB CONTEXT & FLUENT API
- **DbSet duy nhất:** Kiểm tra `SmartLMSContext.cs` để đảm bảo không khai báo 2 lần cùng một `DbSet<T>`.
- **Đồng bộ Fluent API:** Khi thay đổi Model, phải cập nhật ngay đoạn code trong `OnModelCreating`. Khóa chính trong Fluent API phải khớp 100% với thuộc tính trong Model.

## 3. QUY TẮC INFRASTRUCTURE (Fix 502 Bad Gateway)
- **Nginx Reverse Proxy:** 
    - Ứng dụng ASP.NET Core chạy trong Docker BẮT BUỘC phải tắt `app.UseHttpsRedirection()`.
    - Nginx Load Balancer phải gọi Service qua Docker DNS (vd: `http://community:8080`) thay vì `127.0.0.1`.
- **Cấu hình Cổng:** Mọi container Backend phải bind vào cổng nội bộ `8080` để đồng bộ với cấu hình Nginx.

## 4. QUY TRÌNH KIỂM ĐỊNH (BẮT BUỘC TRƯỚC KHI PUSH)
Mọi AI Assistant hoặc Developer phải thực hiện chuỗi lệnh sau trước khi `git push`:
1. `dotnet build SmartLMS.Models/SmartLMS.Models.csproj`
2. `dotnet build SmartLMS.Data/SmartLMS.Data.csproj`
3. `dotnet build SmartLMS.Business/SmartLMS.Business.csproj`
4. `node system_integrity_check.cjs`

## 6. QUY TẮC TẦNG HIỂN THỊ (VIEW & CONTROLLER)
- **Đồng bộ View:** Khi đổi tên trường trong Model (vd: `PostId`), phải chạy lệnh `grep` trên toàn bộ thư mục `Views/` để cập nhật các tham chiếu `@item.Id` sang tên mới.
- **Service Signature:** Khi thay đổi Interface trong tầng Business, phải cập nhật ngay các Controller đang inject Service đó. Tuyệt đối không để sai lệch tham số (Overload mismatch).
- **Multimedia References:** Luôn sử dụng đúng thuộc tính khóa chính cho các logic phụ trợ như sinh ảnh ngẫu nhiên (vd: `sig=@post.PostId`).

## 7. QUY TRÌNH KIỂM ĐỊNH (BỔ SUNG)
Mọi AI Assistant hoặc Developer phải thực hiện chuỗi lệnh sau trước khi `git push`:
1. `dotnet build SmartLMS.Models/SmartLMS.Models.csproj`
2. `dotnet build SmartLMS.Data/SmartLMS.Data.csproj`
3. `dotnet build SmartLMS.Business/SmartLMS.Business.csproj`
4. **MỚI:** `dotnet build asp.net-group/SmartLMS.Community/SmartLMS.Community.csproj`
5. `node system_integrity_check.cjs`
6. `node hub_reference_audit.cjs`

## 8. QUY TẮC ĐỊNH TUYẾN NGINX (DIAGNOSIS)
- **Triệu chứng Mất Header:** Nếu `curl -I` không hiển thị header `X-Server-Node`, nghĩa là request **CHƯA** chạm tới upstream. Nginx đang tự trả về file tĩnh hoặc bị lỗi cấu hình `location`.
- **Độ ưu tiên (Priority):** Luôn sử dụng `location ^~ /path` cho các phân hệ quan trọng để đảm bảo Nginx không bị nhầm lẫn với các `location /` hoặc biểu thức chính quy (Regex) khác.
- **Upstream Connection:** Khi proxy tới ASP.NET Hub, luôn bổ sung `proxy_http_version 1.1` và `proxy_set_header Connection ""` để tối ưu hóa kết nối.

## 9. QUY TẮC ĐỊNH TUYẾN ĐỘC LẬP (STANDALONE ROUTING)
- **Root-Level Coding:** Hạn chế gán cứng các tiền tố như `[Route("hub")]` trong Controller. Hãy để ứng dụng chạy tại Root (`/`) để có thể truy cập trực tiếp qua cổng phụ (vd: 3080).
- **Proxy Stripping:** Sử dụng cấu hình `proxy_pass http://upstream/;` (có dấu gạch chéo cuối) để Nginx tự động cắt tiền tố trước khi gửi vào Backend. Điều này giúp mã nguồn sạch hơn và linh hoạt hơn.

## 11. QUẢN TRỊ TÀI NGUYÊN (LOW-RAM STRATEGY)
- **Serial Build:** Trên các máy chủ có RAM < 2GB (vd: Oracle Free Tier), tuyệt đối không chạy `docker compose up --build` cho tất cả các service cùng lúc. Phải build từng service đơn lẻ (`docker compose build <service_name>`) để tránh treo máy (Thrashing).
- **Cứu hộ (Rescue):** Nếu máy chủ bị treo do quá tải, thực hiện `sudo reboot` (hoặc Force Reboot từ Console) -> `docker system prune -f` để làm sạch RAM và ổ cứng trước khi build lại.

## 12. VẬN HÀNH TỰ ĐỘNG (NOHUP DEPLOYMENT)
- **Background Task:** Sử dụng `nohup sh -c "chuỗi_lệnh" > log_file.txt 2>&1 &` để thực hiện các đợt Deploy dài hơi. Điều này cho phép ngắt kết nối SSH/tắt máy tính mà tiến trình build vẫn an toàn.
- **Verification:** Luôn kiểm tra file log bằng `tail -f <log_file>` trong ít nhất 10 giây để đảm bảo lệnh đã "ăn" và đang chạy đúng lộ trình (tránh các lỗi typo như `ohup` thay vì `nohup`).

---
*Tài liệu được cập nhật ngày 13/05/2026 sau chiến dịch hồi sinh Hub bằng Serial Build.*
