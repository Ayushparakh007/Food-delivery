import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  cartItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, cartItemCount }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-orange-600 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              FoodHub
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('restaurants')}
              className="text-gray-700 hover:text-orange-600"
            >
              Restaurants
            </button>
            {/* <button className="text-gray-700 hover:text-orange-600">Offers</button>
            <button className="text-gray-700 hover:text-orange-600">Help</button> */}
            <div className="relative">
              <button
                onClick={() => onNavigate('cart')}
                className="text-gray-700 hover:text-orange-600"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Menu className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
}