'use client'

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, PieChart, Target } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function HeroSection() {
  const { theme } = useTheme()
  return (
    <section className={`w-full min-h-screen pt-20 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
        : 'bg-gradient-to-br from-white via-gray-50 to-white'
    }`}>
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]'
      }`}></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className={`h-full w-full ${
          theme === 'dark'
            ? 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
        } bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]`}></div>
      </div>

      <div className="w-full max-w-7xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`inline-flex items-center gap-2 px-4 py-2 ${
            theme === 'dark' 
              ? 'bg-white/10 backdrop-blur-lg border border-white/20 text-zinc-300' 
              : 'bg-black/10 backdrop-blur-lg border border-black/20 text-gray-600'
          } rounded-full text-sm mb-8`}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Smart Financial Management</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Take Control of Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
            Finances
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 font-medium leading-relaxed ${
            theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
          }`}
        >
          Track expenses, manage budgets, and gain insights into your spending habits with our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-semibold">
            intelligent financial platform
          </span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg"
          >
            <DollarSign className="w-6 h-6" />
            Start Tracking
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 backdrop-blur-lg border font-bold rounded-xl transition-all duration-300 flex items-center gap-3 text-lg ${
              theme === 'dark'
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
            }`}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: TrendingUp, title: "Smart Analytics", desc: "Track spending patterns" },
            { icon: PieChart, title: "Visual Insights", desc: "Beautiful charts & graphs" },
            { icon: Target, title: "Budget Goals", desc: "Set and achieve targets" }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className={`p-6 backdrop-blur-lg border rounded-xl transition-all duration-300 group ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-black/5 border-black/10 hover:bg-black/10'
              }`}
            >
              <feature.icon className="w-8 h-8 text-green-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{feature.title}</h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
              }`}>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
