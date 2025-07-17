import type { DeleteWatchlistInput, DeleteWatchlistOutput, GetAllUserWatchlistsOutput } from "$lib/tastytrade-api/watchlist"

export type WatchlistDashboardProps = {
    fetchAllWatchlists: () => Promise<GetAllUserWatchlistsOutput>;
    deleteWatchlist: (deleteWatchlistInput: DeleteWatchlistInput) => Promise<DeleteWatchlistOutput>;
}