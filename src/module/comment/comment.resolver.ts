import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Comment, User, Tweet } from '@src/entity';
import { CommentService } from '@comment/comment.service';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { UserService } from '@user/user.service';
import { TweetService } from '@tweet/tweet.service';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private tweetService: TweetService,
  ) {}

  // get comments
  // @Query(() => [Comment])
  // GetComments() {
  //   return this.commentService.getComments();
  // }

  // get comments by user
  @Query(() => [Comment])
  GetCommentsByUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.commentService.getCommentsByUser(id);
  }

  // create comment
  @Mutation(() => Comment)
  CreateComment(@Args('commentDto') createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  // // delete comment
  @Mutation(() => Boolean)
  DeleteComment(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.commentService.deleteComment(id);
  }

  // get user by comment
  @ResolveField(() => User)
  GetUserByComment(@Parent() comment: Comment) {
    const { userId } = comment;
    return this.userService.getUser(userId);
  }

  // get tweet by comment
  @ResolveField(() => Tweet)
  GetTweetByComment(@Parent() like: Comment) {
    const { tweetId } = like;
    return this.tweetService.getTweet(tweetId);
  }
}
