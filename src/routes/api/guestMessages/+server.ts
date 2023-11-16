import { getAllGuestMessages, getAllGuests } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	const guestMessages = await getAllGuestMessages();
	const guests = await getAllGuests();
	return json({ guestMessages, guests });
};
