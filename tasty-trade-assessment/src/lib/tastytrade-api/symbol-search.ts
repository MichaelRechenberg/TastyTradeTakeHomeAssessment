import type { InstrumentType } from "./common.types";
import { addAuthorizationHeader } from "./addTastyTradeAuthorizationHeader";
import { TastyTradeApiBaseURL } from "./constants";

export type SymbolData = {
    symbol: string;
    'instrument-type': InstrumentType;
}

export type SearchSymbolDataInput = {
    symbolPrefix: string;
}

export type SearchSymbolDataOutput = {
    symbolDataList?: SymbolData[];
    response: Response;
}

export const searchSymbol = (sessionToken: string) => async (searchSymbolDataInput: SearchSymbolDataInput): Promise<SearchSymbolDataOutput> => {
    let headers = {};
    headers = addAuthorizationHeader(headers, sessionToken);

    const { symbolPrefix } = searchSymbolDataInput;

    const searchResponse = await fetch(`${TastyTradeApiBaseURL}/symbols/search/${symbolPrefix}`, { headers });

    if (searchResponse.ok) {
        const symbolSearchResults = await searchResponse.json();

        return {
            symbolDataList: symbolSearchResults['data']['items'],
            response: searchResponse
        }
    }
    else {
        return {
            symbolDataList: undefined,
            response: searchResponse
        }
    }
}