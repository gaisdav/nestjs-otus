import { IsNumber } from 'class-validator';
import { CreateCatDto } from './create.dto';

export class CatDto extends CreateCatDto {
  @IsNumber()
  id: number;
}
