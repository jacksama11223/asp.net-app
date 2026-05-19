import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Title, Text, Button, Group, Stack, Badge, 
  Box, ThemeIcon, Loader, Image
} from '@mantine/core';
import { LuArrowLeft, LuDownload, LuShare2, LuAward, LuCircleCheck, LuFileText } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { BASE_URL } from '../api';

export const CertificateView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    // Giả lập/Fetch thông tin chứng chỉ
    setTimeout(() => {
      setCert({
        credentialId: `CERT-SLMS-${courseId || '101'}-9481`,
        studentName: JSON.parse(localStorage.getItem('slms_user') || '{}').fullName || 'Học viên SmartLMS',
        courseName: courseId === '2' ? 'C# Advanced Programming with Roslyn Sandbox' : 'Lập trình ASP.NET Core MVC & Web API Enterprise',
        issueDate: '18/05/2026',
        instructor: 'Lâm Minh Huy (SmartLMS Chief Academic)',
        hash: '0x7a8e23f06912384a5cd7820129bcfe846182103f'
      });
      setLoading(false);
    }, 600);
  }, [courseId]);

  const generatePDF = () => {
    const element = document.getElementById('certificate-print-area');
    if (!element) return;
    
    const { jsPDF } = window.jspdf;
    
    window.html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`SmartLMS_Certificate_${cert.credentialId}.pdf`);
      toast.success("Chứng chỉ số đã được tải xuống máy của bạn!");
    }).catch(err => {
      toast.error("Lỗi khi kết xuất PDF: " + err.message);
    });
  };

  const handleDownload = () => {
    if (window.html2canvas && window.jspdf) {
       generatePDF();
       return;
    }

    toast.info("Đang tải thư viện đóng gói PDF từ máy chủ CDN...");

    const scriptHtml2Canvas = document.createElement('script');
    scriptHtml2Canvas.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    
    scriptHtml2Canvas.onload = () => {
      const scriptJsPDF = document.createElement('script');
      scriptJsPDF.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      scriptJsPDF.onload = () => {
        toast.success("Tải thư viện PDF thành công!");
        generatePDF();
      };
      scriptJsPDF.onerror = () => {
        toast.error("Không thể kết nối mạng để tải jspdf. Kích hoạt chế độ in làm dự phòng!");
        window.print();
      };
      document.body.appendChild(scriptJsPDF);
    };
    
    scriptHtml2Canvas.onerror = () => {
      toast.error("Mạng offline. Kích hoạt chế độ in của trình duyệt làm dự phòng!");
      window.print();
    };
    
    document.body.appendChild(scriptHtml2Canvas);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://141.253.114.218/verify/${cert.credentialId}`);
    toast.success("Đã sao chép liên kết chứng chỉ số! Bạn có thể nhúng trực tiếp vào hồ sơ LinkedIn của mình.");
  };

  if (loading) {
    return (
      <Stack align="center" justify="center" py={120}>
        <Loader size="xl" color="brand" type="bars" />
        <Text c="dimmed" fw={600}>Hệ thống AI đang xác nhận dữ liệu hoàn thành khóa học để cấp chứng chỉ...</Text>
      </Stack>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Button 
        variant="subtle" 
        color="gray" 
        leftSection={<LuArrowLeft size={16} />} 
        onClick={() => navigate(-1)}
        mb="lg"
      >
        Quay lại Góc học tập
      </Button>

      <Stack gap="xl" align="center">
        {/* Certificate Rendering Area (Stunning Premium Certificate style) */}
        <Paper 
          id="certificate-print-area"
          radius="lg" 
          p={50} 
          style={{
            width: '100%',
            maxWidth: '850px',
            border: '20px solid #0f172a',
            background: '#fafaf9',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            position: 'relative',
            fontFamily: 'serif'
          }}
          className="text-center"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-slate-300 pointer-events-none" />
          
          <Stack gap="lg" align="center">
            <ThemeIcon color="brand" variant="light" size={60} radius="100%" className="mx-auto">
              <LuAward size={36} className="text-brand-600" />
            </ThemeIcon>

            <Title order={1} style={{ fontSize: '32px', color: '#0f172a', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }} fw={900}>
              Chứng chỉ Hoàn thành
            </Title>
            <Text size="sm" c="dimmed" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontStyle: 'italic' }}>
              SmartLMS.AI Credentials System
            </Text>

            <Text size="lg" c="slate.7" mt="xl" style={{ fontSize: '18px', fontStyle: 'italic' }}>
              Chứng nhận danh dự dành cho học viên
            </Text>

            <Text style={{ fontSize: '28px', color: '#1e293b', borderBottom: '2px solid #e2e8f0', width: 'fit-content', paddingBottom: '8px' }} fw={800} className="mx-auto">
              {cert.studentName}
            </Text>

            <Text size="md" c="slate.7" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '16px', lineHeight: 1.6 }}>
              Đã xuất sắc hoàn thành khóa học chuyên môn cao môn học:
            </Text>

            <Text style={{ fontSize: '24px', color: '#0f172a' }} fw={900}>
              "{cert.courseName}"
            </Text>

            <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
              được cấp ngày {cert.issueDate} dưới sự bảo chứng trực tiếp từ giảng viên
            </Text>

            <Text style={{ fontSize: '16px', color: '#334155' }} fw={700}>
              {cert.instructor}
            </Text>

            {/* Credential Details */}
            <Group justify="space-between" w="100%" mt={40} style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <Box ta="left">
                <Text size="11px" c="dimmed">MÃ CHỨNG CHỈ (CREDENTIAL ID)</Text>
                <Text size="xs" fw={700} c="slate.8">{cert.credentialId}</Text>
              </Box>
              <Group gap="xs" align="center">
                <LuCircleCheck size={16} className="text-emerald-500" />
                <Text size="xs" c="green" fw={700}>ĐÃ XÁC MINH TRÊN BACKEND</Text>
              </Group>
              <Box ta="right">
                <Text size="11px" c="dimmed">CHỮ KÝ MÃ HÓA (CRYPTOGRAPHIC HASH)</Text>
                <Text size="10px" fw={500} c="dimmed" style={{ fontFamily: 'monospace' }}>{cert.hash.substring(0, 16)}...</Text>
              </Box>
            </Group>
          </Stack>
        </Paper>

        {/* Action buttons */}
        <Group gap="md" mt="xl">
          <Button 
            variant="gradient" 
            gradient={{ from: 'brand', to: 'indigo' }} 
            radius="md" 
            size="md"
            leftSection={<LuDownload size={18} />} 
            onClick={handleDownload}
            className="shadow-lg shadow-brand-500/20"
          >
            Tải Xuống PDF Bản Cứng
          </Button>
          <Button 
            variant="light" 
            color="brand" 
            radius="md" 
            size="md"
            leftSection={<LuShare2 size={18} />} 
            onClick={handleShare}
          >
            Chia Sẻ Chứng Chỉ (Share Link)
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};
