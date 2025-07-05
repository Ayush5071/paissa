import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'

// GET /api/analytics/dashboard - Get dashboard summary
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month' // month, week, year
    
    // Calculate date range based on period
    const now = new Date()
    let startDate: Date
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      case 'month':
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
    }

    // Get summary statistics
    const [
      totalExpenses,
      totalIncome,
      transactionCount,
      recentTransactions
    ] = await Promise.all([
      // Total expenses for period
      Transaction.aggregate([
        {
          $match: {
            type: 'expense',
            date: { $gte: startDate, $lte: now }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]),
      
      // Total income for period
      Transaction.aggregate([
        {
          $match: {
            type: 'income',
            date: { $gte: startDate, $lte: now }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]),
      
      // Transaction count for period
      Transaction.countDocuments({
        date: { $gte: startDate, $lte: now }
      }),
      
      // Recent transactions (last 5)
      Transaction.find()
        .sort({ date: -1, createdAt: -1 })
        .limit(5)
        .lean()
    ])

    // Get top categories for expenses
    const topCategories = await Transaction.aggregate([
      {
        $match: {
          type: 'expense',
          date: { $gte: startDate, $lte: now }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 5
      }
    ])

    const expenses = totalExpenses[0]?.total || 0
    const income = totalIncome[0]?.total || 0
    const balance = income - expenses

    console.log('Dashboard API Debug:', {
      totalExpenses,
      totalIncome,
      expenses,
      income,
      balance,
      transactionCount,
      recentTransactionsCount: recentTransactions.length,
      topCategoriesCount: topCategories.length
    })

    return NextResponse.json({
      success: true,
      totalIncome: income,
      totalExpense: expenses,
      balance,
      transactionCount,
      recentTransactions: recentTransactions.map(tx => ({
        _id: tx._id,
        amount: tx.amount,
        description: tx.description,
        type: tx.type,
        date: tx.date
      })),
      topCategories: topCategories.map(cat => ({
        category: cat._id,
        amount: cat.total,
        count: cat.count
      }))
    })
  } catch (error: any) {
    console.error('GET /api/analytics/dashboard error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
