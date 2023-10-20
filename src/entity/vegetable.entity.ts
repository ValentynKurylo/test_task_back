import { ObjectType , Field, ID, Float} from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity("vegetebles")
export class Vegetable {
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