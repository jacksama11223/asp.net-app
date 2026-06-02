# Báo Cáo Kẽ Hở: API Hiện Có Nhưng Thiếu Logic (Current Gaps)

Báo cáo này liệt kê các API Endpoints đã được khai báo trong hệ thống (tồn tại Controller và Route) nhưng **chưa có Business Logic thực sự** (chưa gọi Service/MediatR, hoặc chỉ trả về Mock Data, NotImplemented).

### AccountController
| HTTP Method | Action Name | Vấn đề phát hiện (Missing Logic) |
| :--- | :--- | :--- |
| `GET` | `Login` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `Register` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `AccessDenied` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |

### AuthController
| HTTP Method | Action Name | Vấn đề phát hiện (Missing Logic) |
| :--- | :--- | :--- |
| `GET` | `Login` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `Register` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `POST` | `Login` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `POST` | `Register` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |

### AuthController
| HTTP Method | Action Name | Vấn đề phát hiện (Missing Logic) |
| :--- | :--- | :--- |
| `GET` | `Login` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `Register` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |

### CommunityController
| HTTP Method | Action Name | Vấn đề phát hiện (Missing Logic) |
| :--- | :--- | :--- |
| `GET` | `Create` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `Mentor` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `Mentor` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `Messages` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |
| `GET` | `Messages` | Không gọi bất kỳ Service/MediatR nào (Chỉ return Mock/Empty) |

