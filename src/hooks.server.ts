import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import process from 'process';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) {
		locale.set(lang);
	}
	return resolve(event);
};

process.on('SIGINT', function () {
	process.exit();
});
process.on('SIGTERM', function () {
	process.exit();
});
