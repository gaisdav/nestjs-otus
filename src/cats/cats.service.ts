import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create.dto';
import { UpdateCatDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CatsEntity } from './cats.entity';
import { Repository, UpdateResult } from 'typeorm';
import { validate } from 'class-validator';
import { ValidateException } from '../customExeptions';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsEntity)
    private readonly catsEntityRepository: Repository<CatsEntity>,
  ) {}

  async getAllCats(): Promise<CatsEntity[]> {
    return this.catsEntityRepository.find();
  }

  async getOneCat(id: number): Promise<CatsEntity> {
    const cat = this.catsEntityRepository.findOneBy({ id });
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} is not found`);
    }
    return cat;
  }

  async createCat(dto: CreateCatDto): Promise<CatsEntity> {
    const cat = new CatsEntity();
    cat.age = dto.age;
    cat.name = dto.name;
    cat.breed = dto.breed;

    const fields = await validate(cat);

    if (fields.length) {
      throw new ValidateException(fields);
    }

    const createdCat = await this.catsEntityRepository.save(cat);
    return await this.getOneCat(createdCat.id);
  }

  async updateCat(dto: UpdateCatDto, id: number): Promise<CatsEntity> {
    const { affected }: UpdateResult = await this.catsEntityRepository.update(
      { id },
      dto,
    );

    if (affected === 0) {
      throw new NotFoundException(`Cat with id ${id} is not found`);
    }

    return await this.getOneCat(id);
  }

  async deleteCat(id: number): Promise<void> {
    await this.catsEntityRepository.delete({ id });
  }
}
