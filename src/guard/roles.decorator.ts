import { SetMetadata } from '@nestjs/common';
import { AccountRoles } from '@/model/enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AccountRoles[]) => SetMetadata(ROLES_KEY, roles);
