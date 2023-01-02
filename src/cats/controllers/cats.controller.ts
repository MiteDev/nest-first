import { Controller, Get, Post, Put, Patch, Delete, HttpException, UseFilters, Param, ParseIntPipe, Body, UseGuards, Req, UploadedFile, UploadedFiles } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from '../services/cats.service';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ReadOnlyCatDto } from '../dto/cat.response.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cats } from '../cats.entity';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
        private readonly authService: AuthService
    ) { }

    @ApiOperation({ summary: '현재 고양이 가져오기' })
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@CurrentUser() cat) {
        console.log(cat);
        return cat;
    }

    @ApiResponse({
        status: 500,
        description: 'Server Error'
    })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: ReadOnlyCatDto
    })
    @ApiOperation({ summary: '회원가입' })
    @Post()
    async signUp(@Body() body: CatRequestDto) {
        return await this.catsService.signUp(body);
    }

    @ApiOperation({ summary: '로그인' })
    @Post('login')
    login(@Body() data: LoginRequestDto) {
        return this.authService.jwtLogin(data);
    }
    
    @ApiOperation({ summary: '고양이 이미지 업로드' })
    @UseInterceptors(FileInterceptor('image', multerOptions('cats')))
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    uploadCatImg(@UploadedFile() file: Express.Multer.File, @CurrentUser() cat: Cats) {
        return this.catsService.uploadImg(cat, file);
    }

    @ApiOperation({ summary: '모든 고양이 가져오기' })
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllCat() {
        return this.catsService.getAllCat();
    }
}
