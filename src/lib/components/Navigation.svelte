<script lang="ts">
	import Icon from './Icon.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import { page } from '$app/stores';
	import { theme } from '../stores/theme.js';
	import { t } from '$lib/stores/locale';
	import { onMount } from 'svelte';

	let mobileMenuOpen = $state(false);

	onMount(() => {
		theme.init();
	});

	const navigation = [
		{ nameKey: 'nav.home', href: '/', icon: 'home' },
		{ nameKey: 'nav.blog', href: '/blog', icon: 'book-open' },
		{ nameKey: 'nav.categories', href: '/categories', icon: 'tag' },
		{ nameKey: 'nav.about', href: '/about', icon: 'user' }
	] as const;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 backdrop-blur-md border-b border" style="background-color: var(--color-bg); backdrop-filter: blur(8px);">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo/Brand -->
			<div class="flex-shrink-0">
				<a href="/" class="flex items-center space-x-2 text-xl font-bold">
					<Icon name="code" size={24} />
					<span>{$t('site.title')}</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="flex items-center space-x-8">
					{#each navigation as item}
						<a
							href={item.href}
							class="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all
								{$page.url.pathname === item.href 
									? 'font-bold underline' 
									: 'hover:underline'}"
						>
							<Icon name={item.icon} size={16} />
							<span>{$t(item.nameKey)}</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Theme Toggle, Language Switcher & Mobile Menu Button -->
			<div class="flex items-center space-x-3">
				<!-- Language Switcher -->
				<LanguageSwitcher />
				
				<!-- Theme Toggle -->
				<button
					onclick={theme.toggle}
					class="p-2 rounded-md transition-all"
					aria-label={$t('theme.toggle')}
				>
					{#if $theme === 'light'}
						<Icon name="moon" size={20} />
					{:else}
						<Icon name="sun" size={20} />
					{/if}
				</button>

				<!-- Mobile menu button - Only visible on mobile -->
				<div class="md:hidden">
					<button
						onclick={toggleMobileMenu}
						class="p-2 rounded-md transition-all"
						aria-label="Toggle mobile menu"
					>
						{#if mobileMenuOpen}
							<Icon name="x" size={20} />
						{:else}
							<Icon name="menu" size={20} />
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden border-t border py-2">
				<div class="space-y-1">
					{#each navigation as item}
						<a
							href={item.href}
							onclick={closeMobileMenu}
							class="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all
								{$page.url.pathname === item.href 
									? 'font-bold underline' 
									: 'hover:underline'}"
						>
							<Icon name={item.icon} size={18} />
							<span>{$t(item.nameKey)}</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav>