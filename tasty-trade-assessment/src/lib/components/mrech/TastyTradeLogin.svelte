<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

	import {
		acquireSessionToken,
		type AcquireSessionTokenOutput,
		type AcquireSessionTokenInput
	} from '$lib/tastytrade-api/session';

	import { useMutation } from '@sveltestack/svelte-query';
	import type { TastyTradeLoginProps } from './TastyTradeLogin.types';

	let { onSessionTokenAcquired }: TastyTradeLoginProps = $props();

	let usernameId = 'username-input';
	let passwordId = 'password-input';

	let username = $state('');
	let password = $state('');

	let tokenAcquisitionErrorText = $state('');

	let acquireSessionMutation = useMutation<
		AcquireSessionTokenOutput,
		unknown,
		AcquireSessionTokenInput
	>((acquireSessionInput) => acquireSessionToken(acquireSessionInput));
</script>

<div class="root">
	<div class="preamble">
		<div>Welcome to Michael Rechenberg's application for the tastytrade assessment</div>
		<div>
			Please provide your sandbox user's credentials below and click "Login" to move to the
			watchlist section of the app.
		</div>
	</div>
	<div class="credentials-section">
		<div>
			<Label for={usernameId}>Username</Label>
			<Input id={usernameId} type="text" bind:value={username} />
		</div>
		<div class="password-section">
			<Label for={passwordId}>Password</Label>
			<Input id={passwordId} type="password" bind:value={password} />
		</div>
	</div>
	{#if tokenAcquisitionErrorText !== ''}
		<div class="token-acquisition-error-section">
			{tokenAcquisitionErrorText}
		</div>
	{/if}
	<div class="login-action-section">
		<Button
			onclick={() => {
				$acquireSessionMutation.mutate(
					{ loginUsername: username, loginPassword: password },
					{
						onSettled(data?: AcquireSessionTokenOutput) {
							if (data?.token) {
								onSessionTokenAcquired(data.token);
							} else if (data?.response?.status === 401) {
								tokenAcquisitionErrorText =
									'Invalid credentials. Check your credentials and try again';
							} else {
								tokenAcquisitionErrorText =
									'Unknown error when acquiring token. Please try again later.';
							}
						}
					}
				);
			}}>Login</Button
		>
	</div>
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		margin: 10px;
	}

	.preamble {
	}

	.credentials-section {
		display: flex;
		flex-direction: column;
		margin-block-start: 20px;
	}

	.login-action-section {
		display: flex;
		justify-content: flex-end;
		margin-block-start: 10px;
	}

	.password-section {
		margin-block-start: 8px;
	}

	.token-acquisition-error-section {
		color: var(--destructive);
	}
</style>
