import { useState, useId } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, User } from 'lucide-react';
import logoImage from '../../imports/Screenshot_2026-04-05_232705.png';
import {
  staggerContainer,
  staggerItem,
  shakeVariants,
  btnHover,
  btnTap,
  springs,
} from '../utils/motionConfig';

interface LoginPageProps {
  onLogin: (name: string, mobile: string) => void;
}

function FloatingLabelInput({
  id,
  label,
  type,
  value,
  onChange,
  icon: Icon,
  maxLength,
  error,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ElementType;
  maxLength?: number;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  return (
    <motion.div
      variants={shakeVariants}
      animate={error ? 'shake' : 'idle'}
      className="relative"
    >
      <div className="relative">
        {/* Floating label */}
        <motion.label
          htmlFor={id}
          animate={{
            top: isFloated ? '8px' : '50%',
            fontSize: isFloated ? '11px' : '15px',
            color: focused
              ? 'rgb(59 130 246)'
              : error
              ? 'rgb(239 68 68)'
              : isFloated
              ? 'rgb(107 114 128)'
              : 'rgb(156 163 175)',
            y: isFloated ? 0 : '-50%',
          }}
          transition={{ ...springs.swift, duration: 0.18 }}
          className="absolute left-12 pointer-events-none font-medium z-10 leading-none"
        >
          {label}
        </motion.label>

        {/* Icon */}
        <motion.div
          animate={{ color: focused ? 'rgb(59 130 246)' : error ? 'rgb(239 68 68)' : 'rgb(156 163 175)' }}
          transition={{ duration: 0.2 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        >
          <Icon className="w-5 h-5" />
        </motion.div>

        {/* Input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full pl-12 pr-4 pt-6 pb-2 rounded-xl border-2 transition-all duration-200 bg-white/50 outline-none text-gray-800 ${
            error
              ? 'border-red-400 bg-red-50/30'
              : focused
              ? 'border-blue-500 bg-white shadow-[0_0_0_4px_rgba(59,130,246,0.12)]'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        />
      </div>

      {/* Error message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.18 }}
            className="text-red-500 text-xs mt-1.5 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameId = useId();
  const mobileId = useId();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { name?: string; mobile?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Tiny artificial delay for submit animation feel
    await new Promise(r => setTimeout(r, 400));
    onLogin(name, mobile);
    navigate('/home');
  };

  return (
    <div className="size-full min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.gentle, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...springs.bouncy, delay: 0.15 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 24px 48px rgba(37,99,235,0.25)' }}
              transition={springs.snappy}
              className="flex items-center justify-center gap-4 bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6 rounded-3xl shadow-2xl"
            >
              <motion.img
                src={logoImage}
                alt="Riky Pharma Logo"
                className="w-20 h-20 object-contain"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              />
              <div className="text-left">
                <h2 className="text-4xl font-bold text-white">Riky Pharma</h2>
                <p className="text-blue-100 text-sm tracking-wide">Since 2017</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to continue your pharmacy journey</p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <motion.div variants={staggerItem}>
              <FloatingLabelInput
                id={nameId}
                label="Full Name"
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                }}
                icon={User}
                error={errors.name}
              />
            </motion.div>

            <motion.div variants={staggerItem}>
              <FloatingLabelInput
                id={mobileId}
                label="Mobile Number"
                type="tel"
                value={mobile}
                onChange={e => {
                  setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                  if (errors.mobile) setErrors(prev => ({ ...prev, mobile: undefined }));
                }}
                icon={Phone}
                maxLength={10}
                error={errors.mobile}
              />
            </motion.div>

            {/* Submit button */}
            <motion.div variants={staggerItem}>
              <motion.button
                type="submit"
                whileHover={!isSubmitting ? btnHover : {}}
                whileTap={!isSubmitting ? btnTap : {}}
                disabled={isSubmitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-80"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Continue
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full"
                  whileHover={{ translateX: '200%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-gray-400 text-xs mt-6"
          >
            Your trusted pharmaceutical partner since 2017
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
