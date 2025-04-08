import React from 'react';
import { useState } from 'react';
import { Home } from './pages/Home';
import { Restaurants } from './pages/Restaurants';
import { RestaurantMenu } from './pages/RestaurantMenu';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { OrderTracking } from './pages/OrderTracking';
import { Offers } from './pages/Offers';
import { Help } from './pages/Help';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'restaurants':
        return <Restaurants onNavigate={setCurrentPage} />;
      case 'menu':
        return <RestaurantMenu onNavigate={setCurrentPage} cart={cart} setCart={setCart} />;
      case 'cart':
        return <Cart onNavigate={setCurrentPage} cart={cart} setCart={setCart} />;
      case 'checkout':
        return <Checkout onNavigate={setCurrentPage} cart={cart} />;
      case 'payment':
        return <Payment onNavigate={setCurrentPage} />;
      case 'tracking':
        return <OrderTracking />;
      case 'offers':
        return <Offers />;
      case 'help':
        return <Help />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onNavigate={setCurrentPage}
        cartItemCount={cart.length}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;