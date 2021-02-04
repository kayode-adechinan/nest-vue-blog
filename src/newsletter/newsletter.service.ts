import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDTO } from 'src/post/dto/post.dto';
import { Post } from 'src/post/schemas/post.schema';
import { SuscribeCommand } from './commands/suscribe.command';
import { SuscribeDTO } from './dto/suscribe.dto';
import { Newsletter, NewsletterDocument } from './schemas/newsletter.schema';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel('Newsletter')
    private readonly newsletterModel: Model<NewsletterDocument>,
  ) {}

  async suscribe(suscribeDTO: SuscribeDTO): Promise<Newsletter | void> {
    // check if already subscribe
    const subscriber = await this.newsletterModel.findOne({
      email: suscribeDTO.email,
    });

    if (!subscriber) {
      const newSubscription = new this.newsletterModel(suscribeDTO);
      return await newSubscription.save();
    }
  }

  async findAll(): Promise<Newsletter[]> {
    return await this.newsletterModel.find().exec();
  }
}
