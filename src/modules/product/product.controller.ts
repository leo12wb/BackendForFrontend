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
import { Product } from 'src/dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(private database: DatabaseService<Product>) {}

  @Get()
  async getAll(@Query('name') name: string, @Query('uuid') uuid: string) {
    return this.database.fetchAll({
      where: {
        name: {
          contains: name,
        },
        uuid: {
          contains: uuid,
        },
      },
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.database.fetch(id);
  }

  @Post()
  create(@Body() body: Product) {
    return this.database.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Product) {
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
