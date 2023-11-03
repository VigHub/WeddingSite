<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	const activeClass = 'underline underline-offset-4 decoration-1';

	interface itemURL {
		text: string;
		url: string;
		itemActive: string;
	}

	$: items = [
		{
			text: 'BENVENUTI!',
			url: `${base}/`,
			itemActive: $page.url.pathname === `${base}/` ? activeClass : ''
		},
		{
			text: 'LISTA NOZZE',
			url: `${base}/gift-list`,
			itemActive: $page.url.pathname === `${base}/gift-list` ? activeClass : ''
		},
		{
			text: 'CONFERMA LA TUA PRESENZA',
			url: `${base}/confirm-presence`,
			itemActive: $page.url.pathname === `${base}/confirm-presence` ? activeClass : ''
		},
		{
			text: 'INFORMAZIONI',
			url: `${base}/info`,
			itemActive: $page.url.pathname === `${base}/info` ? activeClass : ''
		}
	] as itemURL[];
</script>

<nav class="flex fixed w-screen">
	<!-- Left Navigation -->
	<div class="flex-1 flex justify-center mr-auto">
		{#each items as item (item.url)}
			<a
				class={`${item.itemActive} mx-6 hover:underline hover:underline-offset-4 hover:decoration-1`}
				href={item.url}>{item.text}</a
			>
		{/each}
	</div>
	<!-- Logo -->
	<div class="mx-12" />
</nav>
