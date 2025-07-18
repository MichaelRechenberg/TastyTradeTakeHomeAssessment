export const addApplicationJsonContentTypeHeader = (headers: HeadersInit) => {
	return {
		...headers,
		'Content-Type': 'application/json'
	};
};
