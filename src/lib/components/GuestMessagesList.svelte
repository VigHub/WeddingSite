<script lang="ts">
	import type { GuestMessageWithGuest } from '$lib/db/db';
	import { getAttendance } from '$lib/utils/guests';
	import { ProgressRadial, type PaginationSettings, Paginator } from '@skeletonlabs/skeleton';
	import { format } from 'date-fns';

	const getStringTime = (created: Date) => {
		return format(new Date(created), 'dd/MM/yyyy HH:mm');
	};

	export let data: Promise<GuestMessageWithGuest[]>;
	export let size: number;
	export let messagesPerPage: number;

	let page: PaginationSettings = {
		offset: 0,
		limit: messagesPerPage,
		size: size,
		amounts: []
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
				<div class="flex flex-col p-5 pt-3 border border-black rounded-xl hover:bg-slate-100">
					<p class="text-sm text-gray-500 ms-auto mt-auto right-0 top-0 pb-1">
						{getAttendance(guestMessage.attendance)}
					</p>
					<p>{guestMessage.message}</p>
					<div class="flex">
						<p class="truncate hover:text-clip w-1/2 md:w-3/5 text-sm text-gray-500 me-auto left-0">
							{guestMessage.guest.name}
							{guestMessage.guest.surname}
						</p>
						<p class="text-sm text-gray-500 ms-auto right-0">
							{getStringTime(guestMessage.created)}
						</p>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex absolute bottom-0 right-0">
			<Paginator bind:settings={page} showPreviousNextButtons={true} separatorText={'di'} />
		</div>
	{/await}
</div>
