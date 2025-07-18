<script lang="ts">
	import { useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import type {
		DeleteWatchlistInput,
		DeleteWatchlistOutput
	} from '$lib/tastytrade-api/watchlist/deleteUserWatchlist';
	import type { WatchlistCommandSectionProps } from './WatchlistCommandSection.types';
	import type {
		CreateWatchlistOutput,
		CreateWatchlistInput
	} from '$lib/tastytrade-api/watchlist/createUserWatchlist';

	let {
		selectedWatchlistName,
		onSelectWatchlistName,
		watchlistNames,
		deleteWatchlist,
		createWatchlist
	}: WatchlistCommandSectionProps = $props();

	let deleteWatchlistDialogIsOpen = $state(false);
	let createWatchlistDialogIsOpen = $state(false);
	let nameOfNewWatchlistToCreate = $state(undefined);

	let queryClient = useQueryClient();
	let deleteWatchlistMutation = useMutation<DeleteWatchlistOutput, Error, DeleteWatchlistInput>(
		(deleteWatchlistInput) => deleteWatchlist(deleteWatchlistInput)
	);

	let createWatchlistMutation = useMutation<CreateWatchlistOutput, Error, CreateWatchlistInput>(
		(createWatchlistInput) => createWatchlist(createWatchlistInput)
	);
</script>

<div class="root">
	<div class="primary-commands">
		<div class="watchlist-select-section">
			<div>Selected watchlist:</div>
			<Select.Root
				type="single"
				value={selectedWatchlistName}
				onValueChange={(newName) => onSelectWatchlistName(newName)}
			>
				<Select.Trigger style={{ 'max-width': '200px', 'min-width': '200px' }}>
					<span class="truncate">
						{selectedWatchlistName === undefined || selectedWatchlistName === ''
							? 'Choose a watchlist'
							: selectedWatchlistName}
					</span>
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
		<div>
			<Dialog.Root bind:open={createWatchlistDialogIsOpen}>
				<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>+</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>Create a new watchlist</Dialog.Header>
					<Dialog.Description
						>Choose a name for the new watchlist (must be unique)</Dialog.Description
					>
					<div>
						<Input
							aria-label="Watchlist name"
							type="text"
							bind:value={nameOfNewWatchlistToCreate}
						/>
					</div>
					<Dialog.Footer>
						<Button
							disabled={nameOfNewWatchlistToCreate === undefined ||
								nameOfNewWatchlistToCreate === ''}
							onclick={() => {
								$createWatchlistMutation.mutate(
									{ watchlistName: nameOfNewWatchlistToCreate! },
									{
										onSuccess(data, variables, context) {
											queryClient.invalidateQueries({ queryKey: ['allWatchlists'] });
											onSelectWatchlistName(nameOfNewWatchlistToCreate ?? '');
											createWatchlistDialogIsOpen = false;
											nameOfNewWatchlistToCreate = undefined;
										}
									}
								);
							}}>Create watchlist</Button
						>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
	<div class="secondary-commands">
		{#if selectedWatchlistName !== undefined && selectedWatchlistName !== ''}
			<Dialog.Root bind:open={deleteWatchlistDialogIsOpen}>
				<Dialog.Trigger class={buttonVariants({ variant: 'destructive' })}
					>Delete current watchlist</Dialog.Trigger
				>
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
											deleteWatchlistDialogIsOpen = false;
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

	.watchlist-select-section {
		min-width: 200px;
		max-width: 200px;
	}

	.truncate {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
