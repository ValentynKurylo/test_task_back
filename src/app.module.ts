import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {join} from 'path'
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import { UserRepository } from './entity/user.repository';
import { AuthModule } from './auth/auth.module';
import { FruitModule } from './fruit/fruit.module';
import { Fruit } from './entity/fruit.entity';
import { VegetableModule } from './vegetable/vegetable.module';
import { Vegetable } from './entity/vegetable.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [User, Fruit, Vegetable],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Fruit, Vegetable]),
    UsersModule,
    AuthModule,
    FruitModule,
    VegetableModule
  ]
})
export class AppModule {}
