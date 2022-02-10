import { writable, derived } from 'svelte/store';
import {category_store_name} from './category_store';

export const facility_data_store = writable({
        name :null,
        creation:null,
        modified:null,
        modified_by:null,
        owner:null,
        docstatus:null,
        parent:null,
        parentfield:null,
        parenttype:null,
        idx:null,
        is_sotre_facility:null,
        phone_verified:null,
        action:null,
        station_code:null,
        er_network_facility:null,
        unique_facility_code:null,
        owner_name:null,
        status:null,
        phone_number:null,
        impact:null,
        facility_id:null,
        message:null,
        email_verified:null,
        store_id:null,
        facility_name:null,
        org_id:null,
        node_type:null,
        facility_type:null,
        error:null,
        remarks: null,
        store_name:null,
        _user_tags:null,
        _comments:null,
        _assign:null,
        _liked_by:null,
        vendor_code:null,
        vendor_name:null,
        is_id_prof_rejected:null,
        is_id_prof_verified:null,
        is_store_facility:null,
        non_msme_confirmed_by:null,
        non_msme_confirmed_on:null,
        msme_registered:null,
        is_background_verfication_intiated:null,
        is_bgv_rejected:null,
        is_bgv_verifies:null,
        is_bgv_verified:null,
        is_bgv_intiated:null,
        facility_type_name:null,
        gender:null,
        date_of_birth:null,
        details_updated_by:null,
        document_updated_by:null,
        details_updated_on:null,
        document_updated_on:null,
        unblocked_till_date:null,
        alert:null,
        unblocked_by:null,
        unblocked_on:null,
        created_from:null,
        client_employee_id:null,
        facility_email:null,
        client_bgv_status:null,
        client_system_id:null,
        attendance_facility_type:null,
        password:null,
        client_bgv_remarks:null,
        client_bgv_id:null,
        is_blacklisted:null,
        referred_by:null,
        third_party_verification_score:null,
        is_third_party_verified:null,
        third_party_verification_status:null

});

export const get_facility_type_link = derived([facility_data_store,category_store_name],($values,set) =>{
    set('/api/method/pravesh.facility.routes.facility_type_master.get_facility_types?org_id='+$values[0].org_id+'&category='+$values[1].category_name+'&station='+$values[0].station_code);
});

export const verify_contact_number_api_link = derived(facility_data_store,
    $facility_data_store =>'/api/method/pravesh.facility.routes.facility.verify_facility_contact?contact_no='+$facility_data_store.phone_number)

export const verify_contact_number_otp_api_link = derived(facility_data_store,
    $facility_data_store =>'/api/method/pravesh.facility.routes.otp.verify_otp?mobile_no='+$facility_data_store.phone_number+'&otp=');

