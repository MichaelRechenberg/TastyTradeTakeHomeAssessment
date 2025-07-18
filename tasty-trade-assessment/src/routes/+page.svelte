<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import TastyTradeLogin from '$lib/components/mrech/TastyTradeLogin.svelte';
	import WatchlistDashboard from '$lib/components/mrech/WatchlistDashboard.svelte';
	import { fetchAllWatchlists } from '$lib/tastytrade-api/watchlist/fetchUserWatchlists';
	import { deleteWatchlist } from '$lib/tastytrade-api/watchlist/deleteUserWatchlist';
	import { createUserWatchlist } from '$lib/tastytrade-api/watchlist/createUserWatchlist';
	import { deleteSymbolsFromWatchlist } from '$lib/tastytrade-api/watchlist/deleteSymbolsFromWatchlist';
	import { fetchMarketDataForSymbol } from '$lib/tastytrade-api/market-data';

	let queryClient = new QueryClient();

	let sessionToken = $state('');
</script>

<QueryClientProvider client={queryClient}>
	{#if sessionToken !== ''}
		<WatchlistDashboard
			fetchAllWatchlists={fetchAllWatchlists(sessionToken)}
			deleteWatchlist={deleteWatchlist(sessionToken)}
			createWatchlist={createUserWatchlist(sessionToken)}
			fetchMarketDataForSymbol={fetchMarketDataForSymbol(sessionToken)}
			deleteSymbolsFromWatchlist={deleteSymbolsFromWatchlist(sessionToken)}
		/>
	{:else}
		<TastyTradeLogin
			onSessionTokenAcquired={(acquiredSessionToken) => {
				sessionToken = acquiredSessionToken;
			}}
		/>
	{/if}
</QueryClientProvider>
