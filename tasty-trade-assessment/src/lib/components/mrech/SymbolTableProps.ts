import type { InstrumentType } from "$lib/tastytrade-api/common.types";

export type SymbolTableProps = {
    symbolRows: SymbolTableRow[];
    onDeleteSymbols: (symbolNames: string[]) => void;
    shouldDisableDeleteSymbolsButton?: boolean;
    addSymbolToWatchlist: (symbol: {
        symbol: string;
        'instrument-type': InstrumentType;
    }) => void;
    shouldDisableAddSymbolButton?: boolean;
}

export type SymbolTableRow = {
    symbolName: string;
    bidPrice?: number;
    askPrice?: number;
    lastPrice?: number;
}


