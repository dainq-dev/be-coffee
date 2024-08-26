/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import {
    Body, Controller, Post, Request
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-in')
    async signIn(@Body() body: any) {
        // return this.authService.signIn(body);
    }

    @Post('sign-up')
    async signUp(@Body() body: any) {
        // return this.authService.signIn(body);
    }

    @Post('sign-out')
    async signOut(@Request() req) {
        // return this.authService.signOut(req?.user);
    }

    @Post('forgot-password')
    async forgotPass(@Body() body: any) {
        // return this.authService.signIn(body);
    }
}
