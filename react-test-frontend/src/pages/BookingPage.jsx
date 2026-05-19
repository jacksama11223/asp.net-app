import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Title, Text, SimpleGrid, Card, Avatar, 
  Button, Group, Stack, Badge, Modal, ActionIcon, Box
} from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { LuClock, LuUsers, LuPlay } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, getTutors, createBooking, getStudentBookings } from '../api';

export const BookingPage = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');

  const token = localStorage.getItem('slms_token');
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tutorsData, bookingsData] = await Promise.all([
        getTutors(apiClient, new Date().toISOString()),
        getStudentBookings(apiClient)
      ]);
      setTutors(tutorsData);
      setMyBookings(bookingsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
      // Logic gộp ngày và giờ
      const startDateTime = new Date(date);
      const [hours, minutes] = startTime.split(':');
      startDateTime.setHours(parseInt(hours), parseInt(minutes));

      await createBooking(apiClient, {
        tutorId: selectedTutor.userId,
        startTime: startDateTime.toISOString(),
        durationMinutes: 60
      });
      
      setBookingModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi đặt lịch");
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box>
          <Title order={1} fw={900}>Tutor Scheduling</Title>
          <Text c="dimmed">Book 1-on-1 sessions with our expert instructors</Text>
        </Box>

        <Title order={3}>Available Tutors</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} gap="lg">
          {tutors.map((tutor) => (
            <Card key={tutor.userId} shadow="sm" padding="lg" radius="md" withBorder>
              <Group wrap="nowrap">
                <Avatar 
                  size="lg" 
                  radius="xl" 
                  color="brand" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/tutor-profile/${tutor.userId}`)}
                >
                  {tutor.fullName?.charAt(0)}
                </Avatar>
                <div>
                  <Text 
                    fw={700} 
                    style={{ cursor: 'pointer' }} 
                    className="hover:text-brand-600 transition-colors"
                    onClick={() => navigate(`/tutor-profile/${tutor.userId}`)}
                  >
                    {tutor.fullName}
                  </Text>
                  <Text size="xs" c="dimmed">{tutor.email}</Text>
                  <Badge size="xs" color="blue" mt={4}>Expert</Badge>
                </div>
              </Group>
              <Button 
                fullWidth 
                mt="md" 
                variant="light" 
                onClick={() => {
                  setSelectedTutor(tutor);
                  setBookingModalOpen(true);
                }}
              >
                Schedule Meeting
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        <Title order={3} mt="xl">My Scheduled Sessions</Title>
        <Stack>
          {myBookings.map((b) => (
            <Paper key={b.bookingId} p="md" radius="md" withBorder>
              <Group justify="space-between">
                <Group>
                  <ActionIcon 
                    size="xl" 
                    radius="md" 
                    variant="light" 
                    color="brand"
                    onClick={() => navigate(`/tutor-profile/${b.tutorId || b.tutor?.userId || 1}`)}
                  >
                    <LuPlay size={20} />
                  </ActionIcon>
                  <div>
                    <Text fw={700}>Meeting with {b.tutor?.fullName || 'Tutor'}</Text>
                    <Group gap="xs">
                      <LuClock size={14} className="text-slate-400" />
                      <Text size="xs" c="dimmed">{new Date(b.startTime).toLocaleString()}</Text>
                    </Group>
                  </div>
                </Group>
                <Badge color={b.status === 'Confirmed' ? 'green' : 'orange'}>{b.status}</Badge>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Stack>

      <Modal opened={bookingModalOpen} onClose={() => setBookingModalOpen(false)} title="Schedule Session" centered>
        <Stack>
          <DatePickerInput
            label="Pick a date"
            placeholder="Pick date"
            value={date}
            onChange={setDate}
            leftSection={<LuClock size={16} />}
          />
          <TimeInput
            label="Pick a time"
            value={startTime}
            onChange={(event) => setStartTime(event.currentTarget.value)}
            leftSection={<LuClock size={16} />}
          />
          <Button fullWidth onClick={handleBooking}>Confirm Booking</Button>
        </Stack>
      </Modal>
    </Container>
  );
};
