<script>
    import { onMount } from "svelte";
    import {facility_data_store} from "../stores/facility_store";
    import { bank_details } from "../stores/bank_details_store";
    import {get_facility_details,facility_bgv_check,get_bank_facility_details,facility_document,
         approve_reject_status,bank_approve_reject,bgv_approve_rej,final_id_ver_rej,final_bgv_app_rej} from "../services/vmt_verify_services";
    import {facility_bgv_init} from "../services/onboardsummary_services";
    import {bgv_config_store} from '../stores/bgv_config_store';
    import { goto } from "$app/navigation";
    import {get_date_format} from '../services/date_format_servives';
    // import {facility_id} from "../stores/facility_id_store"
    import {bgv_data_store} from "../stores/bgv_store";
    import Toast from './components/toast.svelte';


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
    let temp = "";
    let final_id_ver_btn = 1;
    let final_bank_ver_btn = 0;
    let final_bgv_ver_btn = 0;
    let pan_bg_white = "";
    let voter_bg_white="";
    let aadhar_bg_white="";
    let dl_bg_white="";
    let offer_bg_white="";
    let address_bg_white="";
    let basic_bg_white="";
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
        final_approve;
    let final_pan_reject,
        final_voter_reject,
        final_aadhar_reject,
        final_address_reject,
        final_dl_reject,
        final_offer_reject,
        final_reject;
    
    let is_reject_hidden = "hidden";
    let is_verify_hidden = "hidden";
    let temp_display = "display_id_proof";
    let routePrev = "";
    let temp_switchto = "pan_tab";
    let change_to = "basic_details";
    let voter_switchto = "tab1";
    let new_facility_id;
    let facility_id;
    let acc_num,ifsc_code,acc_hold_name,remark;
    let gend_selected,add_is_perm,curr_same,police_add_per;
    var rejReasonMap = {
    "basicInfo": ["Supporting document Missing", "Name/Father's Name/DOB is not clear on the document", "Name/Father's Name/DOB mismatch", "Name/Father's Name/DOB missing", "Passport Size Photo missing/not clear/incorrect", "Aadhaar/Voter Number/Associate name/Father Name/DOB is not clear on the document", "Aadhaar/Voter Number/Associate name/Father Name/DOB mismatch", "Aadhaar/Voter Number/Associate name/Father Name/DOB not captured. Kindly update in the system", "Email Address not verified"],
    "addressInfo": ["Address mismatch", "Kindly update full address", "Kindly upload associates address proof", "Kindly upload owners acknowledgment & supporting address proof", "Address/City/District/State/Pincode mismatch"],
    "dlInfo": ["Supporting document Missing", "Driving License expired", "Name/License number/Date of issue/expiry/DOB is not clear on document", "Name/Number/Date of issue/expiry/DOB mismatch", "Name/Number/Date of issue/expiry/DOB missing.", "Associate name/License number/Date of issue/expiry/DOB/Issuing State is not clear on document", "  Associate name/License number/Date of issue/expiry/DOB/Issuing State mismatch", "Associate name/License number/Date of issue/expiry/DOB/Issuing State not captured. Kindly update in system"],
    "panInfo": ["Supporting document Missing", "Name/Father's name/Pan Number/DOB mismatch", "Name/Father's name/Pan Number/DOB missing.", "Name/Father's name/Pan Number/DOB is not clear on the document"],
    "policeInfo": ["Supporting document Missing", "Incorrect Address", "Name/Guardian's name/Address mismatch", "Name/Guardian's name/Address missing", "Name/Guardian's name/Address is not clear on the document"]

}

    onMount(async () => {
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
        facility_id = "MHPD01226"

        console.log("new_facility_id",facility_id)
            let facility_data_res = await get_facility_details()
            console.log("facility_data_res",facility_data_res)
            try{
                if(facility_data_res.body.status=="green"){
                    if(facility_data_res!="null"){
                        facility_data_store.set(
                            facility_data_res.body.data[0]
                        )
                    }
                }
            }
            catch (err) {
                console.log("error in facility data")
            }
            console.log("facility_data_store on line 107",$facility_data_store)
            let new_date = new Date($facility_data_store.document_updated_on)
            verified_date = get_date_format(new_date,"dd-mm-yyyy-hh-mm")   
            
            let bgv_pass_data=[
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

                            facility_docs_arr[i] = facility_document_data[i].doc_type;
                            
                            if(facility_docs_arr.includes("pan-photo")){
                                // console.log("pan___",facility_document_data[i].file_url)
                                pan_url = facility_document_data[i].file_url;
                                pan_verified = facility_document_data[i].verified;
                                pan_rejected = facility_document_data[i].rejected;
                                // console.log("successfully fetched Pan")
                                contains_pan = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "pan-photo")
                                //     temp_switchto = "pan_tab";
                                // }

                            }
                            
                            if(facility_docs_arr.includes("voter-id-proof")){
                                // console.log("address___",facility_document_data[i].file_url)
                                voter_url = facility_document_data[i].file_url;
                                voter_verified = facility_document_data[i].verified;
                                voter_rejected = facility_document_data[i].rejected;
                                contains_voter = 1;
                                // console.log("successfully fetched Offer letter")
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "voter-id-proof")
                                //     temp_switchto = "voter_tab";
                                // } 
                            }
                            if(facility_docs_arr.includes("aadhar-id-proof")){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                aadhar_url = facility_document_data[i].file_url;
                                aadhar_verified = facility_document_data[i].verified;
                                aadhar_rejected = facility_document_data[i].rejected;
                                contains_aadhar = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_docs_arr.includes("addproof-photo")){
                                // console.log("address___",facility_document_data[i].file_url)
                                address_url = facility_document_data[i].file_url;
                                address_verified = facility_document_data[i].verified;
                                address_rejected = facility_document_data[i].rejected;
                                contains_address = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_docs_arr.includes("newOffFile")){
                                // console.log("address___",facility_document_data[i].file_url)
                                offer_url = facility_document_data[i].file_url;
                                offer_verified = facility_document_data[i].verified;
                                offer_rejected = facility_document_data[i].rejected;
                                contains_offer = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "newOffFile")
                                //     temp_switchto = "offerletter_tab";
                                // } 
                                
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_docs_arr.includes("dl-photo")){
                                // console.log("address___",facility_document_data[i].file_url)
                                dl_url = facility_document_data[i].file_url;
                                dl_verified = facility_document_data[i].verified;
                                dl_rejected = facility_document_data[i].rejected;
                                contains_dl = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "dl-photo")
                                //     temp_switchto = "DL_tab";
                                // } 
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_docs_arr.includes("pass_photo")){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                pass_photo_url = facility_document_data[i].file_url;
                                pass_photo_verified = facility_document_data[i].verified;
                                pass_photo_rejected = facility_document_data[i].rejected;
                                // contains_pass_photo = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_docs_arr.includes("police_info_supp_file")){
                                // console.log("address___",facility_document_data[i].file_url)
                                police_url = facility_document_data[i].file_url;
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
                                can_cheque_url = facility_document_data[i].file_url;
                                
                            }
                            if(facility_docs_arr.includes("blcheque")){
                                blk_cheque_url = facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("passbook")){
                                passbook_url = facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("acc-stat")){
                                acc_stmt_url = facility_document_data[i].file_url;
                                
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
            
        }
    }
    catch(err) {
        console.log("Error",err)
        // message.innerHTML = "Error is " + err;
    }


    console.log("$bgv_data_store",$bgv_data_store)
    })


    async function doc_approve(doc_cat){
        if (doc_cat == "pan"){
        
            console.log("payload", $facility_data_store)
            
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_pan,
                "status_type":"DV",
                "status":"true",
                "doc_type":"pan-photo"
            }
            let pan_sub_res = await approve_reject_status(document_load)
            try{
                if(pan_sub_res.body.status == "green"){
                    pan_success_flag = 1
                    console.log("pan_success_flag",pan_success_flag)
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
            
        }
        if (doc_cat == "voter"){
        
        console.log("payload", $facility_data_store)
        
        let document_load = {
            "resource_id":facility_id,
            "doc_number":vmt_voter,
            "status_type":"DV",
            "status":"true",
            "doc_type":"voter-id-proof"
        }
        let voter_sub_res =await approve_reject_status(document_load)
        try{
            console.log("voter_sub_res",voter_sub_res.body.status)
                if(voter_sub_res.body.status == "green"){
                    voter_success_flag = 1
                }
        }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
    }
        if (doc_cat == "aadhar"){
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_aadhar,
                "status_type":"DV",
                "status":"true",
                "doc_type":"aadhar-id-proof"
            }
            let aadhar_sub_res =await approve_reject_status(document_load)
            try{
                if(aadhar_sub_res.body.status == "green"){
                    aadhar_success_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
        }
        if (doc_cat == "dl"){
        
        let document_load = {
            "resource_id":facility_id,
            "doc_number":vmt_dl,
            "status_type":"DV",
            "status":"true",
            "doc_type":"dl-photo"
        }
        let dl_sub_res =await approve_reject_status(document_load)
        try{
                if(dl_sub_res.body.status == "green"){
                    dl_success_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
        }
        if (doc_cat == "address"){
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_address,
                "status_type":"DV",
                "status":"true",
                "doc_type":"addproof-photo"
            }
            let address_sub_res =await approve_reject_status(document_load)
            try{
                if(address_sub_res.body.status == "green"){
                    address_success_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            } 
        }
        
    if (doc_cat == "offer"){
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_offer,
                "status_type":"DV",
                "status":"true",
                "doc_type":"newOffFile"
            }
            let offer_sub_res =await approve_reject_status(document_load)
            try{
                if(offer_sub_res.body.status == "green"){
                    offer_success_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
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
    // // if(
    // // aadhar_success_flag == 1){
    // //     is_verify_hidden = "";
    // // }

    }

    async function doc_reject(doc_cat){
        if (doc_cat == "pan"){
        
            console.log("payload", $facility_data_store)
            
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_pan,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"pan-photo"
            }
            let pan_sub_res = await approve_reject_status(document_load)
            try{
                if(pan_sub_res.body.status == "green"){
                    pan_reject_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
            
        }
        if (doc_cat == "voter"){
        
        console.log("payload", $facility_data_store)
        
        let document_load = {
            "resource_id":facility_id,
            "doc_number":vmt_voter,
            "status_type":"RJ",
            "status":"true",
            "doc_type":"voter-id-proof"
        }
        let voter_sub_res =await approve_reject_status(document_load)
        try{
            console.log("voter_sub_res",voter_sub_res.body.status)
                if(voter_sub_res.body.status == "green"){
                    voter_reject_flag = 1
                }
        }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
    }
        if (doc_cat == "aadhar"){
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_aadhar,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"aadhar-id-proof"
            }
            let aadhar_sub_res =await approve_reject_status(document_load)
            try{
                if(aadhar_sub_res.body.status == "green"){
                    aadhar_reject_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
        }
        if (doc_cat == "dl"){
        
        let document_load = {
            "resource_id":facility_id,
            "doc_number":vmt_dl,
            "status_type":"RJ",
            "status":"true",
            "doc_type":"dl-photo"
        }
        let dl_sub_res =await approve_reject_status(document_load)
        try{
                if(dl_sub_res.body.status == "green"){
                    dl_reject_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
        }
        if (doc_cat == "address"){
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_address,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"addproof-photo"
            }
            let address_sub_res =await approve_reject_status(document_load)
            try{
                if(address_sub_res.body.status == "green"){
                    address_reject_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            } 
        }
        
    if (doc_cat == "offer"){
            let document_load = {
                "resource_id":facility_id,
                "doc_number":vmt_offer,
                "status_type":"RJ",
                "status":"true",
                "doc_type":"newOffFile"
            }
            let offer_sub_res =await approve_reject_status(document_load)
            try{
                if(offer_sub_res.body.status == "green"){
                    offer_reject_flag = 1
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

    }

    async function final_id_verify(){
            if(final_approve == "1"){
                console.log("final_approved successful data arr",facility_document_data);
                for(let i=0;i<facility_document_data.length;i++){
                    if(pan_success_flag == "1" && facility_document_data[i].doc_type == "pan-photo"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})    
                    }
                    if(voter_success_flag == "1" && facility_document_data[i].doc_type == "voter-id-proof"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(aadhar_success_flag == "1" && facility_document_data[i].doc_type == "aadhar-id-proof"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(dl_success_flag == "1" && facility_document_data[i].doc_type == "dl-photo"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(address_success_flag == "1" && facility_document_data[i].doc_type == "addproof-photo"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    if(offer_success_flag == "1" && facility_document_data[i].doc_type == "newOffFile"){
                        final_approve_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":1,"rejected":0,"remarks":"TEsting","result":"true"})
                    }
                    
                    
            }
            let final_approve_id_res = await final_id_ver_rej({"documents":final_approve_data_arr})
                    console.log("final_approve_id_res",final_approve_id_res);
                    try{
                        if(final_approve_id_res.body.status == "green"){
                            toast_text = final_approve_id_res.body.message;
                            toast_type = "success";
            let facility_doc_data_res = await facility_document()
            try{
                if (facility_doc_data_res != "null" ){
                    facility_document_data = facility_doc_data_res.body.data;
                    
                    for (var i = 0; i < facility_document_data.length; i++){

                            facility_docs_arr[i] = facility_document_data[i].doc_type;
                            
                            if(facility_docs_arr.includes("pan-photo")){
                                // console.log("pan___",facility_document_data[i].file_url)
                                pan_url = facility_document_data[i].file_url;
                                pan_verified = facility_document_data[i].verified;
                                pan_rejected = facility_document_data[i].rejected;
                                // console.log("successfully fetched Pan")
                                contains_pan = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "pan-photo")
                                //     temp_switchto = "pan_tab";
                                // }

                            }
                            
                            if(facility_docs_arr.includes("voter-id-proof")){
                                // console.log("address___",facility_document_data[i].file_url)
                                voter_url = facility_document_data[i].file_url;
                                voter_verified = facility_document_data[i].verified;
                                voter_rejected = facility_document_data[i].rejected;
                                contains_voter = 1;
                                // console.log("successfully fetched Offer letter")
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "voter-id-proof")
                                //     temp_switchto = "voter_tab";
                                // } 
                            }
                            if(facility_docs_arr.includes("aadhar-id-proof")){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                aadhar_url = facility_document_data[i].file_url;
                                aadhar_verified = facility_document_data[i].verified;
                                aadhar_rejected = facility_document_data[i].rejected;
                                contains_aadhar = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_docs_arr.includes("addproof-photo")){
                                // console.log("address___",facility_document_data[i].file_url)
                                address_url = facility_document_data[i].file_url;
                                address_verified = facility_document_data[i].verified;
                                address_rejected = facility_document_data[i].rejected;
                                contains_address = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_docs_arr.includes("newOffFile")){
                                // console.log("address___",facility_document_data[i].file_url)
                                offer_url = facility_document_data[i].file_url;
                                offer_verified = facility_document_data[i].verified;
                                offer_rejected = facility_document_data[i].rejected;
                                contains_offer = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "newOffFile")
                                //     temp_switchto = "offerletter_tab";
                                // } 
                                
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_docs_arr.includes("dl-photo")){
                                // console.log("address___",facility_document_data[i].file_url)
                                dl_url = facility_document_data[i].file_url;
                                dl_verified = facility_document_data[i].verified;
                                dl_rejected = facility_document_data[i].rejected;
                                contains_dl = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "dl-photo")
                                //     temp_switchto = "DL_tab";
                                // } 
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_docs_arr.includes("pass_photo")){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                pass_photo_url = facility_document_data[i].file_url;
                                pass_photo_verified = facility_document_data[i].verified;
                                pass_photo_rejected = facility_document_data[i].rejected;
                                // contains_pass_photo = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_docs_arr.includes("police_info_supp_file")){
                                // console.log("address___",facility_document_data[i].file_url)
                                police_url = facility_document_data[i].file_url;
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
                                can_cheque_url = facility_document_data[i].file_url;
                                
                            }
                            if(facility_docs_arr.includes("blcheque")){
                                blk_cheque_url = facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("passbook")){
                                passbook_url = facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("acc-stat")){
                                acc_stmt_url = facility_document_data[i].file_url;
                                
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
                console.log("final_rejected successful");
                for(let i=0;i<facility_document_data.length;i++){
                    if(pan_reject_flag == "1" && facility_document_data[i].doc_type == "pan-photo"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(voter_reject_flag == "1" && facility_document_data[i].doc_type == "voter-id-proof"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(aadhar_reject_flag == "1" && facility_document_data[i].doc_type == "aadhar-id-proof"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(dl_reject_flag == "1" && facility_document_data[i].doc_type == "dl-photo"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(address_reject_flag == "1" && facility_document_data[i].doc_type == "addproof-photo"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }
                    if(offer_reject_flag == "1" && facility_document_data[i].doc_type == "newOffFile"){
                        final_reject_data_arr.push({"name":facility_document_data[i].name,"resource_id":facility_id,"verified":0,"rejected":1,"remarks":"TEsting","result":"false"})
                    }

            }
            let final_reject_id_res = await final_id_ver_rej({"documents":final_reject_data_arr})
                    try{
                        if(final_reject_id_res.body.status == "green"){
                            toast_text = final_reject_id_res.body.message;
                            toast_type = "success";
            let facility_doc_data_res = await facility_document()
            try{
                if (facility_doc_data_res != "null" ){
                    facility_document_data = facility_doc_data_res.body.data;
                    
                    for (var i = 0; i < facility_document_data.length; i++){

                            facility_docs_arr[i] = facility_document_data[i].doc_type;
                            
                            if(facility_docs_arr.includes("pan-photo")){
                                // console.log("pan___",facility_document_data[i].file_url)
                                pan_url = facility_document_data[i].file_url;
                                pan_verified = facility_document_data[i].verified;
                                pan_rejected = facility_document_data[i].rejected;
                                // console.log("successfully fetched Pan")
                                contains_pan = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "pan-photo")
                                //     temp_switchto = "pan_tab";
                                // }

                            }
                            
                            if(facility_docs_arr.includes("voter-id-proof")){
                                // console.log("address___",facility_document_data[i].file_url)
                                voter_url = facility_document_data[i].file_url;
                                voter_verified = facility_document_data[i].verified;
                                voter_rejected = facility_document_data[i].rejected;
                                contains_voter = 1;
                                // console.log("successfully fetched Offer letter")
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "voter-id-proof")
                                //     temp_switchto = "voter_tab";
                                // } 
                            }
                            if(facility_docs_arr.includes("aadhar-id-proof")){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                aadhar_url = facility_document_data[i].file_url;
                                aadhar_verified = facility_document_data[i].verified;
                                aadhar_rejected = facility_document_data[i].rejected;
                                contains_aadhar = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_docs_arr.includes("addproof-photo")){
                                // console.log("address___",facility_document_data[i].file_url)
                                address_url = facility_document_data[i].file_url;
                                address_verified = facility_document_data[i].verified;
                                address_rejected = facility_document_data[i].rejected;
                                contains_address = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "addproof-photo")
                                //     temp_switchto = "address_tab";
                                // } 
                                // console.log("successfully fetched addressproof")
                            }
                            if(facility_docs_arr.includes("newOffFile")){
                                // console.log("address___",facility_document_data[i].file_url)
                                offer_url = facility_document_data[i].file_url;
                                offer_verified = facility_document_data[i].verified;
                                offer_rejected = facility_document_data[i].rejected;
                                contains_offer = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "newOffFile")
                                //     temp_switchto = "offerletter_tab";
                                // } 
                                
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_docs_arr.includes("dl-photo")){
                                // console.log("address___",facility_document_data[i].file_url)
                                dl_url = facility_document_data[i].file_url;
                                dl_verified = facility_document_data[i].verified;
                                dl_rejected = facility_document_data[i].rejected;
                                contains_dl = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "dl-photo")
                                //     temp_switchto = "DL_tab";
                                // } 
                                // console.log("successfully fetched Offer letter")
                            }
                            if(facility_docs_arr.includes("pass_photo")){
                                // console.log("aadhar___",facility_document_data[i].file_url)
                                pass_photo_url = facility_document_data[i].file_url;
                                pass_photo_verified = facility_document_data[i].verified;
                                pass_photo_rejected = facility_document_data[i].rejected;
                                // contains_pass_photo = 1;
                                // for (var i = 0; i < doctype_array.length; i++){
                                //     if(doctype_array[i] == "aadhar-id-proof")
                                //     temp_switchto = "aadhar_tab";
                                // } 
                                // console.log("successfully fetched aadhar")
                            }
                            if(facility_docs_arr.includes("police_info_supp_file")){
                                // console.log("address___",facility_document_data[i].file_url)
                                police_url = facility_document_data[i].file_url;
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
                                can_cheque_url = facility_document_data[i].file_url;
                                
                            }
                            if(facility_docs_arr.includes("blcheque")){
                                blk_cheque_url = facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("passbook")){
                                passbook_url = facility_document_data[i].file_url;
                            }
                            if(facility_docs_arr.includes("acc-stat")){
                                acc_stmt_url = facility_document_data[i].file_url;
                                
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
        
        if(!$bank_details){
            return
        }
        else{
            if(acc_num == $bank_details.account_number){
            console.log("acc match")
            if(ifsc_code == $bank_details.ifsc_code){
                console.log("ifsc match")
                if(acc_hold_name == $bank_details.account_holder){
                    console.log("acc_hold_name match")
                    // if(remark == $bank_details.remark){
                    //     console.log("remark match")
                        let document_load = {
                        "facility_id": facility_id,
                        "approved": true,
                        "rejected": false,
                        "remarks": remark
        }
            let bank_sub_res =await bank_approve_reject(document_load)
            try{
                if(bank_sub_res.body.status == "green"){
                    bank_success_flag = 1
                }
            }
            catch(err){
                console.log("Error in pan_sub_res",err)
            }
                    // }
                }
            }
        }
    }
    }
        async function bank_reject(){
            let document_load = {
            "facility_id": facility_id,
            "approved": false,
            "rejected": true,
            "remarks": remark
        }
            let bank_sub_res =await bank_approve_reject(document_load)
            try{
                if(bank_sub_res.body.status == "green"){
                    bank_reject_flag = 1
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

        routePrev = "onboardsummary";


    function menu_click(data){
        if(data == "id"){is_id_active ="MenuActive",is_bgv_active="",is_bank_active="",final_id_ver_btn="1",final_bank_ver_btn="0",final_bgv_ver_btn="0"}
        else if(data =="bank"){is_bank_active="MenuActive",is_id_active="",is_bgv_active="",final_bank_ver_btn="1",final_id_ver_btn="0",final_bgv_ver_btn="0"}
        else if(data == "bgv"){is_bgv_active="MenuActive",is_id_active="",is_bank_active="",final_bgv_ver_btn="1",final_id_ver_btn="0",final_bank_ver_btn="0"}
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
            console.log("basic_approve")
            let basic_dets_data = {
                action_type:"Verified",
                adhar_card_number: $bgv_data_store.adhar_card_number,
                basic_info_dob:$bgv_data_store.basic_info_dob,
                basic_info_supp_file:"",
                delivery_model:$bgv_data_store.delivery_model,
                email_id:$bgv_data_store.email_id,
                facility_id:facility_id,
                father_name:$bgv_data_store.father_name,
                field_type:$bgv_data_store.field_type,
                first_name:$bgv_data_store.first_name,
                gender:$bgv_data_store.gender,
                hub_name:$bgv_data_store.hub_name,
                last_name:$bgv_data_store.last_name,
                pass_photo:"",
                phone_number:$bgv_data_store.phone_number,
                rejReason:"-1",
                spouse_name:$bgv_data_store.spouse_name,
                station_model:$bgv_data_store.station_model,

            }
            let basic_app_res = await bgv_approve_rej(basic_dets_data)
            console.log("basic_app_res",basic_app_res)
            if(basic_app_res.body.status == "green"){
                basic_bgv_success_flag = 1
            }
        }
        if(bgv_data=="address_approve"){
            console.log("address_approve")
            let address_dets_data = {
                action_type:"Verified",
                address_info_supp_file:"",
                address_type:$bgv_data_store.address_type,
                area:$bgv_data_store.area,
                city:$bgv_data_store.city,
                contact_number:$bgv_data_store.contact_number,
                current_address_is_same:$bgv_data_store.current_address_is_same,
                district:$bgv_data_store.district,
                facility_id:facility_id,
                field_type:$bgv_data_store.field_type,
                full_address:$bgv_data_store.full_address,
                landmark:$bgv_data_store.landmark,
                period_of_stay:$bgv_data_store.period_of_stay,
                pin_code:$bgv_data_store.pin_code,
                rejReason:"-1",
                residence_type:$bgv_data_store.residence_type,
                state:$bgv_data_store.state,
                stay_from:$bgv_data_store.stay_from,
                stay_till:$bgv_data_store.stay_till,

            }
            let address_app_res = await bgv_approve_rej(address_dets_data)
            console.log("address_app_res",address_app_res)
            if(address_app_res.body.status == "green"){
                address_bgv_success_flag = 1
            }
        }
        if(bgv_data=="pan_approve"){
            console.log("pan_approve")
            let pan_dets_data = {
                action_type:"Verified",
                pancard_number:$bgv_data_store.pancard_number,
                pan_info_supp_file:"",
                pan_full_name:$bgv_data_store.pan_full_name,
                pan_dob:$bgv_data_store.pan_dob,
                pan_father_name:$bgv_data_store.pan_father_name,
                facility_id:facility_id,
                field_type:$bgv_data_store.field_type,
                rejReason:"-1",

            }
            let pan_app_res = await bgv_approve_rej(pan_dets_data)
            console.log("pan_app_res",pan_app_res)
            if(pan_app_res.body.status == "green"){
                pan_bgv_success_flag = 1
            }
        }

        if(bgv_data=="dl_approve"){
            console.log("dl_approve")
            let dl_dets_data = {
                action_type:"Verified",
                dl_info_supp_file:"",
                dl_number:$bgv_data_store.dl_number,
                dl_type:$bgv_data_store.dl_type,
                facility_id:facility_id,
                field_type:$bgv_data_store.field_type,
                rejReason:"-1",
                valid_from:$bgv_data_store.valid_from,
                valid_till:$bgv_data_store.valid_till,

            }
            let dl_app_res = await bgv_approve_rej(dl_dets_data)
            console.log("dl_app_res",dl_app_res)
            if(dl_app_res.body.status == "green"){
                dl_bgv_success_flag = 1
            }
        }

        if(bgv_data=="pol_approve"){
            console.log("pol_approve")
            let pol_dets_data = {
                action_type:"Verified",
                candidate_name:$bgv_data_store.candidate_name,
                facility_id:facility_id,
                field_type:$bgv_data_store.field_type,
                guardian_name:$bgv_data_store.guardian_name,
                police_address_type:$bgv_data_store.police_address_type,
                police_info_supp_file:"",
                police_verified_address:$bgv_data_store.police_verified_address,
                rejReason:"-1",

            }
            let pol_app_res = await bgv_approve_rej(pol_dets_data)
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
            console.log("basic_reject")
            let basic_dets_data = {
                action_type:"Rejected",
                basic_info_supp_file:"",
                delivery_model:$bgv_data_store.delivery_model,
                email_id:$bgv_data_store.email_id,
                facility_id:facility_id,
                father_name:$bgv_data_store.father_name,
                field_type:$bgv_data_store.field_type,
                first_name:$bgv_data_store.first_name,
                remarks:"demo remark"

            }
            let basic_app_res = await bgv_approve_rej(basic_dets_data)
            console.log("basic_app_res",basic_app_res)
            if(basic_app_res.body.status == "green"){
                basic_bgv_reject_flag = 1;
            }
        }
        if(bgv_data == "address_reject"){
            console.log("address_reject")
            let address_dets_data = {
                action_type:"Rejected",
                address_info_supp_file:"",
                address_type:$bgv_data_store.address_type,
                area:$bgv_data_store.area,
                city:$bgv_data_store.city,
                contact_number:$bgv_data_store.contact_number,
                current_address_is_same:$bgv_data_store.current_address_is_same,
                district:$bgv_data_store.district,
                facility_id:facility_id,
                field_type:$bgv_data_store.field_type,
                full_address:$bgv_data_store.full_address,
                landmark:$bgv_data_store.landmark,
                period_of_stay:$bgv_data_store.period_of_stay,
                pin_code:$bgv_data_store.pin_code,
                rejReason:"-1",
                residence_type:$bgv_data_store.residence_type,
                state:$bgv_data_store.state,
                stay_from:$bgv_data_store.stay_from,
                stay_till:$bgv_data_store.stay_till,
                remarks:"demo remark"

            }
            let address_app_res = await bgv_approve_rej(address_dets_data)
            if(address_app_res.body.status == "green"){
                address_bgv_reject_flag = 1;
            }
        }

        if(bgv_data== "dl_reject"){
            console.log("dl_reject")
            let dl_dets_data = {
                action_type:"Rejected",
                dl_info_supp_file:"",
                dl_number:$bgv_data_store.dl_number,
                dl_type:$bgv_data_store.dl_type,
                facility_id:facility_id,
                field_type:$bgv_data_store.field_type,
                rejReason:"-1",
                valid_from:$bgv_data_store.valid_from,
                valid_till:$bgv_data_store.valid_till,
                remarks:"demo remark"

            }
            let dl_app_res = await bgv_approve_rej(dl_dets_data)
            console.log("dl_app_res",dl_app_res)
            if(dl_app_res.body.status == "green"){
                dl_bgv_reject_flag = 1
            }
        }
        if(bgv_data == "pol_reject"){
            console.log("po_reject")
            let pol_dets_data = {
                action_type:"Rejected",
                candidate_name:$bgv_data_store.candidate_name,
                facility_id:facility_id,
                field_type:$bgv_data_store.field_type,
                guardian_name:$bgv_data_store.guardian_name,
                police_address_type:$bgv_data_store.police_address_type,
                police_info_supp_file:"",
                police_verified_address:$bgv_data_store.police_verified_address,
                rejReason:"-1",
                remarks:"demo remark"

            }
            let pol_app_res = await bgv_approve_rej(pol_dets_data)
            console.log("pol_app_res",pol_app_res)
            if(pol_app_res.body.status == "green"){
                police_bgv_reject_flag = 1
            }
        }
        if(bgv_data == "pan_reject"){
            console.log("pan_reject")
            let pan_dets_data = {
                action_type:"Rejected",
                pan_info_supp_file:"",
                pancard_number:$bgv_data_store.pancard_number,
                facility_id:facility_id,
                pan_father_name:$bgv_data_store.pan_father_name,
                field_type:$bgv_data_store.field_type,
                pan_dob:$bgv_data_store.pan_dob,
                pan_full_name:$bgv_data_store.pan_full_name,
                rejReason:"-1",
                remarks:"demo remark"
            }
            let pan_app_res = await bgv_approve_rej(pan_dets_data)
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
            let final_bgv_verify_data = {
                "facility_id":facility_id,
                "bgv_status":"verified"
            }

            let final_bgv_verify_res = await final_bgv_app_rej(final_bgv_verify_data)
            console.log("final_bgv_verify_res",final_bgv_verify_res)
            if(final_bgv_verify_res.body.status == "green"){
                toast_text = final_bgv_verify_res.body.message;
                toast_type = "success";
                
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
            console.log("final_bgv_reject_func")
            let final_bgv_reject_data = {
                "facility_id":facility_id,
                "bgv_status":"rejected",
                "bgv_remarks":"Testing"
            }
            let final_bgv_reject_res = await final_bgv_app_rej(final_bgv_reject_data)
            console.log("final_bgv_reject_res",final_bgv_reject_res)
            if(final_bgv_reject_res.body.status == "green"){
                toast_text = final_bgv_reject_res.body.message;
                toast_type = "success";
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
    

</script>

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section xsl:px-p10">
            <div class="breadcrumbtextDetails breadcrumbmedia">
                <p class="flex items-center">
                    <span class="text-textgrey pr-1 text-base xsl:hidden">Home / Workforce</span>

                    <span class="Username">
                        <img src="../src/img/delivery.png" class="userIconMedia" alt=""><span
                            >{$facility_data_store.facility_name}</span>
                        <span class="userDesignation">(Associate
                            - {$facility_data_store.facility_type} / ID - {$facility_data_store.name})</span> </span>

                </p>
                <!-- <p class="breadcrumbRight">
                    <a class="cursor-pointer">
                        <span class="breadRightIcons" id="SupplerModalbuttonClick">
                            <img src="../src/img/audittrail.png" class="pr-2" alt=""> Audit Trial (12)
                        </span>
                    </a>
                  
                </p> -->
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
                                <!-- <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                        class="pr-2" alt="">
                                        ID Proof
                                        <img src="../src/img/info.svg"
                                        class="pl-2" alt="">
                                    </p> -->
                                    
                                {#if $facility_data_store.is_id_prof_verified == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> ID Verified
                                </p>
                                {:else if $facility_data_store.is_id_prof_rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/reject.png"
                                    class="pr-2"
                                    alt=""
                                />ID Rejected
                                </p>
                                <!-- {:else} -->
                                {:else if $facility_data_store.is_id_prof_rejected == "0" && $facility_data_store.is_id_prof_verified == "0"}
                                <p class="statusContent font-normal xs:w-5/12">
                                <img
                                    src="../src/img/timer.png"
                                    class="pr-2"
                                    alt=""
                                />ID Pending
                                </p>
                                {/if}


                                <p class="xsl:hidden"> <img src="../src/img/Line.png" alt=""></p>

                                <!-- <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                        class="pr-2" alt="">Bank Details
                                        <img src="../src/img/info.svg"
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
                                    src="../src/img/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> Bank Verified
                                </p>
                                {:else if $bank_details.rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/reject.png"
                                    class="pr-2"
                                    alt=""
                                />Bank Rejected
                                </p>
                                {:else if $bank_details.rejected == "0" && $bank_details.approved == "0"}
                                    
                                    <p class="statusContent font-normal xs:w-5/12">
                                        <img
                                            src="../src/img/timer.png"
                                            class="pr-2"
                                            alt=""
                                        />Bank Verification Pending
                                    </p>
                                {/if}

                                <p class="xsl:hidden"> <img src="../src/img/Line.png" alt=""></p>

                                    <!-- <p class="statusContent font-normal xs:w-5/12"><img src="../src/img/timer.png"
                                            class="pr-2" alt="">BGV
                                            <img src="../src/img/info.svg"
                                            class="pl-2" alt="">
                                    </p> -->

                                {#if $facility_data_store.is_bgv_verified == "1"}
                                <p
                                class="statusContentTag text-green font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/checked.png"
                                    class="pr-2"
                                    alt=""
                                /> BGV Verified
                                </p>
                                {:else if $facility_data_store.is_bgv_rejected == "1"} 
                                <p
                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
                                >
                                <img
                                    src="../src/img/reject.png"
                                    class="pr-2"
                                    alt=""
                                />BGV Rejected
                                </p>
                                <!-- {:else} -->
                                {:else if $facility_data_store.is_bgv_intiated == "0" && $facility_data_store.is_id_prof_verified == "0"}
                                <p class="statusContent font-normal xs:w-5/12">
                                <img
                                    src="../src/img/timer.png"
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
                <div class="statusrightlink xsl:hidden">
                    <div class="vmtRejected mr-4" on:click="{final_id_reject}">
                        Reject 
                    </div>
                    <div class="vmtVerify "  on:click="{final_id_verify}">
                        Verify 
                        <!-- <img src="../src/img/downarrowwhite.svg" class="pl-2" alt="arrow"> -->
                    </div>
                </div>
                {:else if final_bgv_ver_btn == "1"}
                <div class="statusrightlink xsl:hidden">
                    <div class="vmtRejected mr-4" on:click="{final_bgv_reject_func}">
                        Reject 
                    </div>
                    <div class="vmtVerify "  on:click="{final_bgv_verify_func}">
                        Verify 
                        <!-- <img src="../src/img/downarrowwhite.svg" class="pl-2" alt="arrow"> -->
                    </div>
                </div>
                {:else if final_bank_ver_btn =="1"}<p></p>
                {/if}
            </div>
            <div class="mt-4 mb-3 hidden xsl:flex">
                <div class="vmtVerify ">
                    Verify 
                    <!-- <img src="../src/img/downarrowwhite.svg" class="pl-2" alt="arrow"> -->
                </div>
            </div>
        </div>
    </div>
    <div class="hidden" id="userDetailsSection">
    <div class="contentsectionDetailview ">
        <div class="associateDetails ">
            <div class="detailsHeader ">
                <div class="left">
                    <p class="detailsTitle">Associate Details</p>
                    <p class="detailsUpdate">
                        <span><span class="font-medium">Last updated -</span>> 27-Apr-2021 03:28 pm. <span
                                class="font-medium">By-</span> Admin</span>
                    </p>
                </div>
                <div class="right flex">
                    <a href="" class="smButton">
                        <img src="../src/img/edit.png" alt="">
                    </a>
                </div>

            </div>

            <div class="profilepic">
                <img src="../src/img/profilepic.png" alt="">
                <p class="imgName">dhiraj-shah.jpeg</p>
            </div>

            <div class="userInfoSec px-5  flex items-start ">
                <img src="../src/img/location1.png" alt="">
                <div class="pl-4">
                    <p class="detailLbale">Address & Pincode</p>
                    <p class="detailData ">r/no-9, jiwheshwar kripa chawl, penkarpada,
                        chimaji Nagar, Thane - 401104</p>
                </div>
            </div>

            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/mobilephone.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Mobile Number</p>
                        <p class="detailData">88560 22890</p>
                    </div>
                </div>
                <div class="userStatus ">
                    <p class="userStatusTick"><img src="../src/img/checked.png" alt="" class="pr-1"> Verified
                    </p>
                </div>
            </div>

            <div class="userInfoSec3">
                <div class="flex items-start">
                    <img src="../src/img/email.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Email</p>
                        <p class="detailData">dhiraj.shah@gmail.com</p>
                    </div>
                </div>

            </div>

            <div class="userInfoSecPadding">

                <div class="wrapperInfoFirst">
                    <div class="flex items-start">
                        <img src="../src/img/addressproof.png" alt="">
                        <div class="pl-4">
                            <p class="detailLbale">Address proof</p>
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText"><img src="../src/img/timer.png" alt="" class="pr-1"> Verification
                            Pending</p>
                    </div>

                </div>
                <div class="wrapperInfo ">
                    <div class="flex items-start">
                        <img src="../src/img/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center">
                            <img src="../src/img/jpeg.png" class="" alt="">

                            <p class="detailLbale">ration-card-copy.jpeg</p>
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            <a href="" class="smButton">
                                <img src="../src/img/view.png" alt="">
                            </a>
                        </p>
                    </div>

                </div>


            </div>

            <div class="userInfoSec3">
                <div class="flex items-start">
                    <img src="../src/img/gst.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">GST Details</p>
                        <p class="detailData">Not added</p>
                    </div>
                </div>
                <div class="userStatus ">
                    
                </div>
            </div>

            <div class="border-gray-200 px-5">
                <hr>
            </div>

            <div class="appcredentials">
                <div class="headingWithIcon">
                    <img src="../src/img/mobileblue.png" alt="">
                    <p class="detailsTitle">Libear App Credentials</p>
                </div>
            </div>

            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/pan.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">User ID</p>
                        <p class="detailData">dhiraj.shah@elastic.run</p>
                    </div>
                </div>

            </div>
            <div class="userInfoSec3 ">
                <div class="flex items-start">
                    <img src="../src/img/password.png" alt="">
                    <div class="pl-4">
                        <p class="detailLbale">Password</p>
                        <p class="detailData">test123</p>
                    </div>
                </div>

            </div>
            <div class="border-gray-200 px-5">
                <hr>
            </div>

            <div class="userInfoSec px-5 py-5 flex justify-end">

                <div class="addOwner ">
                    <p class="flex items-center smButtonText">
                        <a href="" class="smButton">
                            Add Owner
                        </a>
                    </p>
                </div>
            </div>

        </div>
        <div class="fullsection w-widthforWorkDetailSection">
            <div class="WorkDetailSection bg-white rounded-lg mb-5">
                <div class="detailsHeader xsl:flex-wrap ">
                    <div class="left">
                        <p class="detailsTitle">Work Details</p>
                        <p class="detailsUpdate">
                            <span><span class="font-medium">Last updated -</span>> 27-Apr-2021 03:28 pm. <span
                                    class="font-medium">By-</span> Admin</span>
                        </p>
                    </div>
                    <div class="right flex">
                        <p class="flex items-center smButtonText pr-3 ">
                            <a href="" class="smButton">
                                Work Contract
                            </a>
                        </p>
                    </div>

                </div>
                <div class="detailsrow ">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3">
                            <div class="flex items-start">
                                <img src="../src/img/Subtract.png" alt="" class="w-5 h-auto">
                                <div class="pl-4">
                                    <p class="detailLbale">Associate Type</p>
                                    <p class="detailData">NDA</p>
                                </div>
                            </div>
                            <div class="userStatus ">

                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pan.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
                                    <p class="detailLbale">Associate ID</p>
                                    <p class="detailData">BOMG00538</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSec3">
                            <div class="flex items-start">
                                <img src="../src/img/organization.png" alt="" class="w-5 h-5">
                                <div class="pl-4">
                                    <p class="detailLbale">Organization</p>
                                    <p class="detailData">Amazon Transportation</p>
                                </div>
                            </div>
                           
                        </div>
                        <div class="userInfoSecPadding">
                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/offerlatter.png" alt="" class="w-5 h-5">
                                    <div class="pl-4">
                                        <p class="detailLbale">Offer Letter</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText"><img src="../src/img/timer.png" alt="" class="pr-1">
                                        Verification Pending</p>
                                </div>

                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">dhiraj-shah-offer-letter.pdf</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/location.png" class="w-6 h-6" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">City</p>
                                    <p class="detailData">Pune</p>
                                </div>
                            </div>
                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/warehouse.png" class="w-5 h-5" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Station</p>
                                    <p class="detailData">MHPD - Mulsi SP</p>
                                </div>
                            </div>

                        </div>

                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/managerVendor.png" class="w-5 h-5" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Vendor</p>
                                    <p class="detailData">Vitthal Sutar - MHPD00012</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="WorkDetailSection bg-white rounded-br5 mb-5">
                <div class="detailsHeader xsl:flex-wrap">
                    <div class="left">
                        <p class="detailsTitle">Identity Proof</p>
                        <p class="detailsUpdate">
                            <span><span class="font-medium">Last updated -</span>> 27-Apr-2021 03:28 pm. <span
                                    class="font-medium">By-</span> Admin</span>
                        </p>
                    </div>
                    <div class="right flex">
                        <p class="rejectText pr-3"><img src="../src/img/reject.png" alt="" class="pr-2"> Reject
                        </p>
                        <div class="hidden">
                            <p class="verifiedTextGreen pr-3"><img src="../src/img/checked.png" alt=""
                                    class="pr-1">
                                Verified</p>
                        </div>
                        <div class="hidden">
                            <p class="verifyText pr-3"><img src="../src/img/timer.png" alt="" class="pr-2">
                                Verification Pending</p>
                        </div>
                        <a href="" class="smButton">
                            <img src="../src/img/edit.png" alt="">
                        </a>
                    </div>

                </div>
                <div class="userInfoSecPadding ">
                    <div class="innercardSection">
                        <div class="remark">
                            <p class="text-base text-greycolor font-medium mb-2">Remarks</p>
                            <ul class="text-sm text-greycolor list-disc	ml-m15">
                                <li>Pancard number mismatch</li>
                                <li>Voter ID not clear</li>
                            </ul>
                        </div>
                        <div class="requiredaction">
                            <p class="text-base text-redRequired font-medium mb-2">Required Action</p>
                            <ul class="text-sm text-greycolor list-disc ml-m15	">
                                <li>Update correct pan number
                                </li>
                                <li>Re-submit voter ID</li>
                            </ul>
                        </div>
                        <div class="updateAction xs:w-full">
                            <button class="ErBlueButton">Update</button>
                        </div>
                    </div>
                </div>
                <div class="detailsrow">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSecPadding">

                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" alt="">
                                    <div class="pl-4">
                                        <p class="detailLbale">PAN Number</p>
                                        <p class="detailData">CZHPS3225C</p>

                                    </div>
                                </div>
                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">PAN Card Attachment</p>
                                    </div>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">Pan-card-copy.jpeg</p>
                                        <!-- <p class="detailLbale">{pan_attach}</p> -->

                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>


                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pan.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Driving License</p>
                                    <p class="detailData">Not Submitted</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSecPadding">

                            <div class="wrapperInfoFirst">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" alt="">
                                    <div class="pl-4">
                                        <p class="detailLbale">Aadhar Number</p>
                                        <p class="detailData">9714 1358 8022</p>

                                    </div>
                                </div>

                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img src="../src/img/pan.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">Aadhar Card Attachment</p>

                                    </div>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">aadhar-card-copy.jpeg</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div class="WorkDetailSection bg-white rounded-lg">
                <div class="detailsHeader  xsl:flex-wrap">
                    <div class="left">
                        <p class="detailsTitle">Bank Details
                        </p>
                        <p class="detailsUpdate">
                            <span><span class="font-medium text-greycolor">Last updated -</span>> 27-Apr-2021
                                03:28 pm. <span class="font-medium text-greycolor">By-</span> Admin</span>
                        </p>
                    </div>
                    <div class="right flex">
                        <p class="verifyText pr-3"><img src="../src/img/timer.png" alt="" class="pr-1">
                            Verification Pending</p>
                        <a href="" class="smButton">
                            <img src="../src/img/edit.png" alt="">
                        </a>
                    </div>

                </div>

                <div class="userInfoSecPadding ">
                    <div class="innercardSection">
                        <div class="remark">
                            <p class="text-base text-greycolor font-medium mb-2">Remarks</p>
                            <ul class="text-sm text-greycolor list-disc	ml-m15">
                                <li>IFSC Code missing/not clear on document</li>
                            </ul>
                        </div>
                        <div class="requiredaction">
                            <p class="text-base text-redRequired font-medium mb-2">Required Action</p>
                            <ul class="text-sm text-greycolor list-disc ml-m15	">
                                <li>Resubmit bank documents
                                </li>
                            </ul>
                        </div>
                        <div class="updateAction xs:w-full">
                            <button class="ErBlueButton">Update</button>
                        </div>
                    </div>
                </div>

                <div class="detailsrow">
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/bank.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Bank Name</p>
                                    <p class="detailData">HDFC</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/account.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Account Number</p>
                                    <p class="detailData">483792018849327</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/account.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">IFSC Code</p>
                                    <p class="detailData">HDFC0000148</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="workDetailSection w-full">
                        <div class="userInfoSec3 ">
                            <div class="flex items-start">
                                <img src="../src/img/pincode.png" alt="">
                                <div class="pl-4">
                                    <p class="detailLbale">Branch</p>
                                    <p class="detailData">Pune - East, 400190</p>
                                </div>
                            </div>

                        </div>
                        <div class="userInfoSecPadding">

                            <div class="wrapperInfoFirst">
                                <div class="flex items-start justify-between">
                                    <div class="flex">
                                        <img src="../src/img/bankdoc.png" alt="">
                                        <div class="pl-4">
                                            <p class="detailLbale">Aadhar Number</p>
                                        </div>
                                    </div>
                                    <div class="pl-4">
                                        <p class="flex items-center smButtonText">
                                            <a href="" class="smButton">
                                                Cheque Details
                                            </a>
                                        </p>

                                    </div>

                                </div>

                            </div>
                            <div class="attachment mt-5">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <p class="detailLbale">Cancel Cheque Attachment</p>

                                    </div>
                                </div>
                            </div>
                            <div class="wrapperInfo ">
                                <div class="flex items-start">
                                    <img src="../src/img/addressproof.png" class="invisible" alt="">
                                    <div class="pl-4 flex items-center">
                                        <img src="../src/img/jpeg.png" class="" alt="">

                                        <p class="detailLbale">cancel-cheque-copy.jpeg</p>
                                    </div>
                                </div>
                                <div class="userStatus ">
                                    <p class="verifyText">
                                        <a href="" class="smButton">
                                            <img src="../src/img/view.png" alt="">
                                        </a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>
</div>

<div class="verifyIdSection ">
    <div class="mobileMenuForVerifyID hidden xsl:block">
        <ul class="flex w-full  text-center menuActiveID">
            <li class="activetab">ID Proof</li>
            <li>Bank Details</li>
            <li>BGV</li>
        </ul>
    </div>
    <div class="grid grid-cols-5 gap-4 bg-lighterGrey xsl:grid-cols-1">
        <div class="col-span-1 xsl:col-span-5">
            <div class="verifyMenu bg-white m-4 rounded-lg xsl:hidden">

                <div class="flex  justify-between items-center py-3 px-4 Menu {is_id_active}" on:click={() => {temp_display = "display_id_proof",menu_click("id")}}>
                    <p>ID Proof<p>
                        <img src="../src/img/downarrowwhite.svg">
                </div>
                <div class="flex  justify-between items-center py-3 px-4 Menu {is_bank_active}" on:click={() => {temp_display = "display_bank_details",menu_click("bank")}}>
                    <p>Bank Details<p>
                        <img src="../src/img/downarrowwhite.svg">
                </div>
                <div class="flex  justify-between items-center py-3 px-4 Menu {is_bgv_active}" on:click={() => {temp_display = "display_bgv_details",menu_click("bgv")}}>
                    <p>BGV<p>
                        <img src="../src/img/downarrowwhite.svg">
                </div>
            </div>
        </div>

        <!-- Verify ID Proof -->
        {#if temp_display == "display_id_proof"}
        <div class="m-4 col-span-4 xsl:col-span-5 ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify ID Proof</h4>
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span> {$facility_data_store.document_updated_by} <span class="font-medium">On-</span>{verified_date}</span>
                </p>
            </div> 
            <div class="mobileVerifyIDMenus hidden xsl:block">
                <div class="w-full mt-2">
                    <select name="" id="" class="w-full px-3 py-2 text-sm">
                        <option value="">PAN Number</option>
                        <option value="">Voter ID</option>
                        <option value="">Aadhar Number</option>
                        <option value="">Driving License</option>
                        <option value="">Address Proof</option>
                        <option value="">Offer Letter</option>
                    </select>
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
                <!-- <div class="grid grid-cols-7 gap-4 mt-3 xsl:grid-cols-1 ">
                    Attachment section
                    <div class="m-4 col-span-4">
                        <div class="attachment-text">
                            <p class="text-sm font-light">Attachment </p>
                        </div>   

                        <div class="imageZoom border rounded mt-2">
                            <div id="hubble-container">
                            <img src=""  id="pan_photo">
                            <p >{pan_attach}</p>commwnt 
                            
                            </div>

                            <div class="flex items-center justify-center gap-4 py-4">
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                        
                            </div>
                        </div>

                    </div>  


                    PAN Number
                    <div class="m-4 col-span-3 " >
                            <div class="formField mb-2">
                                <label class="text-greycolor font-light text-sm text-left ">Enter PAN Number </label>
                                <div class="w-full ">
                                    <input type="text" class="inputboxVMT" bind:value={vmt_pan}> 
                                    <div style="color: green;">{pan_success_msg}</div>
                                    <div class="text-red-500">{pan_reject_msg}</div>
                                </div>
                            </div>


                            <div class="ActionButtonsReject text-right mt-3">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium">Reject</button>
                                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium" on:click={() => doc_approve("pan")}>Approve</button>
                                
                            </div>    
                    </div>  
                </div>  -->
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
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
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

                           
                            <!-- <div class="formField">
                                <label class="text-greycolor font-light text-sm  text-left ">Enter PAN Card Application Receipt </label>
                                <div class="w-full ">
                                    <input type="text" class="inputboxVMT" bind:value={vmt_pan}>
                                    <div style="color: green;">{pan_success_msg}</div>
                                    <div class="text-red-500">{pan_reject_msg}</div>
                                </div>
                            </div> -->


                            <div class="ActionButtonsReject text-right mt-3">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click={() => doc_reject("pan")}>Reject</button>
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
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
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
                            <button type="button" class="btnreject " on:click={() => {voter_switchto = "tab2";}}>Reject</button>
                            <button type="button" class="btnApprove "  on:click={() => doc_approve("voter")}>Approve</button>
                        </div>
                        {/if}
                        <!-- Select issue to reject -->
                        {#if voter_switchto == "tab2"}
                        <div class="">   
                            <div class="formField mb-2">
                                <div class="flex justify-end" on:click={() => {voter_switchto = "tab1";}}>
                                    <img src="../src/img/close.png" class="closesup" alt="">
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
                                    <img src="../src/img/puls.svg"> 
                                
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="../src/img/minus.svg" >
                               
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
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
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
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
                        </div>
                         </div>
                     </div>  
                     <div class="m-4 col-span-3 xsl:m-1" >
                    <div class="formField mb-2">
                        <label class="text-greycolor font-light text-sm text-left ">Address</label>
                        <div class="w-full mt-2">
                           <!-- <p>H. No 17, Gulmohar Road, savedi, asara Housing Society, Ahmednagar 414003</p> -->
                           <input type="text" class="inputboxVMT" bind:value="{vmt_address}">
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
                                <img src="../src/img/puls.svg" >
                            
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="../src/img/minus.svg" >
                           
                            </div>
                         </div>
                    </div>  
                    <div class="m-4 col-span-3 xsl:m-1" >
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Name On Offer letter</label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Associate Type on Offer Letter </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
                            </div>
                        </div>
                        <div class="formField mb-2">
                            <label class="text-greycolor font-light text-sm text-left ">Vendor Name on Offer letter </label>
                            <div class="w-full ">
                                <input type="text" class="inputboxVMT">
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
         <p>NA</p>
         {:else}
         <div class="m-4 col-span-4 xsl:col-span-5  ">
            <div class="flex w-full justify-between xsl:flex-wrap">
                <h4 class="text-xl font-medium ">Verify Bank Details</h4>
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span> {$facility_data_store.document_updated_by} <span class="font-medium">On-</span>{verified_date}</span>
                </p>
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
                                  <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("blk_cheque")}">
                            </div>  
                        </div>
                {:else if can_cheque_url != ""}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Cancel Cheque</p>
                            <div class="tabforDocItem {can_cheque_act}" >
                                <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("can_cheque")}">
                            </div>  
                       </div>  
                {:else if passbook_url != ""}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs" >Passbook</p>
                            <div class="tabforDocItem {pass_act}">
                                <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("passbook")}">
                            </div>    
                        </div>  
                {:else if acc_stmt_url != ""}
                        <div class="text-center font-light">
                            <p class="text-sm mb-2 xsl:text-xs">Account Statement</p>
                            <div class="tabforDocItem {act_stmt_act}">
                                <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("account_stmt")}">
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
                          <img src="../src/img/pancard.svg"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div> -->
                     {#if show_blk_cheque == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{blk_cheque_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {:else if show_can_cheuque == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{can_cheque_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {:else if show_passbook == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{passbook_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {:else if show_acnt_stmt == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{acc_stmt_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {/if}
                 </div>  


                 <!-- Verify Bank Details -->
                 <div class="m-4 col-span-3 " >
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
                <p class="detailsUpdate">
                    <span><span class="font-medium">Verified by - </span>{$facility_data_store.document_updated_by} <span class="font-medium">On-</span>{verified_date}</span>
                </p>
            </div> 
            <div class="mobileVerifyMenus hidden xsl:block">
                <div class="w-full mt-2">
                    <select name="" id="" class="w-full px-3 py-2 text-sm">
                        <option value="">Basic Details</option>
                        <option value="">Address Details</option>
                        <option value="">Driving License</option>
                        <option value="">Police Verification</option>
                        <option value="">Pan Card Verification</option>
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
                        {:else if $bgv_data_store.basic_information_status=="approved"}
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
                        {:else if $bgv_data_store.address_status=="approved"}
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
                        {:else if $bgv_data_store.license_status=="approved"}
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
                        {:else if $bgv_data_store.police_verification_status=="approved"}
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
                        {:else if $bgv_data_store.pan_status=="approved"}
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
                        {#if !aadhar_url}<p></p>
                        {:else}
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Aadhar Card</p>
                                 <div class="tabforDocItem {aadhar_act}">
                                      <img src="../src/img/aadharicon.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("aadhar")}">
                                </div>  
                            </div>
                        {/if}
                        {#if !voter_url}<p></p>
                        {:else}
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Voter ID</p>
                                <div class="tabforDocItem {voter_act}">
                                    <img src="../src/img/voterid.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("voter")}">
                                </div>  
                           </div>  
                        {/if}
                        {#if !pass_photo_url}<p></p>
                        {:else}
                            <div class="text-center font-light">
                                <p class="text-sm mb-2 xsl:text-xs">Passport Photo</p>
                                <div class="tabforDocItem {pass_photo_act}">
                                    <img src="../src/img/passportpic.png" alt="" class="w-16 xsl:w-14 p-1" on:click="{()=>img_change("pass_photo")}">
                                </div>    
                        </div>    
                        {/if}
                    </div>    
                    {#if show_aadhar == 1}
                    <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{aadhar_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {:else if show_voter == 1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{voter_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {:else if show_pass_photo ==1}
                     <div class="imageZoom border rounded mt-2">
                        <div id="hubble-container">
                          <img src="{pass_photo_url}"  id="hubblepic">
                        </div>

                        <div class="flex items-center justify-center gap-4 py-4">
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {/if}
                 </div>  
                 <!-- Basic Details -->
                 <div class="m-4 col-span-3 xsl:m-1" >
                       

                        <div class="grid grid-cols-1 gap-2">
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


                          </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click="{()=>bgv_click("basic_reject")}">Reject</button>
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
                            <img src="../src/img/puls.svg" >
                        
                        <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                        <img src="../src/img/minus.svg" >
                       
                    </div>
                     </div>
                     {/if}
                 </div>  

                 <!-- Address Details -->
                 <div class="m-4 col-span-3 xsl:m-1" >
                       

                        <div class="grid grid-cols-1 gap-2">
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


                          </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click = {()=>bgv_click("address_reject")}>Reject</button>
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
                                <img src="../src/img/puls.svg" >
                            
                            <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                            <img src="../src/img/minus.svg" >
                           
                        </div>
                         </div>
                         {/if}
                     </div>  

                     <!-- Driving licence -->
                     <div class="m-4 col-span-3 xsl:m-1" >
                           

                            <div class="grid grid-cols-1 gap-2">
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
                              </div>


                            <div class="ActionButtonsReject text-right mt-5">
                                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click="{()=>bgv_click("dl_reject")}">Reject</button>
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
                                <img src="../src/img/puls.svg" >
                            
                                <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                <img src="../src/img/minus.svg" >
                            
                            </div>
                        </div>
                        {/if}
                    </div>  
                    
                    <div class="m-4 col-span-3 xsl:m-1" >
                        

                        <div class="grid grid-cols-1 gap-2">
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
                                    <p class="namevalue  ">{$bgv_data_store.police_verified_address}</p>
                                </div>
                            </div>
                        
                        </div>


                        <div class="ActionButtonsReject text-right mt-5">
                            <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click={()=>bgv_click("pol_reject")}>Reject</button>
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
                                    <img src="../src/img/puls.svg" >
                                
                                    <input type="range" min="1" max="4" value="1" step="0.1" id="zoomer" oninput="deepdive()">
                                    <img src="../src/img/minus.svg" >
                                
                                </div>
                            </div>
                            {/if}
                        </div>  
                
                <div class="m-4 col-span-3 xsl:m-1" >
                    

                    <div class="grid grid-cols-1 gap-2">
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
                    
                    </div>


                    <div class="ActionButtonsReject text-right mt-5">
                        <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium" on:click={()=>bgv_click("pan_reject")}>Reject</button>
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
<Toast type={toast_type}  text={toast_text}/>