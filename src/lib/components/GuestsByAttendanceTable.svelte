<script lang="ts">
	import type { Guest } from '$lib/utils/interfaces';
	import {
		Paginator,
		Table,
		tableMapperValues,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';

	export let guests: Guest[];
	export let attendance: number;

	const guestsByAttendance = [0, 1, 2].map((att) => {
		return guests
			.filter((g) => g.attendance === att)
			.map((g) => {
				return { name: g.name, surname: g.surname };
			});
	});
	const messagesPerPage = 5;
	let page1: PaginationSettings = {
		offset: 0,
		limit: messagesPerPage,
		size: guestsByAttendance[0].length,
		amounts: []
	};
	let page2: PaginationSettings = {
		offset: 0,
		limit: messagesPerPage,
		size: guestsByAttendance[1].length,
		amounts: []
	};
	let page3: PaginationSettings = {
		offset: 0,
		limit: messagesPerPage,
		size: guestsByAttendance[2].length,
		amounts: []
	};
	$: pageArray = [page1, page2, page3];
	$: source = {
		head: ['Nome', 'Cognome'],
		body: tableMapperValues(
			guestsByAttendance[attendance].slice(
				pageArray[attendance].offset * pageArray[attendance].limit,
				(pageArray[attendance].offset + 1) * pageArray[attendance].limit
			),
			['name', 'surname']
		)
	};
</script>

<div class="relative min-h-[380px]">
	<Table {source} regionBody="bg-gray-50" regionHeadCell="bg-surface-200" interactive={true} />
	<div class="absolute bottom-0 right-0">
		<Paginator
			bind:settings={pageArray[attendance]}
			showPreviousNextButtons={true}
			separatorText={'di'}
		/>
	</div>
</div>
