import { AttributeValue } from '@aws-sdk/client-dynamodb';

export abstract class CRUDRepository<T> {
  abstract fetchAll(searchOptions?: SearchOptions): Promise<T[]>;
  abstract fetch(id: number): Promise<T>;
  abstract create(data: T): Promise<T>;
  abstract update(id: number, data: T): Promise<T>;
  abstract delete(id: number): Promise<void>;
  abstract search(searchOptions: SearchOptions): Promise<T[]>;
}

export interface SearchOptions {
  where?: object;
  include?: Record<string, object | boolean>;
}

export abstract class Dynamo {
  abstract id?: string;
  abstract toDynamo(): Record<string, AttributeValue>;
}
