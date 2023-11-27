import { updateGuestInGroup } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { guestId, groupId } = await request.json();
    const { status, data } = await updateGuestInGroup(guestId, groupId);
    return json({ ok: status, data });
};
