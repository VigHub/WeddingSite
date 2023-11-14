<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { locale, locales } from 'svelte-i18n';

	let localLanguage: string = $locale?.slice(0, 2) ?? 'it';
	$: $locale = localLanguage;
</script>

<RadioGroup background="bg-gray-200" border="border border-black" padding="p-1 px-2">
	{#each $locales as lcl}
		<RadioItem bind:group={localLanguage} name="justify" value={lcl} class="text-xs"
			>{lcl}</RadioItem
		>
	{/each}
</RadioGroup>
