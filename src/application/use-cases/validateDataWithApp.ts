import { Account } from "../../domain/entities/Account";
import { App } from "../../domain/entities/App";

export const validateDataWithApp = async (
  application: App,
  objectToValidate: Partial<App>
) => {
  const isInvalid = Object.entries(objectToValidate).find(([key, value]) => {
    const stringKey: string = key.toString();
    return !(
      stringKey in application && (application as any)[stringKey] === value
    );
  });

  if (isInvalid) return { error: true };

  return { success: true };
};
