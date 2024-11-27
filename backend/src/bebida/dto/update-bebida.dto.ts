import { CreateBebidaDto } from './create-bebida.dto';

export interface UpdateBebidaDto extends Partial<CreateBebidaDto> {
  id: number;
}
