import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class PostDto {
  @ApiProperty({ example: 'Hello title' })
  @MinLength(1, { message: 'needs tobe greater than one' })
  @MaxLength(50, {
    message: 'character length is too long. no more then 50 characters',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Content example' })
  @MinLength(1, { message: 'needs tobe greater than one' })
  @MaxLength(1000, {
    message: 'character length is too long. no more then 1000 characters',
  })
  @IsNotEmpty()
  content: string | null;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  published: boolean;

  @ApiProperty({ example: 12 })
  authorId: number;
}
