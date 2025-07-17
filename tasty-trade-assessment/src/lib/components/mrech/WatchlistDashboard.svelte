<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';

	import type { GetAllUserWatchlistsOutput } from '$lib/tastytrade-api/watchlist';
	import type { WatchlistDashboardProps } from './WatchlistDashboard.types';

	let { fetchAllWatchlists }: WatchlistDashboardProps = $props();

	const allWatchlistsQuery = useQuery<
		GetAllUserWatchlistsOutput,
		Error,
		GetAllUserWatchlistsOutput
	>('allWatchlists', fetchAllWatchlists);
</script>

<div>
	{#if $allWatchlistsQuery.isLoading}
		<div>Loading...</div>
	{:else}
		<div>The watchlists you have:</div>
		<ul>
			{#each $allWatchlistsQuery.data?.output ?? [] as watchlist (watchlist.name)}
				<li>{watchlist.name}</li>
			{/each}
		</ul>
	{/if}
</div>
