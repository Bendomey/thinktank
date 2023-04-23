import { prop } from 'ramda';
import { ICradle } from '../dependency';
import express from 'express';

export type ICreateErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => express.Response<any, Record<string, any>>;

export const createErrorHandler =
  ({ errors }: ICradle) =>
  (
    err: Error,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const message = prop<string>('message', err);
    if (err instanceof errors.BaseError) {
      return res.status(err.getCode()).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message,
    });
  };
