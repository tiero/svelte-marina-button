import type { MarinaProvider } from 'marina-provider';
import Connect from './Connect.svelte';

declare global {
	interface Window {
		marina: MarinaProvider;
	}
}

export default Connect;
export * from './type';
export * from './marinaStore.js';
