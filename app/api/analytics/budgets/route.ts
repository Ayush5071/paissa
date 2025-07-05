import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Budget from '@/models/Budget'
import Transaction from '@/models/Transaction'

// GET /api/analytics/budgets - Get budget vs actual comparison
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const month = parseInt(searchParams.get('month') || new Date().getMonth() + 1 + '')
    const year = parseInt(searchParams.get('year') || new Date().getFullYear() + '')
    
    // Get all budgets for the month/year
    const budgets = await Budget.find({ month, year })
    
    // Get actual spending by category for the same period
    const actualSpending = await Transaction.aggregate([
      {
        $match: {
          type: 'expense',
          date: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1)
          }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ])
    
    // Create comparison data
    const comparisonData = budgets.map(budget => {
      const actualData = actualSpending.find(spending => spending._id === budget.category)
      const actual = actualData?.total || 0
      const budgeted = budget.amount
      const remaining = budgeted - actual
      const percentageUsed = budgeted > 0 ? Math.round((actual / budgeted) * 100) : 0
      
      return {
        category: budget.category,
        budgeted,
        actual,
        remaining,
        percentageUsed,
        isOverBudget: actual > budgeted,
        variance: actual - budgeted
      }
    })
    
    // Calculate totals
    const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.amount, 0)
    const totalActual = actualSpending.reduce((sum, spending) => sum + spending.total, 0)
    const totalRemaining = totalBudgeted - totalActual
    const overallPercentage = totalBudgeted > 0 ? Math.round((totalActual / totalBudgeted) * 100) : 0
    
    // Calculate insights
    const overBudgetCategories = comparisonData.filter(item => item.isOverBudget)
    const underBudgetCategories = comparisonData.filter(item => !item.isOverBudget && item.actual > 0)
    const unusedCategories = comparisonData.filter(item => item.actual === 0)
    
    console.log('Budget Analytics Debug:', {
      month,
      year,
      budgetsCount: budgets.length,
      actualSpendingCount: actualSpending.length,
      comparisonDataCount: comparisonData.length,
      totalBudgeted,
      totalActual,
      overBudgetCount: overBudgetCategories.length
    })
    
    return NextResponse.json({
      success: true,
      data: {
        comparison: comparisonData,
        summary: {
          totalBudgeted,
          totalActual,
          totalRemaining,
          overallPercentage,
          isOverBudget: totalActual > totalBudgeted
        },
        insights: {
          overBudgetCategories: overBudgetCategories.length,
          underBudgetCategories: underBudgetCategories.length,
          unusedCategories: unusedCategories.length,
          topOverspending: overBudgetCategories
            .sort((a, b) => b.variance - a.variance)
            .slice(0, 3),
          topUnderspending: underBudgetCategories
            .sort((a, b) => b.remaining - a.remaining)
            .slice(0, 3)
        }
      },
      month,
      year
    })
  } catch (error: any) {
    console.error('GET /api/analytics/budgets error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
