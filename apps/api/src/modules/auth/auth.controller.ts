import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponsePermissionDto } from '../../types/common/error-response-permission.dto';
import { AccessTokenDto } from './dtos/access-token.dto';
import { VerifyTokenDto } from './dtos/verify-token.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Permission denied',
    type: ErrorResponsePermissionDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Access Token Session',
    type: AccessTokenDto,
  })
  public async login(@Body() credentials: LoginUserDto): Promise<{
    accessToken: string;
  }> {
    return await this.authService.login(credentials);
  }

  @Get('verify-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Access Token Session',
    type: VerifyTokenDto,
  })
  public async verifyToken(@Headers('authorization') authHeader: string) {
    // Check if the Authorization header exists
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    return this.authService.validateUserToken(authHeader);
  }
}
