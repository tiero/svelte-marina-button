<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { detectProvider } from 'marina-provider';
	import { marinaStore, MarinaStore } from './marinaStore';
	$: installed = false;
	$: enabled = false;
	const unsubscribe = marinaStore.subscribe((s: MarinaStore) => {
		installed = s.installed;
		enabled = s.enabled;
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

{#if !installed}
	<button
		class="button is-rounded is-primary"
		on:click={() => window.open('https://vulpem.com/marina')}
	>
		Install Marina
	</button>
{:else if !enabled}
	<button class="button is-rounded is-primary" on:click={connect}> Connect with Marina </button>
{:else}
	<button class="button is-rounded is-primary" on:click={connect}> Disconnect </button>
{/if}
