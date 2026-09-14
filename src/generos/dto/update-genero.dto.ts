import { PartialType } from '../../common/partial-type';
import { CreateGeneroDto } from './create-genero.dto';

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {}
