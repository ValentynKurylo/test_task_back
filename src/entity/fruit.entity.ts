import { ObjectType , Field, ID, Float} from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity("fruits")
export class Fruit {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string

    @Field(()=>Float)
    @Column()
    price: number
}