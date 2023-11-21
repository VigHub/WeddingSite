<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { _ } from 'svelte-i18n';
	const activeClass = 'underline underline-offset-4 decoration-1';

	interface itemURL {
		text: string;
		url: string;
		itemActive: string;
	}

	$: items = [
		{
			text: $_('navbar.welcome'),
			url: `${base}/`,
			itemActive: $page.url.pathname === `${base}/` ? activeClass : ''
		},
		{
			text: $_('navbar.gift-list'),
			url: `${base}/gift-list`,
			itemActive: $page.url.pathname === `${base}/gift-list` ? activeClass : ''
		},
		{
			text: $_('navbar.confirm-presence'),
			url: `${base}/confirm-presence`,
			itemActive: $page.url.pathname === `${base}/confirm-presence` ? activeClass : ''
		},
		{
			text: $_('navbar.info'),
			url: `${base}/info`,
			itemActive: $page.url.pathname === `${base}/info` ? activeClass : ''
		},
		{
			text: $_('navbar.reserved-area'),
			url: `${base}/reserved-area`,
			itemActive: [`${base}/reserved-area`, `${base}/guest-messages`].includes($page.url.pathname)
				? activeClass
				: ''
		}
	] as itemURL[];
</script>

<nav class="flex uppercase">
	{#each items as item (item.url)}
		<a
			class={`${item.itemActive} mx-6 hover:underline hover:underline-offset-4 hover:decoration-1`}
			href={item.url}>{item.text}</a
		>
	{/each}
</nav>
