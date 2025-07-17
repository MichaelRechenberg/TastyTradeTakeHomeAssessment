import { addAuthorizationHeader } from "./addTastyTradeAuthorizationHeader";
import { TastyTradeApiBaseURL } from "./constants";

export type Watchlist = {
    name: string;
    'cms-id': string;
    'group-name': string;
    'watchlist-entries': WatchlistEntry[];
    // int 32
    'order-index': number;
}

export type WatchlistEntry = {
    symbol: string;
    'instrument-type': string;
}

// TODO: Move this output and fetch* call to separate file in folder structure

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

// TODO: different folder structure and include type there
export type DeleteWatchlistInput = {
    watchlistName: string;
}

export type DeleteWatchlistOutput = {
    response: Response;
}

export const deleteWatchlist = (sessionToken: string) => async (deleteWatchlistInput: DeleteWatchlistInput): Promise<DeleteWatchlistOutput> => {
    const { watchlistName } = deleteWatchlistInput;

    let headers = {};
    headers = addAuthorizationHeader(headers, sessionToken);

    const deleteWatchlistResponse = await fetch(`${TastyTradeApiBaseURL}/watchlists/${watchlistName}`, {
        method: "DELETE",
        headers
    });

    return {
        response: deleteWatchlistResponse
    }
}