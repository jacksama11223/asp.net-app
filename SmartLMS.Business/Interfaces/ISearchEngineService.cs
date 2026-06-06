using System.Collections.Generic;
using System.Threading.Tasks;
using SmartLMS.Models;

namespace SmartLMS.Business
{
    public interface ISearchEngineService
    {
        /// <summary>
        /// Đẩy tài liệu (Khóa học/Bài giảng) lên Elasticsearch để chuẩn bị Indexing.
        /// Thường gọi khi có khóa học mới tạo hoặc cập nhật.
        /// </summary>
        Task<bool> IndexCourseAsync(Course course);

        /// <summary>
        /// Tìm kiếm Full-text siêu tốc (Tìm gần đúng, sai chính tả).
        /// Thay thế cho câu lệnh SQL LIKE '%keyword%'.
        /// </summary>
        Task<IEnumerable<Course>> SearchCoursesAsync(string keyword, int page = 1, int size = 10);
    }
}
