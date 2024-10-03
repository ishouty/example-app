import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponsePermissionDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Permission Denied' })
  message: string;
}
