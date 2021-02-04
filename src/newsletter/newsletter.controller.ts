import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SuscribeDTO } from './dto/suscribe.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SuscribeCommand } from './commands/suscribe.command';
import { ListSubscriber } from './queries/ListSubscriber';

@Controller('subscribers')
export class NewsletterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() subscribeDto: SuscribeDTO) {
    return await this.commandBus.execute(
      new SuscribeCommand(subscribeDto.username, subscribeDto.email),
    );
  }

  @Get()
  async getAllSubscribers() {
    return await this.queryBus.execute(new ListSubscriber());
  }
}
