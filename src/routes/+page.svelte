<script lang="ts">
	import ImageDesktopLayout from '$lib/components/ImageDesktopLayout.svelte';
	import ImageMobileLayout from '$lib/components/ImageMobileLayout.svelte';
	import canAccessReservedArea from '../stores/reserved';
	import { _ } from 'svelte-i18n';

	canAccessReservedArea.set(false);
</script>

<h1 class="text-center text-4xl mb-5">{$_('pages.welcome.title')}</h1>
<div class="block md:hidden">
	<ImageMobileLayout />
</div>
<div class="hidden md:block">
	<ImageDesktopLayout />
</div>

<div class="max-w-2xl gap-y-5 text-center">
	<p class="mt-5">{$_('pages.welcome.text1')}</p>
	<p>{$_('pages.welcome.text2')}</p>
	<br />
	<p>{$_('pages.welcome.text3')}</p>
	<br />
	<p>{$_('pages.welcome.text4')}</p>
	<br />
	<p>{$_('pages.welcome.text5')}</p>
	<br />
	<p>{$_('pages.welcome.text6')}</p>
	<br />
	<p>{$_('pages.welcome.text7')}</p>
</div>
