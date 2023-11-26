import { getGuestsbyNameSurname } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { name, surname, withOutGrop } = await request.json();
	const guests = await getGuestsbyNameSurname(name, surname, withOutGrop);
	return json({ guests });
};
