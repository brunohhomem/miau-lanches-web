import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PedidoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const { lanchesIds, bebidasIds, adicionaisIds, ...rest } = createPedidoDto;

    return this.prismaService.pedido.create({
      data: {
        ...rest,
        lanches: {
          connect: lanchesIds?.map((id) => ({ id })) || [],
        },
        bebidas: {
          connect: bebidasIds?.map((id) => ({ id })) || [],
        },
        adicionais: {
          connect: adicionaisIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.pedido.findMany({
      include: {
        lanches: true,
        bebidas: true,
        adicionais: true,
        cliente: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.pedido.findUnique({
      where: { id },
      include: {
        lanches: true,
        bebidas: true,
        adicionais: true,
        cliente: true,
      },
    });
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { lanchesIds, bebidasIds, adicionaisIds, ...rest } = updatePedidoDto;

    return this.prismaService.pedido.update({
      where: { id },
      data: {
        ...rest,
        lanches: {
          set: lanchesIds?.map((id) => ({ id })) || [],
        },
        bebidas: {
          set: bebidasIds?.map((id) => ({ id })) || [],
        },
        adicionais: {
          set: adicionaisIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.pedido.delete({
      where: { id },
    });
  }
}
