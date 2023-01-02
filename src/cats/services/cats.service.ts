import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ReadOnlyCatDto } from '../dto/cat.response.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../repositories/cats.repository';
import { Cats } from '../cats.entity';


@Injectable()
export class CatsService {
    constructor(
        private readonly catsRepository: CatsRepository
    ) { }

    async signUp(body: CatRequestDto) {
        const { email, name, password } = body;
        const isCatExist = await this.catsRepository.existsByEmail(email);

        if(isCatExist) {
            throw new UnauthorizedException('Cat already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const cat = await this.catsRepository.create({
            email,
            name,
            password: hashedPassword
        });
        
        return { id: cat.cat_num, email, name };
    }

    async uploadImg(cat: Cats, file: Express.Multer.File) {
        const fileName = `localhost:3000/media/cats/${file.filename}`;
        const newCat = await this.catsRepository.findByIdAndUpdateImg(
            cat.cat_num,
            fileName
        );
        return newCat;
    }

    async getAllCat(): Promise<ReadOnlyCatDto[]> {
        const cats = await this.catsRepository.getAll();

        const allCats: Array<ReadOnlyCatDto> = cats.map((cat) => {
            return {cat_num: cat.cat_num, email: cat.email, name: cat.name, imgUrl: cat.imgUrl}
        });

        return allCats;
    }
}
