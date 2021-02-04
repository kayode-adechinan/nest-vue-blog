import { Min, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuscribeDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
