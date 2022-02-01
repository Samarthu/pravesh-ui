import {request} from './interceptor';

let get_category_api_url ='/api/method/pravesh.facility.routes.facility_type_master.get_categories';
let get_category_ui_properties_api_url ='/api/method/pravesh.facility.routes.org_station_config.get_pravesh_UI_properties';

let category_ui_data ={
    property_name : 'category_ui_properties'
};

const get_categories_list = () =>{
    return request(get_category_api_url,{mode: 'no-cors',method:"GET"},true,false)
}

const get_category_ui_properties = () =>{
    return request(get_category_ui_properties_api_url,{method:"POST",body : JSON.stringify(category_ui_data)},true,false)
}

export{
    get_categories_list,
    get_category_ui_properties
}