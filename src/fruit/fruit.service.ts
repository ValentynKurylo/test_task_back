import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fruit } from 'src/entity/fruit.entity';

@Injectable()
export class FruitService {
    constructor(@InjectRepository(Fruit) private readonly fruitRepository: Repository<Fruit>) {}
    
    async postFruit(fruit: Fruit){
        return await this.fruitRepository.save(fruit)
    }
    
    async getFruits(){
        return await this.fruitRepository.find()
    }

    async getFruitById(id: number){
        return await this.fruitRepository.findOneById(id)
    }

    async putFruit(name: string, price: number, id: number){
        let fruit = await this.getFruitById(id)
        fruit.name = name
        fruit.price = price
        return await this.fruitRepository.save(fruit)
    }
    
    async deleteFruit(id: number){
        let fruit = await this.getFruitById(id)
        await this.fruitRepository.delete(fruit)
        return fruit
    }
}
