import { writable } from 'svelte/store';



export const bank_data_to_store = writable({
//     // dashboard_details:null
//         id_proof_rejected : 0,

    bank_details_data : null
    // modified:null,
    // modified_by:null
})
export const cheque_data_to_store = writable({
    cheque_details_data:null
})
