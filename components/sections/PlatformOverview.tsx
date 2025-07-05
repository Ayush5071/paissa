'use client'

import { motion } from 'framer-motion'
import { Receipt, PieChart, Target, TrendingUp, Plus, Edit3, Trash2, BarChart3, Eye, AlertCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

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
    description: "Master advanced budgeting with AI-powered insights, budget vs actual tracking, and intelligent spending recommendations.",
    icon: <Target className="w-8 h-8" />,
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-500/10 to-pink-500/10",
    features: [
      "Monthly budget setting",
      "Budget vs actual charts",
      "AI-powered insights",
      "Spending recommendations"
    ],
    stage: "Stage 3",
    status: "Available"
  }
]

const platformFeatures = [
  [
    { icon: <Plus className="w-5 h-5" />, text: "Add new transactions" },
    { icon: <Edit3 className="w-5 h-5" />, text: "Edit existing records" },
    { icon: <Trash2 className="w-5 h-5" />, text: "Delete unwanted entries" },
    { icon: <BarChart3 className="w-5 h-5" />, text: "Monthly expense charts" },
    { icon: <Eye className="w-5 h-5" />, text: "Transaction list view" },
    { icon: <AlertCircle className="w-5 h-5" />, text: "Form validation" }
  ],
  [
    { icon: <PieChart className="w-5 h-5" />, text: "Category pie charts" },
    { icon: <Receipt className="w-5 h-5" />, text: "Predefined categories" },
    { icon: <BarChart3 className="w-5 h-5" />, text: "Dashboard summary" },
    { icon: <Eye className="w-5 h-5" />, text: "Recent transactions" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Category analytics" },
    { icon: <Target className="w-5 h-5" />, text: "Spending insights" }
  ],
  [
    { icon: <Target className="w-5 h-5" />, text: "Set monthly budgets" },
    { icon: <BarChart3 className="w-5 h-5" />, text: "Budget vs actual charts" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "AI-powered insights" },
    { icon: <AlertCircle className="w-5 h-5" />, text: "Smart recommendations" },
    { icon: <Eye className="w-5 h-5" />, text: "Spending analysis" },
    { icon: <PieChart className="w-5 h-5" />, text: "Budget comparisons" }
  ]
]

export default function PlatformOverview() {
  const { theme } = useTheme()
  
  return (
    <section className={`w-full py-24 px-4 md:px-8 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Three-Stage{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Financial Platform
            </span>
          </h2>
          <p className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto ${
            theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
          }`}>
            Progress through carefully designed stages, from basic transaction tracking to advanced budgeting and insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 hover:border-gray-300/50'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${platform.color} text-white shadow-lg`}>
                    {platform.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      platform.status === 'Basic' 
                        ? 'bg-green-100 text-green-700' 
                        : platform.status === 'Enhanced'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {platform.stage}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {platform.status}
                    </span>
                  </div>
                </div>

                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {platform.title}
                </h3>

                <p className={`text-base leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  {platform.description}
                </p>

                <div className="grid grid-cols-1 gap-3 mb-8">
                  {platformFeatures[index]?.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-gray-800/50 hover:bg-gray-700/50'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color} text-white`}>
                        {feature.icon}
                      </div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8"
                >
                  {platform.stage === "Stage 1" || platform.stage === "Stage 2" ? (
                    <Link href="/dashboard">
                      <button 
                        className={`w-full py-4 px-6 bg-gradient-to-r ${platform.color} text-white font-bold rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        Explore {platform.stage}
                        <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  ) : platform.stage === "Stage 3" ? (
                    <Link href="/budgets">
                      <button 
                        className={`w-full py-4 px-6 bg-gradient-to-r ${platform.color} text-white font-bold rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        Explore {platform.stage}
                        <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  ) : (
                    <button 
                      className={`w-full py-4 px-6 bg-gradient-to-r ${platform.color} text-white font-bold rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 opacity-75 cursor-not-allowed`}
                      disabled
                    >
                      Coming Soon
                      <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}
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
          <div className={`p-8 backdrop-blur-lg border rounded-2xl shadow-xl max-w-4xl mx-auto ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-black/5 border-black/10'
          }`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Progressive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Learning Path
              </span>
            </h3>
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
            }`}>
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
