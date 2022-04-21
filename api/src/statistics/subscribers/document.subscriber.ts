import { EntityManager } from '@mikro-orm/core';
import type { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Document } from '../../files/documents/entities/document.entity';

@Injectable()
export class DocumentSubscriber implements EventSubscriber<Document> {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    em: EntityManager,
  ) {
    em.getEventManager().registerSubscriber(this);
  }

  public getSubscribedEntities(): Array<EntityName<Document>> {
    return [Document];
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async afterCreate(args: EventArgs<Document>): Promise<void> {
    this.eventEmitter.emit('document.created', args.entity);
  }
}
