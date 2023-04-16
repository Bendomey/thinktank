import express from 'express';
import cors from 'cors';
import { ICradle } from '../dependency';

export type IStartExpressApp = () => Promise<express.Express>;

export const startExpressApp =
  ({ expressErrorHandler }: ICradle) =>
  async () => {
    const app = express();

    // Registering middlewares
    app.use(cors());
    app.use(express.json());
    // app.use(endpoints.api);
    app.use(expressErrorHandler);

    return app;
  };
