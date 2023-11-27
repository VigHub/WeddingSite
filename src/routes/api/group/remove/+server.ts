import { deleteGroup } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { groupId } = await request.json();
    const ok = await deleteGroup(groupId);
    return json({ ok });
};
