import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { NewsletterModule } from 'src/newsletter/newsletter.module';

@Module({
  imports: [
    NewsletterModule,
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  ],

  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
