import { createClient } from '@supabase/supabase-js';

import { PUBLIC_SUPABASE_PROJECT_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const GuestTable = 'Guest';
const GuestMessageTable = 'GuestMessage';

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

interface GuestMessageWithGuest {
	message: string;
	created: Date;
	guest: Guest;
}

export const getGuestsbyNameSurname = async (name: string, surname: string) => {
	const { data } = await supabase
		.from(GuestTable)
		.select()
		.ilike('name', `${name}%`)
		.ilike('surname', `${surname}%`);
	const guests: Guest[] = data ?? [];
	return guests;
};

export const getAllGuests = async () => {
	const { data } = await supabase.from(GuestTable).select();
	const guests: Guest[] = data ?? [];
	return guests;
};

export const insertGuestMessage = async (guestMessage: GuestMessage) => {
	const { status } = await supabase.from(GuestMessageTable).insert(guestMessage);
	return status === 201;
};

export const getAllGuestMessages = async () => {
	const { data } = await supabase.from(GuestMessageTable)
		.select('message, created:created_at, guest:Guest (id, name, surname)').returns<GuestMessageWithGuest[]>();
	const guestMessages = data ?? [];
	return guestMessages;
}