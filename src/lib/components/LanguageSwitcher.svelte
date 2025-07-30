<script lang="ts">
	import { locale, currentLocale } from '$lib/stores/locale';
	import Icon from './Icon.svelte';
	
	function toggleLanguage() {
		const newLocale = $currentLocale === 'en' ? 'ko' : 'en';
		locale.set(newLocale);
		// Set cookie for server-side locale detection
		document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Strict`;
	}
</script>

<button
	onclick={toggleLanguage}
	class="p-2 rounded-md transition-all"
	aria-label={$currentLocale === 'en' ? '한국어로 전환' : 'Switch to English'}
>
	<span class="text-sm font-medium">
		{$currentLocale === 'en' ? '한글' : 'ENG'}
	</span>
</button>