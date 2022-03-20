import { App } from "../../domain/entities/App";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { IUpdateSecretApplicationRepository } from "../../domain/interfaces/IUpdateSecretApplicationRepository";

export interface ChangeApplicationSecretProps {
  id: string;
}

export const changeApplicationSecret = async (
  appRepository: IUpdateSecretApplicationRepository,
  secretGenerator: IGenerator,
  { id }: ChangeApplicationSecretProps
) => {
  const secret = secretGenerator.generate();

  const updatedApp = await appRepository.updateSecret(id, secret);

  if (!updatedApp) return { error: true };

  return { success: true, secret };
};
