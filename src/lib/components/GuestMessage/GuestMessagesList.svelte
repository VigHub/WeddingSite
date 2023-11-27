<script lang="ts">
	import {
		type PaginationSettings,
		Paginator,
		modalStore,
		type ModalComponent,
		type ModalSettings,
		ProgressRadial
	} from '@skeletonlabs/skeleton';
	import GuestMessage from './GuestMessage.svelte';
	import type { GuestMessageWithGuest } from '$lib/utils/interfaces';
	import { onMount } from 'svelte';
	import { fetchPost } from '$lib/utils/api';

	export let messagesPerPage: number = 3;
	let loading = true;
	let guestMessages: GuestMessageWithGuest[] = [];

	onMount(async () => {
		const res = await fetchPost('guestMessages/all');
		guestMessages = res.guestMessages;
		page.size = guestMessages.length;
		loading = false;
	});

	let page: PaginationSettings = {
		offset: 0,
		limit: messagesPerPage,
		size: guestMessages.length,
		amounts: []
	};

	const onClick = (guestMessage: GuestMessageWithGuest) => {
		const modalComponent: ModalComponent = {
			ref: GuestMessage,
			props: { guestMessage, inModal: true },
			slot: '<p>Skeleton</p>'
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	};
</script>

<div class="relative min-h-[500px]">
	{#if loading}
		<div class="flex items-center justify-center min-h-[500px]">
			<ProgressRadial width={'w-12 md:w-20'} />
		</div>
	{:else}
		<div class="flex flex-col space-y-4">
			{#each guestMessages.slice(page.offset * page.limit, (page.offset + 1) * page.limit) as guestMessage}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						onClick(guestMessage);
					}}
				>
					<GuestMessage {guestMessage} />
				</div>
			{/each}
		</div>
		<div class="flex absolute bottom-0 right-0">
			<Paginator bind:settings={page} showPreviousNextButtons={true} separatorText={'di'} />
		</div>
	{/if}
</div>
