export type Watchlist = {
    name: string;
    'cms-id': string;
    'group-name': string;
    'watchlist-entries': WatchlistEntry[];
    // int 32
    'order-index': number;
}

export type WatchlistEntry = {
    symbol: string;
    'instrument-type': string;
}
