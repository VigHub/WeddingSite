import { getGuestsbyNameSurname } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { name, surname, withOutGroup } = await request.json();
	const guests = await getGuestsbyNameSurname(name, surname, withOutGroup);
	return json({ guests });
};
