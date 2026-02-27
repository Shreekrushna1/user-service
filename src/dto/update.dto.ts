
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsNumber()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
    @IsNotEmpty()
    email: string;
}
