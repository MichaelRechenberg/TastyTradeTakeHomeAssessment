import type { GetAllUserWatchlistsOutput } from '$lib/tastytrade-api/watchlist/fetchUserWatchlists';
import type {
	DeleteWatchlistInput,
	DeleteWatchlistOutput
} from '$lib/tastytrade-api/watchlist/deleteUserWatchlist';
import type {
	CreateWatchlistInput,
	CreateWatchlistOutput
} from '$lib/tastytrade-api/watchlist/createUserWatchlist';
import type {
	MarketDataForSymbolInput,
	MarketDataForSymbolOutput
} from '$lib/tastytrade-api/market-data';
import type {
	DeleteSymbolsFromWatchlistInput,
	DeleteSymbolsFromWatchlistOutput
} from '$lib/tastytrade-api/watchlist/deleteSymbolsFromWatchlist';
import type {
	AddSymbolToWatchlistInput,
	AddSymbolToWatchlistOutput
} from '$lib/tastytrade-api/watchlist/addSymbolToWatchlist';
import type {
	SearchSymbolDataInput,
	SearchSymbolDataOutput
} from '$lib/tastytrade-api/symbol-search';

export type WatchlistDashboardProps = {
	fetchAllWatchlists: () => Promise<GetAllUserWatchlistsOutput>;
	deleteWatchlist: (deleteWatchlistInput: DeleteWatchlistInput) => Promise<DeleteWatchlistOutput>;
	createWatchlist: (createWatchlistInput: CreateWatchlistInput) => Promise<CreateWatchlistOutput>;
	fetchMarketDataForSymbol: (
		marketDataForSymbolInput: MarketDataForSymbolInput
	) => Promise<MarketDataForSymbolOutput>;
	deleteSymbolsFromWatchlist: (
		deleteSymbolsFromWatchlistInput: DeleteSymbolsFromWatchlistInput
	) => Promise<DeleteSymbolsFromWatchlistOutput>;
	addSymbolToWatchlist: (
		addSymbolToWatchlistInput: AddSymbolToWatchlistInput
	) => Promise<AddSymbolToWatchlistOutput>;
	searchSymbols: (searchSymbolInput: SearchSymbolDataInput) => Promise<SearchSymbolDataOutput>;
};
