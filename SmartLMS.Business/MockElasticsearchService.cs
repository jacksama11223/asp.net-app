using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartLMS.Data;
using SmartLMS.Models;
using Microsoft.EntityFrameworkCore;

namespace SmartLMS.Business
{
    public class MockElasticsearchService : ISearchEngineService
    {
        private readonly SmartLMSContext _context;
        private readonly ILogger<MockElasticsearchService> _logger;

        public MockElasticsearchService(SmartLMSContext context, ILogger<MockElasticsearchService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> IndexCourseAsync(Course course)
        {
            // GIẢ LẬP: Gói dữ liệu và quăng qua cổng HTTP 9200 của cài đặt local Elasticsearch
            _logger.LogInformation($"[Mock ElasticSearch] Vừa nạp Index Full-Text thành công cho Khóa học: {course.Title}");
            await Task.Delay(100);
            return true;
        }

        public async Task<IEnumerable<Course>> SearchCoursesAsync(string keyword, int page = 1, int size = 10)
        {
            _logger.LogInformation($"[Mock ElasticSearch] Đang tra cứu siêu tốc Node Cluster: '{keyword}'");
            
            // Do chưa có Docker chạy Elastic thật, ta phải mượn tàm tạm SQL bằng Contains (Fuzzy search dỏm)
            // Khi có Elastic thật, ta gọi: _elasticClient.SearchAsync<Course>(s => s.Query(q => q.MultiMatch(m => m.Fields(f => f.Field(p => p.Title)).Query(keyword))));
            
            await Task.Delay(50); // Siêu nhanh như phản xạ chớp mắt của Elastic
            
            if (string.IsNullOrEmpty(keyword))
                return new List<Course>();

            // Lấy tạm từ DB (Không khuyến khích vì mục đích của Class này sinh ra là để thay mã DB)
            return await _context.Courses
                .Where(c => c.Title != null && c.Title.Contains(keyword) || (c.Description != null && c.Description.Contains(keyword)))
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
        }
    }
}
