import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { TodoModule } from '../contexts/todo/todo.module';
import { dataSourceOptions } from '../data-config/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
          entities: [join(__dirname, '../contexts/todo/infrastructure/database/models/**/*.model{.ts,.js}')]
        };
      },
    }),
    CqrsModule.forRoot({}),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      path: '/todo',
      graphiql: true,
      debug: true,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'todo-schema.gql'),
      },
    }),
    TodoModule
  ]
})
export class AppModule {}
