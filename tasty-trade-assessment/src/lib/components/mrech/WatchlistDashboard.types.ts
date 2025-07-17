import type { GetAllUserWatchlistsOutput } from "$lib/tastytrade-api/watchlist/fetchUserWatchlists";
import type { DeleteWatchlistInput, DeleteWatchlistOutput } from "$lib/tastytrade-api/watchlist/deleteUserWatchlist";

export type WatchlistDashboardProps = {
    fetchAllWatchlists: () => Promise<GetAllUserWatchlistsOutput>;
    deleteWatchlist: (deleteWatchlistInput: DeleteWatchlistInput) => Promise<DeleteWatchlistOutput>;
}