import { add, defaultTo, prop, subtract } from 'ramda';
import { ICradle } from '../dependency';
import * as mediasoup from 'mediasoup';

export type IStartMediasoupWorkers = () => Promise<
  Array<mediasoup.types.Worker>
>;

export const startMediasoupWorkers =
  ({ config, createLogger }: ICradle) =>
  async () => {
    const logger = createLogger('startMediasoupWorkers');
    const workers: Array<mediasoup.types.Worker> = [];

    for (let i = 0; i < config.mediasoup.numWorkers; i++) {
      const worker = await mediasoup.createWorker({
        logLevel: config.mediasoup.workerSettings
          .logLevel as mediasoup.types.WorkerLogLevel,
        logTags: config.mediasoup.workerSettings
          .logTags as Array<mediasoup.types.WorkerLogTag>,
        rtcMinPort: config.mediasoup.workerSettings.rtcMinPort,
        rtcMaxPort: config.mediasoup.workerSettings.rtcMaxPort,
      });

      worker.on('died', () => {
        console.error(
          'mediasoup worker died (this should never happen). Exiting in 2 secs....'
        );
        setTimeout(() => process.exit(1), 2000);
      });

      workers.push(worker);

      // Create a WebRtcServer in this Worker.

      if (
        process.env.MEDIASOUP_USE_WEBRTC_SERVER !== "false"
      ) {
        // Each mediasoup Worker will run its own WebRtcServer, so those cannot
        // share the same listening ports. Hence we increase the value in config.js
        // for each Worker.
        const webRtcServerOptions = config.mediasoup
          .webRtcServerOptions as mediasoup.types.WebRtcServerOptions<mediasoup.types.AppData>;
        const portIncrement = subtract(workers.length, 1);

        for (const listenInfo of webRtcServerOptions.listenInfos) {
          listenInfo.port = add(defaultTo(0, listenInfo.port), portIncrement);
        }

        const webRtcServer = await worker.createWebRtcServer(
          webRtcServerOptions
        );

        worker.appData.webRtcServer = webRtcServer;
      }

      // Log worker resource usage every X seconds.
      setInterval(async () => {
        const usage = await worker.getResourceUsage();

        logger(
          'mediasoup Worker resource usage [pid:%d]: %o',
          prop('pid', worker),
          usage
        );
      }, 120000);
    }

    return workers;
  };
