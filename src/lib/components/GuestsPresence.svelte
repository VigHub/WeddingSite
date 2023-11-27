<script lang="ts">
	import { getAttendance } from '$lib/utils/guests';
	import { ProgressRadial, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import type { Guest } from '$lib/utils/interfaces';
	import GuestsByAttendanceTable from './GuestsByAttendanceTable.svelte';
	import { onMount } from 'svelte';
	import { fetchPost } from '$lib/utils/api';

	let guests: Guest[] = [];
	let loading = true;
	let attendance = 0;

	onMount(async () => {
		const res = await fetchPost('guests/all');
		guests = res.guests;
		loading = false;
	});
</script>

{#if loading}
	<div class="flex items-center justify-center min-h-[400px]">
		<ProgressRadial width={'w-12 md:w-20'} />
	</div>
{:else}
	<RadioGroup background="bg-white">
		{#each [0, 1, 2] as attendanceItem}
			<RadioItem
				bind:group={attendance}
				name="attendance"
				padding="py-2 px-2"
				value={attendanceItem}
				active={'variant-filled'}>{$_(getAttendance(attendanceItem))}</RadioItem
			>
		{/each}
	</RadioGroup>
	<div class="mt-5">
		<GuestsByAttendanceTable {guests} {attendance} />
	</div>
{/if}
