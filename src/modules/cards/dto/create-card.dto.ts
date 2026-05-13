import {
  IsInt,
  IsString,
  Length,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  cardNumber: string;

  @IsString()
  cardholderName: string;

  @IsInt()
  expMonth: number;

  @IsInt()
  expYear: number;

  @Length(3, 4)
  cvv: string;
}