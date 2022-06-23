import { writable, derived } from 'svelte/store';

export const current_user = writable({
    username: null,
    name: null,
    email: null


});

export const details_user_info = writable({
    

});