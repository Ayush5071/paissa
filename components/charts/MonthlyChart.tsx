'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface MonthlyChartProps {
  refreshKey: number
}

interface MonthlyData {
  month: string
  income: number
  expense: number
  net: number
}

export default function MonthlyChart({ refreshKey }: MonthlyChartProps) {
  const { theme } = useTheme()
  const [data, setData] = useState<MonthlyData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMonthlyData()
  }, [refreshKey])

  const fetchMonthlyData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/analytics/monthly')
      const result = await response.json()
      
      if (response.ok && result.success !== false) {
        setData(Array.isArray(result.data) ? result.data : [])
      } else {
        console.error('Monthly chart API error:', result)
        setData([])
      }
    } catch (error) {
      console.error('Error fetching monthly data:', error)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  const chartData = {
    labels: (data || []).map(item => item.month),
    datasets: [
      {
        label: 'Income',
        data: (data || []).map(item => item.income),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Expense',
        data: (data || []).map(item => item.expense),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          color: theme === 'dark' ? '#ffffff' : '#374151',
          font: {
            size: 12,
            weight: 500,
          },
        },
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
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: {
            size: 11,
          },
          callback: function(value) {
            return '$' + value
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  // Calculate totals
  const totalIncome = (data || []).reduce((sum, item) => sum + item.income, 0)
  const totalExpense = (data || []).reduce((sum, item) => sum + item.expense, 0)
  const trend = totalIncome >= totalExpense ? 'positive' : 'negative'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
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
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Monthly Overview
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Income vs Expense trends
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            trend === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {trend === 'positive' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {trend === 'positive' ? 'Positive' : 'Negative'}
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : data.length === 0 ? (
        <div className={`flex flex-col items-center justify-center h-64 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No data available</p>
          <p className="text-sm">Add some transactions to see monthly trends</p>
        </div>
      ) : (
        <div className="h-64">
          <Bar data={chartData} options={options} />
        </div>
      )}

      {/* Summary Stats */}
      {data.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Income
              </p>
              <p className="text-lg font-semibold text-green-500">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Expense
              </p>
              <p className="text-lg font-semibold text-red-500">
                ${totalExpense.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Net Balance
              </p>
              <p className={`text-lg font-semibold ${
                totalIncome >= totalExpense ? 'text-green-500' : 'text-red-500'
              }`}>
                ${(totalIncome - totalExpense).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
