import { Min, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
