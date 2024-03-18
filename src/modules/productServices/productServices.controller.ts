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
import { ProductServices } from 'src/dtos/productServices.dto';

@Controller('services')
export class ProductServicesController {
  constructor(private database: DatabaseService<ProductServices>) {}

  @Get()
  async getAll(@Query('productId') productId: string) {
    return this.database.fetchAll({
      where: {
        productId: {
          contains: productId,
        },
      },
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.database.fetch(id);
  }

  @Post()
  create(@Body() body: ProductServices) {
    return this.database.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: ProductServices) {
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
