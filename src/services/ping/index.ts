
export const pingService = () => ({
  ping: () => 'All Green',
});

export type IPingService = {
    ping: () => string;
}