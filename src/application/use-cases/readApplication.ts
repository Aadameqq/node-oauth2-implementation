import { Account } from "../../domain/entities/Account";
import { App } from "../../domain/entities/App";
import { IReadApplicationRepository } from "../../domain/interfaces/IReadApplicationRepository";

export interface ReadApplicationProps {
  id: string;
}

export const readApplication = async (
  appRepository: IReadApplicationRepository,
  { id }: ReadApplicationProps
) => {
  const application = await appRepository.read(id);

  if (!application) return { error: true };

  return { application };
};
