import { writable, derived } from 'svelte/store';

export const current_user = writable({
    username: null,
    name: null,
    email: null


});