# CreditBridge Development Guide

This guide will help you set up a complete development environment for CreditBridge.

## Table of Contents

- [System Requirements](#system-requirements)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)
- [Debugging](#debugging)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## System Requirements

- **OS**: Windows, macOS, or Linux
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)
- **RAM**: Minimum 4GB, recommended 8GB
- **Disk**: At least 2GB free space

Verify your versions:
```bash
node --version
npm --version
```

## Prerequisites

Before starting development, you need:

1. **Git** - For version control
2. **A code editor** - VS Code (recommended) or similar
3. **Anthropic API Key** - For Claude AI access
   - Get one free at https://console.anthropic.com
   - Free tier includes $5 in credits
4. **Optional: Postman or Insomnia** - For API testing

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/creditbridge.git
cd creditbridge
```

### 2. Install Backend Dependencies

```bash
cd creditbridge-backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../creditbridge-ui
npm install
```

## Configuration

### Backend Environment Setup

1. **Create `.env` file in creditbridge-backend/**

```bash
cd creditbridge-backend
cp .env.example .env  # Or create manually
```

2. **Edit `.env` and add your credentials:**

```env
# Required: Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE

# Optional: Server configuration
PORT=3000
NODE_ENV=development
```

3. **Verify the configuration:**
   - Check that `.env` is in `.gitignore` (it should be)
   - Never commit the `.env` file with real keys

### Frontend Environment Setup

The frontend connects to the backend at `http://localhost:3000` by default. If you want to change this:

1. **Check the API configuration in `creditbridge-ui/`**
   - Look for API client configuration (usually in a services folder)
   - Default assumes backend runs on port 3000

## Running the Application

### Option 1: Run Both Services (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd creditbridge/creditbridge-backend
npm run start:dev
```

You should see:
```
[Nest] 12345 - 05/08/2024, 10:30:45 AM     LOG [NestFactory] Starting Nest application...
...
[Nest] 12345 - 05/08/2024, 10:30:47 AM     LOG [NestApplication] Nest application successfully started +2078ms
```

Backend runs on: `http://localhost:3000`

**Terminal 2 - Start Frontend:**
```bash
cd creditbridge/creditbridge-ui
npm run dev
```

You should see:
```
> creditbridge-ui@0.1.0 dev
> next dev

  ▲ Next.js 16.2.4
  - Local:        http://localhost:3001
  - Environments: .env.local
```

Frontend runs on: `http://localhost:3001`

### Option 2: Run Services Separately

If you only want to work on one part:

**Backend only:**
```bash
cd creditbridge-backend
npm run start:dev
```

**Frontend only:**
```bash
cd creditbridge-ui
npm run dev
```

## Development Workflow

### Making Changes to the Backend

1. **Edit files** in `creditbridge-backend/src/`
2. **The dev server auto-reloads** with changes
3. **Check the terminal** for any compilation errors
4. **Test with curl or Postman:**

```bash
curl -X POST http://localhost:3000/agents/pipeline \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Corp",
    "phoneNumber": "+2348012345678",
    "bvn": "12345678901",
    "businessRegNumber": "RC12345",
    "requestedLoanAmount": 500000,
    "recipientWalletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f42b01"
  }'
```

### Making Changes to the Frontend

1. **Edit files** in `creditbridge-ui/app/` or `creditbridge-ui/components/`
2. **The dev server auto-reloads** with changes
3. **Check your browser** - The page should refresh automatically
4. **Check the browser console** for any errors

### Common Development Tasks

**Format Code:**
```bash
# Backend
cd creditbridge-backend
npm run format

# Frontend
cd creditbridge-ui
npm run format  # If available
```

**Lint Code:**
```bash
# Backend
cd creditbridge-backend
npm run lint

# Frontend
cd creditbridge-ui
npm run lint
```

**Run Tests:**
```bash
# Backend unit tests
cd creditbridge-backend
npm run test

# Backend E2E tests
npm run test:e2e
```

**Build for Production:**
```bash
# Backend
cd creditbridge-backend
npm run build

# Frontend
cd creditbridge-ui
npm run build
```

## Debugging

### Backend Debugging with VS Code

1. **Create `.vscode/launch.json`** in the project root:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Backend Debug",
      "program": "${workspaceFolder}/creditbridge-backend/dist/main.js",
      "restart": true,
      "preLaunchTask": "build",
      "console": "integratedTerminal"
    }
  ]
}
```

2. **Set breakpoints** in your code (click on line numbers)
3. **Press F5** to start debugging
4. **Step through code** using debug controls

### Frontend Debugging

1. **Use browser DevTools** (F12 in Chrome)
2. **React Developer Tools** extension for React debugging
3. **Network tab** to inspect API calls
4. **Console tab** for error messages

### Common Debug Commands

**View current process:**
```bash
lsof -i :3000  # Backend
lsof -i :3001  # Frontend
```

**Kill process on port (if stuck):**
```bash
# macOS/Linux
kill -9 $(lsof -t -i :3000)

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

## Testing

### Unit Tests

```bash
cd creditbridge-backend
npm run test                    # Run all tests
npm run test -- --watch       # Watch mode
npm run test -- compliance    # Run specific tests
```

### E2E Tests

```bash
cd creditbridge-backend
npm run test:e2e              # Run E2E tests
npm run test:e2e -- --watch  # Watch mode
```

### Test Coverage

```bash
cd creditbridge-backend
npm run test:cov              # Generate coverage report
```

### Creating Tests

**Example unit test for a service:**

```typescript
// compliance.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceService } from './compliance.service';

describe('ComplianceService', () => {
  let service: ComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceService],
    }).compile();

    service = module.get<ComplianceService>(ComplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate compliance rules', () => {
    // Your test here
  });
});
```

## Troubleshooting

### Port Already in Use

If you get "Port 3000/3001 already in use":

```bash
# Find what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### TypeScript Compilation Errors

```bash
# Rebuild from scratch
npm run build -- --force

# Check TypeScript version
npx tsc --version
```

### API Connection Errors

1. **Verify both services are running**
   ```bash
   curl http://localhost:3000/health  # Or any endpoint
   ```

2. **Check CORS settings** in backend
3. **Verify API endpoint URLs** in frontend configuration
4. **Check browser console** for detailed errors

### Anthropic API Key Issues

```bash
# Verify key format
echo $ANTHROPIC_API_KEY  # Should start with sk-ant-

# Test with curl
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-opus-4-20250805",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "test"}]
  }'
```

### Environment Variables Not Loading

1. **Restart the dev server** after changing `.env`
2. **Verify .env file location** - should be in project root
3. **Check file syntax** - No quotes around values
4. **Use absolute paths** in environment if needed

## Performance Tips

1. **Use watch mode** for development (auto-rebuild on changes)
2. **Enable source maps** for better debugging
3. **Use fast build tools** - NestJS compilation is optimized
4. **Clear cache** if build seems stale
5. **Monitor memory usage** - especially with large datasets

## IDE Configuration

### VS Code Recommendations

**Extensions to Install:**
- ESLint
- Prettier
- TypeScript Vue Plugin
- REST Client
- Thunder Client (for API testing)

**Settings (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Next Steps

1. ✅ Set up your development environment
2. 📖 Read the [Backend README](creditbridge-backend/README.md)
3. 📖 Read the [Frontend README](creditbridge-ui/README.md)
4. 🔧 Try making a small change to understand the workflow
5. 📝 Read the [Contributing Guide](CONTRIBUTING.md)
6. 🐛 Fix a bug or add a feature!

## Getting Help

- Check the [main README](README.md) for project overview
- Review existing issues for solutions
- Check agent documentation in backend README
- Ask questions in pull requests
- Open an issue with detailed information

---

Happy coding! 🚀
