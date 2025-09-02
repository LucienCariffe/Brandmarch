'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentForm from '../../components/PaymentForm';
import ProtectedRoute from '../../components/ProtectedRoute';
import { Box, Typography, Avatar, Container, Button } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { supabase } from '../../../supabaseClient';

export default function PaymentPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handlePaymentSuccess = () => {
    alert('Payment processed successfully! Thank you for choosing Brand March.');
  };

  const handlePaymentComplete = () => {
    // Redirect to success page
    router.push('/success');
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        alert('Error signing out. Please try again.');
        return;
      }
      
      // Redirect to login page after successful sign out
      router.push('/');
    } catch (err) {
      console.error('Sign out error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

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
            
            {/* Sign Out Button */}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                size="small"
                onClick={handleSignOut}
                disabled={isSigningOut}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'rgba(0, 92, 68, 0.04)'
                  }
                }}
              >
                {isSigningOut ? 'Signing Out...' : 'Sign Out'}
              </Button>
            </Box>
          </Box>

                  {/* Payment Form Component */}
        <PaymentForm 
          amount="29.99" 
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentComplete={handlePaymentComplete}
        />

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
