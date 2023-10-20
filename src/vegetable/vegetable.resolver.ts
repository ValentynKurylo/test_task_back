import { UseGuards } from '@nestjs/common';
import {Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Vegetable } from 'src/entity/vegetable.entity';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/authGuard';
import { Roles } from 'src/guards/roleDecorator';
import { RoleGuard } from 'src/guards/roleGuard';
import { VegetableService } from './vegetable.service';

@Resolver()
export class VegetableResolver {
    constructor(private vegetableService: VegetableService) {
    }


    @Mutation(() => Vegetable)
    @Roles(RoleEnum.ADMIN, RoleEnum.VEGETABLES)
    @UseGuards(AuthGuard, RoleGuard)
    async createVetetable(
        @Args('name') name: string,
        @Args('price') price: number,
    ): Promise<Vegetable> {
        let vegetable = new Vegetable()
        vegetable.name = name
        vegetable.price = price
        return await this.vegetableService.postVegetable(vegetable)
    }

    @Query(()=>[Vegetable])
    @UseGuards(AuthGuard)
    async getVetetables():Promise<Vegetable[]>{
        return await this.vegetableService.getVetables()
    }

    @Query(()=>Vegetable)
    @UseGuards(AuthGuard)
    async getVetetableById(@Args('id') id: number):Promise<Vegetable>{
        return await this.vegetableService.getVetableById(id)
    }

    @Mutation(()=>Vegetable)
    @Roles(RoleEnum.ADMIN, RoleEnum.VEGETABLES)
    @UseGuards(AuthGuard, RoleGuard)
    async updateVetetable(
        @Args('id') id: number,
        @Args('name') name: string,
        @Args('price') price: number,
    ): Promise<Vegetable> {
        return await this.vegetableService.putVetable(name, price, id)
    }

    @Mutation(()=>Vegetable)
    @Roles(RoleEnum.ADMIN, RoleEnum.VEGETABLES)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteVetetable(
        @Args('id') id: number,
    ) {
        return await this.vegetableService.deleteVegetable(id)
    }
}
