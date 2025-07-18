<script lang="ts">
	import type { WatchlistSymbolsProps } from './WatchlistSymbols.types';

	import { useQuery } from '@sveltestack/svelte-query';

	let { watchlist, fetchMarketDataForSymbol }: WatchlistSymbolsProps = $props();

	let fetchMarketDataForAllWatchlistSymbols = async () => {
		const marketDataSymbolPromises = watchlist['watchlist-entries'].map((watchlistEntry) => {
			return fetchMarketDataForSymbol({ symbolName: watchlistEntry.symbol });
		});

		return Promise.all(marketDataSymbolPromises);
	};

	let fetchMarketDataQuery = useQuery(
		'selected-watchlist-symbol-marketdata',
		fetchMarketDataForAllWatchlistSymbols,
		{
			refetchInterval: 5000
		}
	);
</script>

<div>
	{#if $fetchMarketDataQuery.data}
		<div>Actual symbol market data</div>
		<ul>
			{#each $fetchMarketDataQuery.data as symbolMarketData (symbolMarketData.marketData?.symbol)}
				<li>
					{`[${symbolMarketData.marketData?.symbol}] | ${symbolMarketData.marketData?.bid} | ${symbolMarketData.marketData?.ask} | ${symbolMarketData.marketData?.last}`}
				</li>
			{/each}
		</ul>
	{/if}
</div>
