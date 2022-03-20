import { IChangeAccountNicknamePresenter } from "../../domain/interfaces/IChangeAccountNicknamePresenter";

export class ChangeAccountNicknamePresenter
  implements IChangeAccountNicknamePresenter
{
  present(newNickname: string) {
    return {
      statusCode: 200,
      body: {
        newNickname,
      },
    };
  }
}
