import type { MarinaProvider } from 'marina-provider';
import Connect from './Connect.svelte';

declare global {
	interface Window {
		marina: MarinaProvider;
	}
}

export * from './marinaStore';
export default Connect;
