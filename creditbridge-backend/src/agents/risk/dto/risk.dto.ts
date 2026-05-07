import { SmeProfileDto } from '../../harvesting/dto/harvest.dto';

export class RiskScoreDto {
  businessName!: string;
  creditScore!: number;
  riskTier!: 'LOW' | 'MEDIUM' | 'HIGH';
  maxLoanAmount!: number;
  narrativeExplanation!: string;
  keyStrengths!: string[];
  keyRisks!: string[];
  recommendation!: 'APPROVE' | 'REVIEW' | 'REJECT';
  scoredAt!: string;
}