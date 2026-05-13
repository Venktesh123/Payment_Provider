import {
  IsInt,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  cardToken: string;

  @IsInt()
  amount: number;

  @IsString()
  currency: string;
}