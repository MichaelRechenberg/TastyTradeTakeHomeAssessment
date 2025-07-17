<script lang="ts">
	import { useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import type {
		DeleteWatchlistInput,
		DeleteWatchlistOutput
	} from '$lib/tastytrade-api/watchlist/deleteUserWatchlist';
	import type { WatchlistCommandSectionProps } from './WatchlistCommandSection.types';

	let {
		selectedWatchlistName,
		onSelectWatchlistName,
		watchlistNames,
		deleteWatchlist
	}: WatchlistCommandSectionProps = $props();

	let deleteDialogIsOpen = $state(false);

	let queryClient = useQueryClient();
	let deleteWatchlistMutation = useMutation<DeleteWatchlistOutput, Error, DeleteWatchlistInput>(
		(deleteWatchlistInput) => deleteWatchlist(deleteWatchlistInput)
	);
</script>

<div class="root">
	<div class="primary-commands">
		<div>
			<div>Selected watchlist:</div>
			<Select.Root
				type="single"
				value={selectedWatchlistName}
				onValueChange={(newName) => onSelectWatchlistName(newName)}
			>
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
		{#if selectedWatchlistName !== undefined && selectedWatchlistName !== ''}
			<Dialog.Root bind:open={deleteDialogIsOpen}>
				<Dialog.Trigger class={buttonVariants({ variant: 'destructive' })}>Delete</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						{`Are you sure you want to delete watchlist '${selectedWatchlistName}'?'`}
					</Dialog.Header>
					<Dialog.Description>This action cannot be undone</Dialog.Description>
					<Dialog.Footer>
						<Button
							onclick={() => {
								$deleteWatchlistMutation.mutate(
									{ watchlistName: selectedWatchlistName! },
									{
										onSuccess(data, variables, context) {
											queryClient.invalidateQueries({ queryKey: ['allWatchlists'] });
											deleteDialogIsOpen = false;
										}
									}
								);
							}}>Delete watchlist</Button
						>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		{/if}
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
