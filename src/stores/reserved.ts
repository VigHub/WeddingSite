import { writable } from 'svelte/store';

const canAccessReservedArea = writable(false);

export default canAccessReservedArea;
