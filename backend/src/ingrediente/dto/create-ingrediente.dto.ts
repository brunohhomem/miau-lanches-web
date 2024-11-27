export interface CreateIngredienteDto {
  descricao: string;
  preco: number;
  isAdicional: boolean;
  pedidoId?: number;
}
