# Báo cáo Giám định: Nguyên nhân nghẽn Build ASP.NET & React

## 1. Tại sao lệnh Build ASP.NET bị lỗi mạng (TLS handshake timeout)?
Lỗi `failed to do request: Head "https://mcr.microsoft.com/v2/dotnet/aspnet/manifests/8.0": net/http: TLS handshake timeout` xảy ra không phải do mạng đứt, mà do **Bóp nghẽn Nút cổ chai I/O (Disk I/O Starvation)**.

**Cơ chế gây lỗi:**
1. Trên máy ảo cấu hình thấp (như Oracle 1GB RAM), khi bạn cho Build tuần tự, đôi khi tiến trình kéo Image (như tải `ghcr.io/...` hoặc tải file `sha256...`) phải ghi khối lượng lớn dữ liệu xuống ổ cứng.
2. Do ổ đĩa của gói Free Tier bị giới hạn tốc độ Ghi cực đoan (chỉ cho phép ghi khoảng 50MB/s), ổ cứng bị "treo" ở trạng thái 100% Active Time (I/O Wait).
3. Khi ổ đĩa bị treo, Hệ điều hành Linux sẽ khóa cứng các tiến trình khác (bao gồm cả tiến trình mạng). Do đó, yêu cầu kết nối mạng tới Server của Microsoft bị đứt gánh vì chờ quá lâu (Timeout).

## 2. Điểm mặt "Thủ phạm" làm NPM Install tốn gần 30 phút trong React
Tôi đã phân tích `package.json` của thư mục `react-test-frontend`. Dưới đây là những thư viện "hạng nặng" nhất làm ổ cứng VPS phải gào thét:

### 🔴 Monaco Editor (`@monaco-editor/react`)
- **Mức độ sát thủ IOPS:** Cực cao
- **Lý do:** Monaco Editor chính là cái lõi làm nên phần mềm VS Code của Microsoft. Khi bạn cài nó, NPM phải tải về và giải nén HÀNG CHỤC NGÀN file mã nguồn nhỏ lẻ, các bộ từ điển C#, JS, Python... Việc ghi hàng chục ngàn file nhỏ lẻ này đánh sập giới hạn IOPS (số lần ghi/giây) của ổ cứng VPS.

### 🔴 Mantine UI (`@mantine/core, dates, hooks, styles`)
- **Mức độ sát thủ IOPS:** Rất cao
- **Lý do:** Đây là một bộ UI Framework đồ sộ (to hơn cả Bootstrap). Nó chứa vô vàn các Component phức tạp. Việc bung nén kho đồ sộ này cực kỳ tốn CPU.

### 🟡 Recharts & Video.js (`recharts`, `video.js`)
- **Mức độ sát thủ:** Cao
- **Lý do:** Thư viện vẽ biểu đồ và trình phát video chứa rất nhiều file biên dịch CSS/JS nặng. Đặc biệt Video.js kéo theo rất nhiều plugin bên dưới.

### 🟡 Tailwind & PostCSS (`tailwindcss`, `postcss`)
- **Mức độ sát thủ:** Cao (đặc biệt lúc Build)
- **Lý do:** Dù lúc tải về không quá nặng, nhưng lúc nó quét toàn bộ dự án để chạy lệnh `npm run build`, nó vắt kiệt 100% CPU để sinh ra file CSS.

## 3. Lời khuyên cuối cùng (Action Plan)
Bắt cái VPS nhỏ xíu gánh vác việc cài đặt (NPM Install) và giải nén (Monaco Editor, .NET SDK) là **"Lấy trứng chọi đá"**. Bạn chắc chắn sẽ mất từ 30 phút đến 1 tiếng mỗi lần muốn cập nhật code, chưa kể rủi ro sập VPS như vừa rồi.

**Cách mạng hóa quy trình:** Chúng ta PHẢI chuyển sang Build trên máy tính Local hoặc Build trên Github Actions, sau đó đẩy cái kết quả (Image/File build) lên cho VPS chạy. Đó là giải pháp **duy nhất**!
