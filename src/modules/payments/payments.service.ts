import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../config/prisma.service';

import { MockBankService } from '../bank/mock-bank.service';

import { TransactionStatus } from '../../common/enums/transaction-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private bank: MockBankService,
  ) {}

  async create(
    userId: string,
    dto: any,
    correlationId: string,
  ) {
    const card =
      await this.prisma.card.findUnique({
        where: {
          token: dto.cardToken,
        },
      });

    if (!card || card.userId !== userId) {
      throw new BadRequestException(
        'Invalid card token',
      );
    }

    const transaction =
      await this.prisma.transaction.create({
        data: {
          userId,
          cardId: card.id,
          amount: dto.amount,
          currency: dto.currency,
          status:
            TransactionStatus.INITIATED,
          correlationId,
        },
      });

    try {
      await this.prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status:
            TransactionStatus.PROCESSING,
        },
      });

      const response =
        await this.bank.authorize();

      await this.prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status:
            TransactionStatus.CAPTURED,
          authCode:
            response.authCode,
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      await this.prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status:
            TransactionStatus.FAILED,
        },
      });

      throw error;
    }
  }
}