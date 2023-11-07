import { getAllGuests } from '$lib/db/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const guests = await getAllGuests();
	return { guests };
}) satisfies PageServerLoad;
