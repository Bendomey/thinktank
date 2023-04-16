import { asValue, asFunction, createContainer } from 'awilix';

// Env vars
import { CONFIG, ConfigType } from '../../../config';

// Adapters
import { ICreateLogger, createLogger } from '../../lib/logger';
import {
  IStartMediasoupWorkers,
  startMediasoupWorkers,
} from '../mediasoupWorkers';

export interface ICradle {
  config: ConfigType;
  createLogger: ICreateLogger;
  createMediasoupWorkers: IStartMediasoupWorkers;
}

const container = createContainer<ICradle>();

container.register({
  config: asValue(CONFIG),
  createLogger: asFunction(createLogger).scoped(),
  createMediasoupWorkers: asFunction(startMediasoupWorkers).scoped(),
});

export default () => container;
