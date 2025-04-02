import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FoodHub</h3>
            <p className="text-gray-400">
              Delivering happiness to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Order Status</a></li>
              <li><a href="#" className="hover:text-white">Payment Options</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-500">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-500">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 FoodHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}