import dotenv from 'dotenv';
import { name as applicationName } from '../package.json';
import os from 'os';
import { defaultTo, length } from 'ramda';

dotenv.config({});

export const CONFIG = {
  env: defaultTo('development', process.env.NODE_ENV),
  applicationName,
  port: Number(defaultTo('5001', process.env.PORT)),
  sentry: {},

  https: {
    listenIp: '0.0.0.0',

    // NOTE: Don't change listenPort (client app assumes 4443).
    listenPort: Number(defaultTo('4443', process.env.PROTOO_LISTEN_PORT)),

    tls: {
      cert: defaultTo(
        `${__dirname}/../certs/fullchain.pem`,
        process.env.HTTPS_CERT_FULLCHAIN
      ),
      key: defaultTo(
        `${__dirname}/../certs/privkey.pem`,
        process.env.HTTPS_CERT_PRIVKEY
      ),
    },
  },

  mediasoup: {
    // Number of mediasoup workers to launch.
    numWorkers: length(Object.keys(os.cpus())),
    // mediasoup WorkerSettings.
    // See https://mediasoup.org/documentation/v3/mediasoup/api/#WorkerSettings
    workerSettings: {
      logLevel: 'warn',
      logTags: [
        'info',
        'ice',
        'dtls',
        'rtp',
        'srtp',
        'rtcp',
        'rtx',
        'bwe',
        'score',
        'simulcast',
        'svc',
        'sctp',
      ],
      rtcMinPort: Number(defaultTo('40000', process.env.MEDIASOUP_MIN_PORT)),
      rtcMaxPort: Number(defaultTo('49999', process.env.MEDIASOUP_MAX_PORT)),
      // mediasoup Router options.
      // See https://mediasoup.org/documentation/v3/mediasoup/api/#RouterOptions
      routerOptions: {
        mediaCodecs: [
          {
            kind: 'audio',
            mimeType: 'audio/opus',
            clockRate: 48000,
            channels: 2,
          },
          {
            kind: 'video',
            mimeType: 'video/VP8',
            clockRate: 90000,
            parameters: {
              'x-google-start-bitrate': 1000,
            },
          },
          {
            kind: 'video',
            mimeType: 'video/VP9',
            clockRate: 90000,
            parameters: {
              'profile-id': 2,
              'x-google-start-bitrate': 1000,
            },
          },
          {
            kind: 'video',
            mimeType: 'video/h264',
            clockRate: 90000,
            parameters: {
              'packetization-mode': 1,
              'profile-level-id': '4d0032',
              'level-asymmetry-allowed': 1,
              'x-google-start-bitrate': 1000,
            },
          },
          {
            kind: 'video',
            mimeType: 'video/h264',
            clockRate: 90000,
            parameters: {
              'packetization-mode': 1,
              'profile-level-id': '42e01f',
              'level-asymmetry-allowed': 1,
              'x-google-start-bitrate': 1000,
            },
          },
        ],
      },
    },
    // mediasoup WebRtcServer options for WebRTC endpoints (mediasoup-client,
    // libmediasoupclient).
    // See https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcServerOptions
    // NOTE: mediasoup-demo/server/lib/Room.js will increase this port for
    // each mediasoup Worker since each Worker is a separate process.
    webRtcServerOptions: {
      listenInfos: [
        {
          protocol: 'udp',
          ip: defaultTo('0.0.0.0', process.env.MEDIASOUP_LISTEN_IP),
          announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP,
          port: 44444,
        },
        {
          protocol: 'tcp',
          ip: defaultTo('0.0.0.0', process.env.MEDIASOUP_LISTEN_IP),
          announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP,
          port: 44444,
        },
      ],
    },
    // mediasoup WebRtcTransport options for WebRTC endpoints (mediasoup-client,
    // libmediasoupclient).
    // See https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
    webRtcTransportOptions: {
      // listenIps is not needed since webRtcServer is used.
      // However passing MEDIASOUP_USE_WEBRTC_SERVER=false will change it.
      listenIps: [
        {
          ip: defaultTo('0.0.0.0', process.env.MEDIASOUP_LISTEN_IP),
          announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP,
        },
      ],
      initialAvailableOutgoingBitrate: 1000000,
      minimumAvailableOutgoingBitrate: 600000,
      maxSctpMessageSize: 262144,
      // Additional options that are not part of WebRtcTransportOptions.
      maxIncomingBitrate: 1500000,
    },

    // mediasoup PlainTransport options for legacy RTP endpoints (FFmpeg,
    // GStreamer).
    // See https://mediasoup.org/documentation/v3/mediasoup/api/#PlainTransportOptions
    plainTransportOptions: {
      listenIp: {
        ip: defaultTo('0.0.0.0', process.env.MEDIASOUP_LISTEN_IP),
        announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP,
      },
      maxSctpMessageSize: 262144,
    },
  },
};

export type ConfigType = typeof CONFIG;
