/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class KeywordQueryParams {
    @IsOptional()
    @Type(() => String)
    keyword?: string;
}

export class PaginatedQueryParams extends KeywordQueryParams {
    @IsInt()
    @Type(() => Number)
    @Min(1)
    pageIndex: number;

    @IsInt()
    @Type(() => Number)
    @Max(1000)
    @Min(1)
    pageSize: number;
}
