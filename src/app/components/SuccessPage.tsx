import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Order } from '../App';
import logoImage from '../../imports/Screenshot_2026-04-05_232705.png';
import {
  springs,
  btnHover,
  btnTap,
  staggerContainer,
  staggerItem,
} from '../utils/motionConfig';

interface SuccessPageProps {
  order: Order | null;
}

interface Particle {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
  shape: 'circle' | 'rect';
}

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

function ConfettiParticles() {
  const particles = useRef<Particle[]>(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.current.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: Math.random() > 0.5 ? 360 : -360,
            scale: [1, 0.8, 0.5],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: p.delay,
            ease: 'easeIn',
          }}
          style={{
            position: 'fixed',
            top: 0,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.4 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (star: number) => {
    setRating(star);
    setSubmitted(true);
  };

  return (
    <div className="text-center">
      <p className="text-gray-500 text-sm mb-3">How was your experience?</p>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map(star => (
          <motion.button
            key={star}
            whileHover={!submitted ? { scale: 1.3, rotate: 10 } : {}}
            whileTap={!submitted ? { scale: 0.9 } : {}}
            transition={springs.bouncy}
            onClick={() => !submitted && handleRate(star)}
            onMouseEnter={() => !submitted && setHovered(star)}
            onMouseLeave={() => !submitted && setHovered(0)}
            disabled={submitted}
            className="text-3xl transition-all duration-150"
          >
            <motion.span
              animate={{
                scale: star <= (hovered || rating) ? 1.2 : 1,
                filter: star <= (hovered || rating)
                  ? 'saturate(1.5) brightness(1.1)'
                  : 'saturate(0.3) brightness(0.9)',
              }}
              transition={{ duration: 0.15 }}
            >
              ⭐
            </motion.span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 text-sm mt-2 font-medium"
          >
            Thank you for rating us {rating}/5! 🙏
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SuccessPage({ order }: SuccessPageProps) {
  const navigate = useNavigate();
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowParticles(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="size-full min-h-screen flex items-center justify-center p-4 relative">
      {/* Confetti */}
      <AnimatePresence>{showParticles && <ConfettiParticles />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...springs.bouncy }}
        className="max-w-2xl w-full relative z-20"
      >
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/30">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...springs.bouncy, delay: 0.2 }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            {/* Pulse rings */}
            {[1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-green-400 rounded-full"
              />
            ))}
            <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ ...springs.bouncy, delay: 0.35 }}
              >
                <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, ...springs.snappy }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Thank You!</h1>
            <p className="text-gray-500 text-lg">Your order has been placed successfully</p>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="my-8"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={springs.snappy}
              className="flex items-center justify-center gap-3 w-fit mx-auto"
            >
              <img src={logoImage} alt="Riky Pharma Logo" className="w-14 h-14 object-contain" />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800">Riky Pharma</h2>
                <p className="text-blue-600 text-xs tracking-wide">Since 2017</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Order details */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ...springs.snappy }}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-8 border border-blue-100/40"
            >
              <h3 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wider">
                Order Summary
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-2 text-left"
              >
                {[
                  { label: 'Bill Number', value: order.billNumber, mono: true },
                  {
                    label: 'Date & Time',
                    value: new Date(order.date).toLocaleString('en-IN'),
                  },
                  {
                    label: 'Total Items',
                    value: String(order.items.reduce((s, i) => s + i.quantity, 0)),
                  },
                ].map(({ label, value, mono }) => (
                  <motion.div key={label} variants={staggerItem} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className={`font-semibold text-gray-700 ${mono ? 'font-mono' : ''}`}>
                      {value}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  variants={staggerItem}
                  className="flex justify-between pt-3 border-t border-gray-200/60"
                >
                  <span className="font-bold text-gray-800">Total Amount</span>
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ ...springs.bouncy, delay: 0.8 }}
                    className="font-bold text-green-600 text-2xl"
                  >
                    ₹{order.total.toFixed(2)}
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Thank you text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="text-gray-500 text-sm leading-relaxed mb-8"
          >
            We appreciate your trust in <strong className="text-gray-700">Riky Pharma</strong>. Your
            health is our priority. For queries: <strong className="text-gray-700">9789555188</strong>
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, ...springs.snappy }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <motion.button
              whileHover={btnHover}
              whileTap={btnTap}
              onClick={() => navigate('/home')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <Home className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Go to Home</span>
              <motion.div
                className="absolute inset-0 bg-white/15 skew-x-12 -translate-x-full"
                whileHover={{ translateX: '200%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/products')}
              className="flex-1 bg-white border-2 border-gray-200 text-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Browse Products
            </motion.button>
          </motion.div>

          {/* Star rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="pt-6 border-t border-gray-100"
          >
            <StarRating />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
