import {
  Controller,
  Post,
  Body,
  Param,
  //Query,
} from '@nestjs/common';

import { DatabaseService } from 'src/core/database.service';
import { BffOne, BffTwo } from 'src/dtos/bff.dto';
//import { Product } from 'src/dtos/product.dto';
import { ProductServices } from 'src/dtos/productServices.dto';
import { MicroServices } from 'src/dtos/microServices.dto';

@Controller('apiBff')
export class BffController {
  constructor(
    //private databaseP: DatabaseService<Product>,
    private databasePs: DatabaseService<ProductServices>,
    private databaseMs: DatabaseService<MicroServices>,
  ) {}

  @Post()
  async getAll(@Body() body: BffOne) {
    return this.databasePs.fetchAll({
      where: {
        productId: {
          contains: body.produtoId,
        },
      },
      include: {
        microServices: true,
      },
    });
  }

  @Post(':microServicesId')
  async requestMicroService(
    @Param('microServicesId') microServicesId: number,
    @Body() body: BffTwo,
  ) {
    const micro = this.databaseMs.fetchAll({
      where: {
        uuid: {
          contains: microServicesId,
        },
      },
    });

    micro.then(async (responses) => {
      const allResponses = [];
      for (const response of responses) {
        const res = await fetch(response.url, {
          method: response.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body.payload),
        });
        allResponses.push(res);
      }

      return allResponses;
    });
  }
}
