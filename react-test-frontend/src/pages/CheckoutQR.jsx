import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack,
  Loader,
  Alert,
  CopyButton,
  ActionIcon,
  Badge,
  Card,
  Divider
} from '@mantine/core';
import { 
  LuSparkles, 
  LuExternalLink, 
  LuZap,
  LuZap,
  LuZap
} from 'react-icons/lu';
import { QRCodeSVG } from 'qrcode.react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, getPaymentConfig, checkoutCourse, checkPaymentStatus, triggerMockWebhook } from '../api';
import confetti from 'canvas-confetti';

export const CheckoutQR = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [loadingVNPay, setLoadingVNPay] = useState(false);
  
  // Initialize apiClient with token if available
  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        // Fetch bank config
        const bankConfig = await getPaymentConfig(apiClient);
        setConfig(bankConfig);
        
        // Generate Invoice
        const orderInfo = await checkoutCourse(apiClient, id);
        setInvoice(orderInfo);
      } catch (err) {
        setError('Không thể khởi tạo thanh toán. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    initializeCheckout();
  }, [id]);

  // Polling for status
  useEffect(() => {
    if (!invoice || isPaid) return;
    
    const interval = setInterval(async () => {
      try {
        const status = await checkPaymentStatus(apiClient, invoice.transactionReference);
        if (status.isPaid) {
          handleSuccess();
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 3000); // Check every 3 seconds
    
    return () => clearInterval(interval);
  }, [invoice, isPaid]);
  
  // Timer countdown
  useEffect(() => {
    if (isPaid || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPaid]);

  const handleSuccess = () => {
    setIsPaid(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#3b82f6', '#10b981']
    });
  };

  const handleMockPay = async () => {
    try {
      await triggerMockWebhook(apiClient, invoice.transactionReference);
      // The polling will pick up the change, or we can force it:
      handleSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const handleVNPay = async () => {
    setLoadingVNPay(true);
    try {
      const token = localStorage.getItem('slms_token');
      const response = await axios.post(`${BASE_URL}/api/payment/create-invoice`, 
        { courseId: parseInt(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (err) {
      console.error("VNPay initialization failed", err);
      setError("Không thể khởi tạo VNPay. Vui lòng thử lại.");
    } finally {
      setLoadingVNPay(false);
    }
  };

  if (loading) {
    return (
      <Stack align="center" py={100}>
        <Loader color="brand" size="xl" type="bars" />
        <Text fw={600} mt="md">Đang tạo mã QR thanh toán an toàn...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert icon={<LuZap size={16} />} title="Lỗi thanh toán" color="red" radius="md">
        {error}
      </Alert>
    );
  }

  // Handle PascalCase properties from C# backend
  const bankId = config.BankId || config.bankId;
  const accountNo = config.AccountNo || config.accountNo;
  const accountName = config.AccountName || config.accountName;
  const testAmount = config.TestAmount || config.testAmount;

  // Use VietQR API to generate a standard EMVCo QR code image that works with all banking apps
  const memo = invoice.transactionReference || invoice.TransactionReference;
  const qrImageUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${testAmount}&addInfo=${memo}&accountName=${encodeURIComponent(accountName)}`;

  const formatMoney = (amount) => {
    if (!amount) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <Stack align="center" py="xl">
      <Title order={2} className="text-slate-900">Thanh Toán Khóa Học</Title>
      
      {!isPaid ? (
        <Card shadow="xl" padding="xl" radius="xl" className="w-full max-w-md border border-slate-100">
          <Stack align="center">
            <Badge color="red" variant="light" size="lg" radius="sm">
              Đơn hàng hết hạn sau: {formatTime(timeLeft)}
            </Badge>

            <Text c="dimmed" size="sm" ta="center">
              Quét mã QR dưới đây bằng ứng dụng Ngân hàng để thanh toán tự động.
            </Text>

            <Paper p="md" radius="lg" className="bg-white border-2 border-brand-500 shadow-[0_0_20px_rgba(79,70,229,0.2)] flex justify-center items-center overflow-hidden">
              <img src={qrImageUrl} alt="VietQR" style={{ width: 250, height: 250, objectFit: 'contain' }} />
            </Paper>

            <Divider w="100%" label="Hoặc chuyển khoản thủ công" labelPosition="center" />

            <Stack gap="xs" w="100%">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Ngân hàng:</Text>
                <Text fw={700}>{bankId}</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Chủ tài khoản:</Text>
                <Text fw={700}>{accountName}</Text>
              </Group>
              <Group justify="space-between" align="center">
                <Text size="sm" c="dimmed">Số tài khoản:</Text>
                <Group gap="xs">
                  <Text fw={900} className="text-brand-600 text-lg">{accountNo}</Text>
                  <CopyButton value={accountNo} timeout={2000}>
                    {({ copied, copy }) => (
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy} variant="subtle">
                        {copied ? <LuSparkles size={16} /> : <LuExternalLink size={16} />}
                      </ActionIcon>
                    )}
                  </CopyButton>
                </Group>
              </Group>
              <Group justify="space-between" align="center">
                <Text size="sm" c="dimmed">Số tiền:</Text>
                <Text fw={900} className="text-red-500 text-xl">{formatMoney(testAmount)}</Text>
              </Group>
              <Group justify="space-between" align="center">
                <Text size="sm" c="dimmed">Nội dung (Bắt buộc):</Text>
                <Group gap="xs">
                  <Text fw={700} className="bg-yellow-100 px-2 py-1 rounded">{memo}</Text>
                  <CopyButton value={memo} timeout={2000}>
                    {({ copied, copy }) => (
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy} variant="subtle">
                        {copied ? <LuSparkles size={16} /> : <LuExternalLink size={16} />}
                      </ActionIcon>
                    )}
                  </CopyButton>
                </Group>
              </Group>
            </Stack>

            <Alert icon={<LuZap size={16} />} title="Cổng thanh toán VNPay" color="brand" variant="light" mt="md" w="100%">
              Thanh toán nhanh chóng qua thẻ ATM, Visa, Mastercard hoặc ứng dụng Ngân hàng.
              <Button 
                fullWidth 
                mt="sm" 
                color="brand" 
                onClick={handleVNPay} 
                leftSection={<LuZap size={16} />}
                loading={loadingVNPay}
              >
                Thanh toán qua VNPay
              </Button>
            </Alert>

            <Alert icon={<LuZap size={16} />} title="Giả lập thanh toán (Test)" color="blue" variant="light" mt="md" w="100%">
              Nhấn nút dưới đây để giả lập ngân hàng gửi Webhook báo đã nhận tiền.
              <Button fullWidth mt="sm" onClick={handleMockPay} leftSection={<LuZap size={16} />}>
                Giả lập Đã Chuyển Tiền
              </Button>
            </Alert>
          </Stack>
        </Card>
      ) : (
        <Card shadow="xl" padding="xl" radius="xl" className="w-full max-w-md text-center bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
          <Stack align="center" gap="lg">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <LuSparkles size={48} className="text-white" />
            </div>
            <Title order={3} className="text-green-800">Thanh Toán Thành Công!</Title>
            <Text c="dimmed">
              Khóa học đã được thêm vào tài khoản của bạn. Bạn có thể bắt đầu học ngay bây giờ.
            </Text>
            <Button size="lg" radius="xl" color="green" onClick={() => navigate('/my-learning')} className="w-full shadow-lg hover:shadow-xl transition-shadow">
              Vào Học Ngay
            </Button>
          </Stack>
        </Card>
      )}
    </Stack>
  );
};
