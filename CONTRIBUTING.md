# Contributing to CreditBridge

First off, thank you for considering contributing to CreditBridge! It's people like you that make CreditBridge such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the CreditBridge Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/JavaScript styleguides
* End all files with a newline
* Avoid platform-dependent code
* Add tests for new functionality
* Update documentation as needed

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
  - 🎨 when improving the format/structure of the code
  - 🚀 when improving performance
  - 📝 when writing docs
  - 🐛 when fixing a bug
  - ✨ when adding a new feature
  - 🔐 when improving security
  - ✅ when adding tests
  - 🔧 when updating configuration files
  - 🗑️ when removing code or files

### TypeScript/JavaScript Styleguide

* Use TypeScript for new code
* Follow existing code style conventions
* Use meaningful variable names
* Add JSDoc comments for functions and classes
* Keep functions small and focused
* Use `const` by default, `let` if reassignment is needed

Example:
```typescript
/**
 * Calculates the credit score for an SME profile
 * @param profile - The SME profile to analyze
 * @returns The calculated credit score (0-100)
 */
function calculateCreditScore(profile: SmeProfile): number {
  // Implementation
}
```

### Documentation Styleguide

* Use Markdown for documentation
* Reference function/class names with backticks: `functionName()`
* Use code blocks for examples
* Keep documentation up-to-date with code changes
* Use clear and simple language

## Development Setup

### Backend Setup

```bash
cd creditbridge-backend
npm install
npm run start:dev
```

### Frontend Setup

```bash
cd creditbridge-ui
npm install
npm run dev
```

### Testing

```bash
# Backend unit tests
cd creditbridge-backend
npm run test

# Backend E2E tests
npm run test:e2e

# Frontend tests (when available)
cd creditbridge-ui
npm run test
```

### Linting

```bash
# Backend
cd creditbridge-backend
npm run lint

# Frontend
cd creditbridge-ui
npm run lint
```

## Pull Request Process

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Write or update tests** for your changes
5. **Update documentation** if needed
6. **Run tests and linting** to ensure everything works
   ```bash
   npm run test
   npm run lint
   ```
7. **Commit your changes** with a clear message
8. **Push to your branch** (`git push origin feature/amazing-feature`)
9. **Open a Pull Request** with a clear description
10. **Address feedback** from reviewers

## Project Structure for Contributions

### Backend (`creditbridge-backend`)

- **agents/**: AI agent modules (harvesting, risk, compliance, disbursement, pipeline)
- **common/**: Shared utilities and helpers
- **database/**: Database configuration and migrations
- **test/**: E2E and integration tests

When adding a new agent:
1. Create a new folder under `src/agents/`
2. Include: `controller.ts`, `service.ts`, `module.ts`, `dto/` folder
3. Add tests for the agent
4. Update `app.module.ts` to include the new module
5. Document the agent in the backend README

### Frontend (`creditbridge-ui`)

- **app/**: Next.js app directory with pages and components
- **components/**: Reusable UI components
- **services/**: API service utilities
- **hooks/**: Custom React hooks
- **styles/**: CSS and Tailwind configuration

When adding a new page:
1. Create a folder under `app/`
2. Add `page.tsx` for the page content
3. Add `layout.tsx` if you need a custom layout
4. Add tests for the page
5. Update the README if it's a significant feature

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested
* `wontfix` - This will not be worked on

## Recognizing Contributions

We recognize contributions in multiple ways:

- Contributors are listed in the project documentation
- Significant contributions may be highlighted in release notes
- Regular contributors may be invited to become maintainers

## Questions?

Don't hesitate to reach out! You can:
- Open an issue with the `question` label
- Check existing documentation
- Review closed issues for similar questions

---

Thank you for contributing to CreditBridge! 🎉
