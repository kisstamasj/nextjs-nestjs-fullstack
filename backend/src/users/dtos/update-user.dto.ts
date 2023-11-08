import { IsEmail, IsString, MinLength } from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(4)
  password: string;
}
