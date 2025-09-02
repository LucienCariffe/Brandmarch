'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { brandMarchTheme } from '../theme/theme';

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  return (
    <ThemeProvider theme={brandMarchTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
