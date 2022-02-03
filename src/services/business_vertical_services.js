import {request} from './interceptor';


let get_verticles_api_url = '/api/method/pravesh.facility.routes.organisation.get_org_list?org_field=[%22*%22]';
let get_verticles_ui_api_url = '/api/method/pravesh.facility.routes.org_station_config.get_pravesh_UI_properties';

let verticle_ui_data ={
    property_name : 'verticle_ui_settings'
};

const get_verticles_fun = () => {
    return request(get_verticles_api_url,{mode: 'no-cors'},true,false,"GET")
}

const get_verticles_ui_fun = () => {
    return request(get_verticles_ui_api_url,{
    method: "POST",
    
    
body : JSON.stringify(verticle_ui_data)},true,false)
}

export{
    get_verticles_fun,
    get_verticles_ui_fun
}