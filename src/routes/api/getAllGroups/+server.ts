import { getAllGroups } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	const groups = await getAllGroups();
	return json({ groups });
};
