const axios = require('axios');

// Configure URLs and Credentials
const BASE_URL = 'http://141.253.114.218'; // Hoặc localhost:5181 nếu test local
const INSTRUCTOR_CREDENTIALS = { username: 'admin', password: 'Admin@123456' };
const STUDENT_CREDENTIALS = { username: 'student1', password: 'Student@123456' };

// IDs (Cần thay đổi tùy theo DB thực tế)
const COURSE_ID = 1;
let instructorId = 1;
let studentId = 2;

async function login(credentials, role) {
    console.log(`\n🔑 Đăng nhập ${role} (${credentials.username})...`);
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
        console.log(`✅ ${role} đăng nhập thành công! Token: ${response.data.token.substring(0, 15)}...`);
        return response.data.token;
    } catch (error) {
        console.error(`❌ Lỗi đăng nhập ${role}:`, error.response?.data || error.message);
        throw error;
    }
}

async function getMyInfo(token) {
    try {
        const response = await axios.get(`${BASE_URL}/api/student/whoami`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.userId;
    } catch (error) {
        return null;
    }
}

async function sendMessage(token, receiverId, courseId, content, role) {
    console.log(`\n✉️ ${role} đang gửi tin nhắn: "${content}"`);
    try {
        const response = await axios.post(`${BASE_URL}/api/messages/send`, {
            receiverId: receiverId,
            courseId: courseId,
            content: content
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ Gửi thành công! MessageId: ${response.data.messageId}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Lỗi gửi tin nhắn:`, error.response?.data || error.message);
    }
}

async function getChatHistory(token, courseId, otherUserId, role) {
    console.log(`\n📥 ${role} đang kiểm tra hộp thư...`);
    try {
        const response = await axios.get(`${BASE_URL}/api/messages/history/${courseId}/${otherUserId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const msgs = response.data;
        if (msgs.length === 0) {
            console.log(`⚠️ Hộp thư trống.`);
        } else {
            console.log(`✅ Tìm thấy ${msgs.length} tin nhắn:`);
            msgs.forEach(m => {
                const mark = m.isRead ? '👀' : '🆕';
                console.log(`   [${m.sentAt}] ${m.senderName}: ${m.content} ${mark}`);
            });
        }
    } catch (error) {
        console.error(`❌ Lỗi lấy lịch sử chat:`, error.response?.data || error.message);
    }
}

async function runTest() {
    console.log("==================================================");
    console.log("🚀 KIỂM TRA HỆ THỐNG NHẮN TIN (INSTRUCTOR - STUDENT)");
    console.log("==================================================");

    try {
        // 1. Đăng nhập
        const instructorToken = await login(INSTRUCTOR_CREDENTIALS, 'Giảng Viên');
        const studentToken = await login(STUDENT_CREDENTIALS, 'Học Viên');

        // Xác định ID (giả định, có thể lấy qua WhoAmI)
        const iId = await getMyInfo(instructorToken);
        const sId = await getMyInfo(studentToken);
        
        if(iId) instructorId = iId;
        if(sId) studentId = sId;

        // 2. Học viên hỏi bài Giảng viên
        await sendMessage(studentToken, instructorId, COURSE_ID, "Thầy ơi, cho em hỏi phần Kestrel hoạt động như thế nào ạ?", 'Học Viên');

        // 3. Giảng viên kiểm tra hộp thư
        await getChatHistory(instructorToken, COURSE_ID, studentId, 'Giảng Viên');

        // 4. Giảng viên trả lời
        await sendMessage(instructorToken, studentId, COURSE_ID, "Kestrel là web server đa nền tảng mặc định của ASP.NET Core em nhé. Nó rất nhẹ và nhanh!", 'Giảng Viên');

        // 5. Học viên kiểm tra hộp thư
        await getChatHistory(studentToken, COURSE_ID, instructorId, 'Học Viên');

        console.log("\n✅ HOÀN TẤT KIỂM TRA!");

    } catch (err) {
        console.log("\n❌ KIỂM TRA THẤT BẠI. Dừng luồng.");
    }
}

runTest();
