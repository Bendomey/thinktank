import { ICradle } from '../lib/dependency';
import { IGetNextWorker, getNextWorker } from './worker';
import { ICloseThintankPeer, closeThinktankPeer } from './peer';
import createConsumer, { ICreateConsumer } from './consumer';
import {
  createTransport,
  ICreateTransport,
  transportToOptions,
} from './transport';
import { IDeleteRoom, deleteRoom } from './room';

/**
 * Utilities
 *
 * @param {object} ctx - App Dependencies
 * @returns
 */
export const utilities = (ctx: ICradle): IUtilities => ({
  getNextWorker,
  closeThinktankPeer,
  createConsumer,
  createTransport: createTransport(ctx),
  transportToOptions,
  deleteRoom,
});

export interface IUtilities {
  getNextWorker: IGetNextWorker;
  closeThinktankPeer: ICloseThintankPeer;
  createConsumer: ICreateConsumer;
  createTransport: ICreateTransport;
  transportToOptions: typeof transportToOptions;
  deleteRoom: IDeleteRoom;
}
