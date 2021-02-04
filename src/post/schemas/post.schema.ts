import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import * as timestamps from 'mongoose-timestamp';

import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  _id: string;
  updatedAt: string;

  createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.plugin(timestamps);
