<script type="ts">
	import Connect, { marinaStore, MarinaStore } from '../lib';
	marinaStore.subscribe((s: MarinaStore) => {
		console.log(s.network);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Connect cssClass={'special-button-css'} />
