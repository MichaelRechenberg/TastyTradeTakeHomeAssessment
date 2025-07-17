<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import TastyTradeLogin from '$lib/components/mrech/TastyTradeLogin.svelte';
	import WatchlistDashboard from '$lib/components/mrech/WatchlistDashboard.svelte';
	import { fetchAllWatchlists, deleteWatchlist } from '$lib/tastytrade-api/watchlist';

	let queryClient = new QueryClient();

	let sessionToken = $state('');
</script>

<QueryClientProvider client={queryClient}>
	{#if sessionToken !== ''}
		<WatchlistDashboard
			fetchAllWatchlists={fetchAllWatchlists(sessionToken)}
			deleteWatchlist={deleteWatchlist(sessionToken)}
		/>
	{:else}
		<TastyTradeLogin
			onSessionTokenAcquired={(acquiredSessionToken) => {
				sessionToken = acquiredSessionToken;
			}}
		/>
	{/if}
</QueryClientProvider>
