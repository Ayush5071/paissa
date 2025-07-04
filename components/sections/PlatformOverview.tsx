'use client'

import { motion } from 'framer-motion'
import { Receipt, PieChart, Target, TrendingUp, Plus, Edit3, Trash2, BarChart3, Eye, AlertCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const platforms = [
  {
    title: "Transaction Tracking",
    description: "Start your financial journey with basic transaction management and monthly expense visualization.",
    icon: <Receipt className="w-8 h-8" />,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-500/10 to-emerald-500/10",
    features: [
      "Add/Edit/Delete transactions",
      "Monthly expense charts",
      "Transaction list view",
      "Basic form validation"
    ],
    stage: "Stage 1",
    status: "Basic"
  },
  {
    title: "Category Management",
    description: "Organize your expenses with predefined categories and gain insights through visual analytics.",
    icon: <PieChart className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    features: [
      "Predefined categories",
      "Category-wise pie charts",
      "Summary dashboard",
      "Recent transactions"
    ],
    stage: "Stage 2",
    status: "Enhanced"
  },
  {
    title: "Budget Planning",
    description: "Set monthly budgets, track your spending against goals, and receive intelligent insights.",
    icon: <Target className="w-8 h-8" />,
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-500/10 to-pink-500/10",
    features: [
      "Monthly budget setting",
      "Budget vs actual charts",
      "Spending insights",
      "Goal achievement"
    ],
    stage: "Stage 3",
    status: "Advanced"
  }
]

export default function PlatformOverview() {
  const { theme } = useTheme()
  
  return (
    <section className={`w-full py-20 px-4 md:px-8 flex flex-col items-center relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.04),transparent_70%)]'
      }`}></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className={`h-full w-full ${
          theme === 'dark'
            ? 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
        } bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]`}></div>
      </div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-lg border rounded-full text-sm mb-6 ${
              theme === 'dark' 
                ? 'bg-white/10 border-white/20 text-zinc-300' 
                : 'bg-black/10 border-black/20 text-gray-600'
            }`}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Progressive Financial Platform</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-6xl font-extrabold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Three Stages of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
              Financial Mastery
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
            }`}
          >
            Start simple, grow sophisticated. Each stage builds upon the last to create a 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-semibold"> comprehensive financial ecosystem</span>.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative p-8 bg-gradient-to-br ${platform.bgColor} backdrop-blur-lg border rounded-2xl transition-all duration-500 shadow-xl cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/10 hover:border-white/20'
                  : 'border-black/10 hover:border-black/20'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 bg-gradient-to-br ${platform.color}/20 border rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                    theme === 'dark' ? 'border-white/20' : 'border-black/20'
                  }`}>
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${platform.color}`}>
                      {platform.icon}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs mb-1 ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                    }`}>{platform.stage}</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${platform.color}/20 border ${
                      theme === 'dark' 
                        ? 'text-white border-white/20' 
                        : 'text-gray-900 border-black/20'
                    }`}>
                      {platform.status}
                    </span>
                  </div>
                </div>

                <h3 className={`text-2xl md:text-3xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-white group-hover:from-white group-hover:to-blue-200' 
                    : 'text-gray-900 group-hover:from-gray-900 group-hover:to-blue-600'
                }`}>
                  {platform.title}
                </h3>
                
                <p className={`text-base leading-relaxed transition-colors duration-300 mb-6 ${
                  theme === 'dark' 
                    ? 'text-zinc-300 group-hover:text-zinc-200' 
                    : 'text-gray-600 group-hover:text-gray-500'
                }`}>
                  {platform.description}
                </p>

                <div className="space-y-3 mb-6">
                  {platform.features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (idx * 0.05) }}
                      className={`flex items-center gap-3 p-3 border rounded-xl transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 hover:bg-white/10'
                          : 'bg-black/5 border-black/10 hover:bg-black/10'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color} flex-shrink-0`} />
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'text-zinc-200 group-hover:text-zinc-100' 
                          : 'text-gray-700 group-hover:text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <button 
                    className={`w-full py-4 px-6 bg-gradient-to-r ${platform.color} text-white font-bold rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    Explore {platform.stage}
                    <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <div className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Progressive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Learning Path
              </span>
            </h3>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Start with basic transaction tracking, evolve to category management, and master advanced budgeting.
              <br className="hidden md:block" />
              Each stage prepares you for the next, creating a 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold"> seamless financial growth journey</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
