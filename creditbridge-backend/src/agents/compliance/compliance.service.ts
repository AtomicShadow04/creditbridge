import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { ComplianceInputDto, ComplianceResultDto } from './dto/compliance.dto';

@Injectable()
export class ComplianceService {
  private readonly logger = new Logger(ComplianceService.name);
  private readonly anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async runCompliance(input: ComplianceInputDto): Promise<ComplianceResultDto> {
    this.logger.log(`[Agent 3] Running compliance for: ${input.riskScore.businessName}`);

    // Rule-based checks first
    const amlFlags = this.runAmlChecks(input);
    const spendingLimitApproved = this.calculateSpendingLimit(input);

    // Hard reject rules — no LLM needed
    if (amlFlags.length >= 3) {
      this.logger.warn(`[Agent 3] Hard REJECT — too many AML flags`);
      return {
        businessName: input.riskScore.businessName,
        decision: 'REJECT',
        reasonCodes: ['AML_FLAGS_EXCEEDED', 'AUTOMATIC_REJECTION'],
        amlFlags,
        spendingLimitApproved: 0,
        requiresManualReview: false,
        complianceNarrative: 'Automatic rejection due to multiple AML flags triggered.',
        checkedAt: new Date().toISOString(),
      };
    }

    // LLM handles edge cases
    const llmDecision = await this.runLlmComplianceCheck(input, amlFlags, spendingLimitApproved);

    const result: ComplianceResultDto = {
      businessName: input.riskScore.businessName,
      decision: llmDecision.decision,
      reasonCodes: llmDecision.reasonCodes,
      amlFlags,
      spendingLimitApproved,
      requiresManualReview: llmDecision.decision === 'REFER',
      complianceNarrative: llmDecision.narrative,
      checkedAt: new Date().toISOString(),
    };

    this.logger.log(`[Agent 3] Decision: ${result.decision} | Flags: ${amlFlags.length} | Limit: ₦${spendingLimitApproved}`);
    return result;
  }

  private runAmlChecks(input: ComplianceInputDto): string[] {
    const flags: string[] = [];
    const { riskScore, requestedLoanAmount } = input;

    if (riskScore.creditScore < 30) flags.push('VERY_LOW_CREDIT_SCORE');
    if (riskScore.creditScore < 50 && riskScore.riskTier === 'HIGH') flags.push('HIGH_RISK_LOW_SCORE');    if (requestedLoanAmount > riskScore.maxLoanAmount * 1.5) flags.push('LOAN_AMOUNT_EXCEEDS_LIMIT');
    if (requestedLoanAmount > 5000000) flags.push('HIGH_VALUE_TRANSACTION_REVIEW');
    if (riskScore.riskTier === 'HIGH' && requestedLoanAmount > 1000000) flags.push('HIGH_RISK_LARGE_LOAN');

    return flags;
  }

  private calculateSpendingLimit(input: ComplianceInputDto): number {
    const { riskScore, requestedLoanAmount } = input;
    const maxAllowed = riskScore.maxLoanAmount;

    if (riskScore.riskTier === 'LOW') return Math.min(requestedLoanAmount, maxAllowed);
    if (riskScore.riskTier === 'MEDIUM') return Math.min(requestedLoanAmount, maxAllowed * 0.8);
    return Math.min(requestedLoanAmount, maxAllowed * 0.5);
  }

  private async runLlmComplianceCheck(
    input: ComplianceInputDto,
    amlFlags: string[],
    spendingLimit: number,
  ): Promise<{ decision: 'PASS' | 'REFER' | 'REJECT'; reasonCodes: string[]; narrative: string }> {
    const prompt = `
You are a compliance officer for an African SME lending platform. Review this loan application and give a final compliance decision.

RISK ASSESSMENT SUMMARY:
- Business: ${input.riskScore.businessName}
- Credit Score: ${input.riskScore.creditScore}/100
- Risk Tier: ${input.riskScore.riskTier}
- Recommendation from Risk Agent: ${input.riskScore.recommendation}
- Key Risks: ${input.riskScore.keyRisks.join(', ')}
- Key Strengths: ${input.riskScore.keyStrengths.join(', ')}

LOAN REQUEST:
- Requested Amount: ₦${input.requestedLoanAmount.toLocaleString()}
- Max Approved Limit: ₦${input.riskScore.maxLoanAmount.toLocaleString()}
- Calculated Spending Limit: ₦${spendingLimit.toLocaleString()}

AML FLAGS TRIGGERED: ${amlFlags.length > 0 ? amlFlags.join(', ') : 'NONE'}

DECISION RULES:
- PASS: Credit score >= 60, no critical AML flags, requested amount within limit
- REFER: Credit score 40-59, or 1-2 AML flags, needs human review
- REJECT: Credit score < 40, or loan amount far exceeds capacity

Respond ONLY with this exact JSON, no markdown:
{
  "decision": <"PASS" | "REFER" | "REJECT">,
  "reasonCodes": [<2-3 short reason codes like "SCORE_BELOW_THRESHOLD">],
  "narrative": <1-2 sentence compliance summary>
}
    `.trim();

    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = (response.content[0] as any).text;
    const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
  }
}