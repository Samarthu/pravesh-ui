
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
                    facility_document,addnew_cheque_details,bank_details_info,cheque_details,gst_details,
                    work_details_data,print_data,get_physical_contracts,save_physical_contract,get_station_details,
                    get_all_accepted_contracts} from "../../services/onboardsummary_services";
            import {bgv_data_store} from '../../stores/bgv_store'
            import {uploadDocs} from "../../services/bgv_services";
            import {get_date_format} from "../../services/date_format_servives";
            // import {bank_details,cheque_details,facility_document,show_fac_tags,get_loc_scope,
            //     facility_data,facility_bgv_init,all_facility_tags} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            // import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store"
            import {bgv_config_store} from '../../stores/bgv_config_store'
            import Toast from './toast.svelte';
            import { SvelteToast, toast } from '@zerodevx/svelte-toast'
            import {success_toast ,error_toast,warning_toast} from '../../services/toast_theme';
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
            import {get_pravesh_properties_method} from "../../services/workdetails_services";
            import {get_client_org_mapping,get_client_details,get_specific_name,get_change_associte,get_assoc_types,send_associate_req,save_mapping} from '../../services/vmt_verify_services'
            import {approve_reject_status} from "../../services/vmt_verify_services";
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
            export let username;
            let id_select;
            let stat_select;
            let stat_code = "";
            let emp_number
            let requestType = "";
            let status_display = 0; 
            let org_AN_flag = 0;
            let get_client_details_data = [];
            let newType;
            let attendenceType;
            let get_client_data_mapping_data = [];
            let station_code_arr = [];
            let station_data_array = [];
            let table_head = "";
            let mapping_blocked_data = [];
            let crClient = "no";
            let select = "-1";

        //    ASSOCIATE TYPE VARS
        let fromDate;
        let assocRemarks = "";
        let get_assoc_types_data = [];
        let get_change_associte_data =[];
        let pan_number = "";
        // let voter_number = "";
        // let aadhar_number = "";
        // let address_number = "";
        let dl_number = "";
        // let off_number ="";
        // let pass_number = "";
        // let police_number = "";

            export let pancard_obj = {
                pan_num:null,
                pan_attach:null,
                pan_name:null,
                pan_verified:null,
                pan_rejected:null
            }
            export let document_data_load;
            export let aadhar_obj = {
                aadhar_num:null,
                aadhar_attach:null,
                aadhar_name:null,
                aadhar_verified:null,
                aadhar_rejected:null
            }
            // export let fac_photo_obj = {
            //     profile_url:null,
            //     profile_verified:null,
            //     profile_rejected:null
            // }
            export let addproof_obj = {
                address_name:null,
                address_url:null,
                address_verified:null,
                address_rejected:null
            };
            export let can_cheque_obj = {
                can_cheque_name:null,
                can_cheque_url:null,
                can_cheque_verified:null,
                can_cheque_rejected:null
            };
            export let dl_photo_obj = {
                dl_lic_num:null,
                dl_lic_name:null,
                dl_lic_url:null,
                dl_verified:null,
                dl_rejected:null
            };
            export let new_off_file_obj = {
                offer_name:null,
                offer_url:null,
                offer_verified:null,
                offer_rejected:null,
                offer_number:null,
                offer_type:null
            };
            export let admin;
            export let is_adhoc_facility;
            // let gst_doc_obj = {
            //     gst_name:null,
            //     gst_url:null,
            //     gst_doc_num:null,
            //     gst_verified:null,
            //     gst_rejected:null
            // };
            let selectserCh ;
            let pay_my_ser = "0";
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
            // let selectTag,addRemark,selectsearch;
            export let city;
            export let show_upload_btn;
            export let remove_upload_btn;
            let org_name;
            console.log("city data new",city);
            let facility_address,facility_postal,facility_password,status_name;
            export let location_id;
            let new_fac_remarks = [];
            let select_tag_data,serv_ch_data;
            $:if(select_tag_data){
                change_pay_my_ser_ch()
            }
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
            let image_path;
            let document_number=""
            let document_type="";
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
            let new_offer_name = ""
            let new_offer_img = ""

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
            let station_selected = "";
            $:{
                if(org_selected){
                org_dependent()
                }
            }
            $:if(stat_select != null){
                console.log("station_select",stat_select)
                if(stat_select){
                    station_code_select(stat_select);
                }
            }
            $:{
                if(station_selected){
                station_dependent()
                }

            }
    //     $:if(stat_select != null){
    //     console.log("station_select",stat_select)
    //     station_code_select(stat_select);
    // }

    $:if(id_select != null){
        console.log("id_select",id_select)
        org_id_select(id_select);
    }

    $:{
        attendenceType = newType;
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
                    // toast_type = "error";
                    // toast_text = get_loc_scope_res.body.message;
                    error_toast(error)
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
                    // toast_type = "error";
                    // toast_text = error
                    error_toast(error)
                    
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
                show_spinner=false
                // toast_type = "error";
                // toast_text = "Select Contract Type";
                error_toast("Select Contract Type")
                return
            }
            if(!org_selected || org_selected == "-1"){
                show_spinner=false
                // toast_type = "error";
                // toast_text = "Select Organization Id";
                error_toast("Select Organization Id")
                return
            }
            if(!station_selected || station_selected == "-1"){
                show_spinner=false
                // toast_type = "error";
                // toast_text = "Select Station Id";
                error_toast("Select Station Id")
                return
            }
            if(!cont_start_date){
                show_spinner=false
                // toast_type = "error";
                // toast_text = "Select Start Date";
                error_toast("Select Start Date")
                return
            }
            if(!cont_end_date){
                show_spinner=false
                // toast_type = "error";
                // toast_text = "Select End Date";
                error_toast("Select End Date")
                return
            }
            if(!phy_cont_file){
                show_spinner=false
                // toast_type = "error";
                // toast_text = "Upload File";
                error_toast("Upload File")
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
                    // toast_type = "success";
                    // toast_text = save_phy_contract_res.body.message;
                    success_toast(save_phy_contract_res.body.message)

                    let work_details_res = await work_details_data();
                try {
                    if(work_details_res.body.status == "green"){
                        show_spinner = false;
                        // toast_type = "success";
                        // toast_text = work_details_res.body.message;
                        success_toast(work_details_res.body.message)

                        work_contract_arr = work_details_res.body.data;
                    }
                    else if(work_details_res.body.status == "red"){
                        show_spinner = false;
                        // toast_type = "error";
                        // toast_text = work_details_res.body.message;
                        error_toast(work_details_res.body.message)

                    }
                    else{
                        show_spinner = false;
                        // toast_type = "error";
                        // toast_text = "Something went wrong";
                        error_toast("Something went wrong")

                    }
                    work_contract_arr = work_contract_arr;
                    // for(let i=0;i<work_contract_arr.length;i++){

                    // }
                    console.log("work_contract_arr",work_contract_arr);
                }
                catch (error) {
                    show_spinner = false;
                    // toast_type = "error";
                    // toast_text = error;   
                    // error_toast("Something went wrong")
                    error_toast(error)
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
    async function station_code_select(station_code){
        show_spinner = true
        console.log("station_code",station_code)
        station_code_arr = [];
        console.log("station_code",station_code.toLowerCase())
        let get_specific_name_res = await get_specific_name(station_code.toLowerCase())
        try{
            if(get_specific_name_res.body.status == "green"){
                show_spinner = false
        station_code_arr.push(get_specific_name_res.body.data[0].resource_id)
        console.log("get_specific_name_res",get_specific_name_res)

        station_code_arr = station_code_arr;
        console.log("station_code_arr",station_code_arr)
        }
        }
        catch(err){
            show_spinner = false
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }

    }

    async function org_id_select(org_id){
        show_spinner = true
        if(org_id == "AN"){
            table_head = "Name in COMP"
            show_spinner = false
        }
        else if(org_id == "FT"){
            table_head = "Name in LIBERA"
            show_spinner = false
        }
        else{
            table_head = "Org Specific Name"
            show_spinner = false
        }
        station_code_arr = [];
        org_AN_flag = 0;
        console.log("org_AN_flag",org_AN_flag)
        station_data_array = [];
        // console.log("orgOrganization_id",org_id)
        let get_loc_scope_res = await get_loc_scope(org_id)
                for(let i=0;i<get_loc_scope_res.body.data.length;i++){
                    for(let j =0 ;j<get_loc_scope_res.body.data[i].stations.length;j++){
                        
                        // console.log("org id inside for",org_id)
                    if(org_id  == get_loc_scope_res.body.data[i].stations[j].org_id){
                        console.log("org id found",org_id);
                        station_data_array.push({"org_id":get_loc_scope_res.body.data[i].stations[j].org_id,"station_name":get_loc_scope_res.body.data[i].stations[j].station_name,"station_code":get_loc_scope_res.body.data[i].stations[j].station_code})
                        if(get_loc_scope_res.body.data[i].stations[j].org_id == "AN"){
                            org_AN_flag = 1;
                            console.log("inside if org_id",org_AN_flag)
                        }
                        else{
                            org_AN_flag = 0; 
                        }
                    }
                    }
                }
                show_spinner = false
                station_data_array = station_data_array;
        console.log("station_data_array",station_data_array);

                
    }

    async function finalMap(){ 
        show_spinner = true
        let phoneNumber,emailId;
        let orgSpecificNumber = [];

        
        // console.log("get_pravesh_properties_method",response)
        if(!id_select){
            // toast_text = "Please select organization";
            // toast_type = "error"
            error_toast("Please select Organization")
            show_spinner = false
            return
        }

        if(!stat_select){
                // toast_text = "Please select Station";
                // toast_type = "error";
                error_toast("Please select Station")
                show_spinner = false
                return
            }

        let response = await get_pravesh_properties_method()
        // console.log("id_select == response.body.data.mapping_blocked_org",id_select,)
        // if(id_select == response.body.data.mapping_blocked_org){
            mapping_blocked_data = response.body.data.mapping_blocked_org.split(",");
            
            console.log("response.body.data.mapping_blocked_org.split",response.body.data.mapping_blocked_org.split(","))


            mapping_blocked_data = mapping_blocked_data;
            for(let i = 0; i<mapping_blocked_data.length;i++){
                // console.log("mapping_blocked_data inside if",mapping_blocked_data[i])
                if(id_select == mapping_blocked_data[i]){
                    // toast_text = "Mapping is not allowed for this Organization";
                    // toast_type = "error"
                    error_toast("Mapping is not allowed for this Organization")
                    return
                }
            }
            if($facility_data_store.is_bgv_verified == undefined || $facility_data_store.is_bgv_verified != 1){
                // toast_text = "BGV Verification Incomplete !!";
                // toast_type = "error"
                error_toast("BGV Verification Incomplete !!")
                return
            }
            var profileIncom = false;
            console.log("dl_numer and pancard_numebr")
            if (dl_photo_obj.dl_lic_num == undefined || dl_photo_obj.dl_lic_num.length < 7) {
                profileIncom = true;
            }
            if (pancard_obj.pan_num == undefined || pancard_obj.pan_num.length < 7) {
                profileIncom = true;
            }
            if (profileIncom) {
                // toast_text = "Upload both Pancard and Driving Licence first !!";
                // toast_type = "error"
                error_toast("Upload both Pancard and Driving Licence first !!")
                return;
            }
            console.log("checking requestType",requestType)
            if(requestType != null){
                crClient = "yes";
                console.log("checking req2 ",crClient)
            }
        

            console.log("checking req ",crClient)
            if (crClient == "yes"){
                if ($facility_data_store.is_bgv_intiated == 1) {
                console.log("inside $facility_data_store.is_bgv_intiated == 1")
                    if ($bgv_data_store != undefined && $bgv_data_store.phone_number != undefined) {
                        phoneNumber = $bgv_data_store.phone_number;
                        console.log("inside phoneNumber",phoneNumber,get_client_details_data)
                        
                        for(let i=0;i<get_client_details_data.length;i++){
                            if(get_client_details_data[i].mobile_number == phoneNumber){
                                // toast_text =  'Rabbit ID already requested for mob number <br>' + phoneNumber + "<br> Please update new number in <br> Basic Information Section under BGV <br> and try again";
                                // toast_type = "error"
                                error_toast('Rabbit ID already requested for mob number <br>' + phoneNumber + "<br> Please update new number in <br> Basic Information Section under BGV <br> and try again")
                            }
                        }

                    }
                    if ($bgv_data_store.email_id == undefined || $bgv_data_store.email_id.trim().length == 0) {
                        // toast_type = "error"
                        // toast_text = "Please update email address in BGV form and then try"
                        error_toast("Please update email address in BGV form and then try")

                        return;
                    }
                    

                    if ($bgv_data_store.is_email_verified != 1) {
                        // toast_type = "error"
                        // toast_text = "Please verify email address in BGV form and then try"
                        error_toast("Please update email address in BGV form and then try")

                        return;
                    }
                    emailId = $bgv_data_store.email_id;
            }
            }
            
            if(!stat_code || stat_code=="-1"){
                // toast_text = "Please select Specific Name or COMP Name";
                // toast_type = "error";
                error_toast("Please select Specific Name or COMP Name")
                return
            }
            if(stat_code == "Create Only Rabbit ID/COMP ID" && requestType == ""){
                // toast_text = "Please select Rabbit Id or Comp Id option";
                // toast_type = "error";
                error_toast("Please select Rabbit Id or Comp Id option")
                
            }

            let new_org_name
            for(let i=0;i<get_client_data_mapping_data.length;i++){
                if(id_select == get_client_data_mapping_data[i].org_id){
                    new_org_name = get_client_data_mapping_data[i].org_name
                }

            }

            for(let i=0;i<station_code_arr.length;i++){
                console.log("inside station_code_arr" , station_code_arr[i])
                if(stat_code == station_code_arr[i]){
                    let org_num = parseInt(station_code_arr[i].split("_").pop())
                    if(isNaN(org_num) == false){
                            orgSpecificNumber.push(station_code_arr[i].resource_idsplit("_").pop())
                        }
                }
            }

            if(stat_code == "Create Only Rabbit ID/COMP ID") {
                stat_code = $bgv_data_store.facility_name ;
                console.log("stat_code checking",stat_code)
            }

            
                let final_map_load = {
                "facility_id":facility_id,
                "org_id": id_select,
                "org_name": new_org_name,
                "station_code": stat_select,
                "cr_client":crClient,
                "client_id": emp_number,
                "status": "active",
                "mobile_number": phoneNumber,
                "extName": stat_code.trim(),
                "req_type": requestType,
                "email_id": emailId
            }

            let final_save_mapping_res = await save_mapping(final_map_load)
            console.log("final_save_mapping_res",final_save_mapping_res)
            // try {
                if(final_save_mapping_res.body.status == "green"){
                    // toast_text = final_save_mapping_res.body.message;
                    // toast_type = "green";
                    success_toast(final_save_mapping_res.body.message)

                    id_select = "";





                    let get_client_details_res = await get_client_details(facility_id)
        try {
            if (get_client_details_res != "null"){
                for(let i=0; i< get_client_details_res.body.data.length;i++){
                    get_client_details_data.push(get_client_details_res.body.data[i]);
                }
                get_client_details_data = get_client_details_data;
                console.log("get_client_details_data",get_client_details_data)
            }
        } catch (err) {
            // toast_type = "error";
            // toast_text = get_client_details_res.body.message;
            error_toast(err)
        }
        }
            // }
             else {
                // toast_text = "Error occured while adding mapping";
                // toast_type = "error";
                error_toast("Error occured while adding mapping")
            }
        console.log("final_map_load",final_map_load)

    }
        onMount(async () => {
            let get_org_data_res =  await get_client_org_mapping();
            try {
            if(get_org_data_res.body.status == "green"){
                for(let i=0;i<get_org_data_res.body.data.length;i++){

                    if($facility_data_store.org_id == get_org_data_res.body.data[i].org_id){
                        org_name = get_org_data_res.body.data[i].org_name;
                    }
                    org_data_arr.push({"org_id":get_org_data_res.body.data[i].org_id,"org_name":get_org_data_res.body.data[i].org_name})
                }
                org_data_arr = org_data_arr;
                
            }
            else{
                // toast_type = "error";
                // toast_text = "No client Data";
                error_toast("No client Data")
            }
            } catch(err) {
                // toast_type = "error";
                // toast_text = err;
                error_toast(err)
       
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
                // toast_type = "error";
                // toast_text = all_tags_res.body.message;
                error_toast(err)

            }
            show_spinner = false;


            ////////////// BGV/////////////////
           let facility_bgv_check_res = await facility_bgv_check();
        console.log("facility_bgv_check_res",facility_bgv_check_res)
        try {
            if(!facility_bgv_check_res || facility_bgv_check_res.body.data.length == "0"){
                var eighteenYearsAgo = new Date();
                $bgv_data_store.basic_info_dob = get_date_format(new Date(eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18)),"yyyy-mm-dd");
                // $bgv_data_store.basic_info_updated_on = $bgv_data_store.basic_info_updated_on.get_date_format(bgv_date_format,"dd-mm-yyyy-hh-mm");
                let bgv_date_format = new Date($bgv_data_store.basic_info_updated_on);
                $bgv_data_store.basic_info_updated_on =get_date_format(bgv_date_format,"dd-mm-yyyy-hh-mm");
        }
        else{
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            // gend_selected = $bgv_data_store.gender;
            // add_is_perm = $bgv_data_store.address_type;
            // curr_same = $bgv_data_store.current_address_is_same;
            // police_add_per = $bgv_data_store.police_address_type;
            if(!$bgv_data_store.basic_info_dob){
                var eighteenYearsAgo = new Date();
                $bgv_data_store.basic_info_dob = get_date_format(new Date(eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18)),"yyyy-mm-dd");
            }
                // $bgv_data_store.basic_info_updated_on = $bgv_data_store.basic_info_updated_on.get_date_format(bgv_date_format,"dd-mm-yyyy-hh-mm");
                let bgv_date_format = new Date($bgv_data_store.basic_info_updated_on);
                $bgv_data_store.basic_info_updated_on =get_date_format(bgv_date_format,"dd-mm-yyyy-hh-mm");
            
        }
    }
    catch(err) {
        console.log("Error",err)
        // message.innerHTML = "Error is " + err;
    }

        });

    function myBtn() {
        associateModal.style.display = "block";
    }

    async function workorganization() {
        get_client_details_data = [];
        get_client_data_mapping_data = [];
        show_spinner = true;
        workContractModel.style.display = "block";
        let work_details_res = await work_details_data();
        try {
            if(work_details_res.body.status == "green"){
                show_spinner = false;
                // success_toast(work_details_res.body.message)

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
                // toast_type = "error";
                // toast_text = work_details_res.body.message;
                error_toast(work_details_res.body.message)

            }
            else{
                show_spinner = false;
                // toast_type = "error";
                // toast_text = "Something went wrong";
                error_toast("Something went wrong")

            }
            work_contract_arr = work_contract_arr;
            console.log("work_contract_arr",work_contract_arr);
        }
        catch (error) {
            show_spinner = false;
            // toast_type = "error";
            // toast_text = error;   
            error_toast(error)

        }
        
        let physical_contract_res =await get_physical_contracts();
        try {
            if(physical_contract_res.body.status == "green"){
                show_spinner = false;
                // toast_type = "success";
                // toast_text = physical_contract_res.body.message;
                // success_toast(physical_contract_res.body.message)

                physical_contract_arr = physical_contract_res.body.data;
            }
            else{
                show_spinner = false;
                // toast_type = "error";
                // toast_text = "Something went wrong";
                error_toast("Something went wrong")

            }  
            physical_contract_arr = physical_contract_arr;
        }
        catch (error) {
            show_spinner = false;
            // toast_type = "error";
            // toast_text = error;
            error_toast(error)

        }

        let all_accepted_contract_res =await get_all_accepted_contracts();
        try {
            if(all_accepted_contract_res.body.status == "green"){
                show_spinner = false;
                // toast_type = "success";
                // toast_text = all_accepted_contract_res.body.message;
                // success_toast(all_accepted_contract_res.body.message)

                all_accepted_contract_arr = all_accepted_contract_res.body.data;
                for(let i=0;i<all_accepted_contract_arr.length;i++){
                    let updated_date_format = new Date(all_accepted_contract_arr[i].updated_date);
                    all_accepted_contract_arr[i].updated_date = get_date_format(updated_date_format,"dd-mm-yyyy-hh-mm");
                    
                }
                
            }
            else{
                show_spinner = false;
                // toast_type = "error";
                // toast_text = "Something went wrong";
                error_toast("Something went wrong")

            }  
            all_accepted_contract_arr = all_accepted_contract_arr;
            console.log("all_accepted_contract_arr",all_accepted_contract_arr);
        }
        catch (error) {
            show_spinner = false;
            // toast_type = "error";
            // toast_text = error;
            error_toast(error)
            
        }

    }
    
    function clear() {
        addRemoveModal.style.display = "none";
        select_tag_data="-1"
        serv_ch_data="-1"
        tag_date=""
        tag_remark=""

    }

    async function view_add_client() {
        get_client_details_data = [];
        get_client_data_mapping_data = [];
        workorganizationModel.style.display = "block";
        if($facility_data_store.status == "Deactive"){
            status_display = -1;
            // toast_text = "User is Deactive";
            // toast_type = "error";
            error_toast("User is Deactive")

        }
        let get_client_details_res = await get_client_details(facility_id)
        try {
            if (get_client_details_res != "null"){
                for(let i=0; i< get_client_details_res.body.data.length;i++){
                    get_client_details_data.push(get_client_details_res.body.data[i]);
                }
                get_client_details_data = get_client_details_data;
                console.log("get_client_details_data",get_client_details_data)
            }
        } catch (err) {
            // toast_type = "error";
            // toast_text = get_client_details_res.body.message;
            error_toast(get_client_details_res.body.message)

        }

        let get_loc_scope_res = await get_loc_scope()
        try {
            if (get_loc_scope_res != "null"){
                // for(let i=0; i< get_loc_scope_res.body.data[0].stations.length;i++){
                //     get_loc_scope_data.push(get_loc_scope_res.body.data[i]);
                //     station_code.push(get_loc_scope_res.body.data[0].stations[i].station_code);
                //     // console.log("get_loc_scope_res",get_loc_scope_res.body.data[0].stations[i].station_code)
                // }
                // station_code = station_code;
                // get_loc_scope_data = get_loc_scope_data;
                // console.log("get_loc_scope_data",get_loc_scope_data)
                for(let i=0;i<get_loc_scope_res.body.data.length;i++){
                    // console.log(get_loc_scope_res.body.data[i]);
                    for(let j =0 ;j<get_loc_scope_res.body.data[i].stations.length;j++){
                        // console.log(get_loc_scope_res.body.data[i].stations[j].station_name);
                        station_data_array.push({"station_code":get_loc_scope_res.body.data[i].stations[j].station_code,"station_name":get_loc_scope_res.body.data[i].stations[j].station_name})

                    }

                }
                station_data_array = station_data_array;
                console.log("station_data_array",station_data_array);
            }


        } catch (error) {
            // toast_type = "error";
            // toast_text = get_loc_scope_res.body.message;
            error_toast(error)

        }


        // let get_client_data_mapping_res = await get_client_org_mapping()
        // if (get_client_data_mapping_res != "null"){
        //     for(let i=0;i<get_client_data_mapping_res.body.state.data.length;i++){
        //         get_client_data_mapping_data.push(get_client_data_mapping_res.body.data[i]);
        //         org_id.push(loc_data_res.body.data[i].org_id);
        //     }
        //     org_id = org_id;
        //     get_client_data_mapping_data = get_client_data_mapping_data;
        //     console.log("get_client_data_mapping_data",get_client_data_mapping_data)
        // }




        let get_client_data_mapping_res =  await get_client_org_mapping();
        try {
            get_client_data_mapping_data = [];
        if(get_client_data_mapping_res.body.status == "green"){
             for(let i=0;i<get_client_data_mapping_res.body.data.length;i++){
                // station_code.push(get_client_data_mapping_res.body.data[i].station_code);
                // org_name_array.push(get_client_data_mapping_res.body.data[i].org_name)
                // get_client_data_mapping_data.push(get_client_data_mapping_res.body.data[i]);
                get_client_data_mapping_data.push({"org_id":get_client_data_mapping_res.body.data[i].org_id,"org_name":get_client_data_mapping_res.body.data[i].org_name})

                
            }
            // station_code = station_code;
            // org_name_array=org_name_array;
            get_client_data_mapping_data = get_client_data_mapping_data;
            console.log("get_client_data_mapping_data",get_client_data_mapping_data)
            // for(let i=0;i<get_client_data_mapping_data.length;i++){
               
            //     org_name = get_client_data_mapping_data[i].org_name;
            //     // gst_city_loc_id = get_client_data_mapping_data[i].location_id;
            //     // gst_state_code = get_client_data_mapping_data[i].state_code;
            //     console.log("org_name",org_name)
            // }
        }
        else{
            // toast_type = "error";
            // toast_text = "No client Data";
            error_toast("No client Data")
        }
        
        } catch(err) {
            // toast_type = "error";
            // toast_text = get_client_data_mapping_res.body.message;
            error_toast(err)
        
        }
        //     async function station_code_select(stat_select){
        //         console.log("stat_select inside station_code_select",stat_select)
        //     let get_specific_name_res = await get_specific_name(stat_code)
        //     console.log("get_specific_name_res",get_specific_name_res)
        //     try {
        //         if(get_specific_name_res.stat_code != "null"){
        //             // for(i=0;i<get_specific_name_res.body.data.length;i++)
        //             // console.log("get_specific_name_res",get_specific_name_data)
        //             // get_specific_name_data.push({"resouce_id":get_specific_name_res.body.data[i].resource_id})
        //             // console.log("get_specific_name_res",get_specific_name_data)
        //             for(let i=0; i< get_specific_name_res.body.data.length;i++){
        //                 get_specific_name_data.push(get_specific_name_res.body.data[i]);
        //                 }
        //                 get_specific_name_data = get_specific_name_data;
        //                 // console.log("get_client_details_data",get_specific_name_data)
        //         }
        //     } catch (error) {
        //         toast_type = "error";
        //         toast_text = get_specific_name_res.body.message;
        //     }
            
        // }
}
    async function upload_offer_func(){

        let new_doc_payload = {"documents":[{
            "file_name":new_offer_img,
            "doc_category":"Offer Letter",
            "status":"created",
            "resource_id":facility_id,
            "user_id":username,
            "doc_number":"",
            "doc_type":"newOffFile",
            "facility_id":facility_id,
            "remarks":"Offer Letter Upload",
            "pod":new_offer_name}]}
            
            console.log("new_doc_payload",new_doc_payload)
            let save_doc_res = await uploadDocs(new_doc_payload);
            try {
                if(save_doc_res.body.status == "green"){
                    closeViewModel()
                    document_data_load();
                    show_spinner = false;
                    // toast_type = "success"
                    // toast_text = save_doc_res.body.message;
                    success_toast(save_doc_res.body.message)
                }
            } 
            catch (err) {
                show_spinner = false;
                // toast_type = "error";
                // toast_text = err;
                error_toast(err)

            }
    }

    function closeWorkorganization() {
        get_client_details_data = [];
        get_client_data_mapping_data = [];
        workorganizationModel.style.display = "none";
    }

    async function openassociateTypeMOdal() {
        get_change_associte_data = [];
        get_assoc_types_data = [];
        associateTypeMOdal.style.display = "block";

        let get_change_associte_res = await get_change_associte();
        // console.log("testing get_change_associte_res",get_change_associte_res)
        try {
            if (get_change_associte_res.body.status == "green"){
                // console.log("get_change_associte_res.body.status",get_change_associte_res.body.data.length)
                    for(let i=0; i< get_change_associte_res.body.data.length;i++){
                        // console.log("inside get_change_associte_data",get_change_associte_data)
                        get_change_associte_data.push(get_change_associte_res.body.data[i]);
                    }
                    get_change_associte_data = get_change_associte_data;
                    // console.log("get_change_associte_data",get_change_associte_data)
                }
        } catch (err) {
            // toast_type = "error";
            // toast_text = get_change_associte_res.body.message;
            console.log("inside error with associate")
        }

        let get_assoc_types_res = await get_assoc_types($facility_data_store.org_id,$facility_data_store.station_code);
        console.log("testing get_assoc_types_res",get_assoc_types_res)
        try {
            if (get_assoc_types_res.body.status == "green"){
                // console.log("inisde get_assoc_types_res.body.status",get_assoc_types_res.body.data)
                // for(let i=0;i<=get_assoc_types_res.body.data.length;i++){
                    for(let i=0;i<get_assoc_types_res.body.data.length;i++){
                    get_assoc_types_data.push(get_assoc_types_res.body.data[i])
                }
                get_assoc_types_data = get_assoc_types_data;
                console.log("inside for get_assoc_types_data",get_assoc_types_data)
            }
        } catch (err) {
            console.log(err)
            console.log("error in getting assoc types")
        }
    }

    function closeassociateTypeMOdal() {
        get_change_associte_data = [];
        get_assoc_types_data = [];
        associateTypeMOdal.style.display = "none";
    }

    async function finalreqAssoc(){
        let update_date_arr = [];
        console.log("get_change_associte_data inside final",get_change_associte_data)
        // let new_from_date =  get_date_format(fromDate,"yyyy-mm-dd"))
        // new Date(fromDate)
        let new_start_date = new Date(fromDate);
        let updated_start_date = get_date_format(new_start_date,"yyyy-mm-dd");
        let get_change_associte_res = await get_change_associte();
        let get_assoc_types_res = await get_assoc_types($facility_data_store.org_id,$facility_data_store.station_code);

        for(let i=0;i<get_change_associte_data.length;i++){
            update_date_arr.push(get_change_associte_data[i].from_date)

        }

        if(!newType){
            // toast_text = "Please select New Type";
            // toast_type = "error";
            error_toast("Please select New Type")

            return
            }

            console.log("inside update_date_arr.includes(updated_start_date)",update_date_arr.includes(updated_start_date))
        if(!fromDate && update_date_arr.includes(updated_start_date) == true){
            
            // toast_text = "Please select vaild From date";
            // toast_type = "error";
            error_toast("Please select vaild From date")
            
            return
        }


        if(!assocRemarks){
            // toast_text = "Please select Remarks";
            // toast_type = "error";
            error_toast("Please select Remarks")
            
            return
        }


        let final_req_load = {
                "facility_id":facility_id,
                "facility_type": $facility_data_store.facility_type,
                "attendance_facility_type": newType,
                "from_date": updated_start_date,
                "property_type":'facility_type',
                "property_value": attendenceType,
                "remark": assocRemarks,
                "status": $facility_data_store.status,
            }

            let send_associate_req_res = await send_associate_req(final_req_load)
            console.log("send_associate_req_res",send_associate_req_res)
                if(send_associate_req_res.body.status == "green"){
                    get_change_associte_data = [];
                    console.log("inside final",get_change_associte_data)
                    // toast_text = send_associate_req_res.body.message;
                    // toast_type = "green";
                    success_toast(send_associate_req_res.body.message)

                    console.log("inside 2404")
                    let get_change_associte_res = await get_change_associte();
                    try {
                        if (get_change_associte_res.body.status == "green"){
                            console.log("inside 2404")
                                for(let i=0; i< get_change_associte_res.body.data.length;i++){
                                    console.log("inside 2404")
                                    get_change_associte_data.push(get_change_associte_res.body.data[i]);
                                }
                                get_change_associte_data = get_change_associte_data;
                                console.log("inside 2404")
                            }
                    } catch (err) {
                        // console.log("inside error with associate")
                        error_toast(err)
                    }
                }
            else {
                // toast_text = "Error occured while sending associate request";
                // toast_type = "error";
                error_toast("Error occured while sending associate request")

            }
            console.log("final_req_load",final_req_load)
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
                // toast_type = "error";
                // toast_text = "No Tags Found";
                error_toast("No Tags Found")

            }
        } 
        catch(err) {
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        
         }

        let service_vend_res = await service_vendor();
        console.log("service_vend_res",service_vend_res)
        try {
            console.log("location_id",location_id)
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
                // toast_type = "error";
                // toast_text = "No Vendor Found";
                error_toast( "No Vendor Found")

            }
        }
        catch(err) {
            show_spinner = false;
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)

        }


    }

    async function handleTagClick(){
        show_spinner = true;
        console.log("handle tag clicked",show_spinner)
        let new_tag_id
        try {   
           
        //     if(all_tags_res.body.status == "green"){
        
        for(let i=0; i < all_tags_res.body.data.length; i++){
            // console.log("INDISDE FOR LOOPform_data from html",select_tag_data,all_tags_res.body.data[i].tag_name)
            if(select_tag_data == all_tags_res.body.data[i].tag_name){
                new_tag_id = all_tags_res.body.data[i].tag_id;
            }
            
        }
        if(!select_tag_data || select_tag_data == "-1"){
            
            show_spinner = false;
            error_toast("Please Select tag name")
            return
        }
        else if(!tag_remark){
            show_spinner = false;
            error_toast("Please Enter Remark")
            return
        }
        else if(select_tag_data == "Pay My Service Charge"){
            if(!serv_ch_data || serv_ch_data =="-1"){
                show_spinner = false;
                error_toast("Please Select Service Charge Data")
                return
            }
        }
        else{
           
            // console.log("select_tag_data",select_tag_data)
            show_fac_array = [];
            if(serv_ch_data=="-1")
            serv_ch_data="";
            // console.log("serv_ch_data",serv_ch_data)
            let submit_fac_res = await submit_fac_tag_data(new_tag_id,select_tag_data,tag_date,tag_remark,serv_ch_data)
            try {
                
                console.log("Show spinner inadding new tag ",show_spinner)
                if(submit_fac_res.body.status == "green"){
                    // toast_type = "success";
                    // toast_text = submit_fac_res.body.message;
                    success_toast(submit_fac_res.body.message)
                    show_spinner = false;
                    select_tag_data = "-1"
                    serv_ch_data="-1"
                    tag_date=""
                    tag_remark=""
                    // console.log("Blsnk values",select_tag_data,serv_ch_data,tag_date,tag_remark)

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
                    // toast_type = "error";
                    // toast_text = "Cannot Add Tag already exist..!";
                    error_toast("Cannot Add Tag already exist..!")

                    show_spinner = false;
                }
            }
                catch(err) {
                    show_spinner = false;
                    // toast_type = "error";
                    // toast_text = err;
                error_toast(err)

                }
        }

        }
        catch(err) {
            show_spinner = false;
            // toast_type = "error";
            // toast_text = err;
            error_toast(err)
        }
      
    }
    function change_pay_my_ser_ch(){
        if(select_tag_data == "Pay My Service Charge"){
            pay_my_ser = "1";
        }
        else{
            pay_my_ser = "0";
        }
    }

    function remove_tag_con_model(){
        remove_tag_confirmation_model.style.display = "block";
    }
    function remove_tag_con_model_close(){
        remove_tag_confirmation_model.style.display = "none";
    }

    async function confirm_delete_tag(){
        let tag_name,tag_id;
        console.log("show_fac_array",show_fac_array)
        console.log("tag_id",document.getElementById("remove_tag_id").innerHTML)

        for(let i=0;i<show_fac_array.length;i++){
            if(show_fac_array[i].tag_name == document.getElementById("remove_tag_id").innerHTML){
               tag_name = show_fac_array[i].tag_name;
               tag_id = show_fac_array[i].name;
            }
        }
        show_spinner = true;
        show_fac_array = [];
        // console.log("tag_id tag_name",tag_id,tag_name,owner)
        let fac_id = facility_id;
        // if(owner == $facility_data_store.owner){
        //         fac_id = $facility_data_store.name
        //         console.log("fac_id",fac_id)
        // }
        let remove_tag_res = await remove_tag(fac_id,tag_id,tag_name);
        if(remove_tag_res.body.status == "green")
        {
            remove_tag_con_model_close()
            // toast_type = "success";
            // toast_text = remove_tag_res.body.message;
            success_toast(remove_tag_res.body.message)

            

        
            let temp_res = await show_fac_tags($facility_data_store.facility_type);
        try {
                show_fac_array = temp_res.body.data;
                for(let i=0;i < show_fac_array.length;i++){
                    
                    let new_date =new Date(show_fac_array[i].creation)
                    show_creation_date = get_date_format(new_date,"yyyy-mm-dd")
                    show_fac_array[i].creation=show_creation_date;
                }
                show_spinner = false;
       
        }
        
        catch(err) {
        show_spinner = false;
        // toast_type = "error";
        // toast_text = err;
        error_toast(err)
         }

        }
        else{
            show_spinner = false;
            // toast_type = "error";
            // toast_text = remove_tag_res.body.message;
            error_toast(remove_tag_res.body.message)
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
            tag_data_arr = tag_data_arr.reverse();
               
        }} catch(err) {
        console.log("ERROR")
        
         }
       
    }

    async function add_tag_tab_disp(){
        temp = "Add";
    }

    function uploadOfferLetter(){
         OfferLetterModel.style.display ="block";
    }

            // function closeWorkorganization() {
            //     workorganizationModel.style.display = "none";
            // }
    function closeViewModel(){
        document.getElementById("img_model").style.display = "none";
        OfferLetterModel.style.display = "none";
    }

    function openViewModel(data,doc_number){
        document.getElementById("img_model").style.display = "block";
        // if(data == "aadhar"){
        //     image_path = $page.url.origin+aadhar_obj.aadhar_attach;
        //     // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+aadhar_obj.aadhar_attach);
        //     alt_image = "aadhar proof";
        // }
        // else if(data == "pan"){
        //     image_path = $page.url.origin+pancard_obj.pan_attach;
        //     // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+pancard_obj.pan_attach);
        //     alt_image = "pan-card proof";
        // }
        // else if(data == "address"){
        //     image_path = $page.url.origin+addproof_obj.address_url;
        //     // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+addproof_obj.address_url);
        //     alt_image = "address proof";
        // }
        // else if(data == "licence"){
        //     image_path = $page.url.origin+dl_lic_attach;
        //     // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+dl_lic_attach);
        //     alt_image = "driving licence proof";
        // }
        if(data == "offer"){
            image_path = $page.url.origin+new_off_file_obj.offer_url;
            document_number = new_off_file_obj.offer_number;
            document_type = new_off_file_obj.offer_type;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+new_off_file_obj.offer_url);
            alt_image = "";
        }
        // else if(data == "can_cheque"){
        //     image_path = $page.url.origin+can_cheque_obj.can_cheque_url;
        //     // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+can_cheque_obj.can_cheque_url);
        //     alt_image = "cancel cheque proof";
        // }
        // else if(data == "cheque_disp"){
        //     image_path = $page.url.origin+cheque_disp_obj.cheque_disp_url;
        //     // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+new_cheque.file_url);
        //     alt_image = "cheque proof";
        // } 
        else if(data == "view_physical_contract"){
            for(let i=0;i<work_contract_arr.length;i++){
                if(work_contract_arr[i].assigned_id == doc_number){
                    if(work_contract_arr[i].contract_accepted == 1){
                        image_path = $page.url.origin+work_contract_arr[i].file_url;
                        alt_image = "physical contract";
                    }
                    else{
                        document.getElementById("img_model").style.display = "none";
                        // toast_type = "error";
                        // toast_text = "Contract not accepted";
                        error_toast("Contract not accepted")

                    }
                    
                }
            }

            // image_path = $page.url.origin+cheque_disp_obj.cheque_disp_url;
        }

        for(let i = 0;i<gst_doc_arr.length;i++){
            if(data == "mult_gsts"){
                if(doc_number == gst_doc_arr[i].gst_doc_num)
                image_path = $page.url.origin+gst_url[i];
                // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+gst_url[i]);
                alt_image = "gst proof";
            }
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
            "resource_id":facility_id,
            "doc_number":document_number,
            "status_type":new_status,
            "status":"true",
            "doc_type":document_type
            }
            let doc_res = await approve_reject_status(document_load)
            try{
                if(doc_res.body.status == "green"){
                    show_spinner = false;
                    // toast_text = doc_res.body.message;
                    // toast_type = "success";
                    success_toast(doc_res.body.message)
                    closeApproveViewModel();
                    document_data_load();
                    }
            }
            catch(err){
                show_spinner = false;
                // toast_text = err;
                // toast_type = "error";
                error_toast(err)

            }
                
        }
        function closeApproveViewModel(){
            img_model_approve_rej.style.display = "none";
            document.getElementById("img_model").style.display = "none";
        }

    const onFileSelected = (e,doctext) => {
        let img = e.target.files[0];
        let extention_name = img.name.slice((img.name.lastIndexOf(".") - 1 >>> 0) + 2);
        // console.log("pdf size",   pdf.name.slice((pdf.name.lastIndexOf(".") - 1 >>> 0) + 2));
       
        if(extention_name == "pdf" || extention_name == "jpg" || extention_name == "png" || extention_name == "jpeg"){
 
        if (img.size <= allowed_pdf_size) {
            console.log("img", img);
            
            if(doctext == "contract_upload"){
            phy_cont_img = img.name;
            }
            else if(doctext == "new_offer_upload"){
            new_offer_img = img.name;
            }

            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function () {
            file_data = reader.result;
            console.log("reader",reader.result);
            
            if(doctext == "contract_upload"){
                phy_cont_file = reader.result;
                // toast_text = "Document Uploaded Successfully";
                // toast_type = "success";
                success_toast("Document Uploaded Successfully")

            }

            else if(doctext == "new_offer_upload"){
                new_offer_name = reader.result;
                // toast_text = "Document Uploaded Successfully";
                // toast_type = "success";
                success_toast("Document Uploaded Successfully")

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
    }
    }
        else{
            error_toast("Invalid File Type!")

        }
        
    }
    function workContract() {
        workContractModel.style.display = "block";
    }

    function closeWorkContract() {
        workContractModel.style.display = "none";
        view_contract = 0;
    }
    async function view_print_doc(assigned_id,type){
        console.log("Inside view print doc")
        console.log("view btn clicked",assigned_id,type)
        console.log("work_contract_arr",work_contract_arr)
        view_contract = 1;
        let pass_contract_id
        // window.print();
        for(let i = 0;i<work_contract_arr.length;i++){
            if(assigned_id == work_contract_arr[i].assigned_id){
               pass_contract_id = work_contract_arr[i].assigned_id;
            }
        }
        console.log("pass_contract_id",pass_contract_id)
        let print_data_res = await print_data(pass_contract_id);
        try {
            if(print_data_res.body.status == "green" && print_data_res.body.data != false){
                
                show_spinner = false;
                // toast_type = "success";
                // toast_text = print_data_res.body.message;
                success_toast( print_data_res.body.message)

                print_data_arr = print_data_res.body.data;
                esign_data_arr = print_data_res.body.data.esign
               
                for(let i = 0;i<work_contract_arr.length;i++){
                    if(assigned_id == work_contract_arr[i].assigned_id && work_contract_arr[i].contract_accepted == 1){
                        
                            if(type == "view"){

                                console.log("print_data_arr",print_data_arr,esign_data_arr)
                                var demo = window.open()
                                if(print_data_arr.accepted_contract){
                                    new_contract_data = print_data_arr.accepted_contract+document.getElementById("user_details").innerHTML;
                                }
                                else{
                                    new_contract_data = document.getElementById("user_details").innerHTML;
                                }
                                
                                if(new_contract_data){
                                    demo.document.write(String(new_contract_data));
                                }
                                
                                
                                // document.getElementById("workContractDetails").style.display = "none";
                                // document.getElementById("viewContractDetails").style.display = "block";
                                
                                // document.getElementById("viewContractDetails").innerHTML = '<iframe name="view_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc='+{new_contract_data}+'></iframe>';
                                // new_contract_data = print_data_arr.accepted_contract+document.getElementById("user_details").innerHTML;
                                // window.frames["view_frame"].window.focus();
                                // window.open(new_contract_data,'popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
                            }   
                            else if(type == "print"){
                                if(print_data_arr.accepted_contract){
                                    new_contract_data = document.getElementById("user_details").innerHTML+print_data_arr.accepted_contract;
                                    window.frames["print_frame"].window.print();
                                    // window.open(new_contract_data,'popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
                                }
                                else{
                                    new_contract_data = document.getElementById("user_details").innerHTML;
                                    window.frames["print_frame"].window.print();
                                }
                               
                            }
                    }
                    // else if(assigned_id != work_contract_arr[i].assigned_id && work_contract_arr[i].contract_accepted == 0){
                    //     show_spinner = false;
                    //     toast_type = "error";
                    //     toast_text = "Contract not accepted";
                    // }
                }
            }
            else if(print_data_res.body.status == "red"){
                show_spinner = false;
                // toast_type = "error";
                // toast_text = print_data_res.body.message;
                error_toast(print_data_res.body.message)

            }
            else if(print_data_res.body.data == false){
                show_spinner = false;
                // toast_type = "error";
                // toast_text = "No Contract Details Found";
                error_toast("No Contract Details Found")
                
            }
            
        }
        catch (error) {
            show_spinner = false;
            // toast_type = "error";
            // toast_text = error;
            error_toast(error)

        }
        
        
        // console.log("print_data_arr",print_data_arr);
        }
    
        function closeContractView(){
        document.getElementById("viewContractDetails").style.display = "none";
    }  
   

    </script>
      
    
         <!-- Work Details -->
        <div class="bg-white w-full Work_Details_Section ">
            <div class="detailsHeader_summary ">
                {#if show_spinner}
                <Spinner />
                {/if}
               
                <div class="right flex justify-end">
                    <p class="detailsUpdate mr-4">
                        <span><span class="font-medium">Last updated -> </span> {#if !facility_modified_date} <p>-</p> {:else}{facility_modified_date} {/if}<span
                                class="font-medium"> By -> </span> {#if !$facility_data_store.modified_by}<p>-</p>{:else}{$facility_data_store.modified_by}{/if}</span>
                    </p>
                    {#if is_adhoc_facility == false}
                    <p class="flex items-center smButtonText">
                        
                        <button class="smButton bg-erBlue text-white" on:click={()=>{
                            $documents_store.documents = [];
                            goto("workdetails")}}>
                            Edit

                        </button>
                    </p>
                    {/if}
                    {#if admin == false}
                    <p></p>
                    {:else}
                    <div class="userStatus ml-4">
                        <p class="flex items-center smButtonText" on:click={tagAddRemove}>
                            <a href="" class="smButton modal-open">
                                Add/Remove Tags
                            </a>
                        </p>
                    </div>
                    {/if}
                    {#if is_adhoc_facility == false}
                    <div class="userStatus ml-4">
                        <p class="flex items-center smButtonText" on:click={workorganization}>
                            <a href="" class="smButton modal-open">
                                Work Contract
                            </a>
                        </p>
                    </div>
                    {/if}
                </div>

            </div>

            <div class="grid grid-cols-3 gap-4 pb-5 xsl:grid-cols-1" >
                <div class="workdetailsColFirst" style="border-right: 1px solid lightgray">
                    <div class="userInfoSec3">
                        <div class="flex items-start">
                            <img src="{$img_url_name.img_name}/Subtract.png" alt="" class="w-5 h-auto">
                            <div class="pl-4">
                                <p class="detailLbale">Associate Type</p>
                                {#if !$facility_data_store.facility_type_name}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{$facility_data_store.facility_type_name}</p>
                                {/if}
                            </div>
                        </div>
                        <!-- {#if admin == false}
                        <p></p>
                        {:else} -->
                        {#if is_adhoc_facility == false}
                        <div class="userStatus ">
                            <p class="flex items-center smButtonText" on:click={openassociateTypeMOdal}>
                                <a class="smButton" id="changeAssociate">
                                    Change
                                </a>
                            </p>
                        </div>
                        {/if}
                        <!-- {/if} -->
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
                                {#if !org_name}
                                <p>-</p>
                                {:else}
                                <p class="detailData">{org_name}</p>
                                {/if}
                                
                            </div>
                        </div>
                        {#if is_adhoc_facility == false}
                        <div class="userStatus ">
                            <p class="flex items-center smButtonText" on:click={view_add_client}>
                                <a href="" class="smButton">
                                    View/Edit Client Name
                                </a>
                            </p>
                        </div>
                        {/if}
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

                <div class="workdetailsColSec" style="border-right: 1px solid lightgray">
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
                                    {#if show_upload_btn == false}
                                    <p>Not Required</p>
                                    {:else if !new_off_file_obj.offer_name}
                                    <p>-</p>
                                    {:else}
                                    <img src={$page.url.origin+new_off_file_obj.offer_url} class="w-5 mr-2" alt="">
                                    <p class="detailLbale">{new_off_file_obj.offer_name}</p>
                                    {/if}
                                </div>
                            </div>
                            <div class="userStatus ">
                                {#if new_off_file_obj.offer_name}
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("offer")}}">
                                        </a>
                                    </p>
                                {:else}
                                
                                {#if remove_upload_btn == false}
                                    {#if show_upload_btn == true}
                                   
                                        <p class="flex items-center smButtonText" on:click={uploadOfferLetter}>
                                            <a href="" class="smButton modal-open">
                                                Upload 
                                            </a>
                                        </p>
                                        {:else if remove_upload_btn == "true"}
                                        <p></p>
                                    {/if}
                                {/if}
                                
                                {/if}
                               

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
  <div class="hidden" id="addRemoveModal">
        <div class="modalMain">
            <div class="modalOverlay"></div>

            <div class="modalContainer">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class="modalTitleText"> Add / Remove Tags</p>

                    </div>
                    <div class="rightmodalclose" on:click={clear}>
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer"
                            alt="closemodal">
                    </div>
                </div>

                <div class="modalContent">

                    <div class="ConModalContent">

                        <div class="">
                            {#if is_adhoc_facility == false}
                            {#if temp2 == "gst1"}

                            <div class="addbuttongst ">

                                <div class="updateAction" on:click={()=> {

                                    temp2 = "gst2";

                                    }}>

                                    <button class="ErBlueButton">Add New Tag</button>

                                </div>

                            </div>

                            {/if}
                            {/if}


                            {#if temp2 == "gst2"}
                            <div class="bgAddSection mt-3">
                                <div class="addGstForm pt-4">
                                    <div class="grid grid-cols-3 xsl:grid-cols-1 gap-4 px-4 py-1 ">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Select Tag</div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover" bind:value="{select_tag_data}">
                                                    <option value="-1">Select</option>
                                                    {#if !all_tags_data}
                                                    <p></p>
                                                    {:else}
                                                    {#each all_tags_data as tag_data}
                                                    <option>{tag_data}</option>
                                                    {/each}
                                                    {/if}
                                                </select>
                                                <!-- {#if selectTag == "1"}
                                                <div class="text-red-500">
                                                    "Select tag name"
                                                </div>
                                                {/if} -->

                                                <div class="formSelectArrow ">
                                                    <img src="{$img_url_name.img_name}/selectarrow.png"
                                                        class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        {#if pay_my_ser == "1"}
                                        <div class="w-full">
                                           
                                            <div class="light14greylong mb-1">
                                                Select Sevice Charge Vendor
                                            </div>
                                            <div class="formInnerwidthfull ">
                                                <select class="inputboxpopover" bind:value={serv_ch_data}>

                                                    <!-- <option
                                                               class="pt-6"
                                                               >Select</option
                                                           > -->
                                                    <option value="-1">Select</option>
                                                    {#if !tag_data_obj}
                                                    <p></p>
                                                    {:else}
                                                    <!-- {#each Object.keys(tag_data_obj),tag_data_obj[Object.keys(tag_data_obj)] as key,value} -->
                                                    {#each tag_data_obj as obj}
                                                    <option value={obj.vendor_id}>{obj.vendor_name} - {obj.vendor_id}
                                                    </option>
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

                                                <div class="formSelectArrow ">
                                                    <img src="{$img_url_name.img_name}/selectarrow.png"
                                                        class="w-5 h-auto" alt="" />
                                                </div>
                                            </div>
                                            
                                        </div>
                                        {/if}
                                        <div class="w-full">
                                            <div class="light14grey mb-1">Remove On</div>
                                            <div class="formInnerwidthfull ">
                                                <input type="date" class="inputboxpopoverdate" placeholder=" " min={new
                                                    Date().toISOString().split('T')[0]} bind:value="{tag_date}"  onkeydown="return false" />

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
                                                <input class="inputboxcursortext" type="text"
                                                    bind:value="{tag_remark}" />

                                            </div>
                                        </div>
                                        <div class="flex px-2 py-0 items-center xs:flex-wrap">

                                            <!-- {#if addRemark == "1"}

                                            <div class="text-red-500">
                                                "Please enter a remark"
                                            </div>
                                            {/if} -->
                                        </div>

                                    </div>
                                    <div class="actionButtons">

                                        <div class="updateAction ">
                                            <button class="saveandproceed"
                                                on:click="{handleTagClick(select_tag_data,tag_date,tag_remark,tag_data_obj)}">Add</button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/if}
                            <div class="tabwrapper flex justify-between text-center py-2 pb-3">
                                <!-- <div class="changetype py-3 w-2/4   ">
                                            <p>Add Tags</p>
                                        </div> -->
                                {#if temp == "Add"}
                                <button class="changetype py-3 w-2/4 bg-bglightgreye border"
                                    on:click={add_tag_tab_disp}>
                                    <p>Add Tags</p>
                                </button>
                                {:else}
                                <button class="changetype py-3 w-2/4 border" on:click={add_tag_tab_disp}>
                                    <p>Add Tags</p>
                                </button>
                                {/if}

                                {#if temp == "tag"}
                                <button class="Historytab py-3 w-2/4 bg-bglightgreye border" on:click={tagAuditFunc}>
                                    <p>Tag Audit Trail</p>
                                </button>
                                {:else}
                                <button class="Historytab py-3 w-2/4 border" on:click={tagAuditFunc}>
                                    <p>Tag Audit Trail</p>
                                </button>
                                {/if}
                            </div>
                            {#if temp == "Add"}
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

                                            <tr class="border-b">
                                                <td id="remove_tag_id">{show_fac.tag_name}</td>
                                                <td>
                                                    {#if !show_fac.remarks}
                                                    <p>-</p>
                                                    {:else}
                                                    {show_fac.remarks}{/if}
                                                </td>
                                                <td>{show_fac.owner}</td>
                                                <td>{show_fac.creation}</td>
                                                <td>
                                                    {#if !show_fac.deactivation_date}
                                                    <p>-</p>
                                                    {:else}
                                                    {show_fac.deactivation_date}{/if}
                                                </td>
                                                <td>
                                                    <button class="flex justify-center">
                                                        <img src="{$img_url_name.img_name}/reject.png" alt=""
                                                            on:click={remove_tag_con_model} />
                                                    </button>
                                                </td>
                                            </tr>

                                            {/each}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/if}
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
                                        <tbody class="tbodypopover">
                                            {#each tag_data_arr as new_tag_audit}
                                            <tr class="border-b">
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


                                                <td>{new_tag_audit.remarks}</td>
                                                <td>{new_tag_audit.creation}</td>
                                                <td>{new_tag_audit.owner}</td>
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
            <!-- <div class="flex justify-end p-2">
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" on:click="{()=>{closeViewModel()}}">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div> -->
            <div class="flex justify-end p-2">
                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click={()=>{docApproveRejected("reject")}}>Reject</button>
                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click={()=>{docApproveRejected("approve")}}>Approve</button>
       
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" on:click="{()=>{closeViewModel()}}">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
                
                <img src={image_path} id="img_model_url" class="mx-auto" alt="{alt_image}">
                
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
                    <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal" on:click="{closeWorkContract}">
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
                                        <p class="mb-3">Add New Physical Work Contract</p>
                                        <button class="ErBlueButton">Upload</button>
                                    </div>
                                </div>

                                {#if temp2 == "gst1"}

                                <div class="addbuttongst ">

                                    <div class="updateAction" on:click={() => {

                                                        temp2 = "gst2";

                                                    }}>

                                        <button class="ErBlueButton">Add New Physical Work Contract</button>

                                    </div>

                                </div>

                                {/if}



                        {#if temp2 == "gst2"}
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
                                                    <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
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
                                                    <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
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
                                                    <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
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
                                                <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
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
                                                    <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                                </div>
                                            </div>
                                            </div>
                                            {/if}
                                            {/each}










                                        <div class="w-full">
                                            <div class="light14grey mb-1">Start Date</div>
                                            <div class="formInnerwidthfull ">
                                                <input type="date" class="inputboxpopoverdate" bind:value = {cont_start_date}
                                                onkeydown="return false">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                        <div class="w-full">
                                            <div class="light14grey mb-1">End Date</div>
                                            <div class="formInnerwidthfull ">
                                                <input type="date" class="inputboxpopoverdate" bind:value = {cont_end_date} onkeydown="return false">
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="  py-3 ">
                                                <div class="light14greylong  mb-1">Upload Work Contract Certificate</div>
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
                        {/if}
                            </div>

                        </div>



                        <div class="tabwrapper flex justify-between text-center py-2 pb-3"> 
                            <button class="changetype py-3 w-1/2 border {e_bg_bglightgreye}" on:click={() => {contract_tab("e-cont")}}>
                                <p>E-Contracts</p>
                            </button>
                            <button class="Historytab py-3 w-1/2 border {phy_bg_bglightgreye}"  on:click={() => {contract_tab("phy_cont")}} >
                                <!-- on:click="{()=>contract_tab("phy_cont")} -->
                                <p>Physical Contracts</p>
                            </button>
                            <button class="changetype py-3 w-1/2 border {all_bg_bglightgreye}" on:click={() => {contract_tab("all-cont")}}>
                                <p>View All Accepted Contracts</p>
                            </button>
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
                                                    <div class="flex justify-center" > Accepted ? <img src="{$img_url_name.img_name}/arrowupdown.svg"
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
                                                    <!-- {#if contract.contract_accepted == 0}
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
                                                    {:else} -->
                                                    <div
                                                        class="flex justify-center"
                                                    >
                                                        <button on:click={view_print_doc(contract.assigned_id,"view")} class="smButton">
                                                            <img
                                                                src="{$img_url_name.img_name}/view.png"
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                    <!-- {/if} -->
                                                </td>
                                                <td style="text-align: -webkit-center;"> 
                                                    <div
                                                        class="flex justify-center"
                                                    >
                                                        <button on:click={view_print_doc(contract.assigned_id,"print")}
                                                            
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/printer.svg"
                                                                alt=""
                                                            />
                                                </button>
                                            </div>
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
                                        <tbody class="tbodypopover border">
                                            <tr class="border-b">
                                                {#if contract.is_physical_contract == "1"}
                                                <td>{contract.contract_type}</td>
                                                <td>{contract.start_date}</td>
                                                <td>{contract.end_date}</td>
                                                <td>{contract.cost_center}</td>
                                                <td style="text-align: -webkit-center;">
                                                    <!-- {#if contract.contract_accepted == "0"}
                                                    <button 
                                                    class="flex justify-center disabled"
                                                >
                                                    <div
                                                        href=""
                                                        class="smButton"
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/view.png"
                                                            alt=""
                                                        />
                                                </div>
                                                </button>
                                                    {:else} -->
                                                        <div class="flex justify-center">
                                                            <button on:click={openViewModel("view_physical_contract",contract.assigned_id)}
                                                                class="smButton"
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/view.png"
                                                                    alt=""
                                                                />
                                                    </button>
                                                </div>
                                                    <!-- {/if} -->
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
                                                            <img src="{$img_url_name.img_name}/view.png" alt="">
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
                                                            <img src="{$img_url_name.img_name}/view.png" alt="">
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
                                                    <div class="flex justify-center"> Accepted ? <img src="{$img_url_name.img_name}/arrowupdown.svg"
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
                                                <!-- <p>{contract.contract_accepted}</p> -->
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
                                                    <div
                                                        class="flex justify-center"
                                                    >
                                                        <button on:click={view_print_doc(contract.assigned_id,"view")} class="smButton">
                                                            <img
                                                                src="{$img_url_name.img_name}/view.png"
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                    {/if}
                                                </td>
                                                <td style="text-align: -webkit-center;">
                                                    <div
                                                        class="flex justify-center"
                                                    >
                                                        <button on:click={view_print_doc(contract.assigned_id,"print")}
                                                            class="smButton"
                                                        >
                                                            <img
                                                                src="{$img_url_name.img_name}/printer.svg"
                                                                alt=""
                                                            />
                                                </button>
                                            </div>
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
{#if esign_data_arr.length == 0}
<div id="user_details">
    <center><span style="font-size:22px;font-weight: bold;">E- Contract - {facility_id} - {$facility_data_store.facility_name}</span></center>
    <br>
    <br>

    <span style="font-size:20px;">E- Contract - {facility_id} - {$facility_data_store.facility_name}</span>

    <span style="font-size:20px;">ESIGNATURE</span>
    <br>
    <br>
    </div>
{:else}

   <div id="user_details">
    <center><span style="font-size:22px;font-weight: bold;">{facility_id}</span></center>
    <br>
    <br>

    <span style="font-size:20px;">E- Contract - {facility_id} - {$facility_data_store.facility_name}</span>

    <span style="font-size:20px;">ESIGNATURE</span>
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
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal" on:click="{closeContractView}">
                    </div>
                </div>
                <div class="modalContent"> -->
                   <!-- {new_contract_data} -->
                   <!-- <iframe name="view_frame" width="0" height="0" frameborder="0" src="about:blank" srcdoc={new_contract_data}></iframe>
                </div>
            </div>
        </div>
    </div>  -->

<!--Offer letter upload  modal -->

<div id="OfferLetterModel" class="hidden">
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <!-- <p class=""> Reject Reason</p> -->
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{closeViewModel}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <!-- <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Upload Offer Letter
                        </label>
                        <div class="relative">
                         
                          <br>
                          <br>
                          <div
                                class="flex  py-1 items-center flex-wrap"
                            >
                                <div class="formInnerGroup">
                                    <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click="{confirm_blacklist}">Ok</button>
                                </div>
                            </div>
                          
                        </div>
                      </div> -->

                      <div class="light14grey  mb-1">
                        Upload Offer Letter
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
                                type="file"
                                class="hidden"
                                        on:change|preventDefault={(
                                            e
                                        ) =>
                                            onFileSelected(
                                                e,"new_offer_upload"
                                            )}
                                bind:value="{new_offer_name}"

                            />
                            <!-- <div class="text-red-500">{offer_upload_message}</div> -->
                        </label>
                        <p>{new_offer_img}</p>
                    </div>
                    <button
                    class="ErBlueButton" on:click|preventDefault={upload_offer_func}
                >
                    Upload 
                </button>
                </form>
            </div>
        </div>
    </div> 
</div>

<!--Offer letter upload  modal -->
<!-- Full screen modal  View/Edit Client Name Desktop and Responsive Done-->

<div class="hidden" id="workorganizationModel">
    <div class="modalMain">
        <div class="modalOverlay"></div>

        <div class="modalContainer">
            <div class="modalHeadConmb-0 sticky top-0 bg-white z-zindex99">
                <div class="leftmodalInfo">
                    <p class="modalTitleText"> View/Edit Client Name </p>
                    <p class="text-sm ">
                        <span class="font-medium text-lg"> {$facility_data_store.facility_name}</span>
                        <span class="userDesignation"> (Associate
                            - {$facility_data_store.facility_type} / ID - {$facility_data_store.name})</span>
                    </p>
                </div>
                <div class="rightmodalclose" on:click={closeWorkorganization}>
                    <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
                </div>
            </div>
            <div class="modalContent">

                <div class="ConModalContent">

                    <div class="xsl:grid-cols-1 gap-4 ">

                        <div class=""> <!-- sticky top-24 bg-white z-zindex99 -->
                            <div class="bgAddSection mt-2">
                                {#if temp5 == "newMap"}
                                <div class="addbuttongst  ">
                                    {#if  status_display == -1}
                                        <p>user in inactive</p>
                                    {:else}
                                    <div class="updateAction">
                                        <button class="ErBlueButton" on:click={() => {temp5 = "newMap-2";}}>Add New Mapping</button>
                                    </div>
                                    {/if}
                                </div>
                                {/if}
                                {#if temp5 == "newMap-2"}
                                {#if !get_client_data_mapping_data}
                                <p>No client Details found</p>
                                {:else}
                                    <div class="addGstForm ">
                                        <div class="gstaddtitle px-4 py-4">
                                            <p class="text-lg font-medium">Add New Mapping</p>
                                        </div>



                                        <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                            <div class="w-full">
                                                <div class="light14grey mb-1">Organization</div>
                                                <div class="formInnerwidthfull ">
                                                    <select class="inputboxpopover" bind:value={id_select}>
                                                        <option value="" disabled selected>Select</option>
                                                        {#each get_client_data_mapping_data as org_detail}
                                                            <option
                                                                class="pt-6"
                                                                value="{org_detail.org_id}"
                                                                >{org_detail.org_name}</option
                                                            >
                                                        {/each}
                                                    </select>
                                                    <div class="formSelectArrow ">
                                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w-full">
                                                <div class="light14grey mb-1">Station</div>
                                                <div class="formInnerwidthfull ">
                                                    <select class="inputboxpopover" bind:value={stat_select}>
                                                        <option value="" disabled selected>Select</option>
                                                        {#each station_data_array as station}
                                                            <option
                                                                class="pt-6" 
                                                                value={station.station_code}
                                                                >{station.station_code} - {station.station_name}</option
                                                            >
                                                            {/each}
                                                    </select>
                                                    <div class="formSelectArrow ">
                                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                            <div class="w-full">
                                                <div class="light14grey mb-1">{table_head}</div>
                                                <div class="formInnerwidthfull ">
                                                    <select class="inputboxpopover" bind:value ={stat_code}>
                                                        {#if org_AN_flag == 1}
                                                        <option class="pt-6" value="-1">Select</option>
                                                        <option class="pt-6">Create Only Rabbit ID/COMP ID</option>
                                                        {#each station_code_arr as stat_code}
                                                            <option class="pt-6">
                                                                {stat_code.trim()}
                                                            </option>
                                                        {/each}
                                                        {:else }
                                                        <option class="pt-6">Select</option>
                                                        {#each station_code_arr as stat_code}
                                                            <option class="pt-6">
                                                                {stat_code.trim()}
                                                            </option>
                                                        {/each}
                                                        {/if}
                                                    </select>
                                                    <div class="formSelectArrow ">
                                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w-full">
                                                <div class="light14greylong mb-1">Client Empployee ID ( If available)
                                                </div>
                                                <div class="formInnerwidthfull ">
                                                    <input type="text" class="inputboxcursortext" bind:value="{emp_number}">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex gap-4 px-4 py-2 xsl:flex-wrap">
                                            <div class="w-full">
                                                <div class="light14greylong mb-1">Create new Rabbit ID/Comp ID</div>
                                                <div class="formInnerwidthfull ">
                                                    <div class="formInnerGroup py-2">
                                                        {#if org_AN_flag == 1}
                                                        <div class="text-center flex mb-2 ml-1">

                                                            <div class="flex items-center mr-4">
                                                                <input id="Rabbit" type="radio" name="crClient" bind:group="{requestType}"
                                                                    class="hidden" checked="" value="rabbitid">
                                                                <label for="Rabbit" class="radioLable">
                                                                    <span class="radioCirle"></span>
                                                                    Rabbit ID</label>
                                                            </div>

                                                            <div class="flex items-center ml-4">
                                                                <input id="COMP" type="radio" name="crClient" bind:group="{requestType}"
                                                                    class="hidden" value="compid">
                                                                <label for="COMP" class="radioLable">
                                                                    <span class="radioCirle"></span>
                                                                    COMP ID</label>
                                                            </div>
                                                        </div>
                                                        {:else if org_AN_flag == 0}
                                                        <h1>Not Applicable</h1>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w-full">

                                            </div>
                                        </div>



                                        <div class="actionButtons">
                                            <div class="actionCancelbutton " on:click={() => {temp5 = "newMap";}} >
                                                Cancel
                                            </div>
                                            <div class="updateAction ml-5" on:click="{finalMap}">
                                                <button class="ErBlueButton">Map</button>
                                            </div>
                                        </div>

                                    </div>
                                {/if}
                                {/if}
                            </div>

                        </div>




                        <div class="heightCardContainer">
                            {#if !get_client_details_data}
                            <p>No client Details found</p>
                            {:else}
                            {#each get_client_details_data as new_client}
                                <div class="cardDocWrapper ">
                                    <div class="grid grid-cols-2 xs:grid-cols-1 gap-4">
                                        <div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Organisation</div>
                                                <div class="detailData"> {new_client.org_name}</div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Station Name & code </div>
                                                <div class="detailData"> {new_client.station_code}</div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Org specified name </div>
                                                <div class="detailData break-words"> {new_client.org_specific_name}</div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Client Employee ID</div>
                                                <div class="detailData"> {new_client.client_id}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Added On</div>
                                                <div class="detailData"> {new_client.creation}</div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Added by </div>
                                                <div class="detailData"> {new_client.modified_by}</div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Client ID status/info </div>
                                                <div class="detailData"> ----</div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 mb-1">
                                                <div class="detailLbale"> Status</div>
                                                <div>
                                                    {#if new_client.status == "deactive"}
                                                    <p
                                                        class="userStatusTickVerified "
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/reject.png"
                                                            alt=""
                                                            class="pr-1"
                                                        /> {new_client.status}
                                                    </p>
                                                    {:else}
                                                    <p
                                                        class="userStatusTickVerified "
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/checked.png"
                                                            alt=""
                                                            class="pr-1"
                                                        /> {new_client.status}
                                                    </p>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                            {/if}
                        </div>

                        

                    </div>


                </div>

            </div>
        </div>
    </div>
</div>


    <!-- Full screen modal  Change Associate Type Desktop and Responsive Done--->

    <div class="hidden"  id="associateTypeMOdal">
        <div class="modalMain ">
            <div class="modalOverlay"></div>

            <div class="modalContainer">

                <div class="modalHeadCon sticky top-0 bg-white z-zindex99">
                    <div class="leftmodalInfo">
                        <p class="modalTitleText">  Change Associate Type </p>
                        <p class="text-sm ">
                            <span class="font-medium text-lg"> {$facility_data_store.facility_name}</span>
                            <span class="userDesignation"> (Associate
                                - {$facility_data_store.facility_type} / ID - {$facility_data_store.name})</span>
                        </p>
                    </div>
                    <div class="rightmodalclose" on:click="{closeassociateTypeMOdal}">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
                    </div>
                </div>

                <div class="modalContent">
                    <!-- <div class="tabwrapper flex justify-between text-center py-2 pb-3">
                    <div class="changetype py-3 w-2/4	">
                        <p>Change Type</p>
                    </div>
                    <div class="Historytab py-3 w-2/4	 bg-bglightgreye">
                        <p>History</p>
                    </div>
                </div> -->
                    <div class="ConModalContent mt-3">

                        <div class="xsl:grid-cols-1 gap-4">


                            <div>
                                <div class="bgAddSection">
                                    <p class="font-medium px-3 pt-4">Change Type </p>
                                    {#if  status_display == -1}
                                        <p>user in inactive</p>
                                    {:else}
                                    <div class="addGstForm pt-4">
                                        <!-- {#each $facility_data_store as new_client} -->
                                        <div class="flex gap-4 px-4 py-1 xsl:flex-wrap mb-3">
                                            <div class="w-full">
                                                <div class="light14grey mb-1">Current Type</div>
                                                <div class="formInnerwidthfull ">
                                                    <div class="font-normal text-base text-greycolor mb-1">{$facility_data_store.facility_type}</div>
                                                </div>
                                            </div>
                                            <div class="w-full">
                                                <div class="light14grey mb-1">Pravesh ID</div>
                                                <div class="formInnerwidthfull ">
                                                    <div class="font-normal text-base text-greycolor mb-1">{$facility_data_store.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- {/each} -->

                                        <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                            <div class="w-full">
                                                <div class="light14grey mb-1">New Type</div>
                                                <div class="formInnerwidthfull ">
                                                    <select class="inputboxpopover" bind:value="{newType}">
                                                        <option class="pt-6">Select</option>
                                                        {#each get_assoc_types_data as assoc}
                                                            <option
                                                                class="pt-6" 
                                                                value={assoc.facility_type}
                                                                >{assoc.facility_type}</option
                                                            >
                                                            {/each}
                                                    </select>
                                                    <div class="formSelectArrow ">
                                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w-full">
                                                <div class="light14grey mb-1">Type of Attendance</div>
                                                <div class="formInnerwidthfull ">
                                                    <select class="inputboxpopover" bind:value="{attendenceType}">
                                                        <option class="pt-6">Select</option>
                                                        {#each get_assoc_types_data as assoc}
                                                            <option
                                                                class="pt-6" 
                                                                value={assoc.facility_type}
                                                                >{assoc.facility_type}</option
                                                            >
                                                            {/each}
                                                    </select>
                                                    <div class="formSelectArrow ">
                                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                            <div class="w-full">
                                                <div class="light14grey mb-1">From Date</div>
                                                <div class="formInnerwidthfull ">
                                                    <!-- <input type="date" class="inputboxpopoverdate" bind:value="{fromDate}" onkeydown="return false"> -->
                                                    <input type="date" class="inputboxpopoverdate"  min={new Date().toISOString().split('T')[0]} bind:value="{fromDate}" onkeydown="return false">
                                                </div>

                                            </div>
                                            <div class="w-full">
                                                <div class="light14grey mb-1">To Date</div>
                                                <div class="formInnerwidthfull ">
                                                    <!-- <input type="date" class="inputboxpopoverdate" onkeydown="return false"> -->
                                                    <input type="date" class="inputboxpopoverdate"  min={new Date().toISOString().split('T')[0]} bind:value="{fromDate}" onkeydown="return false">
                                                </div>
                                                <div class="w-full">
                                                    <div class="light14greylong mb-1 invisible"></div>
                                                    <div class="formInnerwidthfull ">
                                                        <div class="light14greylong mb-1 text-xs">Note: Leave empty if
                                                            no end date</div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                            <div class="w-full">
                                                <div class="light14grey mb-1">Remarks</div>
                                                <div class="formInnerwidthfull ">
                                                    <input type="text" class="inputbox" bind:value="{assocRemarks}">
                                                </div>
                                            </div>

                                        </div>
                                        <div class="actionButtons">

                                            <div class="updateAction " on:click="{finalreqAssoc}">
                                                <button class="ErBlueButton">Submit</button>
                                            </div>
                                        </div>

                                    </div>
                                    {/if}
                                </div>

                            </div>

                            <div class="PhysicalCardContainer">
                                <p class="font-medium px-3 pt-4">History</p>
                                <div class="heightCardContainer">
                                    <table class="table  w-full text-center mt-2 ">
                                        <thead class="theadpopover h-10">
                                            <tr>
                                                <th>Associate
                                                    Type</th>
                                                <th>Type of Attendance</th>
                                                <th> Effective From</th>
                                                <th>Effective Till</th>
                                                <th> Requested On</th>
                                                <th> Requested By</th>
                                                <th> Remarks</th>

                                            </tr>
                                        </thead>
                                        {#each get_change_associte_data as associate}
                                        <tbody class="tbodypopover">
                                            <tr class="border-b">
                                                
                                                <td>{associate.property_value}</td>
                                                <td>{associate.attendance_facility_type}</td>
                                                <td>{associate.from_date}</td>
                                                <td>{associate.to_date}</td>
                                                <td>{associate.creation}</td>
                                                <td>{associate.owner}</td>
                                                <td>
                                                    {associate.remark}
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

 <!--Remove Tag Confirmation modal -->
    
  <div id="remove_tag_confirmation_model" class="hidden">
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <!-- <p class=""> Reject Reason</p> -->
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{remove_tag_con_model_close}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 font-bold mb-2" for="grid-state">
                            Confirm Delete Tag ?
                        </label>
                        <div class="relative">
                         
                          <br>
                          
                          <div
                                class="flex  py-1 items-center flex-wrap"
                            >
                                <div class="formInnerGroup">
                                   
                                    <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click="{remove_tag_con_model_close}">Cancel</button>
                                    <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click="{confirm_delete_tag}">Ok</button>
                                </div>
                            </div>
                          
                        </div>
                      </div>
                </form>
            </div>
        </div>
    </div> 
</div>

<!--Remove Tag Confirmation modal -->



<Toast type={toast_type}  text={toast_text}/>
<SvelteToast />