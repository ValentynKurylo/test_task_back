import { Module } from '@nestjs/common';
import { FruitService } from './fruit.service';
import { FruitResolver } from './fruit.resolver';
import {join} from "path";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from 'src/entity/fruit.entity';
import { AuthGuard } from 'src/guards/authGuard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FruitService, FruitResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/users/user.schema.gql')
    }),
    TypeOrmModule.forFeature([FruitService, Fruit, AuthGuard]),
      AuthModule
  ]
})
export class FruitModule {}
