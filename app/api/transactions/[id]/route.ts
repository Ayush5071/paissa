import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import mongoose from 'mongoose'

// GET /api/transactions/[id] - Get a single transaction
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    
    const { id } = await params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    const transaction = await Transaction.findById(id).lean()

    if (!transaction) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: transaction
    })
  } catch (error: any) {
    console.error('GET /api/transactions/[id] error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/transactions/[id] - Update a transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    
    const { id } = await params
    const body = await request.json()
    const { amount, description, date, category, type } = body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

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

    // Update transaction
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        amount: parseFloat(amount),
        description: description.trim(),
        date: new Date(date),
        category,
        type
      },
      { new: true, runValidators: true }
    )

    if (!transaction) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: transaction
    })
  } catch (error: any) {
    console.error('PUT /api/transactions/[id] error:', error)
    
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

// DELETE /api/transactions/[id] - Delete a transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    
    const { id } = await params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    const transaction = await Transaction.findByIdAndDelete(id)

    if (!transaction) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Transaction deleted successfully'
    })
  } catch (error: any) {
    console.error('DELETE /api/transactions/[id] error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
