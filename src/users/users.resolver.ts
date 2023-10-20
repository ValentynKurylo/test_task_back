import {Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../entity/user.entity";
import {UserRepository} from "../entity/user.repository";
import {RoleEnum} from '../enums/role.enum'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authGuard';
import { RoleGuard } from 'src/guards/roleGuard';
import { Roles } from 'src/guards/roleDecorator';


@Resolver(()=>User)
export class UserResolver {
    constructor(private userService: UsersService){}

    @Query(()=>[User])
    async getUsers():Promise<User[]>{
        return await this.userService.getUsers()
    }

    @Query(()=>User)
    async getUserById(@Args('id') id: number): Promise<User>{
        return await this.userService.getUserById(id)
    }

    @Query(()=>User)
    async getUserByEmail(@Args('email') email: string): Promise<User>{
        return await this.userService.getByEmail(email)
    }

    @Mutation(() => User)
    async createUser(
        @Args('username') username: string,
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<User> {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password
        return await this.userService.postUser(user);
    }

    @Mutation(()=>User)
    @Roles(RoleEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async patchUserRole(
        @Args('id') id: number,
        @Args('role') role: RoleEnum
    ): Promise<User>{
        return await this.userService.patchUserRole(id, role)
    }

    @Mutation(()=> User)
    @Roles(RoleEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteUser(
        @Args('id') id: number
    ): Promise<User>{
        return await this.userService.deleteUser(id)
    }
    
}