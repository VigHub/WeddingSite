import { getAllGuestMessages, getAllGuests, getSizeGuestMessages } from '$lib/db/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const guestMessages = getAllGuestMessages();
	const guests = getAllGuests();
	const size = await getSizeGuestMessages();
	return { data: { guestMessages, guests }, size };
};
