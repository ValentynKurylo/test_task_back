import {Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "src/entity/user.entity";
import { RoleEnum } from "src/enums/role.enum";
import { AuthService } from "./auth.service";


@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {
    }
    
    @Mutation(() => User)
    async registration(
        @Args('username') username: string,
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<User> {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password
        return await this.authService.registration(user);
    }

    @Mutation(() => String)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<String> {
        const body = {
            email: email,
            password: password
        }
        return await this.authService.login(body);
    }
}