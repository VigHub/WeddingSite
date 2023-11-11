<script lang="ts">
	import type { GuestAttendance } from '$lib/db/db';
	import { getAttendance } from '$lib/utils/guests';
	import {
		ListBox,
		ListBoxItem,
		ProgressRadial,
		Table,
		tableMapperValues
	} from '@skeletonlabs/skeleton';
	import GuestsTable from './GuestsTable.svelte';

	export let guestsPromise: Promise<GuestAttendance[]>;
	let attendance = 0;
</script>

{#await guestsPromise}
	<div class="flex items-center justify-center">
		<ProgressRadial width={'w-12 md:w-20'} />
	</div>
{:then guests}
	<ListBox>
		{#each [0, 1, 2] as attendanceItem}
			<ListBoxItem
				bind:group={attendance}
				name="attendance"
				value={attendanceItem}
				active={'variant-filled'}>{getAttendance(attendanceItem)}</ListBoxItem
			>
		{/each}
	</ListBox>
	<div class="mt-5">
		<GuestsTable {guests} {attendance} />
	</div>
{/await}
