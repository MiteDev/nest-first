import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @ApiOperation({ summary: "모든 고양이 프로필에 적힌 댓글 가져오기" })
    @Get()
    async getAllComments() {
        return this.commentsService.getAllComments();
    }

    @ApiOperation({ summary: "특정 고양이 프로필에 댓글 남기기" })
    @Post(":cat_num")
    async createComment(
        @Param('cat_num') cat_num: number,
        @Body() body: CommentsCreateDto
    ) {
        return this.commentsService.createComment(cat_num, body);
    }

    @ApiOperation({summary: "댓글 좋아요 수 올리기"})
    @Patch(":comment_id")
    async plusLike(@Param('comment_id') comment_id: number) {
        return this.commentsService.plusLike(comment_id);
    }
}
