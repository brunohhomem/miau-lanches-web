import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Controller('ingredientes')
export class IngredienteController {
  constructor(private readonly ingredienteService: IngredienteService) {}

  @Post()
  create(@Body() createIngredienteDto: CreateIngredienteDto) {
    return this.ingredienteService.create(createIngredienteDto);
  }

  @Get()
  findAll() {
    return this.ingredienteService.findAll();
  }

  @Get('/adicionais')
  findAllAdicionais() {
    return this.ingredienteService.findAllAdicionais();
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.ingredienteService.findById(+id);
  }

  @Get('descricao/:descricao')
  async findByDesc(@Param('descricao') descricao: string) {
    return this.ingredienteService.findByDesc(descricao);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredienteDto: UpdateIngredienteDto,
  ) {
    return this.ingredienteService.update(+id, updateIngredienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredienteService.remove(+id);
  }
}
