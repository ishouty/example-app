import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'andy@ishouty.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Andy Nguyen' })
  @MinLength(1, { message: 'needs tobe greater than one' })
  @MaxLength(50, {
    message: 'character length is too long. no more then 50 characters',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 12 })
  @IsNumber()
  age?: number;

  @ApiProperty({ example: 12 })
  createdAt?: Date;
}
