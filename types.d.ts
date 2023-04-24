import {
  Transport,
  Worker,
  Router,
  Producer,
  Consumer,
  ConsumerType,
  RtpParameters,
} from 'mediasoup/node/lib/types';

export type PossiblyUndefined<T> = T | undefined;

export type Maybe<T> = T | null;

export interface IThinktankPeer {
  sendTransport: Maybe<Transport>;
  receiveTransport: Maybe<Transport>;
  producer: Maybe<Producer>;
  consumers: Array<Consumer>;
}

export type IThinktankRoom = Record<string, IThinktankPeer>;

export type IThinktankRooms = Record<
  string,
  IThinktankWorker & { state: IThinktankRoom }
>;

export interface IThinktankWorker {
  worker: Worker;
  router: Router;
}

export interface IThinktankConsumer {
  peerId: string;
  consumerParameters: {
    producerId: string;
    id: string;
    kind: string;
    rtpParameters: RtpParameters;
    type: ConsumerType;
    producerPaused: boolean;
  };
}

export type MediaSendDirection = "recieve" | "send";