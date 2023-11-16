<script lang="ts">
	import {
		type PaginationSettings,
		Paginator,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import GuestMessage from './GuestMessage.svelte';
	import type { GuestMessageWithGuest } from '$lib/utils/interfaces';

	export let guestMessages: GuestMessageWithGuest[];
	export let messagesPerPage: number;

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

<div class="relative min-h-[600px]">
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
</div>
