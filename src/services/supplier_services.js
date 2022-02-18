import {request} from './interceptor';
// import {supplier_details} from '../stores/supplier_store';
// import {audit_details} from '../stores/audit_details_store';
// import {status_store_details} from '../stores/status_details_store';

let supplier_data_url = '/api/method/pravesh.facility.routes.dashboard.get_facilities';
// const supplier_data = (data) =>{
//     return request(
//         supplier_data_url,{
//             method: "POST",
//             body:data
//         },true)
//         .then((data)=>{
//         console.log("inside service of supplier data",data)
//         supplier_details.set({
//             associate_data:data


        // dashboard_details : data
        // id_proof_rejected : data.body.data[4].count,
        // bank_details_rejected : data.body.data[2].count,
        // bgv_pending : data.body.data[12].count,
        // id_verifiaction_pending : data.body.data[5].count,
        // bank_verification_pending : data.body.data[8].count,
        // pending_offer_letter : data.body.data[7].count,
        // bgv_rejected : data.body.data[11].count
//         })
//     })
// }

const supplier_data=(data)=>{
    return request(
        supplier_data_url,{
            method: "POST",
            body:data
        },true
    )
};


// const audit_trail_data = (data) =>{
//     let audit_trail_url = '/api/method/pravesh.facility.routes.facility_audit_trail.get_fac_tag_trail?facility_id='+data;
//     return request(
//         audit_trail_url,{
//             method: "POST"
//         },true)
//         .then((data)=>{
//         console.log("inside service of audit_trail_data",data.body)
//         audit_details.set({
//             audit_data:data
//     })
// })
// }
const audit_trail_data = (data) =>{
    let audit_trail_url = '/api/method/pravesh.facility.routes.facility_audit_trail.get_fac_tag_trail?facility_id='+data;
    return request(
        audit_trail_url,{
            method: "POST"
        },true)
}


const filter_city_data =  () => {
    let filter_city_data_url = '/api/method/pravesh.facility.routes.scope.get_scope';
    return request(
        filter_city_data_url, {
        method: "GET"
    }, true
    )
    // console.log("services datatttatatatata",data);
    // city_store.set({
    //     city_store: data.body.data
    // });  
}  

const  filter_status_data = () => {
    let filter_status_data_url = '/api/method/pravesh.facility.routes.dashboard.get_dashboard_summary';
    return request(
        filter_status_data_url, {
        method: "GET"
    }, true)
    // console.log("services of filter_status",data);
    // status_store_details.set({
    //     status_store: data.body.data
    // });  
}

export{
   supplier_data,
   filter_city_data,
   audit_trail_data,
   filter_status_data
}
