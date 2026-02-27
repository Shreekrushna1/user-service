import { Controller } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @MessagePattern("create")
  async create(@Payload() data: CreateDto) {
    try {
      return this.service.create(data);
    } catch (error) {
      if (error.code == 11000) {
        throw new RpcException({
          statusCode: 400,
          message: "Email already exits",
        });
      } else {
        throw new RpcException({
          statusCode: 500,
          message: "someting went wrong",
        });
      }
    }
  }

  @MessagePattern("findAll")
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern("findOne")
  findOne(@Payload() data: any) {
    return this.service.findOne(data.id);
  }

  @MessagePattern("update")
  update(@Payload() data: UpdateDto & {id:string}) {
    
    return this.service.update(data.id, data);
  }

  @MessagePattern("remove")
  remove(@Payload() data: any) {
    return this.service.remove(data.id);
  }

  @MessagePattern("find_by_email")
  findByEmail(@Payload() email: string) {
    return this.service.findByEmail(email);
  }
}
