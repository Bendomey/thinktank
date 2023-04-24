import { ICradle } from 'src/lib/dependency';
import { pingAction, IPingAction } from './ping';
import { ICreateRoomAction, createRoomAction } from './createRoom';

export const services = (ctx: ICradle): IServices => ({
  pingAction,
  createRoomAction: createRoomAction(ctx),
});

export type IServices = {
  pingAction: IPingAction;
  createRoomAction: ICreateRoomAction
};
