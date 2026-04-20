<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartLMS Enterprise | Laravel Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f9fafb; }
        .gradient-bg { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); }
    </style>
</head>
<body class="bg-gray-50 text-gray-900">
    <nav class="gradient-bg text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold tracking-tight">SmartLMS Enterprise AI</h1>
            <div class="flex items-center space-x-6 text-sm font-medium">
                <a href="#" class="hover:text-blue-200 transition-colors">Dashboard</a>
                <a href="#" class="hover:text-blue-200 transition-colors">Courses</a>
                <span class="bg-white/20 px-3 py-1 rounded-full text-xs">Laravel Integration</span>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 py-12">
        @yield('content')
    </main>

    <footer class="mt-20 border-t border-gray-200 py-10 bg-white">
        <div class="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; 2026 SmartLMS Enterprise. Powered by Laravel 11 & ASP.NET Core 8.
        </div>
    </footer>
</body>
</html>
