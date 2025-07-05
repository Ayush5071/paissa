'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save, DollarSign, Calendar, Tag, FileText, TrendingUp, TrendingDown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { ITransaction } from '@/models/Transaction'

interface TransactionFormProps {
  transaction?: ITransaction | null
  onSave: () => void
  onCancel: () => void
}

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Groceries',
  'Other'
]

export default function TransactionForm({ transaction, onSave, onCancel }: TransactionFormProps) {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    amount: transaction?.amount || 0,
    description: transaction?.description || '',
    date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    category: transaction?.category || 'Other',
    type: transaction?.type || 'expense' as 'income' | 'expense'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (formData.description.length > 200) {
      newErrors.description = 'Description cannot exceed 200 characters'
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const url = transaction 
        ? `/api/transactions/${transaction._id}`
        : '/api/transactions'
      
      const method = transaction ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to save transaction')
      }
      
      onSave()
    } catch (error) {
      console.error('Error saving transaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-2xl p-6 shadow-2xl border ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {transaction ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCancel}
          className={`p-2 rounded-full hover:bg-gray-100 ${
            theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'text-gray-500'
          }`}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.type === 'income'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              }`}
            >
              <TrendingUp className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Income</span>
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.type === 'expense'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              }`}
            >
              <TrendingDown className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Expense</span>
            </motion.button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Amount
          </label>
          <div className="relative">
            <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                errors.amount
                  ? 'border-red-500 focus:border-red-500'
                  : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-white focus:border-blue-500'
                    : 'border-gray-200 bg-white focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
              placeholder="0.00"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Description
          </label>
          <div className="relative">
            <FileText className={`absolute left-3 top-3 w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 resize-none ${
                errors.description
                  ? 'border-red-500 focus:border-red-500'
                  : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-white focus:border-blue-500'
                    : 'border-gray-200 bg-white focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
              placeholder="Enter transaction description..."
            />
          </div>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
          <p className={`mt-1 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {formData.description.length}/200 characters
          </p>
        </div>

        {/* Date */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Date
          </label>
          <div className="relative">
            <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              title="Select transaction date"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                errors.date
                  ? 'border-red-500 focus:border-red-500'
                  : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-white focus:border-blue-500'
                    : 'border-gray-200 bg-white focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-red-500">{errors.date}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Category
          </label>
          <div className="relative">
            <Tag className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              title="Select transaction category"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                errors.category
                  ? 'border-red-500 focus:border-red-500'
                  : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-white focus:border-blue-500'
                    : 'border-gray-200 bg-white focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700'
            } text-white flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {transaction ? 'Update' : 'Save'} Transaction
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}
