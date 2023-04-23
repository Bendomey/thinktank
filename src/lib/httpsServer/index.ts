/**
 * Create a Node.js HTTPS server. It listens in the IP and port given in the
 * configuration file and reuses the Express application as request listener.
 */

import { Express } from 'express';
import { ICradle } from '../dependency';
import * as fs from 'fs';
import https from 'https';

export const runHttpsServer =
  ({ createLogger, config }: ICradle) =>
  async (app: Express) => {
    const log = createLogger('httpsServer');

    // HTTPS server for the protoo WebSocket server.
    const tls = {
      cert: fs.readFileSync(config.https.tls.cert),
      key: fs.readFileSync(config.https.tls.key),
    };

    const httpsServer = https.createServer(tls, app);

    httpsServer.listen(config.https.listenPort, config.https.listenIp, () => {
      log(
        `running an HTTPS server on https://${config.https.listenIp}:${config.https.listenPort}...`
      );
    });
  };

export type IHttpsServer = (app: Express) => Promise<void>;
