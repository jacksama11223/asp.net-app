# Mobile App API Plan - Language Learning (Ver 1)

**Lưu ý về Kiến trúc:** Toàn bộ các API được liệt kê dưới đây được thiết kế hướng Mobile (Mobile-first). Các thiết bị Mobile App sẽ gọi chung qua API Gateway hoặc Load Balancer (trên **Port 80**). Từ đó, Nginx/Gateway sẽ định tuyến (route) các request này tới đúng các Microservice bên trong (vd: Core Backend ở Port 5181, hoặc AI Service). 

---

## Module 1: Hệ thống Từ vựng & Spaced Repetition System (SRS)
Cốt lõi của việc học ngoại ngữ là ghi nhớ từ vựng. Cần một hệ thống thuật toán (như SuperMemo) để quyết định khi nào học viên nên ôn lại từ nào.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `GET` | `/api/vocabulary/decks` | Lấy danh sách các bộ từ vựng (chủ đề) |
| `POST` | `/api/vocabulary/decks` | Tạo bộ từ vựng cá nhân mới |
| `GET` | `/api/vocabulary/decks/{id}/cards` | Lấy danh sách thẻ từ (flashcards) trong một bộ |
| `POST` | `/api/vocabulary/srs/review` | Gửi kết quả ôn tập 1 từ (Đúng/Sai/Khó/Dễ) để server tính toán lịch ôn tiếp theo |
| `GET` | `/api/vocabulary/srs/due-today` | Lấy danh sách các từ vựng "đến hạn" cần ôn tập hôm nay |
| `GET` | `/api/vocabulary/dictionary/search` | Tra cứu từ điển nội bộ (trả về nghĩa, phiên âm, ví dụ) |
| `POST` | `/api/vocabulary/dictionary/{wordId}/save` | Lưu một từ vựng đang tra cứu vào sổ tay cá nhân |
| `DELETE` | `/api/vocabulary/cards/{id}` | Xóa thẻ từ vựng khỏi sổ tay |
| `GET` | `/api/vocabulary/word-of-the-day` | Lấy "Từ vựng của ngày" (phục vụ Widget trên màn hình Mobile) |
| `GET` | `/api/vocabulary/export` | Xuất danh sách từ vựng cá nhân ra định dạng PDF/CSV |

---

## Module 2: AI Pronunciation & Audio (Phát âm & Luyện nghe)
Mobile App học ngoại ngữ bắt buộc phải có tính năng thu âm và chấm điểm phát âm.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `POST` | `/api/speech/analyze-pronunciation` | Upload file ghi âm (.wav/.m4a), AI trả về điểm số phát âm từng âm tiết |
| `GET` | `/api/speech/exercises` | Lấy danh sách các bài tập luyện đọc thành tiếng |
| `GET` | `/api/speech/audio/{wordId}` | Lấy link CDN file audio chuẩn giọng bản xứ của một từ |
| `POST` | `/api/speech/text-to-speech` | Gọi AI chuyển đổi một đoạn văn bản bất kỳ thành giọng nói |
| `GET` | `/api/speech/shadowing/lessons` | Lấy các video/audio ngắn để luyện kỹ năng nhại giọng (Shadowing) |
| `POST` | `/api/speech/shadowing/submit` | Nộp file thu âm bài luyện nhại giọng |
| `GET` | `/api/speech/conversations/scripts` | Lấy kịch bản hội thoại mẫu (Roleplay) |
| `POST` | `/api/speech/conversations/roleplay` | Gửi audio chat với AI Roleplay, AI trả lời lại bằng audio |

---

## Module 3: Mobile Retention & Gamification nâng cao
Để giữ chân người dùng Mobile, cần hệ thống streak (chuỗi ngày học), mạng/tim (lives) và nhiệm vụ.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `GET` | `/api/gamification/streak` | Lấy chuỗi ngày học liên tục hiện tại của user |
| `POST` | `/api/gamification/streak/freeze` | Dùng vật phẩm "Đóng băng" để bảo vệ chuỗi nếu hôm nay quên học |
| `GET` | `/api/gamification/lives` | Kiểm tra số lượng "Mạng/Tim" còn lại của user (sai 1 câu trừ 1 tim) |
| `POST` | `/api/gamification/lives/refill` | Hồi phục tim bằng cách dùng Xu/Điểm tích lũy hoặc xem Ads |
| `GET` | `/api/gamification/quests/daily` | Lấy danh sách nhiệm vụ hàng ngày (VD: Học 15 phút, đạt 100 XP) |
| `POST` | `/api/gamification/quests/{id}/claim` | Nhận rương thưởng sau khi hoàn thành nhiệm vụ |
| `GET` | `/api/gamification/shop/items` | Danh sách vật phẩm ảo trong cửa hàng (Trang phục avatar, thẻ x2 XP) |
| `POST` | `/api/gamification/shop/buy/{itemId}` | Mua vật phẩm trong App |
| `GET` | `/api/gamification/leagues` | Xem bảng xếp hạng giải đấu tuần (Rank Đồng, Bạc, Vàng) |
| `POST` | `/api/gamification/leagues/promote` | Cập nhật thăng hạng/giáng hạng khi kết thúc tuần |

---

## Module 4: Mobile Infrastructure & Caching (Hạ tầng App)
Quản lý thiết bị, đẩy thông báo Push và hỗ trợ học khi mất mạng.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `POST` | `/api/mobile/devices/register` | Lưu FCM/APNs Token của điện thoại để gửi Push Notification |
| `DELETE` | `/api/mobile/devices/unregister` | Hủy đăng ký thiết bị khi người dùng Log out |
| `POST` | `/api/mobile/sync/offline-progress` | Bulk update (đồng bộ) điểm số, kết quả bài học sau khi có mạng lại |
| `GET` | `/api/mobile/sync/offline-packages` | Tải file .zip chứa audio và JSON bài học để học Offline |
| `POST` | `/api/mobile/settings/preferences` | Cập nhật cấu hình app (Giờ nhắc nhở học, bật/tắt âm thanh) |
| `GET` | `/api/mobile/settings/preferences` | Lấy cấu hình cá nhân hóa trên thiết bị |
| `POST` | `/api/mobile/analytics/app-open` | Tracking sự kiện mở app để tính toán Daily Active Users (DAU) |
| `POST` | `/api/mobile/auth/social-login` | Đăng nhập bằng Google/Apple Sign-In (trả về JWT chuẩn hóa) |

---

## Module 5: Phân cấp trình độ & Lộ trình học (Learning Path)
Thay vì khóa học dạng List, ngôn ngữ cần dạng bản đồ (Roadmap / Tree) có khóa chặn bài học.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `GET` | `/api/learning-path/placement-test` | Lấy bộ câu hỏi kiểm tra trình độ đầu vào (CEFR: A1-C2) |
| `POST` | `/api/learning-path/placement-test/submit` | Chấm điểm test đầu vào và gán Level cho tài khoản |
| `GET` | `/api/learning-path/roadmap` | Lấy cấu trúc bản đồ học tập (Các chặng, các Unit đã mở/khóa) |
| `POST` | `/api/learning-path/units/{id}/unlock` | Trigger mở khóa Unit tiếp theo khi hoàn thành điều kiện |
| `GET` | `/api/learning-path/units/{id}/lessons` | Danh sách bài học chi tiết (Grammar, Vocab, Listening) trong 1 Unit |
| `POST` | `/api/learning-path/lessons/{id}/complete` | Lưu trạng thái hoàn thành bài học và cộng điểm XP |
| `GET` | `/api/learning-path/skills/weaknesses` | Trả về biểu đồ Radar phân tích kỹ năng yếu (Nghe/Nói/Đọc/Viết) |
| `POST` | `/api/learning-path/skills/review-weaknesses` | Tự động sinh ra một bài test luyện tập tập trung vào điểm yếu |

---

## Module 6: Ngữ pháp & Tự luận (Grammar & Writing AI)
Áp dụng AI vào việc chấm chữa bài viết của học viên.

| HTTP Method | Endpoint (Route) | Phụ trách tính năng |
| :--- | :--- | :--- |
| `GET` | `/api/grammar/lessons` | Lấy các mẩu lý thuyết ngữ pháp ngắn (Flashcard ngữ pháp) |
| `POST` | `/api/grammar/check` | Gửi đoạn văn, AI phân tích và highlight các lỗi sai ngữ pháp |
| `GET` | `/api/writing/prompts` | Lấy các chủ đề luyện viết theo dạng đề thi (IELTS, TOEIC, JLPT) |
| `POST` | `/api/writing/submit` | Nộp bài viết tự luận dài |
| `GET` | `/api/writing/{id}/ai-correction` | Trả về bản nhận xét chi tiết, ước lượng band điểm từ AI |
| `POST` | `/api/writing/{id}/peer-review` | Public bài viết lên Community Hub để thành viên khác vào chấm chéo |
