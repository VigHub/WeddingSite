import { getAllGroups, getAllGuestMessages, getAllGuests } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	const guestMessages = await getAllGuestMessages();
	const guests = await getAllGuests();
	const groups = await getAllGroups();
	return json({ guestMessages, guests, groups });
};
