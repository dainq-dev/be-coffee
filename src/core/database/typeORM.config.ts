import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from '../configs/env.config';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('PG_DB_HOST'),
    port: configService.get('PG_DB_PORT'),
    username: configService.get('PG_DB_USER'),
    password: configService.get('PG_DB_PASSWORD'),
    database: configService.get('PG_DB_NAME'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: false,
};

const pgDataSource = new DataSource(dataSourceOptions);
export default pgDataSource;
