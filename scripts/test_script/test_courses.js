/**
 * Script kiểm tra lỗi lấy danh sách khóa học
 * Chạy: node test_courses.js
 */
const API_BASE = 'http://141.253.114.218';

async function testCourses() {
    console.log('='.repeat(50));
    console.log('🚀 KIỂM TRA LỖI API KHÓA HỌC');
    console.log('='.repeat(50));

    try {
        // 1. Đăng nhập để lấy Token (mô phỏng người dùng thật)
        console.log('\n1. Đăng nhập Admin để lấy token...');
        const loginRes = await fetch(`${API_BASE}/api/auth/token`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: 'admin', password: 'Admin@123456' })
        });

        if (!loginRes.ok) {
            const errorText = await loginRes.text();
            throw new Error(`Đăng nhập thất bại (HTTP ${loginRes.status}). Phản hồi: ${errorText.substring(0, 100)}...`);
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        if (!token) throw new Error('Không lấy được Token trong JSON!');
        console.log('✅ Đã lấy được JWT Token.');

        const authHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        // 2. Lấy danh sách Khóa học công khai (Public Courses)
        console.log('\n2. Lấy danh sách KHÓA HỌC CÔNG KHAI (/api/public/courses)...');
        const publicRes = await fetch(`${API_BASE}/api/public/courses`, { headers: { 'Accept': 'application/json' } });
        const publicData = await publicRes.json();
        console.log(`✅ Kết quả: Có ${publicData.length || 0} khóa học công khai.`);
        if (publicData.length > 0) {
            console.log(`👉 Khóa học đầu tiên: "${publicData[0].courseName}" (Giá: ${publicData[0].price})`);
        } else {
            console.log('⚠️ Kho khóa học đang TRỐNG.');
        }

        // 3. Lấy danh sách Khóa học đã đăng ký (My Learning)
        console.log('\n3. Lấy danh sách KHÓA HỌC CỦA TÔI (/api/student/enrolled-courses)...');
        const enrolledRes = await fetch(`${API_BASE}/api/student/enrolled-courses`, { headers: authHeaders });
        
        if (!enrolledRes.ok) {
            const errorText = await enrolledRes.text();
            throw new Error(`Lỗi HTTP ${enrolledRes.status} - Chi tiết: ${errorText}`);
        }

        const enrolledData = await enrolledRes.json();
        console.log(`✅ Kết quả: Đã mua ${enrolledData.length || 0} khóa học.`);
        
        console.log('\n🎉 TẤT CẢ API KHÓA HỌC ĐÃ HOẠT ĐỘNG HOÀN HẢO!');
    } catch (e) {
        console.error(`\n❌ LỖI RỒI: ${e.message}`);
    }
}

testCourses();
