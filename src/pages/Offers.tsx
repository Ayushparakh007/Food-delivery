import React from 'react';
import { Tag, Clock } from 'lucide-react';

export const Offers: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: "50% OFF up to $10",
      code: "WELCOME50",
      description: "Valid on your first order",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      expiryDate: "2025-03-31"
    },
    {
      id: 2,
      title: "Free Delivery",
      code: "FREEDEL",
      description: "On orders above $20",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
      expiryDate: "2025-03-31"
    },
    {
      id: 3,
      title: "20% OFF on Selected Restaurants",
      code: "SPECIAL20",
      description: "Valid on selected restaurants",
      image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80",
      expiryDate: "2025-03-31"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">{offer.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-600">
                    Expires: {new Date(offer.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button className="w-full bg-orange-600 text-white py-2 rounded-full hover:bg-orange-700">
                Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};