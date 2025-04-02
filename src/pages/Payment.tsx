import React, { useState } from 'react';
import { CreditCard, Smartphone, Truck, CreditCardIcon, Check } from 'lucide-react';

interface PaymentProps {
  onNavigate: (page: string) => void;
}

export const Payment: React.FC<PaymentProps> = ({ onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Add space after every 4 digits
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digits[i];
    }

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    } else {
      return digits;
    }
  };

  const validateCardNumber = (number: string) => {
    const digitsOnly = number.replace(/\s/g, '');
    return /^\d{16}$/.test(digitsOnly) ? '' : 'Please enter a valid 16-digit card number';
  };

  const validateExpiryDate = (date: string) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) {
      return 'Please enter a valid expiry date (MM/YY)';
    }

    const [month, year] = date.split('/').map(part => parseInt(part, 10));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (month < 1 || month > 12) {
      return 'Month must be between 1 and 12';
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }

    return '';
  };

  const validateCvv = (cvv: string) => {
    return /^\d{3,4}$/.test(cvv) ? '' : 'CVV must be 3 or 4 digits';
  };

  const validateUpiId = (id: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(id) ? '' : 'Please enter a valid UPI ID';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setErrors({ ...errors, cardNumber: validateCardNumber(formatted) });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
    setErrors({ ...errors, expiryDate: validateExpiryDate(formatted) });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
    setErrors({ ...errors, cvv: validateCvv(value) });
  };

  const handleUpiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpiId(value);
    setErrors({ ...errors, upiId: validateUpiId(value) });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    let formValid = true;
    const newErrors: { [key: string]: string } = {};

    if (paymentMethod === 'card') {
      const cardNumberError = validateCardNumber(cardNumber);
      const expiryDateError = validateExpiryDate(expiryDate);
      const cvvError = validateCvv(cvv);

      if (cardNumberError) {
        newErrors.cardNumber = cardNumberError;
        formValid = false;
      }

      if (expiryDateError) {
        newErrors.expiryDate = expiryDateError;
        formValid = false;
      }

      if (cvvError) {
        newErrors.cvv = cvvError;
        formValid = false;
      }
    } else if (paymentMethod === 'upi') {
      const upiIdError = validateUpiId(upiId);

      if (upiIdError) {
        newErrors.upiId = upiIdError;
        formValid = false;
      }
    }

    setErrors(newErrors);

    if (formValid) {
      // Process payment and navigate to tracking page
      onNavigate('tracking');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between mb-6 border-b pb-4">
          <button
            type="button"
            className={`flex flex-col items-center gap-2 p-2 rounded-lg ${paymentMethod === 'card' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'
              }`}
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-sm font-medium">Credit Card</span>
          </button>

          <button
            type="button"
            className={`flex flex-col items-center gap-2 p-2 rounded-lg ${paymentMethod === 'upi' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'
              }`}
            onClick={() => setPaymentMethod('upi')}
          >
            <Smartphone className="w-6 h-6" />
            <span className="text-sm font-medium">UPI</span>
          </button>

          <button
            type="button"
            className={`flex flex-col items-center gap-2 p-2 rounded-lg ${paymentMethod === 'cod' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'
              }`}
            onClick={() => setPaymentMethod('cod')}
          >
            <Truck className="w-6 h-6" />
            <span className="text-sm font-medium">Cash on Delivery</span>
          </button>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          {paymentMethod === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : ''}`}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className={`w-full p-2 border rounded ${errors.expiryDate ? 'border-red-500' : ''}`}
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    required
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : ''}`}
                    value={cvv}
                    onChange={handleCvvChange}
                    required
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <label className="block text-sm font-medium mb-1">UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
                className={`w-full p-2 border rounded ${errors.upiId ? 'border-red-500' : ''}`}
                value={upiId}
                onChange={handleUpiIdChange}
                required
              />
              {errors.upiId && (
                <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>
              )}
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when your order arrives</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-full mt-6 hover:bg-orange-700 transition-colors"
          >
            {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};
