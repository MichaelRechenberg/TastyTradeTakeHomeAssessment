import { addAuthorizationHeader } from "./addTastyTradeAuthorizationHeader";
import { TastyTradeApiBaseURL } from "./constants";

export type MarketDataForSymbolInput = {
    symbolName: string;
}

export type MarketDataForSymbolOutput = {
    marketData?: MarketData;
    response: Response;
}

export type InstrumentType = 'Bond' | 'Cryptocurrency' | 'Equity' | 'Equity Offering' | 'Equity Option' | 'Fixed Income Security' | 'Future' | 'Future Option' | 'Index' | 'Liquidity Pool' | 'Mutual Fund' | 'Unknown';

export type MarketData = {
    symbol: string;
    'instrument-type': InstrumentType;
    bid: number;
    ask: number;
    last: number;
}

export const fetchMarketDataForSymbol = (sessionToken: string) => async (marketDataForSymbolInput: MarketDataForSymbolInput): Promise<MarketDataForSymbolOutput> => {
    const { symbolName } = marketDataForSymbolInput;

    let headers = {};
    headers = addAuthorizationHeader(headers, sessionToken);

    const marketDataResponse = await fetch(`${TastyTradeApiBaseURL}/market-data/${symbolName}`, { headers });

    if (marketDataResponse.ok) {
        const marketDataJson = await marketDataResponse.json();
        return {
            marketData: marketDataJson['data'],
            response: marketDataResponse
        }
    }
    else {
        return {
            marketData: undefined,
            response: marketDataResponse
        }
    }
}
