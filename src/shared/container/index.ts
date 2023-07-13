import "./providers";
import { container } from "tsyringe";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UserRespository } from "@modules/users/repositories/UserRepository";
import { PostRepository } from "@modules/posts/repositores/PostRepository";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { CommentRepository } from "@modules/comments/repositories/CommentRepoitory";
import { ICommentsRepositories } from "@modules/comments/iRepositories/ICommentsRepositories";

console.log(UserRespository);

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRespository
);

container.registerSingleton<IPostsRepositories>(
  "PostRepository",
  PostRepository
);

container.registerSingleton<ICommentsRepositories>(
  "CommentsRepository",
  CommentRepository
);
