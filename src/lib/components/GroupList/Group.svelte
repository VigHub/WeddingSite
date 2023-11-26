<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import type { Guest, GuestGroup } from '$lib/utils/interfaces';
	import { onMount } from 'svelte';
	import GuestTable from '../GuestTable.svelte';
	import { Paginator, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import SearchGuests from '../SearchGuests.svelte';
	import guestsForGroup from '../../../stores/guestsGroupReserved';

	export let group: GuestGroup;
	let loaded = false;

	onMount(async () => {
		const res = await fetchPost('guestsSameGroup', { groupId: group.id });
		$guestsForGroup = res.guests;
		loaded = true;
	});

	const toastError: ToastSettings = {
		message: 'Invitato non inserito in gruppo',
		background: 'variant-filled-error',
		timeout: 3000
	};
	const toastSuccess: ToastSettings = {
		message: 'Invitato inserito in gruppo',
		background: 'variant-filled-success',
		timeout: 3000
	};

	const onClickGuest = async (g: Guest) => {
		const { ok, data } = await fetchPost('updateGuestInGroup', {
			guestId: g.id,
			groupId: group.id
		});
		$guestsForGroup.push((data as Guest[])[0]);
		const toastSettings = ok ? toastSuccess : toastError;
		showTable = true;
		toastStore.trigger(toastSettings);
	};

	const guestsPerPage: number = 5;
	$: page = {
		offset: 0,
		limit: guestsPerPage,
		size: $guestsForGroup.length,
		amounts: []
	};

	const onClick = () => {
		showTable = false;
	};
	let showTable = true;
</script>

<div
	class="p-5 pt-3 border border-black
rounded-xl hover:bg-slate-100 bg-white"
>
	<h1 class="mb-4">Gruppo {group.name}</h1>
	<div class="relative min-h-[380px] min-w-[300px]">
		{#if showTable}
			<GuestTable {loaded} limit={page.limit} offset={page.offset} />
			<div class="absolute bottom-0 right-0">
				<Paginator bind:settings={page} showPreviousNextButtons={true} separatorText={'di'} />
			</div>
			<div class="absolute bottom-0 left-0">
				<button class="btn btn-sm variant-filled" on:click={onClick}>Aggiungi invitato</button>
			</div>
		{:else}
			<div class="max-w-xs md:max-w-2xl mx-auto">
				<SearchGuests {onClickGuest} />
			</div>
		{/if}
	</div>
</div>
