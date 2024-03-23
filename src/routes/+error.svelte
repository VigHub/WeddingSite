<script>
	import { base } from '$app/paths';
	import { _ } from 'svelte-i18n';
</script>

<div class="space-y-8 text-center">
	<p class="font-mono text-9xl">404</p>
	<p class="font text-3xl">{$_('error.pageNotFound')}</p>
	<p class="text-center">{$_('error.message')}</p>
	<p class="text-center">
		{$_('error.text1')} <a href="{base}/" class="text-primary-700">{$_('error.text2')}</a>
		{$_('error.text3')}
	</p>
</div>
