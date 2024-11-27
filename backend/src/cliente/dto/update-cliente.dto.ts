import { CreateClienteDto } from './create-cliente.dto';

export interface UpdateClienteDto extends Partial<CreateClienteDto> {
  id: number;
}
