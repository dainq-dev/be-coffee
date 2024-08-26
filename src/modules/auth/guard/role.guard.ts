/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { MSG } from '@core/messages/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());

        if (!roles) return true;

        const { user } = context.switchToHttp().getRequest();
        if (!roles.includes(user?.role?.value)) {
            throw new BadRequestException(MSG.UNAUTHORIZED);
        }
        return true;
    }
}
