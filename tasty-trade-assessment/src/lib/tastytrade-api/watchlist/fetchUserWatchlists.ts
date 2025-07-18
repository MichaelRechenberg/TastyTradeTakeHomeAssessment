import { addAuthorizationHeader } from '../addTastyTradeAuthorizationHeader';
import { TastyTradeApiBaseURL } from '../constants';
import type { Watchlist } from './watchlist.types';

export type GetAllUserWatchlistsOutput = {
	output?: Watchlist[];
	response: Response;
};

export const fetchAllWatchlists =
	(sessionToken: string) => async (): Promise<GetAllUserWatchlistsOutput> => {
		let headers = {};
		headers = addAuthorizationHeader(headers, sessionToken);

		const watchlistsResponse = await fetch(`${TastyTradeApiBaseURL}/watchlists`, { headers });

		if (watchlistsResponse.ok) {
			const watchlists = await watchlistsResponse.json();
			const apiWatchlistList = watchlists['data']['items'];

			apiWatchlistList.forEach((x: any) => {
				x['watchlist-entries'] = x['watchlist-entries'] ?? [];
			});

			return {
				output: apiWatchlistList,
				response: watchlistsResponse
			};
		} else {
			return {
				output: undefined,
				response: watchlistsResponse
			};
		}
	};
