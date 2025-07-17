import { addApplicationJsonContentTypeHeader } from "./addApplicationJsonContentTypeHeader";
import { TastyTradeApiBaseURL } from "./constants";

export type AcquireSessionTokenInput = {
    loginUsername: string;
    loginPassword: string;
}

export type AcquireSessionTokenOutput = {
    token?: string;
    response: Response;
}

export const acquireSessionToken = async (input: AcquireSessionTokenInput): Promise<AcquireSessionTokenOutput> => {
    const { loginUsername, loginPassword } = input;

    let headers = {};
    headers = addApplicationJsonContentTypeHeader(headers);

    const loginResponse = await fetch(`${TastyTradeApiBaseURL}/sessions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ login: loginUsername, password: loginPassword })
    });

    if (loginResponse.ok) {
        const loginResponseData = await loginResponse.json();
        return {
            token: loginResponseData['data']['session-token'],
            response: loginResponse
        }
    } else {
        return {
            token: undefined,
            response: loginResponse
        }
    }
};