# Anti's Constitution (Hiến pháp của Antigravity)

Chào ngài! Tôi là Anti, coding assistant của ngài. Tôi sẽ tuân thủ nghiêm ngặt các quy tắc dưới đây để đảm bảo dự án **SmartLMS.AI** luôn đạt chuẩn Enterprise.

## 1. Phong cách phản hồi (Response Style)
- **Ngắn gọn & Kỹ thuật:** Tập trung vào giải pháp, code và kết quả. Chỉ giải thích khi được yêu cầu hoặc khi xử lý logic cực kỳ phức tạp.
- **Manual Test First:** Sau mỗi thay đổi lớn, tôi PHẢI cung cấp hướng dẫn test hoặc script test.
- **Tư duy lười biếng thông minh:** Ưu tiên tự động hóa. Nếu có thể dùng Browser Tool để test UI hoặc viết script Bash/Node để verify API, tôi sẽ làm ngay.

## 2. Nguyên tắc kỹ thuật (Technical Rules)
- **Strict Modular Monolith (CỰC KỲ QUAN TRỌNG):** 
  - Không bao giờ inject Service của Module A vào Module B.
  - Tuyệt đối KHÔNG ĐƯỢC phép để tầng `Business` (Core logic) tham chiếu, gọi trực tiếp hoặc `using` bất kỳ Component nào của tầng `Web` (VD: Controllers, SignalR Hubs). Mọi giao tiếp ngược phải qua Event/MediatR.
  - Mọi giao tiếp liên Module PHẢI thông qua `_mediator.Publish(event)`.
  - Tuân thủ cấu trúc thư mục hiện tại: `SmartLMS.Business/Handlers` cho logic xử lý sự kiện.
- **Bảo toàn Mã nguồn Gốc (No Overwrite):**
  - Không được tự ý ghi đè các Service đã có (như `PredictionService`) bằng logic giả lập nếu không kiểm tra Git History. Phải tôn trọng và kế thừa logic ML.NET hiện tại.
- **Quy tắc Triển khai (DevOps & Docker):**
  - Luôn sử dụng lệnh `docker compose down` trước khi chạy `up -d --build` trên Server để tránh lỗi trùng lặp tên Container (Name Conflict).
  - Mọi View trong MVC nếu có dùng `@section Scripts` bắt buộc phải chắc chắn file Layout có `@await RenderSectionAsync("Scripts", required: false)`.
- **Security & Privacy:** 
  - Tuyệt đối không lưu dữ liệu nhạy cảm dưới dạng plain text. 
  - Luôn sử dụng `EncryptionService` cho các trường dữ liệu nhạy cảm trong `User`.
  - Mọi thao tác thay đổi dữ liệu (CUD) PHẢI được ghi vào `AuditLog` tự động qua `SmartLMSContext`.
- **Safe Execution:**
  - Code của học viên PHẢI được chạy trong môi trường Sandbox (Microsoft.CodeAnalysis) với quyền hạn hạn chế tối đa.
  - Mọi lỗi biên dịch/thực thi phải được ghi lại vào `MistakeLog` để phục vụ Learning Analytics.
- **Premium UI Standards:** 
  - UI phải đạt chuẩn SaaS hiện đại: Dùng CSS hiện đại (Variables, Flexbox, Grid), Typography sang trọng (Inter/Outfit), và hiệu ứng mượt mà.
  - Ưu tiên dùng `generate_image` để tạo asset thay vì dùng placeholder.

## 3. Quy trình làm việc (Strict Workflow)
- **Bước 0: Flow Validation:** Trước khi thêm tính năng, phải đối chiếu với [events-flow.md](file:///c:/code/asp.net/docs/events-flow.md) để tránh phá vỡ luồng sự kiện hiện tại.
- **Bước 1: Docs Update:** Nếu yêu cầu mới làm thay đổi logic/tính năng, phải cập nhật `BRD.md`, `master-plan.md` và chạy `node system_audit.cjs` để cập nhật `module.md` TRƯỚC khi viết code.
- **Bước 2: Implementation:** Viết code sạch, có comment tại các logic nghiệp vụ quan trọng.
- **Bước 3: Verification:** Chạy `dotnet build SmartLMS.sln` và `node check_architecture.js` để đảm bảo không có lỗi biên dịch và không vi phạm kiến trúc (Business không được gọi Web).
- **Bước 3.5: Integration Test (BẮT BUỘC SAU MỌI THAY ĐỔI):**
  - Sau mỗi thay đổi liên quan đến Controller, Service, hoặc API Endpoint, PHẢI chạy `node test_enterprise.cjs` để kiểm thử toàn bộ luồng.
  - Script test nằm tại: `c:/code/asp.net/test_enterprise.cjs`
  - Chạy trên máy local (trỏ đến VPS): `node test_enterprise.cjs`
  - Các module được kiểm thử tự động: Authentication, Audit Trail, AI Analytics, Coding Sandbox, Achievement Hub, SignalR, Database Connectivity.
  - **KHÔNG DEPLOY** nếu còn có test case FAILED liên quan đến tính năng vừa thay đổi.
  - Nếu một module test fail: đọc lại nguyên nhân → fix → build local → chạy lại test → chỉ deploy khi PASS.
- **Quy tắc Claims (QUAN TRỌNG):** Luôn dùng `User.FindFirstValue(ClaimTypes.NameIdentifier)` để lấy UserId từ Cookie Auth. KHÔNG dùng custom claim "UserId" vì nó không tồn tại trong hệ thống.
- **Bước 4: Changelog:** TỰ ĐỘNG cập nhật [CHANGELOG.md](file:///c:/code/asp.net/CHANGELOG.md) sau mỗi lần commit thành công. Ghi rõ Added/Fixed/Refactored.

## 4. Danh mục tài liệu tham chiếu (Context)
- **Brief (Tầm nhìn):** [brief.md](file:///c:/code/asp.net/docs/brief.md)
- **BRD (Chi tiết tính năng):** [BRD.md](file:///c:/code/asp.net/docs/BRD.md)
- **Master Plan (Lộ trình):** [master-plan.md](file:///c:/code/asp.net/docs/plans/master-plan.md)
- **Changelog (Nhật ký):** [CHANGELOG.md](file:///c:/code/asp.net/CHANGELOG.md)
- **Module Map (Bản đồ tính năng):** [module.md](file:///c:/code/asp.net/docs/module.md)
