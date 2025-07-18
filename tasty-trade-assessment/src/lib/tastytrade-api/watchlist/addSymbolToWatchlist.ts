import { addApplicationJsonContentTypeHeader } from '../addApplicationJsonContentTypeHeader';
import { addAuthorizationHeader } from '../addTastyTradeAuthorizationHeader';
import { TastyTradeApiBaseURL } from '../constants';
import type { InstrumentType } from '../common.types';
import type { Watchlist } from './watchlist.types';

export type AddSymbolToWatchlistInput = {
	watchlistName: string;
	watchlist: Watchlist;
	symbolToAdd: {
		symbol: string;
		'instrument-type': InstrumentType;
	};
};

export type AddSymbolToWatchlistOutput = {
	response: Response;
};

export const addSymbolToWatchlist =
	(sessionToken: string) =>
	async (
		addSymbolToWatchlistInput: AddSymbolToWatchlistInput
	): Promise<AddSymbolToWatchlistOutput> => {
		const { watchlistName, watchlist, symbolToAdd } = addSymbolToWatchlistInput;

		let headers = {};
		headers = addAuthorizationHeader(headers, sessionToken);
		headers = addApplicationJsonContentTypeHeader(headers);

		const payload: Watchlist = JSON.parse(JSON.stringify(watchlist));
		payload['watchlist-entries'].push(symbolToAdd);

		const addSymbolToWatchlistResponse = await fetch(
			`${TastyTradeApiBaseURL}/watchlists/${watchlistName}`,
			{
				method: 'PUT',
				headers,
				body: JSON.stringify(payload)
			}
		);

		return {
			response: addSymbolToWatchlistResponse
		};
	};
