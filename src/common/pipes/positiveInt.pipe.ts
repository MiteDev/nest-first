import { Injectable, PipeTransform, HttpException } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform {
    transform(value: number) {
        console.log(value);
        if (value < 0) {
            throw new HttpException('value is lower than 0', 400)
        }
        return value;
    } 
}