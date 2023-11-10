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

	export let guestsPromise: Promise<GuestAttendance[]>;
	let attendance = 0;

	const getGuestsGroupByAttendance = (guests: GuestAttendance[], attend: number) => {
		return guests
			.filter((guest) => guest.attendance === attend)
			.map((guest) => {
				return { name: guest.guest.name, surname: guest.guest.surname };
			});
	};
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
		<Table
			source={{
				head: ['Nome', 'Cognome'],
				body: tableMapperValues(getGuestsGroupByAttendance(guests, attendance), ['name', 'surname'])
			}}
		/>
	</div>
{/await}
