import React, { useState, useEffect } from 'react';
import { Plus, Minus, ArrowLeft } from 'lucide-react';

interface RestaurantMenuProps {
    onNavigate: (page: string) => void;
    cart: any[];
    setCart: (cart: any[]) => void;
    restaurantId?: number;
}

export const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ onNavigate, cart, setCart, restaurantId = 1 }) => {
    const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
    const [currentRestaurant, setCurrentRestaurant] = useState<any>(null);

    const restaurants = [
        {
            id: 1,
            name: "Pizza Palace",
            cuisine: "Italian",
            menuItems: [
                {
                    id: 101,
                    name: "Margherita Pizza",
                    description: "Classic pizza with tomato sauce, mozzarella, and basil",
                    price: 12.99,
                    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 102,
                    name: "Pepperoni Pizza",
                    description: "Tomato sauce, mozzarella, and pepperoni",
                    price: 14.99,
                    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 103,
                    name: "Garlic Bread",
                    description: "Freshly baked bread with garlic butter",
                    price: 5.99,
                    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 104,
                    name: "Caprese Salad",
                    description: "Fresh tomatoes, mozzarella, and basil with balsamic glaze",
                    price: 8.99,
                    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80",
                }
            ]
        },
        {
            id: 2,
            name: "Burger House",
            cuisine: "American",
            menuItems: [
                {
                    id: 201,
                    name: "Classic Burger",
                    description: "Beef patty with lettuce, tomato, and special sauce",
                    price: 9.99,
                    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 202,
                    name: "Cheeseburger",
                    description: "Beef patty with cheddar cheese, lettuce, and tomato",
                    price: 11.99,
                    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 203,
                    name: "French Fries",
                    description: "Crispy golden fries with sea salt",
                    price: 3.99,
                    image: "https://images.unsplash.com/photo-1630384060421-3a6b20d66d1b?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 204,
                    name: "Onion Rings",
                    description: "Crispy battered onion rings with dipping sauce",
                    price: 4.99,
                    image: "https://images.unsplash.com/photo-1639024471283-03bce9a7ba4a?auto=format&fit=crop&w=400&q=80",
                }
            ]
        },
        {
            id: 3,
            name: "Sushi Master",
            cuisine: "Japanese",
            menuItems: [
                {
                    id: 301,
                    name: "California Roll",
                    description: "Crab, avocado, and cucumber roll",
                    price: 8.99,
                    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 302,
                    name: "Salmon Nigiri",
                    description: "Fresh salmon over pressed vinegared rice",
                    price: 10.99,
                    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 303,
                    name: "Miso Soup",
                    description: "Traditional Japanese soup with tofu and seaweed",
                    price: 4.99,
                    image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?auto=format&fit=crop&w=400&q=80",
                },
                {
                    id: 304,
                    name: "Edamame",
                    description: "Steamed soy beans with sea salt",
                    price: 5.99,
                    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=400&q=80",
                }
            ]
        }
    ];

    useEffect(() => {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        if (restaurant) {
            setCurrentRestaurant(restaurant);
        }
    }, [restaurantId]);

    const handleImageLoad = (id: string) => {
        setImagesLoaded(prev => ({ ...prev, [id]: true }));
    };

    const addToCart = (item: any) => {
        const existingItem = cart.find(i => i.id === item.id);
        if (existingItem) {
            setCart(cart.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1, restaurantId }]);
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

    if (!currentRestaurant) {
        return <div className="p-8 text-center">Loading restaurant menu...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => onNavigate('home')}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold">{currentRestaurant.name} Menu</h1>
            </div>

            <p className="text-gray-600 mb-6">
                Authentic {currentRestaurant.cuisine} cuisine prepared with fresh ingredients
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentRestaurant.menuItems.map((item: any) => (
                    <div key={item.id} className="bg-white rounded-lg shadow p-4">
                        <div className="relative h-48 mb-4">
                            {!imagesLoaded[`menu-${item.id}`] &&
                                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                            }
                            <img
                                src={item.image}
                                alt={item.name}
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                loading="lazy"
                                onLoad={() => handleImageLoad(`menu-${item.id}`)}
                                style={{ opacity: imagesLoaded[`menu-${item.id}`] ? 1 : 0 }}
                            />
                        </div>
                        <div className="mb-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-orange-600 font-medium">${item.price.toFixed(2)}</p>
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
