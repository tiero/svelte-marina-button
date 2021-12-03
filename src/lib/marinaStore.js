import { writable } from 'svelte/store';

const initialState = { installed: false, enabled: false, network: 'liquid' };

export const marinaStore = writable(initialState);
