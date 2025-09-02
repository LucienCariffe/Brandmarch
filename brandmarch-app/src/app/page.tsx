'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button
} from '@mui/material';
import {
  Payment as PaymentIcon
} from '@mui/icons-material';
import NextLink from 'next/link';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  
  useEffect(() => {
    if (!loading && user) {
      router.push('/payment');
    }
  }, [user, loading, router]);

  const handleLoginSuccess = () => {
    
    router.push('/payment');
  };

  
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F5F4F0 0%, #DEDEDE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }


  if (user) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F5F4F0 0%, #DEDEDE 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        
        <Box textAlign="center" mb={4}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
              mx: 'auto',
              mb: 2
            }}
          >
            BM
          </Avatar>
          <Typography variant="h2" color="text.primary" gutterBottom>
            Brand March
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Welcome Back
          </Typography>
          
        
          
        </Box>

        
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Brand March. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
