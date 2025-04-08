import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  cartItemCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, cartItemCount, isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-orange-600 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              HungerRush
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('restaurants')}
              className="text-gray-700 hover:text-orange-600"
            >
              Restaurants
            </button>
            <button
              onClick={() => onNavigate('offers')}
              className="text-gray-700 hover:text-orange-600"
            >
              Offers
            </button>
            <button
              onClick={() => onNavigate('help')}
              className="text-gray-700 hover:text-orange-600"
            >
              Help
            </button>
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
            {isLoggedIn ? (
              <div className="relative group">
                <button
                  onClick={() => onNavigate('profile')}
                  className="text-gray-700 hover:text-orange-600"
                >
                  <User className="w-6 h-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <button
                    onClick={() => onNavigate('profile')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={onLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="text-gray-700 hover:text-orange-600"
              >
                Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Menu className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};