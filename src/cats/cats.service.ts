import { Injectable } from '@nestjs/common';
import { CatModel } from './models/cat.model';
import { CreateCatInput } from './dto/cat.input';

let cats: CatModel[] = [];

@Injectable()
export class CatsService {
  async getAllCats(): Promise<CatModel[]> {
    return cats;
  }

  async getOneCat(id: string): Promise<CatModel> {
    const cat = cats.find((cat) => cat.id === id);
    if (!cat) {
      return null;
    }
    return cat;
  }

  async createCat(dto: CreateCatInput): Promise<CatModel> {
    const cat: CatModel = {
      id: `${cats.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...dto,
    };

    cats.push(cat);
    return cat;
  }

  async updateCat(dto: CreateCatInput, id: string): Promise<CatModel> {
    const cat = cats.find((cat) => cat.id === id);
    if (!cat) {
      return null;
    }

    const newCat = { ...cat, ...dto };
    cats = cats.map((cat) => (cat.id === id ? newCat : cat));

    return await this.getOneCat(newCat.id);
  }

  async deleteCat(id: string): Promise<boolean> {
    const oldCatsLength = cats.length;
    cats = cats.filter((cat) => cat.id !== id);
    return oldCatsLength !== cats.length;
  }
}
