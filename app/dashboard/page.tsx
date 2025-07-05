'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import TransactionForm from '@/components/transactions/TransactionForm'
import TransactionList from '@/components/transactions/TransactionList'
import DashboardSummary from '@/components/dashboard/DashboardSummary'
import MonthlyChart from '@/components/charts/MonthlyChart'
import CategoryChart from '@/components/charts/CategoryChart'
import { ITransaction } from '@/models/Transaction'

export default function DashboardPage() {
  const { theme } = useTheme()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTransactionSaved = () => {
    setRefreshKey(prev => prev + 1)
    setIsFormOpen(false)
    setEditingTransaction(null)
  }

  const handleEdit = (transaction: ITransaction) => {
    setEditingTransaction(transaction)
    setIsFormOpen(true)
  }

  const handleDelete = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className={`min-h-screen pt-20 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Financial Dashboard
              </h1>
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Track your income and expenses
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </motion.button>
          </div>
        </motion.div>

        {/* Dashboard Summary */}
        <DashboardSummary refreshKey={refreshKey} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <MonthlyChart refreshKey={refreshKey} />
          <CategoryChart refreshKey={refreshKey} />
        </div>

        {/* Transactions List */}
        <TransactionList
          refreshKey={refreshKey}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Transaction Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <TransactionForm
                transaction={editingTransaction}
                onSave={handleTransactionSaved}
                onCancel={() => {
                  setIsFormOpen(false)
                  setEditingTransaction(null)
                }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
