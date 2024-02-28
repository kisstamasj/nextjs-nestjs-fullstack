import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  password?: string;
}
