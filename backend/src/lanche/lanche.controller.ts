import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LancheService } from './lanche.service';
import { CreateLancheDto } from './dto/create-lanche.dto';
import { UpdateLancheDto } from './dto/update-lanche.dto';

@Controller('lanches')
export class LancheController {
  constructor(private readonly lancheService: LancheService) {}

  @Post()
  create(@Body() createLancheDto: CreateLancheDto) {
    return this.lancheService.create(createLancheDto);
  }

  @Get()
  findAll() {
    return this.lancheService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lancheService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLancheDto: UpdateLancheDto) {
    return this.lancheService.update(+id, updateLancheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lancheService.remove(+id);
  }
}
