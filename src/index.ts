import type { ConfigType } from '../config';
import createDepContainer from './lib/dependency';

// Introduce dependency injection
const container = createDepContainer();
const config = container.cradle.config;
const createLogger = container.cradle.createLogger;
const createMediasoupWorkers = container.cradle.createMediasoupWorkers;
const createExpressApp = container.cradle.createExpressApp;

const startServer = async (config: ConfigType) => {
  const log = createLogger('main');

  await createMediasoupWorkers();

  const server = await createExpressApp();

  server.listen(config.port, () => {
    log(`Starting thinktank server on ${config.port}...`);
    // // Printing server information. This is just debug for demo
    // for (let i = 0; i < endpoints.endpointInformation.length; i++) {
    //   const endpoint = endpoints.endpointInformation[i];
    //   log(
    //     `Path - http://localhost:${port}`,
    //     endpoint.path,
    //     'Method -',
    //     endpoint.method
    //   );
    // }
  });
};

startServer(config).catch(console.error);
