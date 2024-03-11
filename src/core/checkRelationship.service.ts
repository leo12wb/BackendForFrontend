import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { PrismaService } from 'src/core/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
@ValidatorConstraint({ name: 'CheckRelationship', async: true })
export class CheckRelationshipValidator
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly tableName: string,
  ) {}

  async validate(id: number) {
    const item = await this.prisma[this.tableName].findFirst({
      where: { id: Number(id) },
    });

    if (item) return item;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} not found.`;
  }
}

export function CheckRelationship(
  tableName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: new CheckRelationshipValidator(new PrismaService(), tableName),
    });
  };
}
