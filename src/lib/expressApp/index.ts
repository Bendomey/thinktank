import express from 'express';
import cors from 'cors';
import { ICradle } from '../dependency';

export type IStartExpressApp = () => Promise<express.Express>;

export const startExpressApp =
  ({ expressErrorHandler, api }: ICradle) =>
  async () => {
    const app = express();
    const { api: API } = api();

    // Registering middlewares
    app.use(cors());
    app.use(express.json());
    app.use(API);
    app.use(expressErrorHandler);

    return app;
  };
