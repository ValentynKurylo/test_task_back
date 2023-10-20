import { UseGuards } from '@nestjs/common';
import {Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Fruit } from 'src/entity/fruit.entity';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/authGuard';
import { Roles } from 'src/guards/roleDecorator';
import { RoleGuard } from 'src/guards/roleGuard';
import { FruitService } from './fruit.service';

@Resolver()
export class FruitResolver {
    constructor(private fruitService: FruitService) {
    }


    @Mutation(() => Fruit)
    @Roles(RoleEnum.FRUIT, RoleEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async createFruit(
        @Args('name') name: string,
        @Args('price') price: number,
    ): Promise<Fruit> {
        let fruit = new Fruit()
        fruit.name = name
        fruit.price = price
        return await this.fruitService.postFruit(fruit)
    }

    @Query(()=>[Fruit])
    @UseGuards(AuthGuard)
    async getFruits():Promise<Fruit[]>{
        return await this.fruitService.getFruits()
    }

    @Query(()=>Fruit)
    @UseGuards(AuthGuard)
    async getFruitById(@Args('id') id: number):Promise<Fruit>{
        return await this.fruitService.getFruitById(id)
    }

    @Mutation(()=>Fruit)
    @Roles(RoleEnum.FRUIT, RoleEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async updateFruit(
        @Args('id') id: number,
        @Args('name') name: string,
        @Args('price') price: number,
    ): Promise<Fruit> {
        return await this.fruitService.putFruit(name, price, id)
    }

    @Mutation(()=>Fruit)
    @Roles(RoleEnum.FRUIT, RoleEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteFruit(
        @Args('id') id: number,
    ) {
        return await this.fruitService.deleteFruit(id)
    }
}
