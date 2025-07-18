<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';

	import { Separator } from '$lib/components/ui/separator';

	import type { Watchlist } from '$lib/tastytrade-api/watchlist/watchlist.types';
	import type { GetAllUserWatchlistsOutput } from '$lib/tastytrade-api/watchlist/fetchUserWatchlists';
	import type { WatchlistDashboardProps } from './WatchlistDashboard.types';
	import WatchlistSymbols from './WatchlistSymbols.svelte';
	import WatchlistCommandSection from './WatchlistCommandSection.svelte';

	let {
		fetchAllWatchlists,
		deleteWatchlist,
		createWatchlist,
		fetchMarketDataForSymbol,
		deleteSymbolsFromWatchlist,
		addSymbolToWatchlist,
		searchSymbols
	}: WatchlistDashboardProps = $props();

	let selectedWatchlistName: string | undefined = $state(undefined);
	let watchlistsKeyedByName: Record<string, Watchlist> = $state({});

	const allWatchlistsQuery = useQuery<GetAllUserWatchlistsOutput, Error>(
		'allWatchlists',
		fetchAllWatchlists,
		{
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
						(allWatchlistData.output ?? []).length > 0
							? allWatchlistData.output![0].name
							: undefined;
				}
			}
		}
	);
</script>

<div class="root">
	<div class="watchlist-wrapper">
		{#if $allWatchlistsQuery.isLoading}
			<div>Loading watchlists</div>
		{:else if $allWatchlistsQuery.data}
			<WatchlistCommandSection
				{selectedWatchlistName}
				{deleteWatchlist}
				{createWatchlist}
				watchlistNames={Object.keys(watchlistsKeyedByName).sort()}
				onSelectWatchlistName={(newName) => (selectedWatchlistName = newName)}
			/>
			{#if Object.keys(watchlistsKeyedByName).length === 0}
				<div class="no-watchlist-section">
					<div>You currently have no watchlists</div>
					<div>
						Create a watchlist using the + button on the top of the page, and then your newly
						created watchlist will show here.
					</div>
				</div>
			{:else if selectedWatchlistName !== undefined && selectedWatchlistName in watchlistsKeyedByName}
				<div class="separator-wrapper">
					<Separator />
				</div>
				<div class="watchlist-symbols">
					<WatchlistSymbols
						watchlist={watchlistsKeyedByName[selectedWatchlistName]}
						{fetchMarketDataForSymbol}
						{deleteSymbolsFromWatchlist}
						{addSymbolToWatchlist}
						{searchSymbols}
					/>
				</div>
			{/if}
		{:else}
			<div>Failed to load watchlists</div>
		{/if}
	</div>
</div>

<style>
	.root {
		margin: 10px;
	}
	.watchlist-symbols {
		margin: 4px;
	}

	.no-watchlist-section {
		margin: 4px;
	}

	.watchlist-wrapper {
		margin-block-start: 10px;
	}

	.separator-wrapper {
		margin-block-start: 10px;
	}
</style>
