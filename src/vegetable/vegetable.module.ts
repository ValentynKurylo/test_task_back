import { Module } from '@nestjs/common';
import { VegetableResolver } from './vegetable.resolver';
import { VegetableService } from './vegetable.service';
import {join} from "path";
import { GraphQLModule } from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Vegetable} from '../entity/vegetable.entity'
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [VegetableResolver, VegetableService],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/users/user.schema.gql')
    }),
    TypeOrmModule.forFeature([Vegetable, VegetableService]),
      AuthModule
  ]
})
export class VegetableModule {}
