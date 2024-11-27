import { CreateIngredienteDto } from './create-ingrediente.dto';

export interface UpdateIngredienteDto extends Partial<CreateIngredienteDto> {
  id: number;
}
