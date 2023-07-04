import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateCatInput {
  @Field()
  @IsString()
  name: string;
  @Field((type) => Number)
  @IsNumber()
  age: number;
  @Field((type) => String)
  @IsString()
  breed: string;
}
