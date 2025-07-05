import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'

// GET /api/transactions - Get all transactions
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build query
    const query: any = {}
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (type && type !== 'all') {
      query.type = type
    }
    
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    // Get transactions with pagination
    const transactions = await Transaction.find(query)
      .sort({ date: -1, createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    // Get total count for pagination
    const total = await Transaction.countDocuments(query)

    console.log('Transactions API Debug:', {
      query,
      transactionsCount: transactions.length,
      total,
      page,
      limit
    })

    return NextResponse.json({
      success: true,
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('GET /api/transactions error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { amount, description, date, category, type } = body

    // Validation
    if (!amount || !description || !date || !category || !type) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    // Create transaction
    const transaction = new Transaction({
      amount: parseFloat(amount),
      description: description.trim(),
      date: new Date(date),
      category,
      type
    })

    await transaction.save()

    return NextResponse.json({
      success: true,
      data: transaction
    }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/transactions error:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
