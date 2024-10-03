import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserResponseDto extends UserDto {
  @ApiProperty({ example: 12 })
  id: number;
}
