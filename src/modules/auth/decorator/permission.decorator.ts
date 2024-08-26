/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';
export const Permission = (permission: string) => SetMetadata(PERMISSION_KEY, permission);