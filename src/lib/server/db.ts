import { createClient } from '@supabase/supabase-js';

import { env } from '$env/dynamic/private';
import type { GuestGroup, Guest, GuestMessage, GuestMessageWithGuest } from '$lib/utils/interfaces';

const supabaseUrl = env.SUPABASE_PROJECT_URL;
const supabaseKey = env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const GuestTable = 'Guest';
const GuestMessageTable = 'GuestMessage';
const GuestGroupTable = 'GuestGroup';

export const getGuestsbyNameSurname = async (name: string, surname: string) => {
	if (name === '' && surname === '') return [];
	const { data } = await supabase
		.from(GuestTable)
		.select('attendance, id, name, surname, groupId')
		.ilike('name', `${name}%`)
		.ilike('surname', `${surname}%`)
		.order('surname')
		.order('name')
		.limit(5)
		.returns<Guest[]>();
	const guests = data ?? [];
	return guests;
};

export const getAllGuests = async () => {
	const { data } = await supabase
		.from(GuestTable)
		.select('attendance, id, name, surname, groupId')
		.returns<Guest[]>();
	const guests = data ?? [];
	return guests;
};

export const getSameGroupGuests = async (groupId: number, guestIdRemove?: number) => {
	let query = supabase
		.from(GuestTable)
		.select('attendance, id, name, surname, groupId')
		.eq('groupId', groupId);
	if (guestIdRemove) query = query.neq('id', guestIdRemove);
	const { data } = await query.returns<Guest[]>();
	const guests = data ?? [];
	return guests;
};

export const getAllGroups = async () => {
	const { data } = await supabase.from(GuestGroupTable).select().returns<GuestGroup[]>();
	return data ?? [];
};

export const insertGuestMessage = async (guestMessage: GuestMessage) => {
	const { status } = await supabase.from(GuestMessageTable).insert(guestMessage);
	return status === 201;
};

export const getAllGuestMessages = async () => {
	const { data } = await supabase
		.from(GuestMessageTable)
		.select('message, attendance, created:created_at, guest:Guest (id, name, surname)')
		.order('created_at', { ascending: false })
		.returns<GuestMessageWithGuest[]>();
	const guestMessages = data ?? [];
	return guestMessages;
};

export const getSizeGuestMessages = async () => {
	const { status, count } = await supabase
		.from(GuestMessageTable)
		.select('*', { count: 'exact', head: true });
	return status === 200 ? count : 0;
};

export const updateGuestAttendance = async (guest_id: number, attendance: number) => {
	const { status } = await supabase.from(GuestTable).update({ attendance }).eq('id', guest_id);
	return status === 201 || status === 204;
};
