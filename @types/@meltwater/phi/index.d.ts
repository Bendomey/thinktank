declare module '@meltwater/phi' {
    function defaultTo<T>(defaultData: T, actualData: Maybe<PossiblyUndefined<T>>): T
}