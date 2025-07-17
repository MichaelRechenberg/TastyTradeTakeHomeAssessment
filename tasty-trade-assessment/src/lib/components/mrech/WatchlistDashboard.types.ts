import type { GetAllUserWatchlistsOutput } from "$lib/tastytrade-api/watchlist"

export type WatchlistDashboardProps = {
    fetchAllWatchlists: () => Promise<GetAllUserWatchlistsOutput>
}