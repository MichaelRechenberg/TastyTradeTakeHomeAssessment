<script lang="ts">
	import type { MarketDataForSymbolOutput } from '$lib/tastytrade-api/market-data';
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
		<div>Fetch symbol data...</div>
	{/if}
	{#if marketDataForWatchlist}
		<div>Actual symbol market data</div>
		<ul>
			{#each marketDataForWatchlist as symbolMarketData (symbolMarketData.marketData?.symbol)}
				<li>
					{`[${symbolMarketData.marketData?.symbol}] | ${symbolMarketData.marketData?.bid} | ${symbolMarketData.marketData?.ask} | ${symbolMarketData.marketData?.last}`}
				</li>
			{/each}
		</ul>
	{/if}
</div>
