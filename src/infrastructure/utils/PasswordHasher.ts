// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bcrypt from "bcrypt";
import { IHashPasswordHasher } from "../../domain/interfaces/IHashPasswordHasher";
import { IComparePasswordHasher } from "../../domain/interfaces/IComparePasswordHasher";

const { SALT_ROUNDS } = process.env;

export class PasswordHasher
  implements IHashPasswordHasher, IComparePasswordHasher
{
  compare = async (password: string, hashedPassword: string) => {
    const areEqual = !!(await bcrypt.compare(password, hashedPassword));

    return { areEqual };
  };

  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, Number(SALT_ROUNDS));

    return hash;
  }
}
