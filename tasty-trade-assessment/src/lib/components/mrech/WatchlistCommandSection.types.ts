import type { CreateWatchlistInput, CreateWatchlistOutput } from "$lib/tastytrade-api/watchlist/createUserWatchlist";
import type { DeleteWatchlistInput, DeleteWatchlistOutput } from "$lib/tastytrade-api/watchlist/deleteUserWatchlist";

export type WatchlistCommandSectionProps = {
    selectedWatchlistName?: string;
    onSelectWatchlistName: (watchlistName: string) => void;
    watchlistNames: string[];
    deleteWatchlist: (deleteWatchlistInput: DeleteWatchlistInput) => Promise<DeleteWatchlistOutput>;
    createWatchlist: (createWatchlistInput: CreateWatchlistInput) => Promise<CreateWatchlistOutput>;
};