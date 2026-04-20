@extends('layouts.app')

@section('content')
<div class="space-y-10">
    <!-- Header/Action Section -->
    <div class="flex justify-between items-end">
        <div>
            <h2 class="text-3xl font-bold text-gray-900">Danh sách Khóa học</h2>
            <p class="text-gray-500 mt-2">Dữ liệu được đồng bộ trực tiếp từ SmartLMS .NET Services.</p>
        </div>
        <button onclick="document.getElementById('courseModal').classList.remove('hidden')" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all focus:ring-4 focus:ring-blue-100 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Thêm Khóa học mới
        </button>
    </div>

    <!-- Alert Messages -->
    @if(session('success'))
        <div class="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl shadow-sm flex items-center">
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            {{ session('success') }}
        </div>
    @endif

    @if($errors->any())
        <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl shadow-sm">
            <ul class="list-disc list-inside space-y-1 font-medium">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50/50 border-b border-gray-200">
                <tr>
                    <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Tiêu đề khóa học</th>
                    <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Mô tả tóm tắt</th>
                    <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Giá niêm yết</th>
                    <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Học viên</th>
                    <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Trạng thái</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                @forelse($courses as $course)
                <tr class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-6 py-5 font-semibold text-gray-900">
                        {{ $course['courseName'] ?? $course['title'] ?? 'N/A' }}
                    </td>
                    <td class="px-6 py-5 text-gray-500 text-sm max-w-xs truncate">
                        {{ $course['summary'] ?? $course['description'] ?? '-' }}
                    </td>
                    <td class="px-6 py-5 font-mono font-bold text-blue-600">
                        ${{ number_format($course['price'] ?? 0, 2) }}
                    </td>
                    <td class="px-6 py-5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {{ $course['totalStudents'] ?? 0 }} học viên
                        </span>
                    </td>
                    <td class="px-6 py-5">
                        <div class="flex items-center text-emerald-600 font-bold text-xs uppercase">
                            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                            Đang mở
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="px-6 py-20 text-center text-gray-400">
                        <svg class="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 00-.707-.293H4"></path></svg>
                        Chưa có dữ liệu khóa học nào từ API.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<!-- Modal Form -->
<div id="courseModal" class="hidden fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        <div class="p-8 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-900">Tạo khóa học mới trên .NET</h3>
            <button onclick="document.getElementById('courseModal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <form action="{{ route('courses.store') }}" method="POST" class="p-8 space-y-6">
            @csrf
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Tiêu đề khóa học</label>
                <input type="text" name="title" required class="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="Ví dụ: Lập trình .NET nâng cao">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Giá niêm yết ($)</label>
                <input type="number" step="0.01" name="price" required class="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value="49.99">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Mô tả chi tiết</label>
                <textarea name="description" rows="4" required class="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="Nội dung khóa học sẽ được gửi về Web Services..."></textarea>
            </div>
            <div class="pt-4 flex space-x-4">
                <button type="button" onclick="document.getElementById('courseModal').classList.add('hidden')" class="flex-1 px-6 py-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
                <button type="submit" class="flex-1 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors">Giao tiếp API & Lưu</button>
            </div>
        </form>
    </div>
</div>
@endsection
