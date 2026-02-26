import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(BadRequestException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const res: any = exception.getResponse();

    throw new RpcException({
      statusCode: 400,
      message: res.message,
    });
  }
}