export type SymbolTableProps = {
    symbolRows: SymbolTableRow[];
    onDeleteSymbols: (symbolNames: string[]) => void;
}

export type SymbolTableRow = {
    symbolName: string;
    bidPrice?: number;
    askPrice?: number;
    lastPrice?: number;
}


