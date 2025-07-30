<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen">
	<Navigation />
	
	<main class="flex-1">
		{@render children()}
	</main>
	
	<Footer />
</div>
