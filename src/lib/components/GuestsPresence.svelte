<script lang="ts">
	import type { GuestAttendance } from '$lib/db/db';
	import { getAttendance } from '$lib/utils/guests';
	import { ProgressRadial, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import GuestsTable from './GuestsTable.svelte';

	export let guestsPromise: Promise<GuestAttendance[]>;
	let attendance = 0;
</script>

{#await guestsPromise}
	<div class="flex items-center justify-center">
		<ProgressRadial width={'w-12 md:w-20'} />
	</div>
{:then guests}
	<RadioGroup>
		{#each [0, 1, 2] as attendanceItem}
			<RadioItem
				bind:group={attendance}
				name="attendance"
				padding="py-2 px-2"
				value={attendanceItem}
				active={'variant-filled'}>{getAttendance(attendanceItem)}</RadioItem
			>
		{/each}
	</RadioGroup>
	<div class="mt-5">
		<GuestsTable {guests} {attendance} />
	</div>
{/await}
