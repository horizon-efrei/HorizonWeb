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

  @Property()
  lastReply = new Date();

  @Property()
  replyStreak = 0;

  @Property()
  lastPost = new Date();

  @Property()
  postStreak = 0;

  @Property()
  lastComment = new Date();

  @Property()
  commentStreak = 0;

  @Property()
  lastAction = new Date();

  @Property()
  actionStreak = 0;
}
