'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Paper
} from '@mui/material';
import {
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function SuccessPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect authenticated users to payment page
  useEffect(() => {
    if (!loading && user) {
      // User is authenticated, stay on success page
    } else if (!loading && !user) {
      // User is not authenticated, redirect to login
      router.push('/');
    }
  }, [user, loading, router]);

  const handleGoHome = () => {
    router.push('/payment');
  };

  const handleViewReceipt = () => {
    // You can implement receipt viewing functionality here
    alert('Receipt viewing feature coming soon!');
  };

  // Show loading while checking authentication
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

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
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
          {/* Header */}
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
          </Box>

          {/* Success Content */}
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <CheckCircleIcon 
              sx={{ 
                fontSize: 80, 
                color: 'success.main', 
                mb: 2 
              }} 
            />
            
            <Typography variant="h3" color="success.main" gutterBottom>
              Payment Successful!
            </Typography>
            
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for your purchase
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Your payment of $29.99 has been processed successfully.
            </Typography>

    
          </Paper>

          {/* Footer */}
          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="text.secondary">
              © 2024 Brand March. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
