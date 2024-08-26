/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'is_public';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
