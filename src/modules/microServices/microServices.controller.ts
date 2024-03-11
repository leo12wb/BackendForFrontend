import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DatabaseService } from 'src/core/database.service';
import { MicroServices } from 'src/dtos/microServices.dto';

@Controller('microServices')
export class MicroServicesController {
  constructor(private database: DatabaseService<MicroServices>) {}

  @Get()
  async getAll(@Query('name') name: string) {
    return this.database.fetchAll({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.database.fetch(id);
  }

  @Post()
  create(@Body() body: MicroServices) {
    return this.database.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: MicroServices) {
    const res = this.get(id);
    res
      .then(() => {
        return this.database.update(id, body);
      })
      .catch((e) => {
        console.log(e);
      });
    return res;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.database.delete(id);
  }
}
