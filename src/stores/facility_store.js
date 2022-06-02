import { writable, derived } from 'svelte/store';
import {category_store_name} from './category_store';

export var facility_data_store = writable({
        address:"-",
        addresess:"-",
        user_type: "FieldAuditor",
        dob:null,
        station_code:null,
        er_network_facility:true,
        owner_name:null,
        status:"Onboarding in Progress",
        phone_number:null,
        facility_id:"-",
        store_id:null,
        facility_name:"-",
        org_id:null,
        node_type:"Distributor",
        facility_type:"-",
        store_name:null,
        vendor_code:null,
        vendor_name:null,
        non_msme_confirmed_by:null,
        non_msme_confirmed_on:null,
        msme_registered:null,        
        facility_email:null,
        
});


//  export function demo(key,value){
//     // facility_data_store[key] = value;
//     console.log("demo")
//     console.log(facility_data_store.valueOf("station_code"));

//  }



export const get_facility_type_link = derived([facility_data_store,category_store_name],($values,set) =>{
    set('/api/method/pravesh.facility.routes.facility_type_master.get_facility_types?org_id='+$values[0].org_id+'&category='+$values[1].category_name+'&station='+$values[0].station_code);
});

export const verify_contact_number_api_link = derived(facility_data_store,
    $facility_data_store =>'/api/method/pravesh.facility.routes.facility.verify_facility_contact?contact_no='+$facility_data_store.phone_number)

export const verify_contact_number_otp_api_link = derived(facility_data_store,
    $facility_data_store =>'/api/method/pravesh.facility.routes.otp.verify_otp?mobile_no='+$facility_data_store.phone_number+'&otp=');


export const verify_associate_name_api_link = derived(facility_data_store,
    $facility_data_store => '/api/method/pravesh.facility.routes.facility.verify_facility_name?facility_name='+$facility_data_store.facility_name+'&station_code='+$facility_data_store.station_code+'&fac_id=');

export const verify_email_name_api_link = derived(facility_data_store,
        $facility_data_store => '/api/method/pravesh.facility.routes.facility.verify_facility_email?email_id='+$facility_data_store.facility_email);

export const check_bgv_config_api_link = derived(facility_data_store,
        $facility_data_store => '/api/method/pravesh.facility.routes.facility_bgv_configuration.check_bgv_config?org_id='+$facility_data_store.org_id+'&station_code='+$facility_data_store.station_code+'&facility_type='+$facility_data_store.facility_type);
    
        //https://doha-crun.elasticrun.in/api/method/pravesh.facility.routes.facility_bgv_configuration.check_bgv_config?org_id=AN&station_code=MHPD&facility_type=HDA
export const get_domian_from_org_api_link = derived(facility_data_store,
    $facility_data_store => '/api/resource/Organization?fields=["*"]&filters=[["org_id","=","'+$facility_data_store.org_id+'"]]');

export const get_category_from_facility_type_api_link = derived(facility_data_store,
    $facility_data_store => '/api/resource/Facility%20Type%20Master?fields=["*"]&filters=[["name","=","'+$facility_data_store.facility_type+'"]]');

export const get_city_id_from_org_station_api_link = derived(facility_data_store,
    $facility_data_store => '/api/resource/Org%20Station?fields=["*"]&filters=[["station_code","=","'+$facility_data_store.station_code+'"]]');

