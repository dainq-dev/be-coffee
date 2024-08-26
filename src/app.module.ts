/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { dataSourceOptions } from './core/database/typeORM.config';
import { LoggerMiddleware } from '@core/middlewares/logger.middleware';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...dataSourceOptions,
        }),
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .exclude('')
            .forRoutes('*');
    }

}
