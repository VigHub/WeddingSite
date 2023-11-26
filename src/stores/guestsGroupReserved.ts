import type { Guest } from '$lib/utils/interfaces';
import { writable, type Writable } from 'svelte/store';

const guestsForGroup: Writable<Guest[]> = writable([]);

export default guestsForGroup;
