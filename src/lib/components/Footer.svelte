<script lang="ts">
	import Icon from './Icon.svelte';
	import { blogConfig } from '../config.js';
	import { t } from '$lib/stores/locale';
	import type { IconName } from '$lib/types';

	const currentYear = new Date().getFullYear();
	const socialLinks: Array<{ name: string; icon: IconName; href: string }> = [
		{ name: 'GitHub', icon: 'github', href: blogConfig.author.social.github }
	].filter(link => link.href);
</script>

<footer class="border-t border transition-colors">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Brand & Description -->
			<div class="col-span-1 md:col-span-2">
				<div class="flex items-center space-x-2 mb-4">
					<Icon name="code" size={24} />
					<span class="text-xl font-bold">{$t('site.title')}</span>
				</div>
				<p class="text-muted mb-4 max-w-md">
					{$t('site.description')}
				</p>
				<p class="text-sm text-muted">
					{$t('author.bio')}
				</p>
			</div>

			<!-- Social Links & RSS -->
			<div class="col-span-1">
				<h3 class="text-sm font-semibold uppercase tracking-wider mb-4">
					{$t('footer.connect')}
				</h3>
				<div class="flex space-x-4">
					{#each socialLinks as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.name}
						>
							<Icon name={link.icon} size={20} />
						</a>
					{/each}
					
					{#if blogConfig.features.rss}
						<a
							href="/rss.xml"
							aria-label="RSS Feed"
						>
							<Icon name="rss" size={20} />
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="mt-8 pt-8 border-t border">
			<div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
				<p class="text-sm text-muted">
					© {currentYear} {$t('author.name')}. {$t('footer.allRightsReserved')}.
				</p>
				<div class="flex space-x-6 text-sm">
					<a href="/privacy">
						{$t('footer.privacy')}
					</a>
					<a href="/terms">
						{$t('footer.terms')}
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>