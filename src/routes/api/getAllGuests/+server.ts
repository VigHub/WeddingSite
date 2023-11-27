import { getAllGuests } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	const guests = await getAllGuests();
	return json({ guests });
};
