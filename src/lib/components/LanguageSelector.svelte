<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { locale, locales } from 'svelte-i18n';

	let localLanguage: string = $locale?.slice(0, 2) ?? 'it';
	$: $locale = localLanguage;

	const colors: Map<string, string> = new Map([
		['it', 'bg-green-700'],
		['en', 'bg-blue-800'],
		['ja', 'bg-red-700']
	]);
</script>

<RadioGroup background="bg-gray-100" border="border border-black" padding="p-1 px-2">
	{#each $locales as lcl}
		<RadioItem
			bind:group={localLanguage}
			name="justify"
			value={lcl}
			class="text-xs"
			color={colors.get(lcl)}>{lcl}</RadioItem
		>
	{/each}
</RadioGroup>
