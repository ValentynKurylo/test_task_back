import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { AuthDTO } from './authDTO';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) {
    }

    async registration(user: User){
        const candidate = await this.userService.getByEmail(user.email)
        if(candidate){
            throw  new  HttpException('User with email already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(user.password, 4)
        return await this.userService.postUser({...user, password: hashPassword})
    }

    async login(authUser: AuthDTO){
        const user = await this.userService.getByEmail(authUser.email)
        if(!user){
            throw new HttpException("Wrong email or password", HttpStatus.BAD_REQUEST)
        }
        const isPassword = await bcrypt.compare(authUser.password, user.password)
        if(!isPassword){
            throw new HttpException("Wrong email or password", HttpStatus.BAD_REQUEST)
        }
        return await this.generateToken(user)
    }
    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, role: user.role, username: user.username}
        return this.jwtService.sign(payload)
    }
}
