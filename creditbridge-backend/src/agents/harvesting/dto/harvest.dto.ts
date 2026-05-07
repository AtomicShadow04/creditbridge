export class HarvestInputDto {
  businessName!: string;
  phoneNumber!: string;
  bvn!: string;
  businessRegNumber!: string;
}

export class TransactionRecord {
  date!: string;
  amount!: number;
  type!: 'credit' | 'debit';
  description!: string;
}

export class SmeProfileDto {
  businessName!: string;
  phoneNumber!: string;
  bvn!: string;
  businessRegNumber!: string;
  monthlyRevenue!: number;
  monthlyExpenses!: number;
  transactionHistory!: TransactionRecord[];
  businessAgeMonths!: number;
  employeeCount!: number;
  sector!: string;
  hasExistingLoans!: boolean;
  existingLoanAmount!: number;
  repaymentHistory!: 'good' | 'average' | 'poor' | 'none';
  mobileMoneyActivity!: 'high' | 'medium' | 'low';
  collectedAt!: string;
}