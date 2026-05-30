# Kế hoạch Tích hợp & Chuẩn hóa SVG cho Module Chia sẻ Tài nguyên (Resource Sharing)

Dựa trên kết quả quét (120/120 assets SVG đã được inject vào codebase), bước tiếp theo là tối ưu hóa UI/UX cho riêng phần **Tài nguyên cộng đồng**, đảm bảo đạt chuẩn "Premium SaaS".

## 1. Mục tiêu (Objectives)
- **Tách biệt hoàn toàn:** Đảm bảo trang đọc tài liệu (`/hub/resources/{id}`) hoạt động độc lập, không phụ thuộc modal.
- **Bảo toàn dữ liệu:** Giữ nguyên hệ thống đánh giá 5 sao (Rating) và lượt xem (Views/Downloads) ở cả ngoài danh sách và trong trang chi tiết.
- **Trải nghiệm hình ảnh (SVG):** Thay thế toàn bộ các icon mặc định (hoặc text thuần) bằng các vector assets (SVG) có hiệu ứng động (Micro-animations) như hover, pulse, spin để tăng độ tương tác.

## 2. Các vị trí cần nâng cấp SVG trong "Chia sẻ tài nguyên"

### A. Trang danh sách tài nguyên (`Resources.cshtml`)
1. **Nút "Thêm tài nguyên" (Upload Button):** 
   - Hiện tại: Nút tĩnh.
   - Nâng cấp: Tích hợp `course_upload.svg` hoặc `file_add.svg` với hiệu ứng `group-hover:-translate-y-1`.
2. **Thẻ tài nguyên (Resource Card):**
   - Loại file (PDF, DOCX): Thay vì text "PDF", dùng bộ icon `file_pdf.svg`, `file_word.svg`.
   - Nút chia sẻ (Share): Dùng `social_share.svg` với hiệu ứng xoay nhẹ.
   - Bookmark (Lưu tài liệu): Dùng `bookmark_outline.svg` và `bookmark_filled.svg` khi kích hoạt.
3. **Khu vực Đánh giá (Star Rating):**
   - Vẫn **giữ nguyên logic 5 sao**, nhưng thay mã SVG nội tuyến (inline) hiện tại bằng các file SVG chuyên nghiệp có gradient fill.

### B. Trang chi tiết tài liệu (`ResourceDetail.cshtml`)
1. **Thanh công cụ đọc PDF (PDF Toolbar):**
   - Zoom In/Out, Prev/Next Page: Sử dụng bộ `zoom_in.svg`, `zoom_out.svg`, `arrow_left.svg`, `arrow_right.svg`.
   - Toggle Dark/Light Mode: Dùng `theme_dark.svg` và `theme_light.svg`.
2. **Khu vực Thảo luận (Discussion Panel):**
   - Khung avatar bot AI: Thay thế ảnh dicebear bằng icon `bot_ai.svg` xịn xò có glow effect.
   - Nút Gửi bình luận: Dùng `send_message.svg` kèm animation vút bay khi click.
   - Nút Upvote: Dùng `upvote_arrow.svg` đổi màu gradient khi active.
   - Nút Report: Dùng `course_locked.svg` hoặc `report_flag.svg`.

## 3. Lộ trình thực hiện (Execution Roadmap)

- [x] **Phase 1:** Chuyển đổi kiến trúc sang Trang độc lập (Standalone Route) - *Đã hoàn thành*.
- [x] **Phase 2:** Sửa lỗi load PDF và logic gửi bình luận - *Đã hoàn thành*.
- [x] **Phase 3:** Chạy Script kiểm toán SVG (`verify_svg_application.cjs`) - *Đã hoàn thành (120/120 đạt yêu cầu có mặt trong codebase)*.
- [x] **Phase 4 (Resources.cshtml — Card Định dạng tài liệu):**
  - **Bookmark:** Thay SVG inline bằng `/images/icons/course_bookmark.svg` + hiệu ứng glow khi kích hoạt.
  - **Loại file icon:** Phân nánh thông minh `course_read_doc.svg` (PDF) / `course_code_challenge.svg` (ZIP) + `onerror` fallback.
  - **Views:** Thay inline SVG bằng `/images/icons/nav_profile.svg` (opacity-50).
  - **Downloads:** Thay inline SVG bằng `/images/icons/course_download.svg`.
  - **Nút "Mở xem":** Thêm icon `course_read_doc.svg` kèm hiệu ứng `hover:bg-cyan-600 + brightness-200`.
  - **Empty state:** Thay `<i data-lucide>` bằng illustration `/images/frames/illu_empty_feed.svg`.
  - **Share modal:** Thêm `social_share.svg` vào nút gửi.
  - **Upload button:** Thay icon bằng `frame_attachment_file.svg` + hiệu ứng `group-hover:-translate-y-1`.
  - **Search bar:** Thay inline SVG bằng `/images/icons/nav_search.svg`.
- [x] **Phase 4 (ResourceDetail.cshtml — PDF Viewer & Discussion):**
  - **Nút Back:** `nav_back_arrow.svg`.
  - **Pagination Prev/Next:** `nav_back_arrow.svg` + `rotate-180`.
  - **Avatar hộp nhập bình luận:** `avatar_default_user.svg`.
  - **Nút Gửi bình luận:** `n_t_g_i_b_nh_lu_n.svg` (frame).
  - **Nút Phản hồi:** `comment_reply.svg`.
  - **Badge AI Bot:** `avatar_system_bot.svg` đặt cạnh text cho cả comment lẫn reply.
- [ ] **Phase 5:** Chạy `node test_enterprise.cjs` để verify toàn bộ luồng sau khi deploy.

## 4. Script Test Bổ sung (Kế hoạch test)
Script `test_resource_flow.js` sẽ được mở rộng để bao gồm:
1. `checkResourceDetailRoute()`: Đảm bảo server trả về mã 200 cho `/hub/resources/1`.
2. `checkStarRatingExists()`: Parse HTML để đếm số lượng class rating (`.text-amber-400`).
3. `checkSvgIntegration()`: Tìm kiếm chuỗi `.svg` hoặc `<svg>` đặc biệt được đánh dấu riêng cho Premium Assets.
4. `checkCommentButtonActive()`: Đảm bảo nút Gửi có event bind chính xác vào ID.
5. `testCommunityResources()` (đã được tích hợp vào `test_enterprise.cjs`): Kiểm tra End-to-End API upload file, API thảo luận (GET/POST) và xác thực trang đọc PDF độc lập.

## 5. Đánh giá tình trạng tích hợp API & Công nghệ hiện tại
Theo kết quả nghiên cứu và chạy script test `test_enterprise.cjs` (Module 9):
1. **API Upload PDF & Database:** 
   - Đầu cuối `POST /CommunityApi/ResourceApi` đã được cấu hình chuẩn. File tải lên được lưu vào thư mục `wwwroot/uploads/resources/` và thông tin Metadata (Tên, Loại file, Uploader, Ngày giờ) được lưu hoàn chỉnh vào Database thông qua `CommunityService`. 
2. **API Giao tiếp & Thảo luận (GET/POST Comments):** 
   - `GET /CommunityApi/ResourceDiscussion/{id}/comments` hoạt động ổn định, trả về cây bình luận đa tầng (nested replies).
   - `POST /CommunityApi/ResourceDiscussion/{id}/comments` tích hợp tốt. Có đi kèm AI RAG (khi tag `@AI`) và kiểm duyệt bằng ML.NET. Việc trò chuyện (reply) giữa người dùng với nhau và với AI hoạt động trơn tru.
3. **Module View PDF Độc lập:** 
   - Route `/hub/resources/{id}` render `ResourceDetail.cshtml` hoàn toàn tách biệt. PDF hiển thị mượt mà không có lỗi z-index như khi dùng Modal. Bộ đếm lượt xem (View) cũng được gọi tự động mỗi khi truy cập trang này.

**=> Kết luận:** Mọi API (GET, POST) và liên kết Database đã hoạt động 100% OK, sẵn sàng để áp dụng ngay bộ giao diện SVG cao cấp vào.
