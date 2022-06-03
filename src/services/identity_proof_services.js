import {request} from './interceptor';
import {facility_data_store,check_bgv_config_api_link} from '../stores/facility_store';
import {BGV_api_link} from '../stores/facility_id_store';

import {msme_store} from '../stores/document_store';

let facility_data;
facility_data_store.subscribe(value => {
    facility_data = value;
});


let verify_document_api_url = '/api/method/pravesh.facility.routes.document.validate_facility_document?doc_number=';
let save_facility_api_url = '/api/method/pravesh.facility.routes.facility.save_facility';
let save_or_update_documents_api_url = '/api/method/pravesh.facility.routes.document.save_or_update_documents';



let check_bgv_config_api_url ;
let BGV_api_url ;
check_bgv_config_api_link.subscribe(value => {
    check_bgv_config_api_url = value;
})
BGV_api_link.subscribe(value => {
    BGV_api_url = value;
})

const verify_document_function = (document_number) => {
    let link = verify_document_api_url + document_number;
    return request(link,{mode: 'no-cors'},true,false,"GET")
}
const save_facility_function = () =>{
    // console.log("facility data",facility_data);
    return request(save_facility_api_url,{
        method: "POST",
        body:JSON.stringify(facility_data)
        
    },true)
}
const edit_facility_function = (facility_edit_data) =>{
    return request(save_facility_api_url,{
        method: "POST",
        body:JSON.stringify(facility_edit_data)
        
    },true)

}
const check_bgv_config_function = () =>{
    // console.log(check_bgv_config_api_url);
    return request(check_bgv_config_api_url,{mode: 'no-cors',method:"GET"},true)
    
}
const BGV_function = () =>{
    return request(BGV_api_url,{mode: 'no-cors',method:"GET"},true)
    
}

const save_or_update_documents_function = (doument_store_name) =>{
    console.log("inside save or update documents function");
    console.log(doument_store_name);
    
    let document_data= {documents: []};
    let temp;
doument_store_name.subscribe(value =>{
        temp = value;
    })
    document_data.documents.push(temp);
    console.log("document data",document_data);
    return request(save_or_update_documents_api_url,{ method: "POST",
    body:JSON.stringify(document_data)},true)
}

const save_or_update_documents_function_1 = (document_data_para) =>{
    console.log("inside save or update documents function");
    console.log(document_data_para);
    
    let document_data= {documents: []};
    let temp;
    console.log("document data para",document_data_para);
    console.log("document data",document_data);
// doument_store_name.subscribe(value =>{
//         temp = value;
//     })
    document_data.documents.push(document_data_para);
    console.log("document data",document_data);
    return request(save_or_update_documents_api_url,{ method: "POST",
    body:JSON.stringify(document_data)},true)
}


export{
    verify_document_function,
    save_facility_function,
    check_bgv_config_function,
    BGV_function,
    save_or_update_documents_function,
    save_or_update_documents_function_1,
    edit_facility_function

}