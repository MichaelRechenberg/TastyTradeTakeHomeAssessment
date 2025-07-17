export const addAuthorizationHeader = (headers: HeadersInit, sessionToken: string) => {
    return {
        ...headers,
        Authorization: sessionToken
    }
}