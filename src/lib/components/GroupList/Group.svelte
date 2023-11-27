<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import type { Guest, GuestGroup } from '$lib/utils/interfaces';
	import { onDestroy, onMount } from 'svelte';
	import GuestTable from '../GuestTable.svelte';
	import { Paginator, type PaginationSettings, modalStore } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import SearchGuests from '../SearchGuests.svelte';
	import { handleToast } from '$lib/utils/toast';
	import UpdateGroupName from './UpdateGroupName.svelte';
	import DeleteGroup from './DeleteGroup.svelte';
	import { groups, guestsForGroup } from '../../../stores/guestsGroupReserved';

	export let group: GuestGroup;

	enum PageViewType {
		List,
		Add,
		Delete,
		Update
	}

	let loaded = false;

	onMount(async () => {
		const res = await fetchPost('guests/sameGroup', { groupId: group.id });
		$guestsForGroup = res.guests;
		page.size = $guestsForGroup.length;
		loaded = true;
	});

	onDestroy(() => {
		$guestsForGroup = [];
	});

	const onClickGuest = async (g: Guest) => {
		const { ok, data } = await fetchPost('guests/updateGroupID', {
			guestId: g.id,
			groupId: group.id
		});
		$guestsForGroup.push((data as Guest[])[0]);
		page.size = $guestsForGroup.length;
		pageView = PageViewType.List;
		handleToast(
			ok,
			$_('pages.reserved-area.group.guestAdded'),
			$_('pages.reserved-area.group.guestNotAdded')
		);
	};

	const guestsPerPage: number = 5;
	let page: PaginationSettings = {
		offset: 0,
		limit: guestsPerPage,
		size: $guestsForGroup.length,
		amounts: []
	};
	let pageView: PageViewType = PageViewType.List;
</script>

<div
	class="p-5 pt-3 border border-black
rounded-xl hover:bg-slate-100 bg-white"
>
	<h1 class="mb-4">{group.name}</h1>
	<div class="relative min-h-[380px] min-w-[300px]">
		{#if pageView === PageViewType.List}
			<GuestTable {loaded} limit={page.limit} offset={page.offset} />
			<div class="absolute bottom-0 right-0">
				<Paginator
					bind:settings={page}
					showPreviousNextButtons={true}
					separatorText={$_('general.of')}
				/>
			</div>
			<div class="absolute left-0 bottom-0 inline-flex rounded-full space-x-[1px] variant-filled">
				<button
					class="btn btn-sm"
					on:click={() => {
						pageView = PageViewType.Add;
					}}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
						/>
					</svg>
				</button>
				<button
					class="btn btn-sm"
					on:click={() => {
						pageView = PageViewType.Update;
					}}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
				</button>
				<button
					class="btn btn-sm"
					on:click={() => {
						pageView = PageViewType.Delete;
					}}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		{:else if pageView === PageViewType.Add}
			<div class="max-w-xs md:max-w-2xl mx-auto">
				<SearchGuests {onClickGuest} withOutGroup />
			</div>
		{:else if pageView === PageViewType.Update}
			<div class="max-w-xs md:max-w-2xl mx-auto">
				<UpdateGroupName
					{group}
					afterUpdate={() => {
						pageView = PageViewType.List;
						$groups = $groups.map((g) => {
							if (g.id === group.id) {
								return group;
							}
							return g;
						});
						modalStore.clear();
					}}
				/>
			</div>
		{:else if pageView === PageViewType.Delete}
			<div class="max-w-xs md:max-w-2xl mx-auto">
				<DeleteGroup
					{group}
					onBack={() => {
						pageView = PageViewType.List;
					}}
				/>
			</div>
		{/if}
	</div>
</div>
