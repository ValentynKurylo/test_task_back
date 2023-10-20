import {forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {UserResolver} from "./users.resolver";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserRepository} from "../entity/user.repository";
import {User} from '../entity/user.entity'
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/authGuard';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/users/user.schema.gql')
        }),
        TypeOrmModule.forFeature([User, UsersService, AuthGuard]),
    ],
    providers: [UserResolver, UsersService],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
