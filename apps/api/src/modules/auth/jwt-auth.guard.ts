import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtAuthGuard.name);
  canActivate(context: ExecutionContext) {
    // Add custom authentication logic here if needed
    // For example, you can add logging or additional checks

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Customize how you handle errors or invalid users
    this.logger.debug(err, 'handlerequiest');
    this.logger.debug(user, 'handle request');
    this.logger.debug(info, 'handle request');

    if (err || !user) {
      this.logger.error(err, 'handle request');

      throw err || new UnauthorizedException();
    }
    return user;
  }
}
