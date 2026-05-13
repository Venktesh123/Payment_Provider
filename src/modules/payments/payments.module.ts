import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';

import { PaymentsService } from './payments.service';

import { PrismaService } from '../../config/prisma.service';

import { MockBankService } from '../bank/mock-bank.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PrismaService,
    MockBankService,
  ],
})
export class PaymentsModule {}