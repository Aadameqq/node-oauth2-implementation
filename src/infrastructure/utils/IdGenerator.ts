import { IGenerator } from "../../domain/interfaces/IGenerator";

export class IdGenerator implements IGenerator {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private generatedIdLength: number = 12,
    private usedCharacters = "abcdefghijklmnoprstuwxyz1234567890"
  ) {}

  generate(): string {
    const maxRandomIndex = this.usedCharacters.length - 1;
    const minRandomIndex = 0;

    let generatedId = "";

    for (let i = 0; i < this.generatedIdLength; i++) {
      const randomIndex = this.generateRandomNumber(
        minRandomIndex,
        maxRandomIndex
      );

      generatedId += this.usedCharacters[randomIndex];
    }

    return generatedId;
  }

  private generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
}
