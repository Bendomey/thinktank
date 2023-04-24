import { clone, isNil } from 'ramda';
import { IThinktankRooms } from 'types';

interface DeleteRoomParams {
  roomId: string;
  rooms: IThinktankRooms;
}

export const deleteRoom = ({ roomId, rooms }: DeleteRoomParams) => {
  const findRoom = rooms[roomId];
  if (isNil(findRoom)) return;

  const clonedRooms = clone(rooms);
  delete clonedRooms[roomId];

  return clonedRooms;
};

export type IDeleteRoom = typeof deleteRoom;
