import { ComplianceResultDto } from '../../compliance/dto/compliance.dto';

export class DisbursementInputDto {
  complianceResult!: ComplianceResultDto;
  recipientWalletAddress!: string;
}

export class DisbursementResultDto {
  businessName!: string;
  status!: 'DISBURSED' | 'REJECTED' | 'PENDING_REVIEW';
  amountDisbursed!: number;
  recipientWalletAddress!: string;
  transactionHash!: string;
  auditLog!: AuditLogDto;
  disbursedAt!: string;
}

export class AuditLogDto {
  businessName!: string;
  decision!: string;
  requestedAmount!: number;
  approvedAmount!: number;
  amlFlags!: string[];
  reasonCodes!: string[];
  transactionHash!: string;
  timestamp!: string;
}