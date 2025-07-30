import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('theme') as Theme;
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const theme = stored || (prefersDark ? 'dark' : 'light');
				
				set(theme);
				document.documentElement.setAttribute('data-theme', theme);
				// Also add/remove dark class for Tailwind compatibility
				if (theme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
				
				// Listen for system theme changes
				window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
					if (!localStorage.getItem('theme')) {
						const newTheme = e.matches ? 'dark' : 'light';
						set(newTheme);
						document.documentElement.setAttribute('data-theme', newTheme);
						if (newTheme === 'dark') {
							document.documentElement.classList.add('dark');
						} else {
							document.documentElement.classList.remove('dark');
						}
					}
				});
			}
		},
		toggle: () => {
			update(current => {
				const newTheme = current === 'light' ? 'dark' : 'light';
				
				if (browser) {
					localStorage.setItem('theme', newTheme);
					document.documentElement.setAttribute('data-theme', newTheme);
					if (newTheme === 'dark') {
						document.documentElement.classList.add('dark');
					} else {
						document.documentElement.classList.remove('dark');
					}
				}
				
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				document.documentElement.setAttribute('data-theme', theme);
				if (theme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			}
			set(theme);
		}
	};
}

export const theme = createThemeStore();