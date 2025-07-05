'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, TrendingDown, AlertTriangle, Calendar, Edit2, Trash2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface BudgetListProps {
  refreshKey: number
  onBudgetUpdate: () => void
}

interface BudgetData {
  _id: string
  category: string
  amount: number
  spent: number
  remaining: number
  percentageUsed: number
  isOverBudget: boolean
  month: number
  year: number
}

export default function BudgetList({ refreshKey, onBudgetUpdate }: BudgetListProps) {
  const { theme } = useTheme()
  const [budgets, setBudgets] = useState<BudgetData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchBudgets()
  }, [refreshKey, selectedMonth, selectedYear])

  const fetchBudgets = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/budgets?month=${selectedMonth}&year=${selectedYear}`)
      const result = await response.json()
      
      if (response.ok && result.success !== false) {
        setBudgets(Array.isArray(result.data) ? result.data : [])
      } else {
        console.error('Budgets API error:', result)
        setBudgets([])
      }
    } catch (error) {
      console.error('Error fetching budgets:', error)
      setBudgets([])
    } finally {
      setIsLoading(false)
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getProgressColor = (percentage: number, isOverBudget: boolean) => {
    if (isOverBudget) return 'bg-red-500'
    if (percentage > 80) return 'bg-yellow-500'
    if (percentage > 60) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStatusIcon = (budget: BudgetData) => {
    if (budget.isOverBudget) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />
    }
    if (budget.percentageUsed > 80) {
      return <TrendingUp className="w-4 h-4 text-yellow-500" />
    }
    return <TrendingDown className="w-4 h-4 text-green-500" />
  }

  if (isLoading) {
    return (
      <div className={`${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-2xl p-6 shadow-lg border ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-2xl p-6 shadow-lg border ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Monthly Budgets
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Track your spending against budgets
            </p>
          </div>
        </div>
        
        {/* Month/Year Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            title="Select month"
            className={`px-3 py-1 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            title="Enter year"
            className={`px-3 py-1 rounded-lg border w-20 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
          />
        </div>
      </div>

      {budgets.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-12 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Target className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No budgets set</p>
          <p className="text-sm text-center">
            Set your first budget to start tracking your spending
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => (
            <motion.div
              key={budget._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-gray-800/50' 
                  : 'border-gray-200 bg-gray-50'
              } hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(budget)}
                  <div>
                    <h4 className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {budget.category}
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      ${budget.spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    budget.isOverBudget ? 'text-red-500' : 
                    budget.percentageUsed > 80 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {budget.percentageUsed.toFixed(0)}%
                  </span>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {budget.isOverBudget ? 'Over' : 'Used'}
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className={`w-full bg-gray-200 rounded-full h-2 mb-2 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getProgressColor(budget.percentageUsed, budget.isOverBudget)
                  }`}
                  data-width={Math.min(budget.percentageUsed, 100)}
                  style={{ width: `${Math.min(budget.percentageUsed, 100)}%` }}
                ></div>
              </div>
              
              {/* Remaining/Over Budget Info */}
              <div className="flex justify-between items-center text-sm">
                <span className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {budget.isOverBudget ? 'Over budget:' : 'Remaining:'}
                </span>
                <span className={`font-medium ${
                  budget.isOverBudget ? 'text-red-500' : 'text-green-500'
                }`}>
                  ${Math.abs(budget.remaining).toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary */}
      {budgets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 pt-6 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Budget
              </p>
              <p className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${budgets.reduce((sum, budget) => sum + budget.amount, 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Spent
              </p>
              <p className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${budgets.reduce((sum, budget) => sum + budget.spent, 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Remaining
              </p>
              <p className={`text-lg font-semibold ${
                budgets.reduce((sum, budget) => sum + budget.remaining, 0) >= 0 
                  ? 'text-green-500' : 'text-red-500'
              }`}>
                ${budgets.reduce((sum, budget) => sum + budget.remaining, 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Over Budget
              </p>
              <p className={`text-lg font-semibold ${
                budgets.filter(b => b.isOverBudget).length > 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                {budgets.filter(b => b.isOverBudget).length}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
