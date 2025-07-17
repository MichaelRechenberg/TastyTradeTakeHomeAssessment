import { addAuthorizationHeader } from "../addTastyTradeAuthorizationHeader";
import { TastyTradeApiBaseURL } from "../constants";
import type { Watchlist } from "../watchlist";

export type GetAllUserWatchlistsOutput = {
    output?: Watchlist[];
    response: Response;
}

export const fetchAllWatchlists = (sessionToken: string) => async (): Promise<GetAllUserWatchlistsOutput> => {
    let headers = {};
    headers = addAuthorizationHeader(headers, sessionToken);

    const watchlistsResponse = await fetch(`${TastyTradeApiBaseURL}/watchlists`, { headers });

    if (watchlistsResponse.ok) {
        const watchlists = await watchlistsResponse.json();
        return {
            output: watchlists['data']['items'],
            response: watchlistsResponse
        }
    }
    else {
        return {
            output: undefined,
            response: watchlistsResponse
        }
    }
}
