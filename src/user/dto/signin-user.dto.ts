import { Min, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
