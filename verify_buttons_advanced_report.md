# Báo cáo Chẩn đoán API & Tính năng Nút bấm (Enterprise UI Button API Mapping)

*Thời gian quét:* 15:45:02 18/5/2026
*Tổng số tệp UI đã phân tích:* **91**

## DANH SÁCH KHẢO SÁT CHI TIẾT THEO TỪNG TRANG (PAGE-BY-PAGE API MAP)

### 📄 Trang: [Sidebar.jsx](file:///C:/code/asp.net/react-test-frontend/src/components/Sidebar.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\components\Sidebar.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\components*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 63 | `{collapsed ? : }` | `Toggle Sidebar` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Topbar.jsx](file:///C:/code/asp.net/react-test-frontend/src/components/Topbar.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\components\Topbar.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\components*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 101 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [BookingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/BookingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\BookingPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 86 | `{ setSelectedTutor(tutor); ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 140 | `Confirm Booking` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 107 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CheckoutQR.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CheckoutQR.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CheckoutQR.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 206 | `{copied ? : }` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 223 | `{copied ? : }` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 234 | `Nút Icon/Hình ảnh` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: ${BASE_URL}/api/payment/create-invoice`** |
| 248 | `Nút Icon/Hình ảnh` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: ${BASE_URL}/api/payment/create-invoice`** |
| 264 | `navigate('/my-learning')} className="w-full s` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [CodeWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CodeWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CodeWorkspace.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 113 | `{loading ? ( ` | `Không có` | Biên dịch và chạy thử code C# Roslyn trực tiếp trên Monaco Editor | **`Gọi API: ${BASE_URL}/api/compiler/execute`** |
| 136 | `setActiveTab("output")} ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Community.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Community.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Community.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Diễn đàn thảo luận và học tập cộng đồng tích hợp Q&A và mạng xã hội học tập.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 246 | `navigate('/leaderboard')}> ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 268 | `navigate('/community/friends')}> ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 64 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 153 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityFriends.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 91 | `navigate(`/profile/${user.id}`)}>Hồ sơ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 149 | `navigate(`/profile/${friend.id}`)}>Hồ sơ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 92 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 123 | `Chấp nhận` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Phê duyệt yêu cầu tương tác và thay đổi trạng thái bản ghi | *Chưa cấu hình API (Cần liên kết API)* |
| 124 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 150 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityNewPost.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 196 | `navigate('/community')}>Hủy` | `Không có` | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 76 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 111 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 197 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityQuizBuilder.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 96 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 138 | `{opt}` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 158 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 159 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseDetails.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 136 | `setDonateModal(false)}> Tôi đã ch` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 323 | `navigate(`/checkout/${id}`)} > ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 372 | `setFollowing(!following)} > ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 93 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 244 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 329 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 336 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseManager.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Quản lý khóa học, thiết lập bài học và biên soạn đề bài thực hành C# Roslyn Sandbox cho Giảng viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 7)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 324 | `{ setCourseForm({ ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 473 | `setCourseModalOpen(false)}>H\u1ee7y` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 474 | `L\u01b0u l\u1ea1i` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /api/compiler/courses/save`** |
| 537 | `setStudioOpen(false)}>Ho\u00e0n t\u1ea5t` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 646 | `handleRemoveTestCase(index)}> ` | `Không có` | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | **`Không gọi API (Nút giao diện)`** |
| 659 | `setChallengeModalOpen(false)}>H\u1ee7y` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 660 | `L\u01b0u & \u00c1p d\u1ee5ng` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /api/compiler/challenges/save`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 8)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 265 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 276 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 354 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 357 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 378 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 421 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 519 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 653 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Courses.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Courses.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Courses.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Danh sách thư viện khóa học công khai trên hệ thống dành cho mọi đối tượng học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 89 | `navigate('/my-learning')}>My Learning` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 90 | `setSearch('')}>Browse Categories` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 180 | `navigate(`/course/${course.courseId}`)} ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 201 | `setSearch('')}>Clear Search` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 106 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Dashboard.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Bảng thống kê hiệu năng, tỷ lệ hoàn thành khóa học và phân tích rủi ro thất nghiệp bằng trí tuệ nhân tạo (AI Predictor).*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 127 | `navigate('/creator/courses')}>Xem tất cả` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 153 | `openChat(2, c.courseId)} title="Nhắn tin cho ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 175 | `navigate('/creator/courses')}> ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 209 | `Nút Icon/Hình ảnh` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/messages/send`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 100 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 246 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 247 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 271 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\ForumHome.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 69 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 171 | `1` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 172 | `2` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 173 | `3` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 175 | `Cuối` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LandingPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Trang chủ giới thiệu nền tảng SmartLMS.AI, tiếp thị các khóa học nổi bật và dẫn nhập đăng ký.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 57 | `Log in` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 58 | `Get Started` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 107 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 118 | `Watch Demo` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 185 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 186 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Leaderboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Leaderboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Leaderboard.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 37 | `navigate(-1)}> ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 140 | `Tải thêm cao thủ` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Nạp thêm bản ghi dữ liệu phân trang tiếp theo | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [LoginPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LoginPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Cửa ngõ đăng nhập hệ thống phân quyền đa vai trò (Học viên, Giảng viên, Admin).*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 106 | `Log In` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 121 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [MessageCenter.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MessageCenter.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MessageCenter.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 138 | `setMessage('')} className="sh` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 88 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [MistakeNotebook.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MistakeNotebook.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Sổ tay lưu vết các lỗi biên dịch, lỗi logic C# và gợi ý hướng khắc phục tự động bằng AI học máy.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 81 | `navigate(-1)}> ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 249 | `handleResolve(m.mistakeLogId, v)} ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 88 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 233 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MyLearning.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 143 | `navigate('/courses')}> Khám phá` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 157 | `navigate('/courses')}> Đến da` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 108 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 128 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 203 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [PersonalWiki.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PersonalWiki.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 48 | `{/* Add New Page */}}> ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 92 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 93 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PublicProfile.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 41 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 73 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 76 | `Gửi tin nhắn` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [RegisterPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\RegisterPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Trang đăng ký tài khoản học viên mới, mã hóa mật khẩu bảo mật qua EncryptionService.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 149 | `Register Now` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 164 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\StudyWorkspace.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Không gian học tập tích hợp trình chiếu giáo trình và nhúng Monaco IDE thực hành biên dịch code trực tiếp cho Học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 447 | `Nút Icon/Hình ảnh` | `Không có` | Biên dịch và chạy thử code C# Roslyn trực tiếp trên Monaco Editor | **`Gọi API: /api/compiler/execute`** |
| 536 | `selectedLesson?.videoUrl && window.open(selec` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 158 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 230 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 511 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 573 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 586 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 594 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorDashboard.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Bảng điều khiển của Gia sư quản lý lịch rảnh và duyệt các cuộc hẹn tư vấn từ học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 46 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 95 | `Quản lý lịch rảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 125 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 129 | `Duyệt` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Phê duyệt yêu cầu tương tác và thay đổi trạng thái bản ghi | *Chưa cấu hình API (Cần liên kết API)* |
| 159 | `Nút Icon/Hình ảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [AccessDenied.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/AccessDenied.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\AccessDenied.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 55 | `Đăng Xuất` | `Không có` | Đăng xuất phiên làm việc của người dùng hiện tại | **`Liên kết: /Account/Logout`** |
| 56 | `Về Trang Chủ` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Login.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 187 | `Đăng Nhập ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Register.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 109 | `Đăng Ký Tài Khoản ` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Affiliate/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Affiliate\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Affiliate*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 93 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BadgeStudio.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Hệ thống thiết kế huy hiệu, vinh danh thành tích và gamification điểm thưởng XP của admin.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 21 | ` Tạo Huy hiệu mới` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 44 | `Chỉnh sửa` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 85 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 112 | `Hủy` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |
| 113 | `Lưu huy hiệu` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [BulkImport.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BulkImport.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BulkImport.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 47 | ` Tải file Excel mẫu` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Điều hướng người dùng sang trang liên kết chức năng | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [ExamAssembler.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ExamAssembler.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\ExamAssembler.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Hệ thống tự động biên soạn đề thi, trắc nghiệm và quản lý ngân hàng câu hỏi.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 27 | `Copy to clipboard` | `Copy to clipboard` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 81 | ` Lưu & Xuất bản đề thi` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 17 | ` Trải nghiệm Quiz Wizard (Demo)` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Assessment/QuizWizard`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [QuestionBuilder.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuestionBuilder.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\QuestionBuilder.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 25 | ` Thêm câu hỏi mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Liên kết: /Assessment/CreateQuestion`** |
| 70 | `Nút Hành động` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 71 | `Nút Hành động` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [RuleEngine.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/RuleEngine.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\RuleEngine.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 27 | ` Hướng dẫn` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 58 | ` Lưu cấu hình Rule` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Login.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Auth*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 168 | `Đăng nhập` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Register.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Auth*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 186 | `Tạo tài khoản miễn phí` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Solve.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallenge/Solve.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallenge\Solve.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallenge*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 50 | ` Chạy & Nộp bài` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /CodingChallenge/Submit`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Create.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 60 | `Tạo & Tiếp tục cấu hình Test Case` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 59 | `Hủy` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Edit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Edit.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 60 | `Cập nhật thông tin` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |
| 83 | `Thêm bộ test` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 104 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 14 | ` Thêm bài tập mới` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 47 | `Sửa & Quản lý Test Cases` | `Sửa & Quản lý Test Cases` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Cohort*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 60 | `Quản lý ` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Cohort/Members/@cohort.CohortId`** |
| 94 | `Lưu Thông Tin` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /Cohort/Update`** |
| 116 | `Chọn file Excel` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 123 | `Bắt đầu Import` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | ` Tạo Lớp học mới` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 79 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 93 | `Hủy bỏ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |
| 106 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 122 | `Đóng` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Members.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Quản lý thành viên lớp học, thêm học viên vào khóa học/cohort cụ thể.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 59 | `Xóa khỏi lớp` | `Xóa khỏi lớp` | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | **`Gọi API: /Cohort/RemoveStudent`** |
| 90 | `Xác nhận thêm` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gọi API: /Cohort/AddStudent`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 16 | ` Thêm Sinh viên vào lớp` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 45 | ` Thêm thành viên ngay` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 78 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 89 | `Hủy` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Community\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Community*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 13 | `Khám phá ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: #feed`** |
| 26 | `Mới nhất` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 14 | `Tìm hiểu thêm` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 40 | `Tạo bài viết đầu tiên` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 78 | `Đăng ký Creator` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 98 | `Gửi` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Coupon\Create.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Coupon*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 55 | `Lưu Coupon` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 54 | `Quay lại` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Coupon\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Coupon*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | ` Tạo Mã Mới` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 49 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Create.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 177 | ` Hoàn tất &amp; Lưu khóa học` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 109 | `Tiếp theo ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 137 | ` Quay lại` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 138 | `Tiếp theo ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 176 | ` Quay lại` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Curriculum.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Thiết lập khung chương trình học, thêm bớt chương mục và thứ tự bài giảng ở trang quản trị MVC.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 23 | ` Thêm Chương` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 24 | ` Lưu thứ tự` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |
| 61 | ` Bài học` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 62 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 71 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Edit.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 159 | `Lưu thay đổi` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 105 | `Tiếp theo` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 126 | `Quay lại` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 127 | `Tiếp theo` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 158 | `Quay lại` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 285 | `Thanh toán VNPay` | `Thanh toán VNPay` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Payment/Checkout?courseId=${id}`** |
| 286 | `Sửa` | `Sửa` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement/Edit/${id}`** |
| 287 | `Đề cương` | `Đề cương` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement/Curriculum/${id}`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 113 | ` Reset` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 135 | ` Xử lý hàng loạt` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 153 | ` Export CSV` | `Xuất CSV` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 156 | ` Thêm Mới` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 240 | `${val}` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Điều hướng người dùng sang trang liên kết chức năng | *Chưa cấu hình API (Cần liên kết API)* |
| 288 | `Xóa` | `Xóa` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [_CourseDetailPartial.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/_CourseDetailPartial.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\_CourseDetailPartial.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 63 | ` Chỉnh sửa toàn bộ` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement/Edit/@Model.CourseId`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Dashboard*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 243 | ` Chi tiết` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | ` Làm mới dữ liệu` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 130 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 155 | ` Gửi Gmail Nhắc Nhở` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Pulse.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Pulse.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Pulse.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Dashboard*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 145 | `Quản lý Background Jobs` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /hangfire`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 79 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Home/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Home\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Home*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 34 | `View All` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [ApiKeys.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/ApiKeys.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\IAM\ApiKeys.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục IAM*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 15 | `Tạo API Key mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Không gọi API (Nút giao diện)`** |
| 30 | ` Sao chép` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 76 | `Nút Hành động` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** |
| 109 | `Tạo ngay` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 97 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 108 | `Hủy` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Integrations/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Integrations\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Integrations*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | ` Test kết nối Zoom API` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CertificateManager.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/CertificateManager.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\CertificateManager.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 67 | ` Xem trước` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /Marketing/PreviewPdf`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 44 | ` Cấu hình Phôi bằng` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 70 | ` Gửi Mail` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Designer.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Designer.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Designer.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 65 | ` Lưu Tọa Độ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | ` Thiết kế Chứng chỉ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Failure.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Failure.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Failure.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 19 | `Quay lại danh sách` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement`** |
| 20 | `Thử lại` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: javascript:history.back()`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [PaymentResults.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/PaymentResults.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\PaymentResults.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 19 | `Bắt đầu học ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Dashboard`** |
| 46 | `Quay lại danh sách` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement`** |
| 47 | `Thử lại` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: javascript:history.back()`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Success.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Success.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Success.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 19 | `Vào kho khóa học` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /my-learning`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Audit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Audit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Audit.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Lịch sử dòng tiền, doanh thu và kiểm toán thanh toán.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 56 | ` Làm mới` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 57 | ` Xuất Báo Cáo` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Revenue/ExportExcel`** |
| 102 | ` Confirm` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /Revenue/ManualConfirm`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 108 | ` Verified` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Revenue*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 12 | ` Xuất báo cáo Excel` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Revenue/ExportExcel`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [PaymentConfig.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/PaymentConfig.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Revenue*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 67 | ` Lưu cấu hình` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [_CommunityLayout.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/_CommunityLayout.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Shared*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 101 | `Nút Hành động` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |
| 110 | `Bắt đầu ngay` | `Không có` | Xác thực tài khoản và chuyển hướng vào trang quản lý | **`Liên kết: /Account/Login`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [_Layout.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/_Layout.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Shared\_Layout.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Shared*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 169 | ` Đăng nhập` | `Không có` | Xác thực tài khoản và chuyển hướng vào trang quản lý | **`Liên kết: /Account/Login`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 122 | `Nút Hành động` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/SqlManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\SqlManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục SqlManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 27 | ` Execute Query (Ctrl+Enter)` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Students\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Students*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 25 | ` Xuất báo cáo` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 163 | `Gửi nhắc nhở` | `Gửi nhắc nhở` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 166 | `Phân tích rủi ro` | `Phân tích rủi ro` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 218 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\UserManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục UserManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) |
| :--- | :--- | :--- | :--- | :--- |
| 20 | ` Nhật ký hệ thống (Audit)` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/GetAuditTrail`** |
| 23 | ` Xuất Excel (UC-16)` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /UserManagement/ExportToExcel`** |
| 94 | `Khóa tài khoản` | `Khóa tài khoản` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/UpdateStatus`** |
| 100 | `Mở khóa tài khoản` | `Mở khóa tài khoản` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/UpdateStatus`** |
| 105 | `Xem lịch sử thay đổi` | `Xem lịch sử thay đổi` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/GetAuditTrail`** |
| 128 | `&times;` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 104 | `Sửa thông tin` | `Sửa thông tin` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATUS)

| Chỉ số kiểm thử | Số lượng |
| :--- | :--- |
| ✅ Nút hoạt động tốt (Working Buttons) | **102** |
| ❌ Nút chưa hoạt động (Dead Buttons) | **137** |
| 📊 Tổng cộng nút bấm đã quét | **239** |
