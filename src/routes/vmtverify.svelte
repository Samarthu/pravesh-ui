<script>
    import { onMount } from "svelte";
    import {facility_data_store} from "../stores/facility_store";
    import { bank_details } from "../stores/bank_details_store";
    import {get_facility_details,facility_bgv_check,get_bank_facility_details,facility_document,
         approve_reject_status,bank_approve_reject,bgv_approve_rej,final_id_ver_rej,final_bgv_app_rej,get_client_details,get_client_org_mapping,get_specific_name,save_mapping,get_change_associte,get_assoc_types,send_associate_req,get_cas_user, activate_cas_user , create_cas_user} from "../services/vmt_verify_services";
    import {facility_bgv_init} from "../services/onboardsummary_services";
    import {bgv_config_store} from '../stores/bgv_config_store';
    import { goto } from "$app/navigation";
    import {get_date_format} from '../services/date_format_servives';
    // import {facility_id} from "../stores/facility_id_store"
    import {bgv_data_store} from "../stores/bgv_store";
    import Toast from './components/toast.svelte';
    import Spinner from "./components/spinner.svelte";
    import { img_url_name } from "../stores/flags_store";
    import { each } from "svelte/internal";
    import { get_user_scope_function,  } from "../services/workdetails_services";
    import { get_loc_scope} from "../services/onboardsummary_services";
    import {get_pravesh_properties_method} from "../services/workdetails_services";
    // import axios from 'axios';
    import QRCode from "./components/qr-code.svelte";
    import {facility_id} from "../stores/facility_id_store";
    import { page } from '$app/stores';

    let station_data_array=[];
    let org_name_array=[];
    let temp5 = "newMap";
    let show_spinner = false;
    let facility_document_data = "";
    let bank_details_provided="yes";
    let aadhar_url ="";
    let pan_url ="";
    let can_cheque_url ="";
    let blk_cheque_url ="";
    let passbook_url="";
    let acc_stmt_url="";
    let address_url="";
    let dl_url="";
    let offer_url="";
    let voter_url="";
    let police_url="";
    let pass_photo_url="";
    let vmt_pan = "";
    let vmt_voter="";
    let vmt_aadhar = "";
    let vmt_dl="";
    let vmt_address = "";
    let vmt_offer="";
    let vmt_bank = "";
    let is_id_active="MenuActive";
    let is_bank_active="";
    let is_bgv_active="";
    let show_aadhar = "0";
    let show_blk_cheque = 0;
    let show_can_cheuque =0;
    let show_passbook = 0;
    let show_acnt_stmt = 0;
    let show_voter = "0"
    let show_pass_photo ="0";
    let blk_cheque_act=""
    let can_cheque_act=""
    let pass_act=""
    let act_stmt_act=""
    let aadhar_act=""
    let voter_act=""
    let pass_photo_act=""
    let toast_text;
    let toast_type;
    // let vmt_pan_receipt = "";
    // let new_pan_no = "";
    // let new_pan_receipt = "";
    let pan_success_msg = "";
    let pan_reject_msg = "";
    let pan_receipt_success_msg = "";
    let pan_receipt_reject_msg = "";
    let pan_verified,pan_rejected,voter_verified,voter_rejected,aadhar_verified,aadhar_rejected,address_verified,
    address_rejected,offer_verified,offer_rejected,dl_verified,dl_rejected,pass_photo_verified,pass_photo_rejected,police_verified,police_rejected;
    let pan_number = "";
    let voter_number = "";
    let aadhar_number = "";
    let address_number = "";
    let dl_number = "";
    let off_number ="";
    let pass_number = "";
    let police_number = "";
    let temp = "";
    let final_id_ver_btn = 1;
    let final_bank_ver_btn = 0;
    let final_bgv_ver_btn = 0;
    // let pan_bg_white = "";
    let pan_bg_white="bg-white";
    let voter_bg_white="";
    let aadhar_bg_white="";
    let dl_bg_white="";
    let offer_bg_white="";
    let address_bg_white="";
    let basic_bg_white="bg-white";
    let police_bg_white="";
    let final_approve_data_arr=[];
    let final_reject_data_arr=[];
    let doctype_array = ["voter-id-proof","newOffFile","aadhar-id-proof","dl-photo","pan-photo","addproof-photo"];
    let contains_pan=0;
    let contains_voter=0;
    let contains_aadhar=0;
    let contains_address=0;
    let contains_dl=0;
    let contains_offer=0;
    let verified_date;
    let pan_success_flag = 0;
    let voter_success_flag = 0;
    let aadhar_success_flag = 0;
    let address_success_flag = 0;
    let dl_success_flag = 0;
    let bank_success_flag = 0;
    let bank_reject_flag = 0;
    let offer_success_flag = 0;
    let pan_reject_flag = 0;
    let voter_reject_flag = 0;
    let aadhar_reject_flag = 0;
    let address_reject_flag = 0;
    let dl_reject_flag = 0;
    let offer_reject_flag = 0;
    let basic_bgv_success_flag = 0;
    let basic_bgv_reject_flag = 0;
    let address_bgv_success_flag = 0;
    let address_bgv_reject_flag = 0;
    let dl_bgv_success_flag = 0;
    let dl_bgv_reject_flag = 0;
    let pan_bgv_success_flag = 0;
    let pan_bgv_reject_flag = 0;
    let police_bgv_success_flag = 0;
    let police_bgv_reject_flag = 0;
    let final_basic_bgv_approve=0;
    let final_address_bgv_approve=0;
    let final_licence_bgv_approve=0;
    let final_police_bgv_approve=0;
    let final_pan_bgv_approve=0;
    let final_bgv_approve=0;
    let final_basic_bgv_reject=0;
    let final_address_bgv_reject=0;
    let final_licence_bgv_reject=0;
    let final_police_bgv_reject=0;
    let final_pan_bgv_reject=0;
    let final_bgv_reject=0;
    let facility_docs_arr = [];
    let final_pan_approve,
        final_voter_approve,
        final_aadhar_approve,
        final_address_approve,
        final_dl_approve,
        final_offer_approve,
        final_approve = 0;
    let final_pan_reject,
        final_voter_reject,
        final_aadhar_reject,
        final_address_reject,
        final_dl_reject,
        final_offer_reject,
        final_reject;
    let off_Name = "";
    let off_assoc_type="";
    let off_vend_name="";
    let is_reject_hidden = "hidden";
    let is_verify_hidden = "hidden";
    let temp_display = "display_id_proof";
    let routePrev = "";
    let temp_switchto = "pan_tab";
    let change_to = "basic_details";
    let voter_switchto = "tab1";
    let new_facility_id;
    // let facility_id;
    let acc_num,ifsc_code,acc_hold_name,remark;
    let gend_selected,add_is_perm,curr_same,police_add_per;
    let basic_info_res = "";
    let address_info_res;
    let pan_info_res;
    let pol_info_res;
    let dl_info_res;
    let facility_address,city,state;
    let show_fields = 0;
    let bgv_remarks;
    let rejReasonMap = {
    "basicInfo": ["Supporting document Missing", "Name/Father's Name/DOB is not clear on the document", "Name/Father's Name/DOB mismatch", "Name/Father's Name/DOB missing", "Passport Size Photo missing/not clear/incorrect", "Aadhaar/Voter Number/Associate name/Father Name/DOB is not clear on the document", "Aadhaar/Voter Number/Associate name/Father Name/DOB mismatch", "Aadhaar/Voter Number/Associate name/Father Name/DOB not captured. Kindly update in the system", "Email Address not verified"],
    "addressInfo": ["Address mismatch", "Kindly update full address", "Kindly upload associates address proof", "Kindly upload owners acknowledgment & supporting address proof", "Address/City/District/State/Pincode mismatch"],
    "dlInfo": ["Supporting document Missing", "Driving License expired", "Name/License number/Date of issue/expiry/DOB is not clear on document", "Name/Number/Date of issue/expiry/DOB mismatch", "Name/Number/Date of issue/expiry/DOB missing.", "Associate name/License number/Date of issue/expiry/DOB/Issuing State is not clear on document", "	Associate name/License number/Date of issue/expiry/DOB/Issuing State mismatch", "Associate name/License number/Date of issue/expiry/DOB/Issuing State not captured. Kindly update in system"],
    "panInfo": ["Supporting document Missing", "Name/Father's name/Pan Number/DOB mismatch", "Name/Father's name/Pan Number/DOB missing.", "Name/Father's name/Pan Number/DOB is not clear on the document"],
    "policeInfo": ["Supporting document Missing", "Incorrect Address", "Name/Guardian's name/Address mismatch", "Name/Guardian's name/Address missing", "Name/Guardian's name/Address is not clear on the document"]
}
    let get_client_details_data = [];
    let get_client_data_mapping_data = [];
    let get_loc_scope_data = [];
    let org_name = [];
    let station_code = [];
    let org_id;
    let stat_select;
    let id_select;
    let newType;
    let attendenceType;
    let get_specific_name_data = [];
    let station_code_arr = [];
    let get_change_associte_data = [];
    let status_display = 0; 
    let org_AN_flag = 0;
    let stat_code = "";
    let requestType = "";
    let mapping_blocked_data = [];
    let id_card_data = [];
    // let id_res_data = [];
    let get_assoc_types_data = [];
    let emp_number ="";
    let table_head = "";
    let crClient = "no";
    let assocRemarks = "";
    let fromDate;
    let profile_url = "";
    let cas_flag = 0;
    let window;
    let bgv_pass_data;
    $:if(stat_select != null){
        console.log("station_select",stat_select)
        station_code_select(stat_select);
    }

    $:if(id_select != null){
        console.log("id_select",id_select)
        org_id_select(id_select);
    }

    $:{
        attendenceType = newType;
    }

    $:pan_reject_flag
    $:pan_success_flag
    

    let minDate = new Date(); 
        minDate.setMonth(minDate.getMonth() + 1);
        console.log("minDate", minDate)
        minDate =  get_date_format(minDate,"dd-mm-yyyy")
        console.log("mindate", minDate)

    // function zoomin() {
    //     var myImg = document.getElementById("map");
    //     var currWidth = myImg.clientWidth;
    //     if (currWidth == 2500) return false;
    //     else {
    //         myImg.style.width = (currWidth + 100) + "px";
    //     }
    //     }

    //     function zoomout() {
    //     var myImg = document.getElementById("map");
    //     var currWidth = myImg.clientWidth;
    //     if (currWidth == 100) return false;
    //     else {
    //         myImg.style.width = (currWidth - 100) + "px";
    //     }
    // }

    onMount(async () => {
        console.log("$facility_id.facility_id_number",$facility_id.facility_id_number)
        if(!$facility_id.facility_id_number){
            toast_text = "facility not selected";
            toast_type = "error";
            // goto("onboardsummary")
            setTimeout(goto("onboardsummary?unFacID="+$facility_id.facility_id_number, { replaceState:true }), 5000);
        }
        // let bgv_pass_data=[
        // // $facility_data_store.org_id,
        // // $facility_data_store.station_code,
        // // $facility_data_store.facility_type, /////All these are commented bcoz they only show values when traversed
        // //  through button click and not on page reload.uncomment when code on this page is fully done
        // "ER",
        // "CRUN",
        // "Reseller"
        // ]
        // let bgv_init_res = await facility_bgv_init(bgv_pass_data);   
    
        // if (bgv_init_res.body.status == "green"){
            
        //     console.log("bgv_init_res",bgv_init_res)
        //     bgv_config_store.set(
        //     bgv_init_res.body.data
        //     )

        // }

        
        // facility_id.subscribe(value => {
        // new_facility_id = value.facility_id_number;
        // })
        // facility_id = "CRUN00374"
        // console.log('habscib',rejReasonMap.basicInfo)
        // facility_id = "MHAE00037"
        console.log("new_facility_id",$facility_id.facility_id_number)
            let facility_data_res = await get_facility_details()
            console.log("facility_data_res",facility_data_res.body.data[0])
            try{
                if(facility_data_res.body.status=="green"){
                    if(facility_data_res!="null"){
                        facility_data_store.set(
                            facility_data_res.body.data[0]
                        )
                    }
                }
                for (var j = 0;j < $facility_data_store.addresess.length;j++) 
            {
                if (
                    $facility_data_store.addresess[j].default_address == "1"
                ) {
                    facility_address =$facility_data_store.addresess[j].address;
                    // facility_postal =$facility_data_store.addresess[j].postal;
                    city = $facility_data_store.addresess[j].city;
                    state = $facility_data_store.addresess[j].state;
                    // location_id = $facility_data_store.addresess[j].location_id;
                }
            }
            if ($facility_data_store.org_id == "FT"){
                show_fields = 1
            }
            }
            catch (err) {
                console.log("error in facility data")
            }
            console.log("facility_data_store on line 107",$facility_data_store)
            let new_date = new Date($facility_data_store.document_updated_on)
            verified_date = get_date_format(new_date,"dd-mm-yyyy-hh-mm")   
            
            bgv_pass_data=[
            $facility_data_store.org_id,
            $facility_data_store.station_code,
            $facility_data_store.facility_type, /////All these are commented bcoz they only show values when traversed
        //  through button click and not on page reload.uncomment when code on this page is fully done
        // "ER",
        // "CRUN",
        // "Reseller"
        ]
        let bgv_init_res = await facility_bgv_init(bgv_pass_data);   
    
        if (bgv_init_res.body.status == "green"){
            
            console.log("bgv_init_res",bgv_init_res)
            bgv_config_store.set(
            bgv_init_res.body.data
            )

        }
        
        let facility_bank_data_res = await get_bank_facility_details()
            console.log("bank_details", facility_bank_data_res.body.data.length)
            try{
                if(facility_bank_data_res.body.data.length == "0"){
                    bank_details_provided="no";
                }
                else if(facility_bank_data_res != "null"){
                    bank_details.set(
                        facility_bank_data_res.body.data[0]
                    )
                }
                
            }
            catch (err){
                console.log("Bank details error")
            }
            console.log("$bank_details",$bank_details)

            let facility_doc_data_res = await facility_document()
            try{
                if (facility_doc_data_res != "null" ){
                    facility_document_data = facility_doc_data_res.body.data;
                    
                    for (var i = 0; i < facility_document_data.length; i++){
                        console.log("inside 2 2 2 facility_document_data.length",facility_document_data.length)

                            facility_docs_arr[i] = facility_document_data[i].doc_type;
                            
                            if(!facility_docs_arr[i]){
                                profile_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            
                            if(facility_document_data[i].doc_type == "pan-photo"){
                                // console.log("pan___",facility_document_data[i].file_url)
                                pan_url = $page.url.origin+facility_document_data[i].file_url;
                                pan_verified = facility_document_data[i].verified;
                                pan_rejected = facility_document_data[i].rejected;
                                // console.log("successfully fetched Pan")
                                contains_pan = 1;
                                pan_number = facility_document_data[i].doc_number;
                                console.log("pan number 22",pan_number)
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "pan-photo")
                                //     temp_switchto = "pan_tab";
                                // }

                            }
                            
                            if(facility_document_data[i].doc_type == "voter-id-proof"){
                                // console.log("address___",facility_document_data[i].file_url)
                                voter_url = $page.url.origin+facility_document_data[i].file_url;
                                voter_verified = facility_document_data[i].verified;
                                voter_rejected = facility_document_data[i].rejected;
                                contains_voter = 1;
                                voter_number = facility_document_data[i].doc_number;
                                console.log("voter_number 22",voter_number)
                                // console.log("successfully fetched Offer letter")
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "voter-id-proof")
                                //     temp_switchto = "voter_tab";
                                // } 
                            }

                            if(facility_document_data[i].doc_type == "aadhar-id-proof"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                aadhar_url = $page.url.origin+facility_document_data[i].file_url;
                                aadhar_verified = facility_document_data[i].verified;
                                aadhar_rejected = facility_document_data[i].rejected;
                                contains_aadhar = 1;
                                aadhar_number = facility_document_data[i].doc_number;
                                console.log("aadhar_number 22",aadhar_number)
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }

					        if(facility_document_data[i].doc_type == "addproof-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                address_url = $page.url.origin+facility_document_data[i].file_url;
                                address_verified = facility_document_data[i].verified;
                                address_rejected = facility_document_data[i].rejected;
                                contains_address = 1;
                                address_number = facility_document_data[i].doc_number;
                                console.log("address_number 22",address_number)
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }

                            if(facility_document_data[i].doc_type == "newOffFile"){
                                // console.log("address___",facility_document_data[i].file_url)
                                offer_url = $page.url.origin+facility_document_data[i].file_url;
                                offer_verified = facility_document_data[i].verified;
                                offer_rejected = facility_document_data[i].rejected;
                                contains_offer = 1;
                                off_number = facility_document_data[i].doc_number;
                                console.log("off_number 22",off_number)
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "newOffFile")
                                //     temp_switchto = "offerletter_tab";
                                // } 
                                
                                // console.log("successfully fetched Offer letter")
                            }

                            if(facility_document_data[i].doc_type == "dl-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                dl_url = $page.url.origin+facility_document_data[i].file_url;
                                dl_verified = facility_document_data[i].verified;
                                dl_rejected = facility_document_data[i].rejected;
                                contains_dl = 1;
                                dl_number  = facility_document_data[i].doc_number;
                                console.log("dl_number 22",dl_number)
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "dl-photo")
                                //     temp_switchto = "DL_tab";
                                // } 
                                // console.log("successfully fetched Offer letter")
                            }

                            if(facility_document_data[i].doc_type == "pass_photo"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                pass_photo_url = $page.url.origin+facility_document_data[i].file_url;
                                pass_photo_verified = facility_document_data[i].verified;
                                pass_photo_rejected = facility_document_data[i].rejected;
                                // contains_pass_photo = 1;
                                pass_number  = facility_document_data[i].doc_number;
                                console.log("pass_number 22",pass_number)
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }

                            if(facility_document_data[i].doc_type == "police_info_supp_file"){
                                // console.log("address___",facility_document_data[i].file_url)
                                police_url = $page.url.origin+facility_document_data[i].file_url;
                                police_verified = facility_document_data[i].verified;
                                police_rejected = facility_document_data[i].rejected;
                                // contains_police = 1;
                                police_number  = facility_document_data[i].doc_number;
                                console.log("police_number 22",police_number)
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }

                            if(facility_docs_arr.includes("can-cheque")){
                                can_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            if(facility_docs_arr.includes("blcheque")){
                                blk_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("passbook")){
                                passbook_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("acc-stat")){
                                acc_stmt_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            
                            
                        }
                        
                        }
                    }



                    
            catch (err){
                console.log("error in finding Pan image",err)
            }

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
            gend_selected = $bgv_data_store.gender;
            add_is_perm = $bgv_data_store.address_type;
            curr_same = $bgv_data_store.current_address_is_same;
            police_add_per = $bgv_data_store.police_address_type;
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


    console.log("$bgv_data_store",$bgv_data_store)
    })

    async function station_code_select(station_code){
        station_code_arr = [];
        console.log("station_code",station_code.toLowerCase())
        let get_specific_name_res = await get_specific_name(station_code.toLowerCase())
        station_code_arr.push(get_specific_name_res.body.data[0].resource_id)
        console.log("get_specific_name_res",get_specific_name_res)

        station_code_arr = station_code_arr;
        console.log("station_code_arr",station_code_arr)

    }

    async function org_id_select(org_id){
        if(org_id == "AN"){
            table_head = "Name in COMP"
        }
        else if(org_id == "FT"){
            table_head = "Name in LIBERA"
        }
        else{
            table_head = "Org Specific Name"
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
                station_data_array = station_data_array;
        console.log("station_data_array",station_data_array);

                
    }

    // async function station_id_select(org_id){
    //     let station_id_res = await get_loc_scope(org_id)
    //     for(i=0;i<station_id_res.body.data[0].length;i++){
    //         for(j=0;j<station_id_res.body.data[i].stations.length;j++){    
    //             if(org_id == station_id_res.body.data[i].stations.org_id)        
    //             station_id_data.push(station_id_res.body.data[0].length)
    //         }
    //     }

    //     station_id_data = station_id_data
    //     console.log("station_id_data",station_id_data);
    // }

    async function doc_approve(doc_cat){
        if (doc_cat == "pan"){
            // console.log("inside facility_document_data.pan_number",facility_document_data.pan_number)

            console.log("inside 1 facility_document_data", vmt_pan,pan_number)
            if(vmt_pan != pan_number){
                toast_type = "error"
                toast_text = "Enter valid Pan Number"
                return
            }
            console.log("vmt-pan")
            if(vmt_pan != 0){
                show_spinner = true;
                let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_pan,
                "status_type":"DV",
                "status":"true",
                "doc_type":"pan-photo"
            }

                let pan_sub_res = await approve_reject_status(document_load)
                show_spinner = false;
                toast_text = "Pancard Approved";
                toast_type = "success"
                try{
                    console.log("inside pan_sub_res.body.status",pan_sub_res.body.status)
                    console.log(" inside condition ", pan_verified=="1")
                    if(pan_sub_res.body.status == "green"){
                        pan_success_flag = "1";
                        pan_verified="1"
                        console.log("pan_success_flag",pan_success_flag)    
                    }
                }
                catch(err){
                    console.log("Error in pan_sub_res",err)
                }
            }
            else{
                toast_text = "Please enter the Pan Number";
                toast_type = "error";
            }
            
        }

        if (doc_cat == "voter"){   
            console.log("payload", $facility_data_store)
            if(vmt_voter != voter_number){
                toast_type = "error"
                toast_text = "Enter valid Voter ID"
                return
            }
            if(vmt_voter!=0){
                show_spinner = true;
                let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_voter,
                "status_type":"DV",
                "status":"true",
                "doc_type":"voter-id-proof"
            }
            let voter_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "VoterID Approved";
            toast_type = "success"
            try{
                console.log("voter_sub_res",voter_sub_res.body.status)
                    if(voter_sub_res.body.status == "green"){
                        voter_success_flag = 1;
                        voter_verified="1"
                    }
            }
                catch(err){
                    console.log("Error in pan_sub_res",err)
                }
            }
            else{
                    toast_text = "Please enter the Voter Number";
                    toast_type = "error";
                }
        }

        if (doc_cat == "aadhar"){
            if(vmt_aadhar != aadhar_number){
                toast_type = "error"
                toast_text = "Enter valid Aadhar Number"
                return
            }
            if (vmt_aadhar != 0){
                show_spinner = true;
                let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_aadhar,
                "status_type":"DV",
                "status":"true",
                "doc_type":"aadhar-id-proof"
            }
            let aadhar_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "Aadhar Approved";
            toast_type = "success"
            try{
                if(aadhar_sub_res.body.status == "green"){
                    aadhar_success_flag = 1;
                    aadhar_verified="1"
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
            }
            else{
                toast_text = "Please enter the Aadhar Number";
                toast_type = "error";
            }
            
        }
        
        if (doc_cat == "dl"){
            if(vmt_dl != dl_number){
                toast_type = "error"
                toast_text = "Enter valid DL Number"
                return
            }
            if (vmt_dl != 0){
                show_spinner = true;
                let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_dl,
                "status_type":"DV",
                "status":"true",
                "doc_type":"dl-photo"
            }
            let dl_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "DL Approved";
            toast_type = "success"
            try{
                    if(dl_sub_res.body.status == "green"){
                        dl_success_flag = 1;
                        dl_verified="1"
                    }
                }
                catch(err){
                    console.log("Error in pan_sub_res",err)
                }
            }
            else{
                    toast_text = "Please enter the dl Number";
                    toast_type = "error";
                }
        
        }
        
        if (doc_cat == "address"){
            show_spinner = true;
                let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_address,
                "status_type":"DV",
                "status":"true",
                "doc_type":"addproof-photo"
            }
            let address_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "Address Approved";
            toast_type = "success"
            try{
                if(address_sub_res.body.status == "green"){
                    address_success_flag = 1
                    address_verified="1"
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            } 
        }
        
        if (doc_cat == "offer"){
            console.log("123 $facility_data_store.vendor_name",$facility_data_store.vendor_name,off_vend_name)
            console.log("123 $facility_data_store.facility_type",$facility_data_store.facility_type , off_assoc_type)
            console.log("123 $facility_data_store.facility_name",$facility_data_store.facility_name , off_Name)
            if(off_Name != $facility_data_store.facility_name && off_assoc_type != $facility_data_store.facility_type && off_vend_name != $facility_data_store.vendor_name){
                console.log("inside not matched")
                toast_text = "Please enter the valid details";
                toast_type = "error";
                return
            }
            if(off_Name != 0 && off_assoc_type != 0 && off_vend_name != 0 ){
                // && vmt_offer != 0
                show_spinner = true;
                let document_load = {
                    "resource_id":$facility_id.facility_id_number,
                    "facility_name":off_Name,
                    "facility_type":off_assoc_type,
                    "vendor_name":off_vend_name,
                    "doc_number":vmt_offer,
                    "status_type":"DV",
                    "status":"true",
                    "doc_type":"newOffFile"
                }
                let offer_sub_res =await approve_reject_status(document_load)
                show_spinner = false;
                toast_text = "Offer Letter Approved";
                toast_type = "success"
                try{
                    if(offer_sub_res.body.status == "green"){
                        offer_success_flag = 1;
                        offer_verified="1"
                    }
                }
                catch(err){
                    console.log("Error in pan_sub_res",err)
                }
            }
            else{
                    toast_text = "Please enter all the fields";
                    toast_type = "error";
                }
        }
            

            if(contains_pan == 0){   
                final_pan_approve = 1;
               
            }
            else{
                if(pan_success_flag == 1){
                    final_pan_approve = 1;
                }
            }
            if(contains_voter == 0){
                final_voter_approve = 1;
               
            }
            else{
                if(voter_success_flag == 1){
                    final_voter_approve = 1;
                }
            }
            if(contains_aadhar == 0){
                final_aadhar_approve = 1;
               
            }
            else{
                if(aadhar_success_flag == 1){
                    final_aadhar_approve = 1;
                }
               
            }
            if(contains_dl == 0){
                final_dl_approve = 1;
                
            }
            else{
                if(dl_success_flag == 1){
                    final_dl_approve = 1;
                }
                
            }
            if(contains_address == 0){
                final_address_approve = 1;
               
            }
            else{
                if(address_success_flag == 1){
                    final_address_approve = 1;
                }
                
            }
            if(contains_offer == 0){
                final_offer_approve = 1;
               
            }
            else{
                if(offer_success_flag == 1){
                    final_offer_approve = 1;
                }
               
            }

            if(final_pan_approve == 1 && final_voter_approve == 1 && final_aadhar_approve == 1 && final_address_approve == 1 && final_dl_approve == 1 && final_offer_approve == 1){
                final_approve = 1;
            }
            
            
            console.log("FLAGS",final_pan_approve,final_voter_approve,final_aadhar_approve,final_address_approve,final_dl_approve,final_offer_approve,final_approve)
            console.log("FLAGS",final_pan_reject,final_voter_reject,final_aadhar_reject,final_address_reject,final_dl_reject,final_offer_reject,final_reject)



        // }
        // else{
        //     console.log("Toast here that all the documents need to be verified and approved")
        // }


    }

    async function doc_reject(doc_cat){
        if (doc_cat == "pan"){
            show_spinner = true;
            console.log("payload", $facility_data_store)
            
            let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_pan,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"pan-photo"
            }
            let pan_sub_res = await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "Pan Card rejected";
            toast_type = "error"
            try{
                if(pan_sub_res.body.status == "green"){
                    pan_reject_flag = 1;
                    pan_rejected == "1"

                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
            
        }

        if (doc_cat == "voter"){
            console.log("payload", $facility_data_store)
            show_spinner = true;
            let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_voter,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"voter-id-proof"
            }
            let voter_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "Voter ID Rejected";
            toast_type = "error";
            try{
                console.log("voter_sub_res",voter_sub_res.body.status)
                    if(voter_sub_res.body.status == "green"){
                        voter_reject_flag = 1;
                        voter_rejected == "1"
                    }
            }
                catch(err){
                    console.log("Error in pan_sub_res",err)
                }
        }

        if (doc_cat == "aadhar"){
            show_spinner = true;
            let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_aadhar,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"aadhar-id-proof"
            }
            let aadhar_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "Aadhar Rejected";
            toast_type = "error"
            try{
                if(aadhar_sub_res.body.status == "green"){
                    aadhar_reject_flag = 1;
                    aadhar_rejected == "1"
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
        }
        
        if (doc_cat == "dl"){
            show_spinner = true;
            let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_dl,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"dl-photo"
            }
            let dl_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "DL Rejected";
            toast_type = "error"
            try{
                    if(dl_sub_res.body.status == "green"){
                        dl_reject_flag = 1;
                        dl_rejected == "1"
                    }
                }
                catch(err){
                    console.log("Error in pan_sub_res",err)
                }
        }
        
        if (doc_cat == "address"){
            console.log("inside address")
            show_spinner = true;
            let document_load = {
                "resource_id":$facility_id.facility_id_number,
                "doc_number":vmt_address,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"addproof-photo"
            }
            let address_sub_res =await approve_reject_status(document_load)
            show_spinner = false;
            toast_text = "Address Rejected";
            toast_type = "error"
            try{
                if(address_sub_res.body.status == "green"){
                    address_reject_flag = 1;
                    address_rejected == "1"
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            } 
        }
        
        if (doc_cat == "offer"){
            show_spinner = true;
                let document_load = {
                    "resource_id":$facility_id.facility_id_number,
                    "doc_number":vmt_offer,
                    "status_type":"RJ",
                    "status":"true",
                    "doc_type":"newOffFile",
                    "address":"address"
                }
                let offer_sub_res =await approve_reject_status(document_load)
                show_spinner = false;
                toast_text = "Offer Letter Rejected";
                toast_type = "error"
                try{
                    if(offer_sub_res.body.status == "green"){
                        offer_reject_flag = 1;
                        offer_rejected == "1"
                    }
                }
                catch(err){
                    console.log("Error in pan_sub_res",err)
                }
        }

        if(contains_pan == 0){   
                
                final_pan_reject = 1;
            }
            else{
                if(pan_reject_flag == 1){
                    final_pan_reject = 1;
                }
            }
            if(contains_voter == 0){
                
                final_voter_reject = 1;
            }
            else{
                if(voter_reject_flag == 1){
                    final_voter_reject = 1;
                }
            }
            if(contains_aadhar == 0){
               
                final_aadhar_reject = 1;
            }
            else{
                if(aadhar_reject_flag == 1){
                    final_aadhar_reject = 1;
                }
            }
            if(contains_dl == 0){
                
                final_dl_reject = 1;
            }
            else{
                if(dl_reject_flag == 1){
                    final_dl_reject = 1;
                }
            }
            if(contains_address == 0){
               
                final_address_reject = 1;
            }
            else{
                if(address_reject_flag == 1){
                    final_address_reject = 1;
                }
            }
            if(contains_offer == 0){
                
                final_offer_reject = 1;
            }
            else{
                if(offer_reject_flag == 1){
                    final_offer_reject = 1;
                }
            }

            
            if(final_pan_reject == 1 && final_voter_reject == 1 && final_aadhar_reject == 1 && final_address_reject == 1 && final_dl_reject == 1 && final_offer_reject == 1){
                final_reject = 1;
            }
            console.log("FLAGS",final_pan_approve,final_voter_approve,final_aadhar_approve,final_address_approve,final_dl_approve,final_offer_approve,final_approve)
            console.log("FLAGS",final_pan_reject,final_voter_reject,final_aadhar_reject,final_address_reject,final_dl_reject,final_offer_reject,final_reject)


            let facility_doc_data_res = await facility_document()
            try{
                if (facility_doc_data_res != "null" ){
                    facility_document_data = facility_doc_data_res.body.data;
                    console.log("inside 2 facility_document_data".facility_document_data)
                    
                    for (var i = 0; i < facility_document_data.length; i++){

                            facility_docs_arr[i] = facility_document_data[i].doc_type;
                            
                            if(facility_document_data[i].doc_type == "pan-photo"){
                                // console.log("pan___",facility_document_data[i].file_url)
                                pan_url = $page.url.origin+facility_document_data[i].file_url;
                                pan_verified = facility_document_data[i].verified;
                                pan_rejected = facility_document_data[i].rejected;
                                // console.log("successfully fetched Pan")
                                contains_pan = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "pan-photo")
                                //     temp_switchto = "pan_tab";
                                // }

                            }
                            
                            if(facility_document_data[i].doc_type == "voter-id-proof"){
                                // console.log("address___",facility_document_data[i].file_url)
                                voter_url = $page.url.origin+facility_document_data[i].file_url;
                                voter_verified = facility_document_data[i].verified;
                                voter_rejected = facility_document_data[i].rejected;
                                contains_voter = 1;
                                // console.log("successfully fetched Offer letter")
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "voter-id-proof")
                                //     temp_switchto = "voter_tab";
                                // } 
                            }
                            if(facility_document_data[i].doc_type == "aadhar-id-proof"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                aadhar_url = $page.url.origin+facility_document_data[i].file_url;
                                aadhar_verified = facility_document_data[i].verified;
                                aadhar_rejected = facility_document_data[i].rejected;
                                contains_aadhar = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_document_data[i].doc_type == "addproof-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                address_url = $page.url.origin+facility_document_data[i].file_url;
                                address_verified = facility_document_data[i].verified;
                                address_rejected = facility_document_data[i].rejected;
                                contains_address = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_document_data[i].doc_type == "newOffFile"){
                                // console.log("address___",facility_document_data[i].file_url)
                                offer_url = $page.url.origin+facility_document_data[i].file_url;
                                offer_verified = facility_document_data[i].verified;
                                offer_rejected = facility_document_data[i].rejected;
                                contains_offer = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "newOffFile")
                                //     temp_switchto = "offerletter_tab";
                                // } 
                                
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_document_data[i].doc_type == "dl-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                dl_url = $page.url.origin+facility_document_data[i].file_url;
                                dl_verified = facility_document_data[i].verified;
                                dl_rejected = facility_document_data[i].rejected;
                                contains_dl = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "dl-photo")
                                //     temp_switchto = "DL_tab";
                                // } 
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_document_data[i].doc_type == "pass_photo"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                pass_photo_url = $page.url.origin+facility_document_data[i].file_url;
                                pass_photo_verified = facility_document_data[i].verified;
                                pass_photo_rejected = facility_document_data[i].rejected;
                                // contains_pass_photo = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_document_data[i].doc_type == "police_info_supp_file"){
                                // console.log("address___",facility_document_data[i].file_url)
                                police_url = $page.url.origin+facility_document_data[i].file_url;
                                police_verified = facility_document_data[i].verified;
                                police_rejected = facility_document_data[i].rejected;
                                // contains_police = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_docs_arr.includes("can-cheque")){
                                can_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            if(facility_docs_arr.includes("blcheque")){
                                blk_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("passbook")){
                                passbook_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("acc-stat")){
                                acc_stmt_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            
                            
                        } 
                        
                        }
                    }
            catch (err){
                console.log("error in finding Pan image",err)
            }

    }

    async function final_id_verify(){
        console.log("got it")
            if(final_approve == "1"){
                show_spinner = true;
                console.log("final_approved successful data arr",facility_document_data);
                for(let i=0;i<facility_document_data.length;i++){
                    if(pan_success_flag == "1" && facility_document_data[i].doc_type == "pan-photo"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})    
                    }
                    if(voter_success_flag == "1" && facility_document_data[i].doc_type == "voter-id-proof"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(aadhar_success_flag == "1" && facility_document_data[i].doc_type == "aadhar-id-proof"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(dl_success_flag == "1" && facility_document_data[i].doc_type == "dl-photo"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(address_success_flag == "1" && facility_document_data[i].doc_type == "addproof-photo"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(offer_success_flag == "1" && facility_document_data[i].doc_type == "newOffFile"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    
                    
            }
            let final_approve_id_res = await final_id_ver_rej({"documents":final_approve_data_arr})
                    console.log("final_approve_id_res",final_approve_id_res);
                    try{
                        if(final_approve_id_res.body.status == "green"){
                            toast_text = final_approve_id_res.body.message;
                            toast_type = "success";
                            show_spinner = false;








            let facility_data_res = await get_facility_details()
            console.log("facility_data_res",facility_data_res.body.data[0])
            try{
                if(facility_data_res.body.status=="green"){
                    if(facility_data_res!="null"){
                        facility_data_store.set(
                            facility_data_res.body.data[0]
                        )
                    }
                }
                for (var j = 0;j < $facility_data_store.addresess.length;j++) 
            {
                if (
                    $facility_data_store.addresess[j].default_address == "1"
                ) {
                    facility_address =$facility_data_store.addresess[j].address;
                    // facility_postal =$facility_data_store.addresess[j].postal;
                    city = $facility_data_store.addresess[j].city;
                    state = $facility_data_store.addresess[j].state;
                    // location_id = $facility_data_store.addresess[j].location_id;
                }
            }
            if ($facility_data_store.org_id == "FT"){
                show_fields = 1
            }
            }
            catch (err) {
                console.log("error in facility data")
            }







            let facility_doc_data_res = await facility_document()
            try{
                if (facility_doc_data_res != "null" ){
                    facility_document_data = facility_doc_data_res.body.data;
                    
                    for (var i = 0; i < facility_document_data.length; i++){

                            facility_docs_arr[i] = facility_document_data[i].doc_type;
                            
                            if(facility_document_data[i].doc_type == "pan-photo"){
                                // console.log("pan___",facility_document_data[i].file_url)
                                pan_url = $page.url.origin+facility_document_data[i].file_url;
                                pan_verified = facility_document_data[i].verified;
                                pan_rejected = facility_document_data[i].rejected;
                                // console.log("successfully fetched Pan")
                                contains_pan = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "pan-photo")
                                //     temp_switchto = "pan_tab";
                                // }

                            }
                            
                            if(facility_document_data[i].doc_type == "voter-id-proof"){
                                // console.log("address___",facility_document_data[i].file_url)
                                voter_url = $page.url.origin+facility_document_data[i].file_url;
                                voter_verified = facility_document_data[i].verified;
                                voter_rejected = facility_document_data[i].rejected;
                                contains_voter = 1;
                                // console.log("successfully fetched Offer letter")
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "voter-id-proof")
                                //     temp_switchto = "voter_tab";
                                // } 
                            }
                            if(facility_document_data[i].doc_type == "aadhar-id-proof"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                aadhar_url = $page.url.origin+facility_document_data[i].file_url;
                                aadhar_verified = facility_document_data[i].verified;
                                aadhar_rejected = facility_document_data[i].rejected;
                                contains_aadhar = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_document_data[i].doc_type == "addproof-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                address_url = $page.url.origin+facility_document_data[i].file_url;
                                address_verified = facility_document_data[i].verified;
                                address_rejected = facility_document_data[i].rejected;
                                contains_address = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_document_data[i].doc_type == "newOffFile"){
                                // console.log("address___",facility_document_data[i].file_url)
                                offer_url = $page.url.origin+facility_document_data[i].file_url;
                                offer_verified = facility_document_data[i].verified;
                                offer_rejected = facility_document_data[i].rejected;
                                contains_offer = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "newOffFile")
                                //     temp_switchto = "offerletter_tab";
                                // } 
                                
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_document_data[i].doc_type == "dl-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                dl_url = $page.url.origin+facility_document_data[i].file_url;
                                dl_verified = facility_document_data[i].verified;
                                dl_rejected = facility_document_data[i].rejected;
                                contains_dl = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "dl-photo")
                                //     temp_switchto = "DL_tab";
                                // } 
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_document_data[i].doc_type == "pass_photo"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                pass_photo_url = $page.url.origin+facility_document_data[i].file_url;
                                pass_photo_verified = facility_document_data[i].verified;
                                pass_photo_rejected = facility_document_data[i].rejected;
                                // contains_pass_photo = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_document_data[i].doc_type == "police_info_supp_file"){
                                // console.log("address___",facility_document_data[i].file_url)
                                police_url = $page.url.origin+facility_document_data[i].file_url;
                                police_verified = facility_document_data[i].verified;
                                police_rejected = facility_document_data[i].rejected;
                                // contains_police = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_docs_arr.includes("can-cheque")){
                                can_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            if(facility_docs_arr.includes("blcheque")){
                                blk_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("passbook")){
                                passbook_url = $page.url.origin+acility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("acc-stat")){
                                acc_stmt_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            
                            
                        } 
                        
                        }
                    }
            catch (err){
                console.log("error in finding Pan image",err)
            }
                        }
                    }
                    catch(err){
                        console.log("Error in pan_sub_res",err)
                    }
            }
    }
    
    
    async function final_id_reject(){
            if(final_reject == "1"){
                show_spinner = true;
                console.log("final_rejected successful")
                console.log("inside pan_reject_flag",pan_reject_flag)
                for(let i=0;i<facility_document_data.length;i++){
                    if(pan_reject_flag == "1" && facility_document_data[i].doc_type == "pan-photo"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(voter_reject_flag == "1" && facility_document_data[i].doc_type == "voter-id-proof"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(aadhar_reject_flag == "1" && facility_document_data[i].doc_type == "aadhar-id-proof"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(dl_reject_flag == "1" && facility_document_data[i].doc_type == "dl-photo"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(address_reject_flag == "1" && facility_document_data[i].doc_type == "addproof-photo"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(offer_reject_flag == "1" && facility_document_data[i].doc_type == "newOffFile"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":$facility_id.facility_id_number,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }

            }
            let final_reject_id_res = await final_id_ver_rej({"documents":final_reject_data_arr})
                    try{
                        if(final_reject_id_res.body.status == "green"){
                            toast_text = final_reject_id_res.body.message;
                            toast_type = "success";
                            show_spinner = false;









            let facility_data_res = await get_facility_details()
            console.log("facility_data_res",facility_data_res.body.data[0])
            try{
                if(facility_data_res.body.status=="green"){
                    if(facility_data_res!="null"){
                        facility_data_store.set(
                            facility_data_res.body.data[0]
                        )
                    }
                }
                for (var j = 0;j < $facility_data_store.addresess.length;j++) 
            {
                if (
                    $facility_data_store.addresess[j].default_address == "1"
                ) {
                    facility_address =$facility_data_store.addresess[j].address;
                    // facility_postal =$facility_data_store.addresess[j].postal;
                    city = $facility_data_store.addresess[j].city;
                    state = $facility_data_store.addresess[j].state;
                    // location_id = $facility_data_store.addresess[j].location_id;
                }
            }
            if ($facility_data_store.org_id == "FT"){
                show_fields = 1
            }
            }
            catch (err) {
                console.log("error in facility data")
            }


            
            let facility_doc_data_res = await facility_document()
            try{
                if (facility_doc_data_res != "null" ){
                    facility_document_data = facility_doc_data_res.body.data;
                    
                    for (var i = 0; i < facility_document_data.length; i++){

                            facility_docs_arr[i] = facility_document_data[i].doc_type;
                            
                            if(facility_document_data[i].doc_type == "pan-photo"){
                                // console.log("pan___",facility_document_data[i].file_url)
                                pan_url = $page.url.origin+facility_document_data[i].file_url;
                                pan_verified = facility_document_data[i].verified;
                                pan_rejected = facility_document_data[i].rejected;
                                // console.log("successfully fetched Pan")
                                contains_pan = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "pan-photo")
                                //     temp_switchto = "pan_tab";
                                // }

                            }
                            
                            if(facility_document_data[i].doc_type == "voter-id-proof"){
                                // console.log("address___",facility_document_data[i].file_url)
                                voter_url = $page.url.origin+facility_document_data[i].file_url;
                                voter_verified = facility_document_data[i].verified;
                                voter_rejected = facility_document_data[i].rejected;
                                contains_voter = 1;
                                // console.log("successfully fetched Offer letter")
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "voter-id-proof")
                                //     temp_switchto = "voter_tab";
                                // } 
                            }
                            if(facility_document_data[i].doc_type == "aadhar-id-proof"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                aadhar_url = $page.url.origin+facility_document_data[i].file_url;
                                aadhar_verified = facility_document_data[i].verified;
                                aadhar_rejected = facility_document_data[i].rejected;
                                contains_aadhar = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_document_data[i].doc_type == "addproof-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                address_url = $page.url.origin+facility_document_data[i].file_url;
                                address_verified = facility_document_data[i].verified;
                                address_rejected = facility_document_data[i].rejected;
                                contains_address = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_document_data[i].doc_type == "newOffFile"){
                                // console.log("address___",facility_document_data[i].file_url)
                                offer_url = $page.url.origin+facility_document_data[i].file_url;
                                offer_verified = facility_document_data[i].verified;
                                offer_rejected = facility_document_data[i].rejected;
                                contains_offer = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "newOffFile")
                                //     temp_switchto = "offerletter_tab";
                                // } 
                                
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_document_data[i].doc_type == "dl-photo"){
                                // console.log("address___",facility_document_data[i].file_url)
                                dl_url = $page.url.origin+facility_document_data[i].file_url;
                                dl_verified = facility_document_data[i].verified;
                                dl_rejected = facility_document_data[i].rejected;
                                contains_dl = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "dl-photo")
                                //     temp_switchto = "DL_tab";
                                // } 
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_document_data[i].doc_type == "pass_photo"){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                pass_photo_url = $page.url.origin+facility_document_data[i].file_url;
                                pass_photo_verified = facility_document_data[i].verified;
                                pass_photo_rejected = facility_document_data[i].rejected;
                                // contains_pass_photo = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_document_data[i].doc_type == "police_info_supp_file"){
                                // console.log("address___",facility_document_data[i].file_url)
                                police_url = $page.url.origin+facility_document_data[i].file_url;
                                police_verified = facility_document_data[i].verified;
                                police_rejected = facility_document_data[i].rejected;
                                // contains_police = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_docs_arr.includes("can-cheque")){
                                can_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            if(facility_docs_arr.includes("blcheque")){
                                blk_cheque_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("passbook")){
                                passbook_url = $page.url.origin+facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("acc-stat")){
                                acc_stmt_url = $page.url.origin+facility_document_data[i].file_url;
                                
                            }
                            
                            
                        } 
                        
                        }
                    }
            catch (err){
                console.log("error in finding Pan image",err)
            }
                        }
                    }
                    catch(err){
                        console.log("Error in pan_sub_res",err)
                    }
                    

            }
    }
 
    async function bank_approve(){
        console.log("Inside bank approve")
        if(acc_num == null && ifsc_code == null && acc_hold_name == null){
            toast_text = "Please enter all the fields";
            toast_type = "error"
            return
        }
        // if(!$bank_details){
        //     toast_text = "data not found";
        //     toast_type = "error"
        //     return
        // }
        if(acc_num != $bank_details.account_number && ifsc_code != $bank_details.ifsc_code && acc_hold_name != $bank_details.account_holder){
            toast_text = "Details Mismatch";
            toast_type = "error"
            return
        }
        else{
            if(acc_num == $bank_details.account_number && ifsc_code == $bank_details.ifsc_code && acc_hold_name == $bank_details.account_holder){
            console.log("acc match")
            // if(ifsc_code == $bank_details.ifsc_code){
            //     console.log("ifsc match")
                // if(acc_hold_name == $bank_details.account_holder){
                //     console.log("acc_hold_name match")
                    // if(remark == $bank_details.remark){
                    //     console.log("remark match")
                        show_spinner = true;
                        let document_load = {
                        "facility_id": $facility_id.facility_id_number,
                        "approved": true,
                        "rejected": false,
                        "remarks": remark
        }
            let bank_sub_res =await bank_approve_reject(document_load)
            show_spinner = false;

            try{
                if(bank_sub_res.body.status == "green"){
                    bank_success_flag = 1


                let facility_bank_data_res = await get_bank_facility_details()
                console.log("bank_details", facility_bank_data_res.body.data.length)
                try{
                    if(facility_bank_data_res.body.data.length == "0"){
                        bank_details_provided="no";
                    }
                    else if(facility_bank_data_res != "null"){
                        bank_details.set(
                            facility_bank_data_res.body.data[0]
                        )
                    }
                    
                }
            
                catch (err){
                    console.log("Bank details error")
                }





                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
                    // }
                // }
            // }
        }
        }
    }

    async function bank_reject(){
            show_spinner = true;
            let document_load = {
            "facility_id": $facility_id.facility_id_number,
            "approved": false,
            "rejected": true,
            "remarks": remark
        }
            let bank_sub_res =await bank_approve_reject(document_load)
            show_spinner = false;
            try{
                if(bank_sub_res.body.status == "green"){
                    bank_reject_flag = 1



                    let facility_bank_data_res = await get_bank_facility_details()
            console.log("bank_details", facility_bank_data_res.body.data.length)
            try{
                if(facility_bank_data_res.body.data.length == "0"){
                    bank_details_provided="no";
                }
                else if(facility_bank_data_res != "null"){
                    bank_details.set(
                        facility_bank_data_res.body.data[0]
                    )
                }
                
            }
            catch (err){
                console.log("Bank details error")
            }



                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
        }
           
        
        

    
        function routeToOnboardsummary() {
        let replaceState = false;
        goto(routePrev, { replaceState });
        }

        routePrev = "onboardsummary?unFacID="+$facility_id.facility_id_number;


    
        function menu_click(data){
        if(data == "id"){is_id_active ="MenuActive",is_bgv_active="",is_bank_active="",final_id_ver_btn="1",final_bank_ver_btn="0",final_bgv_ver_btn="0"}
        else if(data =="bank"){is_bank_active="MenuActive",is_id_active="",is_bgv_active="",final_bank_ver_btn="1",final_id_ver_btn="0",final_bgv_ver_btn="0"}
        else if(data == "bgv"){is_bgv_active="MenuActive",is_id_active="",is_bank_active="",final_bgv_ver_btn="1",final_id_ver_btn="0",final_bank_ver_btn="0",pan_bg_white=""}
    }

    function white_bg(data){
        if(data == "pan"){pan_bg_white="bg-white",voter_bg_white="",aadhar_bg_white="",dl_bg_white="",address_bg_white="",offer_bg_white="",basic_bg_white="",police_bg_white=""}
        else if(data =="voter"){voter_bg_white="bg-white",pan_bg_white="",aadhar_bg_white="",dl_bg_white="",address_bg_white="",offer_bg_white="",basic_bg_white="",police_bg_white=""}
        else if(data == "aadhar"){aadhar_bg_white="bg-white",pan_bg_white="",voter_bg_white="",dl_bg_white="",address_bg_white="",offer_bg_white="",basic_bg_white="",police_bg_white=""}
        else if(data == "dl"){dl_bg_white="bg-white",pan_bg_white="",voter_bg_white="",aadhar_bg_white="",address_bg_white="",offer_bg_white="",basic_bg_white="",police_bg_white=""}
        else if(data == "address"){address_bg_white="bg-white",pan_bg_white="",voter_bg_white="",aadhar_bg_white="",dl_bg_white="",offer_bg_white="",basic_bg_white="",police_bg_white=""}
        else if(data == "offer"){offer_bg_white="bg-white",pan_bg_white="",voter_bg_white="",aadhar_bg_white="",dl_bg_white="",address_bg_white="",basic_bg_white="",police_bg_white=""}
        else if(data =="basic"){basic_bg_white="bg-white",pan_bg_white="",voter_bg_white="",aadhar_bg_white="",dl_bg_white="",address_bg_white="",offer_bg_white="",police_bg_white=""}
        else if(data == "police"){police_bg_white="bg-white",pan_bg_white="",voter_bg_white="",aadhar_bg_white="",dl_bg_white="",address_bg_white="",offer_bg_white="",basic_bg_white=""}
    }

    async function bgv_click(bgv_data){
        if(bgv_data=="basic_approve"){
            show_spinner = true;
            console.log("basic_approve")
            // if(show_fields ==1){
                let basic_dets_data = {
                action_type:"Verified",
                facility_id:$facility_id.facility_id_number,
                field_type:"basicInfo",
                station_model:$bgv_data_store.station_model,
                hub_name:$bgv_data_store.hub_name,
                delivery_model:$bgv_data_store.delivery_model
            }
            let basic_app_res = await bgv_approve_rej(basic_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("basic_app_res",basic_app_res)
            if(basic_app_res.body.status == "green"){
                basic_bgv_success_flag = 1;
                let facility_bgv_check_res = await facility_bgv_check();
        console.log("facility_bgv_check_res qwerty 2",facility_bgv_check_res)
            }
        }
        if(bgv_data=="address_approve"){
            show_spinner = true;
            console.log("address_approve")
            let address_dets_data = {
                action_type:"Verified",
                facility_id:$facility_id.facility_id_number,
                field_type:"addressInfo"
            }
            let address_app_res = await bgv_approve_rej(address_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("address_app_res",address_app_res)
            if(address_app_res.body.status == "green"){
                address_bgv_success_flag = 1;
            }
        }
        if(bgv_data=="pan_approve"){
            show_spinner = true;
            console.log("pan_approve")
            let pan_dets_data = {
                action_type:"Verified",
                facility_id:$facility_id.facility_id_number,
                field_type:"panInfo",
            }
            let pan_app_res = await bgv_approve_rej(pan_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("pan_app_res",pan_app_res)
            if(pan_app_res.body.status == "green"){
                pan_bgv_success_flag = 1
            }
        }

        if(bgv_data=="dl_approve"){
            show_spinner = true;
            console.log("dl_approve")
            let dl_dets_data = {
                action_type:"Verified",
                facility_id:$facility_id.facility_id_number,
                field_type:"dlInfo",
            }
            let dl_app_res = await bgv_approve_rej(dl_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("dl_app_res",dl_app_res)
            if(dl_app_res.body.status == "green"){
                dl_bgv_success_flag = 1
            }
        }

        if(bgv_data=="pol_approve"){
            show_spinner = true;
            console.log("pol_approve")
            let pol_dets_data = {
                action_type:"Verified",
                facility_id:$facility_id.facility_id_number,
                field_type:"policeInfo",
            }
            let pol_app_res = await bgv_approve_rej(pol_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("pol_app_res",pol_app_res)
            if(pol_app_res.body.status == "green"){
                police_bgv_success_flag = 1
            }
        }
        console.log("$bgv_config_store,$bgv_config_store",$bgv_config_store)
            if($bgv_config_store.is_basic_info_mandatory == 0){   
                final_basic_bgv_approve = 1;
               
            }
            else{
                if(basic_bgv_success_flag == 1){
                    final_basic_bgv_approve = 1;
                }
            }
            if($bgv_config_store.is_address_info_mandatory == 0){
                final_address_bgv_approve = 1;
               
            }
            else{
                if(address_bgv_success_flag == 1){
                    final_address_bgv_approve = 1;
                }
            }
            if($bgv_config_store.is_driving_license_mandatory == 0){
                final_licence_bgv_approve = 1;
               
            }
            else{
                if(address_bgv_success_flag == 1){
                    final_licence_bgv_approve = 1;
                }
               
            }
            if($bgv_config_store.is_police_verification_mandatory == 0){
                final_police_bgv_approve = 1;
                
            }
            else{
                if(police_bgv_success_flag == 1){
                    final_police_bgv_approve = 1;
                }
                
            }
            if($bgv_config_store.is_pan_info_mandatory == 0){
                final_pan_bgv_approve = 1;
               
            }
            else{
                if(pan_bgv_success_flag == 1){
                    final_pan_bgv_approve = 1;
                }
                
            }
            
            if(final_basic_bgv_approve == 1 && final_address_bgv_approve == 1 && final_licence_bgv_approve == 1 && final_police_bgv_approve == 1 && final_pan_bgv_approve == 1){
                final_bgv_approve = 1;

                // final_id_ver_btn = 0;
            }
            
            // console.log("FLAGS in bgv",basic_bgv_success_flag,address_bgv_success_flag,dl_bgv_success_flag,police_bgv_success_flag,pan_bgv_success_flag)
            
            // console.log("FLAGS in bgv",final_basic_bgv_approve,final_address_bgv_approve,final_licence_bgv_approve,final_police_bgv_approve,final_pan_bgv_approve)
            // console.log("FLAGS in bgv final_bgv_approve",final_bgv_approve)
            
            if(bgv_data == "basic_reject"){
            show_spinner = true;
            console.log("basic_reject")
            // if(basic_info_rej != null)
            // {
                let basic_dets_data = {
                action_type:"Rejected",
                facility_id:$facility_id.facility_id_number,
                field_type:"basicInfo",
                remarks:basic_info_res.trim(),
            }
            // console.log(basic_info_rej,"mention the reason")
            // }
            
            let basic_app_res = await bgv_approve_rej(basic_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
       
       $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("basic_app_res",basic_app_res)


            if(basic_app_res.body.status == "green"){
                basic_bgv_reject_flag = 1;
            }
        }
        if(bgv_data == "address_reject"){
            show_spinner = true;
            console.log("address_reject")
            let address_dets_data = {
                action_type:"Rejected",
                facility_id:$facility_id.facility_id_number,
                field_type:"addressInfo",
                remarks:address_info_res.trim(),
            }
            let address_app_res = await bgv_approve_rej(address_dets_data)
            show_spinner = false;

            let facility_bgv_check_res = await facility_bgv_check();     
            $bgv_data_store = facility_bgv_check_res.body.data[0];

            if(address_app_res.body.status == "green"){
                address_bgv_reject_flag = 1;
            }
        }

        if(bgv_data== "dl_reject"){
            show_spinner = true;
            console.log("dl_reject")
            let dl_dets_data = {
                action_type:"Rejected",
                facility_id:$facility_id.facility_id_number,
                field_type:"dlInfo",
                remarks:dl_info_res.trim(),
            }
            let dl_app_res = await bgv_approve_rej(dl_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("dl_app_res",dl_app_res)
            if(dl_app_res.body.status == "green"){
                dl_bgv_reject_flag = 1
            }
        }
        if(bgv_data == "pol_reject"){
            show_spinner = true;
            console.log("po_reject")
            let pol_dets_data = {
                action_type:"Rejected",
                facility_id:$facility_id.facility_id_number,
                field_type:"policeInfo",
                remarks:pol_info_res.trim(),
            }
            let pol_app_res = await bgv_approve_rej(pol_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("pol_app_res",pol_app_res)
            if(pol_app_res.body.status == "green"){
                police_bgv_reject_flag = 1
            }
        }
        if(bgv_data == "pan_reject"){
            show_spinner = true;
            console.log("pan_reject")
            let pan_dets_data = {
                action_type:"Rejected",
                facility_id:$facility_id.facility_id_number,
                field_type:"panInfo",
                remarks:pan_info_res.trim(),
            }
            let pan_app_res = await bgv_approve_rej(pan_dets_data)
            show_spinner = false;
            let facility_bgv_check_res = await facility_bgv_check();
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            console.log("pan_app_res",pan_app_res)
            if(pan_app_res.body.status == "green"){
                pan_bgv_reject_flag = 1
            }
        }
        if($bgv_config_store.is_basic_info_mandatory == 0){   
                final_basic_bgv_reject = 1;
               
            }
            else{
                if(basic_bgv_reject_flag == 1){
                    final_basic_bgv_reject = 1;
                }
            }
            if($bgv_config_store.is_address_info_mandatory == 0){
                final_address_bgv_reject = 1;
            }
            else{
                if(address_bgv_reject_flag == 1){
                    final_address_bgv_reject = 1;
                }
            }
            if($bgv_config_store.is_driving_license_mandatory == 0){
                final_licence_bgv_reject = 1;
            }
            else{
                if(dl_bgv_reject_flag == 1){
                    final_licence_bgv_reject = 1;
                }
            }
            if($bgv_config_store.is_police_verification_mandatory == 0){
                final_police_bgv_reject = 1;
            }
            else{
                if(police_bgv_reject_flag == 1){
                    final_police_bgv_reject = 1;
                }
            }
            if($bgv_config_store.is_pan_info_mandatory == 0){
                final_pan_bgv_reject = 1;
            }
            else{
                if(pan_bgv_reject_flag == 1){
                    final_pan_bgv_reject = 1;
                }
            }
            if(final_basic_bgv_reject == 1 && final_address_bgv_reject == 1 && final_licence_bgv_reject == 1 && final_police_bgv_reject == 1 && final_pan_bgv_reject == 1){
                final_bgv_reject = 1;
                // final_id_ver_btn = 0;
                // console.log("final_bgv_ver_btn",final_bgv_ver_btn)
                // console.log("final_id_ver_btn",final_id_ver_btn);
            }
    }
    
    async function final_bgv_verify_func(){
        if(final_bgv_approve == 1){
            console.log("final_bgv_verify_func")
            show_spinner=true;
            let final_bgv_verify_data = {
                "facility_id":$facility_id.facility_id_number,
                "bgv_status":"verified"
            }

            let final_bgv_verify_res = await final_bgv_app_rej(final_bgv_verify_data)
            console.log("final_bgv_verify_res",final_bgv_verify_res)
            if(final_bgv_verify_res.body.status == "green"){
                console.log("TOAST OF BGV SUCCESSFUL")
                toast_text = final_bgv_verify_res.body.message;
                toast_type = "success";


                // window.location.reload();
                let facility_data_res = await get_facility_details()
            console.log("facility_data_res",facility_data_res.body.data[0])
            try{
                if(facility_data_res.body.status=="green"){
                    if(facility_data_res!="null"){
                        facility_data_store.set(
                            facility_data_res.body.data[0]
                        )
                    }
                }
                for (var j = 0;j < $facility_data_store.addresess.length;j++) 
            {
                if (
                    $facility_data_store.addresess[j].default_address == "1"
                ) {
                    facility_address =$facility_data_store.addresess[j].address;
                    // facility_postal =$facility_data_store.addresess[j].postal;
                    city = $facility_data_store.addresess[j].city;
                    state = $facility_data_store.addresess[j].state;
                    // location_id = $facility_data_store.addresess[j].location_id;
                }
            }
            if ($facility_data_store.org_id == "FT"){
                show_fields = 1
            }
            }
            catch (err) {
                console.log("error in facility data")
            }







                show_spinner=false;
                let facility_bgv_check_res = await facility_bgv_check();
        console.log("facility_bgv_check_res",facility_bgv_check_res)
        try {
            if(!facility_bgv_check_res || facility_bgv_check_res.body.data.length == "0"){
                var eighteenYearsAgo =  new Date();
                eighteenYearsAgo.setFullYear( eighteenYearsAgo.getFullYear() - 18);
                $bgv_data_store.basic_info_dob = eighteenYearsAgo;
        }
        else{
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            gend_selected = $bgv_data_store.gender;
            add_is_perm = $bgv_data_store.address_type;
            curr_same = $bgv_data_store.current_address_is_same;
            police_add_per = $bgv_data_store.police_address_type;
            if(!$bgv_data_store.basic_info_dob){
                var eighteenYearsAgo =  new Date();
                $bgv_data_store.basic_info_dob = eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18);
                // is_id_prof_verified.reload()
            }
            
        }
        }
        catch(err) {
            console.log("Error",err)
            // message.innerHTML = "Error is " + err;
        }
                }
            }
    }
    
    async function final_bgv_reject_func(){
        if(final_bgv_reject == 1){
            // show_spinner=true;
            console.log("final_bgv_reject_func, qwerty 1")
            let final_bgv_reject_data = {
                "facility_id":$facility_id.facility_id_number,
                "bgv_status":"rejected",
                "bgv_remarks":bgv_remarks
            }
            let final_bgv_reject_res = await final_bgv_app_rej(final_bgv_reject_data)
            console.log("final_bgv_reject_res",final_bgv_reject_res)
            if(final_bgv_reject_res.body.status == "green"){
                console.log("TOAST OF BGV REJECTED")
                toast_text = final_bgv_reject_res.body.message;
                toast_type = "success";
                // window.location.reload();







            let facility_data_res = await get_facility_details()
            console.log("facility_data_res",facility_data_res.body.data[0])
            try{
                if(facility_data_res.body.status=="green"){
                    if(facility_data_res!="null"){
                        facility_data_store.set(
                            facility_data_res.body.data[0]
                        )
                    }
                }
                for (var j = 0;j < $facility_data_store.addresess.length;j++) 
            {
                if (
                    $facility_data_store.addresess[j].default_address == "1"
                ) {
                    facility_address =$facility_data_store.addresess[j].address;
                    // facility_postal =$facility_data_store.addresess[j].postal;
                    city = $facility_data_store.addresess[j].city;
                    state = $facility_data_store.addresess[j].state;
                    // location_id = $facility_data_store.addresess[j].location_id;
                }
            }
            if ($facility_data_store.org_id == "FT"){
                show_fields = 1
            }
            }
            catch (err) {
                console.log("error in facility data")
            }







                show_spinner=false;
                let facility_bgv_check_res = await facility_bgv_check();
        console.log("facility_bgv_check_res qwerty 2",facility_bgv_check_res)
        show_spinner=false;
        try {
            if(!facility_bgv_check_res || facility_bgv_check_res.body.data.length == "0"){
                var eighteenYearsAgo =  new Date();
                eighteenYearsAgo.setFullYear( eighteenYearsAgo.getFullYear() - 18);
                $bgv_data_store.basic_info_dob = eighteenYearsAgo;
        }
        else{
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            gend_selected = $bgv_data_store.gender;
            add_is_perm = $bgv_data_store.address_type;
            curr_same = $bgv_data_store.current_address_is_same;
            police_add_per = $bgv_data_store.police_address_type;
            if(!$bgv_data_store.basic_info_dob){
                var eighteenYearsAgo =  new Date();
                $bgv_data_store.basic_info_dob = eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18);
                
            }
            // $facility_data_store.is_id_prof_rejected.reload()
        }
        }
        catch(err) {
            console.log("Error qwerty 3",err)
            // message.innerHTML = "Error is " + err;
        }
                }
            }
    } 

    function img_change(data){
        if(data == "aadhar"){
            show_aadhar = 1;
            show_voter = 0;
            show_pass_photo = 0;
            show_blk_cheque = 0;
            show_can_cheuque = 0;
            show_passbook = 0;
            show_acnt_stmt = 0;
            aadhar_act="active";
            voter_act=""
            pass_photo_act=""
        }
        if(data == "voter"){
            show_voter = 1;
            show_aadhar = 0;
            show_pass_photo = 0;
            show_blk_cheque = 0;
            show_can_cheuque = 0;
            show_passbook = 0;
            show_acnt_stmt = 0;
            aadhar_act="";
            voter_act="active"
            pass_photo_act=""
        }
        if(data == "pass_photo"){
            show_pass_photo = 1;
            show_aadhar = 0;
            show_voter = 0;
            show_blk_cheque = 0;
            show_can_cheuque = 0;
            show_passbook = 0;
            show_acnt_stmt = 0;
            aadhar_act="";
            voter_act=""
            pass_photo_act="active"
        }
        if(data == "blk_cheque"){
            
            show_pass_photo = 0;
            show_aadhar = 0;
            show_voter = 0;
            show_blk_cheque = 1;
            show_can_cheuque = 0;
            show_passbook = 0;
            show_acnt_stmt = 0;
            blk_cheque_act="active";
            can_cheque_act="";
            pass_act="";
            act_stmt_act="";
        }
        if(data == "can_cheque"){
            
            show_pass_photo = 0;
            show_aadhar = 0;
            show_voter = 0;
            show_blk_cheque = 0;
            show_can_cheuque =1;
            show_passbook = 0;
            show_acnt_stmt = 0;
            blk_cheque_act="";
            can_cheque_act="active";
            pass_act="";
            act_stmt_act="";
        }
        if(data == "passbook"){
            
            show_pass_photo = 0;
            show_aadhar = 0;
            show_voter = 0;
            show_blk_cheque = 0;
            show_can_cheuque = 0;
            show_passbook = 1;
            show_acnt_stmt = 0;
            blk_cheque_act="";
            can_cheque_act="";
            pass_act="active";
            act_stmt_act="";
        }
        if(data == "account_stmt"){
            
            show_pass_photo = 1;
            show_aadhar = 0;
            show_voter = 0;
            show_blk_cheque = 0;
            show_can_cheuque = 0;
            show_passbook = 0;
            show_acnt_stmt = 1;
            blk_cheque_act="";
            can_cheque_act="";
            pass_act="";
            act_stmt_act="active";
        }

    }

    function openRejectModel(){
        Basic_Reject_modal.style.display = "block";
    }

    function closeRejectModel(){
        Basic_Reject_modal.style.display = "none";
    }

    function openAddressRejectModel(){
        Address_Reject_modal.style.display = "block";
    }

    function closeAddressRejectModel(){
        Address_Reject_modal.style.display = "none";
    }

    function openDLRejectModel(){
        DL_Reject_modal.style.display = "block";
    }

    function closeDLRejectModel(){
        DL_Reject_modal.style.display = "none";
    }

    function openPVRejectModel(){
        PV_Reject_modal.style.display = "block";
    }

    function closePVRejectModel(){
        PV_Reject_modal.style.display = "none";
    }

    function openPanRejectModel(){
        Pan_Reject_modal.style.display = "block";
    }

    function closePanRejectModel(){
        Pan_Reject_modal.style.display = "none";
    }

    function openFinalRejectModel(){
        Final_bg_Reject_modal.style.display = "block";
    }

    function closeFinalRejectModel(){
        Final_bg_Reject_modal.style.display = "none";
    }

    async function openIDcard(){
        if($facility_data_store.status == "Deactive" ){
            toast_text = "User is not active ";
            toast_type = "error"
        }
        else{
            if(!profile_url){
                showIDCard.style.display = "block";
                let response = await get_pravesh_properties_method();
                
                console.log("respo",JSON.parse(response.body.data.id_card_config))

                // let new_respo = JSON.parse(response.body.data.id_card_config)

                // console.log("new respo",new_respo.id_label_1)

                if(response.body.status == "green"){
                    // id_card_data = response.body.data.id_card_config;

                    id_card_data = JSON.parse(response.body.data.id_card_config)

                    id_card_data = id_card_data
                    console.log("id_card_data respo",id_card_data)
                }
                else{
                    console.log("err in side",response.body.message)
                }
            }
            else{
                toast_text = "Upload Profile Pic ";
                toast_type = "error"
            }
        }

    }

    function closeIDcard(){
        showIDCard.style.display = "none";
    }

    async function openCasUser(){
        let get_cas_user_res = await get_cas_user()
        console.log("get_cas_user_res",get_cas_user_res)

        if(get_cas_user_res.status == "green"){
            toast_text = "User is active";
            toast_type = "success";
        }
        else{
            showCasUser.style.display = "block";
            if(get_cas_user_res.message = "User is Deactive in CAS" || get_cas_user_res.status == "red"){
                cas_flag = 1
            }
            else {
                cas_flag = 2
            }

        }
    }

    async function activate_cas(){
        activate_cas_res = await activate_cas_user()
    }

    async function create_cas(){
        create_cas_user_res = await create_cas_user()
    }

    function closeCasUser(){
        showCasUser.style.display = "none";
    }


    async function workorganization() {
        workorganizationModel.style.display = "block";
        if($facility_data_store.status == "Deactive"){
            status_display = -1;
            toast_text = "User is Deactive";
            toast_type = "error";
        }
        let get_client_details_res = await get_client_details()
        try {
            if (get_client_details_res != "null"){
                for(let i=0; i< get_client_details_res.body.data.length;i++){
                    get_client_details_data.push(get_client_details_res.body.data[i]);
                }
                get_client_details_data = get_client_details_data;
                console.log("get_client_details_data",get_client_details_data)
            }
        } catch (err) {
            toast_type = "error";
            toast_text = get_client_details_res.body.message;
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
            toast_type = "error";
            toast_text = get_loc_scope_res.body.message;
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
        if(get_client_data_mapping_res.body.status == "green"){
            console.log("GREEN")
             for(let i=0;i<get_client_data_mapping_res.body.data.length;i++){
                 console.log("inside /api/method/pravesh.facility.routes.organisation.get_org_list?org_field=[%22*%22]")
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
            toast_type = "error";
            toast_text = "No client Data";
        }
        
        } catch(err) {
            toast_type = "error";
            toast_text = err;
        
        }

    }

    function closeWorkorganization() {
        workorganizationModel.style.display = "none";
    }

    async function openassociateTypeMOdal() {
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

        let get_assoc_types_res = await get_assoc_types();
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
        associateTypeMOdal.style.display = "none";
    }


    async function finalMap(){ 
        let phoneNumber,emailId;
        let orgSpecificNumber = [];

        
        // console.log("get_pravesh_properties_method",response)
        if(!id_select){
            toast_text = "Please select organization";
            toast_type = "error"
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
                    toast_text = "Mapping is not allowed for this Organization";
                    toast_type = "error"
                    return
                }
            }
            if($facility_data_store.is_bgv_verified == undefined || $facility_data_store.is_bgv_verified != 1){
                toast_text = "BGV Verification Incomplete !!";
                toast_type = "error"
                return
            }
            var profileIncom = false;
            if (dl_number == undefined || dl_number.length < 7) {
                profileIncom = true;
            }
            if (pan_number == undefined || pan_number.length < 7) {
                profileIncom = true;
            }
            if (profileIncom) {
                toast_text = "Upload both Pancard and Driving Licence first !!";
                toast_type = "error"
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
                                toast_text =  'Rabbit ID already requested for mob number <br>' + phoneNumber + "<br> Please update new number in <br> Basic Information Section under BGV <br> and try again";
                                toast_type = "error"
                            }
                        }

                    }
                    if ($bgv_data_store.email_id == undefined || $bgv_data_store.email_id.trim().length == 0) {
                        toast_type = "error"
                        toast_text = "Please update email address in BGV form and then try"
                        return;
                    }
                    

                    if ($bgv_data_store.is_email_verified != 1) {
                        toast_type = "error"
                        toast_text = "Please verify email address in BGV form and then try"
                        return;
                    }
                    emailId = $bgv_data_store.email_id;
            }
            }
            
            

            if(!stat_select){
                toast_text = "Please select Station";
                toast_type = "error";
                return
            }

            if(!stat_code){
                toast_text = "Please select Specific Name or COMP Name";
                toast_type = "error";
                return
            }
            if(stat_code == "Create Only Rabbit ID/COMP ID" && requestType == ""){
                toast_text = "Please select Rabbit Id or Comp Id option";
                toast_type = "error";
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
                "facility_id":$facility_id.facility_id_number,
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
                    toast_text = final_save_mapping_res.body.message;
                    toast_type = "green";
                }
            // }
             else {
                toast_text = "Error occured while adding mapping";
                toast_type = "error";
            }
        console.log("final_map_load",final_map_load)

    }


    async function finalreqAssoc(){
        let update_date_arr = [];
        console.log("get_change_associte_data inside final",get_change_associte_data)
        // let new_from_date =  get_date_format(fromDate,"yyyy-mm-dd"))
        // new Date(fromDate)
        let new_start_date = new Date(fromDate);
        let updated_start_date = get_date_format(new_start_date,"yyyy-mm-dd");
        let get_change_associte_res = await get_change_associte();
        let get_assoc_types_res = await get_assoc_types();

        for(let i=0;i<get_change_associte_data.length;i++){
            update_date_arr.push(get_change_associte_data[i].from_date)

        }

        if(!newType){
            toast_text = "Please select New Type";
            toast_type = "error";
            return
            }

            console.log("inside update_date_arr.includes(updated_start_date)",update_date_arr.includes(updated_start_date))
        if(!fromDate && update_date_arr.includes(updated_start_date) == true){
            
            toast_text = "Please select vaild From date";
            toast_type = "error";
            return
        }


        if(!assocRemarks){
            toast_text = "Please select Remarks";
            toast_type = "error";
            return
        }


        let final_req_load = {
                "facility_id":$facility_id.facility_id_number,
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
                    toast_text = send_associate_req_res.body.message;
                    toast_type = "green";
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
                        console.log("inside error with associate")
                    }
                }
            else {
                toast_text = "Error occured while sending associate request";
                toast_type = "error";
            }
            console.log("final_req_load",final_req_load)
    }


    
    function printID(){
        document.getElementById("nonPrintable").className += "noPrint";
        window.print();
    }


</script>

{#if show_spinner}
    <Spinner />
{/if}

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section xsl:px-p10">
            <div class="breadcrumbtextDetails breadcrumbmedia">
                <p class="flex items-center">
                    <span class="text-textgrey pr-1 text-base xsl:hidden">Home / Workforce</span>

                    <span class="Username">
                        <img src="{$img_url_name.img_name}/delivery.png" class="userIconMedia" alt="">
                        <span>{$facility_data_store.facility_name}</span>
                        <span class="userDesignation">(Associate
                            - {$facility_data_store.facility_type} / ID - {$facility_data_store.name})</span> </span>

                </p>
                <!-- <p class="breadcrumbRight">
                    <a class="cursor-pointer">
                        <span class="breadRightIcons" id="SupplerModalbuttonClick">
                            <img src="{$img_url_name.img_name}/audittrail.png" class="pr-2" alt=""> Audit Trial (12)
                        </span>
                    </a>
                  
                </p> -->
                <!-- <button on:click="{openIDcard}" type="button" class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3">
                    ID Card
                </button> -->

                <!-- <button on:click="{openCasUser}" type="button" class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3">
                    cas user
                </button> -->

                <!-- <div class="userStatus ">
                    <p class="flex items-center smButtonText" on:click={workorganization}>
                        <a href="" class="smButton modal-open">
                            View/Client edit
                        </a>
                    </p>
                </div> -->


                <!-- <div class="userStatus ">
                    <p class="flex items-center smButtonText" on:click="{openassociateTypeMOdal}">
                        <a href="" class="smButton modal-open">
                            Associate Type
                        </a>
                    </p>
                </div> -->

                <button on:click={routeToOnboardsummary} type="button"
                        class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3">Back</button>
            </div>
            <div class="onboardedBy mb-4">
                <p class="text-sm"><span class="font-light text-grey text-sm">Onboarded By - </span>{$facility_data_store.owner}</p>
            </div>
           
            <div class="statusbarVMT ">
                <div class="leftStatus">
                    <div class="text-sm">
                        <div class="statusBarSec ">
                            <div class="statusbarLeft">
                                <p class="statusText">Status - </p>
                            </div>
                            <div class="statusbarMiddle">
                              <!-- {#if $facility_data_store.is_id_prof_verified=="1"} -->
                                <!-- <p class="statusContent font-normal xs:w-5/12"><img src="{$img_url_name.img_name}/timer.png"
                                        class="pr-2" alt="">
                                        ID Proof
                                        <img src="{$img_url_name.img_name}/info.svg"
                                        class="pl-2" alt="">
                                    </p> -->
                                    
                                {#if $facility_data_store.is_id_prof_verified == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                <img
                                    src="{$img_url_name.img_name}/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> ID Verified
                                </p>
                                {:else if $facility_data_store.is_id_prof_rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="{$img_url_name.img_name}/reject.png"
                                    class="pr-2"
                                    alt=""
                                />ID Rejected
                                </p>
                                <!-- {:else} -->
                                {:else if $facility_data_store.is_id_prof_rejected == "0" && $facility_data_store.is_id_prof_verified == "0"}
                                <p class="statusContent font-normal xs:w-5/12">
                                <img
                                    src="{$img_url_name.img_name}/timer.png"
                                    class="pr-2"
                                    alt=""
                                />ID Pending
                                </p>
                                {/if}


                                <p class="xsl:hidden"> <img src="{$img_url_name.img_name}/Line.png" alt=""></p>

                                <!-- <p class="statusContent font-normal xs:w-5/12"><img src="{$img_url_name.img_name}/timer.png"
                                        class="pr-2" alt="">Bank Details
                                        <img src="{$img_url_name.img_name}/info.svg"
                                        class="pl-2" alt="">
                                </p> -->
                                {#if !$bank_details}
                                <p></p>
                                {:else}
                                {#if $bank_details.approved == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                <img
                                    src="{$img_url_name.img_name}/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> Bank Verified
                                </p>
                                {:else if $bank_details.rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="{$img_url_name.img_name}/reject.png"
                                    class="pr-2"
                                    alt=""
                                />Bank Rejected
                                </p>
                                {:else if $bank_details.rejected == "0" && $bank_details.approved == "0"}
                                    
                                    <p class="statusContent font-normal xs:w-5/12">
                                        <img
                                            src="{$img_url_name.img_name}/timer.png"
                                            class="pr-2"
                                            alt=""
                                        />Bank Verification Pending
                                    </p>
                                {/if}

                                <p class="xsl:hidden"> <img src="{$img_url_name.img_name}/Line.png" alt=""></p>

                                    <!-- <p class="statusContent font-normal xs:w-5/12"><img src="{$img_url_name.img_name}/timer.png"
                                            class="pr-2" alt="">BGV
                                            <img src="{$img_url_name.img_name}/info.svg"
                                            class="pl-2" alt="">
                                    </p> -->

                                {#if $facility_data_store.is_bgv_verified == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                <img
                                    src="{$img_url_name.img_name}/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> BGV Verified
                                </p>
                                {:else if $facility_data_store.is_bgv_rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="{$img_url_name.img_name}/reject.png"
                                    class="pr-2"
                                    alt=""
                                />BGV Rejected
                                </p>
                                <!-- {:else} -->
                                {:else if $facility_data_store.is_bgv_intiated == "0" && $facility_data_store.is_id_prof_verified == "0"}
                                <p class="statusContent font-normal xs:w-5/12">
                                <img
                                    src="{$img_url_name.img_name}/timer.png"
                                    class="pr-2"
                                    alt=""
                                />BGV Pending
                                </p>
                                {/if}
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="statusrightlink xsl:hidden">
                    
                </div> -->
                {#if final_id_ver_btn == "1"}
                <div class="statusrightlink ">
                    <div class="vmtRejected mr-4 " on:click="{final_id_reject}">
                        Reject 
                    </div>
                    <div class="vmtVerify "  on:click="{final_id_verify}">
                        Verify 
                        <!-- <img src="{$img_url_name.img_name}/downarrowwhite.svg" class="pl-2" alt="arrow"> -->
                    </div>
                </div>
                {:else if final_bgv_ver_btn == "1"}
                <div class="statusrightlink ">
                    <div class="vmtRejected mr-4" on:click="{openFinalRejectModel}">
                        <!-- openFinalRejectModel -->
                        Reject 
                    </div>
                    <div class="vmtVerify "  on:click="{final_bgv_verify_func}">
                        Verify 
                        <!-- <img src="{$img_url_name.img_name}/downarrowwhite.svg" class="pl-2" alt="arrow"> -->
                    </div>
                </div>
                {:else if final_bank_ver_btn =="1"}<p></p>
                {/if}
            </div>
            <!-- <div class="mt-4 mb-3 hidden xsl:flex">
                <div class="vmtVerify ">
                    Verify 
                </div>
            </div> -->
        </div>
    </div>

<div class="verifyIdSection ">
    <div class="mobileMenuForVerifyID hidden xsl:block">
        <ul class="flex w-full  text-center menuActiveID">
            <!-- activetab -->
            <li class=" {is_id_active}" on:click={() => {temp_display = "display_id_proof",menu_click("id")}}>ID Proof</li>
            <li class="{is_bank_active}" on:click={() => {temp_display = "display_bank_details",menu_click("bank")}}>Bank Details</li>
            <li class="{is_bgv_active}" on:click={() => {temp_display = "display_bgv_details",menu_click("bgv")}}>BGV</li>
        </ul>
    </div>
    <div class="grid grid-cols-5 gap-4 bg-lighterGrey xsl:grid-cols-1">
        <div class="col-span-1 xsl:col-span-5">
            <div class="verifyMenu bg-white m-4 rounded-lg xsl:hidden">

                <div class="flex  justify-between items-center py-3 px-4 Menu {is_id_active}" on:click={() => {temp_display = "display_id_proof",menu_click("id")}}>
                    <p>ID Proof<p>
                        <!-- <img src="{$img_url_name.img_name}/downarrowwhite.svg"> -->
                        <img src="{$img_url_name.img_name}/downarrowwhite.svg" alt="">
                </div>
                <div class="flex  justify-between items-center py-3 px-4 Menu {is_bank_active}" on:click={() => {temp_display = "display_bank_details",menu_click("bank")}}>
                    <p>Bank Details<p>
                        <img src="{$img_url_name.img_name}/downarrowwhite.svg">
                </div>
                <div class="flex  justify-between items-center py-3 px-4 Menu {is_bgv_active}" on:click={() => {temp_display = "display_bgv_details",menu_click("bgv")}}>
                    <p>BGV<p>
                        <img src="{$img_url_name.img_name}/downarrowwhite.svg">
                </div>
            </div>
        </div>

        <!-- Verify ID Proof -->
        {#if temp_display == "display_id_proof"}
        <div class="m-4 col-span-4 xsl:col-span-5 ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify ID Proof</h4>
                {#if final_approve == "1"}
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span> {$facility_data_store.document_updated_by} <span class="font-medium">On-</span>{verified_date}</span>
                </p>
                {/if}
            </div> 
            <div class="mobileVerifyIDMenus hidden xsl:block">
                <div class="w-full mt-2">
                    <ul name="" id="" class="w-full px-3 py-2 text-sm">
                        <li  on:click={() => {temp_switchto = "pan_tab"}}>PAN Number</li>
                        <li  on:click={() => {temp_switchto = "voter_tab"}}>Voter ID</li>
                        <!-- <option value="" on:click={() => {temp_switchto = "aadhar_tab",white_bg("aadhar")}}>Aadhar Number</option>
                        <option value="" on:click={() => {temp_switchto = "DL_tab",white_bg("dl")}}>Driving License</option>
                        <option value="" on:click={() => {temp_switchto = "address_tab",white_bg("address")}}>Address Proof</option>
                        <option value="" on:click={() => {temp_switchto = "offerletter_tab",white_bg("offer")}}>Offer Letter</option> -->
                        </ul>
                </div>
            </div>
            <div class="w-full bg-white rounded-sm mt-4 ">
              <div class="tabsVerifyID flex  bg-lightGrey xsl:hidden">

                {#if contains_pan == 1}
                  <div class="tablinkItem  {pan_bg_white}" on:click={() => {temp_switchto = "pan_tab",white_bg("pan")}}>
                        <p class="text-base font-medium">PAN Number</p>
                        {#if contains_pan== 0}
                            <p class="text-xs">NA</p>
                        {:else if pan_verified=="1"}
                                <p class="text-xs text-green">Approved</p>
                        {:else if pan_rejected == "1"}
                                <p class="text-xs text-mandatorysign">Rejected</p>
                                
                        {:else if pan_verified=="0" && pan_rejected == "0"}
                                <p class="text-xs text-orange">Pending</p>
                        {/if}
                  </div> 
                  {:else}
                  <div class="tablinkItem  {pan_bg_white}">
                    <p class="text-base font-medium">PAN Number</p>
                    {#if contains_pan== 0}
                        <p class="text-xs">NA</p>
                    {:else if pan_verified=="1"}
                            <p class="text-xs text-green">Approved</p>
                    {:else if pan_rejected == "1"}
                            <p class="text-xs text-mandatorysign">Rejected</p>
                    {:else if pan_verified=="0" && pan_rejected == "0"}
                            <p class="text-xs text-orange">Pending</p>
                    {/if}
                 </div> 
                  {/if}
                                    <!-- VOTER -->
                    
                    {#if contains_voter == 1}
                    <div class="tablinkItem {voter_bg_white}" on:click={() => {temp_switchto = "voter_tab",white_bg("voter")}}>
                    <p class="text-base font-normal">Voter ID</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_voter == 0}
                        <p class="text-xs">NA</p>
                        {:else if voter_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if voter_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if voter_verified=="0" && voter_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                        
                    {/if}
                  </div> 
                  {:else}
                  <div class="tablinkItem {voter_bg_white}">
                    <p class="text-base font-normal">Voter ID</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_voter == 0}
                        <p class="text-xs">NA</p>
                        {:else if voter_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if voter_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if voter_verified=="0" && voter_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                        
                    {/if}
                  </div> 
                  {/if}
                                <!-- AADHAR -->
                  {#if contains_aadhar == 1}
                  <div class="tablinkItem {aadhar_bg_white}" on:click={() => {temp_switchto = "aadhar_tab",white_bg("aadhar")}}>
                    <p class="text-base font-normal">Aadhar Number</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_aadhar == 0}
                        <p class="text-xs">NA</p>
                        {:else if aadhar_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if aadhar_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if aadhar_verified=="0" && aadhar_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div>  
                  {:else}
                  <div class="tablinkItem {aadhar_bg_white}">
                    <p class="text-base font-normal">Aadhar Number</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_aadhar == 0}
                        <p class="text-xs">NA</p>
                        {:else if aadhar_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if aadhar_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if aadhar_verified=="0" && aadhar_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div>  

                  {/if} 

                                        <!-- DL -->

                  {#if contains_dl == 1}
                  <div class="tablinkItem {dl_bg_white}" on:click={() => {temp_switchto = "DL_tab",white_bg("dl")}}>
                    <p class="text-base font-normal">Driving License</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_dl == 0}
                        <p class="text-xs">NA</p>
                        {:else if dl_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if dl_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if dl_verified=="0" && dl_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div> 
                  {:else} 
                  <div class="tablinkItem {dl_bg_white}">
                    <p class="text-base font-normal">Driving License</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_dl == 0}
                        <p class="text-xs">NA</p>
                        {:else if dl_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if dl_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if dl_verified=="0" && dl_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div>  
                  {/if}
                                 <!-- ADDRESS -->
                  {#if contains_address == 1}
                  <div class="tablinkItem {address_bg_white}" on:click={() => {temp_switchto = "address_tab",white_bg("address")}}>
                    <p class="text-base font-normal">Address Proof</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_address == 0}
                        <p class="text-xs">NA</p>
                        {:else if address_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if address_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if address_verified=="0" && address_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div>
                  {:else}
                  <div class="tablinkItem {address_bg_white}">
                    <p class="text-base font-normal">Address Proof</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_address == 0}
                        <p class="text-xs">NA</p>
                        {:else if address_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if address_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if address_verified=="0" && address_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div>
                  {/if}
                
                                  <!-- OFFER LETTER -->

                  {#if contains_offer == 1}
                  <div class="tablinkItem {offer_bg_white}" on:click={() => {temp_switchto = "offerletter_tab",white_bg("offer")}}>
                    <p class="text-base font-normal">Offer Letter</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_offer == 0}
                        <p class="text-xs">NA</p>
                        {:else if offer_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if offer_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if offer_verified=="0" && offer_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div>
                  {:else}
                  <div class="tablinkItem {offer_bg_white}">
                    <p class="text-base font-normal">Offer Letter</p>
                    <!-- <p class="text-xs text-orange">Pending</p> -->
                    {#if contains_offer == 0}
                        <p class="text-xs">NA</p>
                        {:else if offer_verified=="1"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if offer_rejected == "1"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if offer_verified=="0" && offer_rejected == "0"}
                        <p class="text-xs text-orange">Pending</p>
                    {/if}
                  </div>      
                  {/if}
              </div>
             
            
                <!--  Pan Number  -->
                {#if temp_switchto == "pan_tab"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <!-- Attachment section -->
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment </p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="{pan_url}">
                              <!-- <p >{pan_attach}</p> -->
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                           
                        </div>
                         </div>

                     </div>  
                     <div class="m-4 col-span-3 " >
                            <div class="formField mb-2">
                                <label class="text-greycolor font-light text-sm text-left ">Enter PAN Number </label>
                                <div class="w-full ">
                                    <input type="text" class="inputboxVMT" bind:value={vmt_pan}>
                                </div>
                            </div>

                            <div class="ActionButtonsReject text-right mt-3">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click={()=>doc_reject("pan")}>Reject</button>
                                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click={() => doc_approve("pan")}>Approve</button>
                                
                            </div>    
                    </div>  
                  </div> 
                {/if}
                <!--  Voter ID  -->

                {#if temp_switchto == "voter_tab"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="{voter_url}"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                           
                        </div>
                         </div>
                     </div>  
                    <div class="m-4 col-span-3 xsl:m-1 " >
                        {#if voter_switchto == "tab1"}
                        <div class="formField mb-2 ">
                            <label class="text-greycolor font-light text-sm text-left ">Enter Voter ID Number</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value="{vmt_voter}">
                            </div>
                        </div>
                        
                        <div class="ActionButtonsReject text-right mt-3 ">
                            <button type="button" class="btnreject "  on:click={() => doc_reject("voter")}>Reject</button>
                            <!-- on:click={() => {voter_switchto = "tab2";}} -->
                            <button type="button" class="btnApprove "  on:click={() => doc_approve("voter")}>Approve</button>
                        </div>
                        {/if}
                        <!-- Select issue to reject -->
                        {#if voter_switchto == "tab2"}
                        <div class="">   
                            <div class="formField mb-2">
                                <div class="flex justify-end" on:click={() => {voter_switchto = "tab1";}}>
                                    <img src="{$img_url_name.img_name}/close.png" class="closesup" alt="">
                                    </div>  
                                <label class="text-greycolor font-light text-sm text-left ">Select issue to reject</label>
                                <div class="w-full ">
                                    <div class="text-center  mb-2">
                                                
                                        <div class="flex items-center mt-3">
                                        <input id="radio1" type="radio" name="radio" class="hidden" checked />
                                        <label for="radio1" class="radioLable">
                                        <span class="radioCirle"></span>
                                        Voter ID is not clear</label>
                                        </div>
                                    
                                        <div class="flex items-center  mt-2">
                                        <input id="radio2" type="radio" name="radio" class="hidden" />
                                        <label for="radio2" class="radioLable">
                                        <span class="radioCirle"></span>
                                        Fake Document</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="ActionButtonsReject text-right mt-3">
                                <button type="button" class="btnsubmit " on:click={() => {voter_switchto = "tab3",doc_reject("voter")}}>Submit</button>
                            </div> 

                        </div> 
                        {/if}

                        <!-- Rejected -->
                        {#if voter_switchto == "tab3"}
                        <div class="bg-greylightbg py-3.5 px-6 ">
                            <p class="text-xs text-mandatorysign font-light mb-2">Rejected</p>
                            <div class="voterIdNotClear flex justify-between">
                                <p >Voter ID is not clear</p>
                            <p><a class="smButton text-sm text-erBlue" on:click={() => {voter_switchto = "tab2";}}>Edit</a></p> 
                            </div>
                        </div>
                        {/if}

                    </div>  
                  </div>  

                  <!-- Aadhar Number -->
                <div class="m-4 col-span-3 hidden" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Enter Aadhar Number</label>
                        <div class="w-full ">
                            <input type="text" class="inputboxVMT">
                        </div>
                    </div>

                    <div class="ActionButtonsReject text-right mt-3">
                        <button type="button" class="btnreject ">Reject</button>
                        <button type="button" class="btnApprove ">Approve</button>
                    </div>    
                </div>  
                {/if}

                <!-- Aadhar Number -->
                {#if temp_switchto == "aadhar_tab"}
                     <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                        <div class="m-4 col-span-4">
                            <div class="attachment-text">
                                <p class="text-sm font-light">Attachment</p>
                             </div>   

                             <div class="imageZoom border rounded mt-2">
                                <div id="hubble-container">
                                  <img src="{aadhar_url}" >
                                </div>

                                <div class="flex items-center justify-center gap-4 py-4">
                                    <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}"> 
                                
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                               
                            </div>
                             </div>
                         </div>  
                         <div class="m-4 col-span-3 xsl:m-1" >
                                <div class="formField mb-2">
                                    <label class="text-greycolor font-light text-sm text-left ">Enter Aadhar Number</label>
                                    <div class="w-full ">
                                        <input type="text" class="inputboxVMT" bind:value="{vmt_aadhar}">
                                    </div>
                                </div>
    
                                <div class="ActionButtonsReject text-right mt-3">
                                    <button type="button" class="btnreject " on:click={() => doc_reject("aadhar")}>Reject</button>
                                    <button type="button" class="btnApprove "  on:click={() => doc_approve("aadhar")}>Approve</button>
                                </div>    
                        </div>  
                      </div> 
                {/if}
                      
                <!-- Driving License -->
                {#if temp_switchto == "DL_tab"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="{dl_url}" >
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                           
                        </div>
                         </div>
                     </div>  
                     <div class="m-4 col-span-3 xsl:m-1" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Enter Driving License Number</label>
                        <div class="w-full ">
                            <input type="text" class="inputboxVMT" bind:value="{vmt_dl}">
                        </div>
                    </div>

                    <div class="ActionButtonsReject text-right mt-3">
                        <button type="button" class="btnreject "  on:click={() => doc_reject("dl")}>Reject</button>
                        <button type="button" class="btnApprove "  on:click={() => doc_approve("dl")}>Approve</button>
                    </div>    
                    </div>  
                  </div> 

                {/if}

                 <!-- Address Proof -->
                 {#if temp_switchto == "address_tab"}
                 <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">

                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="{address_url}">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                           
                        </div>
                         </div>
                     </div>  
                     <div class="m-4 col-span-3 xsl:m-1" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Address</label>
                        <div class="w-full mt-2">
                           <!-- <p>H. No 17, Gulmohar Road, savedi, asara Housing Society, Ahmednagar 414003</p> -->
                           <!-- <input type="text" class="inputboxVMT" bind:value="{vmt_address}"> -->
                           <p>{facility_address},{city},{state}</p>
                        </div>
                    </div>

                    <div class="ActionButtonsReject text-right mt-3">
                        <button type="button" class="btnreject "   on:click={() => doc_reject("address")}>Reject</button>
                        <button type="button" class="btnApprove "  on:click={() => doc_approve("address")}>Approve</button>
                    </div>    
                    </div>  
                  </div> 


                {/if}

                  <!-- Offer Letter -->
                {#if temp_switchto == "offerletter_tab"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   

                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="{offer_url}">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                            
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                           
                            </div>
                         </div>
                    </div>  
                    <div class="m-4 col-span-3 xsl:m-1" >
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Name On Offer letter</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value="{off_Name}">
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Associate Type on Offer Letter </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value="{off_assoc_type}">
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Vendor Name on Offer letter </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value="{off_vend_name}">
                            </div>
                        </div>

                        <div class="ActionButtonsReject text-right mt-3">
                            <button type="button" class="btnreject "   on:click={() => doc_reject("offer")}>Reject</button>
                            <button type="button" class="btnApprove "  on:click={() => doc_approve("offer")}>Approve</button>
                        </div>    
                    </div>  
                </div> 
                {/if}
              </div>    

            
            
        </div>
        {/if}

         <!-- Verify Bank Details -->
         
         {#if temp_display == "display_bank_details"}
         {#if bank_details_provided == "no"}
         <p class="mt-20">Bank Details is not available</p>
         {:else}
         <div class="m-4 col-span-4 xsl:col-span-5  ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify Bank Details</h4>
                {#if $bank_details.approved == "1"}
                <p class="detailsUpdate">
                    <span><span class="font-medium">updated by - </span> {$facility_data_store.document_updated_by} <span class="font-medium">On-</span>{verified_date}</span>
                </p>
                {/if}
            </div> 
            <div class="w-full bg-white rounded-sm mt-4 ">
              <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                <!-- Attachment section -->
                <div class="m-4 col-span-4">
                <div class="tabforDoc">
                {#if blk_cheque_url != ""}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Blank cheque</p>
                             <div class="tabforDocItem {blk_cheque_act}">
                                  <img src="{$img_url_name.img_name}/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("blk_cheque")}">
                            </div>  
                        </div>
                {:else if can_cheque_url != ""}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Cancel Cheque</p>
                            <div class="tabforDocItem {can_cheque_act}" >
                                <img src="{$img_url_name.img_name}/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("can_cheque")}">
                            </div>  
                       </div>  
                {:else if passbook_url != ""}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs" >Passbook</p>
                            <div class="tabforDocItem {pass_act}">
                                <img src="{$img_url_name.img_name}/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("passbook")}">
                            </div>    
                        </div>  
                {:else if acc_stmt_url != ""}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Account Statement</p>
                            <div class="tabforDocItem {act_stmt_act}">
                                <img src="{$img_url_name.img_name}/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("account_stmt")}">
                            </div>  
                       </div>
                {:else}<p>No Bank Documents submitted</p>
                {/if}   
                </div>   

                    <!-- <div class="attachment-text">
                        <p class="text-sm font-light">Attachment </p>
                     </div>    -->

                     <!-- <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{$img_url_name.img_name}/pancard.svg"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="{$img_url_name.img_name}/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" >
                       
                    </div>
                     </div> -->
                     {#if show_blk_cheque == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{blk_cheque_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {:else if show_can_cheuque == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{can_cheque_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {:else if show_passbook == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{passbook_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {:else if show_acnt_stmt == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{acc_stmt_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {/if}
                 </div>  


                 <!-- Verify Bank Details -->
                 <div class="m-4 col-span-3 " >
                        <div class="formField mb-2">
                            <!-- <label class="Stext-greycolor font-light text-sm text-left ">Enter Bank Account Number</label> -->
                            <div>
                                <!-- <span><span class="font-medium">Verified by - </span> {$bank_details.validated_by} <span class="font-medium">On-</span>{$bank_details.validated_on}</span> -->
                                {#if $bank_details.approved == "1"}
                                <p class="detailsUpdate">
                                    <span><span class="font-medium">updated by - </span> {$bank_details.updated_by} <span class="font-medium">On-</span>{$bank_details.updated_on}</span>
                                </p>
                                {/if}
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Enter Bank Account Number</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value={acc_num}>
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm  text-left ">Enter IFSC Code </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value="{ifsc_code}">
                            </div>
                            <div class="w-full">
                            <label class="text-greycolor font-light text-xs  text-left ">Note: Only capital letters allowed.  Extra space is not allowed </label>
                            </div>
                        </div>

                        <div class="formField">
                            <label class="text-greycolor font-light text-sm  text-left ">Enter Account Holder Name </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value="{acc_hold_name}">
                            </div>
                            <div class="w-full">
                                <label class="text-greycolor font-light text-xs  text-left ">Note: Extra space is not allowed </label>
                                </div>
                        </div>
                        <div class="formField">
                            <label class="text-greycolor font-light text-sm  text-left ">Enter Remarks</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT" bind:value="{remark}">
                            </div>
                            <!-- <div class="w-full">
                                <label class="text-greycolor font-light text-xs  text-left ">Note: Extra space is not allowed </label>
                                </div> -->
                        </div>


                        <div class="ActionButtonsReject text-right mt-3">
                            <button type="button" class="btnreject mr-2" on:click="{bank_reject}">Reject</button>
                            <button type="button" class="btnApprove " on:click="{bank_approve}">Approve</button>
                            
                        </div>    
                </div>  
                
            

              </div>    
            </div> 
        </div>
        {/if}
        {/if}

          <!-- Verify Background -->
          {#if temp_display == "display_bgv_details"}
          <div class="m-4 col-span-4 xsl:col-span-5 ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify Background</h4>
                {#if $facility_data_store.is_bgv_verified == "1"}
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span>{$facility_data_store.document_updated_by} <span class="font-medium">On-</span>{verified_date}</span>
                </p>
                {/if}
            </div> 
            <div class="mobileVerifyMenus hidden xsl:block">
                <div class="w-full mt-2">
                    <select name="" id="" class="w-full px-3 py-2 text-sm">
                        <option value="" on:click={() => {change_to = "basic_details",white_bg("basic")}}>Basic Details</option>
                        <option value="" on:click={() => {change_to = "address_details",white_bg("address")}}>Address Details</option>
                        <option value="" on:click={() => {change_to = "DL_details",white_bg("dl")}}>Driving License</option>
                        <option value="" on:click={() => {change_to = "policeverification_details",white_bg("police")}}>Police Verification</option>
                        <option value="" on:click={() => {change_to = "pancard_details", white_bg("pan")}}>Pan Card Verification</option>
                    </select>
                </div>
            </div>
            <div class="w-full bg-white rounded-sm mt-4 ">
              <div class="tabsVerifyID flex  bg-lightGrey xsl:hidden">
                  {#if $bgv_config_store.is_basic_info_mandatory =="1"}
                    <div class="tablinkItem  {basic_bg_white}" on:click={() => {change_to = "basic_details",white_bg("basic")}}>
                            <p class="text-base font-medium">Basic Details</p>
                            {#if $bgv_config_store.is_basic_info_mandatory =="0"}
                            <p class="text-xs">NA</p>
                            {:else if $bgv_data_store.basic_information_status=="verified"}
                            <p class="text-xs text-green">Approved</p>
                            {:else if $bgv_data_store.basic_information_status == "rejected"}
                            <p class="text-xs text-mandatorysign">Rejected</p>
                            {:else if $bgv_data_store.basic_information_status == "pending"} 
                            <p class="text-xs text-orange">Pending</p>
                            {:else if $bgv_data_store.basic_information_status == "incomplete"} 
                            <p class="text-xs text-orange">Incomplete</p>
                            {/if}
                            
                            
                        </div> 
                    {:else}
                        <div class="tablinkItem  {basic_bg_white}">
                            <p class="text-base font-medium">Basic Details</p>
                            <p>NA</p>
                        </div> 
                  {/if}
                
                {#if $bgv_config_store.is_address_info_mandatory =="1"}
                  <div class="tablinkItem {address_bg_white}" on:click={() => {change_to = "address_details",white_bg("address")}}>
                    <p class="text-base font-normal">Address Details</p>
                    {#if $bgv_config_store.is_address_info_mandatory =="0"}
                        <p class="text-xs">NA</p>
                        {:else if $bgv_data_store.address_status=="verified"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if $bgv_data_store.address_status == "rejected"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if $bgv_data_store.address_status == "pending"} 
                        <p class="text-xs text-orange">Pending</p>
                        {:else if $bgv_data_store.address_status == "incomplete"} 
                        <p class="text-xs text-orange">Incomplete</p>
                        {/if}

                  </div> 
                    {:else}
                    <div class="tablinkItem {address_bg_white}">
                        <p class="text-base font-normal">Address Details</p>
                        <p>NA</p>
                    </div> 
                    {/if}
                {#if $bgv_config_store.is_driving_license_mandatory =="1"}
                  <div class="tablinkItem {dl_bg_white}" on:click={() => {change_to = "DL_details",white_bg("dl")}}>
                    <p class="text-base font-normal">Driving License</p>
                    {#if $bgv_config_store.is_driving_license_mandatory =="0"}
                        <p class="text-xs">NA</p>
                        {:else if $bgv_data_store.license_status=="verified"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if $bgv_data_store.license_status == "rejected"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if $bgv_data_store.license_status == "pending"} 
                        <p class="text-xs text-orange">Pending</p>
                        {:else if $bgv_data_store.license_status == "incomplete"} 
                        <p class="text-xs text-orange">Incomplete</p>
                        {/if}
                    
                  </div>   
                    {:else}
                    <div class="tablinkItem {dl_bg_white}">
                        <p class="text-base font-normal">Driving License</p>
                        <p>NA</p>
                    </div> 
                    {/if}

                {#if $bgv_config_store.is_police_verification_mandatory =="1"}
                  <div class="tablinkItem {police_bg_white}" on:click={() => {change_to = "policeverification_details",white_bg("police")}}>
                    <p class="text-base font-normal">Police Verification</p>
                    {#if $bgv_config_store.is_police_verification_mandatory =="0"}
                        <p class="text-xs">NA</p>
                        {:else if $bgv_data_store.police_verification_status=="verified"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if $bgv_data_store.police_verification_status == "rejected"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if $bgv_data_store.police_verification_status == "pending"} 
                        <p class="text-xs text-orange">Pending</p>
                        {:else if $bgv_data_store.police_verification_status == "incomplete"} 
                        <p class="text-xs text-orange">Incomplete</p>
                        {/if}
                    
                  </div>
                    {:else}
                    <div class="tablinkItem {police_bg_white}">
                        <p class="text-base font-normal">Police Verification</p>
                        <p>NA</p>
                    </div> 
                    {/if}

                {#if $bgv_config_store.is_pan_info_mandatory =="1"}
                  <div class="tablinkItem {pan_bg_white}" on:click={() => {change_to = "pancard_details", white_bg("pan")}}>
                    <p class="text-base font-normal">Pan Card Verification</p>
                    {#if $bgv_config_store.is_pan_info_mandatory =="0"}
                        <p class="text-xs">NA</p>
                        {:else if $bgv_data_store.pan_status=="verified"}
                        <p class="text-xs text-green">Approved</p>
                        {:else if $bgv_data_store.pan_status == "rejected"}
                        <p class="text-xs text-mandatorysign">Rejected</p>
                        {:else if $bgv_data_store.pan_status == "pending"} 
                        <p class="text-xs text-orange">Pending</p>
                        {:else if $bgv_data_store.pan_status == "incomplete"} 
                        <p class="text-xs text-orange">Incomplete</p>
                        {/if}
                    
                  </div>   
                    {:else}
                    <div class="tablinkItem {pan_bg_white}">
                        <p class="text-base font-normal">Pan Card Verification</p>
                        <p>NA</p>
                    </div> 
                    {/if}
                 
              </div>


            
              <!-- Verify Background  Basic Details-->
              {#if change_to == "basic_details"}
              <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                <!-- Attachment section -->
                <div class="m-4 col-span-4 xsl:m-2 ">
                    <div class="tabforDoc">
                        {#if !aadhar_url}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Aadhar Card</p>
                             <div class="tabforDocItem">
                                  <img src="{$img_url_name.img_name}/aadharicon.png" alt="" class="w-16 xsl:w-14 p-1" >
                            </div>  
                        </div>
                        <p>Aadhar document not Submitted</p>
                        {:else}
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Aadhar Card</p>
                                 <div class="tabforDocItem {aadhar_act}">
                                      <img src="{$img_url_name.img_name}/aadharicon.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("aadhar")}">
                                </div>  
                            </div>
                        {/if}
                        {#if !voter_url}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Voter ID</p>
                            <div class="tabforDocItem">
                                <img src="{$img_url_name.img_name}/voterid.png" alt="" class="w-16 xsl:w-14 p-1">
                            </div>  
                       </div>  
                        <p>Voter ID not Submitted</p>
                        {:else}
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Voter ID</p>
                                <div class="tabforDocItem {voter_act}">
                                    <img src="{$img_url_name.img_name}/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("voter")}">
                                </div>  
                           </div>  
                        {/if}
                        {#if !pass_photo_url}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Passport Photo</p>
                            <div class="tabforDocItem">
                                <img src="{$img_url_name.img_name}/passportpic.png" alt="" class="w-16 xsl:w-14 p-1">
                            </div>    
                        </div> 
                        <p>Pass Photo document not Submitted</p>
                        {:else}
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Passport Photo</p>
                                <div class="tabforDocItem {pass_photo_act}">
                                    <img src="{$img_url_name.img_name}/passportpic.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("pass_photo")}">
                                </div>
                                <p>Pass Photo document not Submitted</p>    
                            </div>    
                        {/if}
                    </div>    
                    {#if show_aadhar == 1}
                    <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{aadhar_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {:else if show_voter == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{voter_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {:else if show_pass_photo ==1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{pass_photo_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {/if}
                 </div>  
                 <!-- Basic Details -->
                 <div class="m-4 col-span-3 xsl:m-1" >

                        <div class="grid grid-cols-1 gap-2">
                            
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    
                                </div>
                                <!-- <div>
                                    <span><span class="font-medium">Verified by - </span> {$bgv_data_store.basic_info_updated_by} <span class="font-medium">On-</span>{$bgv_data_store.basic_info_updated_on}</span>
                                </div> -->
                                {#if $facility_data_store.is_bgv_verified == "1"}
                                <p class="detailsUpdate">
                                    <span><span class="font-medium">Verified by - </span> {$bgv_data_store.basic_info_updated_by}<span class="font-medium">On-</span>{$bgv_data_store.basic_info_updated_on}</span>
                                </p>
                                {/if}
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Aadhar number</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.adhar_card_number} </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">First name </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.first_name}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Last name </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.last_name}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Phone number</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.phone_number}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Fathers name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.father_name}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Date of birth</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.basic_info_dob}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Spouse name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.spouse_name}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Gender</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.gender}</p>
                                </div>
                            </div>
                            {#if show_fields==1}
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Delivery model</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.delivery_model}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Station model</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.station_model}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Hub name for casper ID</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.hub_name}</p>
                                </div>
                            </div>
                            {:else}
                            <p>

                            </p>
                            {/if}
                            <!-- <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                <select class="selectInputbox" bind:value="{basic_info_res}">
                                    <option value="" selected disabled>Select</option>
                                    {#each rejReasonMap.basicInfo as basic_info_rej}
                                        <option
                                        class="pt-6" >
                                            {basic_info_rej}
                                            </option>
                                        {/each}
                                        
                                    </select>
                                </div>
                            </div> -->

                          </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click="{openRejectModel}" >Reject</button>
                            <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click="{()=>bgv_click("basic_approve")}">Approve</button>
                            
                        </div>    
                </div>  
              </div> 
              {/if}   


              <!-- Verify Background  Address Details-->
              {#if change_to == "address_details"}
              <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                <div class="m-4 col-span-4">

                 
                    <div class="attachment-text">
                        <p class="text-sm font-light">Attachment</p>
                     </div>   
                     {#if !address_url}<p>No address document submitted</p>
                     {:else}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{address_url}">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                       
                    </div>
                     </div>
                     {/if}
                 </div>  

                 <!-- Address Details -->
                 <div class="m-4 col-span-3 xsl:m-1" >
                       

                        <div class="grid grid-cols-1 gap-2">
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    
                                </div>
                                {#if $facility_data_store.is_bgv_verified == "1"}
                                <p class="detailsUpdate">
                                    <span><span class="font-medium">Verified by - </span> {$bgv_data_store.basic_info_updated_by}<span class="font-medium">On-</span>{$bgv_data_store.basic_info_updated_on}</span>
                                </p>
                                {/if}
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Address Type</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.address_type} </p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Current Address same as this address? </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.current_address_is_same}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Full Address </p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.full_address}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">City / Taluka / Town</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.city}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">District</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.district}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">State</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.state}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Pincode</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.pin_code}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">landmark</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.landmark}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Residential Type</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.residence_type}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Period of Stay ( Years )</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.period_of_stay}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Stay From</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.stay_from}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Stay Till</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.stay_till}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Area</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.area}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Family Contact Number</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.contact_number}</p>
                                </div>
                            </div>
                            <!-- <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                <select class="selectInputbox"  bind:value="{address_info_res}">
                                    <option value="" selected disabled>Select</option>
                                    {#each rejReasonMap.addressInfo as address_info_rej}
                                        <option
                                            class="pt-6">
                                            {address_info_rej}
                                            </option>
                                        {/each}
                                        
                                    </select>
                                </div>
                            </div> -->
                            <!-- <select
                                        name=""
                                        id=""
                                        class="inputbox"
                                        bind:value={basic_info_rej}
                                    >
                                        <option value="" selected disabled
                                            >Select</option
                                        >
                                        <option value="Yes">yes</option>
                                        <option value="No">No</option>
                                    </select> -->
                                                                    <!-- <option class="pt-6" >All</option> -->



                          </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium"  on:click="{openAddressRejectModel}">Reject</button>
                            <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click="{()=>bgv_click("address_approve")}">Approve</button>
                            
                        </div>    
                </div>  
                
            

              </div>  
              {/if}
              
                <!-- Verify Background  Driving License-->
                {#if change_to == "DL_details"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    
                    <div class="m-4 col-span-4">
                        
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                         </div>   
                         {#if !dl_url}<p>No Driving Licence document submitted</p>
                         {:else}
                         <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                              <img src="{dl_url}" >
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                           
                        </div>
                         </div>
                         {/if}
                     </div>  

                     <!-- Driving licence -->
                     <div class="m-4 col-span-3 xsl:m-1" >
                           

                            <div class="grid grid-cols-1 gap-2">
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        
                                    </div>
                                    {#if $facility_data_store.is_bgv_verified == "1"}
                                    <p class="detailsUpdate">
                                        <span><span class="font-medium">Verified by - </span> {$bgv_data_store.basic_info_updated_by}<span class="font-medium">On-</span>{$bgv_data_store.basic_info_updated_on}</span>
                                    </p>
                                    {/if}
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">License Number</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">{$bgv_data_store.license_number}</p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Name as on Driving License</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">{$bgv_data_store.name_license}</p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">DOB as on Driving License</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">{$bgv_data_store.dl_dob}</p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Date of Issue</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">{$bgv_data_store.dl_issue_date}</p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Date of Expiry</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">{$bgv_data_store.dl_expiry_date}</p>
                                    </div>
                                </div>
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        <p class="namelable ">Issuing State</p>
                                    </div>
                                    <div>
                                        <p class="namevalue  ">{$bgv_data_store.dl_state}</p>
                                    </div>
                                </div>
                                <!-- <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                    <select class="selectInputbox" bind:value="{dl_info_res}">
                                        <option value="" selected disabled>Select</option>
                                        {#each rejReasonMap.dlInfo as dl_info_rej}
                                            <option
                                                class="pt-6">
                                                {dl_info_rej}
                                                </option>
                                            {/each}
                                            
                                        </select>
                                    </div>
                                </div> -->
                              </div>


                            <div class="ActionButtonsReject text-right mt-5">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click="{openDLRejectModel}">Reject</button>
                                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click="{()=>bgv_click("dl_approve")}">Approve</button>
                                
                            </div>    
                    </div>  
                    
                

                </div>  
                {/if}

                <!-- Verify Background  Police Verification-->
                {#if change_to == "policeverification_details"}
                <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment</p>
                        </div>   
                        {#if !police_url}<p>No Police Verification document submitted</p>
                         {:else}
                        <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                                <img src="{police_url}"  id="hubblepic">
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                            
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                            
                            </div>
                        </div>
                        {/if}
                    </div>  
                    
                    <div class="m-4 col-span-3 xsl:m-1" >
                        

                        <div class="grid grid-cols-1 gap-2">
                                <div class=" grid-cols-2 grid items-center">
                                    <div class="">
                                        
                                    </div>
                                    {#if $facility_data_store.is_bgv_verified == "1"}
                                    <p class="detailsUpdate">
                                        <span><span class="font-medium">Verified by - </span> {$bgv_data_store.basic_info_updated_by}<span class="font-medium">On-</span>{$bgv_data_store.basic_info_updated_on}</span>
                                    </p>
                                    {/if}
                                </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Address Type</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.police_address_type}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Candidate's Name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.candidate_name}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Guardian's Name</p>
                                </div>
                                <div>
                                    <p class="namevalue  ">{$bgv_data_store.guardian_name}</p>
                                </div>
                            </div>
                            <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                    <p class="namelable ">Address Verified</p>
                                </div>
                                <div>
                                    {#if !$bgv_data_store.police_verified_address}
                                    <p>-</p>
                                    {:else}
                                    <p class="namevalue  ">{$bgv_data_store.police_verified_address}</p>
                                    {/if}
                                </div>
                            </div>
                            <!-- <div class=" grid-cols-2 grid items-center">
                                <div class="">
                                <select class="selectInputbox"  bind:value="{pol_info_res}">
                                    <option value="" selected disabled>Select</option>
                                    {#each rejReasonMap.policeInfo as pol_info_rej}
                                        <option
                                            class="pt-6">
                                            {pol_info_rej}
                                            </option>
                                        {/each}
                                        
                                    </select>
                                </div>
                            </div> -->
                        
                        </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click="{openPVRejectModel}">Reject</button>
                            <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click={()=>bgv_click("pol_approve")}>Approve</button>
                            
                        </div>    
                    </div>  
                    
                
            

                </div> 
                {/if}
                
                
            <!-- Verify Pancard Verification-->
            {#if change_to == "pancard_details"}
                    <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                        <div class="m-4 col-span-4">
                            <div class="attachment-text">
                                <p class="text-sm font-light">Attachment</p>
                            </div>   
                            {#if !dl_url}<p>No PanCard document submitted</p>
                            {:else}
                            <div class="imageZoom border rounded mt-2">
                                <div id="hubble-container">
                                    <img src="{pan_url}"  id="hubblepic">
                                </div>
    
                                <div class="flex items-center justify-center gap-4 py-4">
                                    <!-- <img src="{$img_url_name.img_name}/puls.svg" on:click="{zoomin}">
                                
                                    <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                    <img src="{$img_url_name.img_name}/minus.svg" on:click="{zoomout}"> -->
                                
                                </div>
                            </div>
                            {/if}
                        </div>  
                
                <div class="m-4 col-span-3 xsl:m-1" >
                    

                    <div class="grid grid-cols-1 gap-2">
                        <div class=" grid-cols-2 grid items-center">
                            <div class="">
                                
                            </div>
                            {#if $facility_data_store.is_bgv_verified == "1"}
                            <p class="detailsUpdate">
                                <span><span class="font-medium">Verified by - </span> {$bgv_data_store.basic_info_updated_by}<span class="font-medium">On-</span>{$bgv_data_store.basic_info_updated_on}</span>
                            </p>
                            {/if}
                        </div>
                        <div class=" grid-cols-2 grid items-center">
                            <div class="">
                                <p class="namelable ">Pan Card Number</p>
                            </div>
                            <div>
                                <p class="namevalue  ">{$bgv_data_store.pancard_number}</p>
                            </div>
                        </div>
                        <div class=" grid-cols-2 grid items-center">
                            <div class="">
                                <p class="namelable ">Full Name as on Pan Card</p>
                            </div>
                            <div>
                                <p class="namevalue  ">{$bgv_data_store.pan_full_name}</p>
                            </div>
                        </div>
                        <div class=" grid-cols-2 grid items-center">
                            <div class="">
                                <p class="namelable ">DOB as on Pan Card</p>
                            </div>
                            <div>
                                <p class="namevalue  ">{$bgv_data_store.pan_dob}</p>
                            </div>
                        </div>
                        <div class=" grid-cols-2 grid items-center">
                            <div class="">
                                <p class="namelable ">Father's Name as on Pan Card</p>
                            </div>
                            <div>
                                <p class="namevalue  ">{$bgv_data_store.pan_father_name}</p>
                            </div>
                        </div>
                        <!-- <div class=" grid-cols-2 grid items-center">
                            <div class="">
                            <select class="selectInputbox"   bind:value="{pan_info_res}">
                                <option value="" selected disabled>Select</option>
                                {#each rejReasonMap.panInfo as pan_info_rej}
                                    <option
                                        class="pt-6">
                                        {pan_info_rej}
                                        </option>
                                    {/each}
                                    
                                </select>
                            </div>
                        </div> -->
                    
                    </div>


                    <div class="ActionButtonsReject text-right mt-5">
                        <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click="{openPanRejectModel}">Reject</button>
                        <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click={()=>bgv_click("pan_approve")}>Approve</button>
                        
                    </div>    
                </div>  
                
            
        

            </div> 
            {/if} 


            </div> 
            
        </div>
        {/if}
        </div>
</div>  

</div>

<!--BG Basic Detail Reject modal -->
<div id="Basic_Reject_modal" class="hidden">
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Reject Reason</p>
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{closeRejectModel}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Select Reason
                        </label>
                        <div class="relative">
                          <!-- <select class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value="{pan_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.panInfo as pan_info_rej}
                            <option>{pan_info_rej} </option>
                            {/each}
                          </select> -->
                        <select class="selectInputbox" bind:value="{basic_info_res}">
                            <option value="-1" selected disabled>Select</option>
                            {#each rejReasonMap.basicInfo as basic_info_rej}
                                <option
                                class="pt-6" >
                                    {basic_info_rej}
                                    </option>
                                {/each}
                                
                        </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                   
                      <div class="pt-3 flex justify-center">
                        <button type="button" class="dialogueNobutton   "  on:click="{()=>bgv_click("basic_reject")}" on:click="{closeRejectModel}">Submit</button>
                </form>
            </div>
        </div>
    </div> 
</div> 

<!--BG Address Detail Reject modal -->
<div id="Address_Reject_modal"  class="hidden" >
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Reject Resson</p>
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{closeAddressRejectModel}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Select Reson
                        </label>
                        <div class="relative">
                            <select class="selectInputbox" bind:value="{address_info_res}">
                                <option value="" selected disabled>Select</option>
                                {#each rejReasonMap.addressInfo as address_info_rej}
                                    <option
                                    class="pt-6" >
                                        {address_info_rej}
                                        </option>
                                    {/each}
                                    
                            </select>
                          <!-- <select class="selectInputbox"  bind:value="{address_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.addressInfo as address_info_rej}
                                <option
                                    class="pt-6">
                                    {address_info_rej}
                                    </option>
                                {/each}
                                
                            </select> -->
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                   
                      <div class="pt-3 flex justify-center">
                        <button type="button" class="dialogueNobutton   "  on:click = {()=>bgv_click("address_reject")} on:click="{closeAddressRejectModel}">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--BG DL Detail Reject modal -->
<div id="DL_Reject_modal" class="hidden">
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Reject Reason</p>
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{closeDLRejectModel}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Select Reason
                        </label>
                        <div class="relative">
                            <select class="selectInputbox" bind:value="{dl_info_res}">
                                <option value="" selected disabled>Select</option>
                                {#each rejReasonMap.dlInfo as dl_info_rej}
                                    <option
                                    class="pt-6" >
                                        {dl_info_rej}
                                        </option>
                                    {/each}
                                    
                            </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                   
                      <div class="pt-3 flex justify-center">
                        <button type="button" class="dialogueNobutton   "  on:click="{()=>bgv_click("dl_reject")}" on:click="{closeDLRejectModel}">Submit</button>
                </form>
            </div>
        </div>
    </div> 
</div> 

<!--BG Police Verification Detail Reject modal -->
<div id="PV_Reject_modal" class="hidden" >
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Reject Resson</p>
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{closePVRejectModel}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Select Reson
                        </label>
                        <div class="relative">
                            <select class="selectInputbox" bind:value="{pol_info_res}">
                                <option value="" selected disabled>Select</option>
                                {#each rejReasonMap.policeInfo as pol_info_rej}
                                    <option
                                    class="pt-6" >
                                        {pol_info_rej}
                                        </option>
                                    {/each}
                                    
                            </select>
                          <!-- <select class="selectInputbox"  bind:value="{pol_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.policeInfo as pol_info_rej}
                                <option
                                    class="pt-6">
                                    {pol_info_rej}
                                    </option>
                                {/each}
                                
                            </select> -->
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                   
                      <div class="pt-3 flex justify-center">
                        <button type="button" class="dialogueNobutton   "  on:click="{()=>bgv_click("pol_reject")}" on:click="{closePVRejectModel}">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--BG Pan Detail Reject modal -->
<div id="Pan_Reject_modal" class="hidden">
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Reject Reason</p>
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{closePanRejectModel}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Select Reason
                        </label>
                        <div class="relative">
                          <!-- <select class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value="{pan_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.panInfo as pan_info_rej}
                            <option>{pan_info_rej} </option>
                            {/each}
                          </select> -->
                          <select class="selectInputbox" bind:value="{pan_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.panInfo as pan_info_rej}
                                <option
                                class="pt-6" >
                                    {pan_info_rej}
                                    </option>
                                {/each}
                                
                        </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                   
                      <div class="pt-3 flex justify-center">
                        <button type="button" class="dialogueNobutton   "  on:click="{()=>bgv_click("pan_reject")}" on:click="{closePanRejectModel}">Submit</button>
                </form>
            </div>
        </div>
    </div> 
</div> 


<!--BG Final Reject modal -->
<div id="Final_bg_Reject_modal" class="hidden">
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Reject Remark</p>
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{closeFinalRejectModel}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                          Please enter the remark
                        </label>
                        <div class="w-full ">
                            <input type="text" class="inputboxVMT" bind:value={bgv_remarks}>
                        </div>
                        <!-- <div class="relative">
                            <input type="text" bind:value="{bgv_remarks}"> -->
                          <!-- <select class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value="{pan_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.panInfo as pan_info_rej}
                            <option>{pan_info_rej} </option>
                            {/each}
                          </select> -->
                          <!-- <select class="selectInputbox" bind:value="{pan_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.panInfo as pan_info_rej}
                                <option
                                class="pt-6" >
                                    {pan_info_rej}
                                    </option>
                                {/each}
                                
                        </select> -->
                          <!-- <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div> -->
                        <!-- </div> -->
                      </div>
                   
                      <div class="pt-3 flex justify-center">
                        <button type="button" class="dialogueNobutton   " on:click="{final_bgv_reject_func}">Submit</button>
                </form>
            </div>
        </div>
    </div> 
</div> 


<!-- Document view Model -->
<!-- <div id="showIDCard" tabindex="-1" aria-hidden="true" role ="dialog" class=" actionDialogueOnboard" >
    <div class="pancardDialogueOnboardWrapper ">
        <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
            <div class="flex justify-end p-2">
                <button type="button" on:click="{closeIDcard}" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <div style="display: flex;justify-content: space-between;">
                <div style="margin-left:5px">
                    <p>
                        valid till 02 - Jan - 2022
                    </p>
                    <img src="{$img_url_name.img_name}/profilepic.png" alt="">
                    <h1>
                        Blood Group
                    </h1>
                    <input type="text">
                </div>
                <div>
                <div>
                    <h1>Name : Gagan Gowda HR</h1>
                </div>
                <div>
                    <h1>
                        ID : 123456789
                    </h1>
                </div>
                <div>
                    <h1>contact number : 1234567890</h1>
                </div>
                <div>
                    <h1>Vendor : ElasticRun</h1>
                </div>
            </div>
            <div style="margin-right:15px;">
                <img src="{$img_url_name.img_name}/profilepic.png" alt="">
            </div>
            </div>
        </div>
    </div>
</div>  -->
<!-- Document view Model -->


    <!-- ID Card View modal HTML-->
    
    <div  class="actionDialogueOnboard " id="showIDCard" hidden>
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Id Card</p>
                    </div>
                    <div class="rightmodalclose" on:click="{closeIDcard}">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 mt-5" action="#">

                    <div  id="nonPrintable">
                    <div class="idCardWrapper my-4">
                        <div class="ErAndEmp flex">
                            <div class="leftborder"></div>
                            <div class="rightLogoSection flex-auto">
                            <div class="erlogo">
                               <p>Valid till {minDate}</p>
                            </div>
                            <div class="profilePhoto">
                                <img src="{{profile_url}}" class="profilePic">
                                <!-- {$img_url_name.img_name}/profilepic.png -->
                            </div>
                            <div class="bloodgroup">
                                Blood Group
                            </div>   
                            <input class=" w-12 mx-auto ml-9 rounded-md text-center font-mono text-base" type="text">
                                <!-- border -->
                            <!-- </div>  -->
                            </div>

                        </div>
                        <div class="empInfoSection">
                            <div>
                                <p class="tempText">TEMP</p>
                            </div>
                            <!-- {#each id_res_data as id_res_data} -->
                            <div class="UserName">
                                <div class="infoGroupName">
                                    <label>{id_card_data.id_label_1}</label>
                                    <p>{$facility_data_store.owner_name} </p>
                                </div>
                            </div>
                            <div class="otherInfo flex mt-2">
                                
                                <div class="">
                                    <!-- {#each id_card_data as id} -->
                                    <div class="infoGroupName">
                                        <label>{id_card_data.id_label_2}</label>
                                        <p>{$facility_data_store.name}</p>
                                    </div>
                                    <div class="infoGroupName">
                                        <label> {id_card_data.id_label_3}</label>
                                        <p>{$facility_data_store.phone_number}</p>
                                    </div>
                                    <div class="infoGroupName">
                                        <label>{id_card_data.id_label_4}</label>
                                        <p>{$facility_data_store.vendor_name}</p>
                                    </div>
                                    <!-- {/each} -->
                                </div>  
                                <div class="flex-auto">
                                    <div class="text-right">
                                    <div class="barcode flex justify-end mb-2 ml-3">
                                    <!-- <img src="{$img_url_name.img_name}/qrcode.png"> -->
                                    <QRCode codeValue={$facility_data_store.facility_id} squareSize=200/>
                                    </div>
                                    <div class="partner mr-1">
                                            <p>{id_card_data.info_id_card}</p>
                                    </div>
                                    </div>

                                </div>    
                                
                            </div>
                            
                           
                        </div>

                    </div>    
                    </div>
                    
                  
                   
                      <div class="pt-3 flex justify-center" on:click="{closeIDcard}">
                        <button type="button" class="dialogueSingleButton">Close</button>
                        <button type="button" class="dialogueSingleButton ml-1 " on:click="{printID}">Print
                            <!-- <a href="" class="smButton">
                                <img src="{$img_url_name.img_name}/printer.svg" alt=""/> 
                            </a> -->
                        </button>
                        <!-- <button on:click="{view_print_doc(contract.assigned_id,"print")}" class="flex justify-center">
                        <a href="" class="smButton">
                            <img src="{$img_url_name.img_name}/printer.svg" alt=""/>
                        </a>
                    </button> -->
                    </div>
                </form>
            </div>
        </div>
    </div>

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
                                                            <option class="pt-6" >Select</option>
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
                                                        <input type="text" class="inputboxpopover" bind:value="{emp_number}">
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
                            <img src="../src/img/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
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
                                                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
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
                                                            <img src="../src/img/selectarrow.png" class="w-5 h-auto" alt="">
                                                        </div>
                                                    </div>
                                                </div>
    
                                            </div>
                                            <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">
                                                <div class="w-full">
                                                    <div class="light14grey mb-1">From Date</div>
                                                    <div class="formInnerwidthfull ">
                                                        <input type="date" class="inputboxpopoverdate" bind:value="{fromDate}">
                                                    </div>
    
                                                </div>
                                                <div class="w-full">
                                                    <div class="light14grey mb-1">To Date</div>
                                                    <div class="formInnerwidthfull ">
                                                        <input type="date" class="inputboxpopoverdate">
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
                                            
                                            <tbody class="tbodypopover">
                                                {#each get_change_associte_data as associate}
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
                                                {/each}
                                            </tbody>
                                            
                                        </table>
                                    </div>
                                </div>
        
                            </div>
    
    
    
    
                        </div>
    
                    </div>
                </div>
            </div>
        </div>


            <!-- Cas View modal HTML-->
    
    <div  class="actionDialogueOnboard " id="showCasUser" hidden>
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <p class=""> Cas User Status</p>
                    </div>
                    <div class="rightmodalclose" on:click="{closeCasUser}">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 mt-5" action="#">

                    {#if cas_flag == 1}
                    <div class="justify-center">
                        <p>
                            User is not Active
                        </p>
                    </div>
                    <div class="pt-3 flex justify-center" on:click="{activate_cas}">
                        <button type="button" class="dialogueSingleButton">Activate User</button>
                    </div>
                    {:else if cas_flag == 2}
                    <div class="justify-center">
                        <p>
                            User is not in the cas
                        </p>
                    </div>
                    <div class="pt-3 flex justify-center" on:click="{create_cas}">
                        <button type="button" class="dialogueSingleButton">Create User</button>
                    </div>
                    {/if}
                   
                      <!-- <div class="pt-3 flex justify-center" on:click="{closeCasUser}">
                        <button type="button" class="dialogueSingleButton">Activate User</button>
                    </div> -->
                </form>
            </div>
        </div>
    </div>

<Toast type={toast_type}  text={toast_text}/> 


<style type="text/css" media="print">
    .noPrint{
        display: none;
        background: none;
    }
</style>