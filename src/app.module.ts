import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from './comment/comment.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost/nest12'),
    MongooseModule.forRoot(process.env.DATATABE),
    UserModule,
    CommentModule,
    NewsletterModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
