import React, { useState } from 'react';
import {
  Box, Title, Text, Stack, Group, Paper, Button,
  TextInput, Avatar, Badge, ActionIcon, Grid, Tabs
} from '@mantine/core';
import { LuSearch, LuUsers, LuSend, LuBookOpen, LuSparkles, LuLogOut } from 'react-icons/lu';
import { motion } from 'framer-motion';

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
            <Tabs.List>
              <Tabs.Tab value="find" leftSection={<LuSearch size={16} />}>Tìm bạn bè</Tabs.Tab>
              <Tabs.Tab value="requests" leftSection={<LuUsers size={16} />}>
                Lời mời kết bạn
                {friendRequests.length > 0 && (
                  <Badge size="xs" color="red" variant="filled" ml={6}>{friendRequests.length}</Badge>
                )}
              </Tabs.Tab>
              <Tabs.Tab value="my-friends" leftSection={<LuUsers size={16} />}>Bạn bè của tôi</Tabs.Tab>
            </Tabs.List>

            <Box mt="lg">
              {activeTab === 'find' && (
                <Stack gap="lg">
                  <TextInput
                    placeholder="Tìm kiếm theo tên, kỹ năng hoặc khóa học..."
                    size="md" radius="xl"
                    leftSection={<LuSearch size={18} />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  
                  <Text fw={700} mt="md">Gợi ý kết bạn</Text>
                  <Grid>
                    {suggestedFriends.map(user => (
                      <Grid.Col span={{ base: 12, sm: 6 }} key={user.id}>
                        <Paper p="md" radius="lg" withBorder className="hover:border-brand-300 transition-colors">
                          <Group wrap="nowrap">
                            <Avatar size="lg" radius="xl" color="brand">{user.name.charAt(0)}</Avatar>
                            <Box style={{ flex: 1 }}>
                              <Text fw={700}>{user.name}</Text>
                              <Badge size="xs" variant="light" color={user.role === 'Premium Learner' ? 'brand' : 'gray'}>
                                {user.role}
                              </Badge>
                              <Group gap="xs" mt={6}>
                                <LuBookOpen size={14} className="text-slate-400" />
                                <Text size="xs" c="dimmed">{user.sharedInterest}</Text>
                              </Group>
                            </Box>
                            <ActionIcon variant="light" color="brand" radius="xl" size="lg">
                              <LuUsers size={20} />
                            </ActionIcon>
                          </Group>
                        </Paper>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stack>
              )}

              {activeTab === 'requests' && (
                <Stack gap="md">
                  {friendRequests.length === 0 ? (
                    <Text ta="center" c="dimmed" py="xl">Không có lời mời kết bạn nào.</Text>
                  ) : (
                    friendRequests.map(req => (
                      <Paper p="md" radius="lg" withBorder key={req.id}>
                        <Group justify="space-between">
                          <Group>
                            <Avatar size="md" radius="xl" color="indigo">{req.name.charAt(0)}</Avatar>
                            <Box>
                              <Text fw={700}>{req.name}</Text>
                              <Text size="xs" c="dimmed">{req.message}</Text>
                            </Box>
                          </Group>
                          <Group>
                            <Button variant="light" color="teal" size="sm" radius="xl" leftSection={<LuSparkles size={16} />}>
                              Đồng ý
                            </Button>
                            <ActionIcon variant="light" color="red" size="lg" radius="xl">
                              <LuLogOut size={18} />
                            </ActionIcon>
                          </Group>
                        </Group>
                      </Paper>
                    ))
                  )}
                </Stack>
              )}

              {activeTab === 'my-friends' && (
                <Stack gap="md">
                  <Grid>
                    {myFriends.map(friend => (
                      <Grid.Col span={{ base: 12, sm: 6 }} key={friend.id}>
                        <Paper p="md" radius="lg" withBorder>
                          <Group justify="space-between">
                            <Group>
                              <Avatar size="md" radius="xl" color="teal">
                                {friend.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Group gap="xs">
                                  <Text fw={700}>{friend.name}</Text>
                                  {friend.isOnline && <Badge size="xs" color="green" variant="filled">Online</Badge>}
                                </Group>
                                <Text size="xs" c="dimmed">{friend.mutualCourses} khóa học chung</Text>
                              </Box>
                            </Group>
                            <ActionIcon variant="light" color="blue" radius="xl" size="lg">
                              <LuSend size={18} />
                            </ActionIcon>
                          </Group>
                        </Paper>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stack>
              )}
            </Box>
          </Tabs>
        </Paper>
      </Stack>
    </Box>
  );
};
