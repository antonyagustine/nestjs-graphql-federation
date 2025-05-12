import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusFederationDriver, MercuriusFederationDriverConfig } from '@nestjs/mercurius';

import { UserModule } from '@user/contexts/user/user.module';
import { dataSourceOptions } from '@user/data-config/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
          entities: [join(__dirname, '../contexts/user/infrastructure/database/models/**/*.model{.ts,.js}')]
        };
      }
    }),
    CqrsModule.forRoot({}),
    GraphQLModule.forRoot<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      path: '/user',
      autoSchemaFile: {
        federation: 2,
      }
    }),
    UserModule
  ]
})
export class AppModule { }
