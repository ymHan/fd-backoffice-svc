import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = context.getType();

    if (type === 'rpc') {
      const paramData = context.switchToHttp().getRequest();

      if (!paramData) return false;
      const { authorization } = paramData;
      if (!authorization) throw new UnauthorizedException('Access Token not found');
      const token = authorization.split('Bearer ')[1];
      if (!token) {
        throw new UnauthorizedException('Access Token not found');
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        const metadata = context.getArgByIndex(1);
        metadata.set('user', payload);
        return true;
      } catch {
        throw new UnauthorizedException('Unauthorized for unknown error');
      }
      return true;
    }
  }
}
