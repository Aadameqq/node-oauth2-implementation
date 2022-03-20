export class InternalServerError implements IDefaultError {
  private statusCode = 500;

  getErrorCode = () => this.statusCode;
}
