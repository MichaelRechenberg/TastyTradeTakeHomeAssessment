<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import TastyTradeLogin from '$lib/components/mrech/TastyTradeLogin.svelte';

	let queryClient = new QueryClient();

	let sessionToken = $state('');
</script>

<QueryClientProvider client={queryClient}>
	{#if sessionToken !== ''}
		<div>Successfully acquired your session token (I'm not displaying it though teehee)</div>
	{:else}
		<TastyTradeLogin
			onSessionTokenAcquired={(acquiredSessionToken) => {
				sessionToken = acquiredSessionToken;
			}}
		/>
	{/if}
</QueryClientProvider>
