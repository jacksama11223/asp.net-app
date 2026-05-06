using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace SmartLMS.Business.MessageBus
{
    public class RabbitMQBus : IMessageBus
    {
        private readonly string _hostname;
        private readonly string _username;
        private readonly string _password;
        private readonly ILogger<RabbitMQBus> _logger;
        private IConnection? _connection;

        public RabbitMQBus(IConfiguration configuration, ILogger<RabbitMQBus> logger)
        {
            _logger = logger;
            _hostname = configuration["RabbitMQ:HostName"] ?? "localhost";
            _username = configuration["RabbitMQ:UserName"] ?? "guest";
            _password = configuration["RabbitMQ:Password"] ?? "guest";
            
            InitializeConnection();
        }

        private void InitializeConnection()
        {
            try
            {
                var factory = new ConnectionFactory
                {
                    HostName = _hostname,
                    UserName = _username,
                    Password = _password,
                    DispatchConsumersAsync = true
                };

                _connection = factory.CreateConnection();
                _logger.LogInformation($"[RabbitMQ] Kết nối thành công tới {_hostname}");
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, $"[RabbitMQ] Không thể kết nối tới {_hostname}. Vui lòng kiểm tra Docker Container.");
            }
        }

        public async Task PublishAsync<T>(string eventName, T message)
        {
            if (_connection == null || !_connection.IsOpen)
            {
                _logger.LogWarning("[RabbitMQ] Kết nối chưa sẵn sàng, đang thử khởi tạo lại...");
                InitializeConnection();
                if (_connection == null) return;
            }

            try
            {
                using var channel = _connection.CreateModel();
                
                // Khai báo Exchange (Topic based cho mở rộng sau này)
                channel.ExchangeDeclare(exchange: "smartlms_events", type: ExchangeType.Topic);

                var json = JsonSerializer.Serialize(message);
                var body = Encoding.UTF8.GetBytes(json);

                var properties = channel.CreateBasicProperties();
                properties.Persistent = true;

                channel.BasicPublish(
                    exchange: "smartlms_events",
                    routingKey: eventName,
                    basicProperties: properties,
                    body: body);

                _logger.LogInformation($"[RabbitMQ] Đã đẩy sự kiện '{eventName}' vào hàng đợi.");
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "[RabbitMQ] Lỗi khi đang Publish tin nhắn.");
            }

            await Task.CompletedTask;
        }
    }
}
