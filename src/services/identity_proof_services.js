import {request} from './interceptor';
import {facility_data_store} from '../stores/facility_store';
let facility_data;
facility_data_store.subscribe(value => {
    facility_data = value;
});


let verify_pan_card_api_url = '/api/method/pravesh.facility.routes.document.validate_facility_document?doc_number=';
let save_facility_api_url = '/api/method/pravesh.facility.routes.facility.save_facility';

const verify_pancard_function = (pan_card_number) => {
    let link = verify_pan_card_api_url + pan_card_number;
    return request(link,{mode: 'no-cors'},true,false,"GET")
}
const save_facility_function = () =>{
    // console.log("facility data",facility_data);
    return request(save_facility_api_url,{
        method: "POST",
        body:JSON.stringify(facility_data)
    },true)
}
export{
    verify_pancard_function,
    save_facility_function 

}