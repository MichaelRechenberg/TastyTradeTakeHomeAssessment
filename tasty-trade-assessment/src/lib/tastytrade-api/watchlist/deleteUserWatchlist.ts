import { addAuthorizationHeader } from '../addTastyTradeAuthorizationHeader';
import { TastyTradeApiBaseURL } from '../constants';

export type DeleteWatchlistInput = {
	watchlistName: string;
};

export type DeleteWatchlistOutput = {
	response: Response;
};

export const deleteWatchlist =
	(sessionToken: string) =>
	async (deleteWatchlistInput: DeleteWatchlistInput): Promise<DeleteWatchlistOutput> => {
		const { watchlistName } = deleteWatchlistInput;

		let headers = {};
		headers = addAuthorizationHeader(headers, sessionToken);

		const deleteWatchlistResponse = await fetch(
			`${TastyTradeApiBaseURL}/watchlists/${watchlistName}`,
			{
				method: 'DELETE',
				headers
			}
		);

		return {
			response: deleteWatchlistResponse
		};
	};
