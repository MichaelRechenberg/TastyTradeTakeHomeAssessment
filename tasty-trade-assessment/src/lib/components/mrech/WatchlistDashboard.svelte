<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';

	import type { GetAllUserWatchlistsOutput, Watchlist } from '$lib/tastytrade-api/watchlist';
	import type { WatchlistDashboardProps } from './WatchlistDashboard.types';
	import WatchlistSymbols from './WatchlistSymbols.svelte';

	let { fetchAllWatchlists }: WatchlistDashboardProps = $props();

	let selectedWatchlistName: string | undefined = $state(undefined);
	let watchlistsKeyedByName: Record<string, Watchlist> = $state({});

	const allWatchlistsQuery = useQuery<
		GetAllUserWatchlistsOutput,
		Error,
		GetAllUserWatchlistsOutput
	>('allWatchlists', fetchAllWatchlists, {
		onSuccess: (allWatchlistData) => {
			if (allWatchlistData.output && allWatchlistData.output.length > 0) {
				allWatchlistData.output.sort((watchlistX, watchlistY) => {
					return watchlistX['order-index'] - watchlistY['order-index'];
				});

				allWatchlistData.output.forEach((watchlist) => {
					watchlistsKeyedByName[watchlist.name] = watchlist;
				});

				selectedWatchlistName = selectedWatchlistName
					? selectedWatchlistName
					: allWatchlistData.output[0].name;
			}
		}
	});
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
		{#if selectedWatchlistName !== undefined}
			<div>Rendering watchlist for selected watchlist [{selectedWatchlistName}]</div>
			<WatchlistSymbols watchlist={watchlistsKeyedByName[selectedWatchlistName]} />
		{/if}
	{/if}
</div>
