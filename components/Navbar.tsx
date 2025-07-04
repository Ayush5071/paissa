'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'
import { DollarSign, Menu, X, Home, BarChart3, Target, Info, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'

const navItems = [
  { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
  { name: 'Tracking', href: '/tracking', icon: <BarChart3 className="w-4 h-4" /> },
  { name: 'Budgets', href: '/budgets', icon: <Target className="w-4 h-4" /> },
  { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/80 backdrop-blur-xl border-b border-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Paissa</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-2 px-4 py-2 transition-all duration-300 rounded-xl backdrop-blur-sm ${
                    theme === 'dark'
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-black/10'
                  }`}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 backdrop-blur-lg border rounded-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
                  : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20 hover:border-black/30'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 backdrop-blur-lg border rounded-xl transition-all duration-300 font-medium ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
                  : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20 hover:border-black/30'
              }`}
            >
              Contact Us
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg"
            >
              Try Demo
            </motion.button>
          </div>

          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 backdrop-blur-lg border rounded-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b ${
            theme === 'dark'
              ? 'bg-black/90 border-white/10'
              : 'bg-white/90 border-black/10'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-black/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
            <div className={`flex flex-col gap-3 pt-4 border-t ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <button 
                onClick={toggleTheme}
                className={`w-full px-4 py-3 backdrop-blur-lg border rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button className={`w-full px-4 py-3 backdrop-blur-lg border rounded-xl transition-all duration-300 font-medium ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
              }`}>
                Contact Us
              </button>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium">
                Try Demo
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
