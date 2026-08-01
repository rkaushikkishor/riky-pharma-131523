import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';

export interface CartItem {
  id: string;
  name: string;
  composition: string;
  mrp: number;
  pricePerStrip: number;
  stripSize: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

export interface User {
  name: string;
  mobile: string;
  loginTime: string;
}

export interface Order {
  billNumber: string;
  items: CartItem[];
  total: number;
  date: string;
  user: User;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.0, 0.0, 0.2, 1.0] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: [0.4, 0.0, 1.0, 1.0] } },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="size-full"
    >
      {children}
    </motion.div>
  );
}

// Scroll progress bar at top of page
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (progress <= 0 || progress >= 100) return null;
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-green-500 origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ duration: 0.08 }}
      />
    </div>
  );
}

function AnimatedRoutes({
  user,
  cart,
  currentOrder,
  handleLogin,
  handleLogout,
  addToCart,
  removeFromCart,
  createOrder,
  clearCart,
}: {
  user: User | null;
  cart: CartItem[];
  currentOrder: Order | null;
  handleLogin: (name: string, mobile: string) => void;
  handleLogout: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  createOrder: (order: Order) => void;
  clearCart: () => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : (
              <PageWrapper>
                <LoginPage onLogin={handleLogin} />
              </PageWrapper>
            )
          }
        />
        <Route
          path="/home"
          element={
            user ? (
              <PageWrapper>
                <HomePage user={user} onLogout={handleLogout} />
              </PageWrapper>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/products"
          element={
            user ? (
              <PageWrapper>
                <ProductPage
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              </PageWrapper>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/cart"
          element={
            user ? (
              <PageWrapper>
                <CartPage
                  cart={cart}
                  user={user}
                  onCreateOrder={createOrder}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                />
              </PageWrapper>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/payment"
          element={
            user && currentOrder ? (
              <PageWrapper>
                <PaymentPage order={currentOrder} onClearCart={clearCart} />
              </PageWrapper>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/success"
          element={
            user ? (
              <PageWrapper>
                <SuccessPage order={currentOrder} />
              </PageWrapper>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('rikyPharmaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (name: string, mobile: string) => {
    const newUser: User = { name, mobile, loginTime: new Date().toISOString() };
    setUser(newUser);
    localStorage.setItem('rikyPharmaUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentOrder(null);
    localStorage.removeItem('rikyPharmaUser');
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const clearCart = () => setCart([]);

  const createOrder = (order: Order) => {
    setCurrentOrder(order);
    const history = localStorage.getItem('rikyPharmaPurchaseHistory');
    const purchaseHistory = history ? JSON.parse(history) : [];
    purchaseHistory.unshift(order);
    if (purchaseHistory.length > 100) purchaseHistory.pop();
    localStorage.setItem('rikyPharmaPurchaseHistory', JSON.stringify(purchaseHistory));
  };

  return (
    <Router>
      <div className="size-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <ScrollProgress />
        <AnimatedRoutes
          user={user}
          cart={cart}
          currentOrder={currentOrder}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          createOrder={createOrder}
          clearCart={clearCart}
        />
      </div>
    </Router>
  );
}
