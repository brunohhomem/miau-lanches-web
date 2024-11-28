import { Injectable } from '@nestjs/common';
import { CreateLancheDto } from './dto/create-lanche.dto';
import { UpdateLancheDto } from './dto/update-lanche.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class LancheService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLancheDto: CreateLancheDto) {
    const { ingredientesIds, ...rest } = createLancheDto;

    return this.prismaService.lanche.create({
      data: {
        ...rest,
        ingredientes: {
          connect: ingredientesIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.lanche.findMany({
      include: {
        ingredientes: true, // Inclui os ingredientes relacionados
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.lanche.findUnique({
      where: { id },
      include: {
        ingredientes: true, // Inclui os ingredientes relacionados
      },
    });
  }

  async findById(id: number) {
    return this.prismaService.lanche.findUnique({
      where: { id },
      include: {
        ingredientes: true,
      },
    });
  }

  async findByDesc(descricao: string) {
    return this.prismaService.lanche.findFirst({
      where: { descricao: { contains: descricao, mode: 'insensitive' } },
      include: {
        ingredientes: true,
      },
    });
  }

  async update(id: number, updateLancheDto: UpdateLancheDto) {
    const { ingredientesIds, ...rest } = updateLancheDto;

    return this.prismaService.lanche.update({
      where: { id },
      data: {
        ...rest,
        ingredientes: {
          set: ingredientesIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.lanche.delete({
      where: { id },
    });
  }
}
