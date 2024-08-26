/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class PasswordGenerateOutDto {
  passwordSalt: string;
  passwordHash: string;
}

export class PasswordCompareDto {
  password: string;
  passwordSalt: string;
  passwordHash: string;
}
