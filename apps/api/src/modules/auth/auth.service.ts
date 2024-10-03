import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto';
import { PrismaService } from '../../app/services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async login(user: LoginUserDto) {
    const validateUser = await this.validateUserCred(user);

    this.logger.debug(
      this.configService.get('JWT_EXPIRES_IN'),
      'JWT SIGN IN HOW LONG SESSION',
    );

    if (validateUser) {
      this.logger.debug(validateUser, 'valid user provide access token');

      const signAccessToken = this.jwtService.sign(validateUser, {
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      });

      if (!signAccessToken) {
        throw new ForbiddenException('invalid credentials');
      }

      return {
        accessToken: signAccessToken || '',
      };
    }
  }

  /**
   *
   * @param userId
   * @returns
   */
  async createToken(userId: number) {
    this.logger.debug('create token');

    const payload = { userId };
    return this.jwtService.sign(payload); // Sign the JWT with the payload
  }

  async validateUserCred(user: LoginUserDto) {
    try {
      // validate valid user
      const verifyUser = await this.prismaService.user.findUnique({
        where: { email: user.email },
      });

      if (!verifyUser) {
        throw new UnauthorizedException('Invalid credentials'); // 401 Unauthorized
      }

      if (
        verifyUser &&
        (await bcrypt.compare(user.password, verifyUser.password))
      ) {
        this.logger.debug('user was found');

        delete verifyUser.password;

        return verifyUser; // Return the user if credentials are valid
      }
    } catch (e) {
      this.logger.error('something went wrong in validating user', e);
      throw new UnauthorizedException('Invalid credentials'); // 401 Unauthorized
    } finally {
      this.prismaService.$disconnect();
    }
  }

  /**
   *
   * @param token
   * @returns
   */
  async validateUserToken(token: string): Promise<JwtService> {
    this.logger.debug('verify token', token);
    try {
      return this.jwtService.verify(token.split(' ')[1]); // Verify the token;
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Invalid credentials'); // 401 Unauthorized
    }
  }
}
