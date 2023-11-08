<script lang="ts">
	import { getAttendance } from '$lib/utils/guests';
	import type { PageData } from './$types';
	import { formatDistanceToNow } from 'date-fns';
	import { it } from 'date-fns/locale';
	export let data: PageData;
	let page: number = 0;
	const messagesPerPage = 5;
	const totPages = Math.ceil(data.guestMessages.length / messagesPerPage) - 1;
	$: guestMessages = data.guestMessages.slice(page * messagesPerPage, (page + 1) * messagesPerPage);
	const onNext = () => {
		if (page < totPages) page += 1;
	};
	const onPrev = () => {
		if (page > 0) page -= 1;
	};
	const getStringTimeAgo = (created: Date) => {
		return formatDistanceToNow(new Date(created), { locale: it, addSuffix: true });
	};
</script>

<div class="relative min-h-[680px]">
	<div class="flex flex-col space-y-2">
		{#each guestMessages as guestMessage}
			<div class="flex flex-col p-5 pt-3 border border-black rounded-xl hover:bg-slate-100">
				<p class="text-sm text-gray-500 ms-auto mt-auto right-0 top-0 pb-1">
					{getAttendance(guestMessage.attendance)}
				</p>
				<p>{guestMessage.message}</p>
				<div class="flex">
					<p class="text-sm text-gray-500 me-auto left-0">
						{guestMessage.guest.name}
						{guestMessage.guest.surname}
					</p>
					<p class="text-sm text-gray-500 ms-auto right-0">
						{getStringTimeAgo(guestMessage.created)}
					</p>
				</div>
			</div>
		{/each}
	</div>
	<div class="flex absolute inset-x-0 bottom-0">
		<div class="flex mx-auto">
			<!-- Previous Button -->
			<button
				disabled={page === 0}
				on:click={onPrev}
				class="flex items-center justify-center px-3 h-8 mr-3
            text-sm font-medium text-gray-500 bg-white border
             border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
			>
				<svg
					class="w-3.5 h-3.5 mr-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 5H1m0 0 4 4M1 5l4-4"
					/>
				</svg>
				Precedente
			</button>
			<button
				disabled={page === totPages}
				on:click={onNext}
				class="flex items-center justify-center px-3 h-8
            text-sm font-medium text-gray-500 bg-white border
             border-gray-300 rounded-lg hover:bg-gray-100
              hover:text-gray-700"
			>
				Successivo
				<svg
					class="w-3.5 h-3.5 ml-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>
