import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Post } from '../../posts/schemas/post.schema';

export type PostResponse = Pick<Post,
  | 'author'
  | 'body'
  | 'contentLastEditedAt'
  | 'createdAt'
  | 'downvotes'
  | 'favorites'
  | 'id'
  | 'locked'
  | 'opened'
  | 'state'
  | 'tags'
  | 'title'
  | 'type'
  | 'updatedAt'
  | 'upvotes'
  | 'views'
>;

@Injectable()
export class PostInterceptor<T extends Post> implements NestInterceptor<T, PostResponse> {
  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<PostResponse> {
    return next
      .handle()
      .pipe(
        map(post => ({
          title: post.title,
          body: post.body,
          downvotes: post.downvotes,
          upvotes: post.upvotes,
          opened: post.opened,
          author: post.author,
          locked: post.locked,
          id: post.id,
          favorites: post.favorites,
          createdAt: post.createdAt,
          contentLastEditedAt: post.contentLastEditedAt,
          state: post.state,
          type: post.type,
          tags: post.tags,
          updatedAt: post.updatedAt,
          views: post.views,
        })),
      );
  }
}
