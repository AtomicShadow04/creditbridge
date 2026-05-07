import { Injectable, Logger } from '@nestjs/common';
import { createWalletClient, http, parseUnits, encodeFunctionData } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import { DisbursementInputDto, DisbursementResultDto, AuditLogDto } from './dto/disbursement.dto';

const USDC_CONTRACT = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
const USDC_ABI = [
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

@Injectable()
export class DisbursementService {
  private readonly logger = new Logger(DisbursementService.name);

  async disburse(input: DisbursementInputDto): Promise<DisbursementResultDto> {
    this.logger.log(`[Agent 4] Processing disbursement for: ${input.complianceResult.businessName}`);

    const { complianceResult, recipientWalletAddress } = input;

    // If compliance did not pass, no disbursement
    if (complianceResult.decision === 'REJECT') {
      this.logger.warn(`[Agent 4] Disbursement blocked — compliance REJECTED`);
      return this.buildResult(complianceResult, 0, recipientWalletAddress, 'REJECTED', 'NO_TRANSACTION_REJECTED');
    }

    if (complianceResult.decision === 'REFER') {
      this.logger.warn(`[Agent 4] Disbursement held — requires manual review`);
      return this.buildResult(complianceResult, 0, recipientWalletAddress, 'PENDING_REVIEW', 'NO_TRANSACTION_PENDING');
    }

    // PASS — trigger X402 payment via viem
    try {
      const txHash = await this.triggerX402Payment(
        recipientWalletAddress,
        complianceResult.spendingLimitApproved,
      );

      this.logger.log(`[Agent 4] Payment sent. TxHash: ${txHash}`);
      return this.buildResult(complianceResult, complianceResult.spendingLimitApproved, recipientWalletAddress, 'DISBURSED', txHash);
    } catch (error) {
        const err = error as Error;
        this.logger.error(`[Agent 4] Payment failed: ${err.message}`);
        throw err;  
    }
  }

  private async triggerX402Payment(
  recipientAddress: string,
  amountNaira: number,
): Promise<string> {
  // Simulate X402 payment for demo purposes
  // In production this would be a real USDC transfer on Base
  const usdcAmount = (amountNaira / 1500).toFixed(6);
  this.logger.log(`[Agent 4] Simulating X402 payment of $${usdcAmount} USDC to ${recipientAddress}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return mock transaction hash
  const mockHash = `0x${Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('')}`;
  
  this.logger.log(`[Agent 4] X402 payment confirmed. TxHash: ${mockHash}`);
  return mockHash;
}

  private buildResult(
    complianceResult: any,
    amount: number,
    wallet: string,
    status: 'DISBURSED' | 'REJECTED' | 'PENDING_REVIEW',
    txHash: string,
  ): DisbursementResultDto {
    const auditLog: AuditLogDto = {
      businessName: complianceResult.businessName,
      decision: complianceResult.decision,
      requestedAmount: complianceResult.spendingLimitApproved,
      approvedAmount: amount,
      amlFlags: complianceResult.amlFlags,
      reasonCodes: complianceResult.reasonCodes,
      transactionHash: txHash,
      timestamp: new Date().toISOString(),
    };

    return {
      businessName: complianceResult.businessName,
      status,
      amountDisbursed: amount,
      recipientWalletAddress: wallet,
      transactionHash: txHash,
      auditLog,
      disbursedAt: new Date().toISOString(),
    };
  }
}