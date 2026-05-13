import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class MetricsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getMetrics() {
    const total =
      await this.prisma.transaction.count();

    const success =
      await this.prisma.transaction.count({
        where: {
          status: 'CAPTURED',
        },
      });

    return {
      totalTransactions: total,
      successRate:
        total === 0
          ? 0
          : (success / total) * 100,
    };
  }
}