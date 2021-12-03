<script lang="ts">
	//props
	export let cssClass = 'button is-rounded is-primary';

	// state
	let buttonText = 'Install Marina';

	import { onMount, onDestroy } from 'svelte';
	import { detectProvider } from 'marina-provider';
	import { marinaStore } from './marinaStore';
	import type { MarinaStore } from './';
	$: installed = false;
	$: enabled = false;
	const unsubscribe = marinaStore.subscribe((s: MarinaStore) => {
		installed = s.installed;
		enabled = s.enabled;

		if (!installed) return;

		if (!enabled) {
			buttonText = 'Connect with Marina';
		} else {
			buttonText = 'Disconnect';
		}
	});
	const connect = async () => {
		if (!enabled) await window.marina.enable();
		else await window.marina.disable();
	};
	const notifyEnabled = () => {
		marinaStore.update((s: MarinaStore) => ({ ...s, enabled: true }));
	};
	const notifyDisabled = () => {
		marinaStore.update((s: MarinaStore) => ({ ...s, enabled: false }));
	};
	const notifyInstalled = () => {
		marinaStore.update((s: MarinaStore) => ({ ...s, installed: true }));
	};
	const notifyNetworkChange = (network: string) => {
		marinaStore.update((s: MarinaStore) => ({ ...s, network: network }));
	};
	const onClick = () => {
		if (!installed) window.open('https://vulpem.com/marina');
		else connect();
	};
	onMount(async () => {
		// detect provider
		const marina = await detectProvider('marina');

		// change installed status
		if (!marina) return;
		notifyInstalled();

		// change network
		const currentNetwork = await marina.getNetwork();
		notifyNetworkChange(currentNetwork);

		// change enabled status
		const isEnabled = await marina.isEnabled();
		if (isEnabled) {
			notifyEnabled();
		} else {
			notifyDisabled();
		}
		// Start listening to ENABLED, DISABLED and NETWORK events and binds to the state
		marina.on('ENABLED', () => {
			notifyEnabled();
		});
		marina.on('DISABLED', () => {
			notifyDisabled();
		});
		marina.on('NETWORK', (payload: string) => {
			notifyNetworkChange(payload);
		});
	});
	onDestroy(unsubscribe);
</script>

<button class={cssClass} on:click={onClick}>
	{buttonText}
</button>
