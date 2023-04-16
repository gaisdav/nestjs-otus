import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';
import { CreateCatDto } from './dto/create.dto';
import { UpdateCatDto } from './dto/update.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllCats(): Promise<CatDto[]> {
    return await this.catsService.getAllCats();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOneCat(@Param('id', ParseIntPipe) id: number): Promise<CatDto> {
    return await this.catsService.getOneCat(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createCat(@Body() dto: CreateCatDto): Promise<CatDto> {
    return await this.catsService.createCat(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateCat(
    @Body() dto: UpdateCatDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CatDto> {
    return await this.catsService.updateCat(dto, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteCat(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.catsService.deleteCat(id);
  }
}
