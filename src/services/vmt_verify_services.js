import {request} from './interceptor';
import {facility_id} from '../stores/facility_id_store';

// let new_facility_id
// facility_id.subscribe(value => {
//    new_facility_id = value.facility_id_number;
// });

const get_facility_details = () =>{
    let get_facility_details_url = '/api/method/pravesh.facility.routes.facility.get_facilitys?facility_filter=[["name","=","CRUN00978"]]&facility_field=["*"]'
    return request(
        get_facility_details_url, {
        method: "GET",
        }, true)
}

const get_bank_facility_details = () =>{
    let get_bank_facility_details_url = '/api/resource/Bank%20Detail?filters=[["facility_id","=","CRUN00978"]]&fields=["*"]'
    return request(
        get_bank_facility_details_url, {
        method: "GET",
        }, true)
}

const facility_document = () =>{
    let facility_document_url = '/api/method/pravesh.facility.routes.document.get_all_facility_documents?facility_id=CRUN00978'
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

export {
    get_facility_details,
    get_bank_facility_details,
    facility_document,
    approve_reject_status
}