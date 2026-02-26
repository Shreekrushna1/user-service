import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './users/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createUser')
  create(@Payload() data: CreateUserDto) {
    return this.appService.create(data);
  }

  @MessagePattern('getUsers')
  findAll() {
    return this.appService.findAll();
  }
}
