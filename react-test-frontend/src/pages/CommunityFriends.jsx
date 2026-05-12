import React, { useState } from 'react';
import {
  Box, Title, Text, Stack, Group, Paper, Button,
  TextInput, Avatar, Badge, ActionIcon, Grid, Tabs
} from '@mantine/core';
import { LuSearch, LuUsers, LuSend, LuBookOpen, LuSparkles, LuLogOut } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

export const CommunityFriends = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [search, setSearch] = useState('');

  // Mock data for Sprint 2
  const myFriends = [
    { id: 1, name: 'Nguyễn Văn A', role: 'Premium Learner', mutualCourses: 2, isOnline: true },
    { id: 2, name: 'Trần Thị B', role: 'Learner', mutualCourses: 1, isOnline: false }
  ];

  const friendRequests = [
    { id: 3, name: 'Lê Văn C', role: 'Premium Learner', message: 'Xin chào, mình cùng học khóa React nhé!' }
  ];

  const suggestedFriends = [
    { id: 4, name: 'Hoàng Minh D', role: 'Learner', sharedInterest: 'Cùng quan tâm ASP.NET Core' },
    { id: 5, name: 'Phạm Thị E', role: 'Premium Learner', sharedInterest: 'Đang học khóa DevOps' }
  ];

  return (
    <Box maw={1000} mx="auto" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} fw={900} className="tracking-tight text-3xl text-slate-900">
              Bạn bè & Kết nối
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Tìm kiếm bạn đồng hành, trao đổi kiến thức và cùng nhau tiến bộ.
            </Text>
          </Box>
        </Group>

        <Paper radius="xl" p="md" withBorder className="glass bg-white">
          <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="xl">
            <Tabs.List grow>
              <Tabs.Tab value="find" leftSection={<LuSearch size={18} />}>Khám phá cộng đồng</Tabs.Tab>
              <Tabs.Tab value="requests" leftSection={<LuUsers size={18} />}>
                Lời mời ({friendRequests.length})
              </Tabs.Tab>
              <Tabs.Tab value="my-friends" leftSection={<LuSparkles size={18} />}>Bạn bè của tôi</Tabs.Tab>
            </Tabs.List>

            <Box mt="xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'find' && (
                    <Stack gap="xl">
                      <TextInput
                        placeholder="Tìm theo tên, sở thích hoặc khóa học..."
                        size="lg" radius="2rem"
                        leftSection={<LuSearch size={22} className="text-brand-500" />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="shadow-sm"
                      />
                      
                      <Text fw={800} size="xl" className="tracking-tight">Gợi ý cho bạn</Text>
                      <Grid>
                        {suggestedFriends.map(user => (
                          <Grid.Col span={{ base: 12, sm: 6 }} key={user.id}>
                            <Paper p="xl" radius="2rem" withBorder className="hover:shadow-xl transition-all border-slate-100 group">
                              <Stack align="center" ta="center">
                                <Avatar 
                                  size={80} radius="xl" color="brand" 
                                  className="cursor-pointer hover:scale-105 transition-transform"
                                  onClick={() => navigate(`/profile/${user.id}`)}
                                >
                                  {user.name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Text fw={800} size="lg">{user.name}</Text>
                                  <Badge size="sm" variant="light" color="brand">{user.role}</Badge>
                                </Box>
                                <Text size="xs" c="dimmed">{user.sharedInterest}</Text>
                                <Group grow w="100%" mt="md">
                                  <Button variant="light" radius="xl" color="gray" onClick={() => navigate(`/profile/${user.id}`)}>Hồ sơ</Button>
                                  <Button radius="xl" color="brand" leftSection={<LuUsers size={16} />}>Kết bạn</Button>
                                </Group>
                              </Stack>
                            </Paper>
                          </Grid.Col>
                        ))}
                      </Grid>
                    </Stack>
                  )}

                  {activeTab === 'requests' && (
                    <Stack gap="md">
                      {friendRequests.length === 0 ? (
                        <Paper p={100} radius="2rem" withBorder ta="center" className="bg-slate-50 border-dashed">
                           <LuUsers size={48} className="text-slate-200 mx-auto mb-4" />
                           <Text c="dimmed">Không có lời mời nào mới.</Text>
                        </Paper>
                      ) : (
                        friendRequests.map(req => (
                          <Paper p="xl" radius="2rem" withBorder key={req.id} className="bg-white hover:shadow-md transition-shadow">
                            <Group justify="space-between">
                              <Group>
                                <Avatar size="lg" radius="xl" color="indigo" className="cursor-pointer" onClick={() => navigate(`/profile/${req.id}`)}>
                                  {req.name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Text fw={800} size="lg">{req.name}</Text>
                                  <Text size="sm" c="dimmed" italic>"{req.message}"</Text>
                                </Box>
                              </Group>
                              <Group>
                                <Button variant="light" color="teal" size="md" radius="xl">Chấp nhận</Button>
                                <ActionIcon variant="subtle" color="red" size="xl" radius="xl"><LuLogOut size={20} /></ActionIcon>
                              </Group>
                            </Group>
                          </Paper>
                        ))
                      )}
                    </Stack>
                  )}

                  {activeTab === 'my-friends' && (
                    <Grid>
                      {myFriends.map(friend => (
                        <Grid.Col span={{ base: 12, sm: 4 }} key={friend.id}>
                          <Paper p="xl" radius="2rem" withBorder className="text-center group hover:bg-slate-50 transition-colors">
                            <Box className="relative inline-block mx-auto mb-md">
                               <Avatar size={70} radius="xl" color="teal" className="cursor-pointer" onClick={() => navigate(`/profile/${friend.id}`)}>
                                 {friend.name.charAt(0)}
                               </Avatar>
                               {friend.isOnline && (
                                 <Box className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                               )}
                            </Box>
                            <Text fw={800}>{friend.name}</Text>
                            <Text size="xs" c="dimmed" mb="md">{friend.mutualCourses} khóa học chung</Text>
                            <Group grow>
                               <Button variant="subtle" color="brand" radius="xl" size="xs" onClick={() => navigate(`/profile/${friend.id}`)}>Hồ sơ</Button>
                               <Button variant="light" color="indigo" radius="xl" size="xs" leftSection={<LuSend size={14} />}>Chat</Button>
                            </Group>
                          </Paper>
                        </Grid.Col>
                      ))}
                    </Grid>
                  )}
                </motion.div>
              </AnimatePresence>
            </Box>
          </Tabs>
        </Paper>
      </Stack>
    </Box>
  );
};
