import type { MarketDataForSymbolInput, MarketDataForSymbolOutput } from "$lib/tastytrade-api/market-data";
import type { DeleteSymbolsFromWatchlistInput, DeleteSymbolsFromWatchlistOutput } from "$lib/tastytrade-api/watchlist/deleteSymbolsFromWatchlist";
import type { Watchlist } from "$lib/tastytrade-api/watchlist/watchlist.types"

export type WatchlistSymbolsProps = {
    watchlist: Watchlist;
    fetchMarketDataForSymbol: (marketDataForSymbolInput: MarketDataForSymbolInput) => Promise<MarketDataForSymbolOutput>;
    deleteSymbolsFromWatchlist: (deleteSymbolsFromWatchlistInput: DeleteSymbolsFromWatchlistInput) => Promise<DeleteSymbolsFromWatchlistOutput>;
}