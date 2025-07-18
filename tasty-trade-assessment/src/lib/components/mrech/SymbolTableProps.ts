export type SymbolTableProps = {
    symbolRows: SymbolTableRow[];
    onDeleteSymbols: (symbolNames: string[]) => void;
    shouldDisableDeleteButton?: boolean;
}

export type SymbolTableRow = {
    symbolName: string;
    bidPrice?: number;
    askPrice?: number;
    lastPrice?: number;
}


