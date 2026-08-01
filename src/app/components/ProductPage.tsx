import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Minus, ShoppingCart, ArrowLeft, Package, Filter } from 'lucide-react';
import { CartItem } from '../App';
import { products } from './productsData';
import {
  springs,
  btnHover,
  btnTap,
  scaleIn,
  staggerContainer,
  staggerItem,
  floatAnimation,
} from '../utils/motionConfig';

interface ProductPageProps {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
}

function ProductImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
      {/* Skeleton shimmer while loading */}
      <AnimatePresence>
        {!loaded && !errored && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 skeleton"
          />
        )}
      </AnimatePresence>

      {!errored && (
        <motion.img
          src={src}
          alt={alt}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          whileHover={{ scale: 1.06 }}
        />
      )}

      {errored && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-16 h-16 text-blue-400/60" />
        </div>
      )}

      {/* Category badge */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, ...springs.snappy }}
        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-sm"
      >
        {category}
      </motion.div>
    </div>
  );
}

export default function ProductPage({ cart, addToCart, removeFromCart }: ProductPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = ['All', 'Tablet', 'Capsule', 'Syrup', 'Gel', 'Sachet'];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.composition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getQuantityInCart = useCallback(
    (productId: string) => {
      const item = cart.find(cartItem => cartItem.id === productId);
      return item ? item.quantity : 0;
    },
    [cart]
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="size-full min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.snappy}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.08, x: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
              whileTap={btnTap}
              transition={springs.swift}
              onClick={() => navigate('/home')}
              className="bg-white/70 backdrop-blur-lg rounded-full p-3 shadow-md border border-white/30 hover:bg-white/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
              <motion.p
                key={filteredProducts.length}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-500 mt-0.5 text-sm"
              >
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
              </motion.p>
            </div>
          </div>

          {/* Cart Button */}
          <motion.button
            whileHover={btnHover}
            whileTap={btnTap}
            onClick={() => navigate('/cart')}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 relative overflow-hidden"
          >
            <ShoppingCart className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View Cart</span>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  variants={scaleIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md z-20"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ...springs.snappy }}
          className="mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ color: searchFocused ? 'rgb(59 130 246)' : 'rgb(156 163 175)' }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <Search className="w-5 h-5" />
            </motion.div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search medicines by name or composition…"
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-200 bg-white/70 backdrop-blur-lg shadow-md outline-none text-gray-800 ${
                searchFocused
                  ? 'border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] bg-white'
                  : 'border-transparent hover:border-gray-200'
              }`}
            />
            {/* Clear button */}
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  key="clear"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={springs.swift}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...springs.snappy }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-600 text-sm">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={springs.swift}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-2 rounded-xl font-medium text-sm transition-colors overflow-hidden ${
                  selectedCategory === category
                    ? 'text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-white shadow-sm border border-white/40'
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="category-highlight"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl"
                    transition={{ ...springs.snappy }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const quantity = getQuantityInCart(product.id);
              return (
                <motion.div
                  key={product.id}
                  layout
                  variants={{
                    initial: { opacity: 0, scale: 0.9, y: 16 },
                    animate: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { ...springs.snappy, delay: Math.min(index * 0.04, 0.3) },
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                  transition={springs.snappy}
                  className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-2xl transition-shadow overflow-hidden border border-white/30 flex flex-col"
                >
                  <ProductImage src={product.image} alt={product.name} category={product.category} />

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 leading-tight">{product.name}</h3>
                    <p className="text-gray-500 text-xs mb-2 line-clamp-2 leading-relaxed">
                      {product.composition}
                    </p>
                    <p className="text-gray-400 text-xs mb-3 line-clamp-1">{product.description}</p>

                    {/* Price */}
                    <div className="mb-4 mt-auto">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold text-green-600">₹{product.pricePerStrip}</span>
                        <span className="text-gray-400 text-xs">per strip</span>
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {product.stripSize}{' '}
                        {product.category === 'Tablet'
                          ? 'tablets'
                          : product.category === 'Capsule'
                          ? 'capsules'
                          : 'unit'}{' '}
                        · MRP: ₹{product.mrp}
                      </div>
                    </div>

                    {/* Cart Controls */}
                    <AnimatePresence mode="wait">
                      {quantity === 0 ? (
                        <motion.button
                          key="add"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={springs.swift}
                          whileHover={btnHover}
                          whileTap={btnTap}
                          onClick={() => addToCart(product)}
                          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 text-sm relative overflow-hidden"
                        >
                          <Plus className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">Add to Cart</span>
                        </motion.button>
                      ) : (
                        <motion.div
                          key="controls"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={springs.bouncy}
                          className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-1"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                            whileTap={{ scale: 0.9 }}
                            transition={springs.swift}
                            onClick={() => removeFromCart(product.id)}
                            className="bg-white text-blue-600 p-2 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>

                          <motion.span
                            key={quantity}
                            initial={{ scale: 1.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={springs.bouncy}
                            className="text-white font-bold text-base px-4"
                          >
                            {quantity}
                          </motion.span>

                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                            whileTap={{ scale: 0.9 }}
                            transition={springs.swift}
                            onClick={() => addToCart(product)}
                            className="bg-white text-green-600 p-2 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center py-24"
            >
              <motion.div
                variants={floatAnimation}
                animate="animate"
                className="inline-block mb-6"
              >
                <Package className="w-20 h-20 text-gray-300" />
              </motion.div>
              <h3 className="text-gray-600 text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter</p>
              <motion.button
                whileHover={btnHover}
                whileTap={btnTap}
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Clear filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
