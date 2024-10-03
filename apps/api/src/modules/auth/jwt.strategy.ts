import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  private readonly Logger = new Logger(JwtStrategy.name);

  async validate(payload: { id: number; email: string }) {
    this.Logger.debug(payload);
    if (!payload.id || !payload.email) {
      throw new UnauthorizedException('Invalid JWT payload');
    }

    try {
      return { userId: payload.id, email: payload.email };
    } catch (e) {
      this.Logger.error(e);
    }
  }
}
