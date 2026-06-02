# Community Hub API Plan (Port 3080) - Ver 1

**Lưu ý về Kiến trúc:** Đây là danh sách các API thiết kế dành riêng cho phân hệ **SmartLMS Community** (chạy trên cổng **3080**). Load Balancer (Nginx) ở cổng 80 sẽ tự động định tuyến (route) các request bắt đầu bằng `/api/community/*` vào cổng 3080 này để xử lý.

---

## Module 1: Hệ thống Language Exchange (Tandem & Ghép cặp luyện tập) - 8 APIs
Chức năng này giúp hệ thống tự động tìm và ghép cặp những người dùng có chung mục tiêu học tập hoặc có thể trao đổi ngôn ngữ cho nhau.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `GET` | `/api/community/tandem/recommendations` | Gợi ý đối tác luyện tập phù hợp (dựa trên trình độ, độ tuổi, mục tiêu) |
| `POST` | `/api/community/tandem/request` | Gửi lời mời ghép cặp luyện tập (Match Request) |
| `POST` | `/api/community/tandem/requests/{id}/accept` | Chấp nhận lời mời ghép cặp |
| `POST` | `/api/community/tandem/requests/{id}/reject` | Từ chối lời mời ghép cặp |
| `GET` | `/api/community/tandem/partners` | Lấy danh sách các đối tác (Partners) đang luyện tập cùng |
| `DELETE` | `/api/community/tandem/partners/{id}` | Hủy ghép cặp (Unmatch) với một đối tác |
| `POST` | `/api/community/tandem/partners/{id}/feedback` | Gửi đánh giá/Review ẩn danh về thái độ học tập của đối tác |
| `PUT` | `/api/community/tandem/preferences` | Cài đặt tiêu chí ghép cặp (vd: Chỉ tìm người cùng rank Vàng) |

---

## Module 2: Live Audio Rooms (Phòng Language Cafe) - 8 APIs
Hệ thống phòng thoại trực tuyến (tương tự Discord/Clubhouse) để người dùng vào luyện nói tiếng Anh/Nhật/Hàn trực tiếp.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `POST` | `/api/community/live-rooms/create` | Tạo phòng Voice Chat (Host) - Đặt tên chủ đề (VD: Luyện Speaking IELTS) |
| `GET` | `/api/community/live-rooms/active` | Lấy danh sách các phòng Voice đang hoạt động trên hệ thống |
| `POST` | `/api/community/live-rooms/{id}/join` | Tham gia phòng (Trả về WebRTC Token/SignalR Connection) |
| `POST` | `/api/community/live-rooms/{id}/leave` | Rời khỏi phòng thoại |
| `POST` | `/api/community/live-rooms/{id}/hand-raise` | Chức năng "Giơ tay" xin quyền bật mic (dành cho người nghe) |
| `PUT` | `/api/community/live-rooms/{id}/speakers/{userId}` | Host cấp quyền phát biểu hoặc tắt mic của một thành viên |
| `POST` | `/api/community/live-rooms/{id}/invite` | Gửi thông báo Push mời bạn bè/Follower vào phòng thoại |
| `POST` | `/api/community/live-rooms/{id}/end` | Đóng phòng (Chỉ Host hoặc Admin mới có quyền) |

---

## Module 3: Peer Review & Sửa lỗi cộng đồng - 9 APIs
Học viên đăng bài viết (hoặc file thu âm) lên, các thành viên trình độ cao hơn sẽ vào bôi đen, sửa lỗi và nhận điểm thưởng.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `POST` | `/api/community/peer-review/submit` | Đăng bài luận hoặc file thu âm nhờ cộng đồng sửa lỗi |
| `GET` | `/api/community/peer-review/feed` | Bảng tin hiển thị các bài đang cần được chấm/sửa |
| `GET` | `/api/community/peer-review/submissions/{id}` | Xem chi tiết một bài luận và các lượt sửa của cộng đồng |
| `POST` | `/api/community/peer-review/submissions/{id}/correct` | Đăng bản sửa lỗi (Gửi kèm vị trí text bị sai và text đề xuất) |
| `POST` | `/api/community/peer-review/corrections/{id}/upvote` | Upvote cho một bản sửa lỗi chất lượng |
| `POST` | `/api/community/peer-review/corrections/{id}/accept` | Tác giả chấp nhận bản sửa tốt nhất (Người sửa được nhận XP lớn) |
| `POST` | `/api/community/peer-review/request-mentor` | Trực tiếp ping (tag) một Mentor cụ thể nhờ sửa bài (tốn Coin) |
| `GET` | `/api/community/peer-review/leaderboard` | Bảng xếp hạng những người sửa bài có tâm nhất tuần/tháng |
| `DELETE` | `/api/community/peer-review/submissions/{id}` | Tác giả xóa bài nhờ sửa lỗi của mình |

---

## Module 4: Clans & Guilds (Gia tộc học tập / Nhóm chiến đấu) - 9 APIs
Biến các nhóm học tập thông thường thành các "Gia tộc" (Clans) cạnh tranh điểm số, làm nhiệm vụ chung để tranh rank.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `POST` | `/api/community/clans/create` | Thành lập Clan mới (Yêu cầu tài khoản đạt mốc Level nhất định) |
| `GET` | `/api/community/clans/explore` | Danh sách tìm kiếm các Clan đang tuyển thành viên |
| `POST` | `/api/community/clans/{id}/apply` | Nộp đơn xin gia nhập một Clan |
| `GET` | `/api/community/clans/applications` | Trưởng Clan xem danh sách đơn xin gia nhập |
| `POST` | `/api/community/clans/applications/{id}/resolve` | Trưởng Clan Duyệt/Từ chối đơn xin gia nhập |
| `GET` | `/api/community/clans/{id}/members` | Lấy danh sách thành viên và đóng góp XP của họ cho Clan |
| `POST` | `/api/community/clans/{id}/quests/contribute` | Thành viên cống hiến vật phẩm/XP để hoàn thành Nhiệm vụ Clan |
| `GET` | `/api/community/clans/leaderboard` | Bảng xếp hạng Clan đại chiến toàn server |
| `POST` | `/api/community/clans/{id}/kick/{userId}` | Trưởng Clan trục xuất một thành viên lười hoạt động |

---

## Module 5: Social Networking (Mạng xã hội & Tương tác) - 8 APIs
Xây dựng luồng Follow, kết bạn và bảng tin cá nhân hóa.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `GET` | `/api/community/feed/timeline` | Lấy Bảng tin tổng hợp (Bài viết diễn đàn, Thành tích bạn bè, Chia sẻ) |
| `POST` | `/api/community/feed/status` | Đăng một dòng trạng thái ngắn (Status update) lên bảng tin |
| `POST` | `/api/community/users/{id}/follow` | Theo dõi (Follow) một tài khoản khác |
| `POST` | `/api/community/users/{id}/unfollow` | Hủy theo dõi tài khoản |
| `GET` | `/api/community/users/{id}/followers` | Lấy danh sách những người đang theo dõi user này |
| `GET` | `/api/community/users/{id}/following` | Lấy danh sách những người user này đang theo dõi |
| `POST` | `/api/community/feed/posts/{id}/share` | Re-post (Share lại) bài viết của người khác về tường nhà mình |
| `GET` | `/api/community/trending-hashtags` | Thống kê Top Hashtag đang được bàn luận nhiều nhất |

---

## Module 6: Creator Economy, Cosmetics & Moderation - 8 APIs
Hệ thống kinh tế nội bộ để mua sắm vật phẩm ảo và các API quản lý nội dung xấu.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `POST` | `/api/community/economy/tip` | Tặng/Tip Coin (tiền ảo trong app) cho bài viết/tài liệu hay |
| `GET` | `/api/community/economy/shop/cosmetics` | Danh sách vật phẩm trang trí (Khung avatar, Nhãn dán, Theme Dark Mode đặc biệt) |
| `POST` | `/api/community/economy/shop/buy/{itemId}` | Mua vật phẩm trang trí bằng Coin tích lũy |
| `PUT` | `/api/community/economy/inventory/equip/{itemId}` | Trang bị vật phẩm vừa mua lên hồ sơ cá nhân |
| `POST` | `/api/community/economy/badges/award` | Admin trao tặng Huy hiệu đặc biệt (Badge) cho thành viên xuất sắc |
| `GET` | `/api/community/economy/wallet` | Xem lịch sử biến động số dư Coin (Lịch sử giao dịch) |
| `POST` | `/api/community/moderation/report` | Báo cáo (Report) nội dung/tài khoản vi phạm, ngôn từ độc hại |
| `POST` | `/api/community/moderation/block-user` | Chặn (Block) vĩnh viễn tin nhắn và bài đăng từ một user khác |
