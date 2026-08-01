import { useNavigate } from 'react-router';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Star, ShoppingBag, Info, Phone, Mail, MapPin, LogOut, Calendar, Clock, Receipt, X } from 'lucide-react';
import { User, Order } from '../App';
import { useState, useEffect, useRef } from 'react';
import logoImage from '../../imports/Screenshot_2026-04-05_232705.png';
import {
  staggerContainer,
  staggerItem,
  backdropVariants,
  modalVariants,
  scrollReveal,
  btnHover,
  btnTap,
  springs,
  cardHoverSubtle,
  floatAnimation,
} from '../utils/motionConfig';

interface HomePageProps {
  user: User;
  onLogout: () => void;
}

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollRevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      variants={scrollReveal}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage({ user, onLogout }: HomePageProps) {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [purchaseHistory, setPurchaseHistory] = useState<Order[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const history = localStorage.getItem('rikyPharmaPurchaseHistory');
    if (history) setPurchaseHistory(JSON.parse(history));
  }, []);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const features = [
    { title: 'Quality Products', desc: 'Certified medicines from trusted manufacturers', emoji: '💊' },
    { title: 'Fast Delivery', desc: 'Quick & reliable service at your doorstep', emoji: '🚀' },
    { title: 'Trusted Service', desc: 'Serving Madurai since 2017', emoji: '⭐' },
  ];

  return (
    <div className="size-full min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.snappy }}
          className="flex justify-between items-start mb-8"
        >
          {/* User Info */}
          <motion.div
            whileHover={cardHoverSubtle}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/30 cursor-default"
          >
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Welcome back</p>
            <p className="font-bold text-gray-800 text-lg mt-0.5">{user.name}</p>
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {currentDateTime.toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono">{currentDateTime.toLocaleTimeString('en-IN')}</span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {[
              { icon: Info, color: 'text-blue-600', title: 'Company Info', action: () => setShowInfo(true) },
              { icon: Receipt, color: 'text-green-600', title: 'Purchase History', action: () => setShowHistory(true) },
              { icon: LogOut, color: 'text-red-500', title: 'Logout', action: handleLogoutClick },
            ].map(({ icon: Icon, color, title, action }) => (
              <motion.button
                key={title}
                whileHover={{ scale: 1.08, y: -2, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
                whileTap={{ scale: 0.93 }}
                transition={springs.swift}
                onClick={action}
                title={title}
                className="bg-white/70 backdrop-blur-lg rounded-full p-3 shadow-md border border-white/30 hover:bg-white/90 transition-colors"
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Company Info Modal */}
        <Modal open={showInfo} onClose={() => setShowInfo(false)}>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">About Riky Pharma</h2>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={springs.swift}
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed text-sm">
                Riky Pharma is a pharmaceutical wholesaler and distributor located on Tamil Sangam Road,
                Maninagaram, Madurai, Tamil Nadu (PIN: 625001).
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Products include tablets, capsules, gels, herbal products, and baby diapers.
              </p>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-4 space-y-3"
              >
                {[
                  { label: '📅 Established', value: 'October 16, 2017' },
                  { label: '📞 Phone', value: '9789555188', icon: Phone },
                  { label: '✉️ Email', value: 'rikyfamily1@gmail.com', icon: Mail },
                  { label: '📍 Address', value: 'Tamil Sangam Road, Maninagaram, Madurai, TN - 625001', icon: MapPin },
                ].map(({ label, value }) => (
                  <motion.div key={label} variants={staggerItem} className="flex gap-2 text-sm">
                    <span className="text-gray-500 whitespace-nowrap">{label}:</span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.button
              whileHover={btnHover}
              whileTap={btnTap}
              onClick={() => setShowInfo(false)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Close
            </motion.button>
          </div>
        </Modal>

        {/* Purchase History Modal */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowHistory(false)}
            >
              <motion.div
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden"
              >
                <div className="p-8 pb-4 flex justify-between items-center border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Purchase History</h2>
                    <p className="text-gray-500 text-sm mt-0.5">{purchaseHistory.length} orders</p>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={springs.swift}
                    onClick={() => setShowHistory(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="overflow-y-auto scroll-area flex-1 p-8 pt-4">
                  {purchaseHistory.length === 0 ? (
                    <motion.div
                      variants={floatAnimation}
                      animate="animate"
                      className="text-center py-16"
                    >
                      <p className="text-5xl mb-4">🧾</p>
                      <p className="text-gray-500 font-medium">No purchase history yet</p>
                      <p className="text-gray-400 text-sm mt-1">Your completed orders will appear here</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                      className="space-y-4"
                    >
                      {purchaseHistory.map((order, index) => (
                        <motion.div
                          key={index}
                          variants={staggerItem}
                          whileHover={cardHoverSubtle}
                          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-5 border border-blue-100/60 cursor-default"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-bold text-gray-800">Bill #{order.billNumber}</p>
                              <p className="text-gray-500 text-sm mt-0.5">
                                {order.user.name} · {order.user.mobile}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600 text-xl">₹{order.total.toFixed(2)}</p>
                              <p className="text-gray-400 text-xs">
                                {new Date(order.date).toLocaleDateString('en-IN')}
                              </p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200/60 pt-3">
                            <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wider">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </p>
                            <div className="space-y-1">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm text-gray-600">
                                  <span>{item.name} × {item.quantity}</span>
                                  <span className="font-semibold text-gray-700">
                                    ₹{(item.mrp * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="p-8 pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={btnHover}
                    whileTap={btnTap}
                    onClick={() => setShowHistory(false)}
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.gentle, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/30"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...springs.bouncy, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 28px 56px rgba(37,99,235,0.2)' }}
              transition={springs.snappy}
              className="flex items-center gap-4 bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6 rounded-3xl shadow-2xl"
            >
              <motion.img
                src={logoImage}
                alt="Riky Pharma Logo"
                className="w-16 h-16 object-contain"
                whileHover={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.5 }}
              />
              <div className="text-left">
                <h2 className="text-3xl font-bold text-white">Riky Pharma</h2>
                <p className="text-blue-100 text-sm tracking-wide">Since 2017</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-3"
          >
            Riky Pharma
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-lg text-gray-600 mb-1"
          >
            Your Trusted Pharmaceutical Partner
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-sm mb-8"
          >
            Owned by B. Indumathi Ramkumar
          </motion.p>

          {/* Stars — staggered */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex justify-center gap-2 mb-8"
          >
            {[1, 2, 3, 4, 5].map(star => (
              <motion.div
                key={star}
                variants={{
                  initial: { opacity: 0, scale: 0, rotate: -120 },
                  animate: { opacity: 1, scale: 1, rotate: 0, transition: springs.bouncy },
                }}
                whileHover={{ scale: 1.3, rotate: 20 }}
                transition={springs.swift}
              >
                <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, ...springs.snappy }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37,99,235,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl flex items-center gap-3 mx-auto hover:from-blue-700 hover:to-green-700 transition-colors relative overflow-hidden"
          >
            <ShoppingBag className="w-6 h-6 relative z-10" />
            <span className="relative z-10">View Products</span>
            <motion.div
              className="absolute inset-0 bg-white/15 skew-x-12 -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {/* Feature cards — scroll reveal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {features.map((feature, index) => (
              <ScrollRevealSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
                  transition={springs.snappy}
                  className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-5 text-center border border-blue-100/40 h-full"
                >
                  <p className="text-2xl mb-2">{feature.emoji}</p>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </motion.div>
              </ScrollRevealSection>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
