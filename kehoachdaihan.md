# Kế Hoạch Dài Hạn: Hệ Sinh Thái Cộng Đồng & Đào Tạo (SmartLMS Ecosystem)

Dựa trên tầm nhìn của bạn, chúng ta sẽ xây dựng một hệ sinh thái toàn diện, nơi kết nối người học, người chia sẻ kiến thức (creator) và nhà quản trị. Mô hình kinh doanh sẽ tập trung vào **doanh thu từ quảng cáo (Ads)** thông qua lượng truy cập cộng đồng.

---

## 1. Cấu Trúc Hệ Sinh Thái (Architecture)

Hệ thống sẽ được chia thành 4 phân hệ chính, dùng chung một cơ sở dữ liệu và hệ thống xác thực (Single Sign-On - SSO):

### 🎯 Phân hệ 1: Trang Cộng Đồng (Community Landing Page)
*   **Công nghệ:** ASP.NET Core (MVC hoặc Razor Pages) để tối ưu SEO tốt nhất, thu hút traffic tự nhiên.
*   **Chức năng chính:** Bảng tin (Feed) tổng hợp các bài viết, chủ đề thảo luận. Tạo bài viết, hỏi đáp (Q&A), bình luận, Upvote/Downvote tương tự Reddit/Viblo. Hệ thống Tag, Category để phân loại kiến thức.
*   **Kiếm tiền (Monetization):** Tích hợp Google AdSense hoặc nền tảng quảng cáo (Ad Network). Vị trí quảng cáo: Xen kẽ giữa các bài viết (In-feed ads), Sidebar, Banner đầu trang. Lượt click (CPC) hoặc lượt xem (CPM) sẽ tạo ra doanh thu.

### 🎨 Phân hệ 2: Cổng Người Sáng Tạo (Content Creator Portal)
*   **Công nghệ:** ASP.NET Core.
*   **Chức năng chính:** Dashboard riêng cho Creator để viết bài, quản lý nội dung chia sẻ trên cộng đồng. Công cụ tạo khóa học (để đẩy sang trang Student). Thống kê tương tác bài viết, số lượng học viên.

### 🎓 Phân hệ 3: Cổng Học Viên (Student Portal)
*   **Công nghệ:** React (Hệ thống đã có sẵn).
*   **Chức năng chính:** Giao tiếp với Backend qua RESTful API/GraphQL. Học viên vào xem video, làm bài tập, nhận chứng chỉ. Sẽ có liên kết (widget) gợi ý các chủ đề đang hot bên "Trang Cộng Đồng" để kéo học viên sang thảo luận.

### 👑 Phân hệ 4: Quản Trị Trung Tâm (Master Admin Console)
*   **Công nghệ:** ASP.NET Core.
*   **Chức năng chính:** Quản trị Người dùng (IAM), Kiểm duyệt Nội dung (Moderation), Quản lý Quảng cáo, Giám sát Hệ thống.

---

## 2. Lộ Trình Triển Khai (Roadmap)
*   **Giai đoạn 1: Nền tảng & Xác thực (Core & SSO)** - Thiết kế CSDL, Xây dựng hệ thống đăng nhập tập trung, API Gateway.
*   **Giai đoạn 2: Xây dựng Cộng Đồng & Tích hợp Quảng cáo (MVP)** - Phát triển giao diện Trang Cộng Đồng, Đăng bài, Bình luận, Tag, Chèn mã quảng cáo, Module Kiểm duyệt.
*   **Giai đoạn 3: Phân hệ Sáng tạo & Củng cố React** - Xây dựng Creator Portal (Rich Text Editor, Upload S3), kết nối app React với Backend.
*   **Giai đoạn 4: Tối ưu & Tăng tốc (Scale & AI)** - Gamification (điểm thưởng, huy hiệu), AI Moderation (lọc nội dung tự động), Tối ưu SEO.

---

## 3. Câu Hỏi Mở (Open Questions)
*   *Về hệ thống React:* Dự án React của bạn hiện tại gọi API như thế nào? Cần cấu hình CORS hay chuẩn hóa API Response?
*   *Về mô hình kinh doanh:* Có ý định trích Revenue Share cho Creator viết bài chất lượng không?

---

## 4. Chi tiết Kỹ thuật, Thư viện UI và Kiến trúc Mở rộng (Scaling Architecture)

### 4.1. Quy hoạch Thư viện UI/UX (Tránh xung đột)
*   **Trang Admin & Creator Portal:** Duy trì AdminLTE 3, Bootstrap 4/5, jQuery, DataTables, SweetAlert2. Dùng chung Layout `_AdminLayout.cshtml`.
*   **Trang Cộng đồng Landing Page:** Bootstrap 5 (độc lập file CSS/JS), hạn chế jQuery (tối ưu Web Vitals). Thiết kế Clean UI, Mobile-first.
*   **Trang Học viên (React):** Tailwind CSS hoặc Material-UI. 
*   **Đồng bộ UX:** Xây dựng **Design System** (CSS Tokens: màu sắc, font chữ) nhúng vào cả ASP.NET và React.

### 4.2. Cấu trúc Services & Cơ chế Đồng bộ (Synchronization)
*   **SSO (Single Sign-On):** Dùng JWT + Cookie cấp tên miền gốc (VD: `.smartlms.com`).
*   **Real-time (SignalR):** Một SignalR Hub chung toàn hệ thống để đẩy thông báo đa nền tảng.
*   **API Gateway & Backend Services:** `ApiController` độc lập cho React; MVC gọi trực tiếp Business Services.

### 4.3. Các Services Core Cần Bổ Sung
*   `IPostService` / `ICommentService`: Quản lý bài viết, đếm view.
*   `IVoteService`: Hệ thống Upvote/Downvote (Redis).
*   `IAdManagerService`: Phân phối quảng cáo.
*   `IModerationAIService`: AI lọc bình luận.

---

## 5. Chiến Lược Phân Bổ Server & Đồng Bộ Phiên Bản (CI/CD)

Để tận dụng tối đa sức mạnh của 2 máy chủ (`vps-a` và `vps 15gb ram mới`) đồng thời tránh hoàn toàn lỗi lệch phiên bản, hệ thống sẽ được cấu hình theo mô hình Phân tán (Distributed Architecture).

### 5.1. Phân bổ Tải (Load Distribution)
*   **VPS 15GB RAM (Server Chính / Data & Core):** 
    *   Chạy **Cơ sở dữ liệu (MariaDB Master)**: Chiếm nhiều RAM nhất để xử lý truy vấn nhanh.
    *   Chạy **Redis Cache**: Cần RAM lớn để lưu trữ feed cộng đồng, session đăng nhập.
    *   Chạy 1-2 container Web API (Xử lý giao dịch chính, thanh toán).
*   **VPS-A (Server Vệ tinh / Web & Worker):**
    *   Chạy **Background Workers**: Xử lý các tác vụ ngầm nặng nề không yêu cầu phản hồi ngay (Gửi Email hàng loạt, Encode Video AI, Phân tích dữ liệu Rủi ro ML.NET).
    *   Chạy thêm 1-2 container Web Server (chuyên phục vụ đọc nội dung cộng đồng) hỗ trợ cho Server chính.
*   **Kiến trúc:** Một Nginx (hoặc HAProxy) đứng trước làm **Load Balancer**, phân phối request của người dùng tới Web Container rảnh rỗi trên 2 VPS.

### 5.2. Quản lý Đồng bộ Phiên bản (Zero-Conflict Deploy)
Để tránh tình trạng "vps-a chạy code cũ, vps mới chạy code mới" gây lỗi vỡ UI hoặc xung đột DB:
*   **Bỏ lệnh git pull thủ công:** Toàn bộ code sẽ được push lên Github, Github Actions sẽ tự động Build thành **1 Image Docker duy nhất** (VD: `smartlms-web:v2.1.0`) và đẩy lên Container Registry (Docker Hub).
*   **Cập nhật đồng loạt (Rolling Update):** Cả 2 VPS sẽ có một file `docker-compose.yml` cấu hình trỏ đúng về phiên bản `v2.1.0`. Khi có bản cập nhật, cả 2 máy chủ sẽ tự động tải Image `v2.1.0` về và thay thế container cũ cùng một lúc. Tuyệt đối không dùng tag `:latest` để đảm bảo kiểm soát chính xác phiên bản đang chạy.

---

## 6. Mô Hình Kinh Doanh: Hệ Thống Membership & Creator Donation

Bên cạnh Quảng cáo (Ads), hệ thống sẽ tích hợp luồng tiền tệ nội bộ để kích thích nội dung chất lượng cao.

### 6.1. Gói Hội Viên (Platform Subscription / Membership)
*   **Cơ chế:** Thay vì học viên phải mua lẻ từng khóa học, hệ thống cung cấp Gói Hội viên theo tháng (Ví dụ: 199.000đ/tháng hoặc 1.990.000đ/năm).
*   **Quyền lợi Học viên:** Khi người dùng duy trì gói Donate/Membership này, họ sẽ mở khóa truy cập vào **toàn bộ khóa học** (kể cả khóa Premium do Creator tạo ra) và trải nghiệm hệ sinh thái không có quảng cáo (Ad-free).
*   **Chi trả cho Creator (Revenue Share):** Cuối tháng, hệ thống sẽ thống kê tổng thời gian xem video (Watch Time) hoặc điểm tương tác bài viết. Quỹ tiền thu được từ gói Membership sẽ được **chia tỷ lệ phần trăm** phân bổ lại cho các Creator dựa trên hiệu suất nội dung của họ (Tương tự mô hình Spotify trả tiền cho nghệ sĩ hoặc Medium Partner Program).
*   **Hạ tầng Kỹ thuật:** Bổ sung bảng `UserSubscriptions`, tích hợp Job chạy ngầm trên VPS-A để tự động kiểm tra và khóa quyền truy cập khi gói tháng hết hạn.

### 6.2. Donate Trực tiếp (Direct Creator / Course Donation)
*   **Nút "Tặng Cà Phê" (Buy Me A Coffee):** Được gắn ở cuối mỗi bài viết chất lượng trên diễn đàn, hoặc dưới trang chi tiết Khóa học.
*   **Ví Nội Bộ (Smart Coins / Credits):** Học viên nạp tiền thật (VNPay) thành Credit ảo trong hệ thống. Credit này dùng để tặng quà, donate cho bài viết, khóa học, hoặc tip trực tiếp vào profile của Creator yêu thích.
*   **Tương tác Khen thưởng:** Top những người Donate nhiều nhất cho một khóa học sẽ được hiển thị vinh danh trên Leaderboard của khóa học đó.
*   **Hạ tầng Kỹ thuật:** Bổ sung bảng `Transactions`, `WalletBalances`, và module Quản lý dòng tiền trong Admin để xử lý yêu cầu Rút tiền (Payout) của Creator.

---

## 7. Tích Hợp Trí Tuệ Nhân Tạo (In-house AI & Machine Learning)

Để không bị phụ thuộc vào API đắt đỏ của bên thứ 3 (như OpenAI) và bảo vệ tuyệt đối dữ liệu người dùng, chúng ta sẽ xây dựng hệ thống AI "Cây nhà lá vườn" tự huấn luyện (Local Training).

### 7.1. Thu thập Dữ liệu Hành vi (Data Telemetry)
*   **Mục tiêu:** Xây dựng kho dữ liệu (Data Lake) sạch để AI có thể học hỏi và tối ưu UX.
*   **Dữ liệu cần Tracking:** 
    *   *Tương tác:* Thời gian dừng lại đọc 1 bài viết (Dwell time), tỷ lệ click quảng cáo (CTR), các tìm kiếm thất bại (không ra kết quả).
    *   *Học thuật:* Mức độ tua video (Rewind rate), tỷ lệ làm sai ở câu hỏi khó, điểm số trung bình.
*   **Kỹ thuật:** Dùng Kafka hoặc Redis Streams để hứng các luồng log sự kiện này (Event Sourcing) lưu vào MongoDB/ClickHouse, tránh làm nghẽn MariaDB.

### 7.2. Huấn Luyện Chatbot Trợ Giảng (Virtual AI Tutor)
*   **Giải pháp:** Fine-tune (Huấn luyện tinh chỉnh) một mô hình ngôn ngữ lớn nguồn mở (LLM như LLaMA 3 8B hoặc Qwen) trên bộ dữ liệu là **toàn bộ tài liệu, bài viết cộng đồng và nội dung khóa học** của hệ thống.
*   **Nhiệm vụ:** Chatbot sẽ túc trực 24/7 dưới góc phải màn hình của học viên. Khi học viên không hiểu bài, Chatbot sẽ giảng lại theo ngữ cảnh của chính khóa học đó (RAG - Retrieval-Augmented Generation) thay vì trả lời chung chung như ChatGPT.

### 7.3. Thuật toán Đề xuất Khóa học & Nội dung (Recommendation Engine)
*   **Công cụ:** Sử dụng **ML.NET** (có sẵn của Microsoft, tích hợp mượt mà với ASP.NET) hoặc Python (PyTorch) tùy độ phức tạp.
*   **Mô hình Lọc Cộng Tác (Collaborative Filtering):** Dựa trên logic *"Học viên A mua khóa X, học viên B giống A cũng sẽ thích khóa X"*.
*   **Mô hình Content-based:** Phân tích nội dung khóa học/bài viết bằng NLP. Khi người dùng đang đọc một bài về "C# Cơ bản", AI sẽ tự động đề xuất khóa học "ASP.NET Thực chiến" ở sidebar. Tính năng này giúp tăng tỷ lệ chuyển đổi (Conversion Rate) bán khóa học.

### 7.4. Quy Trình MLOps (Quy trình Train & Deploy AI)
Để tiết kiệm chi phí thuê VPS đắt đỏ có GPU, quy trình huấn luyện sẽ diễn ra như sau:
*   **Bước 1 - Data Export:** Job tự động xuất dữ liệu log (đã mã hóa ẩn danh) từ server về máy trạm Local.
*   **Bước 2 - Local Training:** Bạn sẽ sử dụng chính máy tính cá nhân (hoặc một máy trạm chạy Card đồ họa GPU chuyên dụng ở nhà) để chạy lệnh Train AI định kỳ (ví dụ cuối tuần).
*   **Bước 3 - Export Model:** Máy ở nhà sẽ đóng gói AI đã thông minh hơn thành một file Model siêu nhẹ (VD: file `.zip` của ML.NET hoặc `.onnx`).
*   **Bước 4 - Deploy & Inference:** Push file Model này lên **VPS-A**. VPS-A cung cấp một API nội bộ chuyên dự đoán dữ liệu (`Prediction API`). Khi người dùng load web, Server Chính chỉ việc ném dữ liệu sang VPS-A, VPS-A sẽ trả lời "Học viên này nên mua khóa nào" chỉ trong vài mili-giây.
---

## 8. Trạng Thái Triển Khai & Lộ Trình Code Tiếp Theo (Execution Log)

### 8.1. Các phần đã hoàn thành (Completed) ✅
*   **Tách rời hạ tầng (Infrastructure Separation):** Trang Cộng đồng đã chạy độc lập trên **VPS-A** (145.241.160.156:5182).
*   **Cấu hình Phân tán (Distributed Config):** VPS-A kết nối thành công tới Database trung tâm (Máy chủ chính 141.253.114.218:3306).
*   **Tối ưu tài nguyên:** Thiết lập 4.5GB Swap trên VPS 1GB RAM, đảm bảo Build Docker không bị crash.
*   **Landing Page MVP:** Khởi tạo giao diện trang chủ cộng đồng dùng Tailwind CSS + DaisyUI.

### 8.2. Kế hoạch Code cho Trang Cộng Đồng (Phân hệ 1) 🛠️

**Giai đoạn 1: Hệ thống Nội dung Tương tác (Hạn chót: 2 tuần tới)**
1.  **Chức năng Bài viết (Posts):** 
    *   Tạo bảng `Posts` trong CSDL (Title, Content, AuthorId, Tags).
    *   Xây dựng trang Chi tiết bài viết (Post Details) dùng Markdown renderer.
    *   Xây dựng form Đăng bài (Rich Text Editor).
2.  **Hệ thống Tương tác:**
    *   Chức năng Upvote/Downvote (Sử dụng Redis để đếm like thời gian thực).
    *   Hệ thống Bình luận đa cấp (Nested Comments).
3.  **Hệ thống Tag & Tìm kiếm:**
    *   Phân loại bài viết theo chuyên mục (Web, AI, Mobile).
    *   Tìm kiếm bài viết theo từ khóa (Full-text search).

**Giai đoạn 2: Cổng Người Sáng Tạo (Creator Portal) - Đang thực hiện 🚧**
1.  **Dashboard Giảng viên:** Trang thống kê dành riêng cho giảng viên (số học viên, bài viết, khóa học).
2.  **Quản lý nội dung:** Creator có thể tự đăng bài và quản lý khóa học của mình.
3.  **Hệ thống phân quyền:** Phân biệt User thường và Creator dựa trên Email/Role.
