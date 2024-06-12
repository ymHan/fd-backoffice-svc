import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountRoles } from '@/model/enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler()]);

    if (!requiredRole) return true;

    const type = context.getType();
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1);
      const user = metadata.get('user')[0];
      if (!user) throw new UnauthorizedException('Access Denied');

      const isAuth = this.matchRoles(requiredRole, user.role);
      if (!isAuth) throw new UnauthorizedException('Access Denied');
    }
    return true;
  }

  matchRoles(requiredRoles: AccountRoles[], userRole: AccountRoles) {
    return requiredRoles.some((role) => role === userRole);
  }
}
