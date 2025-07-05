import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'

// GET /api/analytics/categories - Get category-wise analytics
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'expense'
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build date filter
    const dateFilter: any = {}
    if (startDate || endDate) {
      if (startDate) dateFilter.$gte = new Date(startDate)
      if (endDate) dateFilter.$lte = new Date(endDate)
    }

    const matchStage: any = { type }
    if (Object.keys(dateFilter).length > 0) {
      matchStage.date = dateFilter
    }

    // Get category-wise data
    const categoryData = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          avgAmount: { $avg: '$amount' }
        }
      },
      {
        $sort: { total: -1 }
      }
    ])

    // Get total for percentage calculation
    const totalAmount = categoryData.reduce((sum, cat) => sum + cat.total, 0)

    console.log('Categories API Debug:', {
      categoryData,
      totalAmount,
      matchStage,
      dateFilter
    })

    const categoriesWithPercentage = categoryData.map(cat => ({
      category: cat._id,
      amount: cat.total,
      count: cat.count,
      avgAmount: Math.round(cat.avgAmount * 100) / 100,
      percentage: totalAmount > 0 ? Math.round((cat.total / totalAmount) * 100 * 100) / 100 : 0
    }))

    return NextResponse.json({
      success: true,
      data: categoriesWithPercentage,
      totalAmount
    })
  } catch (error: any) {
    console.error('GET /api/analytics/categories error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
