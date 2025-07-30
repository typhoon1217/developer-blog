<script lang="ts">
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';
	
	export let chart: string;
	let container: HTMLDivElement;
	let id = `mermaid-${Math.random().toString(36).substring(7)}`;
	
	onMount(() => {
		mermaid.initialize({
			startOnLoad: false,
			theme: 'default',
			themeVariables: {
				primaryColor: '#3b82f6',
				primaryTextColor: '#fff',
				primaryBorderColor: '#2563eb',
				lineColor: '#6b7280',
				secondaryColor: '#f3f4f6',
				tertiaryColor: '#e5e7eb'
			}
		});
		
		renderChart();
	});
	
	async function renderChart() {
		if (!container) return;
		
		try {
			const { svg } = await mermaid.render(id, chart);
			container.innerHTML = svg;
		} catch (error) {
			console.error('Failed to render mermaid chart:', error);
			container.innerHTML = '<p class="error">Failed to render chart</p>';
		}
	}
	
	$: if (container && chart) {
		renderChart();
	}
</script>

<div bind:this={container} class="mermaid-container"></div>

<style>
	.mermaid-container {
		display: flex;
		justify-content: center;
		margin: 2rem 0;
		overflow-x: auto;
	}
	
	:global(.mermaid-container svg) {
		max-width: 100%;
		height: auto;
	}
	
	.error {
		color: #ef4444;
		padding: 1rem;
		background-color: #fee;
		border-radius: 0.5rem;
		text-align: center;
	}
</style>