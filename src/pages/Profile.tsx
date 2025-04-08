import React from 'react';
import { User, Phone, Mail, MapPin, Clock, Package } from 'lucide-react';

interface ProfileProps {
  user: any;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const recentOrders = [
    {
      id: '1',
      restaurant: 'Pizza Palace',
      date: '2025-03-15',
      total: 29.99,
      status: 'Delivered'
    },
    {
      id: '2',
      restaurant: 'Burger House',
      date: '2025-03-10',
      total: 24.50,
      status: 'Delivered'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-orange-600 border border-orange-600 rounded-full hover:bg-orange-600 hover:text-white"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user?.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{user?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{order.restaurant}</h3>
                    <span className="text-green-600 text-sm">{order.status}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};