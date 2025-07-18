<script lang="ts">
	import { type ColumnDef, getCoreRowModel, type RowSelectionState } from '@tanstack/table-core';
	import { createSvelteTable, FlexRender, renderComponent } from '$lib/components/ui/data-table';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';

	import { type SymbolTableProps, type SymbolTableRow } from './SymbolTableProps';
	import type { SymbolData } from '$lib/tastytrade-api/symbol-search';
	import { tick } from 'svelte';

	let {
		symbolRows,
		onDeleteSymbols,
		shouldDisableDeleteSymbolsButton,
		addSymbolToWatchlist,
		shouldDisableAddSymbolButton,
		searchSymbols
	}: SymbolTableProps = $props();

	let rowSelection = $state<RowSelectionState>({});
	// The name inside the symbol text box
	let symbolToAddRawName = $state<string>('');

	// Searching symbols
	// The symbol name to use for searching (updates to it are debounced to prevent excessive network calls)
	let symbolSearchIsLoading = $state(false);
	let searchSymbolName = $state<string | undefined>(undefined);
	let searchSymbolNameDebounceTimer = $state<number | undefined>(undefined);
	const debounceSymbolNameForSearch = (newName: string | undefined) => {
		if (searchSymbolNameDebounceTimer) {
			clearTimeout(searchSymbolNameDebounceTimer);
		}

		searchSymbolNameDebounceTimer = setTimeout(() => {
			searchSymbolName = newName;
		}, 400);
	};

	// Actual search
	let symbolSearchResults = $state<SymbolData[]>([]);
	$effect(() => {
		if (searchSymbolName) {
			symbolSearchIsLoading = true;
			searchSymbols({ symbolPrefix: searchSymbolName })
				.then((symbolData) => {
					symbolSearchResults = symbolData;
				})
				.catch(() => {
					symbolSearchResults = [];
				})
				.finally(() => {
					symbolSearchIsLoading = false;
				});
		}

		return () => {
			symbolSearchResults = [];
		};
	});

	// Symbol search combobox state
	let symbolSearchComboboxOpen = $state(false);
	let symbolSearchTriggerRef = $state<HTMLButtonElement>(null!);
	let selectedSymbol = $state<SymbolData | undefined>(undefined);
	// Be able to refocus the trigger element once the user selects an item
	function closeAndFocusTrigger() {
		symbolSearchComboboxOpen = false;
		tick().then(() => {
			symbolSearchTriggerRef.focus();
		});
	}

	// Table definitions
	let symbolColumnDefs: ColumnDef<SymbolTableRow>[] = [
		{
			id: 'select',
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: 'symbolName',
			header: 'Name'
		},
		{
			accessorKey: 'bidPrice',
			header: 'Bid Price'
		},
		{
			accessorKey: 'askPrice',
			header: 'Ask Price'
		},
		{
			accessorKey: 'lastPrice',
			header: 'Last Price'
		}
	];

	const symbolTable = createSvelteTable({
		get data() {
			return symbolRows;
		},
		state: {
			get rowSelection() {
				return rowSelection;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		columns: symbolColumnDefs,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<div class="root">
	<div class="command-section">
		<span>Symbols</span>
		<div class="symbol-name-input">
			<Popover.Root bind:open={symbolSearchComboboxOpen}>
				<Popover.Trigger bind:ref={symbolSearchTriggerRef} disabled={shouldDisableAddSymbolButton}>
					{#snippet child({ props })}
						<Button
							variant="outline"
							{...props}
							role="combobox"
							class="adjustable-width"
							--min-width={'200px'}
							aria-expanded={symbolSearchComboboxOpen}
						>
							{selectedSymbol?.symbol || 'Select a symbol to add...'}
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0">
					<Command.Root>
						<Command.Input
							bind:value={symbolToAddRawName}
							oninput={() => {
								symbolSearchResults = [];
								debounceSymbolNameForSearch(symbolToAddRawName);
							}}
							type="text"
							aria-label={'Symbol name input'}
							placeholder="Search symbol..."
						/>
						<Command.List>
							{#if !symbolSearchIsLoading}
								{#if symbolSearchResults.length === 0}
									<Command.Empty>No symbols found.</Command.Empty>
								{:else}
									<Command.Group>
										{#each symbolSearchResults as symbolSearchResult (symbolSearchResult.symbol)}
											<Command.Item
												value={symbolSearchResult.symbol}
												onSelect={() => {
													selectedSymbol = symbolSearchResult;
													closeAndFocusTrigger();
												}}
											>
												{symbolSearchResult.symbol}
											</Command.Item>
										{/each}
									</Command.Group>
								{/if}
							{:else}
								<Command.Empty>Searching symbols...</Command.Empty>
							{/if}
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
		<Button
			variant="outline"
			aria-label="Add symbol to watchlist"
			disabled={shouldDisableAddSymbolButton || selectedSymbol === undefined}
			onclick={() => {
				if (selectedSymbol) {
					addSymbolToWatchlist(selectedSymbol);
				}
			}}>+</Button
		>
		{#if symbolTable.getFilteredSelectedRowModel().rows.length > 0}
			<Button
				variant="outline"
				disabled={shouldDisableDeleteSymbolsButton}
				onclick={() =>
					onDeleteSymbols(
						symbolTable.getFilteredSelectedRowModel().rows.map((x) => x.original.symbolName)
					)}>Delete</Button
			>
		{/if}
	</div>
	<div>
		<Table.Root>
			<Table.Header>
				{#each symbolTable.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each symbolTable.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={symbolColumnDefs.length}>
							No symbols are in this watchlist
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
	}

	.command-section {
		display: flex;
		align-items: end;
	}

	.symbol-name-input {
		max-width: 240px;
	}
</style>
