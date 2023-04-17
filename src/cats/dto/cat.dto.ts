import { IsNumber, IsString } from 'class-validator';
import { CreateCatDto } from './create.dto';

export class CatDto extends CreateCatDto {
  @IsNumber()
  id: number;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
