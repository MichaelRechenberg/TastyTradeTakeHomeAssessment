<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';

	import type { Watchlist } from '$lib/tastytrade-api/watchlist/watchlist.types';
	import type { GetAllUserWatchlistsOutput } from '$lib/tastytrade-api/watchlist/fetchUserWatchlists';
	import type { WatchlistDashboardProps } from './WatchlistDashboard.types';
	import WatchlistSymbols from './WatchlistSymbols.svelte';
	import WatchlistCommandSection from './WatchlistCommandSection.svelte';

	let { fetchAllWatchlists, deleteWatchlist }: WatchlistDashboardProps = $props();

	let selectedWatchlistName: string | undefined = $state(undefined);
	let watchlistsKeyedByName: Record<string, Watchlist> = $state({});

	const allWatchlistsQuery = useQuery<
		GetAllUserWatchlistsOutput,
		Error,
		GetAllUserWatchlistsOutput
	>('allWatchlists', fetchAllWatchlists, {
		onSuccess: (allWatchlistData) => {
			// Reset watchlists keyed by name, since we fetched a new dataset
			watchlistsKeyedByName = {};

			if (allWatchlistData.output && allWatchlistData.output.length > 0) {
				allWatchlistData.output.sort((watchlistX, watchlistY) => {
					return watchlistX.name > watchlistY.name ? 1 : -1;
				});

				allWatchlistData.output.forEach((watchlist) => {
					watchlistsKeyedByName[watchlist.name] = watchlist;
				});
			}

			// (re)set the selected watchlist name, keeping in mind the watchlist could have been deleted
			if (
				selectedWatchlistName === undefined ||
				!(selectedWatchlistName in watchlistsKeyedByName)
			) {
				// The currently selected watchlist is no longer valid, so
				// set the selected name to the first watchlist (sorted by name), if any watchlists were returned
				selectedWatchlistName =
					(allWatchlistData.output ?? []).length > 0 ? allWatchlistData.output![0].name : undefined;
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
			{deleteWatchlist}
			watchlistNames={Object.keys(watchlistsKeyedByName).sort()}
			onSelectWatchlistName={(newName) => (selectedWatchlistName = newName)}
		/>
		{#if Object.keys(watchlistsKeyedByName).length === 0}
			<div>
				<div>You currently have no watchlists</div>
				<div>
					Create a watchlist using the + button on the top of the page, and then your newly created
					watchlist will show here.
				</div>
			</div>
		{:else if selectedWatchlistName !== undefined && selectedWatchlistName in watchlistsKeyedByName}
			<WatchlistSymbols watchlist={watchlistsKeyedByName[selectedWatchlistName]} />
		{/if}
	{:else}
		<div>Failed to load watchlists</div>
	{/if}
</div>
