'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Security as SecurityIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { supabase } from '../../supabaseClient';

interface PaymentFormProps {
  amount: string;
  onPaymentSuccess?: () => void;
  onPaymentComplete?: () => void;
}

export default function PaymentForm({ amount, onPaymentSuccess, onPaymentComplete }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Card number must be at least 13 digits';
    }
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
    }
    
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be at least 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {

      const { data: { user } } = await supabase.auth.getUser();
      

      if (!user) {
        alert('You must be logged in to make a payment');
        setIsProcessing(false);
        return;
      }


      const amountInCents = Math.round(parseFloat(amount.replace('$', '')) * 100);
      

      const paymentData = {
        user_id: user.id,
        amount: amountInCents, 
        status: "success",
        stripe_session_id: `mock-session-${Date.now()}`, 
        created_at: new Date().toISOString()
      };

      const { error } = await supabase.from("payments").insert([paymentData]);

      if (error) {
        console.error('Payment storage error:', error);
        console.error('Error details:', {
          message: error.message,
        });
        alert(`Payment processed but there was an error storing the record: ${error.message || 'Unknown error'}`);
        setIsProcessing(false);
        return;
      }

      if (onPaymentComplete) {
        onPaymentComplete();
      } else if (onPaymentSuccess) {
        onPaymentSuccess();
      } else {
        alert('Payment processed successfully! Thank you for choosing Brand March.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('An unexpected error occurred during payment processing. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <Card elevation={3}>
      <CardContent sx={{ p: 4 }}>

        <Box textAlign="center" mb={4}>
          <Typography variant="h3" color="primary" gutterBottom>
            ${amount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            One-time payment
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            name="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              setFormData(prev => ({ ...prev, cardNumber: formatted }));
            }}
            placeholder="1234 5678 9012 3456"
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
            InputProps={{
              startAdornment: <CreditCardIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ mb: 3 }}
          />
          


          <TextField
            fullWidth
            
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleInputChange}
            placeholder="John Doe"
            error={!!errors.cardholderName}
            helperText={errors.cardholderName}
            sx={{ mb: 3 }}
          />


          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              name="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                  const formatted = value.length > 2 ? value.slice(0, 2) + '/' + value.slice(2) : value;
                  setFormData(prev => ({ ...prev, expiryDate: formatted }));
                }
              }}
              placeholder="MM/YY"
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
            />
            <TextField
              fullWidth

              name="cvv"
              value={formData.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                setFormData(prev => ({ ...prev, cvv: value }));
              }}
              placeholder="CSV"
              error={!!errors.cvv}
              helperText={errors.cvv}
            />
          </Box>


          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <PaymentIcon />}
            sx={{ 
              py: 1.5, 
              fontSize: '1.1rem',
              mb: 3
            }}
          >
            {isProcessing ? 'Processing...' : `Pay $${amount}`}
          </Button>
        </form>

        <Divider sx={{ my: 3 }} />


        <Box textAlign="center">
          <Alert 
            icon={<SecurityIcon />} 
            severity="info" 
            variant="outlined"
            sx={{ 
              backgroundColor: 'rgba(0, 92, 68, 0.04)',
              borderColor: 'primary.main',
              color: 'primary.main'
            }}
          >
            Secure payment powered by Stripe
          </Alert>
        </Box>
      </CardContent>
    </Card>
  );
}
