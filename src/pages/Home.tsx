import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80' },
    { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
    { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80' },
    { name: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&q=80' },
  ];

  const featuredRestaurants = [
    { name: "Pizza Palace", cuisine: "Italian", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80" },
    { name: "Burger House", cuisine: "American", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
    { name: "Sushi Master", cuisine: "Japanese", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80" }
  ];

  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div
        className="relative h-[500px] rounded-3xl overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Delicious Food,<br />Delivered To Your Door
          </h1>
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for food or restaurants..."
              className="w-full py-4 px-6 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 p-3 rounded-full hover:bg-orange-700">
              <Search className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
          <button className="text-orange-600 flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => onNavigate('restaurants')}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                width={300}
                height={192}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-xl font-semibold p-4">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('menu')}
            >
              <div className="relative w-full h-48">
                {!imagesLoaded[`featured-${index}`] &&
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                }
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                  width={500}
                  height={192}
                  loading="lazy"
                  onLoad={() => handleImageLoad(`featured-${index}`)}
                  style={{ opacity: imagesLoaded[`featured-${index}`] ? 1 : 0 }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">4.5 ★</span>
                  <span>30-40 min</span>
                  <span className="mx-2">•</span>
                  <span>$$ • {restaurant.cuisine}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
