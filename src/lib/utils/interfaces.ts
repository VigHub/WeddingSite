export interface CarouselImage {
	src: string;
	title?: string;
	text?: string;
}

export interface GuestGroup {
	id: number;
	name: string;
}

export enum InviteType {
	ALL_DAY = "ALL_DAY",
	CAKE = "CAKE"
}
export interface Guest {
	id: number;
	name: string;
	surname: string;
	attendance: number;
	groupId?: number;
	inviteType?: InviteType
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

export interface Contact {
	name: string;
	number: string;
	description?: string;
	image: string;
}