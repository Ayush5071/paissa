'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Tag, TrendingUp } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CategoryChartProps {
  refreshKey: number
}

interface CategoryData {
  category: string
  amount: number
  count: number
  percentage: number
}

export default function CategoryChart({ refreshKey }: CategoryChartProps) {
  const { theme } = useTheme()
  const [data, setData] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCategoryData()
  }, [refreshKey])

  const fetchCategoryData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/analytics/categories')
      const result = await response.json()
      
      if (response.ok && result.success !== false) {
        setData(Array.isArray(result.data) ? result.data : [])
      } else {
        console.error('Category chart API error:', result)
        setData([])
      }
    } catch (error) {
      console.error('Error fetching category data:', error)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  const colors = [
    'rgb(59, 130, 246)', // Blue
    'rgb(34, 197, 94)',  // Green
    'rgb(251, 191, 36)', // Yellow
    'rgb(239, 68, 68)',  // Red
    'rgb(147, 51, 234)', // Purple
    'rgb(236, 72, 153)', // Pink
    'rgb(20, 184, 166)', // Teal
    'rgb(245, 101, 101)', // Orange
    'rgb(156, 163, 175)', // Gray
    'rgb(99, 102, 241)',  // Indigo
  ]

  const chartData = {
    labels: (data || []).map(item => item.category),
    datasets: [
      {
        data: (data || []).map(item => item.amount),
        backgroundColor: colors.slice(0, (data || []).length).map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
        borderColor: colors.slice(0, (data || []).length),
        borderWidth: 2,
        hoverBackgroundColor: colors.slice(0, (data || []).length),
        hoverBorderWidth: 3,
      },
    ],
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create a custom legend
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        titleColor: theme === 'dark' ? '#ffffff' : '#374151',
        bodyColor: theme === 'dark' ? '#ffffff' : '#374151',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed || 0
            const dataset = context.dataset.data as number[]
            const total = dataset.reduce((sum, val) => sum + val, 0)
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0'
            return `${label}: $${value.toFixed(2)} (${percentage}%)`
          }
        }
      },
    },
    interaction: {
      intersect: false,
    },
  }

  const totalAmount = (data || []).reduce((sum, item) => sum + item.amount, 0)

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
            <PieChart className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Category Breakdown
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Expense distribution by category
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium">
              {(data || []).length} categories
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>        ) : (data || []).length === 0 ? (
        <div className={`flex flex-col items-center justify-center h-64 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <PieChart className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No data available</p>
          <p className="text-sm">Add some transactions to see category breakdown</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="h-64">
            <Pie data={chartData} options={options} />
          </div>

          {/* Custom Legend */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Categories
              </h4>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total: ${totalAmount.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {(data || []).map((item, index) => (
                <div key={item.category} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-4 h-4 rounded-full`}
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <div>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.category || 'Unknown'}
                      </p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {(item.count || 0)} transaction{(item.count || 0) !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${(item.amount || 0).toFixed(2)}
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {(item.percentage || 0).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Category Highlight */}        {(data || []).length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Top Category
                </p>
                <p className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {(data || [])[0]?.category}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Amount
              </p>
              <p className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${(data || [])[0]?.amount?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
