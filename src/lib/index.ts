import type { MarinaProvider } from 'marina-provider';
import Connect from './Connect.svelte';

declare global {
	interface Window {
		marina: MarinaProvider;
	}
}

export interface MarinaStore {
	installed: boolean;
	enabled: boolean;
	network: string;
}

export default Connect;
export * from './marinaStore.js';
