import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create.dto';
import { CatDto } from './dto/cat.dto';
import { UpdateCatDto } from './dto/update.dto';

const cats: CatDto[] = [
  {
    id: 1,
    name: 'Newton',
    age: 2,
    breed: 'Metis',
  },
  {
    id: 2,
    name: 'Einstein',
    age: 1,
    breed: 'Metis',
  },
];

@Injectable()
export class CatsService {
  async getAllCats(): Promise<CatDto[]> {
    return cats;
  }

  async getOneCat(id: number): Promise<CatDto> {
    const cat = cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} is not found`);
    }
    return cat;
  }

  async createCat(dto: CreateCatDto): Promise<CatDto> {
    const newCat = {
      id: Date.now(),
      ...dto,
    };
    cats.push(newCat);

    return newCat;
  }

  async updateCat(dto: UpdateCatDto, id: number): Promise<CatDto> {
    const cat = await this.getOneCat(id);
    const updatedCat = { ...cat, ...dto };
    const index = cats.findIndex((cat) => cat.id === id);
    cats[index] = updatedCat;

    return updatedCat;
  }

  async deleteCat(id: number): Promise<void> {
    const index = cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cat with id ${id} is not found`);
    }
    cats.splice(index, 1);
  }
}
