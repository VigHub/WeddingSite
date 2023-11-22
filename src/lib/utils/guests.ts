import type { Guest } from './interfaces';
import { _ } from 'svelte-i18n'

export function searchGuest(
	guests: Guest[],
	name: string,
	surname: string,
	limit: number = 5
) {
	name = name.trim();
	surname = surname.trim();
	if (name === '' && surname === '') return [];
	const guestFiltered = guests.filter((guest) => {
		const guestName = guest.name.toLowerCase().startsWith(name.toLowerCase());
		const guestSurname = guest.surname.toLowerCase().startsWith(surname.toLowerCase());
		return guestName && guestSurname;
	});
	return guestFiltered.slice(0, limit);
}

export const getAttendance = (attendance: number) => {
	switch (attendance) {
		case 0:
			return "attendance.wait";
		case 1:
			return 'attendance.present';
		case 2:
			return 'attendance.deny';
		default:
			return 'attendance.wait';
	}
};
