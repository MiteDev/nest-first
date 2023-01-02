import { Common } from 'src/common/entities/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'comments'})
export class Comments extends Common {
    @ApiProperty({
        description: '댓글 id',
        required: true
    })
    @PrimaryGeneratedColumn()
    comment_id: number;

    @ApiProperty({
        description: '작성한 고양이 id',
        required: true
    })
    @Column()
    author: number;

    @ApiProperty({
        description: '댓글 컨텐츠'
    })
    @Column()
    contents: string;

    @ApiProperty({
        description: 'name',
        required: true
    })
    @Column()
    name: string;

    @ApiProperty({
        description: '좋아요 수',
    })
    @Column({
        default: 0
    })
    likeCnt: number;

    @ApiProperty({
        description: '작성 대상(게시물, 정보글)',
        required: true
    })
    @Column()
    info: number;
}