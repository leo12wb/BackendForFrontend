import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Header,
  Res,
  //Query,
} from '@nestjs/common';

import { DatabaseService } from 'src/core/database.service';
import { Bff } from 'src/dtos/bff.dto';
//import { Product } from 'src/dtos/product.dto';
//import { ProductServices } from 'src/dtos/productServices.dto';
import { MicroServices } from 'src/dtos/microServices.dto';

import { Response } from 'express';

import * as path from 'path';

@Controller('bff')
export class BffController {
  constructor(
    //private databaseP: DatabaseService<Product>,
    // private databasePs: DatabaseService<ProductServices>,
    private databaseMs: DatabaseService<MicroServices>,
  ) {}

  @Post(':servico/:version')
  @Header('Cache-Control', 'none')
  async requestMicroService(
    @Param('servico') servico: string,
    @Param('version') version: string,
    @Body() body: Bff,
  ) {
    const micro = this.databaseMs.fetchAll({
      where: {
        uuid: {
          contains: servico,
        },
        // name:{
        //   contains: name,
        // },
        version: {
          contains: version,
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

@Controller('page')
export class pageController {
  @Get()
  root(@Res() res: Response): void {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
}
