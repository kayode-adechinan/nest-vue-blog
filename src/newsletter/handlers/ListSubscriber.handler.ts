import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NewsletterService } from '../newsletter.service';
import { ListSubscriber } from '../queries/ListSubscriber';
import { Newsletter } from '../schemas/newsletter.schema';

@QueryHandler(ListSubscriber)
export class ListHandler implements IQueryHandler<ListSubscriber> {
  constructor(private readonly subscribeService: NewsletterService) {}

  public async execute(query: ListSubscriber): Promise<Newsletter[]> {
    return await this.subscribeService.findAll();
  }
}
