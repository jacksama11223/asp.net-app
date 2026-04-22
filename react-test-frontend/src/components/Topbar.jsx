import React from 'react';
import { 
  Group, 
  TextInput, 
  ActionIcon, 
  Indicator, 
  Avatar, 
  Text, 
  Box, 
  Menu,
  UnstyledButton,
  useMantineColorScheme
} from '@mantine/core';
import { 
  LuSearch, 
  LuBell, 
  LuMoon, 
  LuSun, 
  LuChevronDown,
  LuSettings,
  LuUsers
} from 'react-icons/lu';

export const Topbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Box 
      component="header" 
      h={80} 
      px="xl" 
      style={(theme) => ({ 
        borderBottom: `1px solid ${theme.colors.dark[4]}`,
        backgroundColor: dark ? theme.colors.dark[7] : theme.white,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      })}
    >
      <TextInput
        placeholder="Search courses, students, analytics..."
        leftSection={<LuSearch size={18} />}
        w={400}
        radius="xl"
        variant="filled"
        styles={(theme) => ({
          input: { backgroundColor: theme.colors.dark[6] }
        })}
      />

      <Group gap="lg">
        <ActionIcon 
          onClick={() => toggleColorScheme()}
          variant="default"
          size="lg"
          radius="md"
        >
          {dark ? <LuSun size={20} color="yellow" /> : <LuMoon size={20} />}
        </ActionIcon>

        <Indicator color="brand" offset={2} size={8} withBorder processing>
          <ActionIcon variant="default" size="lg" radius="md">
            <LuBell size={20} />
          </ActionIcon>
        </Indicator>

        <Box w={1} h={30} bg="dark.4" />

        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <UnstyledButton>
              <Group gap="xs">
                <Box visibleFrom="md" style={{ textAlign: 'right' }}>
                  <Text size="sm" fw={700}>Admin User</Text>
                  <Text size="10px" tt="uppercase" fw={900} c="dimmed">Premium Plan</Text>
                </Box>
                <Avatar 
                  size="md" 
                  radius="md" 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                />
                <LuChevronDown size={14} />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item leftSection={<LuSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item leftSection={<LuUsers size={14} />}>Profile</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red">Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
};
