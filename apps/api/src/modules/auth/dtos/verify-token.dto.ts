import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dtos';

export class VerifyTokenDto extends UserDto {
  @ApiProperty({
    example: 233232323,
  })
  iat: number;
  @ApiProperty({
    example: 233232323,
  })
  exp: number;
}
