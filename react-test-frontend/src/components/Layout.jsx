import '../assets/css/gamification-frames.css';
import React, { useState } from 'react';
import { AppShell, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { motion } from 'framer-motion';

export const Layout = ({ children }) => {
  // Sidebar mặc định đóng theo yêu cầu
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, sm: 80 } }}
      navbar={{ 
        width: { base: 280, sm: collapsed ? 80 : 280 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: false }
      }}
      padding={{ base: 'md', sm: 'xl' }}
      className="bg-slate-50 relative overflow-hidden transition-all duration-300"
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
      
      <AppShell.Header className="bg-white/40 backdrop-blur-xl border-b border-black/5 z-50">
        <Topbar mobileOpened={mobileOpened} toggleMobile={toggleMobile} />
      </AppShell.Header>

      <AppShell.Navbar className="bg-transparent border-none z-40 transition-all duration-300">
        <Sidebar 
          collapsed={collapsed} 
          onToggle={() => setCollapsed(!collapsed)} 
          closeMobile={closeMobile}
        />
      </AppShell.Navbar>

      <AppShell.Main className="relative z-10 transition-all duration-300">
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
