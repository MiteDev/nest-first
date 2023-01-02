import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cats } from '../cats.entity';

export class ReadOnlyCatDto extends PickType(Cats, ['email', 'name'] as const) {
    @ApiProperty({
        example: '123',
        description: 'id'
    })
    cat_num: number;
}