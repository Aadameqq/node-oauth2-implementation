export class BadRequestError implements IDefaultError {
  private statusCode = 400;

  getErrorCode = () => this.statusCode;
}
