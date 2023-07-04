import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'cat ' })
export class CatModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Number)
  age: number;

  @Field((type) => String)
  breed: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
