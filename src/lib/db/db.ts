import { createClient } from '@supabase/supabase-js';

import { PUBLIC_SUPABASE_PROJECT_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
export interface Guest {
	id: number;
	name: string;
	surname: string;
	confirmation: number;
}

export interface GuestMessage {
	guest_id: number;
	message: string;
	mail: string;
	confirmation?: number;
}

export const getGuestsbyNameSurname = async (name: string, surname: string) => {
	const { data } = await supabase
		.from('Guest')
		.select()
		.ilike('name', `${name}%`)
		.ilike('surname', `${surname}%`);
	const guests: Guest[] = data ?? [];
	return guests;
};

export const getAllGuests = async () => {
	const { data } = await supabase.from('Guest').select();
	const guests: Guest[] = data ?? [];
	return guests;
};

export const insertGuestMessage = async (guestMessage: GuestMessage) => {
	const { status } = await supabase.from('GuestMessage').insert(guestMessage);
	return status === 201;
};
