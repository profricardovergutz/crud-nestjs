import { PartialType } from '../../common/partial-type';
import { CreateTipoPessoaDto } from './create-tipo-pessoa.dto';

export class UpdateTipoPessoaDto extends PartialType(CreateTipoPessoaDto) {}
