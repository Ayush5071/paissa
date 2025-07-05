import mongoose from 'mongoose'

export interface IBudget {
  _id: string
  category: string
  amount: number
  month: number
  year: number
  spent: number
  remaining: number
  createdAt: Date
  updatedAt: Date
}

const BudgetSchema = new mongoose.Schema<IBudget>(
  {
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
    amount: {
      type: Number,
      required: [true, 'Budget amount is required'],
      min: [0, 'Budget amount cannot be negative']
    },
    month: {
      type: Number,
      required: [true, 'Month is required'],
      min: [1, 'Month must be between 1-12'],
      max: [12, 'Month must be between 1-12']
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [2000, 'Year must be valid']
    },
    spent: {
      type: Number,
      default: 0,
      min: [0, 'Spent amount cannot be negative']
    },
    remaining: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

// Create compound index for unique budget per category per month/year
BudgetSchema.index({ category: 1, month: 1, year: 1 }, { unique: true })

// Create indexes for better query performance
BudgetSchema.index({ month: 1, year: 1 })
BudgetSchema.index({ category: 1 })

// Virtual to calculate remaining budget
BudgetSchema.virtual('remainingBudget').get(function() {
  return this.amount - this.spent
})

// Pre-save hook to calculate remaining amount
BudgetSchema.pre('save', function(next) {
  this.remaining = this.amount - this.spent
  next()
})

export default mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema)
