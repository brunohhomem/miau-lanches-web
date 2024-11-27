import { Injectable } from '@nestjs/common';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class BebidaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBebidaDto: CreateBebidaDto) {
    return this.prismaService.bebida.create({
      data: createBebidaDto,
    });
  }

  async findAll() {
    return this.prismaService.bebida.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.bebida.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBebidaDto: UpdateBebidaDto) {
    return this.prismaService.bebida.update({
      where: { id },
      data: updateBebidaDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.bebida.delete({
      where: { id },
    });
  }
}
