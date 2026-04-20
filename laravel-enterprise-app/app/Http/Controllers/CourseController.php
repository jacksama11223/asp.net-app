<?php

namespace App\Http\Controllers;

use App\Services\SmartLmsService;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    protected SmartLmsService $smartLms;

    public function __construct(SmartLmsService $smartLms)
    {
        $this->smartLms = $smartLms;
    }

    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        $courses = $this->smartLms.getCourses();
        return view('courses.index', compact('courses'));
    }

    /**
     * Store a newly created course in API.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $result = $this->smartLms.createCourse($validated);

        if ($result['success']) {
            return redirect()->back()->with('success', 'Khóa học đã được tạo thành công trên hệ thống .NET!');
        }

        return redirect()->back()->withErrors(['api' => 'Lỗi từ API .NET: ' . ($result['data']['message'] ?? 'Kết nối thất bại')]);
    }
}
