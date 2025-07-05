'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, Brain, BarChart3, TrendingUp } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'
import BudgetForm from '@/components/budgets/BudgetForm'
import BudgetList from '@/components/budgets/BudgetList'
import BudgetComparisonChart from '@/components/charts/BudgetComparisonChart'
import BudgetInsights from '@/components/insights/BudgetInsights'

export default function BudgetDashboard() {
  const { theme } = useTheme()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleBudgetUpdate = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <div>
              <h1 className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Budget Management
              </h1>
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Set budgets, track spending, and get AI-powered insights
              </p>
            </div>
          </div>
          
          <BudgetForm onBudgetCreated={handleBudgetUpdate} />
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <BudgetList refreshKey={refreshKey} onBudgetUpdate={handleBudgetUpdate} />
          </motion.div>

          {/* Budget Comparison Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BudgetComparisonChart refreshKey={refreshKey} />
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <BudgetInsights refreshKey={refreshKey} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className={`${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } rounded-2xl p-6 shadow-lg border ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/dashboard"
                className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 hover:bg-gray-800' 
                    : 'border-gray-200 hover:bg-gray-50'
                } transition-colors group`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                  } group-hover:scale-110 transition-transform`}>
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Analytics
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      View reports
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/dashboard/transactions"
                className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 hover:bg-gray-800' 
                    : 'border-gray-200 hover:bg-gray-50'
                } transition-colors group`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
                  } group-hover:scale-110 transition-transform`}>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Transactions
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Add/Edit
                    </p>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => window.location.reload()}
                className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 hover:bg-gray-800' 
                    : 'border-gray-200 hover:bg-gray-50'
                } transition-colors group text-left`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                  } group-hover:scale-110 transition-transform`}>
                    <Brain className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Refresh AI
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Update insights
                    </p>
                  </div>
                </div>
              </button>

              <div className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-gray-800/50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100'
                  }`}>
                    <Target className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Budget Goal
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      80% utilization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
