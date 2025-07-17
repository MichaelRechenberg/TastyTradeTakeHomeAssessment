<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import type { WatchlistCommandSectionProps } from './WatchlistCommandSection.types';

	let { selectedWatchlistName, watchlistNames }: WatchlistCommandSectionProps = $props();
</script>

<div class="root">
	<div class="primary-commands">
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
		<div>[+Add will go here]</div>
	</div>
	<div class="secondary-commands">
		<div>DELETE</div>
	</div>
</div>

<style>
	.root {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-inline-start: 4px;
		margin-inline-end: 4px;
	}

	.primary-commands {
		display: flex;
		align-items: flex-end;
	}
</style>
