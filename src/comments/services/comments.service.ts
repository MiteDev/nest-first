import { BadRequestException, Injectable } from '@nestjs/common';
import { Comments } from '../comments.entity';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CommentsRepository } from '../repositories/comments.repository';
import { CatsRepository } from 'src/cats/repositories/cats.repository';

@Injectable()
export class CommentsService {
    constructor(
        private readonly commentsRepository: CommentsRepository,
        private readonly catsRepository: CatsRepository
    ) { }

    async getAllComments() {
        try {
            const comments = await this.commentsRepository.getAll();
            return comments;
        } catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createComment(cat_num: number, comments: CommentsCreateDto) {
        try {
            const targetCat = await this.catsRepository.findCatByIdWithoutPassword(cat_num);
            const {contents, author} = comments;
            const validateAuthor = await this.catsRepository.findCatByIdWithoutPassword(author)
            console.log(validateAuthor)

            const newComment = await this.commentsRepository.create({
                author: validateAuthor[0].cat_num,
                name: validateAuthor[0].name,
                contents,
                info: targetCat[0].cat_num
            })

            return newComment;
        } catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async plusLike(comment_id: number) {
        try {
            const comment = await this.commentsRepository.getOneById(comment_id);
            comment.likeCnt += 1;
            const update = await this.commentsRepository.updateCommentData(comment);
            return update;
        } catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
