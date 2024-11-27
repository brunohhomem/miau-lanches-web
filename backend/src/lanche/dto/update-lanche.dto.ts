import { CreateLancheDto } from './create-lanche.dto';

export interface UpdateLancheDto extends Partial<CreateLancheDto> {
  id: number;
}
