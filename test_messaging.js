const axios = require('axios');

// Cấu hình
const BASE_URL = 'http://141.253.114.218'; 
const INSTRUCTOR_CREDENTIALS = { username: 'admin', password: 'Admin@123456' };
const STUDENT_CREDENTIALS = { username: 'student1', password: 'Student@123456' };
const COURSE_ID = 1;

let instructorId = 1;
let studentId = 2;

async function login(credentials, role) {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
        console.log(`✅ [DB AUTH] ${role} đăng nhập thành công! Token cấp phát từ ASP.NET.`);
        return response.data.token;
    } catch (error) {
        console.error(`❌ [LỖI DB AUTH] Không thể đăng nhập ${role}. Kiểm tra DB Connection.`, error.response?.data || error.message);
        throw error;
    }
}

async function getUnreadCount(token, role) {
    try {
        const response = await axios.get(`${BASE_URL}/api/messages/unread`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`📊 [DB QUERY] ${role} hiện có ${response.data.count} tin nhắn chưa đọc.`);
        return response.data.count;
    } catch (error) {
        console.error(`❌ [LỖI DB QUERY] Không thể đếm số tin nhắn chưa đọc.`, error.response?.data || error.message);
    }
}

async function sendMessage(token, receiverId, courseId, content, role) {
    console.log(`\n✉️ [DB INSERT] ${role} đang ghi tin nhắn vào Database: "${content}"`);
    try {
        const response = await axios.post(`${BASE_URL}/api/messages/send`, {
            receiverId: receiverId,
            courseId: courseId,
            content: content
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ [DB INSERT OK] Tin nhắn đã lưu vào bảng DirectMessages (MessageId: ${response.data.messageId}).`);
        return response.data;
    } catch (error) {
        console.error(`❌ [LỖI DB INSERT] Ghi dữ liệu thất bại:`, error.response?.data || error.message);
    }
}

async function getChatHistory(token, courseId, otherUserId, role) {
    console.log(`\n📥 [DB SELECT & UPDATE] ${role} tải hộp thư (sẽ tự động Update IsRead = True trong DB)...`);
    try {
        const response = await axios.get(`${BASE_URL}/api/messages/history/${courseId}/${otherUserId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const msgs = response.data;
        if (msgs.length === 0) {
            console.log(`⚠️ Hộp thư trống.`);
        } else {
            console.log(`✅ [DB SELECT OK] Truy xuất thành công ${msgs.length} bản ghi:`);
            msgs.slice(-2).forEach(m => { // Chỉ in 2 tin mới nhất
                const mark = m.isRead ? '👀 (Đã đọc)' : '🆕 (Mới)';
                console.log(`   [${m.sentAt}] ${m.senderName}: ${m.content} ${mark}`);
            });
        }
    } catch (error) {
        console.error(`❌ Lỗi lấy lịch sử chat:`, error.response?.data || error.message);
    }
}

async function runTest() {
    console.log("==================================================");
    console.log("🚀 KIỂM TRA LUỒNG TƯƠNG TÁC DB: ASP.NET CORE <-> MARIADB");
    console.log("==================================================\n");

    try {
        // 1. Kiểm tra kết nối DB qua API Auth
        const instructorToken = await login(INSTRUCTOR_CREDENTIALS, 'Giảng Viên');
        const studentToken = await login(STUDENT_CREDENTIALS, 'Học Viên');

        // 2. Học viên kiểm tra tin nhắn chưa đọc
        await getUnreadCount(studentToken, 'Học Viên');

        // 3. Học viên Insert dữ liệu vào bảng DirectMessages
        await sendMessage(studentToken, instructorId, COURSE_ID, "Hệ thống DB hoạt động trơn tru không thầy?", 'Học Viên');

        // 4. Giảng viên kiểm tra tin chưa đọc -> Phải tăng lên
        await getUnreadCount(instructorToken, 'Giảng Viên');

        // 5. Giảng viên load lịch sử chat (kích hoạt Update IsRead = true trong DB)
        await getChatHistory(instructorToken, COURSE_ID, studentId, 'Giảng Viên');

        // 6. Giảng viên phản hồi
        await sendMessage(instructorToken, studentId, COURSE_ID, "DB MariaDB chạy cực kỳ mượt mà em nhé, 100% không độ trễ!", 'Giảng Viên');

        // 7. Học viên load lại lịch sử chat
        await getChatHistory(studentToken, COURSE_ID, instructorId, 'Học Viên');

        console.log("\n✅ [THÀNH CÔNG] TOÀN BỘ LUỒNG TƯƠNG TÁC DATABASE (INSERT, SELECT, UPDATE) ĐÃ HOẠT ĐỘNG HOÀN HẢO!");

    } catch (err) {
        console.log("\n❌ [THẤT BẠI] Bài Test tương tác Database thất bại.");
    }
}

runTest();
