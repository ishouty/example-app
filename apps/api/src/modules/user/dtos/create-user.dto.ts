import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateUserDto implements UserDto {
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

  @ApiProperty({ example: 'test1234' })
  @IsNotEmpty()
  @MinLength(6, { message: 'needs tobe greater than 6' })
  password: string;

  @ApiProperty({ example: 12 })
  createdAt?: Date;
}
