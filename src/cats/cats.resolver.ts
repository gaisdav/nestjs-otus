import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateCatInput } from './dto/cat.input';
import { CatModel } from './models/cat.model';
import { CatsService } from './cats.service';

const pubSub = new PubSub();

@Resolver((of) => CatModel)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query((returns) => CatModel)
  async cat(@Args('id') id: string): Promise<CatModel> {
    const cat = await this.catsService.getOneCat(id);
    if (!cat) {
      throw new NotFoundException(id);
    }

    return cat;
  }

  @Query((returns) => [CatModel])
  cats(): Promise<CatModel[]> {
    return this.catsService.getAllCats();
  }

  @Mutation((returns) => CatModel)
  async addCat(@Args('newCat') newCatData: CreateCatInput): Promise<CatModel> {
    const cat = await this.catsService.createCat(newCatData);
    pubSub.publish('catAdded', { catAdded: cat });
    return cat;
  }

  @Mutation((returns) => Boolean)
  async removeCat(@Args('id') id: string) {
    return this.catsService.deleteCat(id);
  }

  @Subscription((returns) => CatModel)
  catAdded() {
    return pubSub.asyncIterator('catAdded');
  }
}
