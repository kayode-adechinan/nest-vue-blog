import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type NewsletterDocument = Newsletter & Document;

@Schema()
export class Newsletter {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);
