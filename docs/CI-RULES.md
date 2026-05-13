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

## 5. QUY TRÌNH DEPLOY PHÂN TÁN
- **Mở cổng Cloud:** Khi thêm cổng mới (vd: 5384), phải cập nhật vào mục Security List trên Oracle Cloud Console trước khi Build.
- **Sync Code:** Build đồng thời trên cả VPS-A và VPS-B để tránh lệch phiên bản logic giữa các node Load Balancer.

---
*Lưu ý: Vi phạm các quy tắc trên sẽ dẫn đến lỗi hệ thống nghiêm trọng. Hãy đọc kỹ trước khi bắt tay vào code.*
