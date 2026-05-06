using System;
using System.Text.Json;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace SmartLMS.Business.MessageBus
{
    public class MockRabbitMQBus : IMessageBus
    {
        private readonly ILogger<MockRabbitMQBus> _logger;
        // Sử dụng Channel để giả lập hàng đợi (Queue) thực tế
        private static readonly Channel<(string Event, object Data)> _queue = Channel.CreateUnbounded<(string, object)>();

        public MockRabbitMQBus(ILogger<MockRabbitMQBus> logger)
        {
            _logger = logger;
        }

        public async Task PublishAsync<T>(string eventName, T message)
        {
            var payload = JsonSerializer.Serialize(message);
            _logger.LogWarning($"[RABBIT-MQ BUS] PUSH: [{eventName}] -> {payload}");

            // Đẩy vào hàng đợi ngầm
            await _queue.Writer.WriteAsync((eventName, message!));
        }

        // Phương thức cho các Background Worker (Consumers) sử dụng để hóng tin nhắn
        public IAsyncEnumerable<(string Event, object Data)> ReceiveMessagesAsync(System.Threading.CancellationToken ct)
        {
            return _queue.Reader.ReadAllAsync(ct);
        }
    }
}
