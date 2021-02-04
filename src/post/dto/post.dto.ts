import { Min, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  body: string;
  //@ApiProperty()
  //@IsNotEmpty()
  user?: string;
}
