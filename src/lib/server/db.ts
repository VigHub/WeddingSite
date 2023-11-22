import { createClient } from '@supabase/supabase-js';

import { env } from '$env/dynamic/private';
import type { GuestAttendance, GuestMessage, GuestMessageWithGuest } from '$lib/utils/interfaces';

const supabaseUrl = env.SUPABASE_PROJECT_URL;
const supabaseKey = env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const GuestTable = 'Guest';
const GuestMessageTable = 'GuestMessage';
const GuestAttendanceTable = 'GuestAttendance';

export const getGuestsbyNameSurname = async (name: string, surname: string) => {
	if (name === '' && surname === '') return [];
	const { data } = await supabase
		.from(GuestAttendanceTable)
		.select('attendance, guest:Guest!inner(id, name, surname, groupId)')
		.ilike('guest.name', `${name}%`)
		.ilike('guest.surname', `${surname}%`)
		.returns<GuestAttendance[]>();
	const guests = data ?? [];
	return guests;
};

export const getAllGuests = async () => {
	const { data } = await supabase
		.from(GuestAttendanceTable)
		.select('attendance, guest:Guest (id, name, surname, groupId)')
		.returns<GuestAttendance[]>();
	const guests = data ?? [];
	return guests;
};

export const getSameGroupGuests = async (guest: GuestAttendance) => {
	const { data } = await supabase
		.from(GuestAttendanceTable)
		.select('attendance, guest:Guest (id, name, surname, groupId)')
		.filter('guest.groupId', 'eq', guest.guest.groupId)
		.filter('guest.id', 'neq', guest.guest.id)
		.returns<GuestAttendance[]>();
	const guests = data ?? [];
	console.log(guests);
	return guests;
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
	const guestAttendance = { guest_id, attendance };
	const { status } = await supabase
		.from(GuestAttendanceTable)
		.update(guestAttendance)
		.eq('guest_id', guest_id);
	return status === 201 || status === 204;
};
