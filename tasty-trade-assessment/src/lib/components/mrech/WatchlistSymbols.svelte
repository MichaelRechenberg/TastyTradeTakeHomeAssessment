<script lang="ts">
	import type { MarketDataForSymbolOutput } from '$lib/tastytrade-api/market-data';
	import SymbolTable from './SymbolTable.svelte';
	import type { WatchlistSymbolsProps } from './WatchlistSymbols.types';

	let { watchlist, fetchMarketDataForSymbol }: WatchlistSymbolsProps = $props();

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
	{#if isFetchingSymbolData}
		<div>Fetching symbol data...</div>
	{/if}
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
		/>
	{/if}
</div>
