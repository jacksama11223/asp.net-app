# Phân tích Mức độ ảnh hưởng: UI gọi tới API rỗng (Usage Gaps)

Báo cáo này quét toàn bộ mã nguồn Frontend (`.cshtml` và `.js`) để tìm xem những API "rỗng lõi" (vừa quét được) đang được giao diện nào gọi tới. Nếu có giao diện gọi tới nhưng API không có Logic, đó là một **Thiếu sót nghiêm trọng (Critical Flaw)**.

## Endpoint: `/Account` (Hàm: Login/Register/AccessDenied)
⚠️ **Báo động:** Có giao diện đang gọi tới Endpoint này nhưng Logic backend trống!
- **/SmartLMS.Web/Views/Account/AccessDenied.cshtml** (Dòng 55): `<a href="/Account/Logout" class="btn btn-danger btn-custom mr-2">Đăng Xuất</a>`
- **/SmartLMS.Web/Views/Account/Login.cshtml** (Dòng 168): `<form action="/Account/Login" method="post">`
- **/SmartLMS.Web/Views/Account/Login.cshtml** (Dòng 195): `<p class="text-white-50">Bạn chưa có tài khoản? <a href="/Account/Register">Đăng`
- **/SmartLMS.Web/Views/Account/Register.cshtml** (Dòng 89): `<form action="/Account/Register" method="post">`
- **/SmartLMS.Web/Views/Account/Register.cshtml** (Dòng 115): `<p class="text-white-50">Bạn đã có tài khoản? <a href="/Account/Login">Quay lại `
- **/SmartLMS.Web/Views/Shared/_CommunityLayout.cshtml** (Dòng 110): `<a href="/Account/Login" class="btn btn-premium">Bắt đầu ngay</a>`
- **/SmartLMS.Web/Views/Shared/_Layout.cshtml** (Dòng 183): `<a href="/Account/Logout" class="dropdown-item dropdown-footer text-danger font-`
- **/SmartLMS.Web/Views/Shared/_Layout.cshtml** (Dòng 192): `<a href="/Account/Login" class="btn btn-primary btn-sm mt-1 px-3">`
- **/SmartLMS.Web/Views/Shared/_Layout.cshtml** (Dòng 597): `<a href="/Account/AccessDenied">AccessDenied</a>`

## Endpoint: `/Auth` (Hàm: Login/Register)
⚠️ **Báo động:** Có giao diện đang gọi tới Endpoint này nhưng Logic backend trống!
- **/SmartLMS.Web/Views/Auth/Login.cshtml** (Dòng 159): `<form method="post" action="/Auth/Login">`
- **/SmartLMS.Web/Views/Auth/Login.cshtml** (Dòng 172): `Chưa có tài khoản? <a href="/Auth/Register">Đăng ký ngay</a>`
- **/SmartLMS.Web/Views/Auth/Register.cshtml** (Dòng 154): `<form method="post" action="/Auth/Register">`
- **/SmartLMS.Web/Views/Auth/Register.cshtml** (Dòng 190): `Đã có tài khoản? <a href="/Auth/Login">Đăng nhập</a>`
- **/asp.net-group/SmartLMS.Community/Views/Auth/Login.cshtml** (Dòng 21): `<!form asp-action="Login" asp-controller="Auth" method="post" class="space-y-4">`
- **/asp.net-group/SmartLMS.Community/Views/Auth/Login.cshtml** (Dòng 72): `<a href="/Auth/Register"`
- **/asp.net-group/SmartLMS.Community/Views/Auth/Register.cshtml** (Dòng 21): `<!form asp-action="Register" asp-controller="Auth" method="post" class="space-y-`
- **/asp.net-group/SmartLMS.Community/Views/Auth/Register.cshtml** (Dòng 93): `<a href="/Auth/Login"`
- **/asp.net-group/SmartLMS.Community/Views/Community/Details.cshtml** (Dòng 254): `window.location.href = `/Auth/Login?returnUrl=/hub/post/${postId}`;`
- **/asp.net-group/SmartLMS.Community/Views/Community/Details.cshtml** (Dòng 339): `window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Community/EventDetail.cshtml** (Dòng 308): `window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Community/EventDetail.cshtml** (Dòng 354): `window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Events.cshtml** (Dòng 194): `window.location.href = '/Auth/Login?returnUrl=/hub/events';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Events.cshtml** (Dòng 235): `window.location.href = '/Auth/Login?returnUrl=/hub/events';`
- **/asp.net-group/SmartLMS.Community/Views/Community/GroupDetail.cshtml** (Dòng 250): `window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Groups.cshtml** (Dòng 30): `<a href="/Auth/Login?returnUrl=/hub/groups"`
- **/asp.net-group/SmartLMS.Community/Views/Community/Groups.cshtml** (Dòng 195): `window.location.href = '/Auth/Login?returnUrl=/hub/groups';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Groups.cshtml** (Dòng 228): `window.location.href = '/Auth/Login?returnUrl=/hub/groups';`
- **/asp.net-group/SmartLMS.Community/Views/Community/QA.cshtml** (Dòng 182): `window.location.href = '/Auth/Login?returnUrl=/hub/qa';`
- **/asp.net-group/SmartLMS.Community/Views/Community/QA.cshtml** (Dòng 213): `window.location.href = '/Auth/Login?returnUrl=/hub/qa';`
- **/asp.net-group/SmartLMS.Community/Views/Community/QaDetail.cshtml** (Dòng 138): `Vui lòng <a href="/Auth/Login?returnUrl=/hub/qa/@Model.Id" class="text-cyan-600 `
- **/asp.net-group/SmartLMS.Community/Views/Community/QaDetail.cshtml** (Dòng 210): `window.location.href = `/Auth/Login?returnUrl=/hub/qa/${questionId}`;`
- **/asp.net-group/SmartLMS.Community/Views/Community/QaDetail.cshtml** (Dòng 263): `window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Resources.cshtml** (Dòng 52): `<a href="/Auth/Login?returnUrl=/hub/resources" class="bg-white text-cyan-900 hov`
- **/asp.net-group/SmartLMS.Community/Views/Community/Resources.cshtml** (Dòng 350): `window.location.href = '/Auth/Login?returnUrl=/hub/resources';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Resources.cshtml** (Dòng 395): `} else if (res.status === 401) window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Resources.cshtml** (Dòng 407): `} else if (res.status === 401) window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Community/Resources.cshtml** (Dòng 422): `} else if (res.status === 401) window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/Views/Shared/_CommunityLayout.cshtml** (Dòng 121): `<a href="/Auth/Logout" class="ml-1 opacity-70 hover:opacity-100 transition-opaci`
- **/asp.net-group/SmartLMS.Community/Views/Shared/_CommunityLayout.cshtml** (Dòng 128): `<a href="/Auth/Login" class="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan`
- **/asp.net-group/SmartLMS.Community/Views/Shared/_CommunityLayout.cshtml** (Dòng 132): `<a href="/Auth/Register" class="flex items-center gap-1.5 border border-cyan-600`
- **/asp.net-group/SmartLMS.Community/wwwroot/js/components/resource-discussion.js** (Dòng 83): `window.location.href = '/Auth/Login';`
- **/asp.net-group/SmartLMS.Community/wwwroot/js/components/resource-discussion.js** (Dòng 100): `window.location.href = '/Auth/Login';`

## Endpoint: `/hub/mentor` (Hàm: Mentor)
⚠️ **Báo động:** Có giao diện đang gọi tới Endpoint này nhưng Logic backend trống!
- **/asp.net-group/SmartLMS.Community/Views/Shared/_CommunityLayout.cshtml** (Dòng 183): `<a href="/hub/mentor" class="py-3.5 text-xs md:text-sm font-semibold transition-`

## Endpoint: `/hub/messages` (Hàm: Messages)
✅ **An toàn:** Không có giao diện Frontend nào gọi tới Endpoint này (Có thể chỉ là file rác hoặc API dự phòng chưa dùng tới).

## Endpoint: `/hub/post/new` (Hàm: Create)
⚠️ **Báo động:** Có giao diện đang gọi tới Endpoint này nhưng Logic backend trống!
- **/asp.net-group/SmartLMS.Community/Views/Community/Create.cshtml** (Dòng 37): `<form id="post-form" action="/hub/post/new" method="POST" class="flex-1 p-6 flex`
- **/asp.net-group/SmartLMS.Community/Views/Community/Index.cshtml** (Dòng 48): `<a href="/hub/post/new" class="relative z-10 shrink-0 bg-white hover:bg-cyan-50 `

