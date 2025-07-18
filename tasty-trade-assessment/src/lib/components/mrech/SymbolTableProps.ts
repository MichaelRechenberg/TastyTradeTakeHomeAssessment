export type SymbolTableProps = {
    symbolRows: SymbolTableRow[];
}

export type SymbolTableRow = {
    symbolName: string;
    bidPrice?: number;
    askPrice?: number;
    lastPrice?: number;
}


