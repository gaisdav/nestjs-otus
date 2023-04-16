import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';
import { CreateCatDto } from './dto/create.dto';
import { UpdateCatDto } from './dto/update.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getAllCats(): Promise<CatDto[]> {
    return await this.catsService.getAllCats();
  }

  @Get(':id')
  async getOneCat(@Param('id', ParseIntPipe) id: number): Promise<CatDto> {
    return await this.catsService.getOneCat(id);
  }

  @Post()
  async createCat(@Body() dto: CreateCatDto): Promise<CatDto> {
    return await this.catsService.createCat(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateCat(
    @Body() dto: UpdateCatDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CatDto> {
    return await this.catsService.updateCat(dto, id);
  }

  @Delete(':id')
  async deleteCat(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.catsService.deleteCat(id);
  }
}
