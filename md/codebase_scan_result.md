# Báo cáo Quét tự động Codebase SmartLMS.AI

Script này tự động quét qua cấu trúc thư mục và nội dung các file cấu hình quan trọng để trích xuất ra Tech Stack thực tế của dự án.

## 1. Backend Stack & Libraries (Quét từ các file .csproj)
- MediatR (CQRS Pattern)
- Roslyn CodeAnalysis (Code Sandbox)
- ML.NET (Machine Learning)
- SignalR (WebSockets / Real-time)
- Entity Framework Core (ORM)

## 2. Frontend Stack (Quét từ package.json & Views)
- React SPA: React, Vite, TailwindCSS (Phiên bản: 0.0.0)
- ASP.NET MVC Razor Pages: Sử dụng jQuery, AJAX để Server-Side Rendering và tối ưu SEO.

## 3. DevOps, CI/CD & Infrastructure
- Docker Compose: Triển khai Microservices/Worker với các container (backend, frontend, community, mariadb, redis, nginx, cloudflared).
- Nginx Load Balancing: Cấu hình upstream chia tải (Weight 1:3), Rate Limiting (limit_req 200r/s) chống DDoS.
- GitHub Actions (CI/CD): Tự động Build & Push Image lên GHCR (GitHub Container Registry) an toàn với Token.

## 4. Business Logic Nổi bật (Đã xác minh qua Source code)
- Ghi vết bảo mật (Audit Trail) thông qua DbContext.SaveChanges()
- Tích hợp thanh toán (Payment API)
- Xác thực 2 lớp: JWT Token + Cookie Authentication & Policy-based Authorization.
- Xử lý Google ReCAPTCHA v3.
