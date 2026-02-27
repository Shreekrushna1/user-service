
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dto/user-schema';

@Injectable()
export class AppService {
constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async create(data: any) {
  const user = await this.userModel.create(data);
  return user;
}

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, data: any) {
    return await this.userModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return { deleted: true };
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user ?? null;
  }
}
