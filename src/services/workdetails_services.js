import {request} from './interceptor';
import {get_facility_type_link} from '../stores/facility_store';

let get_scope_api_url = '/api/method/pravesh.facility.routes.scope.get_scope';
let get_facility_type_api_url = null;
let get_vendor_facility_by_config_api_url = '/api/method/pravesh.facility.routes.facility.get_vendor_facility_by_config';
let get_vendor_by_config_url = '/api/method/pravesh.facility.routes.facility.get_vendor_facility_by_config';
let get_pravesh_properties_url = '/api/method/pravesh.facility.routes.facility.get_pravesh_properties';

get_facility_type_link.subscribe(value => {
    get_facility_type_api_url = value;
    
});
let get_pravesh_properties_data ={"property_name":"bank_rejection_reasons,secon_base_url,bank_section_required_associates,offer_letter_required_associates,offer_letter_not_required_tags,pan_required_tags,adhoc_facility_tag,mapping_blocked_org,pan_required_associates,only_admin_child_update,id_proof_rejection_reasons,document_types,org_name_validation_orgs,external_verification_visible"};

const get_user_scope_function = () =>{
   return request(get_scope_api_url,{mode: 'no-cors',method:"GET"},true,false)
}
const get_facility_types_function = () =>{
    return request(get_facility_type_api_url,{mode: 'no-cors',method:"GET"},true,false)
}
const get_vendor_facility_by_config_function =() =>{
    return request(get_vendor_facility_by_config_api_url,{mode: 'no-cors',method:"GET"},true,false)
}
const get_vendor_by_config_method =() =>{
    return request(get_vendor_by_config_url,{mode: 'no-cors',method:"GET"},true,false)
}
const get_pravesh_properties_method =() =>{
    return request(get_pravesh_properties_url,{
        method: "POST",
        
        
    body : JSON.stringify(get_pravesh_properties_data)},true,false)
    
}

export{
    get_user_scope_function,
    get_facility_types_function,
    get_vendor_facility_by_config_function,
    get_vendor_by_config_method,
    get_pravesh_properties_method
}