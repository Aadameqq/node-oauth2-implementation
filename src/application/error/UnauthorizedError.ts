export class UnauthorizedError implements IDefaultError {
  private errorCode = 401;

  getErrorCode = () => this.errorCode;
}
