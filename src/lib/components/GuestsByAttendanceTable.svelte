<script lang="ts">
	import { InviteType, type Guest } from '$lib/utils/interfaces';
	import {
		Paginator,
		Table,
		tableMapperValues,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';

	export let guests: Guest[];
	export let attendance: number;
	interface GuestSimpliefied {
		name: string;
		surname: string;
		groupId?: number;
		inviteType?: InviteType;
	}

	let indexOrder = 0;
	// groupId, Alphabetical, ALL DAY, CAKE
	let orderList = ['^', 'A-Z', 'D', 'C'];

	const guestsByAttendance = [0, 1, 2].map((att) => {
		return guests
			.filter((g) => g.attendance === att)
			.map((g) => {
				return {
					name: g.name,
					surname: g.surname,
					groupId: g.groupId,
					inviteType: g.inviteType
				} as GuestSimpliefied;
			});
	});
	const sortByGroupId = (a: GuestSimpliefied, b: GuestSimpliefied) => {
		if (a.groupId && !b.groupId) return -1;
		if (!a.groupId && b.groupId) return 1;
		if (a.groupId && b.groupId) {
			if (a.groupId === b.groupId) {
				if (a.surname === b.surname) return a.name.localeCompare(b.name);
				return a.surname.localeCompare(b.surname);
			}
			return a.groupId - b.groupId;
		}
		if (a.surname === b.surname) return a.name.localeCompare(b.name);
		return a.surname.localeCompare(b.surname);
	};
	const filterGuestByInviteType = (guest: GuestSimpliefied, idxOrder: number) => {
		return (
			idxOrder === 0 ||
			idxOrder === 1 ||
			(guest.inviteType === InviteType.ALL_DAY && idxOrder === 2) ||
			(guest.inviteType === InviteType.CAKE && idxOrder === 3)
		);
	};

	$: guestsByAttendanceSorted = guestsByAttendance.map((guestsList) =>
		guestsList
			.filter((g) => filterGuestByInviteType(g, indexOrder))
			.sort((a: GuestSimpliefied, b: GuestSimpliefied) => {
				if (indexOrder == 0) {
					return sortByGroupId(a, b);
				}
				if (a.surname === b.surname) return a.name.localeCompare(b.name);
				return a.surname.localeCompare(b.surname);
			})
	);

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

	const filterPageSettings = (page: PaginationSettings, attd: number, idxOrder: number) => {
		page.size = guestsByAttendance[attd].filter((g) => filterGuestByInviteType(g, idxOrder)).length;
		return page;
	};

	$: pageArray = [
		filterPageSettings(page1, attendance, indexOrder),
		filterPageSettings(page2, attendance, indexOrder),
		filterPageSettings(page3, attendance, indexOrder)
	];
	$: source = {
		head: [$_('general.name'), $_('general.surname'), $_('general.invite')],
		body: tableMapperValues(
			guestsByAttendanceSorted[attendance].slice(
				pageArray[attendance].offset * pageArray[attendance].limit,
				(pageArray[attendance].offset + 1) * pageArray[attendance].limit
			),
			['name', 'surname', 'inviteType']
		)
	};
</script>

<div class="relative min-h-[380px]">
	<Table {source} regionBody="bg-gray-50" regionHeadCell="bg-surface-200" interactive={true} />
	<div class="absolute bottom-0 left-0">
		<button
			class="btn btn-sm variant-filled"
			on:click={() => {
				indexOrder = (indexOrder + 1) % orderList.length;
			}}>{orderList[indexOrder]}</button
		>
	</div>
	<div class="absolute bottom-0 right-0">
		<Paginator
			bind:settings={pageArray[attendance]}
			showPreviousNextButtons={true}
			separatorText={$_('general.of')}
			showFirstLastButtons
		/>
	</div>
</div>
