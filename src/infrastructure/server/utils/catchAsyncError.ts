const catchAsyncError = (fn: any) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
};

export default catchAsyncError;
