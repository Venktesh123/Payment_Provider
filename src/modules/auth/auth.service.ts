import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../../config/prisma.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: any) {
    const hash = await bcrypt.hash(
      data.password,
      10,
    );

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hash,
      },
    });

    return {
      token: this.jwt.sign({
        userId: user.id,
      }),
    };
  }

  async login(data: any) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!valid) {
      throw new UnauthorizedException();
    }

    return {
      token: this.jwt.sign({
        userId: user.id,
      }),
    };
  }
}