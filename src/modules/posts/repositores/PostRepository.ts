import { prisma } from "@libs/prismaClient";
import { IPostsRepositories } from "../iRepositories/IPostsRepositories";
import { ICreatePost, IPost } from "../dtos/posts";

class PostRepository implements IPostsRepositories {
  create({
    id,
    userId,
    content,
    tags,
    visibility,
  }: ICreatePost): Promise<IPost> {
    return prisma.posts.create({
      data: {
        id,
        user_id: userId,
        content,
        tags,
        visibility,
      },
    });
  }

  listAll(): Promise<IPost[]> {
    return prisma.posts.findMany({
      select: {
        id: true,
        user_id: true,
        content: true,
        tags: true,
        visibility: true,
        published_at: true,
      },
    });
  }
}

export { PostRepository };
