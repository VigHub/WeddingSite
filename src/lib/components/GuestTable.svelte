<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import type { Guest } from '$lib/utils/interfaces';
	import { tableMapperValues, Table, ProgressRadial } from '@skeletonlabs/skeleton';
	import guestsForGroup from '../../stores/guestsGroupReserved';

	export let loaded: boolean;
	export let offset: number;
	export let limit: number;

	$: source = {
		head: ['Nome', 'Cognome', 'ID'],
		body: tableMapperValues($guestsForGroup.slice(offset * limit, (offset + 1) * limit), [
			'name',
			'surname',
			'id'
		])
	};

	const onRowSelected = async (row: CustomEvent<any[]>) => {
		const { ok, data } = await fetchPost('guests/updateGroupID', {
			guestId: row.detail[2],
			groupId: null
		});
		if (ok) {
			$guestsForGroup = $guestsForGroup.filter((g) => {
				return g.id !== (data as Guest[])[0].id;
			});
		}
	};
</script>

<div>
	{#if !loaded}
		<div class="flex items-center justify-center align-middle min-h-[300px]">
			<ProgressRadial width={'w-12 md:w-20'} />
		</div>
	{:else}
		<Table
			{source}
			regionBody="bg-gray-50"
			regionHeadCell="bg-surface-200"
			interactive={true}
			on:selected={onRowSelected}
		/>
	{/if}
</div>
