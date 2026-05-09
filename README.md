# CreditBridge

<p align="center">
  <img src="assets/images/creditbridge-logo.png" alt="CreditBridge Logo" width="300">
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**An AI-powered automated lending platform for African SMEs**

CreditBridge revolutionizes the loan approval process for small and medium enterprises (SMEs) by replacing manual review with intelligent AI agents. Built on cutting-edge technology, it delivers instant loan decisions backed by Claude AI analysis and transparent blockchain disbursement.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

CreditBridge is a full-stack web application designed specifically for the Nigerian market and broader African region. It automates the complete loan approval and disbursement lifecycle through a series of specialized AI agents.

### The Problem
- SME lending is slow, bureaucratic, and heavily manual
- Credit assessment lacks data-driven rigor
- Loan disbursement is inefficient and prone to delays
- Limited access to capital hampers SME growth

### The Solution
CreditBridge delivers:
- **Instant approval** - Loan decisions in seconds, not days
- **AI-driven assessment** - Claude Opus 4.5 analyzes creditworthiness
- **Regulatory compliance** - Automated AML/KYC checks with rule-based and AI validation
- **Transparent disbursement** - Blockchain-based USDC transfers on Base Sepolia
- **Audit trail** - Complete logging of all decisions and transactions

## ✨ Features

### 4-Stage Automated Pipeline

```
┌─────────────────────────────────────────────────────┐
│         CREDITBRIDGE LOAN APPROVAL PIPELINE         │
└─────────────────────────────────────────────────────┘

1️⃣  DATA HARVESTING
   └─ Collects business profile, financial data, transaction history
   └─ Output: Comprehensive SME profile

2️⃣  AI RISK SCORING
   └─ Claude Opus 4.5 analyzes creditworthiness
   └─ Output: Credit score (0-100), risk tier, loan limit

3️⃣  COMPLIANCE CHECK
   └─ AML/KYC validation with rule-based and AI decisions
   └─ Output: Approval decision, spending limits, flags

4️⃣  BLOCKCHAIN DISBURSEMENT
   └─ Automatic USDC transfer to approved applicants
   └─ Output: Transaction hash, audit log
```

### User Features
- Real-time progress tracking through 4-stage pipeline
- Instant loan decision notification
- Comprehensive assessment report with credit score and risk analysis
- Transaction transparency with blockchain verification
- Dark-themed, responsive user interface

## 🏗️ Architecture

### System Design

```
Frontend (Next.js)
    ↓
    └─ Loan Application Form
    └─ Real-time Pipeline Visualization
    └─ Results Display

Backend (NestJS)
    ↓
    ├─ Harvesting Agent (Data Collection)
    ├─ Risk Agent (Claude AI Analysis)
    ├─ Compliance Agent (AML/KYC)
    ├─ Disbursement Agent (Blockchain)
    └─ Pipeline Orchestrator

External Services
    ├─ Anthropic Claude API (AI Decisions)
    └─ Base Sepolia Network (Blockchain)
```

## 🛠️ Tech Stack

### Frontend (`creditbridge-ui`)
- **Framework**: Next.js 16.2.4 (React 19, TypeScript 5)
- **Styling**: Tailwind CSS 4 + custom dark theme
- **HTTP**: Axios for API communication
- **Fonts**: Geist font family

### Backend (`creditbridge-backend`)
- **Framework**: NestJS 11.0.1 with dependency injection
- **Language**: TypeScript 5.7.3
- **AI**: Anthropic Claude Opus 4.5 (@anthropic-ai/sdk 0.92.0)
- **Blockchain**: 
  - viem 2.48.8 (Ethereum interactions)
  - X402 payment protocol
  - USDC on Base Sepolia
- **Testing**: Jest with e2e support
- **Code Quality**: ESLint, Prettier

### Infrastructure
- **Runtime**: Node.js 18+
- **Network**: Base Sepolia Testnet
- **Token**: USDC (ERC-20)
- **Deployment**: Ready for Vercel (frontend), any Node.js host (backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Anthropic API key (get it at https://console.anthropic.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/creditbridge.git
   cd creditbridge
   ```

2. **Setup Backend**
   ```bash
   cd creditbridge-backend
   npm install
   cp .env.example .env
   # Add your ANTHROPIC_API_KEY to .env
   npm run start:dev
   ```
   Backend runs on http://localhost:3000

3. **Setup Frontend** (in new terminal)
   ```bash
   cd creditbridge-ui
   npm install
   npm run dev
   ```
   Frontend runs on http://localhost:3001

4. **Access the Application**
   Open http://localhost:3001 in your browser

### Testing a Loan Application

1. Fill in the form with test data:
   - Business name: "TechStart Nigeria"
   - Phone: "+2348012345678"
   - BVN: "12345678901"
   - Registration: "RC12345"
   - Loan amount: 500000
   - Wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f42b01"

2. Click "Apply for Loan"

3. Watch the pipeline execute in real-time

4. View results including credit score, risk tier, and transaction hash

## 📁 Project Structure

```
creditbridge/
├── README.md                    # This file
├── CONTRIBUTING.md              # Contributing guidelines
├── DEVELOPMENT.md               # Development setup guide
├── LICENSE                      # MIT License
├── .gitignore                   # Git ignore rules
│
├── creditbridge-backend/        # NestJS backend
│   ├── src/
│   │   ├── agents/
│   │   │   ├── harvesting/      # Data collection agent
│   │   │   ├── risk/            # AI scoring agent (Claude)
│   │   │   ├── compliance/      # AML/KYC agent
│   │   │   ├── disbursement/    # Blockchain disbursement agent
│   │   │   └── pipeline/        # Orchestration agent
│   │   ├── app.module.ts        # Root module
│   │   ├── main.ts              # Entry point
│   │   └── common/              # Shared utilities
│   ├── test/                    # E2E tests
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── creditbridge-ui/             # Next.js frontend
    ├── app/
    │   ├── page.tsx             # Main application page
    │   ├── layout.tsx           # Root layout
    │   └── globals.css          # Global styles
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    └── README.md
```

## 🔧 Development

### Backend Development

```bash
cd creditbridge-backend

# Development mode with watch
npm run start:dev

# Build
npm run build

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Lint code
npm run lint
```

**Environment Variables:**
```
ANTHROPIC_API_KEY=sk-ant-...     # Required: Anthropic API key
PORT=3000                         # Optional: Server port
```

### Frontend Development

```bash
cd creditbridge-ui

# Development server
npm run dev

# Production build
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint
```

### API Endpoints

**Pipeline (Main Endpoint)**
```
POST /agents/pipeline
Content-Type: application/json

{
  "businessName": "Your Company",
  "phoneNumber": "+234...",
  "bvn": "12345678901",
  "businessRegNumber": "RC12345",
  "requestedLoanAmount": 500000,
  "recipientWalletAddress": "0x..."
}

Response:
{
  "pipelineStatus": "DISBURSED|PENDING_REVIEW|REJECTED",
  "durationSeconds": 15,
  "summary": {
    "creditScore": 75,
    "riskTier": "LOW",
    "complianceDecision": "PASS",
    "amountDisbursed": 500000,
    "transactionHash": "0x..."
  },
  "agents": { ... }
}
```

**Individual Agent Endpoints**
- `POST /agents/harvest` - Data harvesting
- `POST /agents/risk` - Risk scoring
- `POST /agents/compliance` - Compliance check
- `POST /agents/disburse` - Disbursement

Detailed endpoint documentation available in backend [README.md](creditbridge-backend/README.md).

## 📚 Documentation

- [Backend README](creditbridge-backend/README.md) - Backend architecture and APIs
- [Frontend README](creditbridge-ui/README.md) - Frontend setup and usage
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Development Guide](DEVELOPMENT.md) - Development environment setup

## 🔐 Security Considerations

- **API Keys**: Never commit `.env` files with real credentials
- **Testnet Only**: Currently deployed on Base Sepolia testnet
- **Input Validation**: All endpoints validate user inputs server-side
- **HTTPS**: Use HTTPS in production (http://localhost for development only)
- **Rate Limiting**: Implement rate limiting on production deployments
- **CORS**: Configure CORS appropriately for your deployment

## 🤝 Contributing

We welcome contributions from the community! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Code style and conventions
- Commit message format
- Pull request process
- Testing requirements
- Development workflow

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Anthropic for Claude API
- Vercel for Next.js
- NestJS community
- Base blockchain network

## 📞 Support

For questions, issues, or feedback:
- Open an issue on GitHub
- Check existing documentation
- Review the development guide

---

**Built with ❤️ for African SMEs**

*Last updated: May 2026*
