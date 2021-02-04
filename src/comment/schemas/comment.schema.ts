import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import * as mongoose from 'mongoose';
import { Post } from 'src/post/schemas/post.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
