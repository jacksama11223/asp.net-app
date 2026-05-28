# Kế hoạch Tích hợp Hệ thống Đính kèm (Attachment System) Toàn diện

## 1. Hiện trạng (Khảo sát từ Script)
Qua quá trình quét hệ thống, tôi phát hiện ra:
- **✅ Backend & Database ĐÃ CÓ:** 
  - Bảng `Attachment` đã được định nghĩa trong `SmartLMS.Models/InteractiveFeatures.cs` và `SmartLMSContext`.
  - API upload đã được tạo sẵn tại `AttachmentApiController` (`POST /api/AttachmentApi/upload`).
  - Các Entity trung tâm (`EventDiscussion`, `GroupPost`, `GroupPostComment`, `CommunityQuestion`, `CommunityAnswer`) đều ĐÃ CÓ trường `AttachmentIds` (lưu dạng chuỗi CSV: `"1,5,10"`).
- **❌ Giao diện (UI) CHƯA CÓ:**
  - Các form nhập bình luận tại `QaDetail.cshtml`, `GroupDetail.cshtml`, `EventDetail.cshtml` hiện **chỉ có Textarea**, chưa có nút bấm Upload hay vùng hiển thị File đính kèm.
  - Mã Javascript gọi API hiện tại đang bỏ trống tham số `attachmentIds`.

## 2. Mục tiêu
Hoàn thiện trải nghiệm người dùng bằng cách cho phép đính kèm File (Hình ảnh, PDF, Code Snippet) vào MỌI khu vực bình luận / thảo luận trên toàn bộ hệ thống SmartLMS.

## 3. Kiến trúc luồng Upload (Workflow)
1. **Người dùng** bấm nút 📎 (Paperclip) ở ô bình luận -> Chọn File.
2. **Frontend (JS)** gọi ngay lập tức lên `POST /api/AttachmentApi/upload` (dùng FormData).
3. **Backend** nhận file, lưu vào thư mục `wwwroot/uploads/attachments`, ghi DB bảng `Attachment` và trả về `AttachmentId`.
4. **Frontend (JS)** lưu nháp (cache) ID này vào một mảng tạm `uploadedAttachmentIds = [1, 2]`. Đồng thời hiển thị giao diện Thumbnail/Tên file để người dùng biết đã tải lên thành công.
5. Khi **Người dùng** bấm "Gửi bình luận":
   - JS lấy nội dung text.
   - JS lấy mảng ID ghép thành chuỗi: `AttachmentIds = "1,2"`.
   - Gửi gộp (Text + AttachmentIds) qua các API tạo bình luận hiện có.

## 4. Kế hoạch Triển khai (Hành động)

### Bước 1: Xây dựng UI Component "Upload Zone" Dùng Chung
Thay vì code lại tính năng upload ở từng trang, ta sẽ viết một đoạn Vanilla JS (hoặc AlpineJS component) dùng chung cho:
- **Sự kiện:** `EventDetail.cshtml` (Thảo luận sự kiện)
- **Nhóm học tập:** `GroupDetail.cshtml` (Bài viết nhóm và Bình luận bài viết)
- **Hỏi Đáp (Q&A):** `QaDetail.cshtml` (Trả lời câu hỏi)

**Cấu trúc UI dự kiến:**
- Dưới mỗi ô `textarea` sẽ thêm một thanh công cụ nhỏ chứa: Nút `📎 Đính kèm file`.
- Một vùng div `#attachment-preview` để hiển thị danh sách các file đang chờ gửi (có nút `x` để xóa file lỗi).

### Bước 2: Viết thư viện Javascript `attachment-uploader.js`
- Hàm `uploadAttachment(file)`: Gửi file lên `/api/AttachmentApi/upload`.
- Quản lý trạng thái loading khi đang tải file.
- Validate định dạng file an toàn (Không cho phép upload `.exe`, `.bat`, `.sh` để bảo mật máy chủ). Chỉ cho phép: `.jpg, .png, .pdf, .docx, .zip`.
- Giới hạn dung lượng: Tối đa 5MB / file.

### Bước 3: Cập nhật các Controller API (Backend)
- Đảm bảo `AttachmentApiController` hoạt động trơn tru trên môi trường phân tán (Cần mount thư mục `uploads` thành Volume dùng chung trên VPS-A và VPS-B để chia sẻ file, hoặc lưu file dạng Base64/Object Storage nếu cấu trúc hệ thống phức tạp, tuy nhiên để tiết kiệm ta sẽ dùng Docker Volume Map chung vào `/app/wwwroot/uploads`).

### Bước 4: Tích hợp vào View và Test
- Lắp ráp UI vào 3 file `.cshtml` chính.
- Sửa các hàm `submitAnswer`, `createDiscussion`, `createPost` để gom tham số `attachmentIds`.
- Triển khai cập nhật Layout: Thêm CSS hiển thị File đính kèm trong các thẻ tin nhắn để người xem có thể tải xuống/xem trực tiếp (Ví dụ: Hiển thị ảnh thumbnail nếu là `.jpg`, hiển thị icon Tài liệu nếu là `.pdf`).

## 5. Code mẫu: Module Hiệu ứng Tải lên (Upload Progress Effect)
Dưới đây là mã Javascript mẫu sẽ được nhúng vào hệ thống để bắt sự kiện tải file, hiển thị thanh tiến trình (Progress Bar) % siêu mượt:

```javascript
// attachment-uploader.js
class AttachmentUploader {
    constructor(inputId, previewZoneId) {
        this.input = document.getElementById(inputId);
        this.previewZone = document.getElementById(previewZoneId);
        this.uploadedIds = [];
        
        this.input.addEventListener('change', (e) => this.handleUpload(e.target.files));
    }

    async handleUpload(files) {
        if (!files || files.length === 0) return;
        
        for (let file of files) {
            if (file.size > 5 * 1024 * 1024) {
                window.showToast?.('❌ File ' + file.name + ' vượt quá 5MB!');
                continue;
            }
            
            // 1. Tạo thẻ UI Loading
            const fileCard = document.createElement('div');
            fileCard.className = 'relative flex items-center p-3 mt-2 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden';
            fileCard.innerHTML = `
                <i data-lucide="file" class="w-5 h-5 text-slate-400 mr-3 z-10"></i>
                <div class="flex-1 z-10">
                    <p class="text-xs font-bold text-slate-700 truncate">${file.name}</p>
                    <p class="text-[10px] text-slate-400 upload-status">Đang tải... 0%</p>
                </div>
                <!-- Thanh tiến trình chạy ngầm bên dưới -->
                <div class="absolute left-0 top-0 bottom-0 bg-cyan-100/50 transition-all duration-200 ease-out progress-bar" style="width: 0%"></div>
            `;
            this.previewZone.appendChild(fileCard);
            if(window.lucide) lucide.createIcons({root: fileCard});
            
            // 2. Gọi API với XMLHttpRequest để lấy được số % Upload
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('file', file);
            
            const progressBar = fileCard.querySelector('.progress-bar');
            const statusText = fileCard.querySelector('.upload-status');
            
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    progressBar.style.width = percent + '%';
                    statusText.textContent = `Đang tải... ${percent}%`;
                }
            });
            
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.uploadedIds.push(res.attachmentId);
                    
                    progressBar.classList.replace('bg-cyan-100/50', 'bg-emerald-100/50');
                    statusText.innerHTML = '<span class="text-emerald-600">✅ Hoàn tất</span>';
                } else {
                    progressBar.classList.replace('bg-cyan-100/50', 'bg-red-100/50');
                    statusText.innerHTML = '<span class="text-red-600">❌ Lỗi tải lên</span>';
                }
            };
            
            xhr.onerror = () => {
                progressBar.classList.replace('bg-cyan-100/50', 'bg-red-100/50');
                statusText.innerHTML = '<span class="text-red-600">❌ Mất mạng</span>';
            };
            
            xhr.open('POST', '/api/AttachmentApi/upload', true);
            // Thêm Token nếu cần thiết: xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.send(formData);
        }
    }
    
    getAttachmentIds() {
        return this.uploadedIds.join(',');
    }
}
```
Đoạn code trên sử dụng `XMLHttpRequest` thay vì `fetch()` thông thường bởi vì `fetch()` không hỗ trợ đo đếm % dữ liệu gửi đi (Upload Progress). Thiết kế HTML này cũng sử dụng hiệu ứng lấp đầy nền (Absolute Width) siêu mượt chuẩn UI cao cấp!
