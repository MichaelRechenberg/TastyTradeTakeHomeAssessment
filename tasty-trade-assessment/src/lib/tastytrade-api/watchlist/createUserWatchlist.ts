import { addApplicationJsonContentTypeHeader } from '../addApplicationJsonContentTypeHeader';
import { addAuthorizationHeader } from '../addTastyTradeAuthorizationHeader';
import { TastyTradeApiBaseURL } from '../constants';
import type { Watchlist } from './watchlist.types';

export type CreateWatchlistInput = {
	watchlistName: string;
};

export type CreateWatchlistOutput = {
	response: Response;
};

export const createUserWatchlist =
	(sessionToken: string) =>
	async (createWatchlistInput: CreateWatchlistInput): Promise<CreateWatchlistOutput> => {
		const { watchlistName } = createWatchlistInput;

		let headers = {};
		headers = addAuthorizationHeader(headers, sessionToken);
		headers = addApplicationJsonContentTypeHeader(headers);

		const payload: Partial<Watchlist> = {
			name: watchlistName,
			'watchlist-entries': []
		};

		const createUserWatchlistResponse = await fetch(`${TastyTradeApiBaseURL}/watchlists`, {
			method: 'POST',
			headers,
			body: JSON.stringify(payload)
		});

		return {
			response: createUserWatchlistResponse
		};
	};
