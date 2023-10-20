import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vegetable } from 'src/entity/vegetable.entity';

@Injectable()
export class VegetableService {
    constructor(@InjectRepository(Vegetable) private readonly vegetableRepository: Repository<Vegetable>) {}

    async postVegetable(vegetable: Vegetable){
        return await this.vegetableRepository.save(vegetable)
    }

    async getVetables(){
        return await this.vegetableRepository.find()
    }

    async getVetableById(id: number){
        return await this.vegetableRepository.findOneById(id)
    }

    async putVetable(name: string, price: number, id: number){
        let vegetable = await this.vegetableRepository.findOneById(id)
        vegetable.name = name
        vegetable.price = price
        return await this.vegetableRepository.save(vegetable)
    }

    async deleteVegetable(id: number){
        let vegetable = await this.getVetableById(id)
        await this.vegetableRepository.delete(vegetable)
        return vegetable
    }
}
