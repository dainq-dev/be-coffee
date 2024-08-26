import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

export const configService = new ConfigService();
