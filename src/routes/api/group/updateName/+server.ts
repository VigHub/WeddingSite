import { updateGroup } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { id, name } = await request.json();
    const ok = await updateGroup(id, name);
    return json({ ok });
};
