import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const { hashed } = await request.json();
	return json({
		authenticated: hashed === env.HASH_RESERVED
	});
};
