import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/post/schemas/post.schema';
import { CommandHandlers } from './commands';
import { SuscribeCommand } from './commands/suscribe.command';
import { SuscribeHandler } from './handlers/suscribe.handler';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { QueryHandlers } from './queries';
import { NewsletterSchema } from './schemas/newsletter.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'Newsletter', schema: NewsletterSchema },
    ]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService, ...CommandHandlers, ...QueryHandlers],
  exports: [NewsletterService],
})
export class NewsletterModule {}
