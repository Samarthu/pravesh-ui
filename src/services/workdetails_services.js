import {request} from './interceptor';
import {get_facility_type_link} from '../stores/station_store';

let get_scope_api_url = '/api/method/pravesh.facility.routes.scope.get_scope';
let get_facility_type_api_url = null;
let get_vendor_facility_by_config_api_url = '/api/method/pravesh.facility.routes.facility.get_vendor_facility_by_config';

get_facility_type_link.subscribe(value => {
    get_facility_type_api_url = value;
    
});

const get_user_scope_function = () =>{
   return request(get_scope_api_url,{mode: 'no-cors',method:"GET"},true,false)
}
const get_facility_types_function = () =>{
    return request(get_facility_type_api_url,{mode: 'no-cors',method:"GET"},true,false)
}
const get_vendor_facility_by_config_function =() =>{
    return request(get_vendor_facility_by_config_api_url,{mode: 'no-cors',method:"GET"},true,false)
}

export{
    get_user_scope_function,
    get_facility_types_function,
    get_vendor_facility_by_config_function
}