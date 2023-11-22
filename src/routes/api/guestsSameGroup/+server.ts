import { getSameGroupGuests } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { guest } = await request.json();
	const guests = await getSameGroupGuests(guest);
	return json({ guests });
};
