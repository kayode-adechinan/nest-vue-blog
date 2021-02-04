import { Min, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiProperty()
  @IsNotEmpty()
  body: string;
  @ApiProperty()
  @IsNotEmpty()
  post: string;
}
