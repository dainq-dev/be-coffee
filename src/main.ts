import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from '@core/configs/env.config';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const port = configService.get('PORT');

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.setGlobalPrefix('api/v1');

    await app
        .listen(process.env.PORT)
        .then(() => console.log(`App listen port: ${port}`));
}
bootstrap();
