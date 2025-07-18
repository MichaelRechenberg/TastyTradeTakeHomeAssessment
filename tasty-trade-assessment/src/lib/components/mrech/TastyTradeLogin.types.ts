export interface TastyTradeLoginProps {
	// If session token was successfully acquired, this callback will be invoked
	//   and the session token that was acquired will be passed in as an argument
	onSessionTokenAcquired: (sessionToken: string) => void;
}
