import React, { useState } from 'react';
import { 
  Box, Title, Text, Stack, Group, Paper, Avatar, TextInput, ActionIcon, ScrollArea, Divider, Badge
} from '@mantine/core';
import { LuSearch, LuSend, LuMoreVertical, LuCheckCheck } from 'react-icons/lu';
import { motion } from 'framer-motion';

export const MessageCenter = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const contacts = [
    { id: 1, name: 'Nguyễn Văn A', course: 'ASP.NET Core 8', lastMsg: 'Thầy ơi cho em hỏi...', unread: 2, time: '10:30 AM' },
    { id: 2, name: 'Trần Thị B', course: 'React Masterclass', lastMsg: 'Em đã nộp bài tập.', unread: 0, time: 'Hôm qua' },
    { id: 3, name: 'Lê Hoàng C', course: 'ASP.NET Core 8', lastMsg: 'Cảm ơn thầy ạ.', unread: 0, time: 'T2' },
  ];

  const chatHistory = [
    { id: 1, senderId: 1, text: 'Chào thầy, em gặp lỗi khi chạy Docker ạ.', time: '10:25 AM' },
    { id: 2, senderId: 0, text: 'Chào em, em gửi ảnh chụp màn hình lỗi lên đây nhé.', time: '10:28 AM' },
    { id: 3, senderId: 1, text: 'Dạ đây ạ: Error: Cannot connect to daemon...', time: '10:30 AM' },
  ];

  return (
    <Stack gap="xl" h="calc(100vh - 120px)">
      <Box>
        <Title order={1} fw={900} className="tracking-tighter text-3xl text-slate-900">
          Trung tâm Tin nhắn
        </Title>
        <Text c="dimmed" size="sm" mt={4}>Giải đáp thắc mắc và hỗ trợ học viên.</Text>
      </Box>

      <Paper className="glass flex flex-1 overflow-hidden" radius="xl" withBorder>
        {/* Left Sidebar - Contacts */}
        <Box w={320} className="border-r border-slate-200 bg-white/50 flex flex-col">
          <Box p="md" className="border-b border-slate-200">
            <TextInput 
              placeholder="Tìm kiếm học viên..." 
              leftSection={<LuSearch size={16} />}
              variant="filled"
              radius="md"
            />
          </Box>
          <ScrollArea className="flex-1">
            <Stack gap={0}>
              {contacts.map((contact) => (
                <Box 
                  key={contact.id} 
                  p="md" 
                  className={`cursor-pointer transition-colors border-b border-slate-100 ${
                    activeChat === contact.id ? 'bg-brand-50 border-l-4 border-l-brand-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                  }`}
                  onClick={() => setActiveChat(contact.id)}
                >
                  <Group wrap="nowrap">
                    <Avatar color="brand" radius="xl">{contact.name.charAt(0)}</Avatar>
                    <Box className="flex-1 min-w-0">
                      <Group justify="space-between" wrap="nowrap">
                        <Text size="sm" fw={600} truncate>{contact.name}</Text>
                        <Text size="xs" c="dimmed">{contact.time}</Text>
                      </Group>
                      <Text size="xs" c="indigo.6" mb={2} truncate>{contact.course}</Text>
                      <Group justify="space-between" wrap="nowrap">
                        <Text size="xs" c="dimmed" truncate className="flex-1">{contact.lastMsg}</Text>
                        {contact.unread > 0 && (
                          <Badge color="red" variant="filled" size="sm" circle>{contact.unread}</Badge>
                        )}
                      </Group>
                    </Box>
                  </Group>
                </Box>
              ))}
            </Stack>
          </ScrollArea>
        </Box>

        {/* Right Area - Chat View */}
        <Box className="flex-1 flex flex-col bg-white/80">
          {/* Chat Header */}
          <Group justify="space-between" p="md" className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <Group>
              <Avatar color="brand" radius="xl">N</Avatar>
              <Box>
                <Text fw={700}>Nguyễn Văn A</Text>
                <Text size="xs" c="dimmed">Đang học: Lập trình Web với ASP.NET Core 8</Text>
              </Box>
            </Group>
            <ActionIcon variant="subtle" color="gray">
              <LuMoreVertical size={20} />
            </ActionIcon>
          </Group>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-xl">
            <Stack gap="lg">
              {chatHistory.map((msg) => {
                const isMe = msg.senderId === 0;
                return (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <Box className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <Group gap="xs" mb={4} justify={isMe ? 'flex-end' : 'flex-start'} w="100%">
                        <Text size="xs" c="dimmed">{msg.time}</Text>
                      </Group>
                      <Box 
                        className={`p-3 rounded-2xl ${
                          isMe 
                            ? 'bg-brand-500 text-white rounded-tr-sm' 
                            : 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200'
                        }`}
                      >
                        <Text size="sm">{msg.text}</Text>
                      </Box>
                      {isMe && <LuCheckCheck size={14} className="text-brand-300 self-end mt-1" />}
                    </Box>
                  </motion.div>
                );
              })}
            </Stack>
          </ScrollArea>

          {/* Chat Input */}
          <Box p="md" className="border-t border-slate-200 bg-white/90 backdrop-blur">
            <Group wrap="nowrap">
              <TextInput 
                placeholder="Nhập tin nhắn..." 
                className="flex-1"
                radius="xl"
                size="md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setMessage('')}
              />
              <ActionIcon 
                variant="filled" 
                color="brand" 
                size="xl" 
                radius="xl"
                onClick={() => setMessage('')}
                className="shadow-md shadow-brand-500/20"
              >
                <LuSend size={18} />
              </ActionIcon>
            </Group>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
};
