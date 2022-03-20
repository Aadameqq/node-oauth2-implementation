export const generateRandomCode = () => {
  const charactersRange =
    "ABCDEFGHIJLMNOPRSTUWXYZabcdefghijklmnoprstuwxyz123456789";
  const codeLength = 9;

  let generatedCode = "";

  for (let i = 0; i < codeLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * charactersRange.length);

    generatedCode += charactersRange[randomNumber];
  }

  return generatedCode;
};
