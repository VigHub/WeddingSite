import { addGroup } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { groupName } = await request.json();
	const ok = await addGroup(groupName);
	return json({ ok });
};
