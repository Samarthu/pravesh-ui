import { writable } from "svelte/store";
export const workorderitems = writable({
    vendor : null,
    supplier_id:null,
    rates:[],
});
