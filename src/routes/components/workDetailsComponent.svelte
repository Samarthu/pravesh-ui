
       <script>
        // import { Router, Link, Route } from "svelte-routing";
        //     import Catagory from "../catagory.svelte";
        //     import { goto } from "$app/navigation";
        //     import Breadcrumb from "./breadcrumb.svelte";
            import { onMount } from "svelte";
        //     import { DateInput, DatePicker } from "date-picker-svelte";
            import { bank_data_to_store,cheque_data_to_store } from "../../stores/onboardsummary_store";
            import { allowed_pdf_size } from "../../services/pravesh_config";
        //     // import { addnew_cheque_details } from "../services/onboardsummary_services";
        //     // import { facility_document } from "../services/onboardsummary_services";
        //     import { audit_trail_data } from "../services/supplier_services";
            import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
                    show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
                    get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
                    facility_document,addnew_cheque_details,bank_details,cheque_details,gst_details,
                    work_details_data,print_data,get_physical_contracts,save_physical_contract,get_station_details,
                    get_all_accepted_contracts} from "../../services/onboardsummary_services";
        //     import {uploadDocs} from "../services/bgv_services";
            import {get_date_format} from "../../services/date_format_servives";
            // import {bank_details,cheque_details,facility_document,show_fac_tags,get_loc_scope,
            //     facility_data,facility_bgv_init,all_facility_tags} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            // import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store"
        //     import {bgv_config_store} from '../stores/bgv_config_store'
            import Toast from './toast.svelte';
        //     import AssociateDetails from './components/associateDetailsComponent.svelte';
        //     import BankDetails from './components/bankDetailsComponent.svelte';
        //     import IdentityProof from './components/identityProofComponent.svelte';
        //     import WorkDetails from './components/workDetailsComponent.svelte';
        //     import { object_without_properties } from "svelte/internal";
        //     import { paginate, LightPaginationNav } from "svelte-paginate";
            import Spinner from "./spinner.svelte";
            import {logged_user} from '../../services/supplier_services';
            import  {  page } from '$app/stores';
            import {documents_store} from '../../stores/document_store';
            import { goto } from "$app/navigation";
            import {get_client_org_mapping} from '../../services/vmt_verify_services'
            
            // import {onFileSelected} from '../onboardsummaryComponent.svelte'
        
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
            let contract = "e-contract"
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
            let show_creation_date;
            let child_select;
            let child_list=[];
            let check_val,query;
            let tags_for_ass_arr=[];
            let check_selected;
            let id_new_date='';
            let username;
            let all_tags_res;
            let work_contract_arr = [];
            let physical_contract_arr = [];
            let all_accepted_contract_arr = [];
            let org_data_arr = [];
            let cont_start_date;
            let cont_end_date;
            let phy_cont_file = ""
            let phy_cont_message = ""
            let phy_cont_img = ""
            let station_data_arr = [];
            let cost_center_details = [];
            let print_data_arr = [];
            let esign_data_arr = [];
            let contract_tab_val = "e-cont";
            // export let facility_name;
            export let facility_id;
            // let pancard_obj = {
            //     pan_num:null,
            //     pan_attach:null,
            //     pan_name:null,
            //     pan_verified:null,
            //     pan_rejected:null
            // }
            // let aadhar_obj = {
            //     aadhar_num:null,
            //     aadhar_attach:null,
            //     aadhar_name:null,
            //     aadhar_verified:null,
            //     aadhar_rejected:null
            // }
            // let fac_photo_obj = {
            //     profile_url:null,
            //     profile_verified:null,
            //     profile_rejected:null
            // }
            // let addproof_obj = {
            //     address_name:null,
            //     address_url:null,
            //     address_verified:null,
            //     address_rejected:null
            // };
            // export let can_cheque_obj = {
            //     can_cheque_name:null,
            //     can_cheque_url:null,
            //     can_cheque_verified:null,
            //     can_cheque_rejected:null
            // };
            // let dl_photo_obj = {
            //     dl_lic_name:null,
            //     dl_lic_url:null,
            //     dl_verified:null,
            //     dl_rejected:null
            // };
            export let new_off_file_obj = {
                offer_name:null,
                offer_url:null,
                offer_verified:null,
                offer_rejected:null
            };
            // let gst_doc_obj = {
            //     gst_name:null,
            //     gst_url:null,
            //     gst_doc_num:null,
            //     gst_verified:null,
            //     gst_rejected:null
            // };
            let selectserCh ;
            let text_pattern = /^[a-zA-Z_ ]+$/;
            let recrun_pattern =  /^[^-\s](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9 _-]+)$/;
            let city_select;
            let city_select_flag=0;
            let img_name="",bank_name="-",type ="",cheque_date,cheque_number="-",amount="",
            recrun_number="",file_number = "";
            let bank_name_message ="",type_message="",cheque_date_message="",cheque_number_message=""
            ,amount_message="",recrun_number_message="",file_number_message="",cheque_upload_message="";
            let child_box;
            let bank_details_res,bank_new_date,facility_created_date,facility_doc_date;
            export let facility_modified_date;
            // let client_det_res;
            let client_det_arr=[];
            let gst_doc_arr=[];
            let view_contract = 0;
            // $: cheque_date = new Date();
            let file_data;
            let showbtn = 0;
            let selectTag,addRemark,selectsearch;
            export let city;
            console.log("city data new",city);
            let facility_address,facility_postal,facility_password,location_id,status_name;
            let new_fac_remarks = [];
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
            export let url = "";
            /////////////////////svelte plugin pagiantion//////////
            let items;
            let currentPage = 1;
            let pageSize = 10;
            let paginatedItems=[];
            let change_to = "Associate_details";
            //////GST vars////////////
            let gst_address=""
            let gst_city_select=""
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
            let new_contract_data = "";
            let cont_cost_center;
            let cont_warehouse = "";
            let contract_type;
            let contract_name;
            let e_bg_bglightgreye="bg-bglightgreye";
            let phy_bg_bglightgreye="";
            let all_bg_bglightgreye = "";
            let is_e_grid_hidden = ""
            let is_phy_grid_hidden = "hidden";

        /////////Document view Model//////
            // $:{
            //     for(let key in all_tags_obj){
            //         if(select_tag_data == key){
            //             if(all_tags_obj[key] == "vendor_required"){
            //             hidden_field = "";
            //             }
            //             else{
            //             hidden_field = "hidden"; 
            //             }
            //         }
                    
            //     }
            // }
            // $:{
            //     if(city_select != null && $facility_id.facility_id_number != null){
            //     console.log("citySelect",city_select);
            //     link_child(city_select)
            //     }
            // }
            // let searchTerm;
            // $:if(searchTerm == ''){
            //     clearedSearchFunc();
            // }
            // $:new_pages = [];
            // $:for(let i=0;i<scope_data.length;i++){
            //     if(scope_data[i].location_name == gst_city_select){
            //         gst_city_link_state = scope_data[i].location_state;
            //         gst_city_loc_id = scope_data[i].location_id;
            //         gst_state_code = scope_data[i].state_code;
            //     }
            // }
            // $:if(gst_checkbox === true){
            //     gst_checkbox = true;
            // } 
            let org_selected;
            let station_selected;
            $:{
                if(org_selected){
                org_dependent()
                }
            }
            $:{
                if(station_selected){
                station_dependent()
                }

            }

            

            async function org_dependent(){
                station_data_arr = [];
                let get_loc_scope_res = await get_loc_scope()
                try {
                    if (get_loc_scope_res != "null"){
                        for(let i=0;i<get_loc_scope_res.body.data.length;i++){
                            for(let j =0 ;j<get_loc_scope_res.body.data[i].stations.length;j++){
                                if(get_loc_scope_res.body.data[i].stations[j].org_id == org_selected){
                                    // console.log("inside if block",get_loc_scope_res.body.data[i].stations[j].station_code)
                                    station_data_arr.push({"station_code":get_loc_scope_res.body.data[i].stations[j].station_code,"station_name":get_loc_scope_res.body.data[i].stations[j].station_name})
                                }
                            }
                        }
                        station_data_arr = station_data_arr;
                        
                    }
                }
                catch (error) {
                    toast_type = "error";
                    toast_text = get_loc_scope_res.body.message;
                }
            }

            async function station_dependent(){
                let get_station_details_res = await get_station_details(station_selected);
                try {
                    if (get_station_details_res != "null"){
                        cost_center_details = get_station_details_res.body.data;
                    }
                    cost_center_details = cost_center_details;
                }
                catch (error) {
                    toast_type = "error";
                    toast_text = error
                };

            }
        async function submit_phy_contract(){
            
            show_spinner = true;
            for(let i=0;i<physical_contract_arr.length;i++){
                if(contract_type  == physical_contract_arr[i].contract_type){
                    contract_name = physical_contract_arr[i].name;
                }
            }
            let new_start_date = new Date(cont_start_date);
            let updated_start_date = get_date_format(new_start_date,"yyyy-mm-dd");

            let new_end_date = new Date(cont_end_date);
            let updated_end_date = get_date_format(new_end_date,"yyyy-mm-dd");


            console.log("contract_name",contract_name)
            if(!contract_name){
                toast_type = "error";
                toast_text = "Select Contract Type";
                return
            }
            if(!org_selected || org_selected == "-1"){
                toast_type = "error";
                toast_text = "Select Organization Id";
                return
            }
            if(!station_selected || station_selected == "-1"){
                toast_type = "error";
                toast_text = "Select Station Id";
                return
            }
            if(!cont_start_date){
                toast_type = "error";
                toast_text = "Select Start Date";
                return
            }
            if(!cont_end_date){
                toast_type = "error";
                toast_text = "Select End Date";
                return
            }
            if(!phy_cont_file){
                toast_type = "error";
                toast_text = "Upload File";
                return
            }
            
            let pass_contract_id = {
                contract_id: contract_name,
                cost_center: cont_cost_center,
                end_date: updated_end_date,
                facility_id: facility_id,
                file_data: phy_cont_file,
                file_name: phy_cont_img,
                org_id: org_selected,
                start_date : updated_start_date,
                station_code : station_selected,
                warehouse: cont_warehouse
                
            }
            console.log("pass_contract_id",pass_contract_id)
            let save_phy_contract_res =await  save_physical_contract(pass_contract_id)
                console.log("save_phy_contract_res",save_phy_contract_res);
                if(save_phy_contract_res.body.status == "green"){
                    work_contract_arr=[];
                    show_spinner = false;
                    toast_type = "success";
                    toast_text = save_phy_contract_res.body.message;
                    let work_details_res = await work_details_data();
                try {
                    if(work_details_res.body.status == "green"){
                        show_spinner = false;
                        toast_type = "success";
                        toast_text = work_details_res.body.message;
                        work_contract_arr = work_details_res.body.data;
                    }
                    else if(work_details_res.body.status == "red"){
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = work_details_res.body.message;
                    }
                    else{
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = "Something went wrong";
                    }
                    work_contract_arr = work_contract_arr;
                    // for(let i=0;i<work_contract_arr.length;i++){

                    // }
                    console.log("work_contract_arr",work_contract_arr);
                }
                catch (error) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = error;   
                }

            }
        }
    async function contract_tab(selected_tab){
        if(selected_tab == "e-cont"){
            e_bg_bglightgreye = "bg-bglightgreye"
            phy_bg_bglightgreye = ""
            all_bg_bglightgreye = ""
            contract_tab_val = "e-cont"

        }
        if(selected_tab == "phy_cont"){
            phy_bg_bglightgreye  = "bg-bglightgreye"
            e_bg_bglightgreye = ""
            all_bg_bglightgreye = ""
            contract_tab_val = "phy_cont"
        }
        if(selected_tab == "all-cont"){
            all_bg_bglightgreye = "bg-bglightgreye"
            e_bg_bglightgreye = ""
            phy_bg_bglightgreye = ""
            contract_tab_val = "all_cont"
        }
    }
        onMount(async () => {
            let get_org_data_res =  await get_client_org_mapping();
            try {
            if(get_org_data_res.body.status == "green"){
                for(let i=0;i<get_org_data_res.body.data.length;i++){
                    org_data_arr.push({"org_id":get_org_data_res.body.data[i].org_id,"org_name":get_org_data_res.body.data[i].org_name})
                }
                org_data_arr = org_data_arr;
                
            }
            else{
                toast_type = "error";
                toast_text = "No client Data";
            }
            } catch(err) {
                toast_type = "error";
                toast_text = err;
       
            }

            all_tags_res = await all_facility_tags($facility_data_store.name);
    
            try {
                if(all_tags_res.body.status == "green"){
                    for(let i=0;i < all_tags_res.body.data.length;i++){
                        all_tags_data.push(all_tags_res.body.data[i].tag_name);
                        // console.log("all_tags_data",all_tags_data);
                        all_tags_obj[all_tags_res.body.data[i].tag_name] = all_tags_res.body.data[i].tag_description;
                        
                        // console.log("all_tags_obj",all_tags_obj);
                    }
                    all_tags_data = all_tags_data;
                }
            } 
            catch(err) {
                toast_type = "error";
                toast_text = all_tags_res.body.message;
            }
            show_spinner = false;
        });

            function myBtn() {
            associateModal.style.display = "block";
            }
           async function workorganization() {
               show_spinner = true;
               workContractModel.style.display = "block";
                let work_details_res = await work_details_data();
                try {
                    if(work_details_res.body.status == "green"){
                        show_spinner = false;
                        toast_type = "success";
                        toast_text = work_details_res.body.message;
                        work_contract_arr = work_details_res.body.data;
                        for(let i=0;i<work_contract_arr.length;i++){
                            let updated_date_format = new Date(work_contract_arr[i].updated_date);
                            work_contract_arr[i].updated_date = get_date_format(updated_date_format,"dd-mm-yyyy-hh-mm");
                            let creation_date_format = new Date(work_contract_arr[i].creation);
                            work_contract_arr[i].creation = get_date_format(creation_date_format,"dd-mm-yyyy-hh-mm");
                            
                        }
                    }
                    else if(work_details_res.body.status == "red"){
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = work_details_res.body.message;
                    }
                    else{
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = "Something went wrong";
                    }
                    work_contract_arr = work_contract_arr;
                    console.log("work_contract_arr",work_contract_arr);
                }
                catch (error) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = error;   
                }
                
                let physical_contract_res =await get_physical_contracts();
                try {
                    if(physical_contract_res.body.status == "green"){
                        show_spinner = false;
                        toast_type = "success";
                        toast_text = physical_contract_res.body.message;
                        physical_contract_arr = physical_contract_res.body.data;
                    }
                    else{
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = "Something went wrong";
                    }  
                    physical_contract_arr = physical_contract_arr;
                }
                catch (error) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = error;
                }

                let all_accepted_contract_res =await get_all_accepted_contracts();
                try {
                    if(all_accepted_contract_res.body.status == "green"){
                        show_spinner = false;
                        toast_type = "success";
                        toast_text = all_accepted_contract_res.body.message;
                        all_accepted_contract_arr = all_accepted_contract_res.body.data;
                    }
                    else{
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = "Something went wrong";
                    }  
                    all_accepted_contract_arr = all_accepted_contract_arr;
                    console.log("all_accepted_contract_arr",all_accepted_contract_arr);
                }
                catch (error) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = error;
                }

            }
        function clear() {
            addRemoveModal.style.display = "none";
        }


        async function tagAddRemove() {
            addRemoveModal.style.display = "block";
            console.log("tag remove clicked")
        
        let tag_res = await show_fac_tags($facility_data_store.facility_type);
        console.log("tag_res",tag_res);
        try {
            show_spinner = true;
            if(tag_res.body.data.length != 0){
                show_spinner = false;
                show_fac_array = tag_res.body.data;
                console.log("show_fac_array",show_fac_array)
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
                toast_type = "error";
                toast_text = "No Tags Found";
            }
        } 
        catch(err) {
            toast_type = "error";
            toast_text = err;
        
         }

        let service_vend_res = await service_vendor();
        console.log("service_vend_res",service_vend_res)
        try {
            show_spinner = true;
            if(service_vend_res.body.status == "green"){
                show_spinner = false;
                for(let i=0;i<service_vend_res.body.data.length;i++){
                    if(service_vend_res.body.data[i].location_id == location_id){
                        // tag_data_obj[service_vend_res.body.data[i].vendor_id] = service_vend_res.body.data[i].vendor_name;
                        tag_data_obj.push(service_vend_res.body.data[i]);
                    }
                }
                tag_data_obj = tag_data_obj;
                console.log("tag_data_obj",tag_data_obj)
            }
            else{
                show_spinner = false;
                toast_type = "error";
                toast_text = "No Vendor Found";
            }
        }
        catch(err) {
            show_spinner = false;
            toast_type = "error";
            toast_text = err;
        }


    }
    async function handleTagClick(){
        console.log("handle tag clicked")
    let new_tag_id
    try {   
    //     if(all_tags_res.body.status == "green"){
        
        for(let i=0; i < all_tags_res.body.data.length; i++){
            // console.log("INDISDE FOR LOOPform_data from html",select_tag_data,all_tags_res.body.data[i].tag_name)
            if(select_tag_data == all_tags_res.body.data[i].tag_name){
                new_tag_id = all_tags_res.body.data[i].tag_id;
            }
            
        }
        if(!select_tag_data){
            selectTag = 1;
            if(!tag_remark){
            addRemark = 1;
                if(!serv_ch_data){
                    selectsearch=1;
                }
            }   

        }
        else{
            console.log("select_tag_data",select_tag_data)
            show_fac_array = [];
            console.log("serv_ch_data",serv_ch_data)
            let submit_fac_res = await submit_fac_tag_data(new_tag_id,select_tag_data,tag_date,tag_remark,serv_ch_data)
            try {
                show_spinner = true;
                if(submit_fac_res.body.status == "green"){
                    show_spinner = false;
                    let temp_res = await show_fac_tags($facility_data_store.facility_type);
                    show_fac_array = temp_res.body.data;
                    for(let i=0;i < show_fac_array.length;i++){
                        let new_date =new Date(show_fac_array[i].creation)
                        show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
                        show_fac_array[i].creation=show_creation_date;
                    }
                    show_fac_array = show_fac_array;
                }
                // console.log("submit_fac_res.body",submit_fac_res.body)
                else if(submit_fac_res.body.message == "Tag already exist..!"){
                    show_spinner = false;
                    console.log("Cannot Add Tag already exist..!")
                }
            }
                catch(err) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = err;
                }
        }

    }
    catch(err) {
        toast_type = "error";
        toast_text = err;
    }
      
}

    async function removeTag(tag_id,tag_name,owner,tag_status){
        show_fac_array = [];
        let fac_id
        if(owner == $facility_data_store.owner){
                fac_id = $facility_data_store.name
                console.log("fac_id",fac_id)
        }
        let remove_tag_res = await remove_tag(fac_id,tag_id,tag_name);
        if(remove_tag_res.body.status == "green")
        {
        let temp_res = await show_fac_tags($facility_data_store.facility_type);
        try {
                show_fac_array = temp_res.body.data;
                
                // console.log("show_fac_array IN remove",show_fac_array)
                for(let i=0;i < show_fac_array.length;i++){
                    
                    let new_date =new Date(show_fac_array[i].creation)
                    show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
                    show_fac_array[i].creation=show_creation_date;
                   
        }
       
    }
        catch(err) {
        console.log("ERROR")
        
         }

    }
}


   async function tagAuditFunc(){
        temp = "tag";
        let tag_audit_res =await tag_audit_trail();
        try {
            if(tag_audit_res.body.status == "green"){
            
            tag_data_arr = tag_audit_res.body.data
            for(let i=0;i < tag_data_arr.length;i++){
                let new_date =new Date(tag_data_arr[i].creation)
                show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
                tag_data_arr[i].creation=show_creation_date;
            }
            // console.log("TAG DATA ARRA",tag_data_arr)
            tag_data_arr = tag_data_arr;
               
        }} catch(err) {
        console.log("ERROR")
        
         }
       
    }

            // function closeWorkorganization() {
            //     workorganizationModel.style.display = "none";
            // }
            function closeViewModel(){
        document.getElementById("img_model").style.display = "none";
    }
    function openViewModel(data,doc_number){
        document.getElementById("img_model").style.display = "block";
        if(data == "aadhar"){
            document.getElementById("img_model_url").getAttribute('src',aadhar_obj.aadhar_attach);
            alt_image = "aadhar proof";
        }
        else if(data == "pan"){
            document.getElementById("img_model_url").getAttribute('src',pancard_obj.pan_attach);
            alt_image = "pan-card proof";
        }
        else if(data == "address"){
            document.getElementById("img_model_url").getAttribute('src',addproof_obj.address_url);
            alt_image = "address proof";
        }
        else if(data == "licence"){
            document.getElementById("img_model_url").getAttribute('src',dl_lic_attach);
            alt_image = "driving licence proof";
        }
        else if(data == "offer"){
            document.getElementById("img_model_url").getAttribute('src',new_off_file_obj.offer_url);
            alt_image = "offer letter proof";
        }
        else if(data == "can_cheque"){
            document.getElementById("img_model_url").getAttribute('src',can_cheque_obj.can_cheque_url);
            alt_image = "cancel cheque proof";
        }
        else if(data == "cheque_disp"){
            document.getElementById("img_model_url").getAttribute('src',new_cheque.file_url);
            alt_image = "cheque proof";
        }
        for(let i = 0;i<gst_doc_arr.length;i++){
            if(data == "mult_gsts"){
                if(doc_number == gst_doc_arr[i].gst_doc_num)
                document.getElementById("img_model_url").getAttribute('src',gst_url[i]);
                alt_image = "gst proof";
            }
        }
        
    }
    const onFileSelected = (e,doctext) => {
        let img = e.target.files[0];
        if (img.size <= allowed_pdf_size) {
            console.log("img", img);
            
            if(doctext == "contract_upload"){
            phy_cont_img = img.name;
            }

            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function () {
            file_data = reader.result;
            console.log("reader",reader.result);
            
            if(doctext == "contract_upload"){
                phy_cont_file = reader.result;
                toast_text = "Document Uploaded Successfully";
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
    function workContract() {
        workContractModel.style.display = "block";
    }

    function closeWorkContract() {
        workContractModel.style.display = "none";
        view_contract = 0;
    }
    async function view_print_doc(assigned_id,type){
        
        console.log("view btn clicked",assigned_id,type)
        view_contract = 1;
        let pass_contract_id
        // window.print();
        for(let i = 0;i<work_contract_arr.length;i++){
            if(assigned_id == work_contract_arr[i].assigned_id){
               pass_contract_id = work_contract_arr[i].assigned_id;
            }
        }
        let print_data_res = await print_data(pass_contract_id);
        try {
            if(print_data_res.body.status == "green" && print_data_res.body.data != false){
                
                show_spinner = false;
                toast_type = "success";
                toast_text = print_data_res.body.message;
                print_data_arr = print_data_res.body.data;
                esign_data_arr = print_data_res.body.data.esign
               
                for(let i = 0;i<work_contract_arr.length;i++){
                if(assigned_id == work_contract_arr[i].assigned_id){
                    
                    if(type == "view"){

                     
                        var demo = window.open()
                        new_contract_data = print_data_arr.accepted_contract+document.getElementById("user_details").innerHTML;
                        demo.document.write(String(new_contract_data));
                        
                        // document.getElementById("workContractDetails").style.display = "none";
                        // document.getElementById("viewContractDetails").style.display = "block";
                        
                        // document.getElementById("viewContractDetails").innerHTML = '<iframe name="view_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc='+{new_contract_data}+'></iframe>';
                        // new_contract_data = print_data_arr.accepted_contract+document.getElementById("user_details").innerHTML;
                        // window.frames["view_frame"].window.focus();
                        // window.open(new_contract_data,'popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
                    }   
                    else if(type == "print"){
                        new_contract_data = document.getElementById("user_details").innerHTML+print_data_arr.accepted_contract;
                        window.frames["print_frame"].window.print();
                    }
                }
        }
            }
            else if(print_data_res.body.status == "red"){
                show_spinner = false;
                toast_type = "error";
                toast_text = print_data_res.body.message;
            }
            else if(print_data_res.body.data == false){
                show_spinner = false;
                toast_type = "error";
                toast_text = "No Contract Details Found";
            }
            
        }
        catch (error) {
            show_spinner = false;
            toast_type = "error";
            toast_text = error;
        }
        
        
        // console.log("print_data_arr",print_data_arr);
        }
    function closeContractView(){
        document.getElementById("viewContractDetails").style.display = "none";
    }  
   

    </script>
        {#if show_spinner}
            <Spinner />
        {/if}
    
         <!-- Work Details -->
        <div class="bg-white w-full Work_Details_Section ">
            <div class="detailsHeader_summary ">
               
                <div class="right flex justify-end">
                    <p class="detailsUpdate mr-4">
                        <span><span class="font-medium">Last updated -> </span> {facility_modified_date} <span
                                class="font-medium"> By -> </span> {$facility_data_store.modified_by}</span>
                    </p>
                    <p class="flex items-center smButtonText">
                        
                        <button class="smButton bg-erBlue text-white" on:click={()=>goto("workdetails")}>
                            Edit

                        </button>
                    </p>
                    <div class="userStatus ml-4">
                        <p class="flex items-center smButtonText" on:click={tagAddRemove}>
                            <a href="" class="smButton modal-open">
                                Add/Remove Tags
                            </a>
                        </p>
                    </div>
                    <div class="userStatus ml-4">
                        <p class="flex items-center smButtonText" on:click={workorganization}>
                            <a href="" class="smButton modal-open">
                                Work Contract
                            </a>
                        </p>
                    </div>
                </div>

            </div>

            <div class="grid grid-cols-3 gap-4 pb-5 xsl:grid-cols-1" >
                <div class="workdetailsColFirst">
                    <div class="userInfoSec3">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/Subtract.png" alt="" class="w-5 h-auto">
                            <div class="pl-4">
                                <p class="detailLbale">Associate Type</p>
                                {#if !$facility_data_store.facility_type}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{$facility_data_store.facility_type}</p>
                                {/if}
                            </div>
                        </div>
                        <div class="userStatus ">
                            <p class="flex items-center smButtonText" on:click={myBtn}>
                                <a class="smButton" id="changeAssociate">
                                    Change
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/pan.png" alt="" class="w-5 h-5">
                            <div class="pl-4">
                                <p class="detailLbale">Associate ID</p>
                                {#if !$facility_data_store.name}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{$facility_data_store.name}</p>
                                {/if}
                            </div>
                        </div>

                    </div>
                    <div class="userInfoSec3">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/organization.png" alt="" class="w-5 h-5">
                            <div class="pl-4">
                                <p class="detailLbale">Organization</p>
                                {#if !$facility_data_store.org_id}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{$facility_data_store.org_id}</p>
                                {/if}
                                
                            </div>
                        </div>
                        <div class="userStatus ">
                            <p class="flex items-center smButtonText" on:click={workorganization}>
                                <a href="" class="smButton">
                                    Add/Edit
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/location.png" class="w-6 h-6" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">City</p>
                                {#if !city}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{city}</p>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/warehouse.png" class="w-5 h-5" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Station</p>
                                {#if !$facility_data_store.station_code}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{$facility_data_store.station_code}</p>
                                {/if}
                            </div>
                        </div>

                    </div>
                   
                </div>

                <div class="workdetailsColSec">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Documents</label>
                    </div>

                    <div class="userInfoSecPadding">
                        <div class="wrapperInfoFirst">
                            <div class="flex items-start">
                                <img src="{$img_url_name.img_name}/offerlatter.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
                                    <p class="detailLbale">Offer Letter</p>
                                </div>
                            </div>
                            {#if new_off_file_obj.offer_verified == "1"}
                            <p
                            class="statusContentTag text-green font-normal xs:w-5/12"
                        >
                            <img
                                src="{$img_url_name.img_name}/checked.png"
                                class="pr-2"
                                alt=""
                            />  Verified
                        </p>
                            {:else if new_off_file_obj.offer_rejected == "1"} 
                            <p
                            class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                        >
                            <img
                                src="{$img_url_name.img_name}/reject.png"
                                class="pr-2"
                                alt=""
                            /> Rejected
                        </p>
                        <!-- {:else} -->
                        {:else if new_off_file_obj.offer_verified == "0" && new_off_file_obj.offer_rejected == "0"}
                        <p class="statusContent font-normal xs:w-5/12">
                            <img
                                src="{$img_url_name.img_name}/timer.png"
                                class="pr-2"
                                alt=""
                            />Verification Pending
                        </p>
                            {/if}

                        </div>
                        <div class="wrapperInfo ">
                            <div class="flex items-start">
                                <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                                <div class="pl-4 flex items-center">
                                    <img src="{$img_url_name.img_name}/jpeg.png" class="" alt="">
                                    {#if !new_off_file_obj.offer_name}
                                    <p>-</p>
                                    {:else}
                                    <p class="detailLbale">{new_off_file_obj.offer_name}</p>
                                    {/if}
                                </div>
                            </div>
                            <div class="userStatus ">
                                <p class="verifyText">
                                    <a href="" class="smButton">
                                        <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("offer")}}">
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="workdetailsColThird">
                    <div class="px-5 py-4 text-erBlue font-medium">
                        <label for="">Vendor Details</label>
                    </div>
                    
                    <div class="userInfoSec3 ">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/managerVendor.png" class="w-5 h-5" alt="">
                            <div class="pl-4">
                                <p class="detailLbale">Vendor</p>
                                {#if !$facility_data_store.vendor_name}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{$facility_data_store.vendor_name} - {$facility_data_store.vendor_code}</p>
                                {/if}
                            </div>
                        </div>

                    </div>
                </div>
            </div> 
         
        </div>

  <!-- Full screen modal  Add / Remove Tags  change replacement section-->


  <div class="hidden" id = "addRemoveModal">
    <div class="modalMain">
        <div class="modalOverlay"></div>

        <div class="modalContainer">
            <div class="modalHeadConmb-0">
                <div class="leftmodalInfo">
                    <p class="modalTitleText"> Add / Remove Tags</p>

                </div>
                <div class="rightmodalclose" on:click={clear}>
                    <img src="../src/img/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
                </div>
            </div>

            <div class="modalContent">
               
                <div class="ConModalContent">

                    <div class="">
                        <div class="bgAddSection mt-3">
                            <div class="addGstForm pt-4">
                                <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                    <div class="w-full">
                                        <div class="light14grey mb-1">Select Tag</div>
                                        <div class="formInnerwidthfull ">
                                            <select
                                                   class="inputboxpopover"
                                               bind:value="{select_tag_data}">
                                               <option value="">Select</option>
                                               {#if !all_tags_data}
                                               <p></p>
                                               {:else}
                                               {#each all_tags_data as tag_data}
                                               <option>{tag_data}</option>
                                                   {/each}
                                                   {/if}
                                            </select>
                                            {#if selectTag == "1"}
                                               <div class="text-red-500">
                                                   "Select tag name"
                                               </div>
                                               {/if}

                                            <div class="formSelectArrow ">
                                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                       class="flex px-2 pt-3 items-center xs:flex-wrap {hidden_field}"
                                   >
                                       <div
                                           class="light14grey"
                                       >
                                       Select Sevice Charge Vendor
                                       </div>
                                       <div
                                           class="formInnerGroup "
                                       >
                                           <select
                                               class="inputboxpopover"
                                           bind:value={serv_ch_data}>
                                          
                                           <!-- <option
                                                   class="pt-6"
                                                   >Select</option
                                               > -->
                                           <option value="">Select</option>
                                           {#if !tag_data_obj}
                                           <p></p>
                                           {:else}
                                           <!-- {#each Object.keys(tag_data_obj),tag_data_obj[Object.keys(tag_data_obj)] as key,value} -->
                                           {#each tag_data_obj as obj}
                                           <option value={obj.vendor_id}>{obj.vendor_name} - {obj.vendor_id}</option>
                                               <!-- <option
                                                   >Axis</option
                                               >
                                               <option
                                                   >SIB</option
                                               > -->
                                              
                                           {/each}
                                           {/if}
 
                                      
                                           </select>
                                           {#if selectserCh == "1"}
                                           <div class="text-red-500">
                                               "Select Sevice Charge Vendor"
                                           </div>
                                           {/if}
                                          
                                           <div
                                               class="formSelectArrow "
                                           >
                                               <img
                                                   src="../src/img/selectarrow.png"
                                                   class="w-5 h-auto"
                                                   alt=""
                                               />
                                           </div>
                                       </div>
                                   </div>
                                    <div class="w-full">
                                        <div class="light14grey mb-1">Remove On</div>
                                        <div class="formInnerwidthfull ">
                                            <input
                                                   type="date"
                                                   class="inputboxpopoverdate"
                                                   placeholder=" "
                                                   min={new Date().toISOString().split('T')[0]}
                                                   bind:value="{tag_date}"
                                               />

                                        </div>
                                        <div class="w-full">
                                            <div class="light14greylong mb-1 invisible"></div>
                                            <div class="formInnerwidthfull ">
                                                <div class="light14greylong mb-1 text-xs">Note: Use only if
                                                    required</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                    <div class="w-full">
                                        <div class="light14grey mb-1">Remarks</div>
                                        <div class="formInnerwidthfull ">
                                            <input
                                                   class="inputboxpopover"
                                                   type="text"
                                                   bind:value="{tag_remark}"
                                               />

                                        </div>
                                    </div>
                                    <div
                                           class="flex px-2 py-0 items-center xs:flex-wrap"
                                       >
                                      
                                       {#if addRemark == "1"}
                                      
                                               <div class="text-red-500">
                                                   "Please enter a remark"
                                               </div>
                                           {/if}
                                           </div>

                                </div>
                                <div class="actionButtons">

                                    <div class="updateAction ">
                                        <button
                                               class="saveandproceed"
                                               on:click="{handleTagClick(select_tag_data,tag_date,tag_remark,tag_data_obj)}"
                                               >Add</button
                                           >

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="tabwrapper flex justify-between text-center py-2 pb-3">
                            <!-- <div class="changetype py-3 w-2/4   ">
                                <p>Add Tags</p>
                            </div> -->
                            <div
                                class="changetype py-3 w-2/4 "
                                on:click={() => {
                                    temp = "Add";
                                }}
                            >
                                <p>Add Tags</p>
                            </div>

                            <div class="Historytab py-3 w-2/4    bg-bglightgreye"  on:click={tagAuditFunc}
                            >
                                <p>Tag Audit Trail</p>
                            </div>
                        </div>

                        <div class="PhysicalCardContainer">
                            <p class="font-medium">Other Applied Tags</p>
                            <div class="">
                                <table class="table  w-full text-center mt-2 ">
                                    <thead class="theadpopover h-10">
                                        <tr>
                                            <th>Tag</th>
                                            <th>Remarks</th>
                                            <th> Added by</th>
                                            <th>Added On</th>
                                            <th> Auto Removal On</th>
                                            <th> Remove</th>

                                        </tr>
                                    </thead>
                                    <tbody class="tbodypopover">{#each show_fac_array as show_fac}
                                              
                                                   <tr
                                                       class="border-b"
                                                   >
                                                       <td
                                                           >{show_fac.tag_name}</td
                                                       >
                                                       <td
                                                           >
                                                           {#if !show_fac.remarks}
                                                           <p>-</p>
                                                           {:else}
                                                           {show_fac.remarks}{/if}</td
                                                       >
                                                       <td
                                                           >{show_fac.owner}</td
                                                       >
                                                       <td
                                                           >{show_fac.creation}</td
                                                       >
                                                       <td
                                                           >
                                                           {#if !show_fac.deactivation_date}
                                                           <p>-</p>
                                                           {:else}
                                                           {show_fac.deactivation_date}{/if}</td
                                                       >
                                                       <td>
                                                           <div
                                                               class="flex justify-center"
                                                           >
                                                               <img
                                                                   src="../src/img/reject.png"
                                                                   alt=""
                                                                   on:click="{removeTag(show_fac.name,show_fac.tag_name,show_fac.owner)}"
                                                               />
                                                           </div>
                                                       </td>
                                                   </tr>
                                  
                                                   {/each}
                                               </tbody>
                                </table>
                            </div>
                        </div>
                        {#if temp == "tag"}
                            <div class="PhysicalCardContainer mb-3 ">
                                <div class="">
                            <p class="font-medium">Tag Audit Trail
</p>

                                    <table class="table  w-full text-center mt-2 ">
                                        <thead class="theadpopover h-10">
                                            <tr>
                                                <th>Tag</th>
                                                <th>Date</th>
                                                <th> Given by</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody
                                        class="tbodypopover"
                                    >
                                    {#each tag_data_arr as new_tag_audit}  
                                    <tr
                                            class="border-b"
                                        >
                                        <!-- {#each tag_data_arr as new_tag_audit}
                                            <td
                                                >{new_tag_audit.parenttype}</td
                                            >
                                            <td
                                                >{new_tag_audit.creation}</td
                                            >
                                            <td
                                                >{new_tag_audit.owner}</td
                                            >
                                            <td>{new_tag_audit.status}</td>
                                            {/each} -->
                                           
                                       
                                            <td
                                                >{new_tag_audit.parenttype}</td
                                            >
                                            <td
                                                >{new_tag_audit.creation}</td
                                            >
                                            <td
                                                >{new_tag_audit.owner}</td
                                            >
                                            <td>{new_tag_audit.status}</td>
                                            
                                        </tr>
                                        {/each}
                                        
                                       
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                      {/if}
                    </div>

                   

                 



                </div>

            </div>
        </div>
    </div>
</div>


<!--End Full screen modal  Add / Remove Tags  change replacement section-->


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
<!--  Work Contract Details modal -->
 <!-- Full screen modal work contract Desktop and Responsive Done-->
    
 <div class="hidden" id="workContractModel">
    <div class="modalMain">
        <div class="modalOverlay"></div>

        <div class="modalContainer">
            <div class="modalHeadConmb-0 sticky top-0 bg-white z-zindex99">
                <div class="leftmodalInfo">
                    <p class="modalTitleText"> Work Contract Details </p>
                    <p class="text-sm ">
                        <span class="font-medium text-lg"> {$facility_data_store.facility_name}</span>
                        <span class="userDesignation"> - {$facility_data_store.facility_type} -{$facility_data_store.name}</span>
                    </p>
                </div>
                <div class="rightmodalclose">
                    <img src="../src/img/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal" on:click="{closeWorkContract}">
                </div>
            </div>
            <div class="modalContent">
                <div class="ConModalContent">

                    <div class=" xsl:grid-cols-1 gap-4">


                        <div class="tabwrapper flex justify-between text-center py-2 pb-3">
                        </div>
                        <div>
                            <div class="bgAddSection">
                                <div class="addbuttongst  hidden">
                                    <div class="updateAction">
                                        <p class="mb-3">Upload New Physical contract here</p>
                                        <button class="ErBlueButton">Upload</button>
                                    </div>
                                </div>
                                <div class="addGstForm ">
                                    <div class="gstaddtitle px-4 py-4">
                                        <p class="text-lg font-medium">Upload New Physical Contract</p>
                                    </div>



                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Select Contract Type</div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover" bind:value = {contract_type}>
                                                    <option class="pt-6">Select</option>
                                                    {#each physical_contract_arr as contract_type}
                                                 <option class="pt-6">{contract_type.contract_type}</option>
                                                 {/each}
                                                </select>
                                                <div class="formSelectArrow ">
                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Select Organization</div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover"  bind:value = "{org_selected}">
                                                    {#if !org_data_arr}
                                                <p>No client Details found</p>
                                                {:else}
                                                <option class="pt-6" value="-1">Select</option>
                                                {#each org_data_arr as org_detail}
                                                            <option
                                                                class="pt-6"
                                                                value="{org_detail.org_id}"
                                                                >{org_detail.org_name}</option
                                                            >
                                                {/each}
                                                {/if}
                                                </select>
                                                <div class="formSelectArrow ">
                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Select Station</div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover" bind:value = "{station_selected}">
                                                    {#if !station_data_arr}
                                        <p></p>
                                        {:else}
                                        <option value="-1" disabled selected>Select</option>
                                        {#each station_data_arr as station}
                                            <option
                                                class="pt-6" 
                                                value={station.station_code}
                                                >{station.station_code} - {station.station_name}</option
                                            >
                                        {/each}
                                        {/if}
                                                </select>
                                                <div class="formSelectArrow ">
                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </div>







                                        {#each cost_center_details as cost_dets}
                                    {#if !cost_dets.cost_center}
                                    <p></p>
                                    {:else}
                                    <div class="w-full">
                                        <div class="light14grey mb-1">Cost Center</div>
                                        <div class="formInnerwidthfull ">
                                            <select
                                            class="inputboxpopover"
                                            bind:value="{cont_cost_center}"
                                        >
                                            <option
                                                class="pt-6" 
                                                >{cost_dets.cost_center}</option
                                            >
                                        
                                        </select>
                                            <div class="formSelectArrow ">
                                                <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                            </div>
                                        </div>
                                        </div>
                                        {/if}
                                        {#if !cost_dets.warehouse}
                                        <p></p>
                                        {:else}
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Warehouse</div>
                                            <div class="formInnerwidthfull ">
                                                <select
                                                class="inputboxpopover"
                                               bind:value="{cont_warehouse}"
                                            >
                                                <option
                                                    class="pt-6" 
                                                    
                                                    >{cost_dets.warehouse}</option
                                                >
                                            
                                            </select>
                                                <div class="formSelectArrow ">
                                                    <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                            </div>
                                            {/if}
                                            {/each}










                                        <div class="w-full">
                                            <div class="light14grey mb-1">Start Date</div>
                                            <div class="formInnerwidthfull ">
                                                <input type="date" class="inputboxpopoverdate" bind:value = {cont_start_date}>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">End Date</div>
                                            <div class="formInnerwidthfull ">
                                                <input type="date" class="inputboxpopoverdate" bind:value = {cont_end_date}>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="  py-3 ">
                                                <div class="light14greylong  mb-1">Upload GST Certificate</div>
                                                <div class="w-full">
                                                    <label class="cursor-pointer flex">
                                                        <div class="ErBlueButton">Select File</div>
                                                        <input type="file" class="hidden"
                                                        on:change={(
                                                            e
                                                        ) =>
                                                            onFileSelected(
                                                                e,"contract_upload"
                                                            )}
                                                bind:value="{phy_cont_file}">
                                                <div class="text-red-500">{phy_cont_message}</div>
                                                    </label>
                                                    <p>{phy_cont_img}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="actionButtons">
                                        <div class="actionCancelbutton " on:click="{closeWorkContract}">
                                            Cancel
                                        </div>
                                        <div class="updateAction ml-5"  on:click="{submit_phy_contract}">
                                            <button class="ErBlueButton">Add</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>



                        <div class="tabwrapper flex justify-between text-center py-2 pb-3"> 
                            <div class="changetype py-3 w-1/2 {e_bg_bglightgreye}" on:click={() => {contract_tab("e-cont")}}>
                                <p>E-Contracts</p>
                            </div>
                            <div class="Historytab py-3 w-1/2	 {phy_bg_bglightgreye}"  on:click={() => {contract_tab("phy_cont")}} >
                                <!-- on:click="{()=>contract_tab("phy_cont")} -->
                                <p>Physical Contracts</p>
                            </div>
                            <div class="changetype py-3 w-1/2 {all_bg_bglightgreye}" on:click={() => {contract_tab("all-cont")}}>
                                <p>View All Accepted Contracts</p>
                            </div>
                        </div>
                        <div class="PhysicalCardContainer">
                           <div class="gridMain ">
                                {#if contract_tab_val == "e-cont"}
                                <div class="heightCardContainer">
                                    <table class="table  w-full text-center mt-2">
                                        <thead class="theadpopover h-10">
                                            <tr>
                                                <th>Contract Name</th>
                                                <th>Contract Type</th>
                                                <th>
                                                    <div class="flex justify-center" > Accepted ? <img src="../src/img/arrowupdown.svg"
                                                            class="ml-2" alt=""></div>
                                                </th>
                                                <th>Accepted On</th>
                                                <th>Is Mandatory ?</th>
                                                <th>View</th>
                                                <th>Print/Save</th>
                                            </tr>
                                        </thead>
                                        {#each work_contract_arr as contract}
                                        {#if contract.is_physical_contract == 0}
                                        <tbody class="tbodypopover">
                                            <tr class="border-b">
                                                <td
                                                    >{contract.contract_name}</td
                                                >
                                                <td>{contract.contract_type}</td>
                                                <td
                                                    >
                                                    {#if contract.contract_accepted == 1}
                                                    <span class="text-green"
                                                        >Yes</span
                                                    >
                                                    {:else if contract.contract_accepted == 0}
                                                    <span class="text-green"
                                                        >No</span
                                                    >
                                                    {:else}
                                                    <p>-</p>
                                                    {/if}
                                                </td>
            
                                                <td
                                                    >
                                                    {contract.updated_date}
                                                </td>
            
            
                                                <!-- <td>10-06-2020</td> -->
                                                {#if contract.is_mandatory == 1}
                                                <td>Yes</td>
                                                {:else if contract.is_mandatory == 0}
                                                <td>No</td>
                                                {:else}
                                                <p>-</p>
                                                {/if}
                                                <td style="text-align: -webkit-center;">
                                                    {#if contract.contract_accepted == 0}
                                                    <button
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </button>
                                                    {:else}
                                                    <button on:click="{view_print_doc(contract.assigned_id,"view")}"
                                                        class="flex justify-center"
                                                    >
                                                        <a href = "" class="smButton">
                                                            <img
                                                                src="{$img_url_name.img_name}/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </button>
                                                    {/if}
                                                </td>
                                                <td style="text-align: -webkit-center;"> 
                                                    <button on:click="{view_print_doc(contract.assigned_id,"print")}"
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/if}
                                        {/each}
                                    </table>
        
        
                                </div>
                                {/if}
                                {#if contract_tab_val == "phy_cont"}
                                <div class="heightCardContainer">
                                    <table class="table  w-full text-center mt-2 ">
                                        <thead class="theadpopover h-10">
                                            <tr>
                                                <th>Contract Type</th>
                                                <th>Starts From</th>
                                                <th> Ends On</th>
                                                <th>Cost Center</th>
                                                <th> View</th>
        
                                            </tr>
                                        </thead>
                                        {#each work_contract_arr as contract}
                                        <tbody class="tbodypopover">
                                            <tr class="border-b">
                                                {#if contract.is_physical_contract == "1"}
                                                <td>{contract.contract_type}</td>
                                                <td>{contract.start_date}</td>
                                                <td>{contract.end_date}</td>
                                                <td>{contract.cost_center}</td>
                                                <td style="text-align: -webkit-center;">
                                                    {#if contract.contract_accepted == "0"}
                                                    <button 
                                                    class="flex justify-center disabled"
                                                >
                                                    <a
                                                        href=""
                                                        class="smButton"
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/view.png"
                                                            alt=""
                                                        />
                                                    </a>
                                                </button>
                                                    {:else}
                                                    <p class="flex justify-center">
                                                        <button on:click="{view_print_doc(contract.assigned_id,"view")}"
                                                                class="flex justify-center"
                                                            >
                                                                <a
                                                                    href=""
                                                                    class="smButton"
                                                                >
                                                                    <img
                                                                        src="{$img_url_name.img_name}/view.png"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            </button>
                                                    </p>
                                                    {/if}
                                                </td>
                                                {/if}
                                            </tr>
                                            <!-- <tr class="border-b">
                                                <td>Procurement agreement</td>
                                                <td>16-01-2020</td>
                                                <td>11-06-2020</td>
                                                <td>Mulshi - MHPD - NTEX</td>
                                                <td>
                                                    <p class="flex justify-center">
                                                        <a href="" class="smButton">
                                                            <img src="../src/img/view.png" alt="">
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td>Procurement agreement</td>
                                                <td>16-01-2020</td>
                                                <td>11-06-2020</td>
                                                <td>Mulshi - MHPD - NTEX</td>
                                                <td>
                                                    <p class="flex justify-center">
                                                        <a href="" class="smButton">
                                                            <img src="../src/img/view.png" alt="">
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr> -->
        
        
                                        </tbody>
                                        {/each}
                                    </table>
                                </div>
                                {/if}
                                {#if contract_tab_val == "all_cont"}
                                <div class="heightCardContainer">
                                    <table class="table  w-full text-center mt-2">
                                        <thead class="theadpopover h-10">
                                            <tr>
                                                <th>Contract Name</th>
                                                <th>Contract Type</th>
                                                <th>
                                                    <div class="flex justify-center"> Accepted ? <img src="../src/img/arrowupdown.svg"
                                                            class="ml-2" alt=""></div>
                                                </th>
                                                <th>Accepted On</th>
                                                <th>Is Mandatory ?</th>
                                                <th>View</th>
                                                <th>Print/Save</th>
                                            </tr>
                                        </thead>
                                        {#each all_accepted_contract_arr as contract}
                                        
                                        <tbody class="tbodypopover">
                                            <tr class="border-b">
                                                <td
                                                    >{contract.contract_name}</td
                                                >
                                                <td>{contract.contract_type}</td>
                                                <td
                                                    >
                                                    {#if contract.contract_accepted == 1}
                                                    <span class="text-green"
                                                        >Yes</span
                                                    >
                                                    {:else if contract.contract_accepted == 0}
                                                    <span class="text-green"
                                                        >No</span
                                                    >
                                                    {:else}
                                                    <p>-</p>
                                                    {/if}
                                                </td>
            
                                                <td
                                                    >
                                                    {contract.updated_date}
                                                </td>
            
            
                                                <!-- <td>10-06-2020</td> -->
                                                {#if contract.is_mandatory == 1}
                                                <td>Yes</td>
                                                {:else if contract.is_mandatory == 0}
                                                <td>No</td>
                                                {:else}
                                                <p>-</p>
                                                {/if}
                                                <p>{contract.contract_accepted}</p>
                                                <td style="text-align: -webkit-center;">
                                                    {#if contract.contract_accepted == 0}
                                                    <button
                                                        class="flex justify-center disabled" 
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </button>
                                                    {:else}
                                                    <button on:click="{view_print_doc(contract.assigned_id,"view")}"
                                                        class="flex justify-center"
                                                    >
                                                        <a href = "" class="smButton">
                                                            <img
                                                                src="{$img_url_name.img_name}/view.png"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </button>
                                                    {/if}
                                                </td>
                                                <td style="text-align: -webkit-center;">
                                                    <button on:click="{view_print_doc(contract.assigned_id,"print")}"
                                                        class="flex justify-center"
                                                    >
                                                        <a
                                                            href=""
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/printer.svg"
                                                                alt=""
                                                            />
                                                        </a>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/each}
                                    </table>
        
        
                                </div>
                                {/if}
                            </div>


                        </div>

                    </div>


                </div>

            </div>
        </div>
    </div>
</div>
             
                <!-- View Contract Model -->
{#if view_contract == 1}
<div id="div1">{new_contract_data}</div>
<iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc={new_contract_data}></iframe>
<iframe name="view_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc={new_contract_data}></iframe>

   <div id="user_details">
    <center><span style="font-size:22px;font-weight: bold;">{facility_id}</span></center>
    <br>
    <br>

    <span style="font-size:20px;font-weight: bold;">ESIGNATURE</span>
    <br>
    <br>
    {#each esign_data_arr as esign}
    <table border="1" style="width:90% ;" class="table table-bordered">
        <thead><tr>
            <th> Accepted On</th>
            <th> Accepted By</th>
            <th>IMEI</th>
            <th>IP</th>
            <th>Geo-codes</th>
            <th>UFID</th>
        </tr></thead>
        
        <tbody>
            <tr>
                <td>{esign.modified}</td>
                <td>{esign.modified_by}</td>
                <td>{esign.imei}</td>
                <td>{esign.ip_address}</td>
                <td>{esign.lat_long}</td>
                <td>{esign.facility_id}</td>
            </tr>
        </tbody>
       
    </table> 
    <br>
    <br>
    {/each}
    
    <br>
    {#each esign_data_arr as esign}
    <table border="1" style="width:90%;" class="table table-bordered">
        
        <tbody>
            <tr>
                <th>Device Used : </th>
                <td>{esign.model_no}<br> Version - {esign.android_version}</td>
                
            </tr>
            
        </tbody>
        </table>
        <br>
        <br>
    {/each}
    <br>
    <br>
   </div>
{/if}
   
   

    <!-- view Contract Model -->
    <!-- <div class="hidden" id= "viewContractDetails">
        <div class="modalMain">
            <div class="modalOverlay"></div>
    
            <div class="modalContainer">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class="modalTitleText"> View </p>
                       
                    </div>
                    <div class="rightmodalclose">
                        <img src="../src/img/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal" on:click="{closeContractView}">
                    </div>
                </div>
                <div class="modalContent"> -->
                   <!-- {new_contract_data} -->
                   <!-- <iframe name="view_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc={new_contract_data}></iframe>
                </div>
            </div>
        </div>
    </div>  -->


<Toast type={toast_type}  text={toast_text}/>
