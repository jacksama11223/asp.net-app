# Báo cáo Chẩn đoán Hệ thống: Luồng chuyển trang & Thiết lập Nút bấm (Unified UI Master Audit)

*Thời gian quét:* 09:01:14 19/5/2026
*Tổng số tệp UI đã phân tích:* **80**
*Địa chỉ VPS đích:* **http://141.253.114.218**

## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATUS)

| Chỉ số kiểm thử hệ thống | Số lượng | Trạng thái chẩn đoán |
| :--- | :--- | :--- |
| 🟢 Nút hoạt động tốt (Gọi API / Local) | **124** | Đạt chuẩn kết nối và nghiệp vụ |
| 🔄 Nút Chuyển tiếp trang (Navigation) | **102** | Đã cấu hình chuyển hướng luồng đi |
| 🔴 Nút Chưa hoạt động (Dead Buttons) | **67** | Cần gán API / onclick xử lý |
| ⚠️ Trang mồ côi (Orphan Pages - Bị cô lập) | **15** | Chưa có nút bấm ở trang khác dẫn tới |

--- 

## ⚠️ DANH SÁCH CÁC TRANG MỒ CÔI (ORPHAN PAGES - 15)

Các trang sau đang bị cô lập khỏi giao diện người dùng chính (không có nút bấm nào từ trang khác dẫn tới):

| Tên Trang | Công nghệ | URL Route | Mô tả tính năng | Khắc phục đề xuất |
| :--- | :--- | :--- | :--- | :--- |
| `AccessDenied.cshtml` | `CSHTML` | `/Account/AccessDenied` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Account" asp-action="AccessDenied"` vào Sidebar Admin. |
| `Solve.cshtml` | `CSHTML` | `/CodingChallenge/Solve` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="CodingChallenge" asp-action="Solve"` vào Sidebar Admin. |
| `Create.cshtml` | `CSHTML` | `/CodingChallengeManagement/Create` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="CodingChallengeManagement" asp-action="Create"` vào Sidebar Admin. |
| `Edit.cshtml` | `CSHTML` | `/CodingChallengeManagement/Edit` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="CodingChallengeManagement" asp-action="Edit"` vào Sidebar Admin. |
| `Members.cshtml` | `CSHTML` | `/Cohort/Members` | Quản lý thành viên lớp học, cohort cụ thể (Admin). | Tích hợp TagHelper `asp-controller="Cohort" asp-action="Members"` vào Sidebar Admin. |
| `Create.cshtml` | `CSHTML` | `/Coupon/Create` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Coupon" asp-action="Create"` vào Sidebar Admin. |
| `Create.cshtml` | `CSHTML` | `/CourseManagement/Create` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="CourseManagement" asp-action="Create"` vào Sidebar Admin. |
| `Curriculum.cshtml` | `CSHTML` | `/CourseManagement/Curriculum` | Thiết lập khung chương trình học, thêm bớt bài giảng (Admin). | Tích hợp TagHelper `asp-controller="CourseManagement" asp-action="Curriculum"` vào Sidebar Admin. |
| `Edit.cshtml` | `CSHTML` | `/CourseManagement/Edit` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="CourseManagement" asp-action="Edit"` vào Sidebar Admin. |
| `Index.cshtml` | `CSHTML` | `/Home` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Home" asp-action="Index"` vào Sidebar Admin. |
| `Designer.cshtml` | `CSHTML` | `/Marketing/Designer` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Marketing" asp-action="Designer"` vào Sidebar Admin. |
| `Failure.cshtml` | `CSHTML` | `/Payment/Failure` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Payment" asp-action="Failure"` vào Sidebar Admin. |
| `PaymentResults.cshtml` | `CSHTML` | `/Payment/PaymentResults` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Payment" asp-action="PaymentResults"` vào Sidebar Admin. |
| `Success.cshtml` | `CSHTML` | `/Payment/Success` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Payment" asp-action="Success"` vào Sidebar Admin. |
| `Error.cshtml` | `CSHTML` | `/Shared/Error` | Phân hệ giao diện chức năng hệ thống. | Tích hợp TagHelper `asp-controller="Shared" asp-action="Error"` vào Sidebar Admin. |


--- 

## 🔍 CHI TIẾT SỰ KIỆN NÚT BẤM & LUỒNG DI CHUYỂN TỪNG TRANG (PAGE-BY-PAGE ANALYSIS)

### 📄 Trang: [AICareerReport.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/AICareerReport.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\AICareerReport.jsx`
* **Đường dẫn Route:** `/ai-career-analysis` (Chạy thử VPS: [http://141.253.114.218/ai-career-analysis](http://141.253.114.218/ai-career-analysis))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Báo cáo định hướng nghề nghiệp bằng AI dựa trên hiệu năng code C#.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 54 | `Quay lại Dashboard` | `<Button variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate(-1)} mb="lg">` | **`-1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 161 | `Mở Sổ tay lỗi sai để` | `<Button variant="subtle" color="brand" size="xs" rightSection={<LuTrendingUp size={14} />} onClick={() => navigate('/mistakes')} className="w-fit p-0">` | **`/mistakes`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 246 | `Link` | `<Button variant="light" color="cyan" radius="md" leftSection={<LuSparkles size={18} />} onClick={() => navigate('/ai-career-analysis')}>AI Career Advisor</Button>` |
| `react-test-frontend\src\pages\Dashboard.jsx` | 331 | `Link` | `<CardWrapper className="bg-gradient-to-br from-cyan-500 to-indigo-600 border-none text-white hover:scale-105 transition-all cursor-pointer" p="xl" onClick={() => navigate('/ai-career-analysis')}>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [BookingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/BookingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\BookingPage.jsx`
* **Đường dẫn Route:** `/booking` (Chạy thử VPS: [http://141.253.114.218/booking](http://141.253.114.218/booking))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang đăng ký lịch hẹn tư vấn với Gia sư AI/Giảng viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 81 | `{tutor.fullName?.char` | `<Avatar size="lg" radius="xl" color="brand" style={{ cursor: 'pointer' }} onClick={() => navigate(`/tutor-profile/${tutor.userId}`)}>` | **`/tutor-profile/${tutor.userId}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 91 | `Nút Text` | `<Text fw={700} style={{ cursor: 'pointer' }} className="hover:text-brand-600 transition-colors" onClick={() => navigate(`/tutor-profile/${tutor.userId}`)}>` | **`/tutor-profile/${tutor.userId}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 124 | `Nút ActionIcon` | `<ActionIcon size="xl" radius="md" variant="light" color="brand" onClick={() => navigate(`/tutor-profile/${b.tutorId || b.tutor?.userId || 1}`)}>` | **``/tutor-profile/${b.tutorId || b.tutor?.userId || 1}``** | Điều hướng người dùng sang trang liên kết chức năng |
| 163 | `Confirm Booking` | `<Button fullWidth onClick={handleBooking}>` | **`/tutor-profile/${tutor.userId}`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 247 | `Link` | `<Button variant="light" color="brand" radius="md" leftSection={<LuClock size={18} />} onClick={() => navigate('/booking')}>Book Tutor</Button>` |
| `react-test-frontend\src\pages\TutorProfile.jsx` | 105 | `Link` | `onClick={() => navigate('/booking')}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 103 | `Schedule Meeting` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [CertificateView.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CertificateView.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CertificateView.jsx`
* **Đường dẫn Route:** `/certificate/1` (Chạy thử VPS: [http://141.253.114.218/certificate/1](http://141.253.114.218/certificate/1))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang cấp chứng chỉ hoàn thành khóa học tích hợp QR Code xác thực.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 58 | `Quay lại Góc học tập` | `<Button variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate(-1)} mb="lg">` | **`-1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 143 | `Tải Xuống PDF Bản Cứng` | `<Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" size="md" leftSection={<LuDownload size={18} />} onClick={handleDownload} className="shadow-lg shadow-brand-500/20">` | **`-1`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |
| 154 | `Chia Sẻ Chứng Chỉ (Share Li` | `<Button variant="light" color="brand" radius="md" size="md" leftSection={<LuShare2 size={18} />} onClick={handleShare}>` | **`-1`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\MyLearning.jsx` | 221 | `Link` | `onClick={() => navigate('/certificate/1')}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [CheckoutQR.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CheckoutQR.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CheckoutQR.jsx`
* **Đường dẫn Route:** `/checkout/1` (Chạy thử VPS: [http://141.253.114.218/checkout/1](http://141.253.114.218/checkout/1))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang thanh toán học phí qua mã QR chuyển khoản.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 264 | `Vào Học Ngay` | `<Button size="lg" radius="xl" color="green" onClick={() => navigate('/my-learning')} className="w-full shadow-lg hover:shadow-xl transition-shadow">` | **`/my-learning`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CourseDetails.jsx` | 326 | `Link` | `onClick={() => navigate(`/checkout/${id}`)}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 4)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 206 | `Nút ActionIcon` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 223 | `Nút ActionIcon` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 234 | `Thanh toán qua VNPay` | `${BASE_URL}/api/payment/create-invoice` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 248 | `Giả lập Đã Chuyển Tiền` | `${BASE_URL}/api/payment/create-invoice` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [CodeWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CodeWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CodeWorkspace.jsx`
* **Đường dẫn Route:** `/coding/1` (Chạy thử VPS: [http://141.253.114.218/coding/1](http://141.253.114.218/coding/1))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Không gian thực hành code C# tích hợp Monaco Editor.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityQuizBuilder.jsx` | 51 | `Link` | `navigate('/coding/1');` |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 234 | `Link` | `onClick={() => navigate('/coding/1')}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 113 | `Nút button` | `${BASE_URL}/api/compiler/execute` | Biên dịch và chạy thử code C# Roslyn trực tiếp trên Monaco Editor | N/A - *Sự kiện cục bộ* |
| 136 | `Kết quả (Ou` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Community.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Community.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Community.jsx`
* **Đường dẫn Route:** `/community` (Chạy thử VPS: [http://141.253.114.218/community](http://141.253.114.218/community))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 71 | `Đặt câu hỏi mới` | `<Button size="lg" radius="xl" color="brand" leftSection={<LuPlus size={20} />} onClick={() => navigate('/community/post/new')} className="shadow-xl shadow-brand-500/20 px-8">` | **`/community/post/new`** | Điều hướng người dùng sang trang liên kết chức năng |
| 152 | `Nút Card` | `<Card p={0} radius="2rem" withBorder className="hover:shadow-xl transition-all border-slate-100 group cursor-pointer bg-white overflow-hidden" onClick={() => navigate(`/community/${post.postId}`)}>` | **`/community/${post.postId}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 263 | `Xem tất cả` | `<Button variant="subtle" size="xs" color="brand" onClick={() => navigate('/leaderboard')}>` | **`/leaderboard`** | Điều hướng người dùng sang trang liên kết chức năng |
| 285 | `Kết nối bạn bè` | `<Button variant="light" fullWidth mt="xl" radius="xl" onClick={() => navigate('/community/friends')}>` | **`/community/friends`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 62 | `Link` | `navigate('/community');` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 79 | `Link` | `onClick={() => navigate('/community')}` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 196 | `Link` | `<Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>Hủy</Button>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 98 | `Link` | `<a class="navbar-brand fw-bold fs-4" href="/Community">` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 106 | `Link` | `<li class="nav-item"><a class="nav-link px-3" href="/Community">Khám phá</a></li>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 244 | `Nút Badge` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 160 | `Nút ActionIcon` | `<ActionIcon variant="subtle" color="brand" size="lg">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityFriends.jsx`
* **Đường dẫn Route:** `/community/friends` (Chạy thử VPS: [http://141.253.114.218/community/friends](http://141.253.114.218/community/friends))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang quản lý bạn bè và kết nối học viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 6)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 132 | `{user` | `<Avatar size={80} radius="xl" color="brand" className="cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate(`/profile/${user.id}`)}>` | **`/profile/${user.id}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 145 | `Hồ sơ` | `<Button variant="light" radius="xl" color="gray" onClick={() => navigate(`/profile/${user.id}`)}>` | **`/profile/${user.id}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 168 | `{req.` | `<Avatar size="lg" radius="xl" color="indigo" className="cursor-pointer" onClick={() => navigate(`/profile/${req.id}`)}>` | **`/profile/${req.id}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 193 | `{frien` | `<Avatar size={70} radius="xl" color="teal" className="cursor-pointer" onClick={() => navigate(`/profile/${friend.id}`)}>` | **`/profile/${friend.id}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 203 | `Hồ sơ` | `<Button variant="subtle" color="brand" radius="xl" size="xs" onClick={() => navigate(`/profile/${friend.id}`)}>` | **`/profile/${friend.id}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 204 | `Chat` | `<Button variant="light" color="indigo" radius="xl" size="xs" leftSection={<LuSend size={14} />} onClick={() => { toast.success(`Mở hộp thoại chat với ${friend.name}...`); navigate(`/creator/messages`); }}>` | **`/creator/messages`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Community.jsx` | 285 | `Link` | `<Button variant="light" fullWidth mt="xl" radius="xl" onClick={() => navigate('/community/friends')}>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 3)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 146 | `Kết bạn` | `/api/friends/request` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |
| 177 | `Chấp nhận` | `/api/friends/accept` | Phê duyệt yêu cầu tương tác và thay đổi trạng thái bản ghi | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |
| 178 | `Nút ActionIcon` | `/api/friends/decline` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityNewPost.jsx`
* **Đường dẫn Route:** `/community/post/new` (Chạy thử VPS: [http://141.253.114.218/community/post/new](http://141.253.114.218/community/post/new))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang đăng chủ đề/bài viết thảo luận mới.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 76 | `Quay lại Cộng đồng` | `<Button variant="subtle" color="gray" radius="xl" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate('/community')}>` | **`/community`** | Điều hướng người dùng sang trang liên kết chức năng |
| 196 | `Hủy` | `<Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>` | **`/community`** | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời |
| 197 | `Đăng bài viết` | `<Button size="md" radius="xl" color="brand" leftSection={<LuSend size={16} />} loading={submitting} onClick={handleSubmit} className="shadow-xl shadow-brand-500/30 px-8">` | **`/community`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 4)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Community.jsx` | 74 | `Link` | `onClick={() => navigate('/community/post/new')}` |
| `react-test-frontend\src\pages\ForumHome.jsx` | 82 | `Link` | `onClick={() => navigate('/community/post/new')}` |
| `react-test-frontend\src\pages\MistakeNotebook.jsx` | 254 | `Link` | `onClick={() => navigate('/community/post/new', {` |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 585 | `Link` | `onClick={() => navigate('/community/post/new', {` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 111 | `Thay ảnh bìa` | `<Button variant="white" size="xs" radius="xl" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" leftSection={<LuSparkles size={14} />}>` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityQuizBuilder.jsx`
* **Đường dẫn Route:** `/community/quiz-builder` (Chạy thử VPS: [http://141.253.114.218/community/quiz-builder](http://141.253.114.218/community/quiz-builder))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trình tạo câu hỏi trắc nghiệm chia sẻ lên diễn đàn.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 195 | `Lưu vào Kho lưu trữ` | `<Button variant="subtle" color="gray" leftSection={<LuPlus size={16} />} onClick={handleSaveQuiz} loading={isSaving}>` | **`/coding/1`** | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống |
| 196 | `Vào chế độ Thi thử` | `<Button color="brand" radius="xl" leftSection={<LuPlay size={16} />} onClick={handleStartExam}>` | **`/coding/1`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\ForumHome.jsx` | 75 | `Link` | `onClick={() => navigate('/community/quiz-builder')}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 133 | `{isGenerating ? 'AI đ` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 175 | `Nút Button` | `<Button key={i} variant="light" color={i === quiz.correct ? 'teal' : 'gray'} radius="md" size="md" justify="flex-start" className="font-medium whitespace-normal h-auto py-3">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseDetails.jsx`
* **Đường dẫn Route:** `/course/1` (Chạy thử VPS: [http://141.253.114.218/course/1](http://141.253.114.218/course/1))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang thông tin chi tiết khóa học, đề cương và giáo trình.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 324 | `Đăng Ký Ngay` | `<Button size="lg" radius="md" color="brand" fullWidth onClick={() => navigate(`/checkout/${id}`)}>` | **`/checkout/${id}`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 3)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CourseManager.jsx` | 354 | `Link` | `<Button variant="light" color="slate" size="xs" leftSection={<LuEye size={14} />} onClick={() => navigate(`/course/${course.courseId}`)}>` |
| `react-test-frontend\src\pages\Courses.jsx` | 184 | `Link` | `onClick={() => navigate(`/course/${course.courseId}`)}` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 556 | `Link` | `window.location.href = '/Course/Search?q=' + $(this).val();` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 6)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 94 | `Gửi đánh giá` | `/api/student/review` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |
| 137 | `Tôi đã chuyển khoản thành c` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 245 | `Viết đánh giá` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 330 | `Ủng hộ Giảng viên ☕` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 337 | `{isFavorite ? 'Đã yêu t` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 387 | `{following ? "Đang th` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseManager.jsx`
* **Đường dẫn Route:** `/creator/courses` (Chạy thử VPS: [http://141.253.114.218/creator/courses](http://141.253.114.218/creator/courses))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Không gian quản lý khóa học của Giảng viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 354 | `Xem chi ti\u1ebft` | `<Button variant="light" color="slate" size="xs" leftSection={<LuEye size={14} />} onClick={() => navigate(`/course/${course.courseId}`)}>` | **`/course/${course.courseId}`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 3)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 104 | `Link` | `onClick={() => navigate('/creator/courses')}` |
| `react-test-frontend\src\pages\Dashboard.jsx` | 127 | `Link` | `<Button variant="light" size="xs" onClick={() => navigate('/creator/courses')}>Xem tất cả</Button>` |
| `react-test-frontend\src\pages\Dashboard.jsx` | 175 | `Link` | `<Button color="white" variant="white" c="indigo" mt="md" radius="md" size="md" onClick={() => navigate('/creator/courses')}>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 14)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 265 | `T\u1ea1o kh\u00f3a h\u1ec` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 276 | `T\u1ea1o b\u00e0i th\u1ef` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 324 | `Nút ActionIcon` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 357 | `Studio` | `/api/compiler/courses/${course.courseId}/lessons` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🟢 Active (405) - *API phản hồi hợp lệ* |
| 378 | `T\u1ea1o b\u00e0i t\u1e` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 421 | `S\u1eeda` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 473 | `H\u1ee7y` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 474 | `L\u01b0u l\u1ea1i` | `/api/compiler/courses/save` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | 🟢 Active (405) - *API phản hồi hợp lệ* |
| 519 | `C\u1ea5u h\` | `/api/compiler/challenges/${lesson.challengeId}` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🟢 Active (405) - *API phản hồi hợp lệ* |
| 537 | `Ho\u00e0n t\u1ea5t` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 646 | `Nút ActionIcon` | `/api/compiler/challenges/save` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🟢 Active (405) - *API phản hồi hợp lệ* |
| 653 | `Th\u00eam TestCase m\u1ed` | `/api/compiler/challenges/save` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🟢 Active (405) - *API phản hồi hợp lệ* |
| 659 | `H\u1ee7y` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 660 | `L\u01b0u & \u00c1p d\u1ee5ng` | `/api/compiler/challenges/save` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | 🟢 Active (405) - *API phản hồi hợp lệ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Courses.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Courses.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Courses.jsx`
* **Đường dẫn Route:** `/courses` (Chạy thử VPS: [http://141.253.114.218/courses](http://141.253.114.218/courses))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Danh mục thư viện khóa học công khai.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 89 | `My Learning` | `<Button variant="default" radius="md" onClick={() => navigate('/my-learning')}>` | **`/my-learning`** | Điều hướng người dùng sang trang liên kết chức năng |
| 180 | `Xem Chi Tiết` | `<Button variant="light" color="brand" radius="md" onClick={() => navigate(`/course/${course.courseId}`)} rightSection={<LuBookOpen size={16} />} className="hover:bg-brand-600 hover:text-white transition-all shadow-md shadow-brand-500/10">` | **`/course/${course.courseId}`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 4)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 248 | `Link` | `<Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" leftSection={<LuZap size={18} />} onClick={() => navigate('/courses')}>Start Learning</Button>` |
| `react-test-frontend\src\pages\LandingPage.jsx` | 125 | `Link` | `to="/courses"` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 143 | `Link` | `<Button variant="subtle" color="brand" onClick={() => navigate('/courses')}>` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 157 | `Link` | `<Button radius="md" color="brand" onClick={() => navigate('/courses')}>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 3)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 90 | `Browse Categories` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 106 | `Filters` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 201 | `Clear Search` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [CreatorAnalytics.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CreatorAnalytics.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CreatorAnalytics.jsx`
* **Đường dẫn Route:** `/creator/analytics` (Chạy thử VPS: [http://141.253.114.218/creator/analytics](http://141.253.114.218/creator/analytics))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang phân tích doanh thu & hiệu suất giảng dạy.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Dashboard.jsx` | 272 | `Link` | `<Button variant="subtle" size="xs" rightSection={<LuPlay size={14} />} onClick={() => navigate('/creator/analytics')}>Export Analytics</Button>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Dashboard.jsx`
* **Đường dẫn Route:** `/dashboard` (Chạy thử VPS: [http://141.253.114.218/dashboard](http://141.253.114.218/dashboard))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Bảng thống kê học tập & phân tích rủi ro thất nghiệp bằng AI.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 9)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 100 | `Tạo Khóa Học Mới` | `<Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius="md" size="lg" leftSection={<LuPlus size={20} />} className="shadow-xl shadow-indigo-500/30" onClick={() => navigate('/creator/courses')}>` | **`/creator/courses`** | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 127 | `Xem tất cả` | `<Button variant="light" size="xs" onClick={() => navigate('/creator/courses')}>` | **`/creator/courses`** | Điều hướng người dùng sang trang liên kết chức năng |
| 175 | `Bắt đầu Studio` | `<Button color="white" variant="white" c="indigo" mt="md" radius="md" size="md" onClick={() => navigate('/creator/courses')}>` | **`/creator/courses`** | Điều hướng người dùng sang trang liên kết chức năng |
| 209 | `Nút ActionIcon` | `<ActionIcon size="xl" color="indigo" variant="filled" onClick={sendMessage}>` | **`/creator/courses`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |
| 246 | `AI Career Advisor` | `<Button variant="light" color="cyan" radius="md" leftSection={<LuSparkles size={18} />} onClick={() => navigate('/ai-career-analysis')}>` | **`/ai-career-analysis`** | Điều hướng người dùng sang trang liên kết chức năng |
| 247 | `Book Tutor` | `<Button variant="light" color="brand" radius="md" leftSection={<LuClock size={18} />} onClick={() => navigate('/booking')}>` | **`/booking`** | Điều hướng người dùng sang trang liên kết chức năng |
| 248 | `Start Learning` | `<Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" leftSection={<LuZap size={18} />} onClick={() => navigate('/courses')}>` | **`/courses`** | Điều hướng người dùng sang trang liên kết chức năng |
| 272 | `Export Analytics` | `<Button variant="subtle" size="xs" rightSection={<LuPlay size={14} />} onClick={() => navigate('/creator/analytics')}>` | **`/creator/analytics`** | Điều hướng người dùng sang trang liên kết chức năng |
| 331 | `Nút CardWrapper` | `<CardWrapper className="bg-gradient-to-br from-cyan-500 to-indigo-600 border-none text-white hover:scale-105 transition-all cursor-pointer" p="xl" onClick={() => navigate('/ai-career-analysis')}>` | **`/ai-career-analysis`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\LoginPage.jsx` | 43 | `Link` | `navigate('/dashboard');` |
| `SmartLMS.Web\Views\CourseManagement\Index.cshtml` | 30 | `Link` | `<li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Payment\PaymentResults.cshtml` | 19 | `Link` | `<a href="/Dashboard" class="btn btn-premium btn-lg w-100">` |
| `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml` | 9 | `Link` | `<li class="breadcrumb-item"><a asp-controller="Dashboard" asp-action="Index">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 205 | `Link` | `<a href="/Dashboard" class="nav-link @(_ctrl == "Dashboard" && _act == "Index" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 153 | `Nhắn tin cho học viên (Test)` | `/api/messages/history/${courseId}/${studentId}` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 343 | `Xem Phân Tích Sự Nghi` | `<Button color="white" variant="white" c="indigo" size="xs" radius="md" fullWidth mt="xs">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\ForumHome.jsx`
* **Đường dẫn Route:** `/community` (Chạy thử VPS: [http://141.253.114.218/community](http://141.253.114.218/community))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Diễn đàn thảo luận và Q&A cộng đồng học viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 72 | `Tạo Quiz đố vui` | `<Button size="md" radius="xl" color="indigo" variant="light" leftSection={<LuZap size={18} />} onClick={() => navigate('/community/quiz-builder')}>` | **`/community/quiz-builder`** | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 79 | `Tạo chủ đề mới` | `<Button size="md" radius="xl" color="brand" leftSection={<LuPlus size={18} />} onClick={() => navigate('/community/post/new')}>` | **`/community/post/new`** | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 130 | `Nút tr` | `<tr key={post.id} className="cursor-pointer hover:bg-slate-50/50" onClick={() => navigate(`/community/${post.id}`)}>` | **`/community/${post.id}`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 62 | `Link` | `navigate('/community');` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 79 | `Link` | `onClick={() => navigate('/community')}` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 196 | `Link` | `<Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>Hủy</Button>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 98 | `Link` | `<a class="navbar-brand fw-bold fs-4" href="/Community">` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 106 | `Link` | `<li class="nav-item"><a class="nav-link px-3" href="/Community">Khám phá</a></li>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 4)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 182 | `1` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 194 | `2` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 206 | `3` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 219 | `Cuối` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LandingPage.jsx`
* **Đường dẫn Route:** `/` (Chạy thử VPS: [http://141.253.114.218/](http://141.253.114.218/))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang giới thiệu chính của LMS, tiếp thị khóa học.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 57 | `Log in` | `<Button component={Link} to="/login" variant="subtle" color="gray" radius="md">` | **`/login`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |
| 58 | `Get Started` | `<Button component={Link} to="/register" color="brand" radius="md" className="shadow-lg shadow-brand-500/20">` | **`/register`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |
| 107 | `Join 12,000+ Students` | `<Button component={Link} to="/register" size="xl" radius="md" color="brand" rightSection={<LuPlay size={20} />} className="px-8 shadow-xl shadow-brand-500/30">` | **`/register`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |
| 118 | `Watch Demo` | `<Button variant="outline" size="xl" radius="md" color="gray" className="px-8 border-black/10 hover:bg-black/5" component={Link} to="/courses">` | **`/courses`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 8)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\api.js` | 33 | `Link` | `window.location.href = '/';` |
| `react-test-frontend\src\App.jsx` | 87 | `Link` | `<Route path="*" element={<Navigate to="/" replace />} />` |
| `react-test-frontend\src\components\Sidebar.jsx` | 40 | `Link` | `navigate('/');` |
| `react-test-frontend\src\components\Topbar.jsx` | 60 | `Link` | `navigate('/');` |
| `react-test-frontend\src\pages\LoginPage.jsx` | 123 | `Link` | `to="/"` |
| `react-test-frontend\src\pages\RegisterPage.jsx` | 166 | `Link` | `to="/"` |
| `SmartLMS.Web\Views\Account\AccessDenied.cshtml` | 56 | `Link` | `<a href="/" class="btn btn-primary btn-custom">Về Trang Chủ</a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 191 | `Link` | `<a href="/" class="brand-link">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 185 | `Nút ActionIcon` | `<ActionIcon variant="subtle" color="gray" size="lg">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 186 | `Nút ActionIcon` | `<ActionIcon variant="subtle" color="gray" size="lg">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Leaderboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Leaderboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Leaderboard.jsx`
* **Đường dẫn Route:** `/leaderboard` (Chạy thử VPS: [http://141.253.114.218/leaderboard](http://141.253.114.218/leaderboard))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Bảng xếp hạng thi đua thành tích học viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 52 | `Nút Button` | `<Button variant="subtle" color="gray" p={0} onClick={() => navigate(-1)}>` | **`-1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 155 | `Tải thêm cao thủ` | `<Button variant="light" color="brand" radius="xl" loading={isLoadingMore} onClick={handleLoadMore}>` | **`-1`** | Nạp thêm bản ghi dữ liệu phân trang tiếp theo |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\Community.jsx` | 263 | `Link` | `<Button variant="subtle" size="xs" color="brand" onClick={() => navigate('/leaderboard')}>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [LoginPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LoginPage.jsx`
* **Đường dẫn Route:** `/login` (Chạy thử VPS: [http://141.253.114.218/login](http://141.253.114.218/login))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang đăng nhập hệ thống đa vai trò.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 121 | `Back to landing` | `<Button component={Link} to="/" variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} size="xs" className="hover:bg-brand-50 hover:text-brand-600 rounded-full">` | **`/`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 4)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\App.jsx` | 39 | `Link` | `if (!token) return <Navigate to="/login" replace />;` |
| `react-test-frontend\src\pages\LandingPage.jsx` | 57 | `Link` | `<Button component={Link} to="/login" variant="subtle" color="gray" radius="md">Log in</Button>` |
| `react-test-frontend\src\pages\RegisterPage.jsx` | 56 | `Link` | `setTimeout(() => navigate('/login'), 2000);` |
| `react-test-frontend\src\pages\RegisterPage.jsx` | 157 | `Link` | `<Anchor component={Link} to="/login" size="sm" fw={700} color="brand">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 106 | `Log In` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [MessageCenter.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MessageCenter.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MessageCenter.jsx`
* **Đường dẫn Route:** `/creator/messages` (Chạy thử VPS: [http://141.253.114.218/creator/messages](http://141.253.114.218/creator/messages))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trung tâm tin nhắn kết nối Học viên - Giảng viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 212 | `Link` | `navigate(`/creator/messages`);` |
| `react-test-frontend\src\pages\PublicProfile.jsx` | 115 | `Link` | `navigate('/creator/messages');` |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 598 | `Link` | `onClick={() => navigate('/creator/messages')}` |
| `react-test-frontend\src\pages\TutorDashboard.jsx` | 201 | `Link` | `navigate(`/creator/messages`);` |
| `react-test-frontend\src\pages\TutorProfile.jsx` | 115 | `Link` | `onClick={() => navigate(`/creator/messages`)}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 47 | `Nút Box` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 138 | `Nút ActionIcon` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 88 | `Nút ActionIcon` | `<ActionIcon variant="subtle" color="gray">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [MistakeNotebook.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MistakeNotebook.jsx`
* **Đường dẫn Route:** `/mistakes` (Chạy thử VPS: [http://141.253.114.218/mistakes](http://141.253.114.218/mistakes))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Sổ tay lưu vết các lỗi biên dịch và gợi ý từ AI.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 97 | `Nút ActionIcon` | `<ActionIcon variant="light" color="gray" radius="xl" onClick={() => navigate(-1)}>` | **`-1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 251 | `Hỏi cộng` | `<Button variant="subtle" size="xs" color="blue" leftSection={<LuMessageSquare size={14} />} onClick={() => navigate('/community/post/new', { state: { lessonTitle: m.lesson?.title, extractedContent: `Tôi đang gặp thắc mắc về một lỗi sai trong bài **${m.lesson?.title}**:\n\n- **Câu trả lời của tôi:** ${m.userAnswer}\n- **Đáp án đúng:** ${m.correctAnswer}\n\n[Mô tả thêm vấn đề của bạn ở đây...]` } })}>` | **`/community/post/new`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 3)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\AICareerReport.jsx` | 166 | `Link` | `onClick={() => navigate('/mistakes')}` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 108 | `Link` | `<Button variant="light" color="blue" fullWidth rightSection={<LuPlay size={16} />} onClick={() => navigate('/mistakes')}>` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 128 | `Link` | `<Button variant="light" color="orange" fullWidth rightSection={<LuPlay size={16} />} onClick={() => navigate('/mistakes')}>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 104 | `AI Phân tích tổng thể` | `/api/ai/analyze-mistakes` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |
| 267 | `Nút ActionIcon` | `/api/student/mistakes/${id}/resolve?confidence=${confidence}` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🟢 Active (405) - *API phản hồi hợp lệ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MyLearning.jsx`
* **Đường dẫn Route:** `/my-learning` (Chạy thử VPS: [http://141.253.114.218/my-learning](http://141.253.114.218/my-learning))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Không gian học tập cá nhân lưu trữ các khóa học đang tham gia.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 7)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 108 | `Bắt đầu ôn tập` | `<Button variant="light" color="blue" fullWidth rightSection={<LuPlay size={16} />} onClick={() => navigate('/mistakes')}>` | **`/mistakes`** | Điều hướng người dùng sang trang liên kết chức năng |
| 128 | `Luyện tập ngay` | `<Button variant="light" color="orange" fullWidth rightSection={<LuPlay size={16} />} onClick={() => navigate('/mistakes')}>` | **`/mistakes`** | Điều hướng người dùng sang trang liên kết chức năng |
| 143 | `Khám phá thêm` | `<Button variant="subtle" color="brand" onClick={() => navigate('/courses')}>` | **`/courses`** | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 157 | `Đến danh mục khóa học` | `<Button radius="md" color="brand" onClick={() => navigate('/courses')}>` | **`/courses`** | Điều hướng người dùng sang trang liên kết chức năng |
| 205 | `Xem lại` | `<Button size="md" radius="md" variant="light" color="green" rightSection={<LuPlay size={16} />} onClick={() => navigate(`/study/${enrollment.courseId}`)}>` | **`/study/${enrollment.courseId}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 215 | `Chứng chỉ` | `<Button size="md" radius="md" variant="gradient" gradient={{ from: 'yellow', to: 'orange' }} rightSection={<LuSparkles size={16} />} onClick={() => navigate('/certificate/1')}>` | **`/certificate/1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 227 | `{enrollment.progr` | `<Button fullWidth mt="md" size="md" radius="md" variant="filled" color="brand" rightSection={<LuPlay size={16} />} onClick={() => navigate(`/study/${enrollment.courseId}`)}>` | **`/study/${enrollment.courseId}`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 4)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CheckoutQR.jsx` | 264 | `Link` | `<Button size="lg" radius="xl" color="green" onClick={() => navigate('/my-learning')} className="w-full shadow-lg hover:shadow-xl transition-shadow">` |
| `react-test-frontend\src\pages\Courses.jsx` | 89 | `Link` | `<Button variant="default" radius="md" onClick={() => navigate('/my-learning')}>My Learning</Button>` |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 162 | `Link` | `onClick={() => navigate('/my-learning')}` |
| `SmartLMS.Web\Views\Payment\Success.cshtml` | 19 | `Link` | `<a href="/my-learning" class="btn btn-premium btn-lg w-100">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [PersonalWiki.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PersonalWiki.jsx`
* **Đường dẫn Route:** `/wiki` (Chạy thử VPS: [http://141.253.114.218/wiki](http://141.253.114.218/wiki))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Sổ tay ghi chép kiến thức cá nhân của học viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\StudyWorkspace.jsx` | 606 | `Link` | `onClick={() => navigate('/wiki')}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 48 | `Nút ActionIcon` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 55 | `{page.titl` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 92 | `Chia sẻ` | `<Button variant="light" color="gray" leftSection={<LuSend size={16} />}>` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 93 | `Nút ActionIcon` | `<ActionIcon variant="subtle" color="gray" size="lg">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PublicProfile.jsx`
* **Đường dẫn Route:** `/profile/1` (Chạy thử VPS: [http://141.253.114.218/profile/1](http://141.253.114.218/profile/1))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Hồ sơ cá nhân công khai hiển thị thành tích/huy hiệu.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 65 | `Quay lại` | `<Button variant="white" size="xs" radius="xl" className="absolute top-4 left-4" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate(-1)}>` | **`-1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 108 | `Gửi tin nhắn` | `<Button size="md" radius="xl" color="brand" className="shadow-lg shadow-brand-500/20" onClick={() => { toast.success(`Đang kết nối hộp thoại chat với ${userData.fullName}...`); navigate('/creator/messages'); }}>` | **`/creator/messages`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 135 | `Link` | `onClick={() => navigate(`/profile/${user.id}`)}` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 145 | `Link` | `<Button variant="light" radius="xl" color="gray" onClick={() => navigate(`/profile/${user.id}`)}>Hồ sơ</Button>` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 168 | `Link` | `<Avatar size="lg" radius="xl" color="indigo" className="cursor-pointer" onClick={() => navigate(`/profile/${req.id}`)}>` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 193 | `Link` | `<Avatar size={70} radius="xl" color="teal" className="cursor-pointer" onClick={() => navigate(`/profile/${friend.id}`)}>` |
| `react-test-frontend\src\pages\CommunityFriends.jsx` | 203 | `Link` | `<Button variant="subtle" color="brand" radius="xl" size="xs" onClick={() => navigate(`/profile/${friend.id}`)}>Hồ sơ</Button>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 97 | `Kết nối` | `/api/friends/request` | Thực thi sự kiện nghiệp vụ tương ứng của trang | 🔴 Broken (404) - *API Route không tồn tại trên VPS Backend* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [RegisterPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\RegisterPage.jsx`
* **Đường dẫn Route:** `/register` (Chạy thử VPS: [http://141.253.114.218/register](http://141.253.114.218/register))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang đăng ký tài khoản học viên mới.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 164 | `Back to landing` | `<Button component={Link} to="/" variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} size="xs" className="hover:bg-brand-50 hover:text-brand-600 rounded-full">` | **`/`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 3)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\LandingPage.jsx` | 58 | `Link` | `<Button component={Link} to="/register" color="brand" radius="md" className="shadow-lg shadow-brand-500/20">Get Started</Button>` |
| `react-test-frontend\src\pages\LandingPage.jsx` | 109 | `Link` | `to="/register"` |
| `react-test-frontend\src\pages\LoginPage.jsx` | 114 | `Link` | `<Anchor component={Link} to="/register" size="sm" fw={700} color="brand">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 149 | `Register Now` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\StudyWorkspace.jsx`
* **Đường dẫn Route:** `/study/1` (Chạy thử VPS: [http://141.253.114.218/study/1](http://141.253.114.218/study/1))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Không gian trình chiếu giáo trình bài học của học viên.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 6)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 158 | `Quay lại Kho khóa học` | `<Button variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate('/my-learning')}>` | **`/my-learning`** | Điều hướng người dùng sang trang liên kết chức năng |
| 230 | `Mở rộng IDE (La` | `<Button variant="light" color="indigo" leftSection={<LuExternalLink size={16} />} onClick={() => navigate('/coding/1')}>` | **`/coding/1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 351 | `Nút Paper` | `<Paper p="md" withBorder radius="md" className="hover:border-brand-500 cursor-pointer group" onClick={() => navigate(`/flashcards/${selectedLesson.lessonId}`)}>` | **`/flashcards/${selectedLesson.lessonId}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 581 | `Hỏi Cộng đồng` | `<Button variant="light" color="blue" fullWidth radius="xl" size="md" leftSection={<LuSend size={16} />} className="hover:shadow-md transition-shadow" onClick={() => navigate('/community/post/new', { state: { lessonTitle: selectedLesson?.title, extractedContent: `Tôi có thắc mắc về bài học **${selectedLesson?.title || ''}**:\n\n[Mô tả vấn đề của bạn ở đây...]` } })}>` | **`/community/post/new`** | Điều hướng người dùng sang trang liên kết chức năng |
| 594 | `Hỏi giảng viên` | `<Button variant="light" color="indigo" fullWidth radius="xl" size="md" leftSection={<LuUsers size={16} />} className="hover:shadow-md transition-shadow" onClick={() => navigate('/creator/messages')}>` | **`/creator/messages`** | Điều hướng người dùng sang trang liên kết chức năng |
| 602 | `Ghi chú cá nhân (Wi` | `<Button variant="light" color="grape" fullWidth radius="xl" size="md" leftSection={<LuPenTool size={16} />} className="hover:shadow-md transition-shadow" onClick={() => navigate('/wiki')}>` | **`/wiki`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\MyLearning.jsx` | 211 | `Link` | `onClick={() => navigate(`/study/${enrollment.courseId}`)}` |
| `react-test-frontend\src\pages\MyLearning.jsx` | 235 | `Link` | `onClick={() => navigate(`/study/${enrollment.courseId}`)}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 9)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 193 | `Nút NavLink` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 238 | `{bookmarked ? "` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 272 | `Nút Paper` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 288 | `Nút Paper` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 304 | `Nút Paper` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 319 | `Nút Paper` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 455 | `{ru` | `/api/compiler/execute` | Biên dịch và chạy thử code C# Roslyn trực tiếp trên Monaco Editor | 🟢 Active (405) - *API phản hồi hợp lệ* |
| 519 | `AI t\u1ef` | `/api/compiler/challenges/auto-create/${selectedLesson.lessonId}` | AI tự động thiết lập thử thách code và sinh bộ testcase mẫu | 🟢 Active (405) - *API phản hồi hợp lệ* |
| 544 | `Xem / Tải xuống` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorDashboard.jsx`
* **Đường dẫn Route:** `/tutor/dashboard` (Chạy thử VPS: [http://141.253.114.218/tutor/dashboard](http://141.253.114.218/tutor/dashboard))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Bảng điều khiển của Gia sư duyệt lịch hẹn.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 53 | `Sửa hồ sơ Tutor` | `<Button variant="light" color="orange" radius="xl" onClick={() => navigate('/tutor/profile/edit')}>` | **`/tutor/profile/edit`** | Điều hướng người dùng sang trang liên kết chức năng |
| 119 | `Quản lý lịch rảnh` | `<Button variant="light" color="orange" size="xs" radius="xl" onClick={() => navigate('/tutor/availability')}>` | **`/tutor/availability`** | Điều hướng người dùng sang trang liên kết chức năng |
| 193 | `Trả lời ngay` | `<Button fullWidth variant="light" color="blue" size="xs" leftSection={<LuSend size={14} />} onClick={() => { toast.success(`Đang chuyển tới câu hỏi của học viên ${q.student}...`); navigate(`/creator/messages`); }}>` | **`/creator/messages`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 4)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\TutorProfileEdit.jsx` | 40 | `Link` | `navigate('/tutor/dashboard');` |
| `react-test-frontend\src\pages\TutorProfileEdit.jsx` | 58 | `Link` | `onClick={() => navigate('/tutor/dashboard')}` |
| `react-test-frontend\src\pages\TutorProfileEdit.jsx` | 106 | `Link` | `<Button variant="default" radius="md" onClick={() => navigate('/tutor/dashboard')}>Hủy</Button>` |
| `react-test-frontend\src\pages\TutorSchedule.jsx` | 76 | `Link` | `onClick={() => navigate('/tutor/dashboard')}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 3)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 56 | `{isOnline ? 'Đang Online'` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 149 | `Vào phòng` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 153 | `Duyệt` | `Không gọi API (Nút giao diện)` | Phê duyệt yêu cầu tương tác và thay đổi trạng thái bản ghi | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [TutorProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorProfile.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorProfile.jsx`
* **Đường dẫn Route:** `/tutor-profile/1` (Chạy thử VPS: [http://141.253.114.218/tutor-profile/1](http://141.253.114.218/tutor-profile/1))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang hiển thị hồ sơ năng lực của Gia sư.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 62 | `Quay lại` | `<Button variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate(-1)} mb="lg">` | **`-1`** | Điều hướng người dùng sang trang liên kết chức năng |
| 99 | `Đặt Lịch Hẹn Ngay` | `<Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" fullWidth leftSection={<LuCalendar size={18} />} onClick={() => navigate('/booking')}>` | **`/booking`** | Điều hướng người dùng sang trang liên kết chức năng |
| 109 | `Nhắn Tin Trao Đổi` | `<Button variant="light" color="brand" radius="md" fullWidth leftSection={<LuMessageSquare size={18} />} onClick={() => navigate(`/creator/messages`)}>` | **`/creator/messages`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\BookingPage.jsx` | 86 | `Link` | `onClick={() => navigate(`/tutor-profile/${tutor.userId}`)}` |
| `react-test-frontend\src\pages\BookingPage.jsx` | 95 | `Link` | `onClick={() => navigate(`/tutor-profile/${tutor.userId}`)}` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [TutorProfileEdit.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorProfileEdit.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorProfileEdit.jsx`
* **Đường dẫn Route:** `/tutor/profile/edit` (Chạy thử VPS: [http://141.253.114.218/tutor/profile/edit](http://141.253.114.218/tutor/profile/edit))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang cập nhật hồ sơ cá nhân của Gia sư.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 54 | `Quay lại Tutor Dashboard` | `<Button variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate('/tutor/dashboard')} mb="lg">` | **`/tutor/dashboard`** | Điều hướng người dùng sang trang liên kết chức năng |
| 106 | `Hủy` | `<Button variant="default" radius="md" onClick={() => navigate('/tutor/dashboard')}>` | **`/tutor/dashboard`** | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời |
| 107 | `Lưu Thay Đổi` | `<Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" leftSection={<LuSave size={18} />} onClick={handleSave} className="shadow-lg shadow-brand-500/20">` | **`/tutor/dashboard`** | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\TutorDashboard.jsx` | 53 | `Link` | `<Button variant="light" color="orange" radius="xl" onClick={() => navigate('/tutor/profile/edit')}>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [TutorSchedule.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorSchedule.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorSchedule.jsx`
* **Đường dẫn Route:** `/tutor/availability` (Chạy thử VPS: [http://141.253.114.218/tutor/availability](http://141.253.114.218/tutor/availability))
* **Loại trang:** `React Page`
* **Tính năng chính:** *Trang thiết lập khung giờ rảnh rỗi của Gia sư.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 72 | `Quay lại Tutor Dashboard` | `<Button variant="subtle" color="gray" leftSection={<LuArrowLeft size={16} />} onClick={() => navigate('/tutor/dashboard')} mb="lg">` | **`/tutor/dashboard`** | Điều hướng người dùng sang trang liên kết chức năng |
| 90 | `Lưu Lịch Biểu` | `<Button variant="gradient" gradient={{ from: 'brand', to: 'indigo' }} radius="md" leftSection={<LuSave size={18} />} onClick={handleSave} className="shadow-lg shadow-brand-500/20">` | **`/tutor/dashboard`** | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống |
| 135 | `Thêm Khung Giờ` | `<Button variant="light" color="brand" radius="md" mt="sm" leftSection={<LuPlus size={18} />} onClick={handleAddSlot}>` | **`/tutor/dashboard`** | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 176 | `Nút ActionIcon` | `<ActionIcon variant="subtle" color="red" onClick={() => handleDelete(item.id)}>` | **`/tutor/dashboard`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\TutorDashboard.jsx` | 119 | `Link` | `<Button variant="light" color="orange" size="xs" radius="xl" onClick={() => navigate('/tutor/availability')}>Quản lý lịch rảnh</Button>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [AccessDenied.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/AccessDenied.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\AccessDenied.cshtml`
* **Đường dẫn Route:** `/Account/AccessDenied` (Chạy thử VPS: [http://141.253.114.218/Account/AccessDenied](http://141.253.114.218/Account/AccessDenied))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 55 | `Đăng Xuất` | `<a href="/Account/Logout" class="btn btn-danger btn-custom mr-2">` | **`/Account/Logout`** | Điều hướng người dùng sang trang liên kết chức năng |
| 56 | `Về Trang Chủ` | `<a href="/" class="btn btn-primary btn-custom">` | **`/`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Login.cshtml`
* **Đường dẫn Route:** `/Account/Login` (Chạy thử VPS: [http://141.253.114.218/Account/Login](http://141.253.114.218/Account/Login))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 3)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Account\Register.cshtml` | 115 | `Link` | `<p class="text-white-50">Bạn đã có tài khoản? <a href="/Account/Login">Quay lại Đăng nhập</a></p>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 110 | `Link` | `<a href="/Account/Login" class="btn btn-premium">Bắt đầu ngay</a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 169 | `Link` | `<a href="/Account/Login" class="btn btn-primary btn-sm mt-1 px-3">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 187 | `Đăng Nhập` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Register.cshtml`
* **Đường dẫn Route:** `/Account/Register` (Chạy thử VPS: [http://141.253.114.218/Account/Register](http://141.253.114.218/Account/Register))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Account\Login.cshtml` | 195 | `Link` | `<p class="text-white-50">Bạn chưa có tài khoản? <a href="/Account/Register">Đăng ký ngay</a></p>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 109 | `Đăng Ký Tài Khoản` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Affiliate/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Affiliate\Index.cshtml`
* **Đường dẫn Route:** `/Affiliate` (Chạy thử VPS: [http://141.253.114.218/Affiliate](http://141.253.114.218/Affiliate))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 392 | `Link` | `<a href="/Affiliate" class="nav-link @(_ctrl == "Affiliate" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 93 | `Sao chép link` | `<button class="btn btn-outline-primary btn-copy" data-clipboard-target="#refLink" title="Sao chép link">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 96 | `Tạo link mới` | `<button class="btn btn-outline-success btn-generate-link ml-1" title="Tạo link mới">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |

--- 

### 📄 Trang: [AchievementHub.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/AchievementHub.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\AchievementHub.cshtml`
* **Đường dẫn Route:** `/Assessment/AchievementHub` (Chạy thử VPS: [http://141.253.114.218/Assessment/AchievementHub](http://141.253.114.218/Assessment/AchievementHub))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 330 | `Link` | `<a href="/Assessment/AchievementHub" class="nav-link @(_act == "AchievementHub" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BadgeStudio.cshtml`
* **Đường dẫn Route:** `/Assessment/BadgeStudio` (Chạy thử VPS: [http://141.253.114.218/Assessment/BadgeStudio](http://141.253.114.218/Assessment/BadgeStudio))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Hệ thống thiết kế huy hiệu thành tích điểm thưởng XP (Admin).*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 366 | `Link` | `<a href="/Assessment/BadgeStudio" class="nav-link @(_act == "BadgeStudio" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 34 | `Nút div` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 115 | `Lưu huy hiệu` | `Gửi dữ liệu Form (POST/PUT)` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 21 | `Tạo Huy hiệu mới` | `<button class="btn btn-indigo shadow-sm" data-toggle="modal" data-target="#addBadgeModal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 44 | `Chỉnh sửa` | `<button class="btn btn-sm btn-outline-indigo btn-block">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 86 | `&times;` | `<button type="button" class="close text-white" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 114 | `Hủy` | `<button type="button" class="btn btn-secondary" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời |

--- 

### 📄 Trang: [BulkImport.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BulkImport.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BulkImport.cshtml`
* **Đường dẫn Route:** `/Assessment/BulkImport` (Chạy thử VPS: [http://141.253.114.218/Assessment/BulkImport](http://141.253.114.218/Assessment/BulkImport))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 348 | `Link` | `<a href="/Assessment/BulkImport" class="nav-link @(_act == "BulkImport" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 47 | `Tải file E` | `<a href="#" class="btn btn-outline-info btn-block shadow-sm">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Điều hướng người dùng sang trang liên kết chức năng |

--- 

### 📄 Trang: [ExamAssembler.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ExamAssembler.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\ExamAssembler.cshtml`
* **Đường dẫn Route:** `/Assessment/ExamAssembler` (Chạy thử VPS: [http://141.253.114.218/Assessment/ExamAssembler](http://141.253.114.218/Assessment/ExamAssembler))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Hệ thống tự động biên soạn đề thi, trắc nghiệm (Admin).*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 354 | `Link` | `<a href="/Assessment/ExamAssembler" class="nav-link @(_act == "ExamAssembler" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 27 | `Copy to clipboard` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 81 | `Lưu & Xuất bản đề thi` | `<button class="btn btn-indigo btn-block shadow">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống |

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\Index.cshtml`
* **Đường dẫn Route:** `/Assessment` (Chạy thử VPS: [http://141.253.114.218/Assessment](http://141.253.114.218/Assessment))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 17 | `Trải nghiệm Quiz Wizard (Demo)` | `<a href="/Assessment/QuizWizard" class="btn btn-outline-primary transition-hover">` | **`/Assessment/QuizWizard`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 324 | `Link` | `<a href="/Assessment" class="nav-link @(_act == "Index" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [ItemAnalysis.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ItemAnalysis.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\ItemAnalysis.cshtml`
* **Đường dẫn Route:** `/Assessment/ItemAnalysis` (Chạy thử VPS: [http://141.253.114.218/Assessment/ItemAnalysis](http://141.253.114.218/Assessment/ItemAnalysis))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 372 | `Link` | `<a href="/Assessment/ItemAnalysis" class="nav-link @(_act == "ItemAnalysis" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Leaderboard.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/Leaderboard.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\Leaderboard.cshtml`
* **Đường dẫn Route:** `/Assessment/Leaderboard` (Chạy thử VPS: [http://141.253.114.218/Assessment/Leaderboard](http://141.253.114.218/Assessment/Leaderboard))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Assessment\QuizWizard.cshtml` | 221 | `Link` | `window.location.href = '/Assessment/Leaderboard';` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 336 | `Link` | `<a href="/Assessment/Leaderboard" class="nav-link @(_act == "Leaderboard" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [QuestionBuilder.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuestionBuilder.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\QuestionBuilder.cshtml`
* **Đường dẫn Route:** `/Assessment/QuestionBuilder` (Chạy thử VPS: [http://141.253.114.218/Assessment/QuestionBuilder](http://141.253.114.218/Assessment/QuestionBuilder))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 25 | `Thêm câu hỏi mới` | `<button class="btn btn-indigo shadow-lg px-4 py-2" onclick="location.href='/Assessment/CreateQuestion'">` | **`/Assessment/CreateQuestion`** | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 70 | `Nút button` | `<button class='btn btn-xs btn-outline-indigo mr-1' onclick='edit(${params.data.questionId})'>` | **`/Assessment/QuestionBuilder/`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Assessment\QuestionBuilder.cshtml` | 146 | `Link` | `function edit(id) { location.href = '/Assessment/QuestionBuilder/' + id; }` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 342 | `Link` | `<a href="/Assessment/QuestionBuilder" class="nav-link @(_act == "QuestionBuilder" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 71 | `Nút button` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [QuizWizard.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuizWizard.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\QuizWizard.cshtml`
* **Đường dẫn Route:** `/Assessment/QuizWizard` (Chạy thử VPS: [http://141.253.114.218/Assessment/QuizWizard](http://141.253.114.218/Assessment/QuizWizard))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 159 | `$` | `<label class="answer-option" onclick="selectOption(this, ${q.questionId}, '${label}')">` | **`/Assessment/Leaderboard`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Assessment\Index.cshtml` | 17 | `Link` | `<a href="/Assessment/QuizWizard" class="btn btn-outline-primary transition-hover"><i class="fas fa-magic"></i> Trải nghiệm Quiz Wizard (Demo)</a>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [RuleEngine.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/RuleEngine.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\RuleEngine.cshtml`
* **Đường dẫn Route:** `/Assessment/RuleEngine` (Chạy thử VPS: [http://141.253.114.218/Assessment/RuleEngine](http://141.253.114.218/Assessment/RuleEngine))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 360 | `Link` | `<a href="/Assessment/RuleEngine" class="nav-link @(_act == "RuleEngine" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 27 | `Hướng dẫn` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 58 | `Lưu cấu hình Rule` | `<button class="btn btn-indigo shadow" id="btn-get" data-step="4" data-intro="Đừng quên bấm Lưu để áp dụng luật mới vào hệ thống nhé!">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống |

--- 

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Login.cshtml`
* **Đường dẫn Route:** `/Auth/Login` (Chạy thử VPS: [http://141.253.114.218/Auth/Login](http://141.253.114.218/Auth/Login))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 3)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `asp.net-group\SmartLMS.Community\Views\Auth\Register.cshtml` | 190 | `Link` | `Đã có tài khoản? <a href="/Auth/Login">Đăng nhập</a>` |
| `asp.net-group\SmartLMS.Community\Views\Shared\_CommunityLayout.cshtml` | 31 | `Link` | `<a href="/Auth/Login" class="border border-cyan-600 text-cyan-600 px-5 py-2 rounded-full font-semibold transition-all hover:bg-cyan-50">Đăng nhập</a>` |
| `SmartLMS.Web\Views\Auth\Register.cshtml` | 190 | `Link` | `Đã có tài khoản? <a href="/Auth/Login">Đăng nhập</a>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 168 | `Đăng nhập` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Register.cshtml`
* **Đường dẫn Route:** `/Auth/Register` (Chạy thử VPS: [http://141.253.114.218/Auth/Register](http://141.253.114.218/Auth/Register))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 3)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `asp.net-group\SmartLMS.Community\Views\Auth\Login.cshtml` | 172 | `Link` | `Chưa có tài khoản? <a href="/Auth/Register">Đăng ký ngay</a>` |
| `asp.net-group\SmartLMS.Community\Views\Shared\_CommunityLayout.cshtml` | 32 | `Link` | `<a href="/Auth/Register" class="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md">Đăng ký</a>` |
| `SmartLMS.Web\Views\Auth\Login.cshtml` | 172 | `Link` | `Chưa có tài khoản? <a href="/Auth/Register">Đăng ký ngay</a>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 186 | `Tạo tài khoản miễn phí` | `Gửi dữ liệu Form (POST/PUT)` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Solve.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallenge/Solve.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallenge\Solve.cshtml`
* **Đường dẫn Route:** `/CodingChallenge/Solve` (Chạy thử VPS: [http://141.253.114.218/CodingChallenge/Solve](http://141.253.114.218/CodingChallenge/Solve))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 50 | `Chạy & Nộp bài` | `/CodingChallenge/Submit` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Create.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Create.cshtml`
* **Đường dẫn Route:** `/CodingChallengeManagement/Create` (Chạy thử VPS: [http://141.253.114.218/CodingChallengeManagement/Create](http://141.253.114.218/CodingChallengeManagement/Create))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 3)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 23 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 59 | `Hủy` | `Không gọi API (Nút giao diện)` | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời | N/A - *Sự kiện cục bộ* |
| 60 | `Tạo & Tiếp tục cấu hình Test Case` | `Gửi dữ liệu Form (POST/PUT)` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Edit.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Edit.cshtml`
* **Đường dẫn Route:** `/CodingChallengeManagement/Edit` (Chạy thử VPS: [http://141.253.114.218/CodingChallengeManagement/Edit](http://141.253.114.218/CodingChallengeManagement/Edit))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 4)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 25 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 60 | `Cập nhật thông tin` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 73 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 83 | `Thêm bộ test` | `Gửi dữ liệu Form (POST/PUT)` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 104 | `Nút button` | `<button class="btn btn-xs btn-danger">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Index.cshtml`
* **Đường dẫn Route:** `/CodingChallengeManagement` (Chạy thử VPS: [http://141.253.114.218/CodingChallengeManagement](http://141.253.114.218/CodingChallengeManagement))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 224 | `Link` | `<a href="/CodingChallengeManagement" class="nav-link @(_ctrl == "CodingChallengeManagement" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 14 | `Thêm bài tập mới` | `Không gọi API (Nút giao diện)` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |
| 47 | `Sửa & Quản lý Test Cases` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Index.cshtml`
* **Đường dẫn Route:** `/Cohort` (Chạy thử VPS: [http://141.253.114.218/Cohort](http://141.253.114.218/Cohort))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 60 | `Nút a` | `<a href="/Cohort/Members/@cohort.CohortId" class="btn btn-sm btn-outline-indigo rounded-pill px-3">` | **`/Cohort/Members/@cohort.CohortId`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 2)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Cohort\Members.cshtml` | 11 | `Link` | `<a href="/Cohort" class="text-muted"><i class="fas fa-arrow-left mr-2"></i></a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 266 | `Link` | `<a href="/Cohort" class="nav-link @(_ctrl == "Cohort" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 7)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 13 | `Tạo Lớp học mới` | `/Cohort/Update` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |
| 32 | `Nút a` | `/Cohort/Update` | Điều hướng người dùng sang trang liên kết chức năng | N/A - *Sự kiện cục bộ* |
| 35 | `Nút a` | `/Cohort/ImportExcel` | Điều hướng người dùng sang trang liên kết chức năng | N/A - *Sự kiện cục bộ* |
| 39 | `Nút a` | `/Cohort/Delete` | Điều hướng người dùng sang trang liên kết chức năng | N/A - *Sự kiện cục bộ* |
| 94 | `Lưu Thông Tin` | `/Cohort/Update` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | N/A - *Sự kiện cục bộ* |
| 116 | `Chọn file Excel` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 123 | `Bắt đầu Import` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 79 | `&times;` | `<button type="button" class="close text-white" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 93 | `Hủy bỏ` | `<button type="button" class="btn btn-light rounded-pill px-4" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời |
| 106 | `&times;` | `<button type="button" class="close text-white" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 122 | `Đóng` | `<button type="button" class="btn btn-light rounded-pill px-4" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời |

--- 

### 📄 Trang: [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Members.cshtml`
* **Đường dẫn Route:** `/Cohort/Members` (Chạy thử VPS: [http://141.253.114.218/Cohort/Members](http://141.253.114.218/Cohort/Members))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Quản lý thành viên lớp học, cohort cụ thể (Admin).*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 59 | `Xóa khỏi lớp` | `/Cohort/RemoveStudent` | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete | N/A - *Sự kiện cục bộ* |
| 90 | `Xác nhận thêm` | `/Cohort/AddStudent` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 16 | `Thêm Sinh viên vào` | `<button type="button" class="btn btn-primary shadow-sm" data-toggle="modal" data-target="#modalAddMember">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 45 | `Nút button` | `<button type="button" class="btn btn-sm btn-outline-primary rounded-pill" data-toggle="modal" data-target="#modalAddMember">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 78 | `&times;` | `<button type="button" class="close" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 89 | `Hủy` | `<button type="button" class="btn btn-secondary" data-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời |

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Community\Index.cshtml`
* **Đường dẫn Route:** `/Community` (Chạy thử VPS: [http://141.253.114.218/Community](http://141.253.114.218/Community))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 13 | `Khám phá ngay` | `<a href="#feed" class="btn btn-premium btn-lg">` | **`#feed`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 62 | `Link` | `navigate('/community');` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 79 | `Link` | `onClick={() => navigate('/community')}` |
| `react-test-frontend\src\pages\CommunityNewPost.jsx` | 196 | `Link` | `<Button variant="subtle" color="gray" radius="xl" onClick={() => navigate('/community')}>Hủy</Button>` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 98 | `Link` | `<a class="navbar-brand fw-bold fs-4" href="/Community">` |
| `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml` | 106 | `Link` | `<li class="nav-item"><a class="nav-link px-3" href="/Community">Khám phá</a></li>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 57 | `@post.Title` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 14 | `Tìm hiểu thêm` | `<a href="#" class="btn btn-outline-light btn-lg rounded-pill px-4">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 26 | `Mới nhất` | `<button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 40 | `Tạo bài viết đầu tiên` | `<button class="btn btn-primary mt-3 px-4">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 78 | `Đăng ký Creator` | `<button class="btn btn-premium w-100">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 98 | `Gửi` | `<button class="btn btn-primary">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Create.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Coupon\Create.cshtml`
* **Đường dẫn Route:** `/Coupon/Create` (Chạy thử VPS: [http://141.253.114.218/Coupon/Create](http://141.253.114.218/Coupon/Create))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 3)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 22 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 54 | `Quay lại` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 55 | `Lưu Coupon` | `Gửi dữ liệu Form (POST/PUT)` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Coupon\Index.cshtml`
* **Đường dẫn Route:** `/Coupon` (Chạy thử VPS: [http://141.253.114.218/Coupon](http://141.253.114.218/Coupon))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 244 | `Link` | `<a href="/Coupon" class="nav-link @(_ctrl == "Coupon" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 13 | `Tạo Mã Mới` | `Không gọi API (Nút giao diện)` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 49 | `Nút button` | `<button class="btn btn-xs btn-outline-danger btn-del" data-id="@item.CouponId">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Create.cshtml`
* **Đường dẫn Route:** `/CourseManagement/Create` (Chạy thử VPS: [http://141.253.114.218/CourseManagement/Create](http://141.253.114.218/CourseManagement/Create))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 57 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 177 | `Nút button` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 109 | `Tiếp theo` | `<button type="button" class="btn btn-primary btn-next px-4" data-next="2">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 137 | `Quay lại` | `<button type="button" class="btn btn-outline-secondary btn-prev" data-prev="1">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 138 | `Tiếp theo` | `<button type="button" class="btn btn-primary btn-next px-4" data-next="3">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 176 | `Quay lại` | `<button type="button" class="btn btn-outline-secondary btn-prev" data-prev="2">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Curriculum.cshtml`
* **Đường dẫn Route:** `/CourseManagement/Curriculum` (Chạy thử VPS: [http://141.253.114.218/CourseManagement/Curriculum](http://141.253.114.218/CourseManagement/Curriculum))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Thiết lập khung chương trình học, thêm bớt bài giảng (Admin).*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 23 | `Thêm Chương` | `<button class="btn btn-primary shadow-sm mr-2" id="btn-add-module">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 24 | `Lưu thứ tự` | `<button class="btn btn-success shadow-sm" id="btn-save-all">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống |
| 61 | `Bài học` | `<button class="btn btn-xs btn-outline-primary btn-add-lesson" data-mod-id="${mod.id}">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 62 | `Nút button` | `<button class="btn btn-xs btn-outline-danger btn-del-node" data-id="${mod.id}">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 71 | `Nút button` | `<button class="btn btn-link btn-xs text-muted btn-preview-les" data-id="${les.id}">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Edit.cshtml`
* **Đường dẫn Route:** `/CourseManagement/Edit` (Chạy thử VPS: [http://141.253.114.218/CourseManagement/Edit](http://141.253.114.218/CourseManagement/Edit))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 51 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 159 | `Lưu thay đổi` | `Gửi dữ liệu Form (POST/PUT)` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 4)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 105 | `Tiếp theo` | `<button type="button" class="btn btn-primary btn-next px-4" data-next="2">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 126 | `Quay lại` | `<button type="button" class="btn btn-outline-secondary btn-prev" data-prev="1">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 127 | `Tiếp theo` | `<button type="button" class="btn btn-primary btn-next px-4" data-next="3">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 158 | `Quay lại` | `<button type="button" class="btn btn-outline-secondary btn-prev" data-prev="2">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Index.cshtml`
* **Đường dẫn Route:** `/CourseManagement` (Chạy thử VPS: [http://141.253.114.218/CourseManagement](http://141.253.114.218/CourseManagement))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 285 | `Thanh toán VNPay` | `<a href="/Payment/Checkout?courseId=${id}" class="btn btn-xs btn-default" title="Thanh toán VNPay">` | **`/Payment/Checkout?courseId=${id}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 286 | `Sửa` | `<a href="/CourseManagement/Edit/${id}" class="btn btn-xs btn-default" title="Sửa">` | **`/CourseManagement/Edit/${id}`** | Điều hướng người dùng sang trang liên kết chức năng |
| 287 | `Đề cương` | `<a href="/CourseManagement/Curriculum/${id}" class="btn btn-xs btn-default" title="Đề cương">` | **`/CourseManagement/Curriculum/${id}`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\CourseManagement\Create.cshtml` | 23 | `Link` | `<li class="breadcrumb-item"><a href="/CourseManagement">Courses</a></li>` |
| `SmartLMS.Web\Views\CourseManagement\Edit.cshtml` | 23 | `Link` | `<li class="breadcrumb-item"><a href="/CourseManagement">Courses</a></li>` |
| `SmartLMS.Web\Views\Payment\Failure.cshtml` | 19 | `Link` | `<a href="/CourseManagement" class="btn btn-outline-secondary w-100">Quay lại danh sách</a>` |
| `SmartLMS.Web\Views\Payment\PaymentResults.cshtml` | 46 | `Link` | `<a href="/CourseManagement" class="btn btn-outline-secondary w-100">Quay lại danh sách</a>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 218 | `Link` | `<a href="/CourseManagement" class="nav-link @(_ctrl == "CourseManagement" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 4)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 139 | `Nút a` | `Không gọi API (Nút giao diện)` | Điều hướng người dùng sang trang liên kết chức năng | N/A - *Sự kiện cục bộ* |
| 142 | `Nút a` | `Không gọi API (Nút giao diện)` | Điều hướng người dùng sang trang liên kết chức năng | N/A - *Sự kiện cục bộ* |
| 146 | `Nút a` | `Không gọi API (Nút giao diện)` | Điều hướng người dùng sang trang liên kết chức năng | N/A - *Sự kiện cục bộ* |
| 156 | `Thêm Mới` | `Không gọi API (Nút giao diện)` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 5)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 113 | `Reset` | `<button id="btn-reset-filter" class="btn btn-sm btn-outline-secondary">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 135 | `Xử` | `<button type="button" class="btn btn-sm btn-outline-info dropdown-toggle" data-toggle="dropdown">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 153 | `Export CSV` | `<button id="btn-export-csv" class="btn btn-sm btn-outline-success mr-2" title="Xuất CSV">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 240 | `$` | `<a href="#" class="text-dark font-weight-bold btn-preview" data-id="${row.courseId}">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Điều hướng người dùng sang trang liên kết chức năng |
| 288 | `Xóa` | `<button class="btn btn-xs btn-default btn-delete" data-id="${id}" title="Xóa">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Loại bỏ bản ghi vĩnh viễn hoặc chuyển trạng thái Soft Delete |

--- 

### 📄 Trang: [Analytics.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Analytics.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Analytics.cshtml`
* **Đường dẫn Route:** `/Dashboard/Analytics` (Chạy thử VPS: [http://141.253.114.218/Dashboard/Analytics](http://141.253.114.218/Dashboard/Analytics))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 211 | `Link` | `<a href="/Dashboard/Analytics" class="nav-link @(_ctrl == "Dashboard" && _act == "Analytics" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Index.cshtml`
* **Đường dẫn Route:** `/Dashboard` (Chạy thử VPS: [http://141.253.114.218/Dashboard](http://141.253.114.218/Dashboard))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 5)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `react-test-frontend\src\pages\LoginPage.jsx` | 43 | `Link` | `navigate('/dashboard');` |
| `SmartLMS.Web\Views\CourseManagement\Index.cshtml` | 30 | `Link` | `<li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Payment\PaymentResults.cshtml` | 19 | `Link` | `<a href="/Dashboard" class="btn btn-premium btn-lg w-100">` |
| `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml` | 9 | `Link` | `<li class="breadcrumb-item"><a asp-controller="Dashboard" asp-action="Index">Dashboard</a></li>` |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 205 | `Link` | `<a href="/Dashboard" class="nav-link @(_ctrl == "Dashboard" && _act == "Index" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 243 | `Chi ti` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 13 | `Làm mới dữ liệu` | `<button type="button" id="btn-refresh" class="btn btn-outline-primary btn-sm shadow-sm">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 130 | `&times;` | `<button type="button" class="close text-white" data-dismiss="offcanvas" aria-label="Close">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 155 | `Gửi Gmail Nhắc Nhở` | `<button id="btn-nudge-real" class="btn btn-primary btn-block font-weight-bold">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Pulse.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Pulse.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Pulse.cshtml`
* **Đường dẫn Route:** `/Dashboard/Pulse` (Chạy thử VPS: [http://141.253.114.218/Dashboard/Pulse](http://141.253.114.218/Dashboard/Pulse))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 145 | `Quản lý Background Jobs` | `<a href="/hangfire" class="btn btn-block btn-outline-indigo btn-sm">` | **`/hangfire`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 285 | `Link` | `<a href="/Dashboard/Pulse" class="nav-link @(_ctrl == "Dashboard" && _act == "Pulse" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 79 | `Nút button` | `<button type="button" class="btn btn-tool text-white" data-card-widget="collapse">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Helpdesk/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Helpdesk\Index.cshtml`
* **Đường dẫn Route:** `/Helpdesk` (Chạy thử VPS: [http://141.253.114.218/Helpdesk](http://141.253.114.218/Helpdesk))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 386 | `Link` | `<a href="/Helpdesk" class="nav-link @(_ctrl == "Helpdesk" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Home/Index.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Home\Index.cshtml`
* **Đường dẫn Route:** `/Home` (Chạy thử VPS: [http://141.253.114.218/Home](http://141.253.114.218/Home))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 34 | `View All` | `<button class="nav-link active" style="border: none; cursor: pointer;">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Privacy.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Home/Privacy.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Home\Privacy.cshtml`
* **Đường dẫn Route:** `/Home/Privacy` (Chạy thử VPS: [http://141.253.114.218/Home/Privacy](http://141.253.114.218/Home/Privacy))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 432 | `Link` | `<a href="/Home/Privacy" class="text-muted mr-3">Điều khoản & Bảo mật</a>` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [ApiKeys.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/ApiKeys.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\IAM\ApiKeys.cshtml`
* **Đường dẫn Route:** `/IAM/ApiKeys` (Chạy thử VPS: [http://141.253.114.218/IAM/ApiKeys](http://141.253.114.218/IAM/ApiKeys))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 297 | `Link` | `<a href="/IAM/ApiKeys" class="nav-link @(_ctrl == "IAM" && _act == "ApiKeys" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 5)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 30 | `Sao chép` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 74 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 76 | `Nút button` | `Gửi dữ liệu Form (POST/PUT)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 99 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 109 | `Tạo ngay` | `Gửi dữ liệu Form (POST/PUT)` | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 15 | `Tạo API Key mới` | `<button class="btn btn-premium" data-bs-toggle="modal" data-bs-target="#generateKeyModal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Mở form khởi tạo thực thể mới (Khóa học/Bài giảng/Huy hiệu) |
| 97 | `Nút button` | `<button type="button" class="btn-close" data-bs-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 108 | `Hủy` | `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Đóng cửa sổ hiện tại và hoàn tác các thay đổi tạm thời |

--- 

### 📄 Trang: [Permissions.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/Permissions.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\IAM\Permissions.cshtml`
* **Đường dẫn Route:** `/IAM/Permissions` (Chạy thử VPS: [http://141.253.114.218/IAM/Permissions](http://141.253.114.218/IAM/Permissions))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 405 | `Link` | `<a href="/IAM/Permissions" class="nav-link @(_ctrl == "IAM" && _act == "Permissions" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Integrations/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Integrations\Index.cshtml`
* **Đường dẫn Route:** `/Integrations` (Chạy thử VPS: [http://141.253.114.218/Integrations](http://141.253.114.218/Integrations))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 398 | `Link` | `<a href="/Integrations" class="nav-link @(_ctrl == "Integrations" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 17 | `Test kết nối Zoom API` | `<button class="btn btn-outline-primary transition-hover">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [CertificateManager.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/CertificateManager.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\CertificateManager.cshtml`
* **Đường dẫn Route:** `/Marketing/CertificateManager` (Chạy thử VPS: [http://141.253.114.218/Marketing/CertificateManager](http://141.253.114.218/Marketing/CertificateManager))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 309 | `Link` | `<a href="/Marketing/CertificateManager" class="nav-link @(_ctrl == "Marketing" && _act == "CertificateManager" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 1)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 67 | `Xem trước` | `/Marketing/PreviewPdf` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 44 | `Cấu hình Phôi bằng` | `<button class="btn btn-outline-light">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |
| 70 | `Gửi Mail` | `<button class="btn btn-sm btn-outline-success px-3">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Designer.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Designer.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Designer.cshtml`
* **Đường dẫn Route:** `/Marketing/Designer` (Chạy thử VPS: [http://141.253.114.218/Marketing/Designer](http://141.253.114.218/Marketing/Designer))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 65 | `Lưu Tọa Độ` | `<button class="btn btn-primary btn-block" id="btnSaveDesign">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống |

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Index.cshtml`
* **Đường dẫn Route:** `/Marketing` (Chạy thử VPS: [http://141.253.114.218/Marketing](http://141.253.114.218/Marketing))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 380 | `Link` | `<a href="/Marketing" class="nav-link @(_ctrl == "Marketing" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 17 | `Thiết kế Chứng chỉ` | `<button class="btn btn-outline-pink transition-hover">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Failure.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Failure.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Failure.cshtml`
* **Đường dẫn Route:** `/Payment/Failure` (Chạy thử VPS: [http://141.253.114.218/Payment/Failure](http://141.253.114.218/Payment/Failure))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 2)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 19 | `Quay lại danh sách` | `<a href="/CourseManagement" class="btn btn-outline-secondary w-100">` | **`/CourseManagement`** | Điều hướng người dùng sang trang liên kết chức năng |
| 20 | `Thử lại` | `<a href="javascript:history.back()" class="btn btn-premium w-100">` | **`javascript:history.back()`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [PaymentResults.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/PaymentResults.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\PaymentResults.cshtml`
* **Đường dẫn Route:** `/Payment/PaymentResults` (Chạy thử VPS: [http://141.253.114.218/Payment/PaymentResults](http://141.253.114.218/Payment/PaymentResults))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 3)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 19 | `Bắt đầu học nga` | `<a href="/Dashboard" class="btn btn-premium btn-lg w-100">` | **`/Dashboard`** | Điều hướng người dùng sang trang liên kết chức năng |
| 46 | `Quay lại danh sách` | `<a href="/CourseManagement" class="btn btn-outline-secondary w-100">` | **`/CourseManagement`** | Điều hướng người dùng sang trang liên kết chức năng |
| 47 | `Thử lại` | `<a href="javascript:history.back()" class="btn btn-premium w-100">` | **`javascript:history.back()`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Success.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Success.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Success.cshtml`
* **Đường dẫn Route:** `/Payment/Success` (Chạy thử VPS: [http://141.253.114.218/Payment/Success](http://141.253.114.218/Payment/Success))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 19 | `Vào kho khóa họ` | `<a href="/my-learning" class="btn btn-premium btn-lg w-100">` | **`/my-learning`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Audit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Audit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Audit.cshtml`
* **Đường dẫn Route:** `/Revenue/Audit` (Chạy thử VPS: [http://141.253.114.218/Revenue/Audit](http://141.253.114.218/Revenue/Audit))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Lịch sử dòng tiền, doanh thu thanh toán (Admin).*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 57 | `Xuất Báo Cáo` | `<a href="/Revenue/ExportExcel" class="btn btn-warning btn-action">` | **`/Revenue/ExportExcel`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 303 | `Link` | `<a href="/Revenue/Audit" class="nav-link @(_ctrl == "Revenue" && _act == "Audit" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 3)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 56 | `Làm mới` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 102 | `Nút button` | `/Revenue/ManualConfirm` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 108 | `Nút button` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Index.cshtml`
* **Đường dẫn Route:** `/Revenue` (Chạy thử VPS: [http://141.253.114.218/Revenue](http://141.253.114.218/Revenue))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 12 | `Xuất báo cáo Excel` | `<a href="/Revenue/ExportExcel" class="btn btn-success shadow-sm">` | **`/Revenue/ExportExcel`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 232 | `Link` | `<a href="/Revenue" class="nav-link @(_ctrl == "Revenue" && _act == "Index" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [PaymentConfig.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/PaymentConfig.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml`
* **Đường dẫn Route:** `/Revenue/PaymentConfig` (Chạy thử VPS: [http://141.253.114.218/Revenue/PaymentConfig](http://141.253.114.218/Revenue/PaymentConfig))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 9 | `Dashboard` | `<a asp-controller="Dashboard" asp-action="Index">` | **`/Dashboard`** | Thực thi sự kiện nghiệp vụ tương ứng của trang |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 238 | `Link` | `<a href="/Revenue/PaymentConfig" class="nav-link @(_ctrl == "Revenue" && _act == "PaymentConfig" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 2)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 27 | `Nút form` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 67 | `Lưu cấu hình` | `Gửi dữ liệu Form (POST/PUT)` | Lưu thông tin cập nhật vào cơ sở dữ liệu hệ thống | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 17 | `Nút button` | `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Error.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/Error.cshtml) ⚠️ **[TRANG MỒ CÔI - ORPHAN PAGE]**
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Shared\Error.cshtml`
* **Đường dẫn Route:** `/Shared/Error` (Chạy thử VPS: [http://141.253.114.218/Shared/Error](http://141.253.114.218/Shared/Error))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 0)
⚠️ <span style="color:red">**Trang chưa có nút bấm trỏ tới! Cần kết nối điều hướng để người dùng có thể mở trang này.**</span>

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/SqlManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\SqlManagement\Index.cshtml`
* **Đường dẫn Route:** `/SqlManagement` (Chạy thử VPS: [http://141.253.114.218/SqlManagement](http://141.253.114.218/SqlManagement))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 0)
*Không có nút bấm nào chuyển hướng đi trang khác từ trang này.*

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 272 | `Link` | `<a href="/SqlManagement" class="nav-link @(_ctrl == "SqlManagement" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 5)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 44 | `Clear Console` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 86 | `Xem lịch s` | `/SqlManagement/GetHealth` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 89 | `Sv rủi ro` | `/SqlManagement/GetHealth` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 92 | `Danh sách` | `/SqlManagement/GetHealth` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 95 | `Kiểm tra d` | `/SqlManagement/GetHealth` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 27 | `Execute Query (Ctr` | `<button class="btn btn-dark btn-sm rounded-pill px-3 shadow" id="btn-execute">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Students\Index.cshtml`
* **Đường dẫn Route:** `/Students` (Chạy thử VPS: [http://141.253.114.218/Students](http://141.253.114.218/Students))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 25 | `Xuất báo cáo` | `<a href="@Url.Action("ExportReport", "Students")" class="btn btn-outline-primary btn-sm rounded-pill shadow-sm">` | **`@Url.Action(`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 251 | `Link` | `<a href="/Students" class="nav-link @(_ctrl == "Students" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 0)
*Không có nút gọi API hoặc nghiệp vụ nội tại nào.*

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

--- 

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\UserManagement\Index.cshtml`
* **Đường dẫn Route:** `/UserManagement` (Chạy thử VPS: [http://141.253.114.218/UserManagement](http://141.253.114.218/UserManagement))
* **Loại trang:** `CSHTML Page`
* **Tính năng chính:** *Phân hệ giao diện chức năng hệ thống.*

#### 🔄 1. Nút Chuyển hướng sang trang khác (Outgoing Navigation - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Trang chuyển hướng tới (Route) | Tính năng nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| 23 | `Xuất Excel (UC-16)` | `<a href="/UserManagement/ExportToExcel" class="btn btn-success shadow-sm">` | **`/UserManagement/ExportToExcel`** | Điều hướng người dùng sang trang liên kết chức năng |

#### 📥 2. Nút từ trang khác dẫn tới trang này (Incoming Links - 1)
| Nguồn file chuyển tiếp | Dòng | Loại liên kết | Code nguồn |
| :--- | :--- | :--- | :--- |
| `SmartLMS.Web\Views\Shared\_Layout.cshtml` | 260 | `Link` | `<a href="/UserManagement" class="nav-link @(_ctrl == "UserManagement" ? "active" : "")">` |

#### 🟢 3. Nút Gọi API / Xử lý tốt (Working Buttons - 5)
| Dòng | Nhãn hiển thị | Endpoint API liên kết | Tính năng nghiệp vụ | Trạng thái Live API trên VPS |
| :--- | :--- | :--- | :--- | :--- |
| 20 | `Nhật ký hệ thống (` | `/UserManagement/GetAuditTrail` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 94 | `Khóa tài khoản` | `/UserManagement/UpdateStatus` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 100 | `Mở khóa tài khoản` | `/UserManagement/UpdateStatus` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 105 | `Xem lịch sử thay đổi` | `/UserManagement/GetAuditTrail` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |
| 128 | `&times;` | `Không gọi API (Nút giao diện)` | Thực thi sự kiện nghiệp vụ tương ứng của trang | N/A - *Sự kiện cục bộ* |

#### 🔴 4. Nút Chưa hoạt động / Nút chết (Dead/Unhandled Buttons - 1)
| Dòng | Nhãn hiển thị | Thẻ HTML/JSX | Lỗi chi tiết | Tính năng dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| 104 | `Sửa thông tin` | `<button class="btn btn-sm btn-outline-primary" title="Sửa thông tin">` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick / onclick (Nút chết)</span> | Tính năng giao diện (Chưa kết nối luồng xử lý) |

--- 

