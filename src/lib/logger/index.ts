import debug from 'debug';
import { ConfigType } from '../../../config';

export const createLogger =
  ({ config }: { config: ConfigType }) =>
  (logName: string) =>
    debug(`${config.applicationName}:${logName}`);
