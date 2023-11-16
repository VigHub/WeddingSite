import type { GuestAttendance } from './interfaces';

export function searchGuest(
	guests: GuestAttendance[],
	name: string,
	surname: string,
	limit: number = 5
) {
	name = name.trim();
	surname = surname.trim();
	if (name === '' && surname === '') return [];
	const guestFiltered = guests.filter((guest) => {
		const guestName = guest.guest.name.toLowerCase().startsWith(name.toLowerCase());
		const guestSurname = guest.guest.surname.toLowerCase().startsWith(surname.toLowerCase());
		return guestName && guestSurname;
	});
	return guestFiltered.slice(0, limit);
}

export const getAttendance = (attendance: number) => {
	switch (attendance) {
		case 0:
			return 'In attesa 🤔';
		case 1:
			return 'Ci sono 🥳';
		case 2:
			return 'Non ci sono 😣';
		default:
			return 'In attesa';
	}
};
