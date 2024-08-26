/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MSG } from '@core/messages/common';
import { BadRequestException, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admins) public adminRepo: Repository<any>,
        //     @InjectRepository(Tokens) private tokenRepo: Repository<Tokens>,
        // private readonly jwtService: JwtService,
        //     private readonly tokenService: TokensService,
    ) { }
    async signIn(body: any) {
        const { username, password } = body;

        const admin = await this.adminRepo
            .createQueryBuilder('admins')
            .where({ is_active: true })
            .andWhere([{ username }, { email: username }])
            .leftJoinAndSelect('admins.role', 'role')
            .select([
                'admins.id',
                'admins.created_at',
                'admins.updated_at',
                'admins.username',
                'admins.email',
                'admins.first_name',
                'admins.last_name',
                'admins.full_name',
                'admins.phone_number',
                'admins.birthday',
                'admins.is_active',
                'admins.password_salt',
                'admins.password_hash',
                'role.id',
                'role.name',
                'role.permissions',
            ])
            .getOne();
        if (!admin) {
            throw new BadRequestException(MSG.USERNAME_OR_PASSWORD_WRONG);
        }

        const isValidPassword = this.comparePassword({
            password,
            passwordHash: admin.password_hash,
            passwordSalt: admin.password_salt,
        });
        if (!isValidPassword) {
            throw new BadRequestException(MSG.USERNAME_OR_PASSWORD_WRONG);
        }

        delete admin?.password_hash;
        delete admin?.password_salt;

        const { access, refresh } = this.tokenService.generateToken(admin);
        const jwtAccess = this.jwtService.sign(access, {
            expiresIn: configService.get('TOKEN_EXPIRE'),
        });
        const jwtRefresh = this.jwtService.sign(refresh, {
            expiresIn: configService.get('REFRESH_TOKEN_EXPIRE'),
        });

        await this.tokenRepo.save({
            access_token: access.access_token,
            access_token_exp: access.access_token_exp,
            access_token_iat: access.access_token_iat,
            refresh_token: refresh.refresh_token,
            refresh_token_exp: refresh.refresh_token_exp,
            refresh_token_iat: refresh.refresh_token_iat,
            admin_id: admin.id,
        });

        return {
            access_token: jwtAccess,
            access_token_exp: access.access_token_exp,
            refresh_token: jwtRefresh,
            user: admin,
        };
    }
}
