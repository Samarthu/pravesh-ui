import {request} from './interceptor';
import {facility_data_store,check_bgv_config_api_link} from '../stores/facility_store';
import {BGV_api_link} from '../stores/facility_id_store';
let facility_data;
facility_data_store.subscribe(value => {
    facility_data = value;
});


let verify_document_api_url = '/api/method/pravesh.facility.routes.document.validate_facility_document?doc_number=';
let save_facility_api_url = '/api/method/pravesh.facility.routes.facility.save_facility';
let check_bgv_config_api_url ;
let BGV_api_url ;
check_bgv_config_api_link.subscribe(value => {
    check_bgv_config_api_url = value;
})
BGV_api_link.subscribe(value => {
    BGV_api_url = value;
})

const verify_document_function = (document_number) => {
    let link = verify_document_api_url + document_number;
    return request(link,{mode: 'no-cors'},true,false,"GET")
}
const save_facility_function = () =>{
    // console.log("facility data",facility_data);
    return request(save_facility_api_url,{
        method: "POST",
        body:JSON.stringify(facility_data)
        
    },true)
}
const check_bgv_config_function = () =>{
    // console.log(check_bgv_config_api_url);
    return request(check_bgv_config_api_url,{mode: 'no-cors',method:"GET"},true)
    
}
const BGV_function = () =>{
    return request(BGV_api_url,{mode: 'no-cors',method:"GET"},true)
    
}


export{
    verify_document_function,
    save_facility_function,
    check_bgv_config_function,
    BGV_function

}