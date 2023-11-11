<script lang="ts">
	import type { GuestMessageWithGuest } from '$lib/db/db';
	import {
		ProgressRadial,
		type PaginationSettings,
		Paginator,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import GuestMessage from './GuestMessage.svelte';

	export let data: Promise<GuestMessageWithGuest[]>;
	export let size: number;
	export let messagesPerPage: number;

	let page: PaginationSettings = {
		offset: 0,
		limit: messagesPerPage,
		size: size,
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

<div class="relative min-h-[580px]">
	{#await data}
		<div class="flex items-center justify-center">
			<ProgressRadial width={'w-12 md:w-20'} />
		</div>
	{:then guestMessages}
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
	{/await}
</div>
