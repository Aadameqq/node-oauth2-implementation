import { IReadAccountNicknamePresenter } from "../../domain/interfaces/IReadAccountNicknamePresenter";

export class ReadAccountNicknamePresenter
  implements IReadAccountNicknamePresenter
{
  present(nickname: string) {
    return {
      statusCode: 200,
      body: { nickname },
    };
  }
}
