import { writable,derived } from 'svelte/store';

export const facility_id = writable({
    facility_id_number : null
    
});

export const BGV_api_link = derived(facility_id,
    $facility_id => '/api/resource/Facility%20BGV?filters=[[%22facility_id%22,%22=%22,%22'+$facility_id.facility_id_number+'%22]]&fields=[%22*%22]');

export const reset_contract_api_link = derived(facility_id,
    $facility_id => '/api/method/pravesh.facility.routes.contract.reset_contract?fac_id='+$facility_id.facility_id_number);




