import { Injectable } from '@nestjs/common';

@Injectable()
export class MockBankService {
  async authorize() {
    const delay =
      Math.floor(Math.random() * 2900) + 100;

    await new Promise((resolve) =>
      setTimeout(resolve, delay),
    );

    const random = Math.random() * 100;

    if (random < 85) {
      return {
        success: true,
        authCode: 'AUTH12345',
      };
    }

    if (random < 93) {
      throw new Error(
        'INSUFFICIENT_FUNDS',
      );
    }

    if (random < 95) {
      throw new Error('INVALID_CARD');
    }

    if (random < 97) {
      throw new Error('CARD_EXPIRED');
    }

    if (random < 99) {
      throw new Error(
        'NETWORK_TIMEOUT',
      );
    }

    throw new Error('RATE_LIMIT');
  }
}