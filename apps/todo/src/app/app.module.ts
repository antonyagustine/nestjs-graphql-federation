import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusFederationDriver, MercuriusFederationDriverConfig } from '@nestjs/mercurius';

import { Assignee } from '@todo/contexts/todo/application/dto/task.output';

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
    GraphQLModule.forRoot<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      path: '/todo',
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [Assignee],
      },
    }),
    TodoModule
  ]
})
export class AppModule {}
