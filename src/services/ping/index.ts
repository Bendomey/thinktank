
export const pingService = () => ({
  ping: () => 'All Green',
});

const pingServiceApp = pingService()
export type IPingService = typeof pingServiceApp