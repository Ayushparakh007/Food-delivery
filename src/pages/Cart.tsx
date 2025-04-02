import React from 'react';
import { Trash2 } from 'lucide-react';

interface CartProps {
  onNavigate: (page: string) => void;
  cart: any[];
  setCart: (cart: any[]) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate, cart, setCart }) => {
  const removeItem = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => onNavigate('restaurants')}
          className="bg-orange-600 text-white px-6 py-2 rounded-full"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white rounded-lg shadow p-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={() => onNavigate('payment')}
            className="bg-orange-600 text-white px-6 py-2 rounded-full"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};