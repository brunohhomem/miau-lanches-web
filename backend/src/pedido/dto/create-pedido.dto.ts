export interface CreatePedidoDto {
  descricao: string;
  preco: number;
  lanches: number[];
  adicionais: number[];
  bebidas: number[];
  observacoes: string;
  cliente: { nome: string; endereco: string; telefone: string };
}
