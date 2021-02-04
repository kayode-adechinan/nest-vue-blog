import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SuscribeCommand } from '../commands/suscribe.command';
import { NewsletterService } from '../newsletter.service';
import { Newsletter } from '../schemas/newsletter.schema';

@CommandHandler(SuscribeCommand)
export class SuscribeHandler implements ICommandHandler<SuscribeCommand> {
  constructor(private readonly subscribeService: NewsletterService) {}

  async execute(request: SuscribeCommand): Promise<Newsletter | void> {
    return await this.subscribeService.suscribe(request);
  }
}
