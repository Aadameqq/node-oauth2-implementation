export class NotFoundError implements IDefaultError {
  private errorCode = 404;

  getErrorCode = () => this.errorCode;
}
