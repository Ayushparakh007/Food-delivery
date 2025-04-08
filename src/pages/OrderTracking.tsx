import React, { useState, useEffect } from 'react';
import { Check, Clock, Truck, Utensils, MapPin, Phone, MessageCircle, Navigation, RefreshCw } from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.006 });
  const [deliveryProgress, setDeliveryProgress] = useState(0); // Starting from 0%
  const [estimatedTime, setEstimatedTime] = useState('1:05 PM - 1:15 PM');
  const [refreshing, setRefreshing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const steps = [
    { id: 1, name: 'Order Placed', icon: Check, time: '12:30 PM', completed: false },
    { id: 2, name: 'Preparing', icon: Utensils, time: '12:35 PM', completed: false },
    { id: 3, name: 'Out for Delivery', icon: Truck, time: '12:50 PM', completed: false },
    { id: 4, name: 'Arriving Soon', icon: Clock, time: '1:05 PM', completed: false },
  ];

  // Simulate location updates
  useEffect(() => {
    const locationInterval = setInterval(() => {
      // Simulate small changes in location
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() * 0.001 - 0.0005),
        lng: prev.lng + (Math.random() * 0.001 - 0.0005)
      }));

      // Simulate progress updates
      setDeliveryProgress(prev => {
        const newProgress = prev + Math.random() * 0.5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 5000);

    return () => clearInterval(locationInterval);
  }, []);

  // Update steps based on progress
  useEffect(() => {
    const updatedSteps = [...steps];
    if (deliveryProgress >= 25) updatedSteps[0].completed = true;
    if (deliveryProgress >= 50) updatedSteps[1].completed = true;
    if (deliveryProgress >= 75) updatedSteps[2].completed = true;
    if (deliveryProgress >= 95) updatedSteps[3].completed = true;
  }, [deliveryProgress]);

  const handleRefresh = () => {
    setRefreshing(true);

    // Simulate refresh delay
    setTimeout(() => {
      // Update with "new" data
      setCurrentLocation({
        lat: currentLocation.lat + (Math.random() * 0.002 - 0.001),
        lng: currentLocation.lng + (Math.random() * 0.002 - 0.001)
      });

      const newProgress = deliveryProgress + Math.random() * 2;
      setDeliveryProgress(newProgress > 100 ? 100 : newProgress);

      setRefreshing(false);
    }, 1500);
  };

  // Calculate ETA based on progress
  useEffect(() => {
    if (deliveryProgress >= 90) {
      setEstimatedTime('1:00 PM - 1:05 PM');
    } else if (deliveryProgress >= 80) {
      setEstimatedTime('1:05 PM - 1:10 PM');
    }
  }, [deliveryProgress]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Track Your Order</h1>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        {/* Live Tracking Map */}
        <div className="mb-6 relative overflow-hidden rounded-lg h-48 bg-gray-100">
          <div className="relative w-full h-full">
            {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
            <img
              src="https://shipsy.io/wp-content/uploads/2021/11/live-tracking-micro.png"
              alt="Live Tracking Map"
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              style={{
                opacity: imageLoaded ? 1 : 0,
                aspectRatio: '16/9',
                objectFit: 'cover'
              }}
            />
          </div>
          <div className="absolute bottom-3 left-3 bg-white py-1 px-3 rounded-full shadow-md flex items-center gap-1 text-sm">
            <Navigation className="w-4 h-4 text-orange-600" />
            <span>Live Tracking</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>On the way</span>
            <span>{Math.round(deliveryProgress)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-600 transition-all duration-1000 ease-out"
              style={{ width: `${deliveryProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-[21px] top-8 h-[calc(100%-4rem)] w-[2px] bg-gray-200">
            <div
              className="bg-orange-600 transition-all duration-700"
              style={{ height: `${deliveryProgress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${step.completed
                    ? 'bg-orange-600 text-white'
                    : step.id === 1 && deliveryProgress > 0
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                    }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{step.name}</h3>
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                  {step.id === 1 && deliveryProgress === 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      Your order has been received and is being processed.
                    </p>
                  )}
                  {step.id === 3 && deliveryProgress > 50 && deliveryProgress < 75 && (
                    <p className="text-sm text-gray-600 mt-1">
                      Your order is on the way. Track your delivery in real-time.
                    </p>
                  )}
                  {step.id === 4 && deliveryProgress > 75 && (
                    <p className="text-sm text-gray-600 mt-1">
                      Your delivery is {Math.round(deliveryProgress)}% complete. Driver is approximately {Math.round(100 - deliveryProgress) * 0.2} km away.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="mt-8 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Estimated Delivery Time</p>
                <p className="font-medium">{estimatedTime}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Number</p>
                <p className="font-medium">#123456</p>
              </div>
              <div>
                <p className="text-gray-600">Delivery Address</p>
                <p className="font-medium">123 Main St, Apt 4B</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number</p>
                <p className="font-medium">(555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Driver</h2>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Driver"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Michael Johnson</h3>
              <p className="text-sm text-gray-600">Delivery Partner</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
                  alt="Burger"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Double Cheeseburger</h3>
                <p className="text-sm text-gray-600">Qty: 2</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$12.98</p>
              </div>
            </div>
            <div className="p-4 border-b flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4">
                <img
                  src="https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=300&q=80"
                  alt="Fries"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Large Fries</h3>
                <p className="text-sm text-gray-600">Qty: 1</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$3.99</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>$16.97</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t mt-2">
                <span>Total</span>
                <span>$19.96</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
