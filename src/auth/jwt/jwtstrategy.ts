import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CatsRepository } from "src/cats/repositories/cats.repository";
import { Payload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const cat = await this.catsRepository.findCatByIdWithoutPassword(
            payload.sub
        );

        if(cat) {
            return cat;
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }
}