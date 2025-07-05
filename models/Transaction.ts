import mongoose from 'mongoose'

export interface ITransaction {
  _id: string
  amount: number
  description: string
  date: Date
  category: string
  type: 'income' | 'expense'
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new mongoose.Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [200, 'Description cannot exceed 200 characters']
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
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
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: ['income', 'expense'],
      default: 'expense'
    }
  },
  {
    timestamps: true
  }
)

// Create indexes for better query performance
TransactionSchema.index({ date: -1 })
TransactionSchema.index({ category: 1 })
TransactionSchema.index({ type: 1 })

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)
