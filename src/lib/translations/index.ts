import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'it';

register('it', () => import('./languages/it.json'));
register('en', () => import('./languages/en.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});
