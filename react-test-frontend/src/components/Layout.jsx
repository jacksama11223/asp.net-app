import React from 'react';
import { AppShell, Container } from '@mantine/core';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { motion } from 'framer-motion';

export const Layout = ({ children }) => {
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 280, breakpoint: 'sm' }}
      padding="xl"
      className="bg-slate-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
      
      <AppShell.Header className="bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Topbar />
      </AppShell.Header>

      <AppShell.Navbar className="bg-transparent border-none">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main className="relative z-10">
        <Container size="xl" p={0}>
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
