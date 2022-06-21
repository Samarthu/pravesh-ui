import {request} from './interceptor';
import {bank_details,verify_ifsc_code_api_url} from '../stores/bank_details_store';
import { sorting_facility_details_for_edit ,sort_document_data,sorting_bank_details_for_edit} from "../services/pravesh_config";


let ifsc_verify_api_url ;
let save_bank_details_api_url = '/api/method/pravesh.facility.routes.bank.save_bank';



 const verify_ifsc_code_function = () => {
    verify_ifsc_code_api_url.subscribe(value => {
        ifsc_verify_api_url = value;
    })
    // return fetch("https://elasticrun.in/ifscapi/KARB0000001")
    
    // let ifsc_code;
    // bank_details.subscribe(value => {
    //     ifsc_code = value.ifsc_code;
    // })
    // ifsc_verify_api_url = "/api/method/pravesh.facility.routes.org_station_config.temp_ifsc?ifsc_code="+ifsc_code;
    
    

    // return request(ifsc_verify_api_url,{mode: 'no-cors'},true,false,"GET")
    // return fetch(ifsc_verify_api_url)
    // return await fetch("https://elasticrun.in/ifscapi/KARB0000001")
    return request("https://elasticrun.in/ifscapi/KARB0000001",{mode: 'no-cors'},true,false,"GET")
    
}
const save_bank_details_function = () =>{
    let save_bank_data;
    bank_details.subscribe(value => {
        save_bank_data = value;
    })
    let sorted_data = sorting_bank_details_for_edit(save_bank_data)
    return request(save_bank_details_api_url,{method:"POST",body : JSON.stringify(sorted_data)},true,false)
}

export{
    verify_ifsc_code_function,
    save_bank_details_function

}
