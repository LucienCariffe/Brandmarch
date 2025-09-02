import { createTheme } from '@mui/material/styles';

export const brandMarchTheme = createTheme({
  palette: {
    primary: {
      main: '#005c44', // Brand teal
      light: '#007a5a',
      dark: '#004a38',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#101418', // Brand dark
      light: '#2a2f35',
      dark: '#0a0c0e',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F4F0', // Brand cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#101418', // Brand dark
      secondary: '#6D6D6D', // Brand medium neutral
    },
    grey: {
      50: '#FFFFFF',
      100: '#DEDEDE',
      200: '#D9D9D9',
      300: '#6D6D6D',
      400: '#6D6D6D',
      500: '#6D6D6D',
      600: '#363636',
      700: '#363636',
      800: '#101418',
      900: '#101418',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          backgroundColor: '#005c44',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#004a38',
          },
        },
        outlined: {
          borderColor: '#005c44',
          color: '#005c44',
          '&:hover': {
            backgroundColor: 'rgba(0, 92, 68, 0.04)',
            borderColor: '#004a38',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#DEDEDE',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: '#D9D9D9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#005c44',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#363636',
            fontWeight: 500,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#005c44',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});
