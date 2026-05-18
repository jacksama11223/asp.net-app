# Báo cáo Phân tích Nút bấm & Giải nghĩa Giao diện (Advanced Interactive UI Audit)

*Thời gian quét:* 15:42:04 18/5/2026
*Tổng số tệp đã phân tích:* **91**

## DANH SÁCH BÁO CÁO PHÂN TÍCH THEO TỪNG TRANG (PAGE-BY-PAGE REPORT)

### 📄 Trang: [Sidebar.jsx](file:///C:/code/asp.net/react-test-frontend/src/components/Sidebar.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\components\Sidebar.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\components*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 63 | `{collapsed ? : }` | `<ActionIcon variant="subtle" color="gray" onClick=...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Topbar.jsx](file:///C:/code/asp.net/react-test-frontend/src/components/Topbar.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\components\Topbar.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\components*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 101 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [BookingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/BookingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\BookingPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 86 | `{ setSelectedTutor(tutor); ` | `<Button fullWidth mt="md" variant="light" onClick=...` | *Không có comment giải thích phía trên* |
| 140 | `Confirm Booking` | `<Button fullWidth onClick={handleBooking}>` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 107 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [CheckoutQR.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CheckoutQR.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CheckoutQR.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 5)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 206 | `{copied ? : }` | `<ActionIcon color={copied ? 'teal' : 'gray'} onCli...` | *Không có comment giải thích phía trên* |
| 223 | `{copied ? : }` | `<ActionIcon color={copied ? 'teal' : 'gray'} onCli...` | *Không có comment giải thích phía trên* |
| 234 | `Không rõ` | `<Button fullWidth mt="sm" color="brand" onClick={h...` | *Không có comment giải thích phía trên* |
| 248 | `Không rõ` | `<Button fullWidth mt="sm" onClick={handleMockPay} ...` | *Không có comment giải thích phía trên* |
| 264 | `navigate('/my-learning')} className="w-full s` | `<Button size="lg" radius="xl" color="green" onClic...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [CodeWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CodeWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CodeWorkspace.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 113 | `{loading ? ( ` | `<button onClick={handleRunCode} disabled={loading}...` | *Không có comment giải thích phía trên* |
| 136 | `setActiveTab("output")} ` | `<button onClick={() =>` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Community.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Community.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Community.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Diễn đàn thảo luận và học tập cộng đồng tích hợp Q&A và mạng xã hội học tập.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 246 | `navigate('/leaderboard')}> ` | `<Button variant="subtle" size="xs" color="brand" o...` | *Không có comment giải thích phía trên* |
| 268 | `navigate('/community/friends')}> ` | `<Button variant="light" fullWidth mt="xl" radius="...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 64 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 153 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [CommunityFriends.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityFriends.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityFriends.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 91 | `navigate(`/profile/${user.id}`)}>Hồ sơ` | `<Button variant="light" radius="xl" color="gray" o...` | *Không có comment giải thích phía trên* |
| 149 | `navigate(`/profile/${friend.id}`)}>Hồ sơ` | `<Button variant="subtle" color="brand" radius="xl"...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 92 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 123 | `Chấp nhận` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 124 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 150 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [CommunityNewPost.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityNewPost.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityNewPost.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 196 | `navigate('/community')}>Hủy` | `<Button variant="subtle" color="gray" radius="xl" ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 76 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 111 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 197 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [CommunityQuizBuilder.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CommunityQuizBuilder.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CommunityQuizBuilder.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 96 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 138 | `{opt}` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 158 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 159 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [CourseDetails.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseDetails.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseDetails.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 136 | `setDonateModal(false)}> Tôi đã ch` | `<Button color="orange" fullWidth radius="xl" size=...` | *Không có comment giải thích phía trên* |
| 323 | `navigate(`/checkout/${id}`)} > ` | `<Button size="lg" radius="md" color="brand" fullWi...` | *Không có comment giải thích phía trên* |
| 372 | `setFollowing(!following)} > ` | `<Button size="compact-xs" variant={following ? "fi...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 93 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 244 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 329 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 336 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [CourseManager.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/CourseManager.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\CourseManager.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Quản lý khóa học, thiết lập bài học và biên soạn đề bài thực hành C# Roslyn Sandbox cho Giảng viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 7)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 324 | `{ setCourseForm({ ` | `<ActionIcon variant="subtle" color="gray" onClick=...` | *Không có comment giải thích phía trên* |
| 473 | `setCourseModalOpen(false)}>H\u1ee7y` | `<Button variant="light" color="gray" onClick={() =...` | *Không có comment giải thích phía trên* |
| 474 | `L\u01b0u l\u1ea1i` | `<Button color="brand" onClick={handleSaveCourse} l...` | *Không có comment giải thích phía trên* |
| 537 | `setStudioOpen(false)}>Ho\u00e0n t\u1ea5t` | `<Button onClick={() =>` | *Không có comment giải thích phía trên* |
| 646 | `handleRemoveTestCase(index)}> ` | `<ActionIcon color="red" variant="light" onClick={(...` | *Không có comment giải thích phía trên* |
| 659 | `setChallengeModalOpen(false)}>H\u1ee7y` | `<Button variant="light" color="gray" onClick={() =...` | *Không có comment giải thích phía trên* |
| 660 | `L\u01b0u & \u00c1p d\u1ee5ng` | `<Button color="green" onClick={handleSaveChallenge...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 8)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 265 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 276 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 354 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 357 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 378 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 421 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 519 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 653 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Courses.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Courses.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Courses.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Danh sách thư viện khóa học công khai trên hệ thống dành cho mọi đối tượng học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 89 | `navigate('/my-learning')}>My Learning` | `<Button variant="default" radius="md" onClick={() ...` | *Không có comment giải thích phía trên* |
| 90 | `setSearch('')}>Browse Categories` | `<Button variant="gradient" gradient={{ from: 'bran...` | *Không có comment giải thích phía trên* |
| 180 | `navigate(`/course/${course.courseId}`)} ` | `<Button variant="light" color="brand" radius="md" ...` | *Không có comment giải thích phía trên* |
| 201 | `setSearch('')}>Clear Search` | `<Button variant="subtle" color="brand" onClick={()...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 106 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Dashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Dashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Dashboard.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Bảng thống kê hiệu năng, tỷ lệ hoàn thành khóa học và phân tích rủi ro thất nghiệp bằng trí tuệ nhân tạo (AI Predictor).*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 127 | `navigate('/creator/courses')}>Xem tất cả` | `<Button variant="light" size="xs" onClick={() =>` | *Không có comment giải thích phía trên* |
| 153 | `openChat(2, c.courseId)} title="Nhắn tin cho ` | `<ActionIcon color="indigo" variant="light" onClick...` | *Không có comment giải thích phía trên* |
| 175 | `navigate('/creator/courses')}> ` | `<Button color="white" variant="white" c="indigo" m...` | *Không có comment giải thích phía trên* |
| 209 | `Chứa icon/html` | `<ActionIcon size="xl" color="indigo" variant="fill...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 100 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 246 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 247 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 271 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [ForumHome.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/ForumHome.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\ForumHome.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 69 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 171 | `1` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 172 | `2` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 173 | `3` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 175 | `Cuối` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [LandingPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LandingPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LandingPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Trang chủ giới thiệu nền tảng SmartLMS.AI, tiếp thị các khóa học nổi bật và dẫn nhập đăng ký.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 6)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 57 | `Log in` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 58 | `Get Started` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 107 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 118 | `Watch Demo` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 185 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 186 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Leaderboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/Leaderboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\Leaderboard.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 37 | `navigate(-1)}> ` | `<Button variant="subtle" color="gray" p={0} onClic...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 140 | `Tải thêm cao thủ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [LoginPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/LoginPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\LoginPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Cửa ngõ đăng nhập hệ thống phân quyền đa vai trò (Học viên, Giảng viên, Admin).*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 106 | `Log In` | `<Button type="submit" fullWidth size="lg" radius="...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 121 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [MessageCenter.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MessageCenter.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MessageCenter.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 138 | `setMessage('')} className="sh` | `<ActionIcon variant="filled" color="brand" size="x...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 88 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [MistakeNotebook.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MistakeNotebook.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MistakeNotebook.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Sổ tay lưu vết các lỗi biên dịch, lỗi logic C# và gợi ý hướng khắc phục tự động bằng AI học máy.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 81 | `navigate(-1)}> ` | `<ActionIcon variant="light" color="gray" radius="x...` | *Không có comment giải thích phía trên* |
| 249 | `handleResolve(m.mistakeLogId, v)} ` | `<ActionIcon key={v} variant="light" color={v <= 2 ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 88 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 233 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [MyLearning.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/MyLearning.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\MyLearning.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 143 | `navigate('/courses')}> Khám phá` | `<Button variant="subtle" color="brand" onClick={()...` | *Không có comment giải thích phía trên* |
| 157 | `navigate('/courses')}> Đến da` | `<Button radius="md" color="brand" onClick={() =>` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 108 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 128 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 203 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [PersonalWiki.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PersonalWiki.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PersonalWiki.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 48 | `{/* Add New Page */}}> ` | `<ActionIcon variant="light" color="brand" radius="...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 92 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 93 | `Chứa icon/html` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [PublicProfile.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/PublicProfile.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\PublicProfile.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Phân hệ giao diện chức năng của Học viên/Giảng viên tại react-test-frontend\src\pages*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 41 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 73 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 76 | `Gửi tin nhắn` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [RegisterPage.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/RegisterPage.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\RegisterPage.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Trang đăng ký tài khoản học viên mới, mã hóa mật khẩu bảo mật qua EncryptionService.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 149 | `Register Now` | `<Button type="submit" fullWidth size="lg" radius="...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 164 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [StudyWorkspace.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/StudyWorkspace.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\StudyWorkspace.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Không gian học tập tích hợp trình chiếu giáo trình và nhúng Monaco IDE thực hành biên dịch code trực tiếp cho Học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 447 | `Không rõ` | `<Button onClick={handleRunCode} disabled={runLoadi...` | *Không có comment giải thích phía trên* |
| 536 | `selectedLesson?.videoUrl && window.open(selec` | `<Button variant="light" size="xs" onClick={() =>` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 6)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 158 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 230 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 511 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 573 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 586 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 594 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [TutorDashboard.jsx](file:///C:/code/asp.net/react-test-frontend/src/pages/TutorDashboard.jsx)
* **Đường dẫn tệp:** `react-test-frontend\src\pages\TutorDashboard.jsx`
* **Công nghệ:** `React`
* **Mô tả tính năng:** *Bảng điều khiển của Gia sư quản lý lịch rảnh và duyệt các cuộc hẹn tư vấn từ học viên.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 46 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 95 | `Quản lý lịch rảnh` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 125 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 129 | `Duyệt` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |
| 159 | `Không rõ` | <span style="color:red">Thiếu hoàn toàn thuộc tính onClick (Nút chết)</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [AccessDenied.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/AccessDenied.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\AccessDenied.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 55 | `Đăng Xuất` | `<a href="/Account/Logout" class="btn btn-danger bt...` | *Không có comment giải thích phía trên* |
| 56 | `Về Trang Chủ` | `<a href="/" class="btn btn-primary btn-custom">` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Login.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 187 | `Đăng Nhập ` | `<button type="submit" class="btn btn-primary btn-b...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Account/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Account\Register.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Account*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 109 | `Đăng Ký Tài Khoản ` | `<button type="submit" class="btn btn-success btn-b...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Affiliate/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Affiliate\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Affiliate*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 93 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [BadgeStudio.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BadgeStudio.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BadgeStudio.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Hệ thống thiết kế huy hiệu, vinh danh thành tích và gamification điểm thưởng XP của admin.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 21 | ` Tạo Huy hiệu mới` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 44 | `Chỉnh sửa` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 85 | `&times;` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 112 | `Hủy` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 113 | `Lưu huy hiệu` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [BulkImport.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/BulkImport.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\BulkImport.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 47 | ` Tải file Excel mẫu` | <span style="color:red">Thẻ link styled-btn có href rỗng/chết (#) và không có onclick / điều hướng MVC</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [ExamAssembler.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/ExamAssembler.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\ExamAssembler.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Hệ thống tự động biên soạn đề thi, trắc nghiệm và quản lý ngân hàng câu hỏi.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 27 | `Chứa icon/html` | `<button class="btn btn-indigo btn-copy" data-clipb...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 81 | ` Lưu & Xuất bản đề thi` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 17 | ` Trải nghiệm Quiz Wizard (Demo)` | `<a href="/Assessment/QuizWizard" class="btn btn-ou...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [QuestionBuilder.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/QuestionBuilder.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\QuestionBuilder.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 25 | ` Thêm câu hỏi mới` | `<button class="btn btn-indigo shadow-lg px-4 py-2"...` | *Không có comment giải thích phía trên* |
| 70 | `Chứa icon/html` | `<button class='btn btn-xs btn-outline-indigo mr-1'...` | *Không có comment giải thích phía trên* |
| 71 | `Chứa icon/html` | `<button class='btn btn-xs btn-outline-danger' oncl...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [RuleEngine.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Assessment/RuleEngine.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Assessment\RuleEngine.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Assessment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 27 | ` Hướng dẫn` | `<button class="btn btn-sm btn-outline-indigo" oncl...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 58 | ` Lưu cấu hình Rule` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Login.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Login.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Login.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Auth*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 168 | `Đăng nhập` | `<button type="submit" class="btn-login">` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Register.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Auth/Register.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Auth\Register.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Auth*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 186 | `Tạo tài khoản miễn phí` | `<button type="submit" class="btn-register">` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Solve.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallenge/Solve.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallenge\Solve.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CodingChallenge*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 50 | ` Chạy & Nộp bài` | `<button class="btn btn-success btn-sm px-4" onclic...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Create.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 59 | `Hủy` | `<a asp-action="Index" class="btn btn-default mr-2"...` | *Không có comment giải thích phía trên* |
| 60 | `Tạo & Tiếp tục cấu hình Test Case` | `<button type="submit" class="btn btn-primary px-4 ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Edit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Edit.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 60 | `Cập nhật thông tin` | `<button type="submit" class="btn btn-primary px-4 ...` | *Không có comment giải thích phía trên* |
| 83 | `Thêm bộ test` | `<button type="submit" class="btn btn-success btn-s...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 104 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CodingChallengeManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CodingChallengeManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CodingChallengeManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 14 | ` Thêm bài tập mới` | `<a asp-action="Create" class="btn btn-primary shad...` | *Không có comment giải thích phía trên* |
| 47 | `Chứa icon/html` | `<a asp-action="Edit" asp-route-id="@item.Id" class...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Cohort*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 60 | `Quản lý ` | `<a href="/Cohort/Members/@cohort.CohortId" class="...` | *Không có comment giải thích phía trên* |
| 94 | `Lưu Thông Tin` | `<button type="button" onclick="saveCohort()" class...` | *Không có comment giải thích phía trên* |
| 116 | `Chọn file Excel` | `<button type="button" onclick="$('#excelFile').cli...` | *Không có comment giải thích phía trên* |
| 123 | `Bắt đầu Import` | `<button type="submit" class="btn btn-success round...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 13 | ` Tạo Lớp học mới` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 79 | `&times;` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 93 | `Hủy bỏ` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 106 | `&times;` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 122 | `Đóng` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Members.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Cohort/Members.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Cohort\Members.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Quản lý thành viên lớp học, thêm học viên vào khóa học/cohort cụ thể.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 59 | `Chứa icon/html` | `<button onclick="removeMember(@user.UserId)" class...` | *Không có comment giải thích phía trên* |
| 90 | `Xác nhận thêm` | `<button type="button" onclick="addMember()" class=...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 16 | ` Thêm Sinh viên vào lớp` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 45 | ` Thêm thành viên ngay` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 78 | `&times;` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 89 | `Hủy` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Community/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Community\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Community*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 13 | `Khám phá ngay` | `<a href="#feed" class="btn btn-premium btn-lg">` | *Không có comment giải thích phía trên* |
| 26 | `Mới nhất` | `<button class="btn btn-light dropdown-toggle" type...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 14 | `Tìm hiểu thêm` | <span style="color:red">Thẻ link styled-btn có href rỗng/chết (#) và không có onclick / điều hướng MVC</span> | *Không có comment giải thích phía trên* |
| 40 | `Tạo bài viết đầu tiên` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 78 | `Đăng ký Creator` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 98 | `Gửi` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Coupon\Create.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Coupon*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 54 | `Quay lại` | `<a asp-action="Index" class="btn btn-outline-secon...` | *Không có comment giải thích phía trên* |
| 55 | `Lưu Coupon` | `<button type="submit" class="btn btn-success px-4 ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Coupon/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Coupon\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Coupon*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 13 | ` Tạo Mã Mới` | `<a asp-action="Create" class="btn btn-primary shad...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 49 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Create.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Create.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Create.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 177 | ` Hoàn tất &amp; Lưu khóa học` | `<button type="submit" class="btn btn-success px-5 ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 109 | `Tiếp theo ` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 137 | ` Quay lại` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 138 | `Tiếp theo ` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 176 | ` Quay lại` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Curriculum.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Curriculum.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Curriculum.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Thiết lập khung chương trình học, thêm bớt chương mục và thứ tự bài giảng ở trang quản trị MVC.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 23 | ` Thêm Chương` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 24 | ` Lưu thứ tự` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 61 | ` Bài học` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 62 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 71 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Edit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Edit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Edit.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 159 | `Lưu thay đổi` | `<button type="submit" class="btn btn-success px-5 ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 105 | `Tiếp theo` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 126 | `Quay lại` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 127 | `Tiếp theo` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 158 | `Quay lại` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 156 | ` Thêm Mới` | `<a asp-action="Create" class="btn btn-sm btn-prima...` | *Không có comment giải thích phía trên* |
| 285 | `Chứa icon/html` | `<a href="/Payment/Checkout?courseId=${id}" class="...` | *Actions* |
| 286 | `Chứa icon/html` | `<a href="/CourseManagement/Edit/${id}" class="btn ...` | *Không có comment giải thích phía trên* |
| 287 | `Chứa icon/html` | `<a href="/CourseManagement/Curriculum/${id}" class...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 5)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 113 | ` Reset` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 135 | ` Xử lý hàng loạt` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 153 | ` Export CSV` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 240 | `${val}` | <span style="color:red">Thẻ link styled-btn có href rỗng/chết (#) và không có onclick / điều hướng MVC</span> | *Title & Preview Link* |
| 288 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [_CourseDetailPartial.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/CourseManagement/_CourseDetailPartial.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\CourseManagement\_CourseDetailPartial.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục CourseManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 63 | ` Chỉnh sửa toàn bộ` | `<button class="btn btn-block btn-outline-primary" ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Dashboard*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 243 | ` Chi tiết` | `<button class="btn btn-sm btn-outline-info rounded...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 3)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 13 | ` Làm mới dữ liệu` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 130 | `&times;` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 155 | ` Gửi Gmail Nhắc Nhở` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Pulse.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Dashboard/Pulse.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Dashboard\Pulse.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Dashboard*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 145 | `Quản lý Background Jobs` | `<a href="/hangfire" class="btn btn-block btn-outli...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 79 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Home/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Home\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Home*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 34 | `View All` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [ApiKeys.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/IAM/ApiKeys.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\IAM\ApiKeys.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục IAM*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 4)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 15 | `Tạo API Key mới` | `<button class="btn btn-premium" data-bs-toggle="mo...` | *Không có comment giải thích phía trên* |
| 30 | ` Sao chép` | `<button class="btn btn-outline-success" onclick="c...` | *Không có comment giải thích phía trên* |
| 76 | `Chứa icon/html` | `<button type="submit" class="btn btn-sm btn-outlin...` | *Không có comment giải thích phía trên* |
| 109 | `Tạo ngay` | `<button type="submit" class="btn btn-premium">` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 97 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 108 | `Hủy` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Integrations/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Integrations\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Integrations*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 17 | ` Test kết nối Zoom API` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [CertificateManager.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/CertificateManager.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\CertificateManager.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 67 | ` Xem trước` | `<button class="btn btn-sm btn-link text-primary p-...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 2)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 44 | ` Cấu hình Phôi bằng` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 70 | ` Gửi Mail` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Designer.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Designer.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Designer.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 65 | ` Lưu Tọa Độ` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Marketing/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Marketing\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Marketing*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 17 | ` Thiết kế Chứng chỉ` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Failure.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Failure.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Failure.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 19 | `Quay lại danh sách` | `<a href="/CourseManagement" class="btn btn-outline...` | *Không có comment giải thích phía trên* |
| 20 | `Thử lại` | `<a href="javascript:history.back()" class="btn btn...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [PaymentResults.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/PaymentResults.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\PaymentResults.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 19 | `Bắt đầu học ngay` | `<a href="/Dashboard" class="btn btn-premium btn-lg...` | *Không có comment giải thích phía trên* |
| 46 | `Quay lại danh sách` | `<a href="/CourseManagement" class="btn btn-outline...` | *Không có comment giải thích phía trên* |
| 47 | `Thử lại` | `<a href="javascript:history.back()" class="btn btn...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Success.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Payment/Success.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Payment\Success.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Payment*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 19 | `Vào kho khóa học` | `<a href="/my-learning" class="btn btn-premium btn-...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [Audit.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Audit.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Audit.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Lịch sử dòng tiền, doanh thu và kiểm toán thanh toán.*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 3)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 56 | ` Làm mới` | `<button class="btn btn-light btn-action mr-2" oncl...` | *Không có comment giải thích phía trên* |
| 57 | ` Xuất Báo Cáo` | `<a href="/Revenue/ExportExcel" class="btn btn-warn...` | *Không có comment giải thích phía trên* |
| 102 | ` Confirm` | `<button class="btn btn-xs btn-success btn-action p...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 108 | ` Verified` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Revenue*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 12 | ` Xuất báo cáo Excel` | `<a href="/Revenue/ExportExcel" class="btn btn-succ...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [PaymentConfig.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Revenue/PaymentConfig.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Revenue\PaymentConfig.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Revenue*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 67 | ` Lưu cấu hình` | `<button type="submit" class="btn btn-primary btn-l...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 17 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [_CommunityLayout.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/_CommunityLayout.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Shared\_CommunityLayout.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Shared*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 2)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 101 | `Chứa icon/html` | `<button class="navbar-toggler" type="button" data-...` | *Không có comment giải thích phía trên* |
| 110 | `Bắt đầu ngay` | `<a href="/Account/Login" class="btn btn-premium">` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 0)
*Tuyệt vời! Không phát hiện nút chết nào trên trang này.*

---

### 📄 Trang: [_Layout.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Shared/_Layout.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Shared\_Layout.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Shared*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 1)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 169 | ` Đăng nhập` | `<a href="/Account/Login" class="btn btn-primary bt...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 122 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/SqlManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\SqlManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục SqlManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 27 | ` Execute Query (Ctrl+Enter)` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/Students/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\Students\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục Students*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 0)
*Không phát hiện nút nào hoạt động tốt hoặc được gán sự kiện.*

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 4)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 25 | ` Xuất báo cáo` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 163 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 166 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |
| 218 | `&times;` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

### 📄 Trang: [Index.cshtml](file:///C:/code/asp.net/SmartLMS.Web/Views/UserManagement/Index.cshtml)
* **Đường dẫn tệp:** `SmartLMS.Web\Views\UserManagement\Index.cshtml`
* **Công nghệ:** `ASP.NET Core (CSHTML)`
* **Mô tả tính năng:** *Giao diện quản lý MVC thuộc thư mục UserManagement*

#### 🟢 Các nút HOẠT ĐỘNG TỐT (Working Buttons - 6)
| Dòng | Nhãn nút (Label) | Code Tag | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 20 | ` Nhật ký hệ thống (Audit)` | `<button onclick="showGlobalAudit()" class="btn btn...` | *Không có comment giải thích phía trên* |
| 23 | ` Xuất Excel (UC-16)` | `<a href="/UserManagement/ExportToExcel" class="btn...` | *Không có comment giải thích phía trên* |
| 94 | `Chứa icon/html` | `<button onclick="changeStatus(@user.UserId, 2)" cl...` | *Không có comment giải thích phía trên* |
| 100 | `Chứa icon/html` | `<button onclick="changeStatus(@user.UserId, 1)" cl...` | *Không có comment giải thích phía trên* |
| 105 | `Chứa icon/html` | `<button onclick="showUserAudit(@user.UserId)" clas...` | *Không có comment giải thích phía trên* |
| 128 | `&times;` | `<button type="button" class="close text-white" dat...` | *Không có comment giải thích phía trên* |

#### 🔴 Các nút CHƯA HOẠT ĐỘNG (Dead / Unhandled Buttons - 1)
| Dòng | Nhãn nút (Label) | Lỗi chi tiết | Comment giải thích của Developer |
| :--- | :--- | :--- | :--- |
| 104 | `Chứa icon/html` | <span style="color:red">Nút CSHTML thiếu sự kiện onclick và không có điều hướng dạng MVC/Bootstrap</span> | *Không có comment giải thích phía trên* |

---

## 📊 BẢNG TỔNG HỢP TOÀN HỆ THỐNG (SYSTEM STATS)

| Chỉ số kiểm thử | Số lượng |
| :--- | :--- |
| ✅ Nút hoạt động tốt (Working Buttons) | **108** |
| ❌ Nút chưa hoạt động (Dead Buttons) | **131** |
| 📊 Tổng cộng nút bấm đã quét | **239** |
