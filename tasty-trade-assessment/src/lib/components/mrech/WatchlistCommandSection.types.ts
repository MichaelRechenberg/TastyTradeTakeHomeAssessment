import type { DeleteWatchlistInput, DeleteWatchlistOutput } from "$lib/tastytrade-api/watchlist";

export type WatchlistCommandSectionProps = {
    selectedWatchlistName?: string;
    onSelectWatchlistName: (watchlistName: string) => void;
    watchlistNames: string[];
    deleteWatchlist: (deleteWatchlistInput: DeleteWatchlistInput) => Promise<DeleteWatchlistOutput>;
};