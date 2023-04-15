import { defaultTo } from '@meltwater/phi';
import dotenv from 'dotenv';
import { name as applicationName } from '../package.json';

dotenv.config({});

export const CONFIG = {
  env: defaultTo('development', process.env.NODE_ENV),
  applicationName,
  port: Number(defaultTo("5001", process.env.PORT)),
  sentry: {},
} as const;

export type ConfigType = typeof CONFIG;
