export interface CarouselImage {
	src: string;
	title?: string;
	text?: string;
}

export interface Guest {
	id: number;
	name: string;
	surname: string;
	groupId?: number;
}

export interface GuestAttendance {
	attendance: number;
	guest: Guest;
}

export interface GuestMessage {
	guest_id: number;
	message: string;
	attendance: number;
}

export interface GuestMessageWithGuest {
	message: string;
	attendance: number;
	created: Date;
	guest: Guest;
}
