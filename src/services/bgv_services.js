import {request} from './interceptor';
import {bank_data_to_store} from '../stores/onboardsummary_store'
import {facility_id} from '../stores/facility_id_store';
import {facility_data} from '../services/onboardsummary_services';

let new_facility_id
facility_id.subscribe(value => {
   new_facility_id = value.facility_id_number;
});
    
const get_states = () =>{
    let get_states_url = '/api/method/pravesh.facility.routes.organisation.get_states?_=1647243494831'
    return request(
        get_states_url, {
        method: "GET",
        }, true)
}
const get_cities = (state_name) => {
    let get_cities_url = '/api/resource/ER%20Location?fields=["location_id","location_name"]&filters=[["location_state","=","'+state_name+'"]]'
    return request(
        get_cities_url, {
        method: "GET",
        }, true)
}
const get_all_docs = () =>{
    let get_docs_url = '/api/method/pravesh.facility.routes.document.get_all_facility_documents?facility_id='+new_facility_id+'&_=1647953903266'
    return request(
        get_docs_url, {
        method: "GET",
        }, true)
}


////////////////////////////////////////////////////////////////
const submit_basic_details =(basic_sub_data) =>{
    let submit_basic_details_url = '/api/method/pravesh.facility.routes.facility_background_verification.update_details';
    let basic_data = {
        action_type: "Updated",
        first_name: basic_sub_data.fir_name,
        adhar_card_number: basic_sub_data.aadhar_num,
        basic_info_dob: basic_sub_data.dob,
        basic_info_supp_file: "",
        delivery_model: basic_sub_data.delivery_model,
        email_id: basic_sub_data.email,
        facility_id: new_facility_id,
        father_name: basic_sub_data.father_name,
        field_type: "basicInfo",
        gender: basic_sub_data.gend,
        hub_name: basic_sub_data.hub_name,
        last_name: basic_sub_data.last_name,
        pass_photo: "",
        phone_number: basic_sub_data.phone,
        rejReason: "-1",
        spouse_name: basic_sub_data.spouse,
        station_model: basic_sub_data.station_mod,
    }
    return request(
        submit_basic_details_url, 
        {  method: "POST",
            body:JSON.stringify(basic_data),              
        },true)
}
const submit_address_details =(addr_data) =>{
    let submit_address_details_url = '/api/method/pravesh.facility.routes.facility_background_verification.update_details';

    let add_data = {
        action_type: "Updated",
        address_info_supp_file: "",
        address_type: "Permanent",
        area: "AREA",
        city: addr_data.city,
        contact_number: addr_data.contact_number,
        current_address_is_same: addr_data.curr_same,
        district: addr_data.district,
        facility_id: new_facility_id,
        field_type: "addressInfo",
        full_address: addr_data.full_address,
        landmark: addr_data.landmark,
        period_of_stay: addr_data.period_of_stay,
        pin_code: addr_data.pin_code,
        rejReason: "-1",
        residence_type: addr_data.residence_type,
        state: addr_data.state,
        stay_from: addr_data.stay_from,
        stay_till: addr_data.stay_till
        }
    return request(
        submit_address_details_url, 
        {  method: "POST",
            body:JSON.stringify(add_data),              
        },true)
}
const submit_pancard_details =(pan_data) =>{
    let submit_pancard_details_url = '/api/method/pravesh.facility.routes.facility_background_verification.update_details';

    let pancard_data = {
        action_type: "Updated",
        facility_id: new_facility_id,
        field_type: "panInfo",
        pan_dob: pan_data.pan_dob,
        pan_father_name: pan_data.pan_father_name,
        pan_full_name: pan_data.pan_full_name,
        pan_info_supp_file: "",
        pancard_number: pan_data.pancard_number,
        rejReason: "-1"
    }

    return request(
        submit_pancard_details_url, 
        {  method: "POST",
            body:JSON.stringify(pancard_data),              
        },true)
}
const submit_dl_details =(dl_data) =>{
    let submit_dl_details_url = '/api/method/pravesh.facility.routes.facility_background_verification.update_details';

    let license_data = {
        action_type: "Updated",
        dl_dob: dl_data.dl_dob,
        dl_expiry_date: dl_data.dl_expiry_date,
        dl_info_supp_file: "",
        dl_issue_date: dl_data.dl_issue_date,
        dl_state: dl_data.dl_state,
        facility_id: new_facility_id,
        field_type: "dlInfo",
        license_number: dl_data.license_number,
        name_license: dl_data.name_license,
        rejReason: "-1"
        
    }
    return request(
        submit_dl_details_url, 
        {  method: "POST",
            body:JSON.stringify(license_data),              
        },true)
}
const submit_police_details =(police_data) =>{
    let submit_police_details_url = '/api/method/pravesh.facility.routes.facility_background_verification.update_details';

    let pol_data = {
        action_type: "Updated",
        candidate_name: police_data.candidate_name,
        facility_id: new_facility_id,
        field_type: "policeInfo",
        guardian_name: police_data.guardian_name,
        police_address_type: police_data.police_address_type,
        police_info_supp_file: "",
        police_verified_address: police_data.police_verified_address,
        rejReason: "-1"   
    }
    return request(
        submit_police_details_url, 
        {  method: "POST",
            body:JSON.stringify(pol_data),              
        },true)
}
const uploadDocs=(data)=>{
    console.log("inside service pod",data.pod)
    let submit_docs_url = '/api/method/pravesh.facility.routes.document.save_or_update_documents';
    return request(
        submit_docs_url, 
        {  method: "POST",
            body:JSON.stringify(data),              
        },true)
}

const get_casper_id = () =>{
    let casper_id_url = '/api/method/pravesh.facility.routes.organisation.get_hub_names'
    return request(
        casper_id_url, {
        method: "GET",
        }, true)
}
const check_doc_exist = (doc_number) => {
    let doc_exist_url = '/api/method/pravesh.facility.routes.document.validate_facility_document?doc_number='+doc_number+'&fac_id='+new_facility_id+''
    return request(
        doc_exist_url, {
        method: "GET",
        }, true)
}
const send_otp = (email_id) => {
    let send_otp_url = '/api/method/pravesh.facility.routes.otp.send_email_verification_otp?email='+email_id+'&facility_id='+new_facility_id+'';
    return request(
        send_otp_url, {
        method: "GET",
        }, true)
}
const verify_email = (otp_num,email_id) => {
    let verify_email_url = '/api/method/pravesh.facility.routes.otp.verify_otp?otp='+otp_num+'&mobile_no='+email_id+'&facility_id='+new_facility_id+'';
    return request(
        verify_email_url, {
        method: "GET",
        }, true)
}

const bgv_data=(final_bgv_data)=>{
   
    let bgv_data_url = "/api/method/pravesh.facility.routes.facility_background_verification.get_all_bgv_data";
    return request(
        bgv_data_url, {
        method: "POST",
        dataType: "json",
        body:JSON.stringify(final_bgv_data)
        }, true)
}

  
export {
    get_states,
    get_cities,
    submit_basic_details,
    submit_address_details,
    submit_pancard_details,
    submit_dl_details,
    submit_police_details,
    get_all_docs,
    uploadDocs,
    get_casper_id,
    check_doc_exist,
    send_otp,
    verify_email,
    bgv_data
}