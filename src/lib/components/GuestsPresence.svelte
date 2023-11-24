<script lang="ts">
	import { getAttendance } from '$lib/utils/guests';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import type { Guest } from '$lib/utils/interfaces';
	import GuestsByAttendanceTable from './GuestsByAttendanceTable.svelte';

	export let guests: Guest[];
	let attendance = 0;
</script>

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
