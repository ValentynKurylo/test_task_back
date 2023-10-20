import { ObjectType , Field, ID} from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {RoleEnum} from "../enums/role.enum";

@ObjectType()
@Entity("users")
export class User {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    username: string;
    
    @Field()
    @Column({unique: true})
    email: string;
    
    @Field()
    @Column()
    password: string;
    
    @Field()
    @Column({default: RoleEnum.USER})
    role: RoleEnum;
}