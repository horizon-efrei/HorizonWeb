import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Post } from '../../posts/schemas/post.schema';

export type PostResponse = Pick<Post,
  'archived' | 'author' | 'body' | 'contentLastEditedAt' | 'createdAt' | 'dislikes' | 'favs' | 'id' | 'likes' | 'opened' | 'state' | 'tags' | 'title' | 'type' | 'updatedAt' | 'views'
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
          dislikes: post.dislikes,
          likes: post.likes,
          opened: post.opened,
          author: post.author,
          archived: post.archived,
          id: post.id,
          favs: post.favs,
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
