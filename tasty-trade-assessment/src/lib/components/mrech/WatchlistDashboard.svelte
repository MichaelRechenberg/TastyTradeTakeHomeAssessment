<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import * as Select from '$lib/components/ui/select';

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

				// Reset watchlists keyed by name
				watchlistsKeyedByName = {};
				allWatchlistData.output.forEach((watchlist) => {
					watchlistsKeyedByName[watchlist.name] = watchlist;
				});

				// Set the selectd watchlist name to the first one in fetched set of watchlists (if a selection isn't present already)
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
	{:else if $allWatchlistsQuery.data}
		<div>Selected watchlist:</div>
		<Select.Root type="single" bind:value={selectedWatchlistName}>
			<Select.Trigger>
				{selectedWatchlistName ?? 'Choose a watchlist'}
			</Select.Trigger>
			<Select.Content>
				{#each Object.keys(watchlistsKeyedByName).sort() as watchListName (watchListName)}
					<Select.Item value={watchListName}>
						{watchListName}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		{#if selectedWatchlistName !== undefined}
			<div>Rendering watchlist for selected watchlist [{selectedWatchlistName}]</div>
			<WatchlistSymbols watchlist={watchlistsKeyedByName[selectedWatchlistName]} />
		{/if}
	{/if}
</div>
