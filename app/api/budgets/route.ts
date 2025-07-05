import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Budget from '@/models/Budget'
import Transaction from '@/models/Transaction'

// GET /api/budgets - Get all budgets
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const month = parseInt(searchParams.get('month') || new Date().getMonth() + 1 + '')
    const year = parseInt(searchParams.get('year') || new Date().getFullYear() + '')
    
    // Get budgets for the specified month/year
    const budgets = await Budget.find({ month, year }).sort({ category: 1 })
    
    // Calculate actual spending for each budget
    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {
        const actualSpending = await Transaction.aggregate([
          {
            $match: {
              category: budget.category,
              type: 'expense',
              date: {
                $gte: new Date(year, month - 1, 1),
                $lt: new Date(year, month, 1)
              }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ])
        
        const spent = actualSpending[0]?.total || 0
        const remaining = budget.amount - spent
        
        // Update the budget with actual spending
        await Budget.findByIdAndUpdate(budget._id, {
          spent,
          remaining
        })
        
        return {
          ...budget.toObject(),
          spent,
          remaining,
          percentageUsed: budget.amount > 0 ? Math.round((spent / budget.amount) * 100) : 0,
          isOverBudget: spent > budget.amount
        }
      })
    )
    
    console.log('Budgets API Debug:', {
      month,
      year,
      budgetsCount: budgets.length,
      budgetsWithSpending: budgetsWithSpending.length
    })
    
    return NextResponse.json({
      success: true,
      data: budgetsWithSpending,
      month,
      year
    })
  } catch (error: any) {
    console.error('GET /api/budgets error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/budgets - Create or update budget
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { category, amount, month, year } = body
    
    // Validate required fields
    if (!category || !amount || !month || !year) {
      return NextResponse.json(
        { success: false, error: 'Category, amount, month, and year are required' },
        { status: 400 }
      )
    }
    
    // Check if budget already exists for this category/month/year
    const existingBudget = await Budget.findOne({ category, month, year })
    
    if (existingBudget) {
      // Update existing budget
      existingBudget.amount = amount
      await existingBudget.save()
      
      return NextResponse.json({
        success: true,
        data: existingBudget,
        message: 'Budget updated successfully'
      })
    } else {
      // Create new budget
      const budget = new Budget({
        category,
        amount,
        month,
        year
      })
      
      await budget.save()
      
      return NextResponse.json({
        success: true,
        data: budget,
        message: 'Budget created successfully'
      })
    }
  } catch (error: any) {
    console.error('POST /api/budgets error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
