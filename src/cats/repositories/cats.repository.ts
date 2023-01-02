import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cats } from "../cats.entity";
import { HttpException } from "@nestjs/common"
import { CatRequestDto } from "../dto/cats.request.dto";

@Injectable()
export class CatsRepository {
    constructor(
        @InjectRepository(Cats)
        private readonly catRepository: Repository<Cats>
    ) { }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            const result = await this.catRepository.exist({ where: { email } });
            return result;
        } catch (err) {
            throw new HttpException('db_error', 400);
        }
    }

    async create(cat: CatRequestDto): Promise<Cats> {
        return await this.catRepository.save(cat);
    }

    async findCatByEmail(email: string): Promise<Cats | null> {
        const cat = await this.catRepository.findOneBy({ email });
        return cat;
    }

    async findCatByIdWithoutPassword(cat_num: number): Promise<Cats | any> {
        const cat = await this.catRepository.find({
            select: {
                cat_num: true,
                email: true,
                name: true
            }, where: {
                cat_num: cat_num
            }
        })

        return cat;
    }

    async findByIdAndUpdateImg(cat_num: number, fileName: string): Promise<CatRequestDto> {
        const cat = await this.catRepository.findOneBy({ cat_num });
        cat.imgUrl = fileName;
        const newCat = this.catRepository.save(cat);

        return newCat;
    }

    async getAll() {
        const cat = await this.catRepository.find({
            relations: ['cat_num']
        });
        return cat;
    }
}