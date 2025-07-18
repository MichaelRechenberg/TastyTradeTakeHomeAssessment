import type { GetAllUserWatchlistsOutput } from "$lib/tastytrade-api/watchlist/fetchUserWatchlists";
import type { DeleteWatchlistInput, DeleteWatchlistOutput } from "$lib/tastytrade-api/watchlist/deleteUserWatchlist";
import type { CreateWatchlistInput, CreateWatchlistOutput } from "$lib/tastytrade-api/watchlist/createUserWatchlist";
import type { MarketDataForSymbolInput, MarketDataForSymbolOutput } from "$lib/tastytrade-api/market-data";

export type WatchlistDashboardProps = {
    fetchAllWatchlists: () => Promise<GetAllUserWatchlistsOutput>;
    deleteWatchlist: (deleteWatchlistInput: DeleteWatchlistInput) => Promise<DeleteWatchlistOutput>;
    createWatchlist: (createWatchlistInput: CreateWatchlistInput) => Promise<CreateWatchlistOutput>;
    fetchMarketDataForSymbol: (marketDataForSymbolInput: MarketDataForSymbolInput) => Promise<MarketDataForSymbolOutput>;
}