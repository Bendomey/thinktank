import { asValue, asFunction, createContainer } from 'awilix';

// Env vars
import { CONFIG } from '../../../config';

// Adapters
import { createLogger } from '../../lib/logger';

const container = createContainer();
container.register('config', asValue(CONFIG));

container.register('createLogger', asFunction(createLogger).scoped());

export default () => container;
