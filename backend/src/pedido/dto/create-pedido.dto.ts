export interface CreatePedidoDto {
  data?: Date;
  descricao: string;
  clienteId: number;
  lanchesIds: number[];
  bebidasIds: number[];
  adicionaisIds: number[];
  preco: number;
  observacoes?: string[];
}
