import React from 'react';
import { AppShell, Box } from '@mantine/core';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { motion } from 'framer-motion';

export const Layout = ({ children }) => {
  return (
    <AppShell
      navbar={{ width: 280, breakpoint: 'sm' }}
      header={{ height: 80 }}
      padding="xl"
      className="bg-slate-950 min-h-screen"
    >
      <AppShell.Header className="glass border-b border-white/5 h-20">
        <Topbar />
      </AppShell.Header>

      <AppShell.Navbar className="bg-transparent border-r-0 pt-4 px-4 overflow-visible">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main className="relative">
        {/* Subtle background glow */}
        <div className="fixed inset-0 bg-mesh-gradient opacity-10 pointer-events-none" />
        
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5 }}
           className="relative z-10 max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </AppShell.Main>
    </AppShell>
  );
};
