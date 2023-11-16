import { insertGuestMessage } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { guestMessage } = await request.json();
	const ok = await insertGuestMessage(guestMessage);
	return json({ ok });
};
