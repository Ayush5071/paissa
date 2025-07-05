// Test API endpoints
const API_BASE = 'http://localhost:3000/api'

async function testAPI() {
  console.log('Testing API endpoints...')
  
  try {
    // Test GET transactions
    const response = await fetch(`${API_BASE}/transactions`)
    const data = await response.json()
    console.log('GET /api/transactions:', data)
    
    // Test POST transaction
    const newTransaction = {
      amount: 50.00,
      description: 'Test transaction',
      date: new Date().toISOString(),
      category: 'Food & Dining',
      type: 'expense'
    }
    
    const postResponse = await fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    })
    
    const postData = await postResponse.json()
    console.log('POST /api/transactions:', postData)
    
    // Test analytics endpoints
    const dashboardResponse = await fetch(`${API_BASE}/analytics/dashboard`)
    const dashboardData = await dashboardResponse.json()
    console.log('GET /api/analytics/dashboard:', dashboardData)
    
  } catch (error) {
    console.error('API test failed:', error)
  }
}

// Run in browser console
testAPI()
