<script lang="ts">
	import type { Guest } from '$lib/utils/interfaces';
	import { tableMapperValues, Table, Paginator, ProgressRadial } from '@skeletonlabs/skeleton';

	export let guests: Guest[];
	export let guestsPerPage: number = 5;
	export let loaded: boolean;

	$: page = {
		offset: 0,
		limit: guestsPerPage,
		size: guests.length,
		amounts: []
	};

	$: source = {
		head: ['Nome', 'Cognome'],
		body: tableMapperValues(
			guests.slice(page.offset * page.limit, (page.offset + 1) * page.limit),
			['name', 'surname']
		)
	};
</script>

<div class="relative min-h-[380px] min-w-[300px]">
	{#if !loaded}
		<div class="flex items-center justify-center align-middle min-h-[300px]">
			<ProgressRadial width={'w-12 md:w-20'} />
		</div>
	{:else}
		<Table {source} regionBody="bg-gray-50" regionHeadCell="bg-surface-200" interactive={true} />
		<div class="absolute bottom-0 right-0">
			<Paginator bind:settings={page} showPreviousNextButtons={true} separatorText={'di'} />
		</div>
		<div class="absolute bottom-0 left-0">
			<button class="btn btn-sm variant-filled">Aggiungi invitato</button>
		</div>
	{/if}
</div>
