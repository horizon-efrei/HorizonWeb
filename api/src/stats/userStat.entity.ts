import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class Stat {
  @Property()
  nbPosts = 0;

  @Property()
  nbComments = 0;

  @Property()
  nbReplies = 0;

  @Property()
  nbViews = 0;

  @Property()
  nbUploads = 0;
}
