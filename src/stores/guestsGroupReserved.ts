import type { Guest, GuestGroup } from '$lib/utils/interfaces';
import { writable, type Writable } from 'svelte/store';

export const guestsForGroup: Writable<Guest[]> = writable([]);
export const groups: Writable<GuestGroup[]> = writable([]);
