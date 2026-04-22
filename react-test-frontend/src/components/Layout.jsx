import React from 'react';
import { AppShell, Box } from '@mantine/core';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const Layout = ({ children }) => {
  const [parent] = useAutoAnimate();

  return (
    <AppShell
      navbar={{ width: 260, breakpoint: 'sm' }}
      header={{ height: 80 }}
      padding="md"
    >
      <AppShell.Header>
        <Topbar />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main bg="dark.8">
        <Box ref={parent} style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 40 }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
