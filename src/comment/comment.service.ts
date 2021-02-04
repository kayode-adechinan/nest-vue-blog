import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDTO } from './dto/comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async addProduct(productDTO: CommentDTO): Promise<Comment> {
    const newComment = new this.commentModel(productDTO);
    return await newComment.save();
  }

  async findAll(post): Promise<Comment[]> {
    return await this.commentModel.find({ post: post }).exec();
  }

  async find(id: string): Promise<Comment> {
    return await this.commentModel.findById(id).exec();
  }

  // async update(id: string, commentDto: CommentDTO): Promise<Comment> {
  //   return await this.commentModel.findByIdAndUpdate(id, commentDto);
  // }

  async delete(id: string): Promise<Comment> {
    return await this.commentModel.findByIdAndRemove(id);
  }
}
