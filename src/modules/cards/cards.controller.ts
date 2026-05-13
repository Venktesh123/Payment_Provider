import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(
    private cardsService: CardsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: any,
    @Body() body: any,
  ) {
    return this.cardsService.create(
      req.user.userId,
      body,
    );
  }
}