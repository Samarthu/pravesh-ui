import { writable, derived } from 'svelte/store';

//This store is used to compare the values of facility data in Edit mode.

export var facility_data_store = writable({
        address:"",
        user_type: "FieldAuditor",
        dob:null,
        station_code:null,
        er_network_facility:true,
        owner_name:null,
        status:"Onboarding in Progress",
        phone_number:null,
        facility_id:null,
        store_id:null,
        facility_name:null,
        org_id:null,
        node_type:"Distributor",
        facility_type:null,
        store_name:null,
        vendor_code:null,
        vendor_name:null,
        non_msme_confirmed_by:null,
        non_msme_confirmed_on:null,
        msme_registered:null,        
        facility_email:null,
});