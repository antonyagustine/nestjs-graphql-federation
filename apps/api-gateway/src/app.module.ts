import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusGatewayDriver, MercuriusGatewayDriverConfig } from '@nestjs/mercurius';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusGatewayDriverConfig>({
      driver: MercuriusGatewayDriver,
      graphiql: true,
      debug: true,
      autoSchemaFile: {
        federation: 2,
      },
      gateway: {
        errorHandler(error, service) {
          Logger.error('Error in service:', service, error);

          return error;
        },
        services: [
          { name: 'user', url: 'http://localhost:3001/user' },
          { name: 'todo', url: 'http://localhost:3002/todo' },
        ]
      },
    }),
  ],
})
export class AppModule { }
