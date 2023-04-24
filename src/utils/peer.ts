import { IThinktankPeer } from 'types';

/**
 * Closes peer session.
 *
 * @returns {void} - NOthing
 */
export const closeThinktankPeer = (peer: IThinktankPeer) => {
  if (peer.producer && !peer.producer.closed) peer.producer.close();

  if (peer.sendTransport && !peer.sendTransport.closed)
    peer.sendTransport.close();

  if (peer.receiveTransport && !peer.receiveTransport.closed)
    peer.receiveTransport.close();

  peer.consumers.forEach((consumer) => !consumer.closed && consumer.close());
};

export type ICloseThintankPeer = typeof closeThinktankPeer;
