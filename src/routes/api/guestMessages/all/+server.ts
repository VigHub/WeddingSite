import { getAllGuestMessages } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	const guestMessages = await getAllGuestMessages();
	return json({ guestMessages });
};
