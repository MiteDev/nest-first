import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CommentsRepository } from './repositories/comments.repository';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    CatsModule
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsRepository
  ],
})
export class CommentsModule {}
