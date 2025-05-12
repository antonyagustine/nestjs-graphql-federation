import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { UserModule } from '@user/contexts/user/user.module';
import { dataSourceOptions } from '@user/data-config/data-source';
import { UserDTO } from '@user/contexts/user/application/dto/user.output';

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
      },
    }),
    CqrsModule.forRoot({}),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      path: '/user',
      graphiql: true,
      debug: true,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'user-schema.gql'),
      },
      buildSchemaOptions: {
        orphanedTypes: [UserDTO],
      },
    }),
    UserModule
  ]
})
export class AppModule { }
