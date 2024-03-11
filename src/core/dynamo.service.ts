import { v4 as uuid } from 'uuid';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dynamo } from 'src/dtos/abstract';

const region = process.env.AWS_REGION ?? 'sa-east-1';
const dynamoDB = new DynamoDB({ region });

// obter dados gerais do banco
// dynamoDB.listTables({}, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

@Injectable()
export class DynamoService {
  constructor(private TableName: string) {}

  async fetchAll() {
    try {
      return dynamoDB.scan({
        TableName: this.TableName,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async dispatch(dynamo: Dynamo) {
    dynamo.id = uuid();

    try {
      return await dynamoDB.putItem({
        TableName: this.TableName,
        Item: { ...dynamo.toDynamo() },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async fetchById(id: string) {
    try {
      return await dynamoDB.scan({
        TableName: this.TableName,
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': { S: id },
        },
      });
    } catch (e) {
      console.log(id);
      throw new InternalServerErrorException(e);
    }
  }

  async delete(id: string) {
    try {
      return await dynamoDB.deleteItem({
        TableName: this.TableName,
        Key: {
          id: { N: id },
        },
        // ConditionExpression: 'id = :id',
        // ExpressionAttributeValues: {
        //   ':id': { S: id },
        // },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
