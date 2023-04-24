
export const pingAction =  ({
  ping: () => 'All Green',
});

export type IPingAction = {
    ping: () => string;
}