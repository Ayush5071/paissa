# 💰 Paissa - Progressive Financial Management Platform

<div align="center">

**A modern, AI-powered financial platform built with Next.js 14**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live Demo](https://paissa-demo.vercel.app) • [Documentation](docs/) • [Report Bug](https://github.com/Ayush5071/paissa/issues) • [Request Feature](https://github.com/Ayush5071/paissa/issues)

</div>

## 🚀 Overview

Paissa is a progressive 3-stage financial management platform that grows with your financial literacy. From basic transaction tracking to AI-powered budget insights, each stage builds upon the previous one to create a comprehensive financial ecosystem.

### ✨ Key Features

- 📊 **Stage 1**: Complete transaction management with CRUD operations
- 📈 **Stage 2**: Interactive analytics with beautiful charts and insights
- 🤖 **Stage 3**: AI-powered budget recommendations using Google Gemini
- 🌙 **Dark/Light Theme**: Seamless theme switching with persistence
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- ⚡ **Real-time Updates**: Live data synchronization across components
- 🔒 **Secure**: MongoDB integration with proper data validation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js + React Chart.js 2
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Google Gemini API
- **Validation**: Zod schemas
- **Date Handling**: date-fns

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Google Gemini API** key (optional, for AI features)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Ayush5071/paissa.git
cd paissa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/paissa

# AI Features (Optional)
GEMINI_API_KEY=your_google_gemini_api_key

# Next.js
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage Guide

### Stage 1: Transaction Tracking
1. Navigate to the Dashboard
2. Add new transactions using the form
3. View, edit, or delete existing transactions
4. Monitor monthly spending patterns

### Stage 2: Analytics & Insights
1. Access the Analytics section
2. View category-wise spending breakdown
3. Analyze monthly trends with interactive charts
4. Review dashboard summary metrics

### Stage 3: AI-Powered Budgeting
1. Go to the Budgets page
2. Set monthly budgets for different categories
3. Compare actual vs budgeted spending
4. Get AI-powered recommendations and insights

## 📁 Project Structure

```
paissa/
├── 📁 app/                    # Next.js 14 App Router
│   ├── 📁 about/             # About page
│   ├── 📁 api/               # API routes
│   │   ├── 📁 analytics/     # Analytics endpoints
│   │   ├── 📁 budgets/       # Budget CRUD
│   │   ├── 📁 insights/      # AI insights
│   │   └── 📁 transactions/  # Transaction CRUD
│   ├── 📁 budgets/           # Budget management page
│   ├── 📁 dashboard/         # Main dashboard
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── 📁 components/            # React components
│   ├── 📁 budgets/          # Budget-related components
│   ├── 📁 charts/           # Chart components
│   ├── 📁 dashboard/        # Dashboard components
│   ├── 📁 insights/         # AI insights components
│   ├── 📁 sections/         # Page sections
│   ├── 📁 transactions/     # Transaction components
│   └── Navbar.tsx           # Navigation component
├── 📁 contexts/             # React contexts
├── 📁 hooks/                # Custom React hooks
├── 📁 lib/                  # Utility libraries
├── 📁 models/               # Database schemas
├── 📁 public/               # Static assets
└── package.json             # Dependencies
```

## 🔧 API Reference

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create new transaction |
| PUT | `/api/transactions/[id]` | Update transaction |
| DELETE | `/api/transactions/[id]` | Delete transaction |

### Budgets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/budgets` | Get budgets by month/year |
| POST | `/api/budgets` | Create new budget |
| PUT | `/api/budgets/[id]` | Update budget |
| DELETE | `/api/budgets/[id]` | Delete budget |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/dashboard` | Get dashboard summary |
| GET | `/api/analytics/monthly` | Get monthly spending data |
| GET | `/api/analytics/categories` | Get category breakdown |
| GET | `/api/analytics/budgets` | Get budget analytics |

### AI Insights

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/insights/budget-suggestions` | Get AI budget recommendations |

## 🤖 AI Features

The platform integrates with Google Gemini for intelligent budget recommendations:

- **Spending Pattern Analysis**: Identifies trends and anomalies
- **Budget Optimization**: Suggests optimal budget allocations
- **Risk Assessment**: Evaluates financial health and risks
- **Personalized Insights**: Provides actionable recommendations
- **Fallback Logic**: Rule-based suggestions when AI is unavailable

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

```env
MONGO_URI=your_production_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://your-domain.com
```

## 🧪 Testing

Use the included test script to verify API endpoints:

```bash
# Open browser console and run:
node test-api.js
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 👨‍💻 Author

**Ayush Tiwari**
- Email: ayusht9919@gmail.com
- GitHub: [@Ayush5071](https://github.com/Ayush5071)
- MNNIT Allahabad • B.Tech ECE • CPI: 7.88

### 🏆 Recent Achievements
- **Hack36 - CC MNNIT**: 9th place among 100+ teams (2025)
- **Innodev - ES MNNIT**: 1st place among 100+ teams (2025)
- **Dev or Die - MNNIT**: 1st place among 50+ teams (2024)
- **Quintathlon - ES MNNIT**: 3rd place (2024)

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Made with ❤️ by [Ayush Tiwari](https://github.com/Ayush5071)**

⭐ Star this repository if you found it helpful!

</div>
