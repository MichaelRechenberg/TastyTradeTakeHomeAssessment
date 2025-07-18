import { addApplicationJsonContentTypeHeader } from "../addApplicationJsonContentTypeHeader";
import { addAuthorizationHeader } from "../addTastyTradeAuthorizationHeader";
import { TastyTradeApiBaseURL } from "../constants";
import type { Watchlist } from "./watchlist.types";

export type DeleteSymbolsFromWatchlistInput = {
    watchlistName: string;
    watchlist: Watchlist;
    symbolNamesToRemove: Set<string>;
}

export type DeleteSymbolsFromWatchlistOutput = {
    response: Response;
}

export const deleteSymbolsFromWatchlist = (sessionToken: string) => async (deleteSymbolsFromWatchlistInput: DeleteSymbolsFromWatchlistInput): Promise<DeleteSymbolsFromWatchlistOutput> => {
    const { watchlistName, watchlist, symbolNamesToRemove } = deleteSymbolsFromWatchlistInput;

    let headers = {};
    headers = addAuthorizationHeader(headers, sessionToken);
    headers = addApplicationJsonContentTypeHeader(headers);

    const payload: Watchlist = JSON.parse(JSON.stringify(watchlist));
    payload["watchlist-entries"] = payload["watchlist-entries"].filter(x => !(symbolNamesToRemove.has(x.symbol)))

    const deleteWatchlistResponse = await fetch(`${TastyTradeApiBaseURL}/watchlists/${watchlistName}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload)
    });

    return {
        response: deleteWatchlistResponse
    }
}