import type { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Subscriber } from '@mikro-orm/core';
import { Post } from '../posts/entities/post.entity';

@Subscriber()
export class PostSubscriber implements EventSubscriber<Post> {
  public getSubscribedEntities(): Array<EntityName<Post>> {
    return [Post];
  }

  public async afterCreate(args: EventArgs<Post>): Promise<void> {
    // ...
    console.log("Un Post a été crée UwU c'est incroyable mashallah ++", args);
  }
}
