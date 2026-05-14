# 🌊 SmartLMS.AI Events & UserFlow Map

*Tài liệu hỗ trợ vẽ UserFlow - Tự động cập nhật bởi Antigravity*

## ⚡ Event Triggers (Điểm kích hoạt)
| Module | File | Event Triggered |
| :--- | :--- | :--- |
| SmartLMS.Business | AssessmentService.cs | `AssessmentCompletedEvent` |
| SmartLMS.Business | BookingService.cs | `BookingCreatedEvent` |
| SmartLMS.Business | BookingService.cs | `BookingCreatedEvent` |

## ⚙️ Event Handlers (Điểm xử lý)
| Handler Class | Event Processed | Action Result |
| :--- | :--- | :--- |
| AssessmentEventHandler | `Assessment.QuizSubmitted` | Xử lý nghiệp vụ ngầm |

## 🛠️ Quy trình điển hình (Sample Flows)
Dựa trên dữ liệu quét được, ngài có thể vẽ UserFlow như sau:

