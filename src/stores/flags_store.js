import { writable, derived } from 'svelte/store';


export const save_flag = writable({
    is_save : null
    
});

export const img_url_name = writable({
    img_name : "/pravesh-ui"
    // ../src/img
    
});
