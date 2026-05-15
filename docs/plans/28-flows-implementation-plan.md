# Kế hoạch Triển khai Hệ sinh thái SmartLMS.AI (28 Luồng Tương Tác)

Tài liệu này xác định lộ trình và kiến trúc kỹ thuật để triển khai 28 luồng tương tác 3 chiều (Student - Teacher - Community) một cách an toàn, không vi phạm nguyên tắc **Strict Modular Monolith** quy định tại `AGENTS.md`.

## 1. Nguyên tắc Kiến trúc Cốt lõi (Core Architecture Principles)

Để đảm bảo 28 luồng này hoạt động trơn tru mà tầng `Business` không bị phụ thuộc ngược vào `Web` (như lỗi CS0246 đã từng gặp), chúng ta sẽ áp dụng triệt để **Event-Driven Architecture (MediatR)**.

*   **Tách biệt Module:** Các module (Course, Community, Assessment, AI) KHÔNG gọi trực tiếp Service của nhau.
*   **Giao tiếp qua Event:** Mọi hành động xuyên module (ví dụ: Học viên giải Code xong -> Cộng đồng đăng bài) sẽ được đẩy qua `IMediator.Publish()`.
*   **Real-time UI:** Tầng `Web` sẽ lắng nghe các Event (qua `IHostedService` hoặc Event Handler ở tầng Web) và đẩy dữ liệu xuống client qua **SignalR** (ví dụ: `GamificationHub`, `DashboardHub`).

## 2. Phân rã Database & Models (Data Layer)

Chúng ta cần bổ sung một số Table/Entity mới để đáp ứng 28 luồng:

1.  **PeerReview (Chấm điểm chéo):** `ReviewId`, `SubmissionId`, `ReviewerId`, `Score`, `Comment`, `Status`.
2.  **CommunitySnippet (Ngân hàng Code):** `SnippetId`, `UserId`, `Code`, `Language`, `IsVerified`, `Upvotes`.
3.  **CourseFlag (Báo cáo nội dung):** `FlagId`, `LessonId`, `UserId`, `Reason`, `Status`.
4.  **CommunityDebate (Tranh biện):** Kế thừa `CommunityPost` nhưng thêm trường `DebateType`, `Upvotes`, `Downvotes`.
5.  **MentorshipBooking (Cố vấn cựu học viên):** Kế thừa từ `Booking` (đã có), thêm loại `AlumniMentoring`.
6.  **UserStreak (Tiến độ liên tục):** `UserId`, `CurrentStreak`, `LongestStreak`, `LastActivityDate`.

## 3. Lộ trình Triển khai An toàn (Phased Implementation Roadmap)

Để kiểm soát rủi ro và đảm bảo UI/API luôn chạy mượt, chúng ta chia 28 luồng thành 4 Phase. Sau mỗi Phase sẽ chạy `check_architecture.js` và `dotnet build`.

### Phase 1: Nền tảng Tương tác Cơ bản (Core Interactions)
*Tập trung vào Code, Review và Hỏi đáp.*

*   **API & Business Logic:**
    *   `Collaborative Debugging` (Luồng 1): Sửa `CompilerService` -> Bắn event `CodeFailedEvent` -> Community tự động mồi sẵn bản nháp bài viết.
    *   `Peer Review System` (Luồng 7): API Nộp bài -> Bắn `AssignmentSubmittedEvent` -> Giao random cho User khác.
    *   `Community Code Snippet Bank` (Luồng 19): API lưu Code Snippet vào thư viện khóa học.
*   **UI/UX:** Nâng cấp Monaco Editor UI. Thêm nút "Share to Community" khi code lỗi. Giao diện Peer Review với split-screen (bên trái xem code, bên phải chấm điểm).

### Phase 2: Gamification & Sự kiện (Engagement Boosters)
*Tập trung vào các giải đấu, chuỗi ngày học và tranh biện.*

*   **API & Business Logic:**
    *   `Weekly Coding Tournament` (Luồng 2): Tạo Entity `Tournament`. API Ranking realtime.
    *   `Technical Debate` (Luồng 21): API tạo bài Post dạng Debate (hỗ trợ Vote up/down).
    *   `#100DaysOfCode Streak` (Luồng 26): Hangfire Job chạy lúc 0h hàng ngày -> Tính Streak -> Bắn `StreakAchievedEvent` -> Tự động đăng Post.
*   **UI/UX:** Bảng Leaderboard động bằng ApexCharts. Hiệu ứng Confetti (pháo hoa) khi đạt Streak. SignalR popup khi có người vượt mặt trên Leaderboard.

### Phase 3: AI & Chăm sóc Học viên (Smart Mentorship)
*Tập trung vào hệ thống cảnh báo và ghép cặp.*

*   **API & Business Logic:**
    *   `AI Early Warning` (Luồng 3): `PredictionService` phân tích MistakeLog -> Bắn Alert cho Teacher.
    *   `Study Buddy Matching` (Luồng 8): AI so sánh MistakeLog của User A với điểm cao của User B -> Gợi ý Group Chat.
    *   `Mistake-Driven Microlearning` (Luồng 22): Job đếm MistakeLog theo Lesson -> Báo cáo Top 3 lỗi phổ biến cho Giảng viên.
*   **UI/UX:** Màn hình Dashboard Giảng viên hiển thị "Radar Rủi ro" (Alerts). Giao diện Chat nội bộ (Direct Message) cho Mentorship.

### Phase 4: Nghề nghiệp & Lan tỏa (Career & Growth)
*Tập trung vào CV, Portfolio và Tiếp thị.*

*   **API & Business Logic:**
    *   `Showcase & Verification` (Luồng 11): API gắn cờ "Verified" cho Portfolio.
    *   `CV Review & Mock Interview` (Luồng 18): Đăng tải CV PDF (DinkToPdf) -> Tích hợp Zoom API (BookingService).
    *   `Affiliate Loop` (Luồng 6): Tự động sinh link Affiliate khi học viên đạt chứng chỉ.
*   **UI/UX:** Trang Profile Học viên chuyên nghiệp (như LinkedIn thu nhỏ) với các Badge đã Verified. Nút chia sẻ lên Facebook/LinkedIn có gắn mã Affiliate.

## 4. Giao thức Tích hợp Web & SignalR (Tránh lỗi CS0246)

Tuyệt đối tuân thủ quy tắc:
1.  **Business Layer:** Chỉ Define Event (VD: `public record CodeFailedEvent(int UserId, string ErrorInfo);`) và `IMediator.Publish()`.
2.  **Web Layer:** Khai báo Handler lắng nghe Event này. Bên trong Handler của tầng Web, chúng ta mới tiêm `IHubContext<DashboardHub>` vào để gọi client.
3.  **UI Layer:** Javascript nhận event từ Hub và dùng `SweetAlert2` hoặc DOM manipulation để hiển thị mượt mà.

## 5. Quy trình Kiểm thử (QA & Verification)

*   **Step 1:** Chạy `node check_architecture.js` để đảm bảo `Business` không `using SmartLMS.Web`.
*   **Step 2:** Chạy `dotnet build SmartLMS.sln`.
*   **Step 3:** Chạy Automation API Tests (Postman/Newman) hoặc viết unit test xUnit cho các Handler quan trọng.
*   **Step 4:** Deploy lên Docker (`docker compose down && docker compose up -d --build`).

---
*Bản thiết kế này đáp ứng chuẩn Enterprise SaaS, tối ưu cho đồ án tốt nghiệp và thể hiện tư duy System Design cấp độ Senior Fullstack.*
