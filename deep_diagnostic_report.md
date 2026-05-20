# 🔬 SMARTLMS.AI DEEP DIAGNOSTIC REPORT
**Thời gian:** 15:44:49 20/5/2026
**VPS:** http://141.253.114.218

## 1. API Danh Sách: `/api/public/courses`
- **HTTP Status:** `200`
- **Cache Status:** `MISS`
- **Số lượng khóa học:** 3

### Các trường trả về của phần tử đầu tiên:
```json
{
  "courseId": 1,
  "courseName": "Lập trình C# ASP.NET Core Web API Enterprise",
  "summary": "Khóa học thiết kế hệ thống Modular Monolith & Distributed System chuẩn doanh nghiệp.",
  "thumbnailUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  "price": 1500000,
  "discountPrice": 1200000,
  "instructorName": "Hệ thống SmartLMS",
  "rating": 4.8,
  "ratingCount": 42,
  "totalStudents": 2
}
```

## 2. API Chi Tiết: `/api/public/courses/{id}`

### Khóa học ID = 1
- **HTTP Status:** `200`
- **Các trường trả về:**
```json
{
  "courseId": 1,
  "courseName": "Lập trình C# ASP.NET Core Web API Enterprise",
  "description": "Khóa học thiết kế hệ thống Modular Monolith & Distributed System chuẩn doanh nghiệp.",
  "price": 1500000,
  "thumbnailUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  "rating": 4.8,
  "ratingCount": 42,
  "instructor": {
    "fullName": null,
    "bio": null,
    "donateUrl": null
  },
  "modules": [
    {
      "title": "Chương 1: Tổng quan và Thiết lập Môi trường",
      "lessons": [
        {
          "lessonId": 1,
          "title": "Bài 1: Khởi tạo Project & Giải thích kiến trúc",
          "lessonType": "Video"
        },
        {
          "lessonId": 2,
          "title": "Bài 2: Làm quen với Entity Framework Core",
          "lessonType": "Video"
        }
      ]
    },
    {
      "title": "Chương 2: Xây dựng RESTful API và DB Context",
      "lessons": [
        {
          "lessonId": 3,
          "title": "Bài 3: Thực hành REST API Controller",
          "lessonType": "Text"
        }
      ]
    }
  ]
}
```

**Kiểm tra các trường:**
| Trường | Giá trị | Trạng thái |
|--------|---------|-----------|
| `courseId` | `1` | ✅ |
| `courseName` | `Lập trình C# ASP.NET Core Web API Enterprise` | ✅ |
| `description` | `Khóa học thiết kế hệ thống Modular Monolith & Distributed System chuẩn doanh nghiệp.` | ✅ |
| `price` | `1500000` | ✅ |
| `thumbnailUrl` | `https://images.unsplash.com/photo-1517694712202-14dd9538aa97` | ✅ |
| `instructor.fullName` | `null` | ❌ NULL/UNDEFINED |
| `modules (count)` | `2` | ✅ |

### Khóa học ID = 2
- **HTTP Status:** `200`
- **Các trường trả về:**
```json
{
  "courseId": 2,
  "courseName": "Làm chủ AI & Machine Learning với Python",
  "description": "Khóa học từ cơ bản đến nâng cao về ML.NET, TensorFlow và Python.",
  "price": 2200000,
  "thumbnailUrl": "https://images.unsplash.com/photo-1527474305487-b87b222841cc",
  "rating": 4.9,
  "ratingCount": 85,
  "instructor": {
    "fullName": null,
    "bio": null,
    "donateUrl": null
  },
  "modules": [
    {
      "title": "Chương 1: Giới thiệu ML và Học máy",
      "lessons": []
    }
  ]
}
```

**Kiểm tra các trường:**
| Trường | Giá trị | Trạng thái |
|--------|---------|-----------|
| `courseId` | `2` | ✅ |
| `courseName` | `Làm chủ AI & Machine Learning với Python` | ✅ |
| `description` | `Khóa học từ cơ bản đến nâng cao về ML.NET, TensorFlow và Python.` | ✅ |
| `price` | `2200000` | ✅ |
| `thumbnailUrl` | `https://images.unsplash.com/photo-1527474305487-b87b222841cc` | ✅ |
| `instructor.fullName` | `null` | ❌ NULL/UNDEFINED |
| `modules (count)` | `1` | ✅ |

### Khóa học ID = 3
- **HTTP Status:** `200`
- **Các trường trả về:**
```json
{
  "courseId": 3,
  "courseName": "Kiến trúc Hệ thống Phân tán (Distributed Systems)",
  "description": "Tìm hiểu chi tiết về Docker, Kubernetes, Load Balancer, Redis và RabbitMQ.",
  "price": 3500000,
  "thumbnailUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  "rating": 4.7,
  "ratingCount": 19,
  "instructor": {
    "fullName": null,
    "bio": null,
    "donateUrl": null
  },
  "modules": []
}
```

**Kiểm tra các trường:**
| Trường | Giá trị | Trạng thái |
|--------|---------|-----------|
| `courseId` | `3` | ✅ |
| `courseName` | `Kiến trúc Hệ thống Phân tán (Distributed Systems)` | ✅ |
| `description` | `Tìm hiểu chi tiết về Docker, Kubernetes, Load Balancer, Redis và RabbitMQ.` | ✅ |
| `price` | `3500000` | ✅ |
| `thumbnailUrl` | `https://images.unsplash.com/photo-1558494949-ef010cbdcc31` | ✅ |
| `instructor.fullName` | `null` | ❌ NULL/UNDEFINED |
| `modules (count)` | `0` | ✅ |

## 3. Phân Tích Nguyên Nhân & Fix

### 🔍 Chẩn đoán vấn đề `$undefined` price trên trang Courses
- API trả về trường `price`: **✅ CÓ**
- API sử dụng **camelCase** (price, courseId, courseName, thumbnailUrl...)
- React Courses.jsx đọc `course.price` → **nếu hiển thị `$undefined` thì Docker đang chạy bản build cũ**

> **🛠️ FIX:** Rebuild Docker frontend container trên VPS với code mới nhất.

### 🔍 Chẩn đoán vấn đề "Course not found" khi xem chi tiết
**Dòng code gây lỗi trong C# backend (CoursesApiController.cs dòng 120):**
```csharp
.FirstOrDefaultAsync(c => c.CourseId == id && !c.IsDeleted);
// ⚠️ KHÔNG lọc theo Status = "Published"
// Nghĩa là: Khóa học "Draft" vẫn trả về 200 ở detail endpoint
// ✅ Điều này thực ra OK! Vấn đề nằm ở chỗ khác...
```

**Thực tế:** API chi tiết KHÔNG bị lỗi (trả về 200). Vấn đề "Course not found" là do **React frontend đang chạy bản build cũ** trên Docker container.
```
Trong bản build cũ, CourseDetails.jsx có thể đang gọi endpoint khác hoặc có lỗi logic khác.
```

### 🔍 Chẩn đoán vấn đề `instructor.fullName = null`
- Dữ liệu seed SQL đã thêm Users (admin, giangvien1, ...) nhưng các Courses **KHÔNG có InstructorId trỏ đến User nào**.
- Fix: Cập nhật cột `InstructorId` trong bảng Courses để trỏ đến UserID của giảng viên hợp lệ.

---

## 4. ✅ Kế Hoạch Sửa Lỗi (Theo Thứ Tự Ưu Tiên)

| # | Việc cần làm | Lệnh/File | Ưu tiên |
|---|------------|-----------|---------|
| 1 | Rebuild Docker image frontend | `docker compose -f docker-compose.prod.yml build frontend && docker compose -f docker-compose.prod.yml up -d frontend` | 🔴 CAO |
| 2 | Cập nhật InstructorId cho Courses | SQL UPDATE | 🟡 TRUNG |
| 3 | Kiểm tra lại trạng thái sau rebuild | node test_api_auth.js | 🟢 |