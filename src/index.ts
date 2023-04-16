import type { ConfigType } from '../config';
import createDepContainer from './lib/dependency';

// Introduce dependency injection
const container = createDepContainer();
const config = container.cradle.config;
const createLogger = container.cradle.createLogger;
const createMediasoupWorkers = container.cradle.createMediasoupWorkers;

const startServer = async (config: ConfigType) => {
  const log = createLogger('main');

   await createMediasoupWorkers()

  log(`Starting thinktank server...`);
};

startServer(config).catch(console.error);
