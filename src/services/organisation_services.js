import {request} from './interceptor';
import {get_organization_link} from '../stores/verticle_store';
let get_org_ui_api = '/api/method/pravesh.facility.routes.org_station_config.get_pravesh_UI_properties';



let get_org_api;

get_organization_link.subscribe(value => {
    get_org_api = value;
    
});

let organisation_ui_data ={
    property_name : 'organisation_properties'
};


const get_organistaion_method = () => {
    return request(get_org_api,{mode: 'no-cors'},true,false,"GET")
}
const get_organisation_ui_fun = () => {
    return request(get_org_ui_api,{
    method: "POST",
    
    
body : JSON.stringify(organisation_ui_data)},true,false)
}
export{
    get_organistaion_method,
    get_organisation_ui_fun
}