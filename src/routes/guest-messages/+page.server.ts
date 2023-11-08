import { getAllGuestMessages } from '$lib/db/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const guestMessages = await getAllGuestMessages();
    return { guestMessages };
}) satisfies PageServerLoad;
