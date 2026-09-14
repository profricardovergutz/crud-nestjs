import { PartialType } from '../../common/partial-type';
import { CreateFilmeDto } from './create-filme.dto';

export class UpdateFilmeDto extends PartialType(CreateFilmeDto) {}
