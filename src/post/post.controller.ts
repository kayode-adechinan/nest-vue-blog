import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDTO } from './dto/post.dto';
import { Post as PostInput } from './schemas/post.schema';

import * as sgMail from '@sendgrid/mail';
//import mailjet from 'node-mailjet';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { loremIpsum } from 'lorem-ipsum';
import { NewsletterService } from 'src/newsletter/newsletter.service';
import { Request } from 'express';

import { frontend } from '.././constants';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly newsLetterService: NewsletterService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findAllForMe(@Req() req, request: Request): Promise<any> {
    const { page = 1 } = req.query;

    const { user } = req;

    console.log(user);

    return this.postService.findAll(+page, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() postDto: PostDTO) {
    // retrieve all the subscribers
    const subscribers = await this.newsLetterService.findAll();

    console.log(req.user);

    const { title, body, user = req.user.id } = postDto;

    const newPost = await this.postService.addProduct({ title, body, user });

    subscribers.forEach((subscriber) => {
      // prepare new post link
      const link = `${frontend}/posts/${newPost._id}`;

      // send mail

      const mailjet = require('node-mailjet').connect(
        process.env.MAILJETKEY,
        process.env.MAILJETSECRET,
      );
      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'blog@oktocode.com',
              Name: 'Thakib Kayodé',
            },
            To: [
              {
                Email: `${subscriber.email}`,
                Name: `${subscriber.username}`,
              },
            ],
            Subject: 'New Post.',
            TextPart: 'New Post over here',
            HTMLPart: `<strong>New Post over <a href='${link}' >here</a> :</strong> `,
          },
        ],
      });
      request
        .then((result) => {
          console.log(result.body);
        })
        .catch((err) => {
          console.log(err.statusCode);
        });
    });

    return newPost;
  }

  @Get()
  findAll(@Req() request: Request): Promise<any> {
    const { page = 1, user = null } = request.query;

    return this.postService.findAll(+page, user);
  }

  @Get('generate')
  async generate(): Promise<PostInput[]> {
    await this.postService.deleteAll();
    this.range(20).forEach(async (i) => {
      let title = loremIpsum({
        count: 10, // Number of "words", "sentences", or "paragraphs"
        format: 'plain', // "plain" or "html"
        random: Math.random, // A PRNG function
        units: 'words', // paragraph(s), "sentence(s)", or "word(s)"
      });

      let body = loremIpsum({
        count: 30, // Number of "words", "sentences", or "paragraphs"
        format: 'plain', // "plain" or "html"
        paragraphLowerBound: 3, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: '\n', // Line ending, defaults to "\n" or "\r\n" (win32)
        units: 'sentences', // paragraph(s), "sentence(s)", or "word(s)"
      });

      await this.postService.addProduct({
        title: title,
        body: body,
      });
    });

    return this.postService.findAll();
  }

  range(start: number, edge?: number, step?: number) {
    // If only 1 number passed make it the edge and 0 the start
    if (arguments.length === 1) {
      edge = start;
      start = 0;
    }

    // Validate edge/start
    edge = edge || 0;
    step = step || 1;

    // Create array of numbers, stopping before the edge
    let arr: number[] = [];
    for (arr; (edge - start) * step > 0; start += step) {
      arr.push(start);
    }
    return arr;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Req() req, @Param('id') id: string, @Body() postDto: PostDTO) {
    return this.postService.update(id, postDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.postService.delete(id);
  }
}
