<script>
    // import { Router, Link, Route } from "svelte-routing";
        import Catagory from "./catagory.svelte";
        import { goto } from "$app/navigation";
        import Breadcrumb from "./breadcrumb.svelte";
        import { onMount } from "svelte";
        import { DateInput, DatePicker } from "date-picker-svelte";
        import { bank_data_to_store,cheque_data_to_store } from "../stores/onboardsummary_store";
        import { allowed_pdf_size } from "../services/pravesh_config";
        // import { addnew_cheque_details } from "../services/onboardsummary_services";
        // import { facility_document } from "../services/onboardsummary_services";
        import { audit_trail_data } from "../services/supplier_services";
        import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
                show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
                get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
                facility_document,addnew_cheque_details,bank_details,cheque_details,gst_details,blacklist_vendor,
                initiateBGV} from "../services/onboardsummary_services";
        import {get_pravesh_properties_method,} from '../services/workdetails_services';
        import {approve_reject_status,get_client_org_mapping} from '../services/vmt_verify_services';
        import {uploadDocs} from '../services/bgv_services'
        import {get_date_format} from "../services/date_format_servives";
        import {img_url_name} from '../stores/flags_store';
        import {facility_id} from "../stores/facility_id_store"
        import {facility_data_store} from "../stores/facility_store"
        import {bgv_config_store} from '../stores/bgv_config_store'
        import Toast from './components/toast.svelte';
        import AssociateDetails from './components/associateDetailsComponent.svelte';
        import BankDetails from './components/bankDetailsComponent.svelte';
        import IdentityProof from './components/identityProofComponent.svelte';
        import WorkDetails from './components/workDetailsComponent.svelte';
        import { object_without_properties } from "svelte/internal";
        import { paginate, LightPaginationNav } from "svelte-paginate";
        import Spinner from "./components/spinner.svelte";
        import {logged_user} from '../services/supplier_services';
        import  {  page } from '$app/stores';
        import {documents_store} from '../stores/document_store';
        import {duplicate_documents_store} from '../stores/duplicate_document_store';
        import {duplicate_facility_data_store} from '../stores/duplicate_facility_data_store';
        import {
            sorting_pravesh_properties,
        } from "../services/pravesh_config";
        import {pravesh_properties} from '../stores/pravesh_properties_store';
        import { get_current_user_function } from "../services/dashboard_services";
import { current_user } from "../stores/current_user_store";
// import { bgv_data_store } from "src/stores/bgv_store";
    // import { bgv_data_store } from "src/stores/bgv_store";
    
        let show_spinner = false;
        let toast_text;
        let toast_type;
        let routeNext = "";
        let routeBgv = "";
        let temp = "Add";
        let temp1 = "change";
        let temp2 = "gst1";
        let temp3 = "e-contracts";
        let temp4 = "p-contracts-1";
        let temp5 = "newMap";
        let temp6 = "cheque";
        let child = "linkchild";
        let childlink = "childlink"; 
        let asso_active = "active";
        let work_active = "";
        let id_active ="";
        let bank_active = "";
        let bank_values_from_store = [];
        let cheque_values_from_store = [];
        let audit_details_array = [];
        let facility_document_data = [];
        let all_tags_data= [];
        let all_tags_obj= {};
        let show_fac_array = [];
        let tag_data_arr = [];
        let document_type_arr = [];
        let show_creation_date;
        let child_select;
        let child_list=[];
        let check_val,query;
        let tags_for_ass_arr=[];
        var doc_type_name = [];
        let new_arr = []
        // let edit_document_link = null;
        let check_selected;
        let id_new_date='';
        let username;
        let all_tags_res;
        let changed_pan_num= "-";
        let changed_aadhar_num="-";
        let changed_dl_num="-";
        let changed_voter_num="-";
        let document_dropdown="";
        let pancard_obj = {
            pan_num:null,
            pan_attach:null,
            pan_name:null,
            pan_verified:null,
            pan_rejected:null
        }
        let aadhar_obj = {
            aadhar_num:null,
            aadhar_attach:null,
            aadhar_name:null,
            aadhar_verified:null,
            aadhar_rejected:null
        }
        let fac_photo_obj = {
            profile_url:null,
            profile_verified:null,
            profile_rejected:null
        }
        let addproof_obj = {
            address_name:null,
            address_url:null,
            address_verified:null,
            address_rejected:null
        };
        let can_cheque_obj = {
            can_cheque_name:null,
            can_cheque_url:null,
            can_cheque_verified:null,
            can_cheque_rejected:null
        };
        let dl_photo_obj = {
            dl_lic_num:null,
            dl_lic_name:null,
            dl_lic_url:null,
            dl_verified:null,
            dl_rejected:null
        };
        let new_off_file_obj = {
            offer_name:null,
            offer_url:null,
            offer_verified:null,
            offer_rejected:null
        };
        let gst_doc_obj = {
            gst_name:null,
            gst_url:null,
            gst_doc_num:null,
            gst_verified:null,
            gst_rejected:null
        };
        let voter_id_object = {
            voter_id_number:null
        }
    
        let text_pattern = /^[a-zA-Z_ ]+$/;
        let recrun_pattern =  /^[^-\s](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9 _-]+)$/;
        let city_select;
        let city_select_flag=0;
        let img_name="",bank_name="-",type ="",cheque_date,cheque_number="-",amount="",
        recrun_number="",file_number = "";
        let bank_name_message ="",type_message="",cheque_date_message="",cheque_number_message=""
        ,amount_message="",recrun_number_message="",file_number_message="",cheque_upload_message="";
        let child_box;
        let bank_new_date;
        let facility_modified_date,facility_doc_date;
        // let client_det_res;
        let client_det_arr=[];
        let gst_doc_arr=[];
        // $: cheque_date = new Date();
        let file_data;
        let showbtn = 0;
        let selectTag,addRemark,selectsearch;
        let city = "-";
        let facility_address,facility_postal,facility_password,location_id,status_name;
        let new_fac_remarks = [];
        let facility_created_date;
        let select_tag_data,serv_ch_data;
        let total_pages;
        let pages=[];
        let tag_date,tag_remark;
        let tag_data_obj=[];
        let city_data=[];
        let scope_data=[];
        let gst_doc_type=[];
        let erp_details_arr = [];
        let cheque_img="";
        let checkupload,dl_lic_attach = "-";
        let result;
        let mapped_pages = [];
        let hidden_field ="hidden";
        let gst_city_link_state="";
        let gst_state_code = "";
        let gst_city_loc_id="";
        let org_name="-";
        export let url = "";
        let blacklist_remark = "";
        /////////////////////svelte plugin pagiantion//////////
        let items;
        let currentPage = 1;
        let pageSize = 10;
        let paginatedItems=[];
        let change_to = "Associate_details";
        //////GST vars////////////
        let gst_address=""
        // let gst_city_select=""
        let gst_number=""
        let gst_file=""
        let gst_upload_message ="";
        let gst_number_message ="";
        let gst_city_message ="";
        let gst_add_message = "";
        let gst_img = "";
        let gst_data="";
        let gst_checkbox = false;
        let gst_details_data=[];
    ///////Document view Model/////////
        let alt_image="";
        let image_path;
    /////////Document view Model//////
        let selected_document_type;
        let document_desc = "";
        let document_url = "";
        let new_doc_upload_message = "";
        let doc_cat_sel_msg=""
        let doc_det_msg=""
        let document_name = "";
        let document_type,document_number;
        let admin = false;
        let itadmin = false;
        let show_upload_btn = false;
        let remove_upload_btn = false;
        let is_adhoc_facility = false; 
        
        $:{
            for(let key in all_tags_obj){
                if(select_tag_data == key){
                    if(all_tags_obj[key] == "vendor_required"){
                    hidden_field = "";
                    }
                    else{
                    hidden_field = "hidden"; 
                    }
                }
                
            }
        }
        $:{
            if(city_select != null && $facility_id.facility_id_number != null){
            
            link_child(city_select)
            }
        }
        let searchTerm;
        $:if(searchTerm == ''){
            clearedSearchFunc();
        }
        $:new_pages = [];
        // $:for(let i=0;i<scope_data.length;i++){
        //     if(scope_data[i].location_name == gst_city_select){
        //         gst_city_link_state = scope_data[i].location_state;
        //         gst_city_loc_id = scope_data[i].location_id;
        //         gst_state_code = scope_data[i].state_code;
        //     }
        // }
        $:if(gst_checkbox === true){
            gst_checkbox = true;
        }
        
        
        
        onMount(async () => {
            
            show_spinner = true;
            query = $page.url;
    
            
            
            if($page.url.searchParams.has("unFacID")){
                let temp  = $page.url.searchParams.get("unFacID");
                if(temp != ""){
                    // console.log("temp",temp);
                    $facility_id.facility_id_number = temp;
                }
                else{
                    goto("dashboard")
                    toast_type = "error";
                    toast_text = "Facility ID not found";
                }
            }
            else{
                toast_type = "error";
                toast_text = "Facility ID not found";
                goto("dashboard")
            }
    
            
    
            // console.log('$page.url.origin+',$page.url.origin)
            // edit_document_link=$page.url.origin;
            // console.log("$facility_id",$facility_id.facility_id_number);
            ///////////////pravesh properties//////////////
            let get_pravesh_properties_response =
                await get_pravesh_properties_method();
            // console.log(
            //     "get_pravesh_properties_response",
            //     get_pravesh_properties_response
            // );
            try{
            if (get_pravesh_properties_response.body.status == "green") {
                // console.log("get_pravesh_properties_response",get_pravesh_properties_response)
                sorting_pravesh_properties(
                    get_pravesh_properties_response.body.data
                );
                if($pravesh_properties.properties.offer_letter_required_associates.includes($facility_data_store.facility_type) && admin == true){
                       show_upload_btn = true;
                   }
                   for(let i=0;i < show_fac_array.length;i++){
                       
                       if(show_upload_btn == true && $pravesh_properties.properties.offer_letter_not_required_tags.includes(show_fac_array[i].tag_id)){
                           remove_upload_btn = true;
                       } 
                       if($pravesh_properties.properties.adhoc_facility_tag.includes(show_fac_array[i].tag_id)){
                           is_adhoc_facility = true;
                       }
                   }
                //    console.log("offer_letter_required_associates",$pravesh_properties.properties.offer_letter_required_associates)
                if($pravesh_properties.properties.default_org_app_password[0]){
                    facility_password = $pravesh_properties.properties.default_org_app_password[0]
                }
                
                let bank_details_req_fac = [];
                bank_details_req_fac = ($pravesh_properties.properties.bank_section_required_associates);
                new_arr = bank_details_req_fac.concat($pravesh_properties.properties.pan_required_associates);
                   
                new_arr =[...new Set(new_arr)];
            } 
            else {
                toast_type = "error";
                toast_text = "Error in fetching pravesh properties";
            }
            //////////////////////////////////////////////////////////
        }
        catch(err){
            toast_type = "error";
            toast_text = err;
        }
    
    
            let userdetails = await logged_user();
            
            try{
                if(userdetails.body.status == "green"){
                    for(let i=0;i<userdetails.body.data.user.roles.length;i++){
                        // 
                            if(userdetails.body.data.user.roles[i].role == "ROLE_ITADMIN"
                        || userdetails.body.data.user.roles[i].role == "ROLE_VMT" 
                        || userdetails.body.data.user.roles[i].role == "ROLE_VMT_ADMIN"
                        || userdetails.body.data.user.roles[i].role == "ROLE_HR"){
                            admin = true
                        }
                        else if(userdetails.body.data.user.roles[i].role == "ROLE_ITADMIN"){
                            itadmin = true
                        }
                    }
    
                }
            }
            catch(err) {
                toast_type = "error";
                toast_text = "Cannot get user details";
            }
    
            let bank_details_res = await bank_details();
            try{
               
                if(!bank_details_res){
                    
                    // console.log("No Data Found")
                    bank_values_from_store.modified_by="-";
                    bank_new_date="-";
                    bank_values_from_store.bank_name="-";
                    bank_values_from_store.account_number="-";
                    bank_values_from_store.ifsc_code="-";
                    bank_values_from_store.branch_name="-";
                    bank_values_from_store.branch_pin_code="-";
                    bank_values_from_store.bank_type="-";
                }
    
                else{
                    
                    // console.log("VALUES IN BANK DETAILS")
                    $bank_data_to_store.bank_details_data = bank_details_res;
                    bank_data_to_store.subscribe((value) => {
                        bank_values_from_store = value.bank_details_data;
                    });
                    let bank_date_format = new Date(bank_values_from_store.modified);
                    bank_new_date = get_date_format(bank_date_format,"dd-mm-yyyy-hh-mm");
                    bank_values_from_store.account_number= bank_values_from_store.account_number.replace(/.(?=.{4})/g, '*');;
                    
                    }
                }
            catch(err) {
                
                toast_type = "error";
                toast_text = err;
            }
    
            ///Org Details
            let get_org_data_res =  await get_client_org_mapping();
                try {
                if(get_org_data_res.body.status == "green"){
                    for(let i=0;i<get_org_data_res.body.data.length;i++){
                        
                        if($facility_data_store.org_id == get_org_data_res.body.data[i].org_id){
                            org_name = get_org_data_res.body.data[i].org_name;
                        }
                       
    
                        // org_data_arr.push({"org_id":get_org_data_res.body.data[i].org_id,"org_name":get_org_data_res.body.data[i].org_name})
                    }
                    // org_data_arr = org_data_arr;
                    
                }
                else{
                    toast_type = "error";
                    toast_text = "No client Data";
                }
                } catch(err) {
                    toast_type = "error";
                    toast_text = err;
           
                }
                ///////Org details ends here
    
    
            // let cheque_details_res = await cheque_details();
            // try{
                
            //     if(cheque_details_res.body.status == "green" && cheque_details_res != "null"){
                
            //     $cheque_data_to_store.cheque_details_data = cheque_details_res.body.data;
                
            //     cheque_data_to_store.subscribe((value) => {
            //         cheque_values_from_store = value.cheque_details_data;
            //     });
            //     }
            //     // console.log("cheque_values_from_store",cheque_values_from_store)
            //     // cheque_values_from_store=cheque_values_from_store
            // }
            // catch(err) {
               
            //     toast_type = "error";
            //     toast_text = err;
                
            // }
        
            /////////bank details/////////////
            let facility_document_res = await facility_document();
            try{
                
                if(facility_document_res != "null"){
                    
                
                $documents_store.documents = facility_document_res.body.data
                $duplicate_documents_store.documents = facility_document_res.body.data;
                // console.log("duplicate document store",$duplicate_documents_store)
    
                // console.log("documents_store",$documents_store)
                // for(let i=0;i < $documents_store.length;i++){
                //     console.log("Document data from store",$documents_store[i].doc_type);
                // }
    
                facility_document_data = facility_document_res.body.data;
                for (var i = 0; i < facility_document_data.length; i++) {
                    let doc_date_format = new Date(facility_document_data[i].creation);

                    

                    let doc_modified_format = new Date(facility_document_data[i].modified);
                    let doc_creation_date = get_date_format(doc_date_format,"dd-mm-yyyy-hh-mm");
                    let doc_modified_date = get_date_format(doc_modified_format,"dd-mm-yyyy-hh-mm");
                    facility_document_data[i].creation = doc_creation_date
                    facility_document_data[i].modified = doc_modified_date
                    facility_document_data = facility_document_data.sort((a, b) => new Date(b.modified) - new Date(a.modified));
                    
                   
                    
                    if(facility_document_data[i].doc_type == "pan-photo"){
                        if(facility_document_data[i].doc_number){
                            changed_pan_num = facility_document_data[i].doc_number.replace(/.(?=.{4})/g, '*');
                        }
                        pancard_obj = {pan_num : facility_document_data[i].doc_number,
                        pan_attach : facility_document_data[i].file_url,
                        pan_name : facility_document_data[i].file_name,
                        pan_verified : facility_document_data[i].verified,
                        pan_rejected : facility_document_data[i].rejected};
                        
                    }
                    
                    else if(facility_document_data[i].doc_type == "aadhar-id-proof"){
                        // console.log("Inside aadhar id proof")
                        if(facility_document_data[i].doc_number){
                            changed_aadhar_num = facility_document_data[i].doc_number.replace(/.(?=.{4})/g, '*');
                        }
                        aadhar_obj = {aadhar_num : facility_document_data[i].doc_number,
                        aadhar_attach : facility_document_data[i].file_url,
                        aadhar_name : facility_document_data[i].file_name,
                        aadhar_verified : facility_document_data[i].verified,
                        aadhar_rejected : facility_document_data[i].rejected};
                        
                    }
                    else if(facility_document_data[i].doc_type == "fac-photo"){
                        // console.log("Inside pass photo")
                        fac_photo_obj={
                        profile_url : facility_document_data[i].file_url,
                        profile_verified : facility_document_data[i].verified,
                        profile_rejected : facility_document_data[i].rejected};
                    }
                    else if(facility_document_data[i].doc_type == "addproof-photo"){
                        // console.log("Inside addproof photo")
                        addproof_obj = {address_name : facility_document_data[i].file_name,   
                        address_url : facility_document_data[i].file_url,
                        address_verified : facility_document_data[i].verified,
                        address_rejected : facility_document_data[i].rejected};
                    }
                    else if(facility_document_data[i].doc_type == "can-cheque"){
                        // console.log("Inside can cheque")
                        can_cheque_obj.push = {can_cheque_name : facility_document_data[i].file_name,
                        can_cheque_url : facility_document_data[i].file_url,
                        can_cheque_verified : facility_document_data[i].verified,
                        can_cheque_rejected : facility_document_data[i].rejected};
                    }
                    else if(facility_document_data[i].doc_type == "dl-photo"){
                        // console.log("Inside dl photo")
                        if(facility_document_data[i].doc_number){
                            changed_dl_num = facility_document_data[i].doc_number.replace(/.(?=.{4})/g, '*');
                        }
                        dl_photo_obj = {dl_lic_name : facility_document_data[i].file_name,
                        dl_lic_num : facility_document_data[i].doc_number,
                        dl_lic_url : facility_document_data[i].file_url,
                        dl_verified : facility_document_data[i].verified,
                        dl_rejected : facility_document_data[i].rejected};
                    }
                    else if(facility_document_data[i].doc_type == "newOffFile"){
                        // console.log("Inside newOffFile")
                        new_off_file_obj = {offer_name : facility_document_data[i].file_name,
                        offer_url : facility_document_data[i].file_url,
                        offer_verified : facility_document_data[i].verified,
                        offer_rejected : facility_document_data[i].rejected};
                        
                    }
                    else if(facility_document_data[i].doc_type == "voter-id-proof"){
                        // console.log("Inside voter id proof")
                        if(facility_document_data[i].doc_number){
                            changed_voter_num = facility_document_data[i].doc_number.replace(/.(?=.{4})/g, '*');
                        }
                        voter_id_object = {voter_id_number : facility_document_data[i].doc_number,
                        };
                        
                    }
                    // else{
                    //     toast_type = "error";
                    //     toast_text = "No Document Found";
                    // }
                }
                console.log("facility_document_data",facility_document_data)
               
               
                
            }
            }
            catch(err) {
           
            toast_type = "error";
            toast_text = err;
            }

            let session_user_response = await get_current_user_function();
            if(session_user_response.body.status == "green"){
                // console.log("current user response",session_user_response.body.data.user);
                $current_user.email = session_user_response.body.data.user.email;
                $current_user.name = session_user_response.body.data.user.name;
                $current_user.username = session_user_response.body.data.user.username;

            }
            console.log("current user store",$current_user);
           
    
            let fac_tag_res = await show_fac_tags($facility_data_store.facility_type);
            
            try {
                    if(fac_tag_res.body.data.length != 0){
                        show_fac_array = fac_tag_res.body.data;
                        for(let i=0;i < show_fac_array.length;i++){
                            if( i == show_fac_array.length-1){
                                
                                tags_for_ass_arr.push(show_fac_array[i].tag_name)
                            }
                            else{
                                tags_for_ass_arr.push(show_fac_array[i].tag_name+",")
                            }
                        }
                        tags_for_ass_arr=tags_for_ass_arr
                    }
                }
            catch(err){
                toast_type = "error";
                toast_text = err;
            }
    
            //////////city_data/////////////
            let loc_data_res =  await get_loc_scope();
            try {
            if(loc_data_res.body.status == "green"){
                 for(let i=0;i<loc_data_res.body.data.length;i++){
                    city_data.push(loc_data_res.body.data[i].location_name);
                    scope_data.push(loc_data_res.body.data[i]);
                }
                city_data = city_data;
                scope_data = scope_data;
                
                for(let i=0;i<scope_data.length;i++){
                    gst_city_link_state = scope_data[i].location_state;
                    gst_city_loc_id = scope_data[i].location_id;
                    gst_state_code = scope_data[i].state_code;
                }
            }
            else{
                toast_type = "error";
                toast_text = "No City Data";
            }
            
        } catch(err) {
            toast_type = "error";
            toast_text = loc_data_res.body.message;
           
        }
    
    
            let facility_data_res = await facility_data();
            try{
                if(facility_data_res != "null"){
                  
            facility_data_store.set(
                JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
            
            )
    
            duplicate_facility_data_store.set(
                JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
            )
            
            let id_date_format = new Date($facility_data_store.details_updated_on);
            id_new_date = get_date_format(id_date_format,"dd-mm-yyyy-hh-mm");
            console.log("facility_data",$facility_data_store);
            let temp_date = $facility_data_store.date_of_birth;
            console.log("temp date date of birth", temp_date);
            let temp = new Date(temp_date);
            console.log("temp", temp);
            $facility_data_store['dob'] = get_date_format(temp, "dd-mm-yyyy");
            
            // new_fac_remarks = $facility_data_store.remarks.split("\n");
            // console.log("new_fac_remarks",new_fac_remarks)
            
            let new_facility_date_format = new Date($facility_data_store.creation);
            facility_created_date = get_date_format(new_facility_date_format,"dd-mm-yyyy-hh-mm");
            
            let new_doc_date_format = new Date($facility_data_store.creation);
            facility_doc_date =get_date_format(new_doc_date_format,"dd-mm-yyyy-hh-mm");
            
            let facility_date_format = new Date($facility_data_store.modified);
            facility_modified_date = get_date_format(facility_date_format,"dd-mm-yyyy-hh-mm");
            
    
            
    
                if($facility_data_store.status.includes("Rejected")){
                   
                    $facility_data_store.status = "Rejected";
                    status_name = $facility_data_store.status;
                }
                if ($facility_data_store.password == "" || facility_password == "") {
                    facility_password = "ntex@123";
                }
                for (var j = 0;j < $facility_data_store.addresess.length;j++){
                    for(let k=0;k<scope_data.length;k++){
                        if($facility_data_store.addresess[j].state == scope_data[k].location_state){
                            gst_doc_type[j] = "gst-certificate-" + scope_data[k].state_code;
                        }
                    }
                    gst_doc_type=gst_doc_type
                    
                    if ($facility_data_store.addresess[j].default_address == "1") {
                        facility_address =$facility_data_store.addresess[j].address;
                        facility_postal =$facility_data_store.addresess[j].postal;
                        city = $facility_data_store.addresess[j].city;
                        location_id = $facility_data_store.addresess[j].location_id;
                        // console.log("location_id",location_id)
                        // console.log("city",city)
    
                    }
                }
                console.log("facility_document_data",facility_document_data)
                
                for (var i = 0; i < facility_document_data.length; i++) {
                    for(let j=0; j<gst_doc_type.length;j++){
                        if(facility_document_data[i].doc_type == gst_doc_type[j]){
                            gst_doc_obj = facility_document_data[i];
                            
                            console.log("gst_doc_obj",gst_doc_obj)
                            gst_doc_arr.push(gst_doc_obj);
                        }
                    }
                }
                gst_doc_arr=gst_doc_arr;
                console.log("gst_doc_arr onboard",gst_doc_arr)
            }
        }
        catch(err) {
            toast_type = "error";
            toast_text = facility_data_res.body.message;
            
            }
    
        let bgv_pass_data=[
            $facility_data_store.org_id,
            $facility_data_store.station_code,
            $facility_data_store.facility_type,
        ]    
    
        // facility_id char decrease for audit trail
        
        // if($facility_data_store.facility_id.length > 30){
        //     $facility_data_store.facility_id = $facility_data_store.facility_id.slice(0, 30).concat('...');
        // }
        // else if($facility_data_store.facility_name.length > 30){
        //     $facility_data_store.facility_name = $facility_data_store.facility_name.slice(0, 30).concat('...');
        // }
    // facility_id char decrease for audit trail
    
        let bgv_init_res = await facility_bgv_init(bgv_pass_data);
        // console.log("bgv_inittt",bgv_init_res)
        try{
            if (bgv_init_res.body.status == "green"){
                showbtn = 1;
                $bgv_config_store = bgv_init_res.body.data
            }
            console.log("bgv_config_store here",$bgv_config_store)
        }
        catch(err){
            toast_type = "error";
            toast_text = err;
        }
    
        all_tags_res = await all_facility_tags($facility_data_store.name);
        
        try {
            if(all_tags_res.body.status == "green"){
                for(i=0;i < all_tags_res.body.data.length;i++){
                    all_tags_data.push(all_tags_res.body.data[i].tag_name);
                    all_tags_obj[all_tags_res.body.data[i].tag_name] = all_tags_res.body.data[i].tag_description;
                }
                all_tags_data = all_tags_data;
            }
        } 
        catch(err) {
            toast_type = "error";
            toast_text = all_tags_res.body.message;
        }
    
    
        let tag_res = await show_fac_tags($facility_data_store.facility_type);
            
            try {
                show_spinner = true;
                if(tag_res.body.data.length != 0){
                    show_spinner = false;
                    show_fac_array = tag_res.body.data;
                    for(let i=0;i < show_fac_array.length;i++){
                        
                        let new_date =new Date(show_fac_array[i].creation)
                        
                        show_fac_array[i].creation=new_date;
                        // console.log("new_date",new_date);
                    }
                    show_fac_array.sort(function(a, b) {
                    if (a.creation > b.creation) return -1;
                    if (a.creation < b.creation) return 1;
                    return 0;
                    });
    
                    for(let i=0;i < show_fac_array.length;i++){
                    let show_creation_date =get_date_format(show_fac_array[i].creation,"yyyy-mm-dd")
                    show_fac_array[i].creation=show_creation_date;
                    }
                }
                else{
                    show_spinner = false;
                   
                }
            } 
            catch(err) {
                toast_type = "error";
                toast_text = err;
            
             }
        show_spinner = false;
        
    }); 
    function check_facility_status(message) {
        if (!$facility_data_store.status && $facility_data_store.status != undefined && $facility_data_store.is_blacklisted == 1) {
            
            if (message != undefined){
                toast_text = message;
                toast_type = "error";
            }
            else{
                toast_text = "Request not allowed for Blacklisted Facility";
                toast_type = "error";
                return false;
            }
        }
            // toast_text = message;
            // toast_type = "error";
            // return true;
            
        }
    // async function child_select_fun(){
            
    //         var rows = document.getElementById("check_tbody")[0].rows;
    //             for(var i=0;i<rows.length;i++){
    //                 console.log("check_sel_id inside")
    //             }
    //     }
        async function link_child(data){
            if (check_facility_status("Add Child Facilities not allowed for Deactive/Blacklisted Facility")) {
            return;
            }
            show_spinner = true;
            console.log("here inside child")
            console.log("sjhow spin ner",show_spinner)
            let client_det_res = await client_details(data);
            try{
                if(client_det_res.body.status == "green"){
                    show_spinner = false;
                    for(let i=0;i<client_det_res.body.data.length;i++){
                        for(let j=0;j<client_det_res.body.data.length;j++){
                        client_det_arr.push(client_det_res.body.data[j]);
                        
                        }
                    }
                    client_det_arr=client_det_arr;
                    items = client_det_arr;
                    paginatedItems = paginate({ items, pageSize, currentPage })
                    
                }
                else{
                    show_spinner = false;
                }
            }
            catch(err){
                show_spinner = false;
                toast_type = "error";
                toast_text = err;
            }
            
        }
    
        function closeViewModel(){
           
            ////for new doc model//////
            document.getElementById("img_model").style.display = "none";
            document_desc ="";
            document.getElementById("selected_doc_type").selectedIndex = "-1";
            
            document.getElementById("document_url").value = "";
            document_name = ""
            doc_cat_sel_msg = ""
            doc_det_msg = ""
            new_doc_upload_message = ""
            ////for new doc model//////
    
            document.getElementById("modalid").style.display = "none";
    
        }
        function close_docs(){
            modalid.style.display = "none";
        }
        function closeApproveViewModel(){
            img_model_approve_rej.style.display = "none";
            document.getElementById("img_model").style.display = "none";
        }
        function openViewModel(data,doc_number){
            console.log("Inside functin")
            img_model_approve_rej.style.display = "block";
            console.log("view clicked")
            if(data == "new_doc"){
                console.log("inside new_doc view")
                
                for(let i=0;i<facility_document_data.length;i++){
                    // console.log("inside for view new_doc")
                    if(doc_number == facility_document_data[i].doc_category){
                        // console.log("inside if")
                        // console.log("file p[ath and image",$page.url.origin+facility_document_data[i].file_url)
                        image_path = $page.url.origin+facility_document_data[i].file_url;
                        // document.getElementById("doc_img_model_url").getAttribute('src',$page.url.origin+facility_document_data[i].file_url);
                        // console.log("IMAGE path b4")
                        // console.log("IMAGE PATH",facility_document_data[i].file_url)
                        alt_image = "uploaded document";
                        document_type = facility_document_data[i].doc_type;
                        document_number = facility_document_data[i].doc_number;
                    }
                }
            }
            document.getElementById("img_model").style.display = "block";
            if(data == "aadhar"){
                image_path = $page.url.origin+aadhar_obj.aadhar_attach;
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+aadhar_obj.aadhar_attach);
                alt_image = "aadhar proof";
            }
            else if(data == "pan"){
                image_path = $page.url.origin+pancard_obj.pan_attach;
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+pancard_obj.pan_attach);
                alt_image = "pan-card proof";
            }
            else if(data == "address"){
                image_path = $page.url.origin+addproof_obj.address_url;
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+addproof_obj.address_url);
                alt_image = "address proof";
            }
            else if(data == "licence"){
                image_path = $page.url.origin+dl_lic_attach;
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+dl_lic_attach);
                alt_image = "driving licence proof";
            }
            else if(data == "offer"){
                image_path = $page.url.origin+new_off_file_obj.offer_url;
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+new_off_file_obj.offer_url);
                alt_image = "offer letter proof";
            }
            else if(data == "can_cheque"){
                image_path = $page.url.origin+can_cheque_obj.can_cheque_url;
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+can_cheque_obj.can_cheque_url);
                alt_image = "cancel cheque proof";
            }
            else if(data == "cheque_disp"){
                image_path = $page.url.origin+cheque_disp_obj.cheque_disp_url;
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+new_cheque.file_url);
                alt_image = "cheque proof";
            }
            for(let i = 0;i<gst_doc_arr.length;i++){
                if(data == "mult_gsts"){
                    if(doc_number == gst_doc_arr[i].gst_doc_num)
                    image_path = $page.url.origin+gst_url[i];
                    // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+gst_url[i]);
                    alt_image = "gst proof";
                }
            }
            
            
            // for(let i = 0;i<gst_doc_arr.length;i++){
            //     if(data == "mult_gsts"){
            //         if(doc_number == gst_doc_arr[i].gst_doc_num)
            //         document.getElementById("img_model_url").getAttribute('src',gst_url[i]);
            //         alt_image = "gst proof";
            //     }
            // }
            // console.log("gst_doc_arr in onboard",gst_doc_arr)
            
        }
        // async function gst_edit_click(address,city,state,gstn,gst_url,gst_name){
        //     // console.log("gst_edit_click",address,city,state,gstn,gst_url,gst_name);
        //     if(temp2 != "gst2"){
        //         temp2 = "gst2";
        //     }
        //     else{
        //         temp2 = temp2;
        //     }
        //     gst_address = address;
        //     gst_city_select = city;
        //     gst_city_link_state = state;
        //     gst_number = gstn;
        //     gst_file = gst_url;
        //     gst_img = gst_name;
        // }
        ////////not used////////////
        function SearchClick() {
            searchBox.style.display = "block";
            supplierCount.style.display = "none";
            SearchClick.style.display = "none";
            searchBox.style.width = "100%";
            inputboxsearch.style.width = "100%";
        };
    
        function closeSearch() {
            supplierCount.style.display = "block";
            searchBox.style.display = "none";
            SearchClick.style.display = "block";
        };
    
        const enterKeyPress = e => {
            if (e.charCode === 13) {
                filterResults();
            }
        };
    
        async function clearedSearchFunc(){
            let client_det_res=await client_details(city_select);
            try{
                show_spinner = true;
                if(client_det_res.body.status == "green"){
                    show_spinner = false;
                    for(let i=0;i<client_det_res.body.data.length;i++){
                        for(let j=0;j<client_det_res.body.data.length;j++){
                            client_det_arr.push(client_det_res.body.data[j]);
                        }
                    }
                    paginatedItems=client_det_arr;
                    result = true;
                    
                }
                else{
                    show_spinner = false;
                }
            }
            catch(err) {
                show_spinner = false;
                toast_type = "error";
                toast_text = err;
            }
        }
        async function filterResults(){
            let searchArray= [];
            for(let searchK  of paginatedItems){
                // console.log("inside filter Results",searchK.facility_name)
                const search_client = searchK.facility_name
                 result=search_client.toLowerCase().includes(searchTerm.toLowerCase());
                if(result === true){
                searchArray = [...searchArray,searchK]
                }
            }
            paginatedItems = searchArray;
        }
    
    
        //////not used/////////////
        
    /////////bank details//////;///////
    
        const onFileSelected = (e,doctext) => {
            show_spinner = true;
            let img = e.target.files[0];
            if (img.size <= allowed_pdf_size) {
                console.log("img", img);
                
                if(doctext == "gst_upload"){
                    gst_img = img.name;
                    show_spinner = false;
                }
                else if(doctext == "cheque_upload"){
                    show_spinner = false;
                cheque_img = img.name;
                }
                else if(doctext == "new_doc_upload"){
                    show_spinner = false;
                document_name = img.name;
                }
    
                var reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = function () {
                file_data = reader.result;
                console.log("reader",reader.result);
                
                if(doctext == "gst_upload"){
                    show_spinner = false;
                    gst_data = reader.result;
                    // console.log("photo_data",reader.result);
                    toast_text = "File selected";
                    toast_type = "success";
                }
                else if(doctext == "cheque_upload"){
                    show_spinner = false;
                    cheque_data = reader.result;
                    toast_text = "File selected";
                    toast_type = "success";
                }
                else if(doctext == "new_doc_upload"){
                    document_url = reader.result;
                    show_spinner = false;
                    toast_text = "File selected";
                    toast_type = "success";
                }
                }
                    reader.onerror = function (error) {
                    console.log("Error: ", error);
                    }
            }
            else {
            alert(
                "File size is greater than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB. Please upload a file less than " +
                    Number(allowed_pdf_size / 1048576) +
                    "MB ."
            );
        };
            
        }
    
        // async function cheque_button_click() {
        //     // show_spinner = true;
        //     let new_cheque_date = new Date(cheque_date)
        //     if(!bank_name.match(text_pattern)){
        //     bank_name_message = "Invalid Bank Name";
        //     return
        //     }
        //     if(!type){
        //         type_message = "Invalid type";
        //         return;
        //     }
        //     if(!cheque_date){
        //         cheque_date_message = "Invalid Cheque Date";
        //         return;
        //     }
        //     if(!cheque_number || isNaN(cheque_number)){
        //         cheque_number_message = "Invalid Cheque Number";
        //         return;
        //     }
        //     if(!amount || isNaN(amount)){
        //         amount_message = "Invalid Amount";
        //         return;
                
        //     }
            
        //     if(!checkupload){
        //         cheque_upload_message = "Invalid Cheque Upload"
        //         return;
        //     }
            
        //         const cheque_details_form = {
        //             bank_name,
        //             type,
        //             cheque_date:(get_date_format(new_cheque_date,"yyyy-mm-dd")),
        //             cheque_number,
        //             amount,
        //             recrun_number,
        //             file_number,
        //             file_data,
        //             file_name:img_name,
        //             facility_id:($facility_id.facility_id_number),
        //         };
        //         let cheque_add_res = await addnew_cheque_details(cheque_details_form);
        //         // console.log("cheque_add_res",cheque_add_res);
        //         try{
        //             show_spinner = true;
        //             if(cheque_add_res.body.status== "green"){
        //                 show_spinner = false;
        //                 toast_text = "Cheque Details Added Successfully";
        //                 toast_type = "success";
        //                 let cheque_details_res = await cheque_details();
        //                 try{
        //                     if(cheque_details_res.body.status == "green" && cheque_details_res != "null"){
                            
        //                     $cheque_data_to_store.cheque_details_data = cheque_details_res.body.data;
                            
        //                     cheque_data_to_store.subscribe((value) => {
        //                         cheque_values_from_store = value.cheque_details_data;
        //                     });
        //                     }
                            
        //                     // cheque_values_from_store=cheque_values_from_store
        //                 }
        //                 catch(err) {
        //                     show_spinner = false;
        //                     toast_type = "error";
        //                     toast_text = err;
                            
        //                 }
    
        //             }
        //             else{
        //                 show_spinner = false;
        //                 toast_text = "Error in Adding Cheque Details";
        //                 toast_type = "danger";
        //             }
    
        //         }
        //         catch(err){
        //             show_spinner = false;
        //             toast_text = "Error in Adding Cheque Details";
        //             toast_type = "danger";
        //         }
        // }
        
        
    
        /////////bank details/////////////
    
        function editWorkDetail() {
            let replaceState = false;
            goto(routeNext, { replaceState });
        }
        
        async function routeToBgv() {
            let replaceState = false;
            goto("bgv?unFacID="+$facility_id.facility_id_number, { replaceState });
            
        }
        async function initiate_popup(){
            initiateBgv.style.display = "block";
        }
        function initiate_deact_popup(){
            toast_type = "error";
            toast_text = "Deactive Facility cannot Initiate Background Verification";
        }
        async function confirm_initiate_bgv(){
            let confirm_initiate_bgv_res = await initiateBGV();
            try {
                if(confirm_initiate_bgv_res.body.status == "green"){
                    toast_type = "success";
                    toast_text = confirm_initiate_bgv_res.body.message;
                    let replaceState = false;
                    goto("bgv?unFacID="+$facility_id.facility_id_number, { replaceState });
    
                }
                
            } catch (error) {
                toast_type = "error";
                toast_text = error;
            }
        }
        
       
    
        function myBtn() {
            associateModal.style.display = "block";
        }
    
        function goto_vmt_verify(){
            goto("vmtverify");
        }
    //     async function tagAddRemove() {
    //         addRemoveModal.style.display = "block";
    //         let tag_res = await show_fac_tags($facility_data_store.facility_type);
    //         console.log("tag_res",tag_res);
    //         try {
    //             show_spinner = true;
    //             if(tag_res.body.data.length != 0){
    //                 show_spinner = false;
    //                 show_fac_array = tag_res.body.data;
    //                 console.log("show_fac_array",show_fac_array)
    //                 for(let i=0;i < show_fac_array.length;i++){
                        
    //                     let new_date =new Date(show_fac_array[i].creation)
                        
    //                     show_fac_array[i].creation=new_date;
    //                     // console.log("new_date",new_date);
    //                 }
    //                 show_fac_array.sort(function(a, b) {
    //                 if (a.creation > b.creation) return -1;
    //                 if (a.creation < b.creation) return 1;
    //                 return 0;
    //                 });
    
    //                 for(let i=0;i < show_fac_array.length;i++){
    //                 let show_creation_date =get_date_format(show_fac_array[i].creation,"yyyy-mm-dd")
    //                 show_fac_array[i].creation=show_creation_date;
    //                 }
    //             }
    //             else{
    //                 show_spinner = false;
    //                 toast_type = "error";
    //                 toast_text = "No Tags Found";
    //             }
    //         } 
    //         catch(err) {
    //             toast_type = "error";
    //             toast_text = err;
            
    //          }
    
    //         let service_vend_res = await service_vendor();
    //         console.log("service_vend_res",service_vend_res)
    //         try {
    //             show_spinner = true;
    //             if(service_vend_res.body.status == "green"){
    //                 show_spinner = false;
    //                 for(let i=0;i<service_vend_res.body.data.length;i++){
    //                     if(service_vend_res.body.data[i].location_id == location_id){
    //                         // tag_data_obj[service_vend_res.body.data[i].vendor_id] = service_vend_res.body.data[i].vendor_name;
    //                         tag_data_obj.push(service_vend_res.body.data[i]);
    //                     }
    //                 }
    //                 tag_data_obj = tag_data_obj;
    //                 console.log("tag_data_obj",tag_data_obj)
    //             }
    //             else{
    //                 show_spinner = false;
    //                 toast_type = "error";
    //                 toast_text = "No Vendor Found";
    //             }
    //         }
    //         catch(err) {
    //             show_spinner = false;
    //             toast_type = "error";
    //             toast_text = err;
    //         }
    
    
    //     }
    //     async function handleTagClick(){
    //     let new_tag_id
    //     try {   
    //     //     if(all_tags_res.body.status == "green"){
            
    //         for(let i=0; i < all_tags_res.body.data.length; i++){
    //             // console.log("INDISDE FOR LOOPform_data from html",select_tag_data,all_tags_res.body.data[i].tag_name)
    //             if(select_tag_data == all_tags_res.body.data[i].tag_name){
    //                 new_tag_id = all_tags_res.body.data[i].tag_id;
    //             }
                
    //         }
    //         if(!select_tag_data){
    //             selectTag = 1;
    //             if(!tag_remark){
    //             addRemark = 1;
    //                 if(!serv_ch_data){
    //                     selectsearch=1;
    //                 }
    //             }   
    
    //         }
    //         else{
    //             console.log("select_tag_data",select_tag_data)
    //             show_fac_array = [];
    //             console.log("serv_ch_data",serv_ch_data)
    //             let submit_fac_res = await submit_fac_tag_data(new_tag_id,select_tag_data,tag_date,tag_remark,serv_ch_data)
    //             try {
    //                 show_spinner = true;
    //                 if(submit_fac_res.body.status == "green"){
    //                     show_spinner = false;
    //                     let temp_res = await show_fac_tags($facility_data_store.facility_type);
    //                     show_fac_array = temp_res.body.data;
    //                     for(let i=0;i < show_fac_array.length;i++){
    //                         let new_date =new Date(show_fac_array[i].creation)
    //                         show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
    //                         show_fac_array[i].creation=show_creation_date;
    //                     }
    //                     show_fac_array = show_fac_array;
    //                 }
    //                 // console.log("submit_fac_res.body",submit_fac_res.body)
    //                 else if(submit_fac_res.body.message == "Tag already exist..!"){
    //                     show_spinner = false;
    //                     console.log("Cannot Add Tag already exist..!")
    //                 }
    //             }
    //                 catch(err) {
    //                     show_spinner = false;
    //                     toast_type = "error";
    //                     toast_text = err;
    //                 }
    //         }
    
    //     }
    //     catch(err) {
    //         toast_type = "error";
    //         toast_text = err;
    //     }
          
    // }
    
    //     async function removeTag(tag_id,tag_name,owner,tag_status){
    //         show_fac_array = [];
    //         let fac_id
    //         if(owner == $facility_data_store.owner){
    //                 fac_id = $facility_data_store.name
    //                 console.log("fac_id",fac_id)
    //         }
    //         let remove_tag_res = await remove_tag(fac_id,tag_id,tag_name);
    //         if(remove_tag_res.body.status == "green")
    //         {
    //         let temp_res = await show_fac_tags($facility_data_store.facility_type);
    //         try {
    //                 show_fac_array = temp_res.body.data;
                    
    //                 // console.log("show_fac_array IN remove",show_fac_array)
    //                 for(let i=0;i < show_fac_array.length;i++){
                        
    //                     let new_date =new Date(show_fac_array[i].creation)
    //                     show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
    //                     show_fac_array[i].creation=show_creation_date;
                       
    //         }
           
    //     }
    //         catch(err) {
    //         console.log("ERROR")
            
    //          }
    
    //     }
    // }
    
    
    //    async function tagAuditFunc(){
    //         temp = "tag";
    //         let tag_audit_res =await tag_audit_trail();
    //         try {
    //             if(tag_audit_res.body.status == "green"){
                
    //             tag_data_arr = tag_audit_res.body.data
    //             for(let i=0;i < tag_data_arr.length;i++){
    //                 let new_date =new Date(tag_data_arr[i].creation)
    //                 show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
    //                 tag_data_arr[i].creation=show_creation_date;
    //             }
    //             // console.log("TAG DATA ARRA",tag_data_arr)
    //             tag_data_arr = tag_data_arr;
                   
    //         }} catch(err) {
    //         console.log("ERROR")
            
    //          }
           
    //     }
    
    //     function clear() {
    //         addRemoveModal.style.display = "none";
    //     }
    
        function close() {
            associateModal.style.display = "none";
        }
    
        async function allDoc() {
            let doc_arr_from_res = [];
            modalid.style.display = "block";
            let get_pravesh_properties_res = await get_pravesh_properties_method();
            
    
            try{
                
                if(get_pravesh_properties_res.body.status == "green"){
                    
                    doc_arr_from_res = get_pravesh_properties_res.body.data.document_types.split("\n")
                    console.log("doc_arr_from_res",doc_arr_from_res)
    
    
                for (var k = 0; k < doc_arr_from_res.length; k++) {
                        var ele = doc_arr_from_res[k];
                        var doc_name = ele.split("=")[0]
                        var doc_val = ele.split("=")[1]
                            doc_type_name.push({"doc_name":doc_name ,"doc_value":doc_val});
                        }
                        doc_type_name = doc_type_name
                }
            }
            catch(err){
                toast_type = "error"
                toast_text = err
            }
        }
    
        // routeBgv = "bgv?unFacID="+$facility_id.facility_id_number;
        routeBgv = "bgv"
        routeNext = "workdetails";
       
    
        async function auditTrial() {
           
            let audit_res = await audit_trail_data($facility_id.facility_id_number);
            try {
                if (audit_res.body.status == "green") {
                    audit_details_array = audit_res.body.data;
                    audit_details_array.reverse();
                    for(let i=0;i < audit_details_array.length;i++){
                    let new_date = new Date(audit_details_array[i].creation)
                    
                    audit_details_array[i].creation = get_date_format(new_date,"dd-mm-yyyy-hh-mm")
                    
                    }
                }
            } catch (err) {
                message.innerHTML = "Error is  " + err;
            }
            supplierInfoModal.style.display = "block";
        }
    
        function closeAuditTrailModal() {
            document.getElementById("supplierInfoModal").style.display = "none";
        }
        function blacklist_remark_select(){
            Blacklist_confirmation_modal.style.display = "block";
            // Basic_Reject_modal.style.display = "block";
        }
        function close_blacklist_remark(){
            Blacklist_confirmation_modal.style.display = "none";
            Basic_Reject_modal.style.display = "none";
            initiateBgv.style.display = "none";
        }
        function confirm_blacklist(){
            Basic_Reject_modal.style.display = "block";
        }
    
        async function blacklist_click(){
            console.log("inside blacklist_click")
            if (check_facility_status("Facility is already Blacklisted")) {
                return;
            }
            else{
                let blacklist_res = await blacklist_vendor(blacklist_remark);
                try {
                    if (blacklist_res.body.status == "green") {
                    toast_type = "success";
                    toast_text = blacklist_res.body.message;
                    window.location.reload();
                    }
                }
                catch (err) {
                    message.innerHTML = "Error is  " + err;
                }   
            }
        }
    
        // async function gstModel() {
        //     modalidgst.style.display = "block";
        //     let gst_details_res = await gst_details();
        //     try{
        //         if(gst_details_res != "null"){
        //             for(let i=0;i < gst_details_res.body.data.length;i++){
        //                 gst_details_data.push(gst_details_res.body.data[i]);
        //             }
        //             gst_details_data=gst_details_data;
        //             console.log("gst_details_data",gst_details_data)
        //         }
                
        //     }
        //     catch(err) {
        //         toast_type = "error";
        //         toast_text = gst_details_res.body.message;
                
        //     }
        // }
    
        // function closeGST() {
        //     modalidgst.style.display = "none";
        // }
    
        async function erpModel() {
            erpIdModel.style.display = "block";
            let erp_details_res = await erp_details();
            // console.log("erp_details_res",erp_details_res.body.data[0])
            try{
                if(!erp_details_res.body.data[0]){
                    erp_details_arr = [];
                }
                else{
                    erp_details_arr = erp_details_res.body.data[0];
                    let erp_creation_date_format = new Date(erp_details_arr.creation);
                    erp_details_res.body.data[0].creation= get_date_format(erp_creation_date_format,'dd-mm-yyyy-hh-mm');
                    console.log("erp_details_arr",erp_details_arr)
                }
            }
            catch(err){
                console.log("Error in ERP MODEL",err)
            }
        }
    
        function closeERP() {
            erpIdModel.style.display = "none";
        }
    
        // function workContract() {
        //     workContractModel.style.display = "block";
        // }
    
        // function closeWorkContract() {
        //     workContractModel.style.display = "none";
        // }
    
        // function workorganization() {
        //     workorganizationModel.style.display = "block";
        // }
    
        // function closeWorkorganization() {
        //     workorganizationModel.style.display = "none";
        // }
    
        // function chequeDetails() {
        //     chequeModel.style.display = "block";
        // }
    
        // function closechequeDetails() {
        //     chequeModel.style.display = "none";
        // }
    
        async function linkChild() {
            let no_com = document.getElementById("comma");
            console.log("no_com",no_com)
            linkChildModel.style.display = "block";
        }
    
        function linkChildModelclose() {
            linkChildModel.style.display = "none";
        }
    
        // async function gst_submit_click(){
        //     let def_add = 0;
        //     // show_spinner = true;
        //     if(!gst_address.match(text_pattern)){
        //         gst_add_message = "Enter Valid Address";
        //         return  
        //     }
        //     if(!gst_city_select){
        //         gst_city_message = "Select Valid City";
        //         return;
        //     }
        //     // console.log("gst details for gst number",gst_number,gst_state_code,pan_num,gst_number.trim().length,gst_number.substring(0, 2),gst_number.substring(2, 12),gst_number.substring(13,14))
        //     if (gst_number == undefined || gst_number.trim().length < 15 || gst_number.substring(0, 2) != gst_state_code || gst_number.substring(2, 12) != pancard_obj.pan_num || gst_number.substring(13,14) != "Z") {
        //         gst_number_message = "Invalid GST Number";
        //     return;
        //     }
        //     if(!gst_file){
        //         gst_upload_message = "Invalid File Upload"
        //         return;
        //     }
        //     if(gst_checkbox == true){
        //         def_add = 1;
        //     }
        //     else{
        //         def_add = 0;
        //     }
        //         const gst_details_form = {
        //             "address":gst_address,
        //             "city":gst_city_select,
        //             "state":gst_city_link_state,
        //             "tier":"2",
        //             "location_id":gst_city_loc_id,
        //             "default_address":def_add,
        //             "gstn":gst_number,
        //             "name":"",
        //             "address_type":"Facility Address",
        //             "doctype":"Facility Address"
        //         }
                
        //         let new_gst_payload = {
        //             "facility_id":$facility_id.facility_id_number,
        //             "address":[gst_details_form]
        //         }
        //         console.log("new_gst_payload",new_gst_payload)
                
        //         let gst_add_res = await add_gst_dets(new_gst_payload);
        //         try {
        //             if(gst_add_res.body.status == "green"){
        //                 console.log("gst_add_res",gst_add_res)
        //                 // toast_type = "success";
        //                 // toast_text = "GST Details Added Successfully";
                        
        //                 let new_doc_type = "gst-certificate-"+gst_state_code;
        //                 console.log("new_doc_type",new_doc_type)
        //                 const gst_file_data = {"documents":[{"file_name":gst_img,"doc_category":"GST Certificate","status":"created","resource_id":$facility_id.facility_id_number,"user_id":username,"doc_number":"","pod":gst_data,"doc_type":new_doc_type,"facility_id":$facility_data_store.facility_id}]}
        //                 let gst_doc_submit_res = await uploadDocs(gst_file_data);
        //                 try {
        //                     if(gst_doc_submit_res.body.status == "green"){
                                
        //                         toast_type = "success";
        //                         toast_text = "GST Details Added Successfully";
        //                     }
        //                 } catch (err) {
        //                     toast_type = err;
        //                     toast_text = "Error in Uploading GST Certificate";
        //                 }
    
        //             }
        //             else{
        //                 toast_type = "error";
        //                 toast_text = gst_add_res.body.message;
        //             }
                    
        //         } catch (err) {
        //             toast_type = "error";
        //             toast_text = "Error in Adding GST Details";
        //         }
        //     }  
     
        ////////////Pagination in Link Child///////////////
        // function next_function(){   
            
        //     let last_num_from_pages = pages.length
        //     if(mapped_pages.includes(last_num_from_pages)){
        //     }
        //     else{  
        //         for (var i = 0; i < mapped_pages.length; i++){       
        //         mapped_pages[i] = mapped_pages[i] + 1;
        //         }
        //     }
        //     // console.log("mapped_pagessss",mapped_pages)
        //     // console.log("mapped_pagessss",mapped_pages[0])
        //     pageChange(mapped_pages[2])
        // }
        
        // function previous_function(){ 
        //     let first_num_from_pages = pages[0];
        //     if(mapped_pages.includes(first_num_from_pages)){}
        //     else{
        //         for (var i = 0; i < mapped_pages.length; i++){
        //             mapped_pages[i] = mapped_pages[i] - 1;
        //         }
        //     }
        //         pageChange(mapped_pages[0])
        // }
    
        // function pageChange(pagenumber){
        //     console.log("pageChange Clicked")
        // }
        // function createPagesArray(total) {
        // let arr = []
        // for(let i = 1; i <= total; i++) {
        //     arr.push(i)
        // }
        // return arr
        // }
        async function save_document(){
            show_spinner = true;
            console.log("showspinner",show_spinner)
            let new_doc_type_name
            
            let e = document.getElementById("selected_doc_type");
           
            if(!e.selectedIndex || e.selectedIndex == "-1"){
                show_spinner = false;
                // toast_type = "error"
                // toast_text = "Please Select Document Type"
                doc_cat_sel_msg = "Please Select Document Type"
                return 
            }
            else{
                doc_cat_sel_msg = ""
            }
            var selected_doc_type_name = e.options[e.selectedIndex].text;
            console.log("selected_doc_type_name",selected_doc_type_name)
            for (let i = 0; i < doc_type_name.length; i++) {
                if(selected_doc_type_name == doc_type_name[i].doc_value){
                    new_doc_type_name  = doc_type_name[i].doc_name
                }
                
            }
            if(!selected_doc_type_name || selected_doc_type_name =="-1"){
                show_spinner = false;
                return
            }
             if(!document_desc){
                doc_det_msg = "Please Select Document Type"
                show_spinner = false;
                return
            }
            else{
                doc_det_msg = ""
            }
            if(!document_url){
                show_spinner = false;
                
                new_doc_upload_message = "Please Select Document";
                return 
            }
            else{
                show_spinner = false;
                new_doc_upload_message = ""
            }
            
            console.log("document_url",document_url)
    
            let new_doc_payload = {"documents":[{
            "file_name":document_name,
            "doc_category":selected_doc_type_name,
            "status":"created",
            "resource_id":$facility_id.facility_id_number,
            "user_id":username,
            "doc_number":"",
            "doc_type":new_doc_type_name,
            "facility_id":$facility_data_store.facility_id,
            "remarks":document_desc,
            "pod":document_url}]}
            console.log("new_doc_payload",new_doc_payload)
            let save_doc_res = await uploadDocs(new_doc_payload);
            try {
                if(save_doc_res.body.status == "green"){
                    show_spinner = false;
                    toast_type = "success"
                    toast_text = save_doc_res.body.message;
                    document_desc ="";
                    document.getElementById("selected_doc_type").selectedIndex = "-1";
                    document.getElementById("document_url").value = "";
                    document_name = ""
    
    
                    let facility_document_res = await facility_document();
                    try{
                        if(facility_document_res != "null"){
                        show_spinner = false;
                        facility_document_data = [];
                        facility_document_data = facility_document_res.body.data;
                            for(let i=0;i<facility_document_data.length;i++){
                                let doc_modified_format = new Date(facility_document_data[i].modified);
                                let doc_modified_date = get_date_format(doc_modified_format,"dd-mm-yyyy-hh-mm");
                                facility_document_data[i].modified = doc_modified_date
                                facility_document_data = facility_document_data.sort((a, b) => new Date(b.modified) - new Date(a.modified));
                                
                            
                        }
                        
                        }
                    }
                    catch(err){
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = err;
                    }
                }
            } 
            catch (err) {
                show_spinner = false;
                toast_type = "error";
                toast_text = err;
            }
        }
    
        async function docApproveRejected(doc_cat){
    
            let document_load,new_status
            console.log("doc_cat",doc_cat)
            show_spinner = true;
            if(doc_cat == "approve"){
                new_status="DV"
            }
            else if(doc_cat == "reject"){
                new_status="RJ"
            }
            document_load = {
            "resource_id":$facility_id.facility_id_number,
            "doc_number":document_number,
            "status_type":new_status,
            "status":"true",
            "doc_type":document_type
            }
            let doc_res = await approve_reject_status(document_load)
            
            try{
                if(doc_res.body.status == "green"){
                    show_spinner = false;
                    toast_text = doc_res.body.message;
                    toast_type = "success";
    
                    let facility_document_res = await facility_document();
                    try{
                        if(facility_document_res != "null"){
                        facility_document_data = [];
                        facility_document_data = facility_document_res.body.data;
                            for(let i=0;i<facility_document_data.length;i++){
                            let doc_modified_format = new Date(facility_document_data[i].modified);
                            let doc_modified_date = get_date_format(doc_modified_format,"dd-mm-yyyy-hh-mm");
                            
                            facility_document_data[i].modified = doc_modified_date
                                facility_document_data = facility_document_data.sort((a, b) => new Date(b.modified) - new Date(a.modified));
                            
                            closeApproveViewModel();
                            }
                        
                        }
                    }
                    catch(err){
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = err;
                        closeApproveViewModel();
                    }
                }
            }
            catch(err){
                show_spinner = false;
                toast_text = err;
                toast_type = "error";
            }
                
        }
        
        // async function new_doc_cat_func(data){
        //     console.log("inside new_doc_cat_func")
        //     console.log("data",data)
        // }
    
    
    </script>
    {#if show_spinner}
        <Spinner />
    {/if}
    
    <div class="mainContent ">
        <div class="breadcrumb ">
            <div class="breadcrumb-section xsl:px-p10">
                <div class="breadcrumbtextDetails breadcrumbmedia">
                    <p class="flex items-center">
                        <!-- <span class="text-textgrey pr-1 text-base xs:text-xs">Home / Workforce</span> -->
                        <span class="Username ">
                            <img src="{$img_url_name.img_name}/delivery.png" class="userIconMedia" alt="">
                            <span class="xs:hidden sm:hidden">{#if $facility_data_store.facility_name}{$facility_data_store.facility_name}{:else}-{/if}</span>
                            <span class="userDesignation">(Associate - {#if $facility_data_store.facility_type}{$facility_data_store.facility_type}{:else}-{/if} / ID - {#if $facility_data_store.name}{$facility_data_store.name}{:else}-{/if}) </span> 
                        </span>
                    </p>
                   
                    <p class="breadcrumbRight">
                        {#if is_adhoc_facility == false}
                        <a href=""> 
                            <span class="breadRightIcons" on:click={erpModel}> 
                                 ERP Details
                            </span> 
                        </a>
                        <a href=""> 
                            <span class="breadRightIcons" on:click={allDoc}> <img src="{$img_url_name.img_name}/document.png" class="pr-2"
                                    alt=""> Documents
                            </span> 
                        </a>
                        {/if}
                        
                        <a class="cursor-pointer">
                            <span class="breadRightIcons" id="SupplerModalbuttonClick" on:click={auditTrial}>
                                <img src="{$img_url_name.img_name}/audittrail.png" class="pr-2" alt=""> Audit Trial 
                            </span>
                        </a>
                        
                        
                        {#if admin == false}
                        <p></p>
                        {:else}
                        {#if is_adhoc_facility == false && $facility_data_store.status != "deactive"}
                        <span class="backlistText cursor-pointer" on:click="{blacklist_remark_select}">
                            <img src="{$img_url_name.img_name}/backlist.png" class="pr-2" alt=""> Blacklist Facility
                        </span>
                        {/if}
                        {/if}
                    </p>
                
                </div>
    
                <!-- for VMT not done-->
                <div class="onboardedBy mb-4 hidden">
                    <p class="text-sm"><span class="font-light text-grey text-sm">Onboarded By - </span>Hemant Kumar, Mulsi SP, eCommerce</p>
                    <p class="xsl:flex justify-end hidden"><a class="cursor-pointer">
                        <span class="breadRightIconsvmt" >
                            <img src="{$img_url_name.img_name}/audittrail.png" class="pr-2" alt=""> Audit Trial 
                        </span>
                    </a></p>
                </div>
    
                <div class="statusbar ">
                    <div class="leftStatus">
                        <div class="text-sm">
                            <div class="statusBarSec ">
                                
                                <div class="statusbarLeft">
                                    
                                    <p class="statusText">Status -</p>
                                    {#if $facility_data_store.status == "Active"}
                                    <p
                                    class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                    <img src="{$img_url_name.img_name}/checked.png"
                                        class="pr-2"
                                        alt=""
                                    /> {$facility_data_store.status}
                                </p>
                                    {:else if $facility_data_store.status == "Deactive"}
                                    <p
                                    class="statusContentTag font-normal text-sm  "
                                >
                                    <img
                                    img src="{$img_url_name.img_name}/redcircle.png"
                                        alt=""
                                        class="w-3 h-3 mr-2"
                                    />
                                    {$facility_data_store.status}
                                </p>
                                {:else if $facility_data_store.status == "Rejected"}
                                    <p
                                    class="statusContentTag font-normal text-sm  "
                                >
                                    <img src="{$img_url_name.img_name}/redcircle.png"
                                        alt=""
                                        class="w-3 h-3 mr-2"
                                    />
                                    Id Proof Rejected
                                </p>
                                {:else}
                                
                                <p class="statusContent font-normal xs:w-5/12">
                                    <img src="{$img_url_name.img_name}/timer.png"
                                        class="pr-2"
                                        alt=""
                                    />{$facility_data_store.status}
                                </p>
                                    {/if}
                                    <div class="hidden">
                                        <p class="statusContent font-medium italic">
                                            <img
                                                src="{$img_url_name.img_name}/circleicon.png"
                                                alt=""
                                                class="w-3 h-3 pr-2"
                                            />
                                            Verification Pending
                                        </p>
                                    </div>
                                    <div class="hidden">
                                    <p
                                        class="statusContentTag font-normal text-sm  "
                                    >
                                        <img
                                            src="{$img_url_name.img_name}/redcircle.png"
                                            alt=""
                                            class="w-3 h-3 mr-2"
                                        />
                                        Documents Rejected
                                    </p>
                                </div>
                                </div>
                                <div class="statusbarMiddle">
                                    <div class="hidden">
                                        <p
                                            class="statusContent font-normal xs:w-5/12"
                                        >
                                            <img
                                                src="{$img_url_name.img_name}/timer.png"
                                                class="pr-2"
                                                alt=""
                                            /> Address Proof
                                        </p>
                                    </div>
                                    <div class="hidden">
                                    <p
                                        class="statusContentTag text-green font-normal xs:w-5/12"
                                    >
                                        <img
                                            src="{$img_url_name.img_name}/checked.png"
                                            class="pr-2"
                                            alt=""
                                        /> Address Proof
                                    </p>
                                    </div>
    
                                    <p class="xsl:hidden">
                                        <img src="{$img_url_name.img_name}/Line.png" alt="" />
                                    </p>
                                    <div class="hidden">
                                        <p
                                            class="statusContent font-normal xs:w-5/12"
                                        >
                                            <img
                                                src="{$img_url_name.img_name}/timer.png"
                                                class="pr-2"
                                                alt=""
                                            />Offer Letter
                                        </p>
                                    </div>
    
                                    <!-- <p
                                        class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                    >
                                        <img
                                            src="{$img_url_name.img_name}/reject.png"
                                            class="pr-2"
                                            alt=""
                                        />ID Reject
                                    </p> -->
    
                                    <!-- <p class="xsl:hidden">
                                        <img src="{$img_url_name.img_name}/Line.png" alt="" />
                                    </p> -->
                                    {#if new_off_file_obj.offer_verified == "1"}
                                    <p
                                    class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                    <img
                                        src="{$img_url_name.img_name}/checked.png"
                                        class="pr-2"
                                        alt=""
                                    /> Offer letter Verified
                                </p>
                                    {:else if new_off_file_obj.offer_rejected == "1"} 
                                    <p
                                    class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                    <img
                                        src="{$img_url_name.img_name}/reject.png"
                                        class="pr-2"
                                        alt=""
                                    />Offer letter Rejected
                                </p>
                                <!-- {:else} -->
                                {:else if new_off_file_obj.offer_verified == "0" && new_off_file_obj.offer_rejected == "0"}
                                <p class="statusContent font-normal xs:w-5/12">
                                    <img
                                        src="{$img_url_name.img_name}/timer.png"
                                        class="pr-2"
                                        alt=""
                                    />Offer letter Pending
                                </p>
                                    {/if}
                                   
                                    <!-- <p>{bank_values_from_store.approved}</p> -->
                                    {#if !bank_values_from_store}
                                       <p></p>
                                        {:else}
                                       
                                       
                                            {#if bank_values_from_store.approved == "1"}
                                            <p class="xsl:hidden">
                                                <img src="{$img_url_name.img_name}/Line.png" alt="" />
                                            </p>
                                        <p
                                            class="statusContentTag text-green font-normal xs:w-5/12"
                                        >
                                            <img
                                                src="{$img_url_name.img_name}/checked.png"
                                                class="pr-2"
                                                alt=""
                                            />Bank Details Approved
                                        </p>
                                        {:else if bank_values_from_store.rejected == "1"}
                                        <p class="xsl:hidden">
                                            <img src="{$img_url_name.img_name}/Line.png" alt="" />
                                        </p>
                                        <p
                                            class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                        >
                                            <img
                                                src="{$img_url_name.img_name}/reject.png"
                                                class="pr-2"
                                                alt=""
                                            />Bank Details Rejected
                                        </p>
                                        {:else if bank_values_from_store.rejected == "0" && bank_values_from_store.approved == "0"}
                                        <p class="xsl:hidden">
                                            <img src="{$img_url_name.img_name}/Line.png" alt="" />
                                        </p>
                                        
                                        <p class="statusContent font-normal xs:w-5/12">
                                            <img
                                                src="{$img_url_name.img_name}/timer.png"
                                                class="pr-2"
                                                alt=""
                                            />Bank Verification Pending
                                        </p>
                                        {/if} 
                                    {/if}  
                                    {#if is_adhoc_facility == true}
                                    <p> - ( Adhoc )</p>
                                   {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="statusrightlink py-3">
                        <div >
                            <p class="initiateText">
                                <a href="" class="flex text-erBlue"> BGV Details <img
                                        src="{$img_url_name.img_name}/rightarowblue.svg" class=" pl-2" alt=""></a>
                            </p>
                        </div>
                    </div>
                    <div class="hidden ">
                        <div class="flex gap-2">
                    <div class="statusrightlink xsl:hidden ">
                        <div class="vmtRejected ">
                            Reject 
                        </div>
                    </div>
                    <div class="statusrightlink xsl:hidden ">
                        <div class="vmtVerify ">
                            Verify 
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
    
                <div class="hidden">
                <div class="mt-4 mb-3  xsl:flex">
                    <div class="vmtVerify ">
                        Verify <img src="{$img_url_name.img_name}/downarrowwhite.svg" class="pl-2" alt="arrow">
                    </div>
                </div> -->
                
                <div class="statusrightlink">
                    
                    <div class="mr-5">
                        {#if is_adhoc_facility == false}
                        {#if showbtn == "1"}
                            {#if $facility_data_store.is_bgv_intiated == "0"}
                            
                            <p on:click={initiate_popup} class="initiateText">
                                <button href="" class="flex">
                                    <img
                                        src="{$img_url_name.img_name}/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    /> Initiate BGV Verification</button
                                >
                            </p>
                            {:else if $facility_data_store.status == "Deactive"}
                            <p on:click={initiate_deact_popup} class="initiateText">
                                <button href="" class="flex">
                                    <img
                                        src="{$img_url_name.img_name}/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    /> Initiate BGV Verification</button
                                >
                            </p>
                            {:else if $facility_data_store.is_bgv_rejected == "1"}
                            <p on:click={routeToBgv} class="initiateText">
                                <button href="" class="flex" style="color: rgba(255, 0, 0, var(--tw-text-opacity));">
                                    <img
                                        src="{$img_url_name.img_name}/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    />BGV Rejected</button
                                >
                            </p>
                            {:else if $facility_data_store.is_bgv_verified == "1"}
                            <p on:click={routeToBgv} class="initiateText">
                                <button href="" class="flex" style="color:rgba(106, 194, 89, var(--tw-text-opacity));">
                                    <img
                                        src="{$img_url_name.img_name}/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    />BGV Verified</button
                                >
                            </p>
                            {:else}
                            <p on:click={routeToBgv} class="initiateText">
                                <button href="" class="flex" style="color: color: rgba(255, 134, 46, var(--tw-text-opacity));">
                                    <img
                                        src="{$img_url_name.img_name}/InitiateBGVerification.png"
                                        class=" pr-2"
                                        alt=""
                                    />BGV Pending</button
                                >
                            </p>
                            {/if}
    
                        {:else}
                        <p></p>
                        {/if}
                        {/if}
                    </div>
                    {#if admin == false }
                    <p></p>
                    {:else}
                        <div class="xsl:flex">
                            <div class="vmtVerify " on:click="{goto_vmt_verify}">
                                <!-- <div class="vmtVerify " > -->
                                Verify <img src="{$img_url_name.img_name}/downarrowwhite.svg" class="pl-2" alt="arrow">
                            </div>
                        </div>
                    {/if}
                    </div>
                
                </div>
                
            </div>
           
        </div>
    
        <div class="contentsectionDetailview_summary ">
    
            <div class="tabsforsummary">
                <div class="{asso_active}" on:click={() => {change_to = "Associate_details",work_active="",asso_active="active",id_active="",bank_active=""}}>Associate Details</div>
                <div class="{work_active}" on:click={() => {change_to = "Work_details",work_active="active",asso_active="",id_active="",bank_active=""}}>Work Details</div>
                <div class="{id_active}" on:click={() => {change_to = "Identity_details",work_active="",asso_active="",id_active="active",bank_active=""}}>Identity Proof</div>
                {#each new_arr as req_fac}
                {#if req_fac == $facility_data_store.facility_type}
                <div class="{bank_active}" on:click={() => {change_to = "Bank_details",work_active="",asso_active="",id_active="",bank_active="active"}}>Bank Details</div>
                {/if}
                {/each}
            </div> 
        {#if change_to == "Associate_details"}
       
        <AssociateDetails gst_doc_arr = {gst_doc_arr} facility_created_date = {facility_created_date}
        city = {city} facility_postal={facility_postal}
        gst_doc_obj={gst_doc_obj} addproof_obj={addproof_obj} 
        fac_photo_obj={fac_photo_obj} 
        facility_password={facility_password}
        facility_address = {facility_address}
        pancard_obj={pancard_obj} admin = {admin}
        is_adhoc_facility = {is_adhoc_facility}/>
        
        {:else if change_to == "Work_details"}
        <WorkDetails new_off_file_obj={new_off_file_obj} facility_modified_date={facility_modified_date} city={city}
        facility_name = {$facility_data_store.facility_name} facility_id = {$facility_id.facility_id_number} admin = {admin} 
        show_upload_btn = {show_upload_btn}
        remove_upload_btn = {remove_upload_btn}
        is_adhoc_facility = {is_adhoc_facility}
        aadhar_obj ={aadhar_obj}
        dl_photo_obj={dl_photo_obj}
        pancard_obj={pancard_obj}/>
    
        {:else if change_to == "Identity_details"}
        <IdentityProof pancard_obj={pancard_obj}
        changed_pan_num= {changed_pan_num}
        changed_aadhar_num = {changed_aadhar_num}
        changed_dl_num = {changed_dl_num}
        changed_voter_num = {changed_voter_num}
        aadhar_obj ={aadhar_obj}
        dl_photo_obj={dl_photo_obj}
        voter_id_object = {voter_id_object}
        fac_photo_obj={fac_photo_obj}
        id_new_date={id_new_date} admin = {admin}
        is_adhoc_facility = {is_adhoc_facility}/>
        
        {:else if change_to == "Bank_details"}
        <BankDetails bank_values_from_store = {bank_values_from_store}
         city={city} can_cheque_obj = {can_cheque_obj}
         bank_new_date={bank_new_date} admin = {admin}
         is_adhoc_facility = {is_adhoc_facility}
         bank_details_req_fac = {new_arr}/>
        {/if}
    
        
        
    
    
        </div>
    
    
    
    
    </div>
    
    
    
    <div class="supplierInfoModalSection " id="supplierInfoModal">
        <div class="mainSupInfo">
            <div class="p-4">
                <div class="supInfoWrapper ">
                    <div class="infoUserdetailsSection ">
                        <div class="detailsInfoSection">
                            <div class="tdfirstDetailsformodal">
                                <div class="itemList ">
                                    <div class="smallText w-w115px">Facility ID</div>
                                    <div class="smLable">{$facility_data_store.name}</div>
                                </div>
                                <div class="itemList ">
                                    <div class="smallText w-w115px">
                                        Facility Name
                                    </div>
                                    <div class="smLable break-all">{$facility_data_store.facility_name}</div>
                                </div>
                                <div class="itemList ">
                                    <div class="smallText w-w115px">
                                        Facility Type
                                    </div>
                                    <div class="smLable">{$facility_data_store.facility_type}</div>
                                </div>
                                
                                <div class="itemList">
                                    <div class="smallText w-w115px break-all">Location</div>
                                    <div class="smLable">{city}</div>
                                </div>
                                <div class="itemList">
                                    <div class="smallText w-w115px">Status</div>
                                    <div class="statusinformation">
                                        <div class="statusWrapper  ">
                                            <!-- <div class="statusredcircle" /> -->
                                            {$facility_data_store.status}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="updatebutton ">
                            <button class="ErBlueupdated">Update</button>
                        </div> -->
                        <div
                            class="closebuttonsection"
                            on:click={closeAuditTrailModal}
                        >
                            <img
                                src="{$img_url_name.img_name}/close.png"
                                id="closeAuditTrailModal"
                                class="closesup"
                                alt=""
                            />
                        </div>
                    </div>
                    <!-- <div class="commentBox">
                        <div class="textAndSubmitButton ">
                            <p class="text-base text-white">Add your comment</p>
                            <button class="btnsubmitComment " type="submit">
                                Submit</button
                            >
                        </div>
    
                        <textarea
                            name=""
                            class="textareaComment "
                            id=""
                            cols="30"
                            rows="3"
                        />
                    </div> -->
    
                    <div class="timelinescroll ">
                        <div class="flex md:contents">
                            <div class="timelinesection">
                                <div class="timeline ">
                                    <div class="timelineGreyline" />
                                </div>
                                <div class="timelineImg ">
                                    <img
                                        src="{$img_url_name.img_name}/chat2.svg"
                                        class="w-5 h-5"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div class="timelineContent ">
                                {#each audit_details_array as new_audit_data}
                                    <h3 class="timeCommenterName ">
                                        {new_audit_data.owner}
                                        <span class="timeCommentDate "
                                            >{new_audit_data.creation}</span
                                        >
                                    </h3>
                                    <div class="timeStatus  timeStatusbglightPink">
                                        <p class="timeCircle" />
                                        {new_audit_data.remarks}
                                    </div>
                                    <br>
                                {/each}
                            </div>
                        </div>
                        <div class="flex md:contents">
                            <div class="timelinesection">
                                <div class="timeline ">
                                    <div class="timelineGreyline" />
                                </div>
                                <div class="timelineImg ">
                                    <img
                                        src="{$img_url_name.img_name}/chat2.svg"
                                        class="w-5 h-5"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- full screen All Documents modal with table view-->
    <div class="hidden" id="modalid">
        <div class=" modalMain  " id="modal-id">
            <div class="modalOverlay"></div>
            <div class="modalContainer rounded-lg">
                <div class="modalHeadConmb-0 sticky top-0 bg-white z-zindex99">
                    <div class="leftmodalInfo">
                        <p class="text-lg text-erBlue font-medium  ">
                            <span class=""> All Documents</span>
                        </p>
                        <p class="text-sm ">
                            <span class="font-medium text-lg"> {$facility_data_store.facility_name}</span>
                            <span class="userDesignation"> - Associate- {$facility_data_store.facility_type} - {$facility_data_store.name}</span>
                        </p>
                    </div>
                    <button class="rightmodalclose" on:click="{close_docs}">
                        <img src="{$img_url_name.img_name}/blackclose.svg" alt="">
                    </button>
                </div>
                <div class="">
                    <div class="viewDocPanmainbodyModal">
                       
                        <div class="innermodal">
                            <div class="scrollbar ">
                                <div class=" ">
                                    <div class=" ">
                                        <div class="addSecform ">
                                            {#if $facility_data_store.status != "Deactive"}
                                            <div class="addButtonSection my-3 py-16 text-center hidden">
                                                <div class="updateAction">
                                                    <button class="ErBlueButton">Add New Document</button>
                                                </div>
                                            </div>
    
                                            <div class="my-3 py-4 px-4 ">
                                                <p class="text-lg font-medium">Add New Document</p>
    
                                                <div class="flex  py-3 items-center flex-wrap">
                                                    <div class="light14grey mb-1">Document Type</div>
                                                    <div class="formInnerGroup ">
                                                        
                                                        <select
                                                            id="selected_doc_type"
                                                            class="inputboxpopover">
                                                            <option class="pt-6"
                                                                value = "-1">Select</option>
                                                            {#each doc_type_name as doc_name}
                                                            <option value="abc">{doc_name.doc_value} </option>
                                                            {/each}
                                                       
                                                        </select>
                                                        <div class="text-red-500">{doc_cat_sel_msg}</div>
                                                        <div class="formSelectArrow ">
                                                            <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="flex  py-1 items-center flex-wrap"
                                                >
                                                    <div class="light14grey  mb-1">
                                                        Document Detail
                                                    </div>
                                                    <div class="formInnerGroup">
                                                        <input
                                                            class="inputboxpopover"
                                                            type="text"
                                                            bind:value="{document_desc}"
                                                        />
                                                        <div class="text-red-500">{doc_det_msg}</div>
                                                    </div>
                                                </div>
                                                <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Upload Document
                                                </div>
                                                <div class="formInnerGroup">
                                                    <label
                                                        class="cursor-pointer flex"
                                                    >
                                                        <div
                                                            class="ErBlueButton"
                                                        >
                                                            Select File
                                                        </div>
                                                        <input
                                                            id="document_url"
                                                            type="file"
                                                            class="hidden"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"new_doc_upload"
                                                                        )}
                                                            bind:value="{document_url}"
    
                                                        />
                                                        <div class="text-red-500">{new_doc_upload_message}</div>
                                                    </label>
                                                    <p>{document_name}</p>
                                                </div>
                                            </div>
    
    
                                            <div
                                            class="flex items-center justify-end mt-5"
                                        >
                                        <button 
                                        on:click="{closeViewModel}">Cancel</button
                                    >
                                            <div class="updateAction ml-5">
                                                <button class="ErBlueButton"
                                                    on:click="{save_document}">Upload</button
                                                >
                                            </div>
                                        </div>
    
                                            </div>
                                            {/if}
                                        </div>
                                    </div>
                                    <div class=" ">
                                        
                                        <table class="table  w-full text-center mt-2 ">
                                            <thead class="theadpopover h-10">
                                                <tr>
                                                    <th>Document</th>
                                                    <th>Document Type   </th>
                                                    <th> Uploaded By  </th>
                                                    <th>Uploaded On    </th>
                                                    <th> View</th>
                                                    <th> Status</th>
    
                                                </tr>
                                            </thead>
                                            {#each facility_document_data as new_doc_data}
                                            <tbody class="tbodypopover">
                                                <tr class="border-b">
                                                    {#if !new_doc_data.file_name}
                                                    <p>-</p>
                                                    {:else}
                                                    <td >
                                                        <p class="detailData text-left pl-4 wordwrap">{new_doc_data.file_name}</p>
                                                    </td>
                                                    {/if}
                                                    <td>  
                                                        <p class="detailData">{new_doc_data.doc_category}<br>({new_doc_data.doc_type})</p>
                                                    </td>
                                                    <td>
                                                        <p class="detailData">{new_doc_data.modified_by}</p>
                                                    </td>
                                                    <td>
                                                        <p class="detailData"> {new_doc_data.modified}</p>
                                                    </td>
                                                   
                                                    <td> 
                                                        <p class="verifyText justify-center" >
                                                        <a href="" class="smButton">
                                                            <img src="{$img_url_name.img_name}/view.png" alt="" on:click={openViewModel("new_doc",new_doc_data.doc_category)}>
                                                        </a>
                                                    </p>
                                                </td>
                                                <td>
                                                    <div class="userStatusTicktable">
                                                        {#if new_doc_data.verified == "1"}
                                                        <p class="userStatusTick ">
                                                            <img
                                                                src="{$img_url_name.img_name}/checked.png"
                                                                alt=""
                                                                class="pr-1"
                                                            /> Verified
                                                        </p>
                                                        
                                                        {:else if new_doc_data.rejected == "1"}
                                                        <p class="userStatusCross ">
                                                            <img
                                                                src="{$img_url_name.img_name}/reject.png"
                                                                alt=""
                                                                class="pr-1"
                                                            /> Rejected
                                                        </p>
                                                        {:else}
                                                        <p class="userStatusTimer">
                                                            <img src="{$img_url_name.img_name}/timer.png" alt="" class="pr-1">
                                                            Pending</p>
                                                        {/if}
                                                        
                                                    </div>
                                                </td>
                                                   
                                                </tr>
                                            </tbody>
                                            {/each}
                                        </table>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- ERP Details modal -->
    <div class="hidden" id="erpIdModel">
        <div class=" viewDocmodal  ">
            <div class="bglightcolormodal" />
            <div class="allDocmodalsuccessbodyErp rounded-lg">
                <div class="">
                    <div class="viewDocPanmainbodyModal">
                        <div class="flex justify-between mb-3">
                            <div class="leftmodalInfo">
                                <p class="text-lg text-erBlue font-medium  ">
                                    <span class=""> ERP Details</span>
                                </p>
                                {#if erp_details_arr == ""}
                                <p></p>
                                <hr>
                            {:else}
                                <p class="detailsUpdate">
                                    <span
                                        ><span class="font-medium"
                                            >Created On
                                        </span> - {erp_details_arr.creation}</span
                                    >
                                </p>
                                {/if}
                            </div>
                            <button class="rightmodalclose" on:click={closeERP}>
                                <img src="{$img_url_name.img_name}/blackclose.svg" alt="" />
                            </button>
                        </div>
                        {#if erp_details_arr == ""}
                        <p style="text-align: center;">No ERP Details Found</p>
                    {:else}
                        <div class="innermodal">
                          
                            <hr />
                            
                            <div class="ERPDetails mt-4">
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">ERP ID</p>
                                    {#if !erp_details_arr.erp_id}<p>-</p>
                                    {:else}
                                    <p class="detailDatasm">{erp_details_arr.erp_id}</p>
                                    {/if}
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">ERP Name</p>
                                    {#if !erp_details_arr.erp_name}<p>-</p>
                                    {:else}
                                    <p class="detailDatasm">{erp_details_arr.erp_name}</p>
                                    {/if}
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">Address ID</p>
                                    {#if !erp_details_arr.address_id}<p>-</p>
                                    {:else}
                                    <p class="detailDatasm">{erp_details_arr.address_id}</p>
                                    {/if}
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">Address Title</p>
                                    {#if !erp_details_arr.address_title}<p>-</p>
                                    {:else}
                                    <p class="detailDatasm">{erp_details_arr.address_title}</p>
                                    {/if}
                                </div>
                                <div class="flex mb-3 xs:flex-col sm:flex-col">
                                    <p class="detailLbalesm pr-3">Contact ID</p>
                                    {#if !erp_details_arr.contact_id}<p>-</p>
                                    {:else}
                                    <p class="detailDatasm">{erp_details_arr.contact_id}</p>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Document view Model -->
    <div id="img_model" tabindex="-1" aria-hidden="true" role ="dialog" class=" actionDialogueOnboard" hidden>
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="flex justify-end p-2">
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" on:click="{()=>{closeViewModel()}}">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
                    
                    <img src="" id="img_model_url" class="mx-auto" alt="{alt_image}">
                    
                    <div class="pt-3 flex justify-center">
                        <button data-modal-toggle="popup-modal" type="button" class="dialogueNobutton"  on:click="{()=>{closeViewModel()}}">Close</button>
                </form>
            </div>
        </div>
    </div> 
    <!-- Document view Model -->
    
    <!-- Document view Model With Approve and reject -->
    <div id="img_model_approve_rej" tabindex="-1" aria-hidden="true" role ="dialog" class=" actionDialogueOnboard" hidden>
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                
                <div class="flex justify-end p-2">
                    <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click={()=>{docApproveRejected("reject")}}>Reject</button>
                    <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click={()=>{docApproveRejected("approve")}}>Approve</button>
           
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" on:click="{()=>{closeApproveViewModel()}}">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
    
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
                    <div class = "overflow-y-auto h-96">
                        <img src={image_path} id="doc_img_model_url" class="mx-auto w-56" alt="{alt_image}">
                    </div>
                    <div class="pt-3 flex justify-center">
                        <button data-modal-toggle="popup-modal" type="button" class="dialogueNobutton"  on:click="{()=>{closeApproveViewModel()}}">Close</button>
                </form>
            </div>
        </div>
    </div> 
    <!-- Document view Model -->
    
    <!--blacklist Confirmation modal -->
    
    <div id="Blacklist_confirmation_modal" class="hidden">
        <div  class="actionDialogueOnboard ">
            <div class="pancardDialogueOnboardWrapper ">
                <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                    <div class="modalHeadConmb-0">
                        <div class="leftmodalInfo">
                            <!-- <p class=""> Reject Reason</p> -->
                        </div>
                        <div class="rightmodalclose">
                            <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{close_blacklist_remark}">
                        </div>
                    </div>
                    <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
        
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                            <label class="block  tracking-wide text-gray-700 font-bold mb-2" for="grid-state">
                            Do you want to Blacklist {$facility_id.facility_id_number} - {$facility_data_store.facility_type}?
                            </label>
                            <div class="relative">
                             
                              <br>
                              
                              <div
                                    class="flex  py-1 items-center flex-wrap"
                                >
                                    <div class="formInnerGroup">
                                       
                                        <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click="{close_blacklist_remark}">Cancel</button>
                                        <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click="{confirm_blacklist}">Ok</button>
                                    </div>
                                </div>
                              
                            </div>
                          </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>
    
    <!--blacklist Confirmation modal -->
    
    
    <!--Initiate Module -->
    
    
    <div id="initiateBgv" class="hidden">
        <div  class="actionDialogueOnboard ">
            <div class="pancardDialogueOnboardWrapper ">
                <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                    <div class="modalHeadConmb-0">
                        <div class="leftmodalInfo">
                            <!-- <p class=""> Reject Reason</p> -->
                        </div>
                        <div class="rightmodalclose">
                            <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{close_blacklist_remark}">
                        </div>
                    </div>
                    <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
        
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                            <label class="block  tracking-wide text-gray-700 font-bold mb-2" for="grid-state" >
                            Do you want to initiate Background verification for {org_name} - {$facility_data_store.station_code}{city} {$facility_id.facility_id_number} : {$facility_data_store.facility_name}?
                            </label>
                            <div class="relative">
                             
                             
                              <br>
                              <div
                                    class="flex  py-1 items-center flex-wrap"
                                >
                                    <div class="formInnerGroup">
                                       
                                        <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click="{close_blacklist_remark}">Cancel</button>
                                        <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click="{confirm_initiate_bgv}">Ok</button>
                                    </div>
                                </div>
                              
                            </div>
                          </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>
    
    <!--Initiate Module -->
    
    <!--blacklist  Reject modal -->
    <div id="Basic_Reject_modal" class="hidden">
        <div  class="actionDialogueOnboard ">
            <div class="pancardDialogueOnboardWrapper ">
                <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                    <div class="modalHeadConmb-0">
                        <div class="leftmodalInfo">
                            <!-- <p class=""> Reject Reason</p> -->
                        </div>
                        <div class="rightmodalclose">
                            <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{close_blacklist_remark}">
                        </div>
                    </div>
                    <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
        
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                            <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Enter Remarks
                            </label>
                            <div class="relative">
                              <!-- <select class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value="{pan_info_res}">
                                <option value="" selected disabled>Select</option>
                                {#each rejReasonMap.panInfo as pan_info_rej}
                                <option>{pan_info_rej} </option>
                                {/each}
                              </select> -->
                              <div
                                    class="flex  py-1 items-center flex-wrap"
                                >
                                    <div class="formInnerGroup">
                                        <input
                                            class="inputboxpopover"
                                            type="text"
                                            bind:value="{blacklist_remark}"
                                        />
                                    </div>
                                </div>
                              <!-- <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                              </div> -->
                            </div>
                          </div>
                       
                          <div class="pt-3 flex justify-center">
                            <button type="button" class="dialogueNobutton" on:click="{blacklist_click}">Submit</button>
                    </form>
                </div>
            </div>
        </div> 
    </div>
    <!--BG Basic Detail Reject modal -->
    <Toast type={toast_type}  text={toast_text}/>