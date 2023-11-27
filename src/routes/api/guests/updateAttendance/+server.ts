import { updateGuestAttendance } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { id, attendance } = await request.json();
	const ok = await updateGuestAttendance(id, attendance);
	return json({ ok });
};
