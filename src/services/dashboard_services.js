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
        method: "POST",
        contentType: 'application/json',
        xhrFields: {
			responseType: 'blob'
		}
    }, true
    ).then(response => response.blob())
    .then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      console.log("objectURL",objectURL)
    //   myImage.src = objectURL;
    });
}

const find_by_one_ser =(key,key_type)=>{
    let find_by_one_ser_url = '/api/method/pravesh.facility.routes.facility.get_facility_by_client_or_emp_id?key='+key+'&key_type='+key_type
    return request(
        find_by_one_ser_url, {
        method: "GET",
    }, true
    )
}
// const bulk_search_ser = (data) =>{
// let bulk_search_sers_url = "/api/method/pravesh.facility.routes.facility.bulk_client_name_search";
// return request(
//     bulk_search_sers_url, {
//     method: "POST",
//     headers: { "Contains-Array": "yes" },
//     contentType: 'application/json',
//     dataType: 'json',
//     data:JSON.stringify(data)
// }, true)

// }

const bulk_search_ser = (data) =>{
    let bulk_search_sers_url = '/api/method/pravesh.facility.routes.facility.bulk_client_name_search';
    return request(
        bulk_search_sers_url, 
        {  
            method: "POST",
            headers: { "contains-array": "yes" ,"Content-Type": "application/json"},
            body:JSON.stringify(data),       
               
        },true)
}

const bulk_emp_map = (data) =>{
    let bulk_emp_map_url = '/api/method/pravesh.facility.routes.facility.map_bulk_emp_id';
    return request(
        bulk_emp_map_url, 
        {  
            method: "POST",
            headers: { "contains-array": "yes" ,"Content-Type": "application/json"},
            body:JSON.stringify(data),       
               
        },true)
}

export{
    demo_api_fun,
    dashboard_data,
    get_current_user_function,
    get_fac_count,
    find_parent_function,
    copy_parent_func,
    download_beejak_docs,
    find_by_one_ser,
    bulk_search_ser,
    bulk_emp_map
    //download_docs,
}