import { Injectable, Logger } from '@nestjs/common';
import { HarvestingService } from '../harvesting/harvesting.service';
import { RiskService } from '../risk/risk.service';
import { ComplianceService } from '../compliance/compliance.service';
import { DisbursementService } from '../disbursement/disbursement.service';
import { HarvestInputDto } from '../harvesting/dto/harvest.dto';

@Injectable()
export class PipelineService {
  private readonly logger = new Logger(PipelineService.name);

  constructor(
    private readonly harvestingService: HarvestingService,
    private readonly riskService: RiskService,
    private readonly complianceService: ComplianceService,
    private readonly disbursementService: DisbursementService,
  ) {}

  async runFullPipeline(input: HarvestInputDto & { requestedLoanAmount: number; recipientWalletAddress: string }) {
    this.logger.log(`\n🚀 [PIPELINE] Starting full agentic loop for: ${input.businessName}`);
    const startTime = Date.now();

    // ── Agent 1: Harvest ──────────────────────────────────
    this.logger.log(`[PIPELINE] Step 1/4 — Data Harvesting Agent`);
    const smeProfile = await this.harvestingService.harvestSmeProfile({
      businessName: input.businessName,
      phoneNumber: input.phoneNumber,
      bvn: input.bvn,
      businessRegNumber: input.businessRegNumber,
    });

    // ── Agent 2: Risk Scoring ─────────────────────────────
    this.logger.log(`[PIPELINE] Step 2/4 — Risk Scoring Agent`);
    const riskScore = await this.riskService.scoreSme(smeProfile);

    // ── Agent 3: Compliance ───────────────────────────────
    this.logger.log(`[PIPELINE] Step 3/4 — Compliance / KYC Agent`);
    const complianceResult = await this.complianceService.runCompliance({
      riskScore,
      requestedLoanAmount: input.requestedLoanAmount,
    });

    // ── Agent 4: Disbursement ─────────────────────────────
    this.logger.log(`[PIPELINE] Step 4/4 — Disbursement Agent`);
    const disbursementResult = await this.disbursementService.disburse({
      complianceResult,
      recipientWalletAddress: input.recipientWalletAddress,
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    this.logger.log(`✅ [PIPELINE] Complete in ${duration}s — Final status: ${disbursementResult.status}`);

    return {
      pipelineStatus: disbursementResult.status,
      durationSeconds: parseFloat(duration),
      businessName: input.businessName,
      requestedLoanAmount: input.requestedLoanAmount,
      summary: {
        creditScore: riskScore.creditScore,
        riskTier: riskScore.riskTier,
        complianceDecision: complianceResult.decision,
        amountDisbursed: disbursementResult.amountDisbursed,
        transactionHash: disbursementResult.transactionHash,
      },
      agents: {
        harvesting: smeProfile,
        risk: riskScore,
        compliance: complianceResult,
        disbursement: disbursementResult,
      },
    };
  }
}