import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcException, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { RpcValidationFilter } from './users/rpc.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  app.useGlobalFilters(new RpcValidationFilter());
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,

    exceptionFactory: (errors) => {
      const messages = errors.map(err =>
        Object.values(err.constraints || {}),
      ).flat();

      return new RpcException({
        statusCode: 400,
        message: messages,
      });
    },
  }),
);
  await app.listen();
}
bootstrap();
