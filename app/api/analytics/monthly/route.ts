import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'

// GET /api/analytics/monthly - Get monthly expense analytics
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())

    // Get both income and expense data
    const [incomeData, expenseData] = await Promise.all([
      Transaction.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(year, 0, 1),
              $lt: new Date(year + 1, 0, 1)
            },
            type: 'income'
          }
        },
        {
          $group: {
            _id: { $month: '$date' },
            total: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]),
      Transaction.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(year, 0, 1),
              $lt: new Date(year + 1, 0, 1)
            },
            type: 'expense'
          }
        },
        {
          $group: {
            _id: { $month: '$date' },
            total: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ])
    ])

    // Fill in missing months with 0
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = i + 1
      const incomeMonth = incomeData.find(m => m._id === monthIndex)
      const expenseMonth = expenseData.find(m => m._id === monthIndex)
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      return {
        month: monthNames[i],
        income: incomeMonth?.total || 0,
        expense: expenseMonth?.total || 0,
        net: (incomeMonth?.total || 0) - (expenseMonth?.total || 0)
      }
    })

    console.log('Monthly API Debug:', {
      year,
      incomeData,
      expenseData,
      months
    })

    return NextResponse.json({
      success: true,
      data: months
    })
  } catch (error: any) {
    console.error('GET /api/analytics/monthly error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
