<script lang="ts">
	import { fetchPost } from '$lib/utils/api';
	import type { Guest, GuestGroup } from '$lib/utils/interfaces';
	import { onMount } from 'svelte';
	import GuestTable from '../GuestTable.svelte';

	export let group: GuestGroup;
	let guests: Guest[] = [];
	let loaded = false;

	onMount(async () => {
		const res = await fetchPost('guestsSameGroup', { groupId: group.id });
		guests = res.guests;
		loaded = true;
	});
</script>

<div
	class="p-5 pt-3 border border-black
rounded-xl hover:bg-slate-100 bg-white"
>
	<h1 class="mb-4">Gruppo {group.name}</h1>
	<GuestTable {guests} {loaded} />
</div>
