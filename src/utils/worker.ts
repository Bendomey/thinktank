import { IThinktankWorker } from 'types';

interface GetNextWorkerParam {
  workers: Array<IThinktankWorker>;
  prevWorkerIndex: number;
}

/**
 * Helps gets next worker. Using the Round Robin Strategy
 *
 * @param {object} params
 * @param {object} params.workers - Workers available.
 * @param {number} params.prevWorkerIndex - The previous worker index used.
 */
export const getNextWorker = ({
  workers,
  prevWorkerIndex,
}: GetNextWorkerParam) => {
  const nextWorkerIndex = prevWorkerIndex + 1;
  if (nextWorkerIndex >= workers.length) return 0;

  return nextWorkerIndex;
};

export type IGetNextWorker = typeof getNextWorker;
