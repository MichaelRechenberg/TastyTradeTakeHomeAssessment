<script lang="ts">
	import { type ColumnDef, getCoreRowModel, type RowSelectionState } from '@tanstack/table-core';
	import { createSvelteTable, FlexRender, renderComponent } from '$lib/components/ui/data-table';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import { type SymbolTableProps, type SymbolTableRow } from './SymbolTableProps';
	import type { SymbolData } from '$lib/tastytrade-api/symbol-search';

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
	let symbolToAddRawName = $state<string | undefined>(undefined);

	// Searching symbols
	// The symbol name to use for searching (updates to it are debounced to prevent excessive network calls)
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
			console.log(searchSymbolName);
			searchSymbols({ symbolPrefix: searchSymbolName })
				.then((symbolData) => {
					symbolSearchResults = symbolData;
				})
				.catch(() => {
					symbolSearchResults = [];
				});
		}

		return () => {
			symbolSearchResults = [];
		};
	});

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
	<div>
		{#each symbolSearchResults as searchResult (searchResult.symbol)}
			<div>{searchResult.symbol}</div>
		{/each}
	</div>
	<div class="command-section">
		<span>Symbols</span>
		<div class="symbol-name-input">
			<Input
				bind:value={symbolToAddRawName}
				oninput={() => debounceSymbolNameForSearch(symbolToAddRawName)}
				type="text"
				aria-label={'Symbol name input'}
			/>
		</div>
		<Button
			variant="outline"
			disabled={shouldDisableAddSymbolButton}
			onclick={() => {
				// TODO: this should take a Symbol constructed from auto-complete (result of debounced symbol search),
				//   and not a simple POJO here that assumes instrument type is equity
				if (symbolToAddRawName) {
					addSymbolToWatchlist({
						symbol: symbolToAddRawName,
						'instrument-type': 'Equity'
					});
				}
			}}>Add</Button
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
