using System.Threading.Tasks;

namespace SmartLMS.Business.MessageBus
{
    public interface IMessageBus
    {
        /// <summary>
        /// Phát tín hiệu Sự kiện (Event) vào Hàng đợi (RabbitMQ/Kafka).
        /// Microservices khác sẽ tự động Subscribe kênh này để xử lý.
        /// </summary>
        Task PublishAsync<T>(string eventName, T message);
    }
}
