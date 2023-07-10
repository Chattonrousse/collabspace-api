import { ICreatePost, IPost } from "../dtos/posts";

interface IPostsRepositories {
  create(post: ICreatePost): Promise<IPost>;
  listAll(): Promise<IPost[]>;
}

export { IPostsRepositories };
