<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import type { WatchlistCommandSectionProps } from './WatchlistCommandSection.types';

	let { selectedWatchlistName, watchlistNames }: WatchlistCommandSectionProps = $props();
</script>

<div>
	<div>Selected watchlist:</div>
	<Select.Root type="single" bind:value={selectedWatchlistName}>
		<Select.Trigger>
			{selectedWatchlistName ?? 'Choose a watchlist'}
		</Select.Trigger>
		<Select.Content>
			{#each watchlistNames as watchListName (watchListName)}
				<Select.Item value={watchListName}>
					{watchListName}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
