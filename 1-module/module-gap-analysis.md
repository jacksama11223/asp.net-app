# Phân Tích Hiện Trạng & Kế Hoạch Module (Gap Analysis)

Sau khi đối chiếu danh sách API thiết kế trong thư mục `0-api` (`ver1-api.md` và `ver1-3080-api.md`) với hiện trạng mã nguồn thực tế của hệ thống (`ver-1-current-api.md`), dưới đây là báo cáo phân tích và đề xuất kiến trúc Module.

---

## 1. Kết Luận Chung (Executive Summary)

**Kết quả đối chiếu:** Hầu như **TOÀN BỘ (95%)** các API được thiết kế mới cho Mobile App (Port 80) và Community Hub (Port 3080) **CHƯA CÓ MẶT** trong Codebase hiện tại.

Hệ thống hiện tại chỉ đang phục vụ các tính năng nền tảng cơ bản (LMS Core) như: Đăng nhập, Quản lý khóa học, Học Video, Đánh giá (Quiz), Thanh toán (VNPay), và Mạng xã hội cơ bản (Đăng bài, Bình luận, Chia sẻ tài liệu). 

Toàn bộ các hệ thống thông minh, tương tác cao và Gamification chuyên sâu chưa có Module (Database, Business Logic) hỗ trợ.

---

## 2. Phân tích chi tiết các Module đang thiếu (Missing Modules)

### A. Phân hệ Mobile App (Core Backend - 5181)
| Tên Module Cần Tạo Mới | Trạng thái hiện tại | Đề xuất Component (Business Layer) |
| :--- | :--- | :--- |
| **Vocabulary & SRS** | Chưa có | `FlashcardService`, `SpacedRepetitionAlgorithm`, `DictionaryService` |
| **Speech & Audio (AI)** | Chưa có | `PronunciationAiService`, `AudioCdnManager`, `ShadowingService` |
| **Gamification (Nâng cao)** | Đang có file cơ bản nhưng thiếu Logic | `StreakManager`, `QuestService`, `VirtualEconomyService` |
| **Mobile Infrastructure** | Chưa có | `PushNotificationService`, `OfflineSyncManager`, `DeviceRegistry` |
| **Learning Path** | Đã có Course/Curriculum nhưng chưa có Roadmap/CEFR | `PlacementTestService`, `RoadmapGenerator`, `SkillRadarService` |
| **Grammar & Writing (AI)** | Chưa có | `GrammarCheckAiClient`, `WritingEvaluationService` |

### B. Phân hệ Community Hub (Port 3080)
| Tên Module Cần Tạo Mới | Trạng thái hiện tại | Đề xuất Component (Business Layer) |
| :--- | :--- | :--- |
| **Tandem (Ghép cặp)** | Chưa có | `MatchmakingService`, `TandemSessionManager` |
| **Live Audio Rooms** | Chưa có | `WebRtcSignalingHub`, `VoiceRoomManager` |
| **Peer Review** | Đang dùng tạm Post/Comment | `SubmissionReviewService`, `MentorBiddingService` |
| **Clans & Guilds** | Đang có Group cơ bản | `ClanManager`, `GuildQuestService`, `ClanLeaderboardService` |
| **Social Networking** | Có Post nhưng chưa có Follow/Feed | `FollowerGraphService`, `TimelineFeedAggregator` |
| **Creator Economy** | Chưa có | `WalletService`, `CoinTransactionManager`, `ShopInventory` |

---

## 3. Đề Xuất Kế Hoạch Xây Dựng (Implementation Plan)

Vì kiến trúc hệ thống áp dụng **Strict Modular Monolith**, việc xây dựng các module mới phải tuân thủ nghiêm ngặt quy tắc chia tầng (Layering) và Giao tiếp qua Event/MediatR.

### Bước 1: Cấu trúc tầng Data (Entity & EF Core)
Mỗi Module mới cần tạo các Entity tương ứng trong `SmartLMS.Models` và đăng ký `DbSet` vào `SmartLMSContext.cs`. 
*Ví dụ:* `UserStreak`, `FlashcardDeck`, `VoiceRoom`, `Clan`, `CoinTransaction`.

### Bước 2: Cấu trúc tầng Business (Service & Handler)
Tạo các Interface và Implementation trong `SmartLMS.Business`. 
**Nguyên tắc cốt lõi:** Không inject Service của Module A sang Module B. Nếu Module `Vocabulary` cần cộng điểm `Gamification`, phải sử dụng MediatR:
```csharp
// Trong VocabularyService.cs
await _mediator.Publish(new FlashcardReviewedEvent(userId, xpGained));
```
```csharp
// Trong GamificationHandler.cs
public async Task Handle(FlashcardReviewedEvent notification, CancellationToken ct) {
    // Cộng XP và xử lý Streak
}
```

### Bước 3: Cấu trúc tầng Web (API Controllers)
Chỉ sau khi Data và Business đã hoàn thiện, ta mới tạo các `[ApiController]` trong thư mục `Controllers` (ở `SmartLMS.Web` hoặc `SmartLMS.Community`). Controller chỉ được phép gọi vào `Business Layer` (qua interface), tuyệt đối không chứa business logic phức tạp.

---

## 4. Khuyến nghị thứ tự ưu tiên (Roadmap)
Để tránh quá tải, tôi khuyến nghị ngài phát triển theo 3 Giai đoạn (Phases):

1. **Giai đoạn 1 (Lõi Giữ chân - Retention):** Gamification (Streak, Quests) và Mobile Infrastructure (Sync, Notifications).
2. **Giai đoạn 2 (Giá trị cốt lõi AI):** Vocabulary SRS, Speech AI, Grammar & Writing.
3. **Giai đoạn 3 (Mở rộng Cộng đồng):** Tandem, Live Audio Rooms, Clans & Creator Economy.
