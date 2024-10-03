import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseBadRequestDto {
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({ example: 'Bad request' })
  message: string;
}
