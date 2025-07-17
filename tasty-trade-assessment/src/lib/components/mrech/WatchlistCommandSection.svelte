<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';

	import type { WatchlistCommandSectionProps } from './WatchlistCommandSection.types';

	let { selectedWatchlistName, watchlistNames }: WatchlistCommandSectionProps = $props();
</script>

<div class="root">
	<div class="primary-commands">
		<div>
			<div>Selected watchlist:</div>
			{@debug selectedWatchlistName}
			<Select.Root type="single" bind:value={selectedWatchlistName}>
				<Select.Trigger>
					{selectedWatchlistName === undefined || selectedWatchlistName === ''
						? 'Choose a watchlist'
						: selectedWatchlistName}
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
		<Button aria-label="Add watchlist">+</Button>
	</div>
	<div class="secondary-commands">
		<Button>Delete</Button>
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
