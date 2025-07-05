'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Lightbulb, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target, Sparkles } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface BudgetInsightsProps {
  refreshKey: number
}

interface BudgetSuggestion {
  category: string
  type: 'optimization' | 'overspending' | 'underspending' | 'general' | 'emergency' | 'savings'
  priority: 'critical' | 'high' | 'medium' | 'low'
  suggestedAmount: number
  reasoning: string
  confidence: 'very_high' | 'high' | 'medium' | 'low'
  potentialSavings: number
  timeframe?: 'immediate' | 'short_term' | 'long_term'
  actionItems?: string[]
  riskLevel?: 'high' | 'medium' | 'low'
}

interface CategoryAnalysis {
  category: string
  avgSpending: number
  trend: number
  volatility: number
}

interface InsightsData {
  suggestions: BudgetSuggestion[]
  analysisData: {
    categories: CategoryAnalysis[]
    summary: {
      totalCategories: number
      avgMonthlySpending: number
      budgetUtilization: number
    }
  }
}

export default function BudgetInsights({ refreshKey }: BudgetInsightsProps) {
  const { theme } = useTheme()
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchInsights()
  }, [refreshKey, selectedMonth, selectedYear])

  const fetchInsights = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/insights/budget-suggestions?month=${selectedMonth}&year=${selectedYear}`)
      const result = await response.json()
      
      if (response.ok && result.success !== false) {
        setInsights(result.data)
      } else {
        console.error('Budget insights API error:', result)
        setInsights(null)
      }
    } catch (error) {
      console.error('Error fetching budget insights:', error)
      setInsights(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'critical': return theme === 'dark' ? 'bg-red-600/30' : 'bg-red-200'
      case 'high': return theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'
      case 'medium': return theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100'
      case 'low': return theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
      default: return theme === 'dark' ? 'bg-gray-500/20' : 'bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'overspending': return <AlertCircle className="w-4 h-4" />
      case 'underspending': return <CheckCircle className="w-4 h-4" />
      case 'optimization': return <Target className="w-4 h-4" />
      case 'general': return <Lightbulb className="w-4 h-4" />
      case 'emergency': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'savings': return <TrendingUp className="w-4 h-4 text-green-500" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (isLoading) {
    return (
      <div className={`${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-2xl p-6 shadow-lg border ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-2xl p-6 shadow-lg border ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Brain className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              AI Budget Insights
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Smart recommendations based on your spending patterns
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
            } focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm`}
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
            } focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm`}
          />
        </div>
      </div>

      {!insights || insights.suggestions.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-12 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Brain className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No insights available</p>
          <p className="text-sm text-center">
            Add more transactions and budgets to get AI-powered insights
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Categories Analyzed
                </span>
              </div>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {insights.analysisData.summary.totalCategories}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Avg Monthly Spending
                </span>
              </div>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${insights.analysisData.summary.avgMonthlySpending.toFixed(0)}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Budget Utilization
                </span>
              </div>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {insights.analysisData.summary.budgetUtilization}%
              </p>
            </div>
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Recommendations
            </h4>
            
            {insights.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-gray-200 bg-gray-50'
                } hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getPriorityBg(suggestion.priority)}`}>
                    <div className={getPriorityColor(suggestion.priority)}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {suggestion.category}
                      </h5>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          getPriorityBg(suggestion.priority)
                        } ${getPriorityColor(suggestion.priority)}`}>
                          {suggestion.priority} priority
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {suggestion.confidence} confidence
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {suggestion.reasoning}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className={`text-xs ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Suggested Budget:
                          </span>
                          <span className={`ml-2 font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${suggestion.suggestedAmount.toFixed(2)}
                          </span>
                        </div>
                        
                        {suggestion.potentialSavings > 0 && (
                          <div>
                            <span className={`text-xs ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              Potential Savings:
                            </span>
                            <span className="ml-2 font-semibold text-green-500">
                              ${suggestion.potentialSavings.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <button className={`px-3 py-1 rounded-lg text-sm ${
                        theme === 'dark' 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                          : 'bg-purple-500 hover:bg-purple-600 text-white'
                      } transition-colors`}>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Category Analysis */}
          {insights.analysisData.categories.length > 0 && (
            <div className="space-y-4">
              <h4 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Category Analysis
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.analysisData.categories.map((category, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === 'dark' 
                        ? 'border-gray-700 bg-gray-800/30' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category.category}
                      </h5>
                      <div className="flex items-center gap-1">
                        {category.trend > 0.1 ? (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        ) : category.trend < -0.1 ? (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Avg Spending:
                        </span>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          ${category.avgSpending.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Volatility:
                        </span>
                        <span className={`text-sm font-medium ${
                          category.volatility > 0.3 ? 'text-red-500' : 
                          category.volatility > 0.1 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {category.volatility > 0.3 ? 'High' : 
                           category.volatility > 0.1 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
