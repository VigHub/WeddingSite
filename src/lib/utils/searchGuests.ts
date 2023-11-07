export interface GuestFile {
	guests: Guest[];
}

export interface Guest {
	id: number;
	name: string;
	surname: string;
	confirmation: number;
}

export function searchGuest(guests: Guest[], name: string, surname: string, limit: number = 5) {
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
