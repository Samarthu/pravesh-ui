import {request} from './interceptor';
import {bank_details,verify_ifsc_code_api_url} from '../stores/bank_details_store';

let ifsc_verify_api_url ;



const verify_ifsc_code_function = () => {
    verify_ifsc_code_api_url.subscribe(value => {
        ifsc_verify_api_url = value;
    })
    // let ifsc_code;
    // bank_details.subscribe(value => {
    //     ifsc_code = value.ifsc_code;
    // })
    // ifsc_verify_api_url = "/api/method/pravesh.facility.routes.org_station_config.temp_ifsc?ifsc_code="+ifsc_code;
    
    

    return request(ifsc_verify_api_url,{mode: 'no-cors'},true,false,"GET")
    // return fetch(ifsc_verify_api_url)
}

export{
    verify_ifsc_code_function

}
