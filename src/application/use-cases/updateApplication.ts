import { App } from "../../domain/entities/App";
import { IUpdateApplicationRepository } from "../../domain/interfaces/IUpdateApplicationRepository";

export interface UpdateApplicationProps {
  id: string;
  name: string;
  redirectUri: string;
  permissions: string[];
}

export const updateApplication = async (
  appRepository: IUpdateApplicationRepository,
  { id, name, redirectUri, permissions }: UpdateApplicationProps
) => {
  const updatedApp = await appRepository.update(
    id,
    name,
    redirectUri,
    permissions
  );

  if (!updatedApp) return { error: true };

  return { application: updatedApp };
};
