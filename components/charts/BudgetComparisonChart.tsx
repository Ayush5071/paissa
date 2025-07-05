'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Target, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
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

interface BudgetComparisonChartProps {
  refreshKey: number
}

interface ComparisonData {
  category: string
  budgeted: number
  actual: number
  remaining: number
  percentageUsed: number
  isOverBudget: boolean
  variance: number
}

interface BudgetAnalytics {
  comparison: ComparisonData[]
  summary: {
    totalBudgeted: number
    totalActual: number
    totalRemaining: number
    overallPercentage: number
    isOverBudget: boolean
  }
  insights: {
    overBudgetCategories: number
    underBudgetCategories: number
    unusedCategories: number
    topOverspending: ComparisonData[]
    topUnderspending: ComparisonData[]
  }
}

export default function BudgetComparisonChart({ refreshKey }: BudgetComparisonChartProps) {
  const { theme } = useTheme()
  const [data, setData] = useState<BudgetAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchBudgetComparison()
  }, [refreshKey, selectedMonth, selectedYear])

  const fetchBudgetComparison = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/analytics/budgets?month=${selectedMonth}&year=${selectedYear}`)
      const result = await response.json()
      
      if (response.ok && result.success !== false) {
        setData(result.data)
      } else {
        console.error('Budget comparison API error:', result)
        setData(null)
      }
    } catch (error) {
      console.error('Error fetching budget comparison:', error)
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const chartData = {
    labels: (data?.comparison || []).map(item => item.category),
    datasets: [
      {
        label: 'Budgeted',
        data: (data?.comparison || []).map(item => item.budgeted),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: 'Actual',
        data: (data?.comparison || []).map(item => item.actual),
        backgroundColor: (data?.comparison || []).map(item => 
          item.isOverBudget ? 'rgba(239, 68, 68, 0.7)' : 'rgba(34, 197, 94, 0.7)'
        ),
        borderColor: (data?.comparison || []).map(item => 
          item.isOverBudget ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
        ),
        borderWidth: 2,
        borderRadius: 4,
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
          color: theme === 'dark' ? '#ffffff' : '#374151',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
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
          afterBody: function(context) {
            if (context.length > 0) {
              const dataIndex = context[0].dataIndex
              const item = data?.comparison[dataIndex]
              if (item) {
                const variance = item.variance
                const status = item.isOverBudget ? 'Over by' : 'Under by'
                return `${status}: $${Math.abs(variance).toFixed(2)}`
              }
            }
            return []
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          callback: function(value) {
            return '$' + value
          },
        },
      },
    },
    interaction: {
      intersect: false,
    },
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
      transition={{ duration: 0.6, delay: 0.2 }}
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
              Budget vs Actual
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Compare budgeted vs actual spending
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

      {!data || data.comparison.length === 0 ? (
        <div className={`flex flex-col items-center justify-center h-64 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No budget data available</p>
          <p className="text-sm text-center">
            Set budgets and track spending to see comparisons
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-80">
            <Bar data={chartData} options={options} />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Budget
                </span>
              </div>
              <p className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${data.summary.totalBudgeted.toFixed(2)}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Spent
                </span>
              </div>
              <p className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${data.summary.totalActual.toFixed(2)}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className={`w-4 h-4 ${
                  data.summary.totalRemaining >= 0 ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {data.summary.totalRemaining >= 0 ? 'Remaining' : 'Over Budget'}
                </span>
              </div>
              <p className={`text-xl font-bold ${
                data.summary.totalRemaining >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                ${Math.abs(data.summary.totalRemaining).toFixed(2)}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-4 h-4 ${
                  data.insights.overBudgetCategories > 0 ? 'text-red-500' : 'text-green-500'
                }`} />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Over Budget
                </span>
              </div>
              <p className={`text-xl font-bold ${
                data.insights.overBudgetCategories > 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                {data.insights.overBudgetCategories}
              </p>
            </div>
          </div>

          {/* Insights */}
          {(data.insights.topOverspending.length > 0 || data.insights.topUnderspending.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Overspending */}
              {data.insights.topOverspending.length > 0 && (
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'
                } border`}>
                  <h4 className={`font-semibold mb-3 ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-700'
                  }`}>
                    Top Overspending Categories
                  </h4>
                  <div className="space-y-2">
                    {data.insights.topOverspending.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-red-300' : 'text-red-600'
                        }`}>
                          {item.category}
                        </span>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-red-400' : 'text-red-700'
                        }`}>
                          +${Math.abs(item.variance).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Underspending */}
              {data.insights.topUnderspending.length > 0 && (
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
                } border`}>
                  <h4 className={`font-semibold mb-3 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-700'
                  }`}>
                    Top Underspending Categories
                  </h4>
                  <div className="space-y-2">
                    {data.insights.topUnderspending.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-green-300' : 'text-green-600'
                        }`}>
                          {item.category}
                        </span>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-green-400' : 'text-green-700'
                        }`}>
                          -${Math.abs(item.variance).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
