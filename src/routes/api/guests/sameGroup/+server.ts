import { getSameGroupGuests } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { groupId, guestId } = await request.json();
	const guests = await getSameGroupGuests(groupId, guestId);
	return json({ guests });
};
