import {request} from './interceptor';
import {bank_data_to_store} from '../stores/onboardsummary_store'
import {facility_id} from '../stores/facility_id_store'
import {bgv_config_store} from '../stores/bgv_config_store'

let new_facility_id
facility_id.subscribe(value => {
   new_facility_id = value.facility_id_number;
});


const bank_details_info = () =>{
    let bank_data_url = '/api/resource/Bank Detail?filters=[["facility_id","=","' + new_facility_id + '"]]&fields=["*"]'
    return request(
        bank_data_url, {
        method: "GET",
        }, true).then((data_1) =>{
            return data_1.body.data[0];
                
        // bank_data_from_store.set({
        //     bank_details_data: data_1.body.data[0]
            
        //     // bank_details_data :data_1.body.data[0]
        //     // modified: data_1.body.data.modified,
        //     // modified_by: data_1.body.data.modified_by,
            
        //     // id_proof_rejected : data.body.data[4].count,
        //     // bank_details_rejected : data.body.data[2].count,
        //     // bgv_pending : data.body.data[12].count,
        //     // id_verifiaction_pending : data.body.data[5].count,
        //     // bank_verification_pending : data.body.data[8].count,
        //     // pending_offer_letter : data.body.data[7].count,
        //     // bgv_rejected : data.body.data[11].count
        // });
    })
}


const cheque_details = () =>{
    let cheque_details_url = '/api/method/pravesh.facility.routes.facility.get_cheque_details?facility_id='+new_facility_id+''
    return request(
        cheque_details_url, {
        method: "GET",
        }, true)
}
const addnew_cheque_details = (data) =>{
    let new_cheque_details_url = '/api/method/pravesh.facility.routes.facility.add_cheque_details'
    return request(
        new_cheque_details_url, {
        method: "POST",
        body:JSON.stringify(data)
        },true
    ).then(
        console.log("data",data)
    )
}

const facility_document = () =>{
    let facility_document_url = '/api/method/pravesh.facility.routes.document.get_all_facility_documents?facility_id='+ new_facility_id+''
    return request(
        facility_document_url, {
        method: "GET",
        }, true)
}
const audit_trail_data = (data) =>{
    let audit_trail_url = '/api/method/pravesh.facility.routes.facility_audit_trail.get_fac_tag_trail?facility_id='+data;
    return request(
        audit_trail_url,{
            method: "GET"
        },true)
}

const facility_data = () =>{
    let facility_data_url = '/api/method/pravesh.facility.routes.facility.get_facilitys?facility_filter=[[%22name%22,%22=%22,%22'+new_facility_id+'%22]]&facility_field=[%22*%22]';
    return request(
        facility_data_url,{
            method: "GET"
        },true)
}

const facility_bgv_init =(data) =>{
    // console.log("DATA ARRAY ",data[0],data[1],data[2])
    let facility_bgv_init_url = '/api/method/pravesh.facility.routes.facility_bgv_configuration.check_bgv_config?org_id='+data[0]+'&station_code='+data[1]+'&facility_type='+data[2]+'';
    return request(
        facility_bgv_init_url,{
            method: "GET"
        },true)
       
}
const facility_bgv_check =() =>{
//   let facility_bgv_check_url = '/api/resource/Facility%20BGV?filters=[[%22facility_id%22,%22=%22,%22'+new_facility_id+'%22]]&fields=[%22*%22]';
let facility_bgv_check_url = '/api/resource/Facility%20BGV?filters=[[%22facility_id%22,%22=%22,%22'+new_facility_id+'%22]]&fields=[%22*%22]';  //TEMPORARY as facility id is refreshed in bgv.svelte
return request(
        facility_bgv_check_url,{
            method: "GET"
        },true)
}
const all_facility_tags = (data) =>{
    let facility_tags_url ='/api/method/pravesh.facility.routes.facility.get_all_tags?fac_type='+data+'';
    return request(
        facility_tags_url,{
            method: "GET"
        },true)
}

const show_fac_tags = () => {
    let all_fac_url ='/api/resource/Facility Tags?filters=[["facility_id","=","' + new_facility_id + '"],["tag_status","=","Active"]]&fields=%20[%22`tabFacility%20Tag`.`tag_name`%22,%22`tabFacility%20Tag`.`creation`%22,%22`tabFacility%20Tag`.`tag_id`%22,%22`tabFacility%20Tag`.`owner`%22,%22`tabFacility%20Tag`.`modified`%22,%22`tabFacility%20Tag`.`modified_by`%22,%22`tabFacility%20Tag`.`remarks`%22,%22`tabFacility%20Tag`.`deactivation_date`%22,%22`tabFacility%20Tag`.`name`%22,%22`tabFacility%20Tag`.`tag_status`%22]';
    return request(
        all_fac_url,{
            mode:'no-cors',
            method: "GET"
        },true)
}

const submit_fac_tag_data = (new_tag_id,select_tag_data,tag_date,tag_remark,serv_ch_data) =>{
    // console.log("select_tag_data,tag_date,tag_remark",new_tag_id,select_tag_data,tag_date,tag_remark)
    let submit_fac_tag_url = '/api/method/pravesh.facility.routes.facility.add_facility_tags';

    let tag_data = {
            "facility_id": new_facility_id,
            "facility_tag": [{
            "tag_name": select_tag_data,
            "tag_id": new_tag_id,
            "remarks": tag_remark,
            "deactivation_date": tag_date,
            "doctype": "Facility Tag"
            }],
            "vendor_code": serv_ch_data
    }
    return request(
        submit_fac_tag_url, 
        {  method: "POST",
            body:JSON.stringify(tag_data),              
        },true)
}

const remove_tag =(fac_id,tag_id,tag_name) => {
    let remove_tag_url = '/api/method/pravesh.facility.routes.facility.delete_facility_tag?facility_id=' + fac_id + '&tag_id=' + tag_id + '&tag_name='+tag_name;
    return request(
        remove_tag_url,{
            method: "GET"
        },true)
}

const tag_audit_trail = () => {
    let tag_audit_trail_url = '/api/method/pravesh.facility.routes.facility_audit_trail.get_fac_tag_trail?facility_id='+new_facility_id+'&regx=Tag';
    return request(
        tag_audit_trail_url,{
            method: "GET"
        },true)
}
const service_vendor = () => {
    let service_vendor_url = '/api/method/pravesh.facility.routes.facility.get_vendor_facility_by_config';
    return request(
        service_vendor_url,{
            method: "GET"
        },true)
}
const get_loc_scope= () => {
    let get_loc_scope_url = '/api/method/pravesh.facility.routes.scope.get_scope';
    return request(
        get_loc_scope_url,{
            method: "GET"
        },true)
}
const client_details=(data)=>{
    let client_details_url = '/api/method/pravesh.facility.routes.facility.get_facilities?facility_id="'+new_facility_id+'"&loc="'+data+'"';
    return request(
        client_details_url,{
            method: "GET"
        },true)
}
const erp_details=()=>{
    let erp_details_url="/api/resource/ERP%20Sync?filters=[[%22facility_id%22,%22=%22,%22"+new_facility_id+"%22]]&fields=[%22*%22]";
    return request(
        erp_details_url,{
            method: "GET"
        },true)
}
const child_data=(child_data)=>{
    // let child_data =[{"parent_facility_id":"CRUN00525","status":"active","child_facility_id":"CRUN00320","child_id":"hari_kripa_crun","parent_name":"KISHAN217","parent_id":"kishan217_crun"}]
    
    let child_data_url="/api/method/pravesh.facility.routes.super_store.create_super_store";
    return request(
        child_data_url, 
        {  method: "POST",
            body:JSON.stringify({ "childIDs": child_data }),            
        },true)
}
const get_child_dets=()=>{
    let get_child_url = '/api/method/pravesh.facility.routes.super_store.get_child_details?field_name=parent_facility_id&field_value="'+new_facility_id+'"'
    return request(
        get_child_url,{
            method: "GET"
        },true)
}
const rem_child=(child_id)=>{
    let rem_child_url="/api/method/pravesh.facility.routes.super_store.remove_mapping?name="+child_id+"&_=1649691190234"
    return request(
        rem_child_url,{
            method: "GET"
        },true)
}
const add_gst_dets=(data)=>{
    let add_gst_dets_url="/api/method/pravesh.facility.routes.facility.add_gst_details";
    return request(
        add_gst_dets_url, 
        {  method: "POST",
            body:JSON.stringify(data),            
        },true)
}
const gst_details=()=>{
    let get_details_url = '/api/resource/Facility?filters=[[%22name%22,%22=%22,%22'+new_facility_id+'%22]]&fields=[%22`tabFacility%20Address`.`name`%22,%22`tabFacility%20Address`.`address`%22,%22`tabFacility%20Address`.`city`%22,%22`tabFacility%20Address`.`state`%22,%22`tabFacility%20Address`.`country`%22,%22`tabFacility%20Address`.`postal`%22,%22`tabFacility%20Address`.`gstn`%22,%22`tabFacility%20Address`.`default_address`%22,%22`tabFacility%20Address`.`address_type`%22,%22`tabFacility%20Address`.`location_id`%22]'
    return request(
        get_details_url,{
            method: "GET"
        },true)
}
const list_child_data=()=>{
    let list_child_data_url = '/api/method/pravesh.facility.routes.super_store.get_child_details?field_name=parent_facility_id&field_value=%22'+new_facility_id+'%22'
    return request(
        list_child_data_url,{
            method: "GET"
        },true)
}
const remove_child=(child_id)=>{
    let remove_child_url = '/api/method/pravesh.facility.routes.super_store.remove_mapping?name='+child_id+'&_=1651739902496';
    return request(
        remove_child_url,{
            method: "GET"
        },true)
}
const work_details_data = () =>{
    let work_details_url = '/api/method/pravesh.facility.routes.contract.get_assign_contract?facility_id='+new_facility_id+'&is_physical=True';
    return request(
        work_details_url,{
            method: "GET"
        },true)

}
const print_data = (contract_id) =>{
    let print_data_url = '/api/method/pravesh.facility.routes.contract.get_contract_detail?contract_id='+contract_id+'&is_accepted=1';
    return request(
        print_data_url,{
            method: "GET"
        },true)

}
const get_physical_contracts = () =>{
    let get_physical_contracts_url = '/api/method/pravesh.facility.routes.contract.get_physical_contract_type';
    return request(
        get_physical_contracts_url,{
            method: "GET"
        },true)

}
const save_physical_contract = (data) =>{
    let save_physical_contract_url = '/api/method/pravesh.facility.routes.contract.upload_physical_contract';
    return request(
        save_physical_contract_url, 
        {  method: "POST",
            body:JSON.stringify(data),            
        },true)
}
const get_station_details = (station_code) =>{
    let get_station_details_url = '/api/method/pravesh.facility.routes.facility.get_station_details?station_code='+station_code+'&_=1652169879220';
        return request(
        get_station_details_url,{
        method: "GET"
        },true)
}
const get_all_accepted_contracts = () =>{
    let get_all_accepted_contracts_url = '/api/method/pravesh.facility.routes.contract.get_all_accepted_contract?facility_id='+new_facility_id+'';
        return request(
        get_all_accepted_contracts_url,{
        method: "GET"
        },true)
}
const blacklist_vendor = (remark) =>{
    let blacklist_vendor_url = '/api/method/pravesh.facility.routes.facility.blacklist_facility?facility_id='+new_facility_id+'&remarks='+remark+'';
        return request(
            blacklist_vendor_url,{
        method: "GET"
        },true)
}
const reset_deact_status = () => {
    let reset_deact_status_url = '/api/method/pravesh.facility.routes.facility.reset_deactive_facility?facility_id='+new_facility_id+'';
    return request(
        reset_deact_status_url,{
    method: "GET"
    },true)

}


const initiateBGV = () => {
    let initiate_bgv_url = "/api/method/pravesh.facility.routes.facility.initiate_bgv?facility_id="+new_facility_id+"&_=1653922788629";
    return request(
        initiate_bgv_url,{
    method: "GET"
    },true)

}

const get_libera_login = () => {
    let get_libera_login_url = "/api/method/pravesh.facility.routes.facility.get_libera_user?facility_id="+new_facility_id;
    return request(
        get_libera_login_url,{
    method: "GET"
    },true)

}
const check_if_already_child = ()=>{
    let check_if_already_child_url = "/api/method/pravesh.facility.routes.super_store.check_having_parent?facility_id="+new_facility_id;
    return request(
        check_if_already_child_url,{
        method: "GET"
        },true)  
}





export {
    bank_details_info,
    cheque_details,
    addnew_cheque_details,
    facility_document,
    audit_trail_data,
    facility_data,
    facility_bgv_init,
    facility_bgv_check,
    all_facility_tags,
    show_fac_tags,
    submit_fac_tag_data,
    remove_tag,
    tag_audit_trail,
    service_vendor,
    get_loc_scope,
    client_details,
    erp_details,
    child_data,
    get_child_dets,
    rem_child,
    add_gst_dets,
    gst_details,
    list_child_data,
    remove_child,
    work_details_data,
    print_data,
    get_physical_contracts,
    save_physical_contract,
    get_station_details,
    get_all_accepted_contracts,
    blacklist_vendor,
    reset_deact_status,
    initiateBGV,
    get_libera_login,
    check_if_already_child
}
