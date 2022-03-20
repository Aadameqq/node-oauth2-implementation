import { App } from "../../domain/entities/App";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { ICreateApplicationRepository } from "../../domain/interfaces/ICreateApplicationRepository";

export interface CreateApplicationProps {
  ownerId: string;
  name: string;
}

export const createApplication = async (
  appRepository: ICreateApplicationRepository,
  idGenerator: IGenerator,
  secretGenerator: IGenerator,
  { ownerId, name }: CreateApplicationProps
) => {
  const id = idGenerator.generate();
  const secret = secretGenerator.generate();

  const newApp = new App(id, name, ownerId, [], "", secret);

  const createdApp = await appRepository.create(newApp);

  return { application: createdApp };
};
