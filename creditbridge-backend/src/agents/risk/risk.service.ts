import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { SmeProfileDto } from '../harvesting/dto/harvest.dto';
import { RiskScoreDto } from './dto/risk.dto';

@Injectable()
export class RiskService {
  private readonly logger = new Logger(RiskService.name);
  private readonly anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async scoreSme(profile: SmeProfileDto): Promise<RiskScoreDto> {
    this.logger.log(`[Agent 2] Scoring SME: ${profile.businessName}`);

    const prompt = `
You are an expert African SME credit analyst. Analyze this business profile and return a JSON credit assessment.

BUSINESS PROFILE:
- Business Name: ${profile.businessName}
- Sector: ${profile.sector}
- Business Age: ${profile.businessAgeMonths} months
- Employees: ${profile.employeeCount}
- Monthly Revenue: ₦${profile.monthlyRevenue.toLocaleString()}
- Monthly Expenses: ₦${profile.monthlyExpenses.toLocaleString()}
- Net Monthly Cash Flow: ₦${(profile.monthlyRevenue - profile.monthlyExpenses).toLocaleString()}
- Has Existing Loans: ${profile.hasExistingLoans}
- Existing Loan Amount: ₦${profile.existingLoanAmount.toLocaleString()}
- Repayment History: ${profile.repaymentHistory}
- Mobile Money Activity: ${profile.mobileMoneyActivity}
- Total Transactions (90 days): ${profile.transactionHistory.length}

Respond ONLY with this exact JSON structure, no markdown, no explanation outside the JSON:
{
  "creditScore": <number 0-100>,
  "riskTier": <"LOW" | "MEDIUM" | "HIGH">,
  "maxLoanAmount": <number in Naira, max 3x monthly revenue>,
  "narrativeExplanation": <2-3 sentence explanation>,
  "keyStrengths": [<3 specific strengths>],
  "keyRisks": [<3 specific risks>],
  "recommendation": <"APPROVE" | "REVIEW" | "REJECT">
}
    `.trim();

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = (response.content[0] as any).text;
    const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    const result: RiskScoreDto = {
      businessName: profile.businessName,
      creditScore: parsed.creditScore,
      riskTier: parsed.riskTier,
      maxLoanAmount: parsed.maxLoanAmount,
      narrativeExplanation: parsed.narrativeExplanation,
      keyStrengths: parsed.keyStrengths,
      keyRisks: parsed.keyRisks,
      recommendation: parsed.recommendation,
      scoredAt: new Date().toISOString(),
    };

    this.logger.log(`[Agent 2] Score: ${result.creditScore}/100 | Tier: ${result.riskTier} | Recommendation: ${result.recommendation}`);
    return result;
  }
}