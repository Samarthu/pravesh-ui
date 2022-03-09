import { writable,derived } from 'svelte/store';
// import {current_user} from './current_user_store';
// let user_id_value;
// current_user.subscribe(value => {
//     user_id_value = value.email;
// })

export const msme_store = writable( {
    
    doc_category: "MSME Certificate",
    doc_number: "",
    doc_type: "msme-certi",
    file_name: null,
    pod: null,
    resource_id: null,
    status: "created",
    user_id: null
       
    });

export const documents_store = writable({
    documents:[]
});