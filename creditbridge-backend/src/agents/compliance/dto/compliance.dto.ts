import { RiskScoreDto } from '../../risk/dto/risk.dto';

export class ComplianceInputDto {
  riskScore!: RiskScoreDto;
  requestedLoanAmount!: number;
}

export class ComplianceResultDto {
  businessName!: string;
  decision!: 'PASS' | 'REFER' | 'REJECT';
  reasonCodes!: string[];
  amlFlags!: string[];
  spendingLimitApproved!: number;
  requiresManualReview!: boolean;
  complianceNarrative!: string;
  checkedAt!: string;
}