# Hướng dẫn Thư viện & Thẩm mỹ Frontend (SmartLMS.AI)

Tài liệu này liệt kê toàn bộ "vũ khí" công nghệ được sử dụng trong dự án `react-test-frontend` để bạn có thể dễ dàng điều chỉnh giao diện và tính năng theo ý muốn.

## 1. Các thư viện cốt lõi (Core)
*   **React 19:** Phiên bản mới nhất của thư viện UI, hỗ trợ hiệu suất cực cao.
*   **React Router v7:** Quản lý chuyển trang (Routing).
    *   *Cách chỉnh:* Xem trong `App.jsx` để thêm/bớt các trang.
*   **Axios:** Xử lý gọi API từ Backend C#.
    *   *Cách chỉnh:* Xem trong `src/api.js` để cấu hình Base URL hoặc Headers.

## 2. Hệ thống Thẩm mỹ & Style (Styling)
*   **Tailwind CSS v4:** Công cụ tạo style nhanh bằng class. 
    *   *Đặc điểm:* Đây là bản v4 mới nhất, cấu hình trực tiếp trong tệp CSS (`@theme`).
    *   *Cách chỉnh:* Mở `src/index.css` để đổi mã màu thương hiệu (brand colors), font chữ hoặc các hiệu ứng kính (glassmorphism).
*   **Lucide React:** Bộ icon hiện đại, tối giản.
    *   *Cách chỉnh:* Nhập thêm icon từ `lucide-react` và sử dụng như một component `<IconName />`.
*   **Framer Motion:** Thư viện xử lý chuyển động (Animations).
    *   *Cách chỉnh:* Chỉnh các thuộc tính `initial`, `animate`, `transition` trong các thẻ `<motion.div>` để đổi kiểu xuất hiện của các phần tử.
*   **Clsx & Tailwind Merge:** Giúp quản lý class CSS một cách linh hoạt (tránh lặp hoặc ghi đè class).

## 3. Biểu đồ & Dữ liệu (Data Visualization)
*   **Recharts:** Vẽ các biểu đồ đường, biểu đồ vùng cho AI Prediction và Dashboard.
    *   *Cách chỉnh:* Xem trong `Dashboard.jsx`. Bạn có thể đổi màu sắc của đường kẻ, đổ bóng hoặc kiểu biểu đồ (Bar, Pie, v.v.).

---

## Mẹo để bạn tự điều chỉnh (Customization)

### Đổi màu chủ đạo (Brand Colors)
Truy cập `src/index.css`, tìm đoạn mã sau để đổi màu:
```css
@theme {
  --color-brand-primary: #6366f1;   /* Đổi màu tím sang màu bạn thích */
  --color-brand-secondary: #a855f7;
  --color-brand-accent: #22d3ee;
}
```

### Đổi hiệu ứng Chuyển trang
Mở `src/components/Layout.jsx`, bạn sẽ thấy thẻ `<motion.div>` bọc quanh `{children}`. Hãy thử đổi `x: 20` thành `y: 50` để trang web trượt từ dưới lên thay vì từ phải sang.

### Cập nhật Icon
Duyệt danh sách icon tại [lucide.dev](https://lucide.dev/icons). Sau đó chỉ cần import vào component tương ứng:
```javascript
import { Camera, Coffee } from 'lucide-react';
```

---

> [!TIP]
> Hệ thống đang sử dụng kiến trúc **Atomic Design** nhẹ. Các thành phần nhỏ nằm trong `src/components`, các trang lớn nằm trong `src/pages`. Bạn nên chỉnh ở `components` để thấy sự thay đổi đồng bộ trên toàn trang web.
