<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import * as Select from '$lib/components/ui/select';

	import type { GetAllUserWatchlistsOutput, Watchlist } from '$lib/tastytrade-api/watchlist';
	import type { WatchlistDashboardProps } from './WatchlistDashboard.types';
	import WatchlistSymbols from './WatchlistSymbols.svelte';
	import WatchlistCommandSection from './WatchlistCommandSection.svelte';

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
					return watchlistX.name > watchlistY.name ? 1 : -1;
				});

				// Reset watchlists keyed by name
				watchlistsKeyedByName = {};
				allWatchlistData.output.forEach((watchlist) => {
					watchlistsKeyedByName[watchlist.name] = watchlist;
				});

				// Set the selected watchlist to the first watchlist (by name), if a watchlist hasn't already been selected
				selectedWatchlistName = selectedWatchlistName
					? selectedWatchlistName
					: allWatchlistData.output[0].name;
			}
		}
	});
</script>

<div>
	{#if $allWatchlistsQuery.isLoading}
		<div>Loading watchlists</div>
	{:else if $allWatchlistsQuery.data}
		<WatchlistCommandSection
			{selectedWatchlistName}
			watchlistNames={Object.keys(watchlistsKeyedByName).sort()}
		/>
		{#if selectedWatchlistName !== undefined}
			<div>Rendering watchlist for selected watchlist [{selectedWatchlistName}]</div>
			<WatchlistSymbols watchlist={watchlistsKeyedByName[selectedWatchlistName]} />
		{/if}
	{:else}
		<div>Failed to load watchlists</div>
	{/if}
</div>
