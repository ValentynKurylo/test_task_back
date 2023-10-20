import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/enums/role.enum';
import { Repository } from 'typeorm';
import {User} from '../entity/user.entity'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    
    async postUser(body: User){
        return await this.userRepository.save(body)
    }
    
    async getUsers(){
        return await this.userRepository.find()
    }
    
    async getUserById(id: number){
        return await this.userRepository.findOneById(id)
    }
    
    async getByEmail(email: string){
        return await this.userRepository.findOne({where: {email}})
    }

    async patchUserRole(id: number, role: RoleEnum){
        let user = await this.getUserById(id)
        user.role = role
        return await this.userRepository.save(user)
    }

    async deleteUser(id: number){
        let user = await this.getUserById(id)
        await this.userRepository.delete(user)
        return user
    }
}
