// import ApiError from "../utils/ApiError";
// import StatusCode from "../utils/StatusCodeEnum";

import { NotFoundError } from "../../../application/error/NotFoundError";

export const notFound = (req: any, res: any, next: any) => {
  next(new NotFoundError());
};
// err, req, res, next
export const catchErrors = (err: any, req: any, res: any, next: any) => {
  if (err.getErrorCode) {
    return res.sendStatus(err.getErrorCode());
  }
  return res.sendStatus(500);
};
