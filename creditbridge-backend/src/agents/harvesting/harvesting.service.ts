import { Injectable, Logger } from '@nestjs/common';
import { HarvestInputDto, SmeProfileDto, TransactionRecord } from './dto/harvest.dto';

@Injectable()
export class HarvestingService {
  private readonly logger = new Logger(HarvestingService.name);

  async harvestSmeProfile(input: HarvestInputDto): Promise<SmeProfileDto> {
    this.logger.log(`[Agent 1] Harvesting data for: ${input.businessName}`);

    const transactions = this.generateMockTransactions();
    const monthlyRevenue = this.calculateMonthlyRevenue(transactions);
    const monthlyExpenses = this.calculateMonthlyExpenses(transactions);

    const profile: SmeProfileDto = {
      businessName: input.businessName,
      phoneNumber: input.phoneNumber,
      bvn: input.bvn,
      businessRegNumber: input.businessRegNumber,
      monthlyRevenue,
      monthlyExpenses,
      transactionHistory: transactions,
      businessAgeMonths: this.mockBusinessAge(),
      employeeCount: this.mockEmployeeCount(),
      sector: this.mockSector(),
      hasExistingLoans: Math.random() > 0.6,
      existingLoanAmount: Math.random() > 0.6 ? Math.floor(Math.random() * 500000) : 0,
      repaymentHistory: this.mockRepaymentHistory(),
      mobileMoneyActivity: this.mockMobileMoneyActivity(monthlyRevenue),
      collectedAt: new Date().toISOString(),
    };

    this.logger.log(`[Agent 1] Profile built. Monthly revenue: ₦${monthlyRevenue}`);
    return profile;
  }

  private generateMockTransactions(): TransactionRecord[] {
    const records: TransactionRecord[] = [];
    const descriptions = [
      'Customer payment', 'Supplier payment', 'Rent', 'Salary',
      'Stock purchase', 'Sales revenue', 'Utility bill', 'Loan repayment',
    ];

    for (let i = 0; i < 90; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const isCredit = Math.random() > 0.45;

      records.push({
        date: date.toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 150000) + 5000,
        type: isCredit ? 'credit' : 'debit',
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
      });
    }

    return records;
  }

  private calculateMonthlyRevenue(transactions: TransactionRecord[]): number {
    const credits = transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    return Math.floor(credits / 3);
  }

  private calculateMonthlyExpenses(transactions: TransactionRecord[]): number {
    const debits = transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
    return Math.floor(debits / 3);
  }

  private mockBusinessAge(): number {
    return Math.floor(Math.random() * 60) + 6;
  }

  private mockEmployeeCount(): number {
    return Math.floor(Math.random() * 20) + 1;
  }

  private mockSector(): string {
    const sectors = ['Retail', 'Food & Beverage', 'Fashion', 'Tech Services', 'Logistics', 'Agriculture'];
    return sectors[Math.floor(Math.random() * sectors.length)];
  }

  private mockRepaymentHistory(): 'good' | 'average' | 'poor' | 'none' {
    const options: ('good' | 'average' | 'poor' | 'none')[] = ['good', 'average', 'poor', 'none'];
    return options[Math.floor(Math.random() * options.length)];
  }

  private mockMobileMoneyActivity(monthlyRevenue: number): 'high' | 'medium' | 'low' {
    if (monthlyRevenue > 300000) return 'high';
    if (monthlyRevenue > 100000) return 'medium';
    return 'low';
  }
}