'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, PieChart, Calendar, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

interface DashboardSummaryProps {
  refreshKey: number
}

interface SummaryData {
  totalIncome: number
  totalExpense: number
  balance: number
  transactionCount: number
  recentTransactions: Array<{
    _id: string
    amount: number
    description: string
    type: 'income' | 'expense'
    date: string
  }>
  topCategories: Array<{
    category: string
    amount: number
    count: number
  }>
}

export default function DashboardSummary({ refreshKey }: DashboardSummaryProps) {
  const { theme } = useTheme()
  const [data, setData] = useState<SummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSummaryData()
  }, [refreshKey])

  const fetchSummaryData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/analytics/dashboard')
      const result = await response.json()
      
      console.log('Frontend Dashboard API response:', result)
      
      if (response.ok && result.success !== false) {
        // Ensure all required fields exist with defaults
        const processedData = {
          totalIncome: result.totalIncome || 0,
          totalExpense: result.totalExpense || 0,
          balance: result.balance || 0,
          transactionCount: result.transactionCount || 0,
          recentTransactions: Array.isArray(result.recentTransactions) ? result.recentTransactions : [],
          topCategories: Array.isArray(result.topCategories) ? result.topCategories : []
        }
        console.log('Processed data:', processedData)
        setData(processedData)
      } else {
        console.error('API returned error:', result)
        // Set empty data to prevent crashes
        setData({
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
          transactionCount: 0,
          recentTransactions: [],
          topCategories: []
        })
      }
    } catch (error) {
      console.error('Error fetching summary data:', error)
      // Set empty data to prevent crashes
      setData({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactionCount: 0,
        recentTransactions: [],
        topCategories: []
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } rounded-2xl p-6 shadow-lg border ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!data) return null

  const summaryCards = [
    {
      title: 'Total Income',
      amount: data.totalIncome,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-500',
      bgColor: 'bg-green-100',
      prefix: '+$'
    },
    {
      title: 'Total Expense',
      amount: data.totalExpense,
      icon: <TrendingDown className="w-6 h-6" />,
      color: 'from-red-500 to-rose-600',
      textColor: 'text-red-500',
      bgColor: 'bg-red-100',
      prefix: '-$'
    },
    {
      title: 'Balance',
      amount: data.balance,
      icon: <DollarSign className="w-6 h-6" />,
      color: data.balance >= 0 ? 'from-blue-500 to-cyan-600' : 'from-red-500 to-rose-600',
      textColor: data.balance >= 0 ? 'text-blue-500' : 'text-red-500',
      bgColor: data.balance >= 0 ? 'bg-blue-100' : 'bg-red-100',
      prefix: '$'
    },
    {
      title: 'Transactions',
      amount: data.transactionCount,
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-500',
      bgColor: 'bg-purple-100',
      prefix: '',
      suffix: data.transactionCount === 1 ? ' transaction' : ' transactions'
    }
  ]

  return (
    <div className="space-y-8 mb-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            } rounded-2xl p-6 shadow-lg border ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            } relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' ? card.bgColor + '/20' : card.bgColor
              }`}>
                <div className={card.textColor}>
                  {card.icon}
                </div>
              </div>
              <div className={`opacity-30 ${card.textColor}`}>
                {card.title === 'Total Income' ? <ArrowUpRight className="w-5 h-5" /> : 
                 card.title === 'Total Expense' ? <ArrowDownRight className="w-5 h-5" /> : 
                 card.title === 'Balance' ? <DollarSign className="w-5 h-5" /> : 
                 <PieChart className="w-5 h-5" />}
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {card.title}
              </h3>
              <p className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {card.prefix}{typeof card.amount === 'number' ? card.amount.toFixed(2) : card.amount}{card.suffix || ''}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions & Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } rounded-2xl p-6 shadow-lg border ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Transactions
          </h3>
          
          <div className="space-y-3">
            {(data.recentTransactions?.length || 0) === 0 ? (
              <p className={`text-center py-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No recent transactions
              </p>
            ) : (
              (data.recentTransactions || []).map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'income' ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                    </div>
                    <div>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {transaction.description}
                      </p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } rounded-2xl p-6 shadow-lg border ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Top Categories
          </h3>
          
          <div className="space-y-3">
            {(data.topCategories?.length || 0) === 0 ? (
              <p className={`text-center py-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No category data available
              </p>
            ) : (
              (data.topCategories || []).map((category, index) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}></div>
                    <div>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category.category}
                      </p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {category.count} transaction{category.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${category.amount.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
          
          {/* Budget CTA */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/budgets"
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              } text-white font-medium transition-all duration-200 hover:shadow-lg`}
            >
              <Target className="w-4 h-4" />
              Set Budget Goals
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
