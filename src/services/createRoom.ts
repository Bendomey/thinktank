import { clone } from 'ramda';
import { ICradle } from 'src/lib/dependency';
import { IThinktankRooms, IThinktankWorker, IThinktankRoom } from 'types';

interface CreateRoomActionParam {
  workers: Array<IThinktankWorker>;
  prevWorkerIndex: number;
  rooms: IThinktankRooms;
  roomId: string;
}

export const createRoomAction =
  ({ utilities }: ICradle) =>
  ({ workers, prevWorkerIndex, rooms, roomId }: CreateRoomActionParam) => {
    const nextWorkerIndex = utilities.getNextWorker({
      prevWorkerIndex,
      workers,
    });
    const nextWorker = workers[nextWorkerIndex];
    const clonedRooms = clone(rooms);

    return (clonedRooms[roomId] = { ...nextWorker, state: {} });
  };

export type ICreateRoomAction = (
  param: CreateRoomActionParam
) => IThinktankWorker & { state: IThinktankRoom };
