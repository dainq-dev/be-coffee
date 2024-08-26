/* eslint-disable prettier/prettier */
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MSG } from '@core/messages/common';
import { PERMISSION_KEY } from '../decorator/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const permission = this.reflector.getAllAndOverride<string>(
            PERMISSION_KEY,
            [context.getHandler(), context.getClass()],
        );

        // pulic
        if (!permission) return true;

        // check permission
        const { user } = context.switchToHttp().getRequest();
        if (!user?.role?.permissions?.includes(permission)) {
            throw new BadRequestException(MSG.FORBIDDEN);
        }

        return true;
    }
}
