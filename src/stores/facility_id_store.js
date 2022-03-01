import { writable,derived } from 'svelte/store';

export const facility_id = writable({
    facility_id_number : null
    
});


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