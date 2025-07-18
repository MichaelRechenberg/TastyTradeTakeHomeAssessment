<script lang="ts">
	import { type ColumnDef, getCoreRowModel, type RowSelectionState } from '@tanstack/table-core';
	import { createSvelteTable, FlexRender, renderComponent } from '$lib/components/ui/data-table';
	import * as Table from '$lib/components/ui/table';

	import { type SymbolTableProps, type SymbolTableRow } from './SymbolTableProps';
	import { Checkbox } from '../ui/checkbox';

	let { symbolRows }: SymbolTableProps = $props();

	let rowSelection = $state<RowSelectionState>({});

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
