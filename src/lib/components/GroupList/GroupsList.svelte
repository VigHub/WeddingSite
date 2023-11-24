<script lang="ts">
	import type { GuestGroup } from '$lib/utils/interfaces';
	import {
		type PaginationSettings,
		Paginator,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import Group from './Group.svelte';

	export let groups: GuestGroup[];
	export let groupPerPage: number;

	let page: PaginationSettings = {
		offset: 0,
		limit: groupPerPage,
		size: groups.length,
		amounts: []
	};

	const onClick = (group: GuestGroup) => {
		const modalComponent: ModalComponent = {
			ref: Group,
			props: { group },
			slot: '<p>Skeleton</p>'
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	};
</script>

<div class="relative min-h-[600px]">
	<div class="flex flex-col space-y-4">
		{#each groups.slice(page.offset * page.limit, (page.offset + 1) * page.limit) as group}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => {
					onClick(group);
				}}
				class="p-5 pt-3 border border-black
                rounded-xl hover:bg-slate-100"
			>
				<p class="">Gruppo {group.name}</p>
			</div>
		{/each}
	</div>
	<div class="flex absolute bottom-0 right-0">
		<Paginator bind:settings={page} showPreviousNextButtons={true} separatorText={'di'} />
	</div>
</div>
