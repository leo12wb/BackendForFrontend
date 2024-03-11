import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import { CRUDRepository, SearchOptions } from 'src/dtos/abstract';
import { SQL } from 'src/dtos/sql.dto';

@Injectable()
export class DatabaseService<T extends SQL> implements CRUDRepository<T> {
  constructor(private prisma: PrismaService, private tableName: string) {}

  update(id: number, data: T): Promise<T> {
    return this.prisma[this.tableName].update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  async delete(id: number): Promise<void> {
    return await this.prisma[this.tableName].update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: false,
      },
    });
  }

  async fetch(id: number, include?: Record<string, boolean>): Promise<T> {
    const item = await this.prisma[this.tableName].findFirst({
      where: {
        id: Number(id),
        isActive: true,
      },
      include,
    });

    if (item) return item;

    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async fetchUuid(uuid: string, include?: Record<string, boolean>): Promise<T> {
    const item = await this.prisma[this.tableName].findFirst({
      where: {
        uuid: uuid,
        isActive: true,
      },
      include,
    });

    if (item) return item;

    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  create(data: T): Promise<T> {
    return this.prisma[this.tableName].create({ data });
  }

  fetchAll(searchOptions?: SearchOptions): Promise<T[]> {
    return this.prisma[this.tableName].findMany({
      ...searchOptions,
      where: { ...searchOptions.where, isActive: true },
    });
  }

  search(searchOptions: SearchOptions): Promise<T[]> {
    return this.prisma[this.tableName].findMany({
      ...searchOptions,
      where: { ...searchOptions.where, isActive: true },
    });
  }
}
