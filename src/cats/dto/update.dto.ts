import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {}
