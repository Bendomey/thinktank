import {
  Router,
  Producer,
  RtpCapabilities,
  Transport,
  Consumer,
} from 'mediasoup/node/lib/types';
import { compose } from 'ramda';

interface CreateConsumerParams {
  router: Router;
  producer: Producer;
  rtpCapabilities: RtpCapabilities;
  transport: Transport;
  peerId: string;
}

export default (param: CreateConsumerParams) =>
  compose(createConsumer, canConsume)(param);

/**
 * Check if we can consume the producer or not!
 * @param {object} params -
 * @returns {object}
 */
const canConsume = (param: CreateConsumerParams) => {
  // Check if you can consume
  const canConsume = param.router.canConsume({
    producerId: param.producer.id,
    rtpCapabilities: param.rtpCapabilities,
  });

  if (!canConsume) {
    return new Error(
      `receive-track: client cannot consume ${param.producer.appData.peerId}`
    );
  }

  return param;
};

/**
 * Create consumer
 *
 */
export const createConsumer = async (param: CreateConsumerParams | Error) => {
  if (param instanceof Error) throw param;

  const { peerId, producer, rtpCapabilities, transport } = param;

  // Create Consumer
  const consumer = await transport.consume({
    producerId: producer.id,
    rtpCapabilities,
    // Always pause when you start consuming. Check docs for more.
    // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#consuming-media
    paused: true,
    appData: {
      peerId: peerId,
      mediaPeerId: producer.appData.peerId as string,
    },
  });

  return consumer;
};

export type ICreateConsumer = (
  param: CreateConsumerParams
) => Promise<Consumer>;
