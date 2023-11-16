import { getGuestsbyNameSurname } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { name, surname } = await request.json();
	const guests = await getGuestsbyNameSurname(name, surname);
	return json({ guests });
};
