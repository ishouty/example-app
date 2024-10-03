import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({ example: 'ASalksjAJSASJHSAD39DYD3H32982H3DJHDJKHK' })
  accessToken: string;
}
