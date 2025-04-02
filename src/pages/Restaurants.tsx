import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';

interface RestaurantsProps {
  onNavigate: (page: string) => void;
}

export const Restaurants: React.FC<RestaurantsProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'veg', 'non-veg', 'fast-delivery'];
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      rating: 4.5,
      deliveryTime: "30-40",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
      veg: true
    },
    {
      id: 2,
      name: "Burger House",
      rating: 4.2,
      deliveryTime: "25-35",
      cuisine: "American",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
      veg: false
    },
    {
      id: 3,
      name: "Sushi Master",
      rating: 4.7,
      deliveryTime: "40-50",
      cuisine: "Japanese",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80",
      veg: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Sort
          </button>
          <select className="px-4 py-2 border rounded-lg bg-white">
            <option>Rating</option>
            <option>Delivery Time</option>
            <option>Cost: Low to High</option>
            <option>Cost: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full capitalize ${
              activeFilter === filter
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('menu')}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {restaurant.rating}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <span>{restaurant.cuisine}</span>
                <span className="mx-2">•</span>
                <span>{restaurant.deliveryTime} min</span>
                {restaurant.veg && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-green-600">Pure Veg</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}