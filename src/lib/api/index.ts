import express, { RequestHandler, Router } from 'express';
import { defaultTo, pick, prop } from 'ramda';
import { ICradle } from '../dependency';

const API = express.Router();

type IAPI_METHODS = 'get' | 'post' | 'patch' | 'put' | 'delete';

const successCodes: Record<IAPI_METHODS, number> = {
  'get': 200,
  'post': 201,
  'patch': 200,
  'put': 200,
  'delete': 204,
};

const getSuccessCode = (method: IAPI_METHODS) =>
  defaultTo(200, prop(method, successCodes));

interface IEndpoint {
  path: string;
  method: IAPI_METHODS;
  middlewares?: Array<RequestHandler>;
  handler: Function;
}


const createHandleRequestResponse =
  (handler: Function) =>
  ({ path, method, middlewares }: Omit<IEndpoint, 'handler'>) =>
    API[method](
      path,
      ...(middlewares ?? []),
      async (req, res, next) => {
        try {
          const { query, params, body } = pick(
            ['query', 'params', 'body'],
            req
          );
          const output = await handler({
            ...query,
            ...params,
            ...body,
          });
          const successCode = getSuccessCode(method);
          console.log(successCode)
          return res
            .status(successCode)
            .json({ success: true, payload: output });
        } catch (e) {
          next(e);
        }
      }
    );

export default ({
  pingService
}: ICradle) => () => {
  const endpointInformation: Array<IEndpoint> = [
    {
      handler: pingService.ping,
      method: 'get',
      path: '/api'
    }
  ];

  endpointInformation.map(({ handler, ...ctx }) =>
    createHandleRequestResponse(handler)(ctx)
  );
  return { api: API, endpointInformation };
};

export type IApiType = () => {
  api: Router;
  endpointInformation: Array<IEndpoint>;
};
