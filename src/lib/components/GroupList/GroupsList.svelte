<script lang="ts">
	import type { GuestGroup } from '$lib/utils/interfaces';
	import {
		type PaginationSettings,
		Paginator,
		modalStore,
		type ModalComponent,
		type ModalSettings,
		ProgressRadial
	} from '@skeletonlabs/skeleton';
	import Group from './Group.svelte';
	import { fetchPost } from '$lib/utils/api';
	import { handleToast } from '$lib/utils/toast';
	import { onMount } from 'svelte';
	import { groups } from '../../../stores/guestsGroupReserved';

	export let groupPerPage: number = 5;

	let loading = true;

	onMount(async () => {
		const res = await fetchPost('group/all');
		$groups = res.groups;
		page.size = $groups.length;
		loading = false;
	});

	let page: PaginationSettings = {
		offset: 0,
		limit: groupPerPage,
		size: $groups.length,
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

	const addGroup = async (groupName: string) => {
		if (groupName === undefined || groupName === '') return;
		const ok = await fetchPost('group/add', { groupName });
		handleToast(ok, 'Gruppo aggiunto', 'Gruppo non aggiunto');
		if (ok) {
			$groups.push({ id: $groups.length, name: groupName });
			page.size = $groups.length;
		}
	};

	const addGroupModal = () => {
		const modal: ModalSettings = {
			type: 'prompt',
			title: 'Aggiungi Gruppo',
			body: 'Che nome vuoi dare al nuovo gruppo?',
			value: '',
			valueAttr: { type: 'text', minlength: 3, maxlength: 50, required: true },
			response: async (r: string) => await addGroup(r),
			buttonTextCancel: 'Annulla',
			buttonTextSubmit: 'Invia',
			modalClasses: '!bg-white border border-black rounded-xl'
		};
		modalStore.trigger(modal);
	};
</script>

<div class="relative min-h-[480px]">
	{#if loading}
		<div class="flex items-center justify-center min-h-[480px]">
			<ProgressRadial width={'w-12 md:w-20'} />
		</div>
	{:else}
		<div class="flex flex-col space-y-4">
			{#each $groups.slice(page.offset * page.limit, (page.offset + 1) * page.limit) as group}
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
		<div class="absolute bottom-0 right-0">
			<Paginator bind:settings={page} showPreviousNextButtons={true} separatorText={'di'} />
		</div>
		<div class="absolute bottom-0 left-0">
			<button class="btn btn-sm variant-filled" on:click={addGroupModal}>Aggiungi gruppo</button>
		</div>
	{/if}
</div>
