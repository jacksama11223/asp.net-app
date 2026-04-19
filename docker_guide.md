# Hướng dẫn vận hành SmartLMS.AI bằng Docker

Chào bạn! Đây là hướng dẫn từng bước để bạn đưa toàn bộ hệ thống pháo đài SmartLMS lên môi trường Docker - tiêu chuẩn của phát triển phần mềm hiện đại.

## Bước 1: Cài đặt Docker Desktop (Dành cho Windows)

1. **Tải xuống**: Truy cập trang chủ [Docker Desktop](https://www.docker.com/products/docker-desktop/) và nhấn **Download for Windows**.
2. **Cài đặt**: 
   - Chạy file `.exe` vừa tải về.
   - Đảm bảo bạn đã chọn **"Install required Windows components for WSL 2"** trong quá trình cài đặt.
3. **Khởi động**: Sau khi cài đặt xong, máy tính có thể yêu cầu khởi động lại. Sau đó, hãy mở ứng dụng **Docker Desktop** lên và đợi cho biểu tượng con cá voi ở góc màn hình báo "Running".

## Bước 2: Khởi động hệ thống SmartLMS

Sau khi Docker đã sẵn sàng, bạn hãy mở một cửa sổ **Terminal** (PowerShell hoặc Command Prompt) tại thư mục `c:\code\asp.net` và gõ lệnh duy nhất sau:

```bash
docker compose up -d --build
```

### Chuyện gì đang xảy ra?
- Docker sẽ đọc file `docker-compose.yml` tôi đã chuẩn bị.
- Nó sẽ tự tải ảnh (Image) của **SQL Server 2022** và **RabbitMQ**.
- Nó sẽ tự Build mã nguồn của bạn thành một Image Linux cực kỳ gọn nhẹ.
- Hệ thống sẽ tự tạo mạng nội bộ để App kết nối với DB qua mật khẩu `anhlongpro123` mà bạn đã đặt.

## Bước 3: Truy cập hệ thống

Sau khi lệnh chạy xong (mất khoảng 2-5 phút cho lần đầu), bạn có thể truy cập:

- **Ứng dụng Web**: [http://localhost:8080](http://localhost:8080)
- **Quản trị RabbitMQ**: [http://localhost:15672](http://localhost:15672) (User/Pass: `guest`/`guest`)
- **Swagger (API Docs)**: [http://localhost:8080/swagger](http://localhost:8080/swagger)

## Lưu ý quan trọng
- **Database**: Toàn bộ dữ liệu của bạn sẽ được lưu vào một "Volume" của Docker. Dù bạn có xóa Container thì dữ liệu vẫn còn đó cho lần chạy sau.
- **DinkToPdf**: Tôi đã cài đặt sẵn các thư viện Linux bên trong Container, nên việc in chứng chỉ sẽ hoạt động bình thường mà không cần cài thêm gì lên máy Windows của bạn.

Chúc bạn có trải nghiệm tuyệt vời với "đám mây" thu nhỏ trên máy tính của mình!
