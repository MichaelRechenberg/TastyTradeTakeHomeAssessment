import type { GetAllUserWatchlistsOutput } from "$lib/tastytrade-api/watchlist/fetchUserWatchlists";
import type { DeleteWatchlistInput, DeleteWatchlistOutput } from "$lib/tastytrade-api/watchlist/deleteUserWatchlist";
import type { CreateWatchlistInput, CreateWatchlistOutput } from "$lib/tastytrade-api/watchlist/createUserWatchlist";
import type { MarketDataForSymbolInput, MarketDataForSymbolOutput } from "$lib/tastytrade-api/market-data";
import type { DeleteSymbolsFromWatchlistInput, DeleteSymbolsFromWatchlistOutput } from "$lib/tastytrade-api/watchlist/deleteSymbolsFromWatchlist";

export type WatchlistDashboardProps = {
    fetchAllWatchlists: () => Promise<GetAllUserWatchlistsOutput>;
    deleteWatchlist: (deleteWatchlistInput: DeleteWatchlistInput) => Promise<DeleteWatchlistOutput>;
    createWatchlist: (createWatchlistInput: CreateWatchlistInput) => Promise<CreateWatchlistOutput>;
    fetchMarketDataForSymbol: (marketDataForSymbolInput: MarketDataForSymbolInput) => Promise<MarketDataForSymbolOutput>;
    deleteSymbolsFromWatchlist: (deleteSymbolsFromWatchlistInput: DeleteSymbolsFromWatchlistInput) => Promise<DeleteSymbolsFromWatchlistOutput>;
}