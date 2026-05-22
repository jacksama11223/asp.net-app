# Kế Hoạch Sửa Lỗi reCAPTCHA "Loại khóa không hợp lệ"

## 1. Phân Tích Lỗi (Root Cause)
Dựa vào hình ảnh màn hình hiển thị: **"LỖI mà chủ sở hữu trang web sẽ thấy: Loại khóa không hợp lệ"** (ERROR for site owner: Invalid key type).

**Nguyên nhân:**
Thư viện `react-google-recaptcha` ở Frontend hiện đang sử dụng giao diện của **reCAPTCHA v2 (Checkbox "I'm not a robot")**. Tuy nhiên, loại key (Site Key & Secret Key) mà bạn cung cấp trước đó (bắt đầu bằng `6LdGz_Ys...`) rất có thể là key của **reCAPTCHA v3** hoặc **Enterprise**. Hai phiên bản này không tương thích chéo với nhau.

## 2. Kế Hoạch Khắc Phục (Fix Plan)

### Bước 1: Đăng ký lại đúng loại Key (Thao tác của bạn)
1. Truy cập lại [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create).
2. Điền Label (Tên): VD: `SmartLMS v2`.
3. **QUAN TRỌNG NHẤT**: Tại mục "reCAPTCHA type", bắt buộc phải chọn **reCAPTCHA v2** -> Chọn **"I'm not a robot" Checkbox**.
4. Thêm domain: `141.253.114.218` và `localhost`.
5. Submit và lấy lại 2 chuỗi mã mới (Site Key và Secret Key).

### Bước 2: Viết script tự động cập nhật Key vào source code
Sau khi bạn có 2 key mới, tôi sẽ chạy một script tự động quét và thay thế Key cũ bằng Key mới ở các file sau:
- `react-test-frontend/src/pages/LoginPage.jsx` (Site Key)
- `react-test-frontend/src/pages/RegisterPage.jsx` (Site Key)
- `SmartLMS.Web/Controllers/AuthApiController.cs` (Secret Key)

### Bước 3: Script Test (Xác thực Key)
Chúng ta sẽ tạo một file script Node.js tên là `test_recaptcha.js` gọi thẳng API của Google (`https://www.google.com/recaptcha/api/siteverify`) bằng Secret Key mới và một token giả mạo. Nếu API trả về JSON chứa `"success": false` cùng với các error-codes (thay vì báo lỗi cấu hình key), điều đó chứng tỏ Key hợp lệ và Backend đã sẵn sàng.

## 3. Hành động tiếp theo
Bạn hãy vào lại Google reCAPTCHA, tạo lại **Key v2 (Checkbox)**, sau đó dán 2 key mới lên đây để tôi chạy script cập nhật tự động nhé!
