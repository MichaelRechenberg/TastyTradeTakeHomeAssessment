import type { InstrumentType } from '$lib/tastytrade-api/common.types';
import type { SearchSymbolDataInput, SymbolData } from '$lib/tastytrade-api/symbol-search';

export type SymbolTableProps = {
	symbolRows: SymbolTableRow[];
	onDeleteSymbols: (symbolNames: string[]) => void;
	shouldDisableDeleteSymbolsButton?: boolean;
	addSymbolToWatchlist: (symbol: { symbol: string; 'instrument-type': InstrumentType }) => void;
	shouldDisableAddSymbolButton?: boolean;
	searchSymbols: (input: SearchSymbolDataInput) => Promise<SymbolData[]>;
};

export type SymbolTableRow = {
	symbolName: string;
	bidPrice?: number;
	askPrice?: number;
	lastPrice?: number;
};
