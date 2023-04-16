import { asValue, asFunction, createContainer } from 'awilix';

// Env vars
import { CONFIG, ConfigType } from '../../../config';

// Adapters
import { ICreateLogger, createLogger } from '../../lib/logger';
import {
  IStartMediasoupWorkers,
  startMediasoupWorkers,
} from '../mediasoupWorkers';
import { IStartExpressApp, startExpressApp } from '../expressApp';
import {
  ICreateErrorHandler,
  createErrorHandler,
} from '../../lib/middlewares/errorHandler';
import { createErrors, ICreateErrors } from '../../utils/errors';

export interface ICradle {
  config: ConfigType;
  createLogger: ICreateLogger;
  createMediasoupWorkers: IStartMediasoupWorkers;
  createExpressApp: IStartExpressApp;
  errors: ICreateErrors;
  expressErrorHandler: ICreateErrorHandler;
}

const container = createContainer<ICradle>();

container.register({
  config: asValue(CONFIG),
  createLogger: asFunction(createLogger).scoped(),
  createMediasoupWorkers: asFunction(startMediasoupWorkers).scoped(),
  createExpressApp: asFunction(startExpressApp).scoped(),
  errors: asFunction(createErrors).scoped(),
  expressErrorHandler: asFunction(createErrorHandler).scoped(),
});

export default () => container;
