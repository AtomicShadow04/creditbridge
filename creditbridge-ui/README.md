# CreditBridge UI

An AI-powered automated lending platform for African SMEs. CreditBridge revolutionizes loan approval by replacing manual review processes with intelligent AI agents that provide instant decisions backed by data-driven risk assessment and blockchain transparency.

## 🎯 What is CreditBridge?

CreditBridge is a full-stack web application that automates the complete loan approval and disbursement process for small and medium enterprises (SMEs). Built specifically for the Nigerian market, it leverages AI and blockchain technology to:

- **Democratize lending access** through automation
- **Reduce approval time** from days to seconds
- **Provide intelligent risk assessment** using Claude AI
- **Enable transparent disbursement** via blockchain (USDC stablecoins)
- **Maintain regulatory compliance** through rule-based and AI-powered checks

## 🚀 The Loan Pipeline

When an SME submits a loan application, it flows through 4 AI agents in sequence:

```
1. Data Harvesting Agent
   ↓
   Collects business profile, transaction history, and financial metrics

2. Risk Scoring Agent
   ↓
   Claude AI analyzes creditworthiness and assigns credit score (0-100) and risk tier

3. Compliance Agent
   ↓
   Validates regulatory requirements (AML/KYC) and calculates spending limits

4. Disbursement Agent
   ↓
   Automatically transfers approved loan amount via blockchain (Base Sepolia USDC)
```

The frontend displays animated progress through each stage and shows comprehensive results including credit score, risk assessment, compliance decision, and transaction hash.

## 🛠️ Technology Stack

**Frontend:**
- Next.js 16.2.4 (React 19, TypeScript 5)
- Tailwind CSS 4 for styling
- Dark theme UI with animated pipeline visualization
- Axios for API communication

**Backend:**
- NestJS 11.0.1 with dependency injection
- TypeScript 5.7.3
- Claude Opus 4.5 AI (Anthropic SDK) for intelligent decision-making
- viem for blockchain interactions
- Base Sepolia testnet with USDC contracts
- X402 payment protocol for disbursement

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Backend running** on port 3000 (`creditbridge-backend`)
- **Environment variables** set in the backend:
  - `ANTHROPIC_API_KEY` - Your Anthropic API key for Claude access

## 🏃 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The UI will start on [http://localhost:3001](http://localhost:3001)

### 3. Access the Application

Open your browser and navigate to `http://localhost:3001`. You'll see:

- **Loan Application Form** with fields for:
  - Business name and phone number
  - Bank Verification Number (BVN)
  - Business registration number
  - Requested loan amount
  - Recipient wallet address (EVM-compatible)
- **4-Step Pipeline Visualization** showing progress through each agent
- **Results Display** with credit score, risk tier, compliance decision, and transaction details

## 📁 Project Structure

```
creditbridge-ui/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Loan application form and pipeline display
│   └── globals.css         # Global Tailwind styles
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration for Tailwind
└── README.md               # This file
```

## 📝 Available Scripts

```bash
npm run dev        # Start development server (port 3001)
npm run build      # Create optimized production build
npm run start      # Run production build
npm run lint       # Run ESLint code quality checks
```

## 🔧 Development

### Hot Reload
The application uses Next.js's built-in hot module replacement. Edit `app/page.tsx` to see changes instantly.

### Adding Components
Create new components in the `app` directory following Next.js conventions. The project uses TypeScript, so ensure proper type definitions.

### Styling
The project uses Tailwind CSS 4 with a custom dark theme. Modify classes in components or update PostCSS configuration as needed.

## 🌐 API Integration

The frontend communicates with the backend via:

- **Base URL**: `http://localhost:3000` (configurable)
- **Pipeline Endpoint**: `POST /agents/pipeline`
- **Request Body**: Business details and wallet address
- **Response**: Comprehensive approval decision with all agent outputs

## 📦 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Vercel Deployment
The easiest way to deploy is to use [Vercel Platform](https://vercel.com):

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Vercel automatically detects Next.js and optimizes the build
4. Set the `PORT` environment variable to 3001

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🔐 Security Considerations

- Never commit API keys or sensitive credentials
- The backend should validate all user inputs
- Blockchain transactions use testnet tokens for safety
- Implement rate limiting on API endpoints in production
- Use HTTPS for all production deployments

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Anthropic Claude API](https://claude.ai/docs)

## 🤝 Contributing

When contributing to CreditBridge:

1. Follow the existing code style and TypeScript conventions
2. Ensure all components have proper type definitions
3. Test changes in development mode before committing
4. Update documentation if adding new features
5. Use meaningful commit messages

## 📄 License

This project is part of the CreditBridge ecosystem. See the main project repository for licensing details.
