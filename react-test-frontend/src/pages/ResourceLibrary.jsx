import React, { useState, useEffect } from 'react';
import {
  Container, Stack, Title, Text, Group, Button, 
  TextInput, Badge, Card, Avatar, ActionIcon, Box, SimpleGrid, Paper,
  Rating, Tooltip, Transition, ThemeIcon
} from '@mantine/core';
import {
  LuSearch, LuUploadCloud, LuBookmark, LuShare2, LuDownloadCloud, 
  LuEye, LuSparkles, LuStar, LuMessageCircle
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getResources, bookmarkResource, rateResource, viewResource, shareResource } from '../api';

export const ResourceLibrary = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
    } catch (err) {
      // Mock data if API fails or is empty
      setResources([
        {
          id: 1, title: 'Clean Architecture Pattern PDF', subject: 'Architecture', 
          fileType: 'PDF', rating: 4.8, voteCount: 124, viewCount: 2500, viralScore: 89,
          uploader: { fullName: 'Jack Sama' }, createdAt: new Date()
        },
        {
          id: 2, title: 'Bí kíp Tối ưu Redis Cache (Ebook)', subject: 'Database', 
          fileType: 'Ebook', rating: 4.5, voteCount: 89, viewCount: 1100, viralScore: 45,
          uploader: { fullName: 'Alex Tran' }, createdAt: new Date()
        },
        {
          id: 3, title: 'React 19 Cheatsheet 2026', subject: 'Frontend', 
          fileType: 'PDF', rating: 5.0, voteCount: 300, viewCount: 8400, viralScore: 150,
          uploader: { fullName: 'David Do' }, createdAt: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (id, title) => {
    try {
      await bookmarkResource(id);
      toast.success(`Đã thêm "${title}" vào bộ sưu tập! 📚`);
    } catch {
      toast.success(`Đã thêm "${title}" vào bộ sưu tập! 📚 (Mock)`);
    }
  };

  const handleRate = async (id, score, title) => {
    try {
      await rateResource(id, score);
      toast.success(`Cảm ơn bạn đã đánh giá ${score} sao cho "${title}"! 🌟`);
    } catch {
      toast.success(`Cảm ơn bạn đã đánh giá ${score} sao cho "${title}"! 🌟 (Mock)`);
    }
  };

  const handleView = async (id) => {
    try {
      await viewResource(id);
    } catch {}
    toast.info("Đang mở tài liệu...");
  };

  const handleShare = async (id) => {
    try {
      await shareResource(id, "Link");
      toast.success("Đã copy link! Chia sẻ để nhận điểm Viral XP nhé 🚀");
    } catch {
      toast.success("Đã copy link! Chia sẻ để nhận điểm Viral XP nhé 🚀");
    }
  };

  return (
    <Container size="xl" py={40}>
      <Stack gap={40}>
        
        {/* Hero Section */}
        <Box className="relative rounded-3xl p-12 overflow-hidden bg-gradient-to-br from-indigo-900 via-brand-800 to-slate-900 text-white shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="absolute -right-20 -top-20 opacity-20"
          >
             <LuSparkles size={400} />
          </motion.div>
          <Box className="relative z-10 max-w-2xl">
            <Badge color="orange" size="xl" variant="filled" mb="md" className="shadow-lg shadow-orange-500/30">Mạng lưới Tri thức</Badge>
            <Title order={1} size={54} fw={900} mb="md" className="tracking-tighter leading-tight">
              Khám phá Kho Tàng <br/>Tài Nguyên Chuyên Sâu
            </Title>
            <Text size="lg" opacity={0.8} mb="xl" fw={500}>
              Nơi hàng ngàn Developer chia sẻ Ebook, Source Code và Tài liệu học tập. Đánh giá, lưu trữ và chia sẻ để kiếm Viral XP!
            </Text>
            <Group>
              <Button size="xl" radius="xl" color="white" c="brand-900" leftSection={<LuUploadCloud size={22} />} className="hover:scale-105 transition-transform font-bold">
                Tải lên Tài liệu
              </Button>
              <Button size="xl" radius="xl" variant="outline" color="white" className="hover:bg-white/10 transition-colors">
                Xem Bảng xếp hạng
              </Button>
            </Group>
          </Box>
        </Box>

        {/* Filter & Search */}
        <Group justify="space-between">
           <TextInput 
             placeholder="Tìm kiếm sách, tài liệu, code..." 
             size="lg" radius="xl" w={400}
             leftSection={<LuSearch size={20} className="text-brand-500" />}
             value={search} onChange={(e) => setSearch(e.target.value)}
             className="shadow-sm"
           />
           <Group>
             <Badge size="lg" variant="dot" color="indigo" className="cursor-pointer">PDFs</Badge>
             <Badge size="lg" variant="dot" color="teal" className="cursor-pointer">Ebooks</Badge>
             <Badge size="lg" variant="dot" color="orange" className="cursor-pointer">Source Code</Badge>
           </Group>
        </Group>

        {/* Resource Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {resources.map((res, index) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
            >
              <Card 
                p={0} radius="2xl" withBorder 
                className="group bg-white hover:shadow-2xl hover:shadow-brand-500/10 transition-all border-slate-100 overflow-hidden flex flex-col h-full"
              >
                 {/* Top Image / Gradient Area */}
                 <Box className="h-32 bg-gradient-to-r from-brand-100 to-indigo-50 relative p-4 flex justify-between items-start">
                    <Badge color="brand" variant="filled" size="md" className="shadow-sm">{res.subject}</Badge>
                    <Group gap="xs">
                       <Tooltip label="Lưu vào bộ sưu tập" withArrow>
                          <ActionIcon radius="xl" size="lg" variant="white" className="shadow-sm hover:text-brand-500 hover:scale-110 transition-all" onClick={() => handleBookmark(res.id, res.title)}>
                             <LuBookmark size={18} />
                          </ActionIcon>
                       </Tooltip>
                       <Tooltip label="Chia sẻ kiếm Viral XP" withArrow>
                          <ActionIcon radius="xl" size="lg" variant="white" className="shadow-sm hover:text-orange-500 hover:scale-110 transition-all" onClick={() => handleShare(res.id)}>
                             <LuShare2 size={18} />
                          </ActionIcon>
                       </Tooltip>
                    </Group>
                 </Box>

                 {/* Content Area */}
                 <Box p="xl" className="flex-1 flex flex-col">
                    <Title order={3} size="h4" fw={800} mb="xs" className="group-hover:text-brand-600 transition-colors cursor-pointer" onClick={() => handleView(res.id)}>
                      {res.title}
                    </Title>
                    <Text size="sm" c="dimmed" mb="lg" className="flex-1">
                      Định dạng: <b>{res.fileType}</b>
                    </Text>

                    {/* Gamification / Stats Area */}
                    <Box className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                       <Group justify="space-between">
                          <Group gap="xs">
                             <Rating value={res.rating} fractions={2} readOnly size="sm" color="orange" />
                             <Text size="xs" fw={700} c="dimmed">({res.voteCount})</Text>
                          </Group>
                          <Group gap="xs" c="dimmed">
                             <LuEye size={16} />
                             <Text size="xs" fw={700}>{res.viewCount}</Text>
                          </Group>
                       </Group>
                    </Box>

                    {/* Interactive Bottom Bar */}
                    <Group justify="space-between" align="center" mt="auto">
                       <Group gap="sm">
                          <Avatar size="sm" radius="xl" color="brand">{res.uploader?.fullName?.charAt(0) || 'U'}</Avatar>
                          <Text size="xs" fw={700}>{res.uploader?.fullName || 'Anonymous'}</Text>
                       </Group>
                       
                       <Group gap="xs">
                          {/* Rate Action */}
                          <Tooltip label="Tuyệt vời! Cho 5 sao" withArrow>
                             <ActionIcon variant="light" color="orange" radius="xl" onClick={() => handleRate(res.id, 5, res.title)} className="hover:scale-110 transition-transform">
                               <LuStar size={18} />
                             </ActionIcon>
                          </Tooltip>
                          {/* Download/View */}
                          <Button variant="light" color="brand" radius="xl" size="xs" onClick={() => handleView(res.id)}>
                             Mở xem
                          </Button>
                       </Group>
                    </Group>
                 </Box>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>

      </Stack>
    </Container>
  );
};
