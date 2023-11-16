import { base } from '$app/paths';

export const fetchPost = async (url: string, body?: any) => {
	const response = await fetch(`${base}/api/${url}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(body) ?? undefined
	});
	const res = await response.json();
	return res;
};
