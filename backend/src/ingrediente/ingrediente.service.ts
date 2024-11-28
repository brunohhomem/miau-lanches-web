import { Injectable } from '@nestjs/common';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class IngredienteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createIngredienteDto: CreateIngredienteDto) {
    return this.prismaService.ingrediente.create({
      data: createIngredienteDto,
    });
  }

  async findAll() {
    return this.prismaService.ingrediente.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findAllAdicionais() {
    return this.prismaService.ingrediente.findMany({
      where: { isAdicional: true },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    return this.prismaService.ingrediente.findUnique({
      where: { id },
    });
  }

  async findByDesc(descricao: string) {
    return this.prismaService.ingrediente.findFirst({
      where: { descricao: { contains: descricao, mode: 'insensitive' } },
    });
  }

  async update(id: number, updateIngredienteDto: UpdateIngredienteDto) {
    return this.prismaService.ingrediente.update({
      where: { id },
      data: updateIngredienteDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.ingrediente.delete({
      where: { id },
    });
  }
}
