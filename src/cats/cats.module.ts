import { forwardRef, Module } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import { Cats } from './cats.entity';
import { CatsRepository } from './repositories/cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
    imports: [
        MulterModule.register({
            dest: './upload',
        }),
        TypeOrmModule.forFeature([Cats]),
        forwardRef(() => AuthModule)
    ],
    controllers: [CatsController],
    providers: [
        CatsService,
        CatsRepository
    ],
    exports: [
        CatsService,
        CatsRepository
    ]
})
export class CatsModule { }
