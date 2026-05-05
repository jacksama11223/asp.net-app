<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartLMS AI - Nền tảng học tập thế hệ mới</title>
    <meta name="description" content="Hệ thống quản lý học tập tích hợp AI, giúp cá nhân hóa lộ trình và dự báo thành công.">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand: #6366f1;
            --brand-dark: #4f46e5;
            --bg: #0f172a;
            --card: rgba(30, 41, 59, 0.7);
            --text: #f8fafc;
        }

        * {
            margin: 0; padding: 0; box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
            background-color: var(--bg);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Navbar */
        nav {
            padding: 2rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-weight: 800;
            font-size: 1.5rem;
            background: linear-gradient(to right, #818cf8, #c084fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Hero Section */
        .hero {
            padding: 8rem 0;
            text-align: center;
            position: relative;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: -10%; left: 50%;
            width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%);
            transform: translateX(-50%);
            z-index: -1;
        }

        h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            letter-spacing: -2px;
            line-height: 1;
        }

        .gradient-text {
            background: linear-gradient(to right, #818cf8, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            font-size: 1.25rem;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto 3rem;
        }

        .btn {
            padding: 1rem 2.5rem;
            border-radius: 12px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .btn-primary {
            background-color: var(--brand);
            color: white;
            box-shadow: 0 10px 25px -5px rgba(99,102,241,0.4);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            background-color: var(--brand-dark);
        }

        /* Features */
        .features {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 4rem;
        }

        .feature-card {
            background: var(--card);
            padding: 3rem 2rem;
            border-radius: 24px;
            border: 1px solid rgba(255,255,255,0.05);
            transition: border 0.3s ease;
        }

        .feature-card:hover {
            border-color: var(--brand);
        }

        .icon {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            display: block;
        }

        h3 { margin-bottom: 1rem; font-size: 1.5rem; }

        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <nav>
            <div class="logo">SmartLMS.AI</div>
            <a href="/app/login" class="btn" style="color: #94a3b8">Đăng nhập</a>
        </nav>

        <section class="hero">
            <h1>Học Tập Thông Minh<br><span class="gradient-text">Kiến Tạo Tương Lai</span></h1>
            <p>Hệ thống LMS đầu tiên tích hợp Trí tuệ nhân tạo để cá nhân hóa lộ trình học tập và tối ưu hóa kết quả của bạn.</p>
            <div class="cta-group">
                <a href="/app/register" class="btn btn-primary">Bắt đầu ngay miễn phí</a>
            </div>

            <div class="features">
                <div class="feature-card">
                    <span class="icon">🤖</span>
                    <h3>AI Predictor</h3>
                    <Text style="color: #94a3b8">Dự báo rủi ro học tập và đưa ra cảnh báo sớm cho học viên.</Text>
                </div>
                <div class="feature-card">
                    <span class="icon">⚡</span>
                    <h3>Real-time SignalR</h3>
                    <Text style="color: #94a3b8">Tương tác tức thì giữa giảng viên và sinh viên qua hệ thống thông báo.</Text>
                </div>
                <div class="feature-card">
                    <span class="icon">💎</span>
                    <h3>Professional UI</h3>
                    <Text style="color: #94a3b8">Giao diện hiện đại, mượt mà mang lại cảm hứng học tập mỗi ngày.</Text>
                </div>
            </div>
        </section>
    </div>
</body>
</html>
