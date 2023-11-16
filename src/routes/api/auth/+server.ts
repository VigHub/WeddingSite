import { json, type RequestHandler } from '@sveltejs/kit';
import { HASH_RESERVED } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { hashed } = await request.json();
	return json({
		authenticated: hashed === HASH_RESERVED
	});
};
