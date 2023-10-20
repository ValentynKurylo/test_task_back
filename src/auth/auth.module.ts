import {forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import {join} from "path";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../entity/user.entity'
import { AuthResolver } from './auth.resolver';

@Module({
    
    providers: [AuthResolver, AuthService],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'SECRET',
            signOptions: {
                expiresIn: '1h'
            }
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/users/user.schema.gql')
        }),
        TypeOrmModule.forFeature([AuthService, User])
    ],
    exports: [
        JwtModule,
        AuthService
    ]
})
export class AuthModule {}
