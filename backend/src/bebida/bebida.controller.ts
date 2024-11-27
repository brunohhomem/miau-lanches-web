import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BebidaService } from './bebida.service';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';

@Controller('bebidas')
export class BebidaController {
  constructor(private readonly bebidaService: BebidaService) {}

  @Post()
  create(@Body() createBebidaDto: CreateBebidaDto) {
    return this.bebidaService.create(createBebidaDto);
  }

  @Get()
  findAll() {
    return this.bebidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bebidaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBebidaDto: UpdateBebidaDto) {
    return this.bebidaService.update(+id, updateBebidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bebidaService.remove(+id);
  }
}
