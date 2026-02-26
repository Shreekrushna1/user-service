import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users/user.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private users: CreateUserDto[] = [];
  private id = 1;
  create(data) {
    const emailExists = this.users.find((user) => user.email === data.email);

    if (emailExists) {
      throw new RpcException({
        statusCode: 400,
        message: 'Email already exists',
      });
    }
    const user = { id: this.id++, ...data };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }
}
