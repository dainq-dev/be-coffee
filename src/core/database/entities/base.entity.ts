/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { Exclude } from 'class-transformer';
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Index,
    VersionColumn,
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    @Index()
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    @Index()
    updated_at?: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    @Exclude()
    deleted_at?: Date;

    @VersionColumn({ default: 0 })
    @Exclude()
    __v?: number;
}
