#!/bin/bash
# ============================================================
# SmartLMS - Script tạo dữ liệu mẫu cho MariaDB
# Chạy trên server: bash seed_data.sh
# ============================================================

DB_CONTAINER="smartlms-db-prod"
DB_PASS="YOUR_DB_PASSWORD"
DB_NAME="SmartLMS"
DB_USER="root"

run_sql() {
    docker exec -i $DB_CONTAINER mariadb -u $DB_USER -p$DB_PASS $DB_NAME -e "$1" 2>/dev/null
}

echo "=================================================="
echo "  SmartLMS - Đang tạo dữ liệu mẫu..."
echo "=================================================="

# -------- 1. TẠO BCrypt HASH cho các mật khẩu --------
echo ">> Tạo BCrypt hash mật khẩu..."
HASH_ADMIN=$(htpasswd -bnBC 11 "" "Admin@123456" | tr -d ':\n')
HASH_INSTRUCTOR=$(htpasswd -bnBC 11 "" "Instructor@123" | tr -d ':\n')
HASH_STUDENT=$(htpasswd -bnBC 11 "" "Student@123" | tr -d ':\n')

echo "   ✅ Hash admin:      Admin@123456"
echo "   ✅ Hash instructor: Instructor@123"
echo "   ✅ Hash student:    Student@123"

# -------- 2. RESET & CẬP NHẬT ADMIN --------
echo ">> Cập nhật mật khẩu Admin..."
run_sql "UPDATE Users SET PasswordHash='$HASH_ADMIN', Email='admin@smartlms.com', FullName='System Administrator', Role='Admin', UserType='Admin', Status=1, HierarchyLevel=1, TotalXP=9999 WHERE Username='admin';"

# -------- 3. TẠO INSTRUCTORS --------
echo ">> Tạo tài khoản Giảng viên..."
run_sql "
INSERT IGNORE INTO Users (Username, FullName, Email, PasswordHash, Role, UserType, Status, LecturerStatus, HierarchyLevel, TotalXP, Bio, CreatedDate)
VALUES
('nguyen.giang', 'Nguyễn Thị Giang', 'giang.nguyen@smartlms.com', '$HASH_INSTRUCTOR', 'Instructor', 'Instructor', 1, 2, 2, 1500, 'Giảng viên chuyên ngành Lập trình Web với 8 năm kinh nghiệm.', NOW()),
('tran.minh',    'Trần Văn Minh',     'minh.tran@smartlms.com',    '$HASH_INSTRUCTOR', 'Instructor', 'Instructor', 1, 2, 2, 1200, 'Chuyên gia về Khoa học dữ liệu và AI/ML.', NOW()),
('le.huong',     'Lê Thị Hương',      'huong.le@smartlms.com',     '$HASH_INSTRUCTOR', 'Instructor', 'Instructor', 1, 2, 2, 980,  'Giảng viên thiết kế UX/UI và Marketing số.', NOW());
"

# -------- 4. TẠO STUDENTS --------
echo ">> Tạo tài khoản Học viên..."
run_sql "
INSERT IGNORE INTO Users (Username, FullName, Email, PasswordHash, Role, UserType, Status, HierarchyLevel, TotalXP, DateOfBirth, Hometown, CreatedDate)
VALUES
('pham.an',       'Phạm Văn An',      'an.pham@email.com',      '$HASH_STUDENT', 'Student', 'Student', 1, 3, 450,  '2000-05-15', 'Hà Nội',    NOW()),
('nguyen.linh',   'Nguyễn Thị Linh',  'linh.nguyen@email.com',  '$HASH_STUDENT', 'Student', 'Student', 1, 3, 680,  '1999-08-20', 'TP.HCM',    NOW()),
('tran.duc',      'Trần Đức Mạnh',    'duc.tran@email.com',     '$HASH_STUDENT', 'Student', 'Student', 1, 3, 320,  '2001-03-10', 'Đà Nẵng',   NOW()),
('vo.huong',      'Võ Thị Hương',     'huong.vo@email.com',     '$HASH_STUDENT', 'Student', 'Student', 1, 3, 890,  '1998-11-25', 'Cần Thơ',   NOW()),
('hoang.son',     'Hoàng Văn Sơn',    'son.hoang@email.com',    '$HASH_STUDENT', 'Student', 'Student', 1, 3, 210,  '2002-07-01', 'Hải Phòng', NOW()),
('bui.mai',       'Bùi Thị Mai',      'mai.bui@email.com',      '$HASH_STUDENT', 'Student', 'Student', 1, 3, 560,  '2000-12-08', 'Huế',       NOW()),
('dinh.tung',     'Đinh Văn Tùng',    'tung.dinh@email.com',    '$HASH_STUDENT', 'Student', 'Student', 1, 3, 740,  '1999-04-17', 'Nha Trang', NOW()),
('phan.thu',      'Phan Thị Thu',     'thu.phan@email.com',     '$HASH_STUDENT', 'Student', 'Student', 1, 3, 120,  '2003-09-30', 'Vũng Tàu',  NOW()),
('ly.bach',       'Lý Bạch Tuyết',    'bach.ly@email.com',      '$HASH_STUDENT', 'Student', 'Student', 1, 3, 950,  '1997-06-14', 'Hà Nội',    NOW()),
('do.quang',      'Đỗ Quang Huy',     'quang.do@email.com',     '$HASH_STUDENT', 'Student', 'Student', 1, 3, 380,  '2001-01-22', 'TP.HCM',    NOW());
"

# -------- 5. TẠO COURSES --------
echo ">> Tạo dữ liệu Khóa học..."

# Lấy InstructorId
INST1=$(run_sql "SELECT UserId FROM Users WHERE Username='nguyen.giang' LIMIT 1;" | tail -1)
INST2=$(run_sql "SELECT UserId FROM Users WHERE Username='tran.minh' LIMIT 1;" | tail -1)
INST3=$(run_sql "SELECT UserId FROM Users WHERE Username='le.huong' LIMIT 1;" | tail -1)

run_sql "
INSERT IGNORE INTO Courses (Title, Description, Category, InstructorId, Price, DiscountPrice, IsFree, Status, BaseSalaryImpact, AI_BaseSalaryImpact, CreatedAt, UpdatedAt, IsDeleted, MetaTitle, MetaDescription)
VALUES
('Lập trình Web với ASP.NET Core 8',       'Khóa học toàn diện về ASP.NET Core 8, EF Core, REST API và deployment lên Cloud.',    'Lập trình',      $INST1, 1200000, 899000,  0, 'Published', 0.25, 2500000, NOW(), NOW(), 0, 'Học ASP.NET Core 8 từ A-Z', 'Khóa học ASP.NET Core chuyên sâu'),
('Python cho Data Science & AI',            'Học Python, Pandas, NumPy, Scikit-learn và xây dựng mô hình ML thực tế.',             'AI & Data',      $INST2, 1500000, 1199000, 0, 'Published', 0.35, 3500000, NOW(), NOW(), 0, 'Python Data Science', 'Học Python cho khoa học dữ liệu'),
('UI/UX Design Chuyên nghiệp',              'Figma, Design System, Prototyping và nghiên cứu người dùng cho sản phẩm thực tế.',    'Thiết kế',       $INST3, 990000,  750000,  0, 'Published', 0.20, 2000000, NOW(), NOW(), 0, 'Học UX/UI Design', 'Khóa học thiết kế UI/UX chuyên nghiệp'),
('Digital Marketing & SEO toàn tập',        'Google Ads, Facebook Ads, SEO, Content Marketing và phân tích dữ liệu marketing.',    'Marketing',      $INST3, 850000,  650000,  0, 'Published', 0.18, 1800000, NOW(), NOW(), 0, 'Digital Marketing', 'Khóa học digital marketing'),
('Docker & Kubernetes cho Developer',        'Containerization, CI/CD Pipeline, Kubernetes deployment và cloud-native development.', 'DevOps',         $INST1, 1100000, 799000,  0, 'Published', 0.30, 3000000, NOW(), NOW(), 0, 'Docker Kubernetes', 'Học Docker và Kubernetes'),
('Tiếng Anh giao tiếp cho IT',             'Kỹ năng giao tiếp tiếng Anh trong môi trường công nghệ, email, meeting và thuyết trình.', 'Ngoại ngữ',  $INST2, 0,       0,       1, 'Published', 0.15, 1500000, NOW(), NOW(), 0, 'Tiếng Anh IT', 'Học tiếng Anh cho người làm IT'),
('React.js & Next.js nâng cao',             'Hooks, Context API, Server-Side Rendering, Static Generation và tối ưu performance.',  'Lập trình',      $INST1, 1300000, 999000,  0, 'Published', 0.28, 2800000, NOW(), NOW(), 0, 'React Next.js', 'Học React và Next.js nâng cao'),
('Quản trị dự án với Agile & Scrum',        'Sprint planning, backlog, daily standup, retrospective và quản lý team agile.',        'Quản lý',        $INST2, 750000,  550000,  0, 'Published', 0.22, 2200000, NOW(), NOW(), 0, 'Agile Scrum', 'Quản trị dự án Agile');
"

# -------- 6. TẠO ENROLLMENTS --------
echo ">> Tạo dữ liệu Đăng ký học..."

# Lấy UserId của học viên
S1=$(run_sql "SELECT UserId FROM Users WHERE Username='pham.an' LIMIT 1;" | tail -1)
S2=$(run_sql "SELECT UserId FROM Users WHERE Username='nguyen.linh' LIMIT 1;" | tail -1)
S3=$(run_sql "SELECT UserId FROM Users WHERE Username='tran.duc' LIMIT 1;" | tail -1)
S4=$(run_sql "SELECT UserId FROM Users WHERE Username='vo.huong' LIMIT 1;" | tail -1)
S5=$(run_sql "SELECT UserId FROM Users WHERE Username='hoang.son' LIMIT 1;" | tail -1)
S6=$(run_sql "SELECT UserId FROM Users WHERE Username='bui.mai' LIMIT 1;" | tail -1)
S7=$(run_sql "SELECT UserId FROM Users WHERE Username='dinh.tung' LIMIT 1;" | tail -1)
S8=$(run_sql "SELECT UserId FROM Users WHERE Username='phan.thu' LIMIT 1;" | tail -1)
S9=$(run_sql "SELECT UserId FROM Users WHERE Username='ly.bach' LIMIT 1;" | tail -1)
S10=$(run_sql "SELECT UserId FROM Users WHERE Username='do.quang' LIMIT 1;" | tail -1)

# Lấy CourseId
C1=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%ASP.NET%' LIMIT 1;" | tail -1)
C2=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%Python%' LIMIT 1;" | tail -1)
C3=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%UI/UX%' LIMIT 1;" | tail -1)
C4=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%Marketing%' LIMIT 1;" | tail -1)
C5=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%Docker%' LIMIT 1;" | tail -1)
C6=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%Tiếng Anh%' LIMIT 1;" | tail -1)
C7=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%React%' LIMIT 1;" | tail -1)
C8=$(run_sql "SELECT CourseId FROM Courses WHERE Title LIKE '%Agile%' LIMIT 1;" | tail -1)

run_sql "
INSERT IGNORE INTO Enrollments (UserId, CourseId, Progress, AvgScore, LastAccessDate, IsCompleted, IsDropout)
VALUES
($S1, $C1, 85.0, 8.5, NOW(), 0, 0),
($S1, $C5, 45.0, 7.2, NOW(), 0, 0),
($S1, $C6, 100.0, 9.0, NOW(), 1, 0),
($S2, $C2, 72.0, 8.0, NOW(), 0, 0),
($S2, $C3, 90.0, 9.2, NOW(), 0, 0),
($S2, $C7, 100.0, 8.8, NOW(), 1, 0),
($S3, $C1, 30.0, 6.5, NOW(), 0, 0),
($S3, $C4, 15.0, 5.0, NOW(), 0, 1),
($S3, $C8, 60.0, 7.0, NOW(), 0, 0),
($S4, $C2, 100.0, 9.5, NOW(), 1, 0),
($S4, $C5, 100.0, 9.0, NOW(), 1, 0),
($S4, $C7, 88.0, 8.3, NOW(), 0, 0),
($S5, $C3, 20.0, 6.0, NOW(), 0, 0),
($S5, $C6, 55.0, 7.5, NOW(), 0, 0),
($S6, $C1, 95.0, 9.3, NOW(), 0, 0),
($S6, $C2, 78.0, 8.1, NOW(), 0, 0),
($S6, $C8, 100.0, 8.7, NOW(), 1, 0),
($S7, $C4, 65.0, 7.8, NOW(), 0, 0),
($S7, $C5, 40.0, 7.0, NOW(), 0, 0),
($S7, $C7, 100.0, 9.1, NOW(), 1, 0),
($S8, $C3, 10.0, 5.5, NOW(), 0, 0),
($S8, $C6, 100.0, 8.9, NOW(), 1, 0),
($S9, $C1, 100.0, 9.8, NOW(), 1, 0),
($S9, $C2, 100.0, 9.6, NOW(), 1, 0),
($S9, $C5, 100.0, 9.4, NOW(), 1, 0),
($S9, $C7, 95.0, 9.2, NOW(), 0, 0),
($S10, $C4, 50.0, 7.3, NOW(), 0, 0),
($S10, $C8, 80.0, 8.0, NOW(), 0, 0);
"

# -------- 7. TẠO COURSE MODULES --------
echo ">> Tạo dữ liệu Module khóa học..."
run_sql "
INSERT IGNORE INTO CourseModules (CourseId, Title, OrderIndex, Description)
VALUES
($C1, 'Giới thiệu ASP.NET Core 8',           1, 'Tổng quan về framework, kiến trúc và cài đặt môi trường'),
($C1, 'Routing & Controllers',               2, 'Cách hoạt động của Routing và xây dựng Controllers'),
($C1, 'Entity Framework Core & MariaDB',     3, 'ORM, Code First Migration và tối ưu query'),
($C1, 'Authentication & Authorization',      4, 'JWT, Cookie Auth và phân quyền nâng cao'),
($C1, 'Deployment lên Oracle Cloud',         5, 'Docker, CI/CD và deploy production'),
($C2, 'Python cơ bản & Pandas',              1, 'Cú pháp Python và xử lý dữ liệu với Pandas'),
($C2, 'Trực quan hóa dữ liệu',              2, 'Matplotlib, Seaborn và Plotly'),
($C2, 'Machine Learning cơ bản',             3, 'Scikit-learn, Classification và Regression'),
($C2, 'Deep Learning & Neural Networks',     4, 'TensorFlow, Keras và CNN'),
($C3, 'Nguyên tắc thiết kế UI',              1, 'Color, Typography, Layout và Grid system'),
($C3, 'Figma từ A-Z',                        2, 'Công cụ thiết kế, Components và Auto Layout'),
($C3, 'Prototyping & User Testing',          3, 'Tạo prototype tương tác và kiểm thử với người dùng');
"

# -------- 8. TẠO BADGES --------
echo ">> Tạo dữ liệu Huy hiệu..."
run_sql "
INSERT IGNORE INTO Badges (Name, Description, IconUrl, XPRequired, Category)
VALUES
('Học viên Xuất sắc',    'Hoàn thành khóa học với điểm ≥ 9.0',          '🏆', 500,  'Academic'),
('Siêu cần cù',          'Học liên tục 7 ngày không nghỉ',               '🔥', 200,  'Streak'),
('Nhà Khám phá',         'Đăng ký 3 khóa học khác lĩnh vực',            '🧭', 300,  'Explorer'),
('Học Xong Ngay',        'Hoàn thành khóa học đầu tiên',                 '🎯', 100,  'Milestone'),
('Top Học viên',         'Xếp hạng top 10% trong khóa học',             '⭐', 1000, 'Elite'),
('Đóng góp Cộng đồng',  'Trả lời 10 câu hỏi trong diễn đàn',           '💬', 400,  'Community');
" 2>/dev/null || true  # Bỏ qua nếu bảng Badges chưa có cột Category

# -------- 9. TẠO ACTIVITY LOGS --------
echo ">> Tạo Activity Logs mẫu..."
ADMIN_ID=$(run_sql "SELECT UserId FROM Users WHERE Username='admin' LIMIT 1;" | tail -1)
run_sql "
INSERT INTO ActivityLogs (UserId, Action, EntityType, EntityId, Timestamp, IPAddress)
VALUES
($ADMIN_ID, 'LOGIN',    'User',   $ADMIN_ID, DATE_SUB(NOW(), INTERVAL 1 HOUR),    '127.0.0.1'),
($S1,       'ENROLL',   'Course', $C1,       DATE_SUB(NOW(), INTERVAL 2 HOUR),    '192.168.1.1'),
($S2,       'COMPLETE', 'Course', $C7,       DATE_SUB(NOW(), INTERVAL 3 HOUR),    '192.168.1.2'),
($S4,       'COMPLETE', 'Course', $C2,       DATE_SUB(NOW(), INTERVAL 4 HOUR),    '192.168.1.4'),
($S9,       'COMPLETE', 'Course', $C1,       DATE_SUB(NOW(), INTERVAL 5 HOUR),    '192.168.1.9');
" 2>/dev/null || true  # Bỏ qua nếu có lỗi cột

# -------- 10. KIỂM TRA KẾT QUẢ --------
echo ""
echo "=================================================="
echo "  ✅ HOÀN TẤT! Thống kê dữ liệu đã tạo:"
echo "=================================================="
run_sql "SELECT 'Users' as Bang, COUNT(*) as SoLuong FROM Users
UNION ALL SELECT 'Courses', COUNT(*) FROM Courses
UNION ALL SELECT 'Enrollments', COUNT(*) FROM Enrollments
UNION ALL SELECT 'CourseModules', COUNT(*) FROM CourseModules;"

echo ""
echo "📋 DANH SÁCH TÀI KHOẢN ĐỂ TEST:"
echo "================================"
echo "| Role       | Username         | Password         |"
echo "|------------|------------------|------------------|"
echo "| Admin      | admin            | Admin@123456     |"
echo "| Instructor | nguyen.giang     | Instructor@123   |"
echo "| Instructor | tran.minh        | Instructor@123   |"
echo "| Instructor | le.huong         | Instructor@123   |"
echo "| Student    | pham.an          | Student@123      |"
echo "| Student    | nguyen.linh      | Student@123      |"
echo "| Student    | vo.huong         | Student@123      |"
echo "| Student    | ly.bach          | Student@123      |"
echo "================================"
echo "🌐 URL: http://YOUR_VPS_IP"


