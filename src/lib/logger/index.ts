import debug from 'debug';
import { ICradle } from '../dependency';

export type ICreateLogger = (logName: string) => debug.Debugger

export const createLogger =
  ({ config }: ICradle) =>
  (logName: string) =>
    debug(`${config.applicationName}:${logName}`);

