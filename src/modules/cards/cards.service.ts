import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../config/prisma.service';

import { validateLuhn } from '../../common/utils/luhn';

import { encrypt } from '../../common/utils/encryption';

import * as crypto from 'crypto';

@Injectable()
export class CardsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(userId: string, dto: any) {
    const valid = validateLuhn(
      dto.cardNumber,
    );

    if (!valid) {
      throw new BadRequestException(
        'Invalid card',
      );
    }

    const encrypted = encrypt(
      dto.cardNumber,
    );

    return this.prisma.card.create({
      data: {
        userId,
        token:
          crypto.randomBytes(32).toString('hex'),
        encryptedPan:
          encrypted.encryptedData,
        iv: encrypted.iv,
        lastFour:
          dto.cardNumber.slice(-4),
        expMonth: dto.expMonth,
        expYear: dto.expYear,
        brand: 'VISA',
      },
    });
  }
}