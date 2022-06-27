import {request} from './interceptor';
// import {dashboard_details} from '../stores/dashboard_store'

let demo_api_url = '/api/resource/Organization?fields=["*"]&filters=[["domain","=","Ecom"]]';
let get_current_user_api_url = '/api/method/pravesh.facility.routes.user.get_session_user';
// let dashboard_data_url = '/api/method/pravesh.facility.routes.dashboard.get_dashboard_summary';
const demo_api_fun = () => {
    return request(
        demo_api_url,{
            mode: 'no-cors'}
            ,true,false,
            "GET")
}

const dashboard_data= () => {
    let dashboard_data_url = '/api/method/pravesh.facility.routes.dashboard.get_dashboard_summary';
    return request(
        dashboard_data_url, {
        method: "GET"
    }, true
    )
}

const get_current_user_function = () => {
    return request(
        get_current_user_api_url,{
            mode: 'no-cors',
            method:"GET"
        },true)

}
const get_fac_count = () => {
    let get_fac_url = '/api/method/pravesh.facility.routes.dashboard.get_fac_types_counts';
    return request(
        get_fac_url, {
        method: "GET"
    }, true
    )
}
const find_parent_function = (fac_id) => {
    let find_parent_url = '/api/method/pravesh.facility.routes.super_store.parent_details?facility_id='+fac_id+'';
    return request(
        find_parent_url, {
        method: "GET"
    }, true
    )
}
const copy_parent_func = (parent_obj) => {
    let copy_parent_func_url = '/api/method/pravesh.facility.routes.facility.add_vendor'
    return request(
        copy_parent_func_url, {
        method: "POST",
        body:parent_obj
    }, true)
}
// const download_docs = (facArr,downDoctype) =>{
//     let download_doc_url = "/api/method/pravesh.facility.routes.document.get_documents?facility_ids=" + facArr.join(",") + "&doc_type=" + downDoctype;
//     return request(
//         download_doc_url, {
//         method: "GET"
//     }, true
//     )
// }

const download_beejak_docs = (beejak_id) =>{
    let download_beejak_docs_url = "/api/method/pravesh.facility.routes.document.get_beejak_invoices?invoice_ids="+beejak_id;
    return request(
        download_beejak_docs_url, {
        method: "POST"
    }, true
    )
}

const get_ass_by_client_name = (key,type) =>{
    let get_ass_by_client_name_url = "/api/method/pravesh.facility.routes.facility.get_facility_by_client_or_emp_id?key="+key+"&key_type="+type+"";
    return request(
        get_ass_by_client_name_url, {
        method: "GET"
    }, true
    )
}
// const dashboard_data = () =>{
//     return request(
//         dashboard_data_url,{
//             method: "GET"
//         },true
//     ).then((data)=>{
//         console.log("inside service",data)
        // dashboard_details.set({
        // // dashboard_details : data
        // id_proof_rejected : data.body.data[7].count,
        // bank_details_rejected : data.body.data[4].count,
        // bgv_pending : data.body.data[1].count,
        // id_verification_pending : data.body.data[8].count,
        // bank_verification_pending : data.body.data[5].count,
        // pending_offer_letter : data.body.data[10].count,
        // bgv_rejected : data.body.data[12].count,
        // active : data.body.data[0].count,
        // deactive : data.body.data[6].count,
        // bank_details_pending : data.body.data[3].count,
        // bank_beneficiary_pending : data.body.data[2].count,
        // onboarding_in_progress : data.body.data[9].count,
        // })
        // console.log("dashboard_detaissss ls",dashboard_details)
//     })
// }


export{
    demo_api_fun,
    dashboard_data,
    get_current_user_function,
    get_fac_count,
    find_parent_function,
    copy_parent_func,
    get_ass_by_client_name,
    download_beejak_docs
    //download_docs,
}