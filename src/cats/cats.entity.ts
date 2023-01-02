import { Common } from 'src/common/entities/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'cats'})
export class Cats extends Common {
    @ApiProperty({
        example: '123',
        description: 'id'
    })
    @PrimaryGeneratedColumn()
    cat_num: number;

    @ApiProperty({
        example: 'example@test.com',
        description: 'email',
        required: true
    })
    @Column({
        unique: true,
    })
    email: string;

    @ApiProperty({
        example: 'foo',
        description: 'name',
        required: true
    })
    @Column()
    name: string;

    @ApiProperty({
        example: 'password',
        description: 'password',
        required: true
    })
    @Column()
    password: string;

    @Column({
        default: '',
    })
    imgUrl: string;
}