import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface RestaurantMenuProps {
  onNavigate: (page: string) => void;
  cart: any[];
  setCart: (cart: any[]) => void;
}

export const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ onNavigate, cart, setCart }) => {
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Classic Burger",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    }
  ];

  const addToCart = (item: any) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(i =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      ));
    } else {
      setCart(cart.filter(i => i.id !== itemId));
    }
  };

  const getItemQuantity = (itemId: number) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Restaurant Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
            <div className="relative h-48 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-orange-600 font-medium">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                {getItemQuantity(item.id) > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-orange-100 text-orange-600 p-1 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{getItemQuantity(item.id)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-orange-100 text-orange-600 p-1 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-full"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => onNavigate('cart')}
            className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg"
          >
            View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
          </button>
        </div>
      )}
    </div>
  );
};