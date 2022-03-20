// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bcrypt from "bcrypt";
import { IHashPasswordHasher } from "../../domain/interfaces/IHashPasswordHasher";
import { IComparePasswordHasher } from "../../domain/interfaces/IComparePasswordHasher";

export class PasswordHasher
  implements IHashPasswordHasher, IComparePasswordHasher
{
  compare = async (password: string, hashedPassword: string) => {
    const areEqual = !!(await bcrypt.compare(password, hashedPassword));

    return { areEqual };
  };

  async hash(password: string): Promise<string> {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }
}
