import {verify_contact_number_api_link,verify_contact_number_otp_api_link} from '../stores/facility_store';
import {request} from './interceptor';
import {facility_data_store} from '../stores/facility_store';

let verify_mobile_number_api_link ;
let verify_otp_link;
let send_otp_url_link = '/api/method/pravesh.facility.routes.otp.generate_otp';
let mobile_no ;
facility_data_store.subscribe(value =>{
    mobile_no = value.phone_number
}
);

verify_contact_number_otp_api_link.subscribe(value =>{
    verify_otp_link = value;
})

let send_otp_data = {
    mobile_no: null,
otp_length: null,
send_sms: null
}
verify_contact_number_api_link.subscribe(value => {
    verify_mobile_number_api_link = value;
    
});


const  verify_mobile_number_function= () => {
    return request(verify_mobile_number_api_link,{mode: 'no-cors',method:"GET"},true,false,"GET")
}
 const send_mobile_number_otp = () =>{
     send_otp_data.mobile_no = mobile_no;
     send_otp_data.otp_length = 6;
     send_otp_data.send_sms = "&sendSMS=yes"
     if(send_otp_data.mobile_no != null && send_otp_data.otp_length != null && send_otp_data.send_sms != null){
        return request(send_otp_url_link,{method:"POST",body : JSON.stringify(send_otp_data)},true,false)
     }
     
}

const verify_mobile_number_otp =(otp) =>{
    let link = verify_otp_link + otp;
    return request(link,{mode: 'no-cors',method:"GET"},true,false,"GET")

    
}




export{
    verify_mobile_number_function,
    send_mobile_number_otp,
    verify_mobile_number_otp

}