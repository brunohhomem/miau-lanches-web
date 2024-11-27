import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    return this.prismaService.cliente.create({
      data: createClienteDto,
    });
  }

  async findAll() {
    return this.prismaService.cliente.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findAllWithPedido() {
    return this.prismaService.cliente.findMany({
      include: {
        pedidos: true, // Inclui os pedidos relacionados
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.cliente.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.prismaService.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.cliente.delete({
      where: { id },
    });
  }
}
