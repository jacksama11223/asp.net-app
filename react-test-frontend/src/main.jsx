import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import { Toaster } from 'sonner';
import App from './App.jsx';

// Import Mantine core styles
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: [
      '#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', 
      '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'
    ],
  },
  fontFamily: 'Inter, sans-serif',
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Toaster position="top-right" richColors />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
