using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business.MessageBus
{
    public class MockRabbitMQBus : IMessageBus
    {
        private readonly ILogger<MockRabbitMQBus> _logger;

        public MockRabbitMQBus(ILogger<MockRabbitMQBus> logger)
        {
            _logger = logger;
        }

        public Task PublishAsync<T>(string eventName, T message)
        {
            var payload = JsonSerializer.Serialize(message);
            // GIẢ LẬP: Nếu có RabbitMQ, đoạn này sẽ là: _channel.BasicPublish(exchange, routingKey, basicProperties, body);
            
            _logger.LogWarning($"[RABBIT-MQ MOCK] Đã phát sự kiện [{eventName}] vào Hàng đợi. Máy chủ Gửi Email / Gắn Huy hiệu sẽ tự động bắt lấy. Payload: {payload}");

            return Task.CompletedTask;
        }
    }
}
