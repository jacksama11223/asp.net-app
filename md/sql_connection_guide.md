# Hướng dẫn kết nối Docker với SQL Server trên Windows

Chào bạn! Để Docker có thể "nhìn thấy" dữ liệu thật trên máy bạn, chúng ta cần mở một "cánh cổng" cho SQL Server. Bạn hãy làm theo đúng 3 bước sau nhé:

## Bước 1: Kích hoạt tài khoản `sa` và chế độ mật khẩu

1. Mở **SQL Server Management Studio (SSMS)**.
2. Nhấn vào nút **New Query** ở trên cùng.
3. Dán đoạn mã sau vào và nhấn **Execute (F5)**:
   ```sql
   -- 1. Bật tài khoản sa và đặt mật khẩu
   ALTER LOGIN sa ENABLE;
   GO
   ALTER LOGIN sa WITH PASSWORD = 'AnhLongPro123!';
   GO
   -- 2. Cho phép đăng nhập bằng cả Windows và Mật khẩu (Mixed Mode)
   EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', 
       N'Software\Microsoft\MSSQLServer\MSSQLServer', 
       N'LoginMode', REG_DWORD, 2;
   GO
   ```

## Bước 2: Bật giao thức mạng TCP/IP

Lệnh SQL ở trên chỉ mới cấp "chìa khóa", bây giờ chúng ta cần mở "cửa":
1. Tìm trong Start Menu từ khóa: **SQL Server Configuration Manager**.
2. Tìm đến mục **SQL Server Network Configuration** -> **Protocols for MSSQLSERVER** (hoặc tên bản cài của bạn).
3. Chuột phải vào **TCP/IP** -> Chọn **Enabled**.
4. **Cực kỳ quan trọng:** Sau khi xong, bạn vào mục **SQL Server Services** (trong cùng bảng đó), chuột phải vào **SQL Server (MSSQLSERVER)** -> Chọn **Restart**.

## Bước 3: Mở cổng trên Firewall (Nếu cần)

Nếu sau khi làm các bước trên mà Docker vẫn không kết nối được, bạn hãy chạy lệnh này trong **PowerShell (Admin)** để mở cổng 1433:

```powershell
netsh advfirewall firewall add rule name="SQL Server Port 1433" dir=in action=allow protocol=TCP localport=1433
```

---
**Xong rồi!** Bây giờ bạn chỉ cần quay lại Terminal của dự án và gõ lệnh khởi động Docker như bình thường:

```powershell
docker compose up -d
```

Hệ thống sẽ tự động kết nối và lấy **toàn bộ dữ liệu thực tế** của bạn hiện lên Dashboard!
