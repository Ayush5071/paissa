import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import Budget from '@/models/Budget'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// GET /api/insights/budget-suggestions - Get AI-powered budget suggestions
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const month = parseInt(searchParams.get('month') || new Date().getMonth() + 1 + '')
    const year = parseInt(searchParams.get('year') || new Date().getFullYear() + '')
    
    // Get historical spending data (last 3 months)
    const threeMonthsAgo = new Date(year, month - 4, 1)
    const currentMonth = new Date(year, month - 1, 1)
    
    const historicalSpending = await Transaction.aggregate([
      {
        $match: {
          type: 'expense',
          date: {
            $gte: threeMonthsAgo,
            $lt: currentMonth
          }
        }
      },
      {
        $group: {
          _id: {
            category: '$category',
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $group: {
          _id: '$_id.category',
          monthlySpending: {
            $push: {
              month: '$_id.month',
              year: '$_id.year',
              amount: '$total'
            }
          },
          avgSpending: { $avg: '$total' },
          maxSpending: { $max: '$total' },
          minSpending: { $min: '$total' }
        }
      }
    ])
    
    // Get current month spending
    const currentSpending = await Transaction.aggregate([
      {
        $match: {
          type: 'expense',
          date: {
            $gte: currentMonth,
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
    
    // Get current budgets
    const currentBudgets = await Budget.find({ month, year })
    
    // Get total income for context
    const totalIncome = await Transaction.aggregate([
      {
        $match: {
          type: 'income',
          date: {
            $gte: threeMonthsAgo,
            $lt: new Date(year, month, 1)
          }
        }
      },
      {
        $group: {
          _id: null,
          avgIncome: { $avg: '$amount' },
          totalIncome: { $sum: '$amount' }
        }
      }
    ])
    
    // Prepare data for AI analysis
    const analysisData = {
      historicalSpending,
      currentSpending,
      currentBudgets,
      totalIncome: totalIncome[0] || { avgIncome: 0, totalIncome: 0 },
      timeframe: {
        month,
        year,
        analysisMonths: 3
      }
    }
    
    // Generate AI suggestions using Gemini
    const suggestions = await generateBudgetSuggestions(analysisData)
    
    console.log('Budget Suggestions Debug:', {
      month,
      year,
      historicalSpendingCount: historicalSpending.length,
      currentSpendingCount: currentSpending.length,
      currentBudgetsCount: currentBudgets.length,
      suggestionsCount: suggestions.length
    })
    
    return NextResponse.json({
      success: true,
      data: {
        suggestions,
        analysisData: {
          categories: historicalSpending.map(item => ({
            category: item._id,
            avgSpending: Math.round(item.avgSpending),
            trend: calculateTrend(item.monthlySpending),
            volatility: calculateVolatility(item.monthlySpending)
          })),
          summary: {
            totalCategories: historicalSpending.length,
            avgMonthlySpending: Math.round(
              historicalSpending.reduce((sum, item) => sum + item.avgSpending, 0)
            ),
            budgetUtilization: currentBudgets.length > 0 ? 
              Math.round((currentSpending.reduce((sum, item) => sum + item.total, 0) / 
                         currentBudgets.reduce((sum, item) => sum + item.amount, 0)) * 100) : 0
          }
        }
      },
      month,
      year
    })
  } catch (error: any) {
    console.error('GET /api/insights/budget-suggestions error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

async function generateBudgetSuggestions(data: any) {
  try {
    // If no API key, fall back to rule-based suggestions
    if (!process.env.GEMINI_API_KEY) {
      console.log('No Gemini API key found, using rule-based suggestions')
      return generateRuleBasedSuggestions(data)
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    
    // Prepare spending data for AI analysis
    const spendingData = {
      historicalSpending: data.historicalSpending.map((cat: any) => ({
        category: cat._id,
        avgSpending: Math.round(cat.avgSpending),
        maxSpending: Math.round(cat.maxSpending),
        minSpending: Math.round(cat.minSpending),
        trend: calculateTrend(cat.monthlySpending),
        volatility: calculateVolatility(cat.monthlySpending)
      })),
      currentSpending: data.currentSpending.map((cat: any) => ({
        category: cat._id,
        amount: Math.round(cat.total)
      })),
      currentBudgets: data.currentBudgets.map((budget: any) => ({
        category: budget.category,
        amount: Math.round(budget.amount)
      })),
      monthlyIncome: Math.round(data.totalIncome.avgIncome || 0),
      timeframe: data.timeframe
    }

    const prompt = `You are an expert financial advisor AI with deep expertise in personal finance, budgeting, and spending analysis. Analyze the following comprehensive spending data and provide intelligent, personalized budget recommendations.

FINANCIAL PROFILE:
${JSON.stringify(spendingData, null, 2)}

ANALYSIS REQUIREMENTS:
1. **Pattern Recognition**: Identify spending patterns, seasonal trends, and behavioral insights
2. **Risk Assessment**: Evaluate financial health and potential risks
3. **Optimization Opportunities**: Find areas for improvement and cost savings
4. **Behavioral Insights**: Consider psychological factors in spending habits
5. **Goal Alignment**: Suggest budgets that promote financial wellness

RESPONSE FORMAT (JSON only, no markdown):
{
  "suggestions": [
    {
      "category": "string",
      "type": "optimization|overspending|underspending|general|emergency|savings",
      "priority": "critical|high|medium|low",
      "suggestedAmount": number,
      "reasoning": "string (detailed, actionable explanation with specific insights)",
      "confidence": "very_high|high|medium|low",
      "potentialSavings": number,
      "timeframe": "immediate|short_term|long_term",
      "actionItems": ["specific action 1", "specific action 2"],
      "riskLevel": "high|medium|low"
    }
  ],
  "overallInsights": {
    "financialHealth": "excellent|good|fair|poor",
    "spendingPersonality": "string",
    "keyRecommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
  }
}

ADVANCED GUIDELINES:
- Provide 5-8 specific, actionable recommendations
- Consider spending velocity and acceleration patterns
- Identify emotional spending triggers if patterns suggest them
- Suggest emergency fund requirements based on spending volatility
- Recommend percentage-based budgets where appropriate
- Consider inflation and seasonal spending adjustments
- Provide both conservative and aggressive saving scenarios
- Include behavioral change suggestions, not just budget numbers
- Factor in income stability and spending consistency
- Suggest automation strategies for budget adherence

Focus on delivering actionable insights that go beyond basic budgeting to include financial psychology and long-term wealth building strategies.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    console.log('Gemini AI Response:', text)
    
    // Parse the AI response
    try {
      // Clean up the response text (remove any markdown formatting)
      let cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      const aiResponse = JSON.parse(cleanText)
      if (aiResponse.suggestions && Array.isArray(aiResponse.suggestions)) {
        // Add overall insights to the response if available
        const enhancedSuggestions = aiResponse.suggestions.map((suggestion: any) => ({
          ...suggestion,
          // Ensure backward compatibility with existing interface
          type: suggestion.type || 'optimization',
          priority: suggestion.priority === 'critical' ? 'high' : suggestion.priority || 'medium',
          confidence: suggestion.confidence?.replace('very_', '') || 'medium',
          potentialSavings: suggestion.potentialSavings || 0
        }))
        
        console.log('Enhanced AI suggestions generated:', enhancedSuggestions.length)
        console.log('Overall insights:', aiResponse.overallInsights)
        
        return enhancedSuggestions
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      console.log('Raw AI response:', text)
    }
    
    // If AI response parsing fails, fall back to rule-based
    return generateRuleBasedSuggestions(data)
    
  } catch (error) {
    console.error('Error generating AI suggestions:', error)
    // Fall back to rule-based suggestions if AI fails
    return generateRuleBasedSuggestions(data)
  }
}

function generateRuleBasedSuggestions(data: any) {
  const suggestions = []
  
  // Analyze each category
  data.historicalSpending.forEach((category: any) => {
    const avgSpending = category.avgSpending
    const categoryName = category._id
    const trend = calculateTrend(category.monthlySpending)
    const volatility = calculateVolatility(category.monthlySpending)
    
    // Find current budget for this category
    const currentBudget = data.currentBudgets.find((b: any) => b.category === categoryName)
    const currentSpending = data.currentSpending.find((s: any) => s._id === categoryName)
    
    let suggestion = {
      category: categoryName,
      type: 'optimization',
      priority: 'medium',
      suggestedAmount: Math.round(avgSpending * 1.1), // 10% buffer
      reasoning: '',
      confidence: 'medium',
      potentialSavings: 0
    }
    
    // High volatility categories need higher buffers
    if (volatility > 0.3) {
      suggestion.suggestedAmount = Math.round(avgSpending * 1.25)
      suggestion.reasoning = `High spending variability detected. Recommended 25% buffer above average spending of $${Math.round(avgSpending)}.`
      suggestion.priority = 'high'
    }
    // Consistently increasing trend
    else if (trend > 0.2) {
      suggestion.suggestedAmount = Math.round(avgSpending * 1.2)
      suggestion.reasoning = `Increasing spending trend detected. Recommended 20% buffer above average spending of $${Math.round(avgSpending)}.`
      suggestion.priority = 'high'
    }
    // Stable spending
    else if (volatility < 0.1 && Math.abs(trend) < 0.1) {
      suggestion.suggestedAmount = Math.round(avgSpending * 1.05)
      suggestion.reasoning = `Stable spending pattern. Recommended 5% buffer above average spending of $${Math.round(avgSpending)}.`
      suggestion.priority = 'low'
    }
    // Default case
    else {
      suggestion.reasoning = `Based on 3-month average spending of $${Math.round(avgSpending)} with moderate variability.`
    }
    
    // Check if overspending
    if (currentBudget && currentSpending && currentSpending.total > currentBudget.amount) {
      suggestion.type = 'overspending'
      suggestion.priority = 'high'
      suggestion.reasoning = `Currently overspending by $${Math.round(currentSpending.total - currentBudget.amount)}. ` + suggestion.reasoning
    }
    
    // Check if underspending significantly
    if (currentBudget && currentSpending && currentSpending.total < currentBudget.amount * 0.7) {
      suggestion.type = 'underspending'
      suggestion.priority = 'low'
      suggestion.potentialSavings = Math.round(currentBudget.amount - suggestion.suggestedAmount)
      suggestion.reasoning = `Currently underspending. Could reduce budget and reallocate $${suggestion.potentialSavings} to other categories.`
    }
    
    suggestions.push(suggestion)
  })
  
  // Add general recommendations
  const totalHistoricalSpending = data.historicalSpending.reduce((sum: number, cat: any) => sum + cat.avgSpending, 0)
  const totalCurrentBudget = data.currentBudgets.reduce((sum: number, budget: any) => sum + budget.amount, 0)
  
  if (totalCurrentBudget > totalHistoricalSpending * 1.3) {
    suggestions.push({
      category: 'Overall',
      type: 'general',
      priority: 'medium',
      suggestedAmount: Math.round(totalHistoricalSpending * 1.1),
      reasoning: `Total budget is significantly higher than historical spending. Consider reducing overall budget by $${Math.round(totalCurrentBudget - totalHistoricalSpending * 1.1)}.`,
      confidence: 'high',
      potentialSavings: Math.round(totalCurrentBudget - totalHistoricalSpending * 1.1)
    })
  }
  
  return suggestions
}

function calculateTrend(monthlySpending: any[]) {
  if (monthlySpending.length < 2) return 0
  
  const sortedSpending = monthlySpending.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    return a.month - b.month
  })
  
  const firstMonth = sortedSpending[0].amount
  const lastMonth = sortedSpending[sortedSpending.length - 1].amount
  
  return firstMonth > 0 ? (lastMonth - firstMonth) / firstMonth : 0
}

function calculateVolatility(monthlySpending: any[]) {
  if (monthlySpending.length < 2) return 0
  
  const amounts = monthlySpending.map(item => item.amount)
  const avg = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
  const variance = amounts.reduce((sum, amount) => sum + Math.pow(amount - avg, 2), 0) / amounts.length
  const stdDev = Math.sqrt(variance)
  
  return avg > 0 ? stdDev / avg : 0
}
