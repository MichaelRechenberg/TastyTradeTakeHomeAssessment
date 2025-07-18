<script lang="ts">
	import type { MarketDataForSymbolOutput } from '$lib/tastytrade-api/market-data';
	import type {
		DeleteSymbolsFromWatchlistInput,
		DeleteSymbolsFromWatchlistOutput
	} from '$lib/tastytrade-api/watchlist/deleteSymbolsFromWatchlist';
	import { useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import SymbolTable from './SymbolTable.svelte';
	import type { WatchlistSymbolsProps } from './WatchlistSymbols.types';

	let { watchlist, fetchMarketDataForSymbol, deleteSymbolsFromWatchlist }: WatchlistSymbolsProps =
		$props();
	let queryClient = useQueryClient();

	let deleteWatchlistSymbolsMutation = useMutation<
		DeleteSymbolsFromWatchlistOutput,
		Error,
		DeleteSymbolsFromWatchlistInput
	>((deleteSymbolsFromWatchlistInput) =>
		deleteSymbolsFromWatchlist(deleteSymbolsFromWatchlistInput)
	);

	let marketDataForWatchlist = $state([] as MarketDataForSymbolOutput[]);
	let isFetchingSymbolData = $state(false);

	let fetchMarketDataForAllWatchlistSymbols = async () => {
		isFetchingSymbolData = true;
		const marketDataSymbolPromises = watchlist['watchlist-entries'].map((watchlistEntry) => {
			return fetchMarketDataForSymbol({ symbolName: watchlistEntry.symbol });
		});

		marketDataForWatchlist = await Promise.all(marketDataSymbolPromises);
		isFetchingSymbolData = false;
	};

	$effect(() => {
		marketDataForWatchlist = [];
		fetchMarketDataForAllWatchlistSymbols();

		const intervalId = setInterval(() => {
			fetchMarketDataForAllWatchlistSymbols();
		}, 5000);

		return () => {
			clearInterval(intervalId);
		};
	});
</script>

<div>
	<div class="status-section" aria-live="polite">
		{#if isFetchingSymbolData}
			<div>Fetching symbol data...</div>
		{/if}
		{#if $deleteWatchlistSymbolsMutation.isLoading}
			<div>Deleting symbols...</div>
		{/if}
	</div>
	{#if marketDataForWatchlist}
		<SymbolTable
			symbolRows={marketDataForWatchlist
				.map((x) => {
					if (x.marketData) {
						return {
							symbolName: x.marketData.symbol,
							bidPrice: x.marketData.bid,
							askPrice: x.marketData.ask,
							lastPrice: x.marketData.last
						};
					} else {
						return undefined;
					}
				})
				.filter((x) => x !== undefined)}
			onDeleteSymbols={(namesOfSymbolsToDelete) => {
				$deleteWatchlistSymbolsMutation.mutate(
					{
						watchlist: watchlist,
						watchlistName: watchlist.name,
						symbolNamesToRemove: new Set<string>(namesOfSymbolsToDelete)
					},
					{
						onSuccess(data, variables, context) {
							queryClient.invalidateQueries({ queryKey: ['allWatchlists'] });
						}
					}
				);
			}}
			shouldDisableDeleteButton={$deleteWatchlistSymbolsMutation.isLoading}
		/>
	{/if}
</div>

<style>
	.status-section {
		min-height: 3em;
	}
</style>
