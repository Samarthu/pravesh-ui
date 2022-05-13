import {request} from './interceptor';
// import {facility_id} from '../stores/facility_id_store';

// let new_facility_id
// facility_id.subscribe(value => {
//    new_facility_id = value.facility_id_number;
// });
// let facility_id = "AXVT00383";
let facility_id = "MHAE00037";
// let facility_id = "NAOD00048";
// let facility_id = "MHPD01226";


const get_facility_details = () =>{
    let get_facility_details_url = '/api/method/pravesh.facility.routes.facility.get_facilitys?facility_filter=[[%22name%22,%22=%22,%22'+facility_id+'%22]]&facility_field=[%22*%22]';
    return request(
        get_facility_details_url, {
        method: "GET",
        }, true)
}

const facility_bgv_check =() =>{
    //   let facility_bgv_check_url = '/api/resource/Facility%20BGV?filters=[[%22facility_id%22,%22=%22,%22'+new_facility_id+'%22]]&fields=[%22*%22]';
    let facility_bgv_check_url = '/api/resource/Facility%20BGV?filters=[[%22facility_id%22,%22=%22,%22'+facility_id+'%22]]&fields=[%22*%22]';  //TEMPORARY as facility id is refreshed in bgv.svelte
    return request(
            facility_bgv_check_url,{
                method: "GET"
            },true)
    }

const get_bank_facility_details = () =>{
    let get_bank_facility_details_url = '/api/resource/Bank Detail?filters=[["facility_id","=","' + facility_id + '"]]&fields=["*"]'
    return request(
        get_bank_facility_details_url, {
        method: "GET",
        }, true)
}

const facility_document = () =>{
    let facility_document_url = '/api/method/pravesh.facility.routes.document.get_all_facility_documents?facility_id='+facility_id+''
    return request(
        facility_document_url, {
        method: "GET",
        }, true)
}

const approve_reject_status = (data) =>{
    let approve_reject_status_url = '/api/method/pravesh.facility.routes.document.approve_reject_document'
    return request(
        approve_reject_status_url, {
        method: "PUT",
        body:JSON.stringify(data)
        },true
    ).then(
        console.log("data",data)
    )
}


const bank_approve_reject = (data) =>{
    let bank_approve_reject_url = "/api/method/pravesh.facility.routes.bank.verify_bank_details";
    return request(
        bank_approve_reject_url, {
        method: "PUT",
        body:JSON.stringify(data)
        },true
    ).then(
        console.log("data",data)
    )
}

const final_id_ver_rej=(final_id_data)=>{
    // let final_id_data = {
    //     "name": value.name,
    //     "resource_id": facility_id,
    //     "verified": verified,
    //     "rejected": rejected,
    //     "remarks": remarks,
    //     "result": result.toString()
    // }

    // {"documents":[
    // {"name":"63b5aef497","resource_id":"MHAE00037","verified":1,"rejected":0,"remarks":"TEsting","result":"true"},
    // {"name":"fe41026e11","resource_id":"MHAE00037","verified":1,"rejected":0,"remarks":"TEsting","result":"true"}
    // ]}
    
    let final_id_ver_rej_url = "/api/method/pravesh.facility.routes.facility.update_id_prof";
    return request(
        final_id_ver_rej_url, {
        method: "PUT",
        body:JSON.stringify(final_id_data)
        }, true)
}

const bgv_approve_rej=(bgv_data)=>{
   
    let bgv_approve_rej_url = "/api/method/pravesh.facility.routes.facility_background_verification.update_details";
    return request(
        bgv_approve_rej_url, {
        method: "PUT",
        body:JSON.stringify(bgv_data)
        }, true)
}
const final_bgv_app_rej=(bgv_data)=>{
   
    let final_bgv_app_rej_url = "/api/method/pravesh.facility.routes.facility_background_verification.update_bgv_status";
    return request(
        final_bgv_app_rej_url, {
        method: "PUT",
        body:JSON.stringify(bgv_data)
        }, true)
}

const get_client_details=(facility_id)=>{
    let get_client_details_url = "/api/resource/Facility%20Org%20Config?filters=[[%22facility_id%22,%22=%22,%22"+facility_id+"%22]]&fields=[%22*%22]";
    return request(
        get_client_details_url,{
            method: "GET"
        },true)
}

const get_client_org_mapping=()=>{
    let get_client_org_mapping_url = "/api/method/pravesh.facility.routes.organisation.get_org_list?org_field=[%22*%22]";
    return request(
        get_client_org_mapping_url,{
            method: "GET"
        },true)
}

const get_specific_name=(stat_code)=>{
    let get_specific_name_url = "/api/method/pravesh.facility.routes.ecom_work_done.get_all_resource_ids?station_code="+stat_code+"&is_store=false";
    return request(
        get_specific_name_url,{
            method: "GET"
        },true)
}

// const save_mapping=()=>{
//     let save_mapping_url = "/api/method/pravesh.facility.routes.facility_org_config.save_mapping";
//     return request(
//         save_mapping_url,{
//             method: "PUT"
//         },true)
// }


const save_mapping=(map_data)=>{
   
    let save_mapping_url = "/api/method/pravesh.facility.routes.facility_org_config.save_mapping";
    return request(
        save_mapping_url, {
        method: "PUT",
        body:JSON.stringify(map_data)
        }, true)
}

const get_change_associte = () =>{
    let get_change_associte_url = '/api/method/pravesh.facility.routes.facilty_property_config.get_all_type_change_requests?facility_id='+facility_id+''
    return request(
        get_change_associte_url, {
        method: "GET",
        }, true)
}

const send_associate_req=(assoc_data)=>{
   
    let send_associate_req_url = "/api/method/pravesh.facility.routes.facilty_property_config.add_type_change_request";
    return request(
        send_associate_req_url, {
        method: "PUT",
        body:JSON.stringify(assoc_data)
        }, true)
}

const get_assoc_types=(org,station)=>{
    let get_assoc_types_url = "/api/method/pravesh.facility.routes.facility_type_master.get_facility_types?org_id=" + org + "&station=" + station  ;
    return request(
        get_assoc_types_url,{
            method: "GET"
        },true)
}



export {
    get_facility_details,
    get_bank_facility_details,
    facility_document,
    approve_reject_status,
    facility_bgv_check,
    bank_approve_reject,
    final_id_ver_rej,
    bgv_approve_rej,
    final_bgv_app_rej,
    get_client_details,
    get_client_org_mapping,
    get_specific_name,
    save_mapping,
    get_change_associte,
    send_associate_req,
    get_assoc_types
}