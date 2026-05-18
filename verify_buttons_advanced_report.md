# Báo cáo Chẩn đoán API & Tính năng Nút bấm (Enterprise UI Button API Mapping)

*Thời gian quét:* 18:54:36 18/5/2026
*Tổng số tệp UI đã phân tích:* **96**

## DANH SÁCH KHẢO SÁT CHI TIẾT THEO TỪNG TRANG (PAGE-BY-PAGE API MAP)

### 📄 Trang: [Sidebar.jsx](file:///C:/code/asp.net/react-test-frontend/src/components/Sidebar.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\components\Sidebar.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/ (Route mặc định / hoặc trang con của Sidebar)](http://141.253.114.218/ (Route mặc định / hoặc trang con của Sidebar))
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\components*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 58 | `Nút ThemeIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 63 | `Nút ActionIcon` | `Toggle Sidebar` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 73 | `Nút NavLink` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 127 | `Nút NavLink` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 152 | `Nút NavLink` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Topbar.jsx](file:///C:/code/asp.net/react-test-frontend/src/components/Topbar.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\components\Topbar.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/ (Route mặc định / hoặc trang con của Topbar)](http://141.253.114.218/ (Route mặc định / hoặc trang con của Topbar))
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\components*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 73 | `Nút Burger` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 116 | `Nút UnstyledButton` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/notifications/${id}/read`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 158 | `Đăng xuất` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/notifications/${id}/read`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 101 | `Nút ActionIcon` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 155 | `Hồ sơ cá nhân` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 156 | `Cài đặt` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [AICareerReport.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/AICareerReport.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\AICareerReport.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/ai-career-report](http://141.253.114.218/ai-career-report)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 54 | `Quay lại Dashboard` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 161 | `Mở Sổ tay lỗi sai để thực hành ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /mistakes`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [BookingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/BookingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\BookingPage.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/booking](http://141.253.114.218/booking)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 88 | `Schedule Meeting` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 109 | `Nút ActionIcon` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 148 | `Confirm Booking` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [CertificateView.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CertificateView.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CertificateView.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/certificate/1](http://141.253.114.218/certificate/1)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 58 | `Quay lại Góc học tập` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 143 | `Tải Xuống PDF Bản Cứng` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 154 | `Chia Sẻ Chứng Chỉ (Share Link)` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [CheckoutQR.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CheckoutQR.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CheckoutQR.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/checkout/1](http://141.253.114.218/checkout/1)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 206 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 223 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 234 | `Thanh toán qua VNPay` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: ${BASE_URL}/api/payment/create-invoice`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 248 | `Giả lập Đã Chuyển Tiền` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: ${BASE_URL}/api/payment/create-invoice`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 264 | `Vào Học Ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /my-learning`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [CodeWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CodeWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CodeWorkspace.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/coding/1](http://141.253.114.218/coding/1)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 113 | `Nút button` | `Không có` | Biên dịch và chạy thử code C# Roslyn trực tiếp trên Monaco Editor | **`Gọi API: ${BASE_URL}/api/compiler/execute`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 136 | `Kết quả (Output)` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Community.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Community.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Community.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/ (Route mặc định / hoặc trang con của Community)](http://141.253.114.218/ (Route mặc định / hoặc trang con của Community))
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Diễn đàn thảo luận và học tập cộng đồng tích hợp Q&A và mạng xã hội học tập.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 64 | `Đặt câu hỏi mới` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /community/post/new`** | N/A - *Nút giao diện/Điều hướng* |
| 145 | `Nút Card` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /community/${post.postId}`** | N/A - *Nút giao diện/Điều hướng* |
| 246 | `Xem tất cả` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /leaderboard`** | N/A - *Nút giao diện/Điều hướng* |
| 268 | `Kết nối bạn bè` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /community/friends`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 153 | `Nút ActionIcon` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityFriends.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/community/friends](http://141.253.114.218/community/friends)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 78 | `Nút Avatar` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /profile/${user.id}`** | N/A - *Nút giao diện/Điều hướng* |
| 91 | `Hồ sơ` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /profile/${user.id}`** | N/A - *Nút giao diện/Điều hướng* |
| 114 | `Nút Avatar` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /profile/${req.id}`** | N/A - *Nút giao diện/Điều hướng* |
| 139 | `Nút Avatar` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /profile/${friend.id}`** | N/A - *Nút giao diện/Điều hướng* |
| 149 | `Hồ sơ` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /profile/${friend.id}`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 92 | `Kết bạn` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 123 | `Chấp nhận` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Phê duyệt yêu cầu tương tác và thay đổi trạng thái bản ghi | *Chưa cấu hình API (Cần liên kết API)* |
| 124 | `Nút ActionIcon` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 150 | `Chat` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityNewPost.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/community/post/new](http://141.253.114.218/community/post/new)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 76 | `Quay lại Cộng đồng` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /community`** | N/A - *Nút giao diện/Điều hướng* |
| 196 | `Hủy` | `Không có` | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | **`Điều hướng: /community`** | N/A - *Nút giao diện/Điều hướng* |
| 197 | `Đăng bài viết` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/community/posts`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 111 | `Thay ảnh bìa` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityQuizBuilder.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/community/quiz-builder](http://141.253.114.218/community/quiz-builder)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 96 | `{isGenerating ? 'AI đang biên soạn...' : 'Tạo` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 138 | `Nút Button` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 158 | `Lưu vào Kho lưu trữ` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |
| 159 | `Vào chế độ Thi thử` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseDetails.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/course/1](http://141.253.114.218/course/1)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 93 | `Gửi đánh giá` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/student/review`** | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |
| 136 | `Tôi đã chuyển khoản thành công` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 244 | `Viết đánh giá` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 323 | `Đăng Ký Ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /checkout/${id}`** | N/A - *Nút giao diện/Điều hướng* |
| 329 | `Ủng hộ Giảng viên ☕` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 372 | `Nút Button` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 336 | `Thêm vào yêu thích` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseManager.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/creator/courses](http://141.253.114.218/creator/courses)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Quản lý khóa học, thiết lập bài học và biên soạn đề bài thực hành C# Roslyn Sandbox cho Giảng viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 15)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 265 | `T\u1ea1o kh\u00f3a h\u1ecdc` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 276 | `T\u1ea1o b\u00e0i th\u1ef1c h\u00e0nh Code` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 324 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 354 | `Xem chi ti\u1ebft` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /course/${course.courseId}`** | N/A - *Nút giao diện/Điều hướng* |
| 357 | `Studio` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/compiler/courses/${course.courseId}/lessons`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 378 | `T\u1ea1o b\u00e0i t\u1eadp Code ngay` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 421 | `S\u1eeda` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 473 | `H\u1ee7y` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 474 | `L\u01b0u l\u1ea1i` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /api/compiler/courses/save`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 519 | `C\u1ea5u h\u00ecnh Code` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/compiler/challenges/${lesson.challengeId}`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 537 | `Ho\u00e0n t\u1ea5t` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 646 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/compiler/challenges/save`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 653 | `Th\u00eam TestCase m\u1edbi` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/compiler/challenges/save`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 659 | `H\u1ee7y` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 660 | `L\u01b0u & \u00c1p d\u1ee5ng` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /api/compiler/challenges/save`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Courses.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Courses.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Courses.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/courses](http://141.253.114.218/courses)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Danh sách thư viện khóa học công khai trên hệ thống dành cho mọi đối tượng học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 89 | `My Learning` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /my-learning`** | N/A - *Nút giao diện/Điều hướng* |
| 90 | `Browse Categories` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 106 | `Filters` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 180 | `Xem Chi Tiết` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /course/${course.courseId}`** | N/A - *Nút giao diện/Điều hướng* |
| 201 | `Clear Search` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Dashboard.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/dashboard](http://141.253.114.218/dashboard)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Bảng thống kê hiệu năng, tỷ lệ hoàn thành khóa học và phân tích rủi ro thất nghiệp bằng trí tuệ nhân tạo (AI Predictor).*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 8)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 100 | `Tạo Khóa Học Mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Điều hướng: /creator/courses`** | N/A - *Nút giao diện/Điều hướng* |
| 127 | `Xem tất cả` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /creator/courses`** | N/A - *Nút giao diện/Điều hướng* |
| 153 | `Nhắn tin cho học viên (Test)` | `Nhắn tin cho học viên (Test)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/messages/history/${courseId}/${studentId}`** | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |
| 175 | `Bắt đầu Studio` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /creator/courses`** | N/A - *Nút giao diện/Điều hướng* |
| 209 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/messages/send`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 246 | `Book Tutor` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /booking`** | N/A - *Nút giao diện/Điều hướng* |
| 247 | `Start Learning` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /courses`** | N/A - *Nút giao diện/Điều hướng* |
| 271 | `Export Analytics` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /creator/analytics`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\ForumHome.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/community](http://141.253.114.218/community)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 69 | `Tạo chủ đề mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Điều hướng: /community/post/new`** | N/A - *Nút giao diện/Điều hướng* |
| 119 | `Nút tr` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /community/${post.id}`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 171 | `1` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 172 | `2` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 173 | `3` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 175 | `Cuối` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LandingPage.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/](http://141.253.114.218/)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Trang chủ giới thiệu nền tảng SmartLMS.AI, tiếp thị các khóa học nổi bật và dẫn nhập đăng ký.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 57 | `Log in` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 58 | `Get Started` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 107 | `Join 12,000+ Students` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 118 | `Watch Demo` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 185 | `Nút ActionIcon` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 186 | `Nút ActionIcon` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Leaderboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Leaderboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Leaderboard.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/leaderboard](http://141.253.114.218/leaderboard)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 37 | `Nút Button` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 140 | `Tải thêm cao thủ` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Nạp thêm bản ghi dữ liệu phân trang tiếp theo | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [LoginPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LoginPage.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/login](http://141.253.114.218/login)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Cửa ngõ đăng nhập hệ thống phân quyền đa vai trò (Học viên, Giảng viên, Admin).*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 106 | `Log In` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 121 | `Back to landing` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [MessageCenter.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MessageCenter.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MessageCenter.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/creator/messages](http://141.253.114.218/creator/messages)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 47 | `Nút Box` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 138 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 88 | `Nút ActionIcon` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [MistakeNotebook.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MistakeNotebook.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/mistakes](http://141.253.114.218/mistakes)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Sổ tay lưu vết các lỗi biên dịch, lỗi logic C# và gợi ý hướng khắc phục tự động bằng AI học máy.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 81 | `Nút ActionIcon` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 233 | `Hỏi cộng đồng` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /community/post/new`** | N/A - *Nút giao diện/Điều hướng* |
| 249 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /api/student/mistakes/${id}/resolve?confidence=${confidence}`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 88 | `AI Phân tích tổng thể` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MyLearning.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/my-learning](http://141.253.114.218/my-learning)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 108 | `Bắt đầu ôn tập` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /mistakes`** | N/A - *Nút giao diện/Điều hướng* |
| 128 | `Luyện tập ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /mistakes`** | N/A - *Nút giao diện/Điều hướng* |
| 143 | `Khám phá thêm` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Điều hướng: /courses`** | N/A - *Nút giao diện/Điều hướng* |
| 157 | `Đến danh mục khóa học` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /courses`** | N/A - *Nút giao diện/Điều hướng* |
| 203 | `{enrollment.progress === 100 ? 'Xem lại' : (e` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /study/${enrollment.courseId}`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [PersonalWiki.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PersonalWiki.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/wiki](http://141.253.114.218/wiki)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 48 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 55 | `Nút UnstyledButton` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 92 | `Chia sẻ` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 93 | `Nút ActionIcon` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PublicProfile.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/profile/1](http://141.253.114.218/profile/1)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 41 | `Quay lại` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 73 | `Kết nối` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 76 | `Gửi tin nhắn` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [RegisterPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\RegisterPage.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/register](http://141.253.114.218/register)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Trang đăng ký tài khoản học viên mới, mã hóa mật khẩu bảo mật qua EncryptionService.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 149 | `Register Now` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 164 | `Back to landing` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\StudyWorkspace.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/study/1](http://141.253.114.218/study/1)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Không gian học tập tích hợp trình chiếu giáo trình và nhúng Monaco IDE thực hành biên dịch code trực tiếp cho Học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 14)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 158 | `Quay lại Kho khóa học` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /my-learning`** | N/A - *Nút giao diện/Điều hướng* |
| 193 | `Nút NavLink` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 230 | `{bookmarked ? "Đã lưu dấu trang" : "Đánh dấu` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 264 | `Nút Paper` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 280 | `Nút Paper` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 296 | `Nút Paper` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 311 | `Nút Paper` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 343 | `Nút Paper` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /flashcards/${selectedLesson.lessonId}`** | N/A - *Nút giao diện/Điều hướng* |
| 447 | `{runLoading ? "Đang chấm bài..." : "Chạy Code` | `Không có` | Biên dịch và chạy thử code C# Roslyn trực tiếp trên Monaco Editor | **`Gọi API: /api/compiler/execute`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 511 | `AI t\u1ef1 \u0111\u1ed9ng t\u1ea1o th\u1eed t` | `Không có` | AI tự động thiết lập thử thách code và sinh bộ testcase mẫu | **`Gọi API: /api/compiler/challenges/auto-create/${selectedLesson.lessonId}`** | 🟢 Active (405) - *API phản hồi từ Backend hợp lệ* |
| 536 | `Xem / Tải xuống` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 573 | `Hỏi Cộng đồng` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /community/post/new`** | N/A - *Nút giao diện/Điều hướng* |
| 586 | `Hỏi giảng viên` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /creator/messages`** | N/A - *Nút giao diện/Điều hướng* |
| 594 | `Ghi chú cá nhân (Wiki)` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /wiki`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorDashboard.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/tutor/dashboard](http://141.253.114.218/tutor/dashboard)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Bảng điều khiển của Gia sư quản lý lịch rảnh và duyệt các cuộc hẹn tư vấn từ học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 125 | `Vào phòng Google Meet` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 46 | `Bật trạng thái Online` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 95 | `Quản lý lịch rảnh` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 129 | `Duyệt` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Phê duyệt yêu cầu tương tác và thay đổi trạng thái bản ghi | *Chưa cấu hình API (Cần liên kết API)* |
| 159 | `Trả lời ngay` | `Không có` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [TutorProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorProfile.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorProfile.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/tutor/profile/1](http://141.253.114.218/tutor/profile/1)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 62 | `Quay lại` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 99 | `Đặt Lịch Hẹn Ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /booking`** | N/A - *Nút giao diện/Điều hướng* |
| 109 | `Nhắn Tin Trao Đổi` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /creator/messages`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [TutorProfileEdit.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorProfileEdit.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorProfileEdit.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/tutor/profile/edit](http://141.253.114.218/tutor/profile/edit)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 54 | `Quay lại Tutor Dashboard` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /tutor/dashboard`** | N/A - *Nút giao diện/Điều hướng* |
| 106 | `Hủy` | `Không có` | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | **`Điều hướng: /tutor/dashboard`** | N/A - *Nút giao diện/Điều hướng* |
| 107 | `Lưu Thay Đổi` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /tutor/dashboard`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [TutorSchedule.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorSchedule.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorSchedule.jsx`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/tutor/schedule](http://141.253.114.218/tutor/schedule)
* **Công nghệ:** `React`
* **Mô tả tính năng trang:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 72 | `Quay lại Tutor Dashboard` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Điều hướng: /tutor/dashboard`** | N/A - *Nút giao diện/Điều hướng* |
| 90 | `Lưu Lịch Biểu` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /tutor/dashboard`** | N/A - *Nút giao diện/Điều hướng* |
| 135 | `Thêm Khung Giờ` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gọi API: /tutor/dashboard`** | N/A - *Nút giao diện/Điều hướng* |
| 176 | `Nút ActionIcon` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /tutor/dashboard`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [AccessDenied.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/AccessDenied.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\AccessDenied.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Account/AccessDenied](http://141.253.114.218/Account/AccessDenied)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 55 | `Đăng Xuất` | `Không có` | Đăng xuất phiên làm việc của người dùng hiện tại | **`Liên kết: /Account/Logout`** | N/A - *Nút giao diện/Điều hướng* |
| 56 | `Về Trang Chủ` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Login.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Account/Login](http://141.253.114.218/Account/Login)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 187 | `Đăng Nhập` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Register.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Account/Register](http://141.253.114.218/Account/Register)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 109 | `Đăng Ký Tài Khoản` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Affiliate/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Affiliate\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Affiliate](http://141.253.114.218/Affiliate)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Affiliate*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 93 | `Sao chép link` | `Sao chép link` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 96 | `Tạo link mới` | `Tạo link mới` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BadgeStudio.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Assessment/BadgeStudio](http://141.253.114.218/Assessment/BadgeStudio)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Hệ thống thiết kế huy hiệu, vinh danh thành tích và gamification điểm thưởng XP của admin.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 34 | `Nút div` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 115 | `Lưu huy hiệu` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 21 | `Tạo Huy hiệu mới` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 44 | `Chỉnh sửa` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 86 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 114 | `Hủy` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [BulkImport.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BulkImport.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BulkImport.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Assessment/BulkImport](http://141.253.114.218/Assessment/BulkImport)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 47 | `Tải file Excel mẫu` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Điều hướng người dùng sang trang liên kết chức năng | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [ExamAssembler.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ExamAssembler.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\ExamAssembler.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Assessment/ExamAssembler](http://141.253.114.218/Assessment/ExamAssembler)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Hệ thống tự động biên soạn đề thi, trắc nghiệm và quản lý ngân hàng câu hỏi.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 27 | `Copy to clipboard` | `Copy to clipboard` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 81 | `Lưu & Xuất bản đề thi` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Assessment](http://141.253.114.218/Assessment)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | `Trải nghiệm Quiz Wizard (Demo)` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Assessment/QuizWizard`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [QuestionBuilder.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuestionBuilder.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\QuestionBuilder.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Assessment/QuestionBuilder](http://141.253.114.218/Assessment/QuestionBuilder)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 25 | `Thêm câu hỏi mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Liên kết: /Assessment/CreateQuestion`** | N/A - *Nút giao diện/Điều hướng* |
| 70 | `Nút button` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 71 | `Nút button` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [QuizWizard.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuizWizard.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\QuizWizard.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Assessment/QuizWizard](http://141.253.114.218/Assessment/QuizWizard)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 159 | `$` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [RuleEngine.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/RuleEngine.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\RuleEngine.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Assessment/RuleEngine](http://141.253.114.218/Assessment/RuleEngine)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 27 | `Hướng dẫn` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 58 | `Lưu cấu hình Rule` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Login.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Auth/Login](http://141.253.114.218/Auth/Login)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Auth*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 168 | `Đăng nhập` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Register.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Auth/Register](http://141.253.114.218/Auth/Register)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Auth*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 186 | `Tạo tài khoản miễn phí` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Solve.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallenge/Solve.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallenge\Solve.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CodingChallenge/Solve](http://141.253.114.218/CodingChallenge/Solve)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallenge*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 50 | `Chạy & Nộp bài` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /CodingChallenge/Submit`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Create.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CodingChallengeManagement/Create](http://141.253.114.218/CodingChallengeManagement/Create)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 23 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 59 | `Hủy` | `Không có` | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 60 | `Tạo & Tiếp tục cấu hình Test Case` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Edit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Edit.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CodingChallengeManagement/Edit](http://141.253.114.218/CodingChallengeManagement/Edit)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 25 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 60 | `Cập nhật thông tin` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |
| 73 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 83 | `Thêm bộ test` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 104 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CodingChallengeManagement](http://141.253.114.218/CodingChallengeManagement)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 14 | `Thêm bài tập mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 47 | `Sửa & Quản lý Test Cases` | `Sửa & Quản lý Test Cases` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Cohort](http://141.253.114.218/Cohort)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Cohort*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 8)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | `Tạo Lớp học mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gọi API: /Cohort/Update`** | N/A - *Nút giao diện/Điều hướng* |
| 32 | `Chỉnh sửa` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 35 | `Import Học viên` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 39 | `Xóa lớp` | `Không có` | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 60 | `Quản lý` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Cohort/Members/@cohort.CohortId`** | N/A - *Nút giao diện/Điều hướng* |
| 94 | `Lưu Thông Tin` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gọi API: /Cohort/Update`** | N/A - *Nút giao diện/Điều hướng* |
| 116 | `Chọn file Excel` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 123 | `Bắt đầu Import` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 79 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 93 | `Hủy bỏ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |
| 106 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 122 | `Đóng` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Members.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Cohort/Members](http://141.253.114.218/Cohort/Members)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Quản lý thành viên lớp học, thêm học viên vào khóa học/cohort cụ thể.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 59 | `Xóa khỏi lớp` | `Xóa khỏi lớp` | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | **`Gọi API: /Cohort/RemoveStudent`** | N/A - *Nút giao diện/Điều hướng* |
| 90 | `Xác nhận thêm` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gọi API: /Cohort/AddStudent`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 16 | `Thêm Sinh viên vào lớp` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 45 | `Thêm thành viên ngay` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 78 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 89 | `Hủy` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Community\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Community](http://141.253.114.218/Community)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Community*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | `Khám phá ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: #feed`** | N/A - *Nút giao diện/Điều hướng* |
| 26 | `Mới nhất` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 57 | `@post.Title` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

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
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Coupon/Create](http://141.253.114.218/Coupon/Create)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Coupon*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 22 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 54 | `Quay lại` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 55 | `Lưu Coupon` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Coupon\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Coupon](http://141.253.114.218/Coupon)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Coupon*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | `Tạo Mã Mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 49 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Create.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CourseManagement/Create](http://141.253.114.218/CourseManagement/Create)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 57 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 177 | `Hoàn tất &amp; Lưu khóa học` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 109 | `Tiếp theo` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 137 | `Quay lại` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 138 | `Tiếp theo` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 176 | `Quay lại` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Curriculum.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CourseManagement/Curriculum](http://141.253.114.218/CourseManagement/Curriculum)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Thiết lập khung chương trình học, thêm bớt chương mục và thứ tự bài giảng ở trang quản trị MVC.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 60 | `Nút div` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 23 | `Thêm Chương` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | *Chưa cấu hình API (Cần liên kết API)* |
| 24 | `Lưu thứ tự` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |
| 61 | `Bài học` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 62 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 71 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Edit.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CourseManagement/Edit](http://141.253.114.218/CourseManagement/Edit)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 51 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 159 | `Lưu thay đổi` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

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
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CourseManagement](http://141.253.114.218/CourseManagement)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 9)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 134 | `Nút div` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 139 | `Xuất bản tất cả` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 142 | `Gỡ xuống (Draft)` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 146 | `Xóa mục đã chọn` | `Không có` | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 156 | `Thêm Mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 284 | `Nút div` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 285 | `Thanh toán VNPay` | `Thanh toán VNPay` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Payment/Checkout?courseId=${id}`** | N/A - *Nút giao diện/Điều hướng* |
| 286 | `Sửa` | `Sửa` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement/Edit/${id}`** | N/A - *Nút giao diện/Điều hướng* |
| 287 | `Đề cương` | `Đề cương` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement/Curriculum/${id}`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 113 | `Reset` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 135 | `Xử lý hàng loạt` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 153 | `Export CSV` | `Xuất CSV` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 240 | `$` | `Không có` | <span style="color:red">Nút chết, thiếu hoàn toàn liên kết và sự kiện</span> | Điều hướng người dùng sang trang liên kết chức năng | *Chưa cấu hình API (Cần liên kết API)* |
| 288 | `Xóa` | `Xóa` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [_CourseDetailPartial.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/_CourseDetailPartial.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\_CourseDetailPartial.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/CourseManagement/_CourseDetailPartial](http://141.253.114.218/CourseManagement/_CourseDetailPartial)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 63 | `Chỉnh sửa toàn bộ` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement/Edit/@Model.CourseId`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Dashboard](http://141.253.114.218/Dashboard)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Dashboard*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 243 | `Chi tiết` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | `Làm mới dữ liệu` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 130 | `&times;` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 155 | `Gửi Gmail Nhắc Nhở` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Pulse.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Pulse.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Pulse.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Dashboard/Pulse](http://141.253.114.218/Dashboard/Pulse)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Dashboard*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 145 | `Quản lý Background Jobs` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /hangfire`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 79 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Home/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Home\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Home](http://141.253.114.218/Home)
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
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/IAM/ApiKeys](http://141.253.114.218/IAM/ApiKeys)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục IAM*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 15 | `Tạo API Key mới` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 30 | `Sao chép` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 74 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 76 | `Nút button` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |
| 99 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 109 | `Tạo ngay` | `Không có` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 97 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 108 | `Hủy` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Integrations/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Integrations\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Integrations](http://141.253.114.218/Integrations)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Integrations*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | `Test kết nối Zoom API` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [CertificateManager.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/CertificateManager.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\CertificateManager.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Marketing/CertificateManager](http://141.253.114.218/Marketing/CertificateManager)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 67 | `Xem trước` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /Marketing/PreviewPdf`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 44 | `Cấu hình Phôi bằng` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |
| 70 | `Gửi Mail` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Designer.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Designer.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Designer.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Marketing/Designer](http://141.253.114.218/Marketing/Designer)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 65 | `Lưu Tọa Độ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Marketing](http://141.253.114.218/Marketing)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không có nút nào được gán sự kiện hoặc kết nối.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | `Thiết kế Chứng chỉ` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Failure.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Failure.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Failure.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Payment/Failure](http://141.253.114.218/Payment/Failure)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | `Quay lại danh sách` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement`** | N/A - *Nút giao diện/Điều hướng* |
| 20 | `Thử lại` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: javascript:history.back()`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [PaymentResults.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/PaymentResults.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\PaymentResults.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Payment/PaymentResults](http://141.253.114.218/Payment/PaymentResults)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | `Bắt đầu học ngay` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Dashboard`** | N/A - *Nút giao diện/Điều hướng* |
| 46 | `Quay lại danh sách` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /CourseManagement`** | N/A - *Nút giao diện/Điều hướng* |
| 47 | `Thử lại` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: javascript:history.back()`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Success.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Success.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Success.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Payment/Success](http://141.253.114.218/Payment/Success)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | `Vào kho khóa học` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /my-learning`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Audit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Audit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Audit.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Revenue/Audit](http://141.253.114.218/Revenue/Audit)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Lịch sử dòng tiền, doanh thu và kiểm toán thanh toán.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 55 | `Nút div` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 56 | `Làm mới` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 57 | `Xuất Báo Cáo` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Revenue/ExportExcel`** | N/A - *Nút giao diện/Điều hướng* |
| 102 | `Confirm` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /Revenue/ManualConfirm`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 108 | `Verified` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Revenue](http://141.253.114.218/Revenue)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Revenue*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 12 | `Xuất báo cáo Excel` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /Revenue/ExportExcel`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [PaymentConfig.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/PaymentConfig.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Revenue/PaymentConfig](http://141.253.114.218/Revenue/PaymentConfig)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Revenue*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 9 | `Dashboard` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`MVC Router: /Dashboard/Index`** | N/A - *Nút giao diện/Điều hướng* |
| 27 | `Nút form` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 67 | `Lưu cấu hình` | `Không có` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | **`Gửi dữ liệu Form (POST/PUT)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [_CommunityLayout.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/_CommunityLayout.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Shared/_CommunityLayout](http://141.253.114.218/Shared/_CommunityLayout)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Shared*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 101 | `Nút button` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 110 | `Bắt đầu ngay` | `Không có` | Xác thực tài khoản và chuyển hướng vào trang quản lý | **`Liên kết: /Account/Login`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [_Layout.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/_Layout.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Shared\_Layout.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Shared/_Layout](http://141.253.114.218/Shared/_Layout)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Shared*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 169 | `Đăng nhập` | `Không có` | Xác thực tài khoản và chuyển hướng vào trang quản lý | **`Liên kết: /Account/Login`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 122 | `Nút button` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/SqlManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\SqlManagement\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/SqlManagement](http://141.253.114.218/SqlManagement)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục SqlManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 6)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 44 | `Clear Console` | `Clear Console` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 45 | `Settings` | `Settings` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 86 | `Xem lịch sử truy vấn` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 89 | `Sv rủi ro cao` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 92 | `Danh sách Khóa học` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 95 | `Kiểm tra dung lượng` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 27 | `Execute Query (Ctrl+Enter)` | `Không có` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Students\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/Students](http://141.253.114.218/Students)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục Students*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 25 | `Xuất báo cáo` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: @Url.Action(`** | N/A - *Nút giao diện/Điều hướng* |
| 88 | `Gửi nhắc nhở` | `Gửi nhắc nhở` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\UserManagement\Index.cshtml`
* **Đường dẫn chạy thử trên VPS:** [http://141.253.114.218/UserManagement](http://141.253.114.218/UserManagement)
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng trang:** *Giao diện quản lý MVC thuộc thư mục UserManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 7)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Tính năng nút (Feature) | Endpoint API liên kết (Linked API) | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 20 | `Nhật ký hệ thống (Audit)` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/GetAuditTrail`** | N/A - *Nút giao diện/Điều hướng* |
| 23 | `Xuất Excel (UC-16)` | `Không có` | Điều hướng người dùng sang trang liên kết chức năng | **`Liên kết: /UserManagement/ExportToExcel`** | N/A - *Nút giao diện/Điều hướng* |
| 91 | `Nút div` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |
| 94 | `Khóa tài khoản` | `Khóa tài khoản` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/UpdateStatus`** | N/A - *Nút giao diện/Điều hướng* |
| 100 | `Mở khóa tài khoản` | `Mở khóa tài khoản` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/UpdateStatus`** | N/A - *Nút giao diện/Điều hướng* |
| 105 | `Xem lịch sử thay đổi` | `Xem lịch sử thay đổi` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Gọi API: /UserManagement/GetAuditTrail`** | N/A - *Nút giao diện/Điều hướng* |
| 128 | `&times;` | `Không có` | Thực thi sự kiện nghiệp vụ tương ứng của trang | **`Không gọi API (Nút giao diện)`** | N/A - *Nút giao diện/Điều hướng* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị (Label) | Thuộc tính Placeholder/Title | Lỗi chi tiết | Tính năng dự kiến | Trạng thái API |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 104 | `Sửa thông tin` | `Sửa thông tin` | <span style="color:red">Thiếu sự kiện onclick / điều hướng MVC</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) | *Chưa cấu hình API (Cần liên kết API)* |

---

## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATUS)

| Chỉ số kiểm thử | Số lượng |
| :--- | :--- |
| ✅ Nút hoạt động tốt (Working Buttons) | **211** |
| ❌ Nút chưa hoạt động (Dead Buttons) | **94** |
| 📊 Tổng cộng nút bấm đã quét | **305** |
