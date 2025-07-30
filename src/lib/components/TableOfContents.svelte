<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	
	interface Heading {
		id: string;
		text: string;
		level: number;
	}
	
	let headings: Heading[] = [];
	let activeId = '';
	let showToc = false;
	
	onMount(() => {
		if (!browser) return;
		
		// Get all headings from the article
		const article = document.querySelector('article');
		if (!article) return;
		
		const headingElements = article.querySelectorAll('h2, h3, h4');
		headings = Array.from(headingElements).map((heading) => ({
			id: heading.id || '',
			text: heading.textContent || '',
			level: parseInt(heading.tagName.charAt(1))
		}));
		
		// Show TOC only if there are enough headings
		showToc = headings.length > 2;
		
		// Set up intersection observer for active heading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-20% 0% -70% 0%'
			}
		);
		
		headingElements.forEach((heading) => {
			observer.observe(heading);
		});
		
		// Handle scroll to update active heading
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			
			for (let i = headings.length - 1; i >= 0; i--) {
				const heading = document.getElementById(headings[i].id);
				if (heading && heading.offsetTop <= scrollPosition + 100) {
					activeId = headings[i].id;
					break;
				}
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Set initial active heading
		
		return () => {
			headingElements.forEach((heading) => {
				observer.unobserve(heading);
			});
			window.removeEventListener('scroll', handleScroll);
		};
	});
	
	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (element) {
			const offset = 80; // Account for fixed header
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;
			
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}
</script>

{#if showToc && headings.length > 0}
	<nav class="toc" aria-label="Table of contents">
		<h2 class="toc-title">Table of Contents</h2>
		<ul class="toc-list">
			{#each headings as heading}
				<li 
					class="toc-item"
					class:level-2={heading.level === 2}
					class:level-3={heading.level === 3}
					class:level-4={heading.level === 4}
				>
					<button
						class="toc-link"
						class:active={activeId === heading.id}
						on:click={() => scrollToHeading(heading.id)}
						aria-current={activeId === heading.id ? 'location' : undefined}
					>
						{heading.text}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.toc {
		position: sticky;
		top: 6rem;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
		padding: 1.5rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		min-width: 250px;
	}
	
	.toc-title {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		color: var(--color-text-muted);
	}
	
	.toc-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.toc-item {
		margin-bottom: 0.5rem;
	}
	
	.toc-item.level-3 {
		margin-left: 1rem;
	}
	
	.toc-item.level-4 {
		margin-left: 2rem;
	}
	
	.toc-link {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-muted);
		background: none;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
	}
	
	.toc-link:hover {
		color: var(--color-text);
		background: var(--color-hover);
	}
	
	.toc-link.active {
		color: var(--color-text);
		font-weight: 500;
	}
	
	.toc-link.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 70%;
		background: var(--color-primary, #3b82f6);
		border-radius: 0.125rem;
	}
	
	/* Hide on mobile */
	@media (max-width: 1280px) {
		.toc {
			display: none;
		}
	}
	
	/* Scrollbar styling */
	.toc::-webkit-scrollbar {
		width: 6px;
	}
	
	.toc::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.toc::-webkit-scrollbar-thumb {
		background: var(--color-border);
		border-radius: 3px;
	}
	
	.toc::-webkit-scrollbar-thumb:hover {
		background: var(--color-text-muted);
	}
</style>