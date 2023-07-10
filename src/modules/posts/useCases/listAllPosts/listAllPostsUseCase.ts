import { AppResponse } from "@helpers/responseParser";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAllPostsUseCase {
  constructor(
    @inject("PostRepository")
    private PostRepository: IPostsRepositories
  ) {}

  async execute(): Promise<AppResponse> {
    const posts = await this.PostRepository.listAll();

    return new AppResponse({
      message: "Posts istados com sucesso!",
      data: {
        posts,
      },
    });
  }
}

export { ListAllPostsUseCase };
