import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDTO } from './dto/comment.dto';
import { Comment } from './schemas/comment.schema';

import { Request } from 'express';
import { Req } from '@nestjs/common';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() commentDto: CommentDTO) {
    return this.commentService.addProduct(commentDto);
  }

  @Get()
  findAll(@Req() request: Request): Promise<Comment[]> {
    return this.commentService.findAll(request.query.post);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.find(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() commentDto: CommentDTO) {
  //   return this.commentService.update(id, commentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
