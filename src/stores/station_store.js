import { writable, derived } from 'svelte/store';
import {org_name} from './organisation_store';
import {category_store_name} from './category_store';
import {vercticle_name} from './verticle_store';

export const station_type_name = writable({
    station_name : null});

export const get_facility_type_link = derived([org_name,category_store_name,station_type_name],($values,set) =>{
    set('/api/method/pravesh.facility.routes.facility_type_master.get_facility_types?org_id='+$values[0].org_id+'&category='+$values[1].category_name+'&station='+$values[2].station_name);
});

