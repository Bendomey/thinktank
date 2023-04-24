import { IThinktankRooms } from 'types';
import type { ConfigType } from '../config';
import createDepContainer from './lib/dependency';

// Introduce dependency injection
const container = createDepContainer();
const config = container.cradle.config;
const createLogger = container.cradle.createLogger;
const createMediasoupWorkers = container.cradle.createMediasoupWorkers;
const utilities = container.cradle.utilities;
const createExpressApp = container.cradle.createExpressApp;
const runHttpsServer = container.cradle.runHttpsServer;
const createApi = container.cradle.api;

const thinktankRooms: IThinktankRooms = {};

const startServer = async (config: ConfigType) => {
  const log = createLogger('main');

  const workers = await createMediasoupWorkers();
  let activeWorkerIndex = 1;

  
};

startServer(config).catch(console.error);
