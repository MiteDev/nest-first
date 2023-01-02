import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from '../comments.entity';

@Injectable()
export class CommentsRepository {
    constructor(
        @InjectRepository(Comments)
        private readonly commentsRepository: Repository<Comments>
    ) { }

    async getAll() {
        const allComments = await this.commentsRepository.find();
        return allComments;
    }

    async create(param: object) {
        const newComment = await this.commentsRepository.save(param);
        return newComment;
    }

    async getOneById(comment_id: number) {
        const data = await this.commentsRepository.findOneBy({comment_id});
        return data;
    }

    async updateCommentData(comment: Comments): Promise<Comments> {
        const data = await this.commentsRepository.save(comment);
        return data;
    }
}  