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
import { IHttpsServer, runHttpsServer } from '../httpsServer';

// Routes
import createApi, { IApiType } from '../api';

// Services
import { services, IServices } from '../../services';
import { IUtilities, utilities } from '../../utils';

export interface ICradle {
  config: ConfigType;
  createLogger: ICreateLogger;
  createMediasoupWorkers: IStartMediasoupWorkers;
  createExpressApp: IStartExpressApp;
  runHttpsServer: IHttpsServer;
  errors: ICreateErrors;
  utilities: IUtilities;
  expressErrorHandler: ICreateErrorHandler;
  api: IApiType;
  services: IServices;
}

const container = createContainer<ICradle>();

container.register({
  config: asValue(CONFIG),
  createLogger: asFunction(createLogger).scoped(),
  createMediasoupWorkers: asFunction(startMediasoupWorkers).scoped(),
  createExpressApp: asFunction(startExpressApp).scoped(),
  runHttpsServer: asFunction(runHttpsServer).scoped(),
  errors: asFunction(createErrors).scoped(),
  utilities: asFunction(utilities).scoped(),
  expressErrorHandler: asFunction(createErrorHandler).scoped(),
  api: asFunction(createApi).scoped(),
  services: asFunction(services).scoped(),
});

export default () => container;
