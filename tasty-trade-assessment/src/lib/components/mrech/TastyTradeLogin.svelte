<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import type { TastyTradeLoginProps } from './TastyTradeLogin.types';

	let { onSessionTokenAcquired }: TastyTradeLoginProps = $props();

	let usernameId = 'username-input';
	let passwordId = 'password-input';

	let username = $state('');
	let password = $state('');
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
	<div class="login-action-section">
		<Button>Login</Button>
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
</style>
