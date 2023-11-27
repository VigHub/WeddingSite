import { deleteGroup } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { id } = await request.json();
    const ok = await deleteGroup(id);
    return json({ ok });
};
