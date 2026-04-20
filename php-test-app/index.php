<?php
/**
 * SmartLMS Enterprise - PHP API Tester
 * Standalone tool for testing Headless API endpoints.
 */

session_start();

// --- Configuration ---
$baseUrl = 'http://localhost:5181';
$apiKey = $_SESSION['api_key'] ?? '';
$error = null;
$message = null;
$courses = [];

// --- API Helper Function (cURL) ---
function callApi($method, $path, $headerKey, $data = null) {
    global $baseUrl;
    $url = $baseUrl . $path;
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'X-API-Key: ' . $headerKey,
        'Content-Type: application/json'
    ]);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        throw new Exception('Connection error: ' . curl_error($ch));
    }
    
    curl_close($ch);
    
    $decoded = json_decode($response, true);
    if ($httpCode >= 400) {
        throw new Exception($decoded['message'] ?? "API Error (Status $httpCode)");
    }
    
    return $decoded;
}

// --- Action Handling ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (isset($_POST['action'])) {
            switch ($_POST['action']) {
                case 'connect':
                    $_SESSION['api_key'] = $_POST['api_key'];
                    $apiKey = $_SESSION['api_key'];
                    $message = "Đã lưu API Key thành công!";
                    break;
                
                case 'create_course':
                    $courseData = [
                        'title' => $_POST['title'],
                        'description' => $_POST['description'],
                        'price' => (float)$_POST['price']
                    ];
                    $result = callApi('POST', '/api/public/courses', $apiKey, $courseData);
                    $message = "Thành công: " . $result['message'] . " (ID: " . $result['courseId'] . ")";
                    break;

                case 'disconnect':
                    session_destroy();
                    header("Location: index.php");
                    exit;
            }
        }
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

// --- Fetch Courses if Connected ---
if ($apiKey) {
    try {
        $courses = callApi('GET', '/api/public/courses', $apiKey);
    } catch (Exception $e) {
        $error = "Lỗi khi tải danh sách: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartLMS Enterprise | PHP API Tester</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background: radial-gradient(circle at top left, #1e293b, #0f172a);
            color: #f8fafc;
            min-height: 100vh;
        }
        .glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .animate-gradient {
            background: linear-gradient(270deg, #38bdf8, #818cf8, #c084fc);
            background-size: 600% 600%;
            animation: moveGradient 6s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        @keyframes moveGradient {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
        }
    </style>
</head>
<body class="p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <header class="mb-12 flex justify-between items-center">
            <div>
                <h1 class="text-4xl font-bold mb-2 animate-gradient">SmartLMS API Tester (PHP)</h1>
                <p class="text-slate-400">Tích hợp Headless API với Backend .NET Enterprise</p>
            </div>
            <?php if ($apiKey): ?>
            <form method="POST">
                <input type="hidden" name="action" value="disconnect">
                <button type="submit" class="text-red-400 hover:text-red-300 transition-colors text-sm font-medium">Ngắt kết nối</button>
            </form>
            <?php endif; ?>
        </header>

        <!-- Message/Error Hub -->
        <?php if ($error): ?>
            <div class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <strong>Lỗi:</strong> <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <?php if ($message): ?>
            <div class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <?php echo htmlspecialchars($message); ?>
            </div>
        <?php endif; ?>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Panel: Connection/POST -->
            <div class="lg:col-span-1 space-y-8">
                
                <!-- Connection Card -->
                <div class="glass p-6 rounded-3xl">
                    <h2 class="text-xl font-bold mb-6 text-sky-400 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                        Xác thực API
                    </h2>
                    <form method="POST" class="space-y-4">
                        <input type="hidden" name="action" value="connect">
                        <div>
                            <label class="block text-xs font-semibold uppercase text-slate-500 mb-2">API KEY ENTERPRISE</label>
                            <input type="password" name="api_key" value="<?php echo htmlspecialchars($apiKey); ?>" 
                                   class="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder-slate-600"
                                   placeholder="slms_..." required>
                        </div>
                        <button type="submit" 
                                class="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-sky-500/20">
                            Kết nối Hệ thống
                        </button>
                    </form>
                </div>

                <!-- Create Course Form -->
                <?php if ($apiKey): ?>
                <div class="glass p-6 rounded-3xl">
                    <h2 class="text-xl font-bold mb-6 text-emerald-400 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Tạo Khóa học mới
                    </h2>
                    <form method="POST" class="space-y-4">
                        <input type="hidden" name="action" value="create_course">
                        <div>
                            <label class="block text-xs font-semibold uppercase text-slate-500 mb-2">Tiêu đề</label>
                            <input type="text" name="title" class="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" required>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase text-slate-500 mb-2">Mô tả</label>
                            <textarea name="description" rows="3" class="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" required></textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase text-slate-500 mb-2">Giá niêm yết (USD)</label>
                            <input type="number" name="price" step="0.01" class="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" value="19.99">
                        </div>
                        <button type="submit" 
                                class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20">
                            Gửi Yêu cầu POST
                        </button>
                    </form>
                </div>
                <?php endif; ?>

            </div>

            <!-- Right Panel: Data Explorer -->
            <div class="lg:col-span-2">
                <div class="glass p-8 rounded-3xl min-h-[500px]">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-2xl font-bold flex items-center">
                            <span class="p-2 bg-indigo-500/20 rounded-lg mr-3">
                                <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </span>
                            Dữ liệu từ .NET Backend
                        </h2>
                        <?php if ($apiKey): ?>
                            <span class="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-bold rounded-full border border-sky-400/20">CONNECTED</span>
                        <?php endif; ?>
                    </div>

                    <?php if (!$apiKey): ?>
                        <div class="flex flex-col items-center justify-center h-[400px] text-center text-slate-500">
                            <svg class="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                            <p class="text-lg">Vui lòng nhập API Key để xem dữ liệu</p>
                        </div>
                    <?php elseif (empty($courses)): ?>
                        <div class="flex flex-col items-center justify-center h-[400px] text-center text-slate-500">
                            <p class="text-lg">Không tìm thấy khóa học nào hoặc API trả về rỗng.</p>
                        </div>
                    <?php else: ?>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <?php foreach ($courses as $c): ?>
                            <div class="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/50 transition-all group">
                                <div class="flex justify-between items-start mb-3">
                                    <h3 class="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                                        <?php echo htmlspecialchars($c['courseName'] ?? $c['title'] ?? 'N/A'); ?>
                                    </h3>
                                    <span class="text-xs font-bold text-sky-400 bg-sky-400/10 px-2 py-1 rounded">
                                        $<?php echo number_format($c['price'] ?? 0, 2); ?>
                                    </span>
                                </div>
                                <p class="text-sm text-slate-400 line-clamp-2 mb-4 italic">
                                    "<?php echo htmlspecialchars($c['summary'] ?? $c['description'] ?? ''); ?>"
                                </p>
                                <div class="flex items-center text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                    <svg class="w-4 h-4 mr-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                    <?php echo $c['totalStudents'] ?? 0; ?> học viên
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

        </div>

        <footer class="mt-12 text-center text-slate-600 text-sm">
            &copy; 2026 SmartLMS Enterprise AI Dashboard - Powered by PHP Standalone API Module
        </footer>
    </div>
</body>
</html>
