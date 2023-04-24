import { Router, WebRtcTransport } from 'mediasoup/node/lib/types';
import { ICradle } from 'src/lib/dependency';
import { MediaSendDirection } from 'types';

export const transportToOptions =
  ({ id, iceParameters, iceCandidates, dtlsParameters }: WebRtcTransport) => ({
    id,
    iceParameters,
    iceCandidates,
    dtlsParameters,
  });

export type TransportOptions = ReturnType<typeof transportToOptions>;

interface CreateTransportParams {
  direction: MediaSendDirection;
  router: Router;
  peerId: string;
}

export const createTransport =
  ({ config, createLogger }: ICradle) =>
  async ({ direction, router, peerId }: CreateTransportParams) => {
    const log = createLogger('createTransport');
    log({ direction });

    const { listenIps, initialAvailableOutgoingBitrate } =
      config.mediasoup.webRtcTransportOptions;

    const transport = await router.createWebRtcTransport({
      listenIps: listenIps,
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      initialAvailableOutgoingBitrate: initialAvailableOutgoingBitrate,
      appData: { peerId, clientDirection: direction },
    });
    return transport;
  };

export type ICreateTransport = (
  param: CreateTransportParams
) => Promise<WebRtcTransport>;
