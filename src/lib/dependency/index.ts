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

// Routes
import createApi, { IApiType } from '../api';

// Services
import { pingService, IPingService } from '../../services';

export interface ICradle {
  config: ConfigType;
  createLogger: ICreateLogger;
  createMediasoupWorkers: IStartMediasoupWorkers;
  createExpressApp: IStartExpressApp;
  errors: ICreateErrors;
  expressErrorHandler: ICreateErrorHandler;
  api: IApiType;
  pingService: IPingService;
}

const container = createContainer<ICradle>();

container.register({
  config: asValue(CONFIG),
  createLogger: asFunction(createLogger).scoped(),
  createMediasoupWorkers: asFunction(startMediasoupWorkers).scoped(),
  createExpressApp: asFunction(startExpressApp).scoped(),
  errors: asFunction(createErrors).scoped(),
  expressErrorHandler: asFunction(createErrorHandler).scoped(),
  api: asFunction(createApi).scoped(),
  pingService: asFunction(pingService).scoped(),
});

export default () => container;
