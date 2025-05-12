
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusGatewayDriver, MercuriusGatewayDriverConfig } from '@nestjs/mercurius';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusGatewayDriverConfig>({
      driver: MercuriusGatewayDriver,
      debug: true,
      graphiql: true,
      
      gateway: {
        errorHandler(error, service) {
          console.error('Error in service:', JSON.stringify(service, null, 2));
          console.error('Error details:', JSON.stringify(error, null, 2));
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
