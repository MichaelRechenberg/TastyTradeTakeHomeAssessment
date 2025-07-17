<script lang="ts">
	import type { WatchlistSymbolsProps } from './WatchlistSymbols.types';

	let { watchlist }: WatchlistSymbolsProps = $props();
</script>

<div>
	<div>The entries in your watchlist are:</div>
	<ul>
		{#each watchlist['watchlist-entries'] as watchlistEntry (watchlistEntry.symbol)}
			<li>
				{`symbol=${watchlistEntry.symbol} : instrument-type=${watchlistEntry['instrument-type']}`}
			</li>
		{/each}
	</ul>
</div>
