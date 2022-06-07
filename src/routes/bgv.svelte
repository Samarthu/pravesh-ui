<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import {facility_bgv_init,facility_bgv_check,facility_data,facility_document} from "../services/onboardsummary_services"
    import {facility_data_store} from "../stores/facility_store";
    import {bgv_data_store} from  "../stores/bgv_store";
    import {bgv_config_store} from '../stores/bgv_config_store';
    import {get_states,get_cities,submit_basic_details,submit_address_details,submit_pancard_details,
    submit_dl_details,submit_police_details,get_all_docs,uploadDocs,get_casper_id,check_doc_exist,send_otp,
    verify_email} from "../services/bgv_services";
    import {documents_store } from "../stores/document_store";
    import { allowed_pdf_size } from "../services/pravesh_config";
    import { each, text } from "svelte/internal";
    import {logged_user} from '../services/supplier_services'
    import Toast from './components/toast.svelte';
    import { img_url_name } from "../stores/flags_store";
    import Spinner from "./components/spinner.svelte";
    import {get_date_format} from "../services/date_format_servives";
    import  {  page } from '$app/stores';
    import {facility_id} from "../stores/facility_id_store";
    // import DateInput from './DateInput.svelte';

    let temp;
    let query;
    let routePrev = "";
    let routeNext = "";
    let gend_selected,curr_same,police_add_per,add_is_perm ;
    let state,fac_name,fac_type;
    let show_spinner = false;
    // let fir_name_c,last_name_c,father_name_c,email_c,phone_c,dob_c,spouse_c,gend_c,aadhar_num_c;
    let get_state_data;
    let city_data=[];
    let new_selected_state;
    var today = new Date();
    let facility_document_data = [];
    let scope_data=[];
    let gst_doc_type=[];
    let gst_doc_arr = [];
    
    let basic_date;
    
    var NorthEStates = ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"];
    var pan_card_pattern = /^[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}/gm;
    var aadhar_card_pattern = /^[0-9]{12}$/gm;
    var driving_license_pattern = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2})|([A-Z]{2}[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/gm; 
    var email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phone_num_pattern = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
    var cand_and_guard_pattern = /^[a-zA-Z][\-\w\s]*$/; 
    let toast_text;
    let toast_type;
    // let first_name_message = "";
    let msg_name ="";
    let email_id_message = "";
    let phone_num_message = "";
    let dob_message = "";
    let spouse_message = "";
    let gender_message ="";
    let personal_email = "";
    // let last_name_message = "";
    // let father_name_message ="";
    let pan_card_message = "";
    // let adhar_card_message = "";
    let delivery_msg="";
    let station_message="";
    let casper_message="";
    // let photo_upload="-";
    // let aadhar_upload="-";
    // let address_upload="-"
    // let pancard_upload="-";
    // let license_upload="-";
    // let police_upload = "-";
    let photo_data=""
    let aadhar_data=""
    let pan_data=""
    let police_data=""
    let dl_data=""
    let address_data=""
    $:fac_photo_obj.profile_name ="";
    $:aadhar_obj.aadhar_name="";
    $:pancard_obj.pan_name="";
    $:pol_photo_obj.pol_doc_name="";
    $:dl_photo_obj.dl_lic_name="";
    $:aadhar_obj.aadhar_name="";
    // let otp_num="";
    $:otp_num = "";
    let profile_delete =false;
    let address_delete = false;
    let pancard_delete = false;
    let dl_delete = false;
    let pol_delete = false;
    let aadhar_delete = false;
    let file_data;
    // let basicInfo="basicInfo";
    $:is_basic_visible = "";
    $:is_address_visible = "";
    $:is_pan_visible = "";
    $:is_dl_visible = "";
    $:is_police_visible = "";
    let is_basic_active = "";
    let is_add_active = "";
    let is_pan_active = "";
    let is_dl_active = "";
    let is_pol_active = "";
    let casper_id_arr = [];
    let delivery_select,station_mod_select,casper_select;
    let verification_success = false;

    let new_profile_url = "";
    let new_aadhar_url = "";
    let new_pan_url = "";
    let new_dl_url = "";
    let new_pol_url = "";
    let new_address_url = "";

    let new_profile_name = "";
    let new_aadhar_name = "";
    let new_pan_name = "";
    let new_dl_name = "";
    let new_pol_name = "";
    let new_address_name = "";
    let doc_present = [];
    let personal_email_flag = false;


    let pancard_obj = {
        pan_num:null,
        pan_attach:null,
        pan_name:null,
    }
    let aadhar_obj = {
        aadhar_num:null,
        aadhar_attach:null,
        aadhar_name:null,
    }
    let fac_photo_obj = {
        profile_url:null,
        profile_name:null
    }
    let addproof_obj = {
        address_name:null,
        address_url:null,
    };
    let dl_photo_obj = {
        dl_lic_num:null,
        dl_lic_name:null,
        dl_lic_url:null,
    };
    let pol_photo_obj = {
        pol_doc_name:null,
        pol_doc_url:null,
       
    };
    
    $:if(new_selected_state){
        state_dep_city();
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
                toast_type = "error";
                toast_text = "Facility ID not found";
            }
        }
        console.log("$facility_id.facility_id_number",$facility_id.facility_id_number);


        
        let userdetails = await logged_user();
        
        try{
            if(userdetails.body.status == "green"){
                let username = userdetails.body.data.user.email;
                let userid = userdetails.body.data.user.username;
            }
        }
        catch(err) {
            
            toast_type = "error";
            toast_text = "User Not Found";
        }

        show_spinner = true;

        ////////////facility data/////////////
        let facility_data_res = await facility_data();
        try{
            if(facility_data_res != "null"){
              
        facility_data_store.set(
            JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
        
        )
        
        // new_fac_remarks = $facility_data_store.remarks.split("\n");
        // console.log("new_fac_remarks",new_fac_remarks)
        
        // let new_facility_date_format = new Date($facility_data_store.creation);
        // facility_created_date = get_date_format(new_facility_date_format,"dd-mm-yyyy-hh-mm");
        
        // let new_doc_date_format = new Date($facility_data_store.creation);
        // facility_doc_date =get_date_format(new_doc_date_format,"dd-mm-yyyy-hh-mm");
        
        // let facility_date_format = new Date($facility_data_store.modified);
        // facility_modified_date = get_date_format(facility_date_format,"dd-mm-yyyy-hh-mm");
        

        

            if($facility_data_store.status.includes("Rejected")){
               
                $facility_data_store.status = "Rejected";
                status_name = $facility_data_store.status;
            }
            for (var j = 0;j < $facility_data_store.addresess.length;j++){
                for(let k=0;k<scope_data.length;k++){
                    if($facility_data_store.addresess[j].state == scope_data[k].location_state){
                        gst_doc_type[j] = "gst-certificate-" + scope_data[k].state_code;
                    }
                }
                gst_doc_type=gst_doc_type
                
                // if ($facility_data_store.addresess[j].default_address == "1") {
                //     // facility_address =$facility_data_store.addresess[j].address;
                //     // facility_postal =$facility_data_store.addresess[j].postal;
                //     // city = $facility_data_store.addresess[j].city;
                //     // location_id = $facility_data_store.addresess[j].location_id;
                //     // console.log("location_id",location_id)
                //     // console.log("city",city)

                // }
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
        toast_text = err;
        
        }

        ////////////facility data/////////////

        ////////////facility document data/////////////
        let facility_document_res = await facility_document();
        try{
            
            if(facility_document_res != "null"){
                
            
                $documents_store.documents = facility_document_res.body.data
            // console.log("duplicate document store",$duplicate_documents_store)

            // console.log("documents_store",$documents_store)
            // for(let i=0;i < $documents_store.length;i++){
            //     console.log("Document data from store",$documents_store[i].doc_type);
            // }

            facility_document_data = facility_document_res.body.data;
            for (var i = 0; i < facility_document_data.length; i++) {
                let doc_date_format = new Date(facility_document_data[i].creation);
                let doc_creation_date = get_date_format(doc_date_format,"dd-mm-yyyy-hh-mm");
                facility_document_data[i].creation = doc_creation_date
                
                if(facility_document_data[i].doc_type == "pan-photo"){
                    pancard_obj = {pan_num : facility_document_data[i].doc_number,
                    pan_attach : facility_document_data[i].file_url,
                    pan_name : facility_document_data[i].file_name,
                    pan_verified : facility_document_data[i].verified,
                    pan_rejected : facility_document_data[i].rejected};
                    
                }
                
                else if(facility_document_data[i].doc_type == "aadhar-id-proof"){
                    console.log("Inside aadhar id proof")
                   
                    aadhar_obj = {aadhar_num : facility_document_data[i].doc_number,
                    aadhar_attach : facility_document_data[i].file_url,
                    aadhar_name : facility_document_data[i].file_name,
                    aadhar_verified : facility_document_data[i].verified,
                    aadhar_rejected : facility_document_data[i].rejected};
                    
                }
                else if(facility_document_data[i].doc_type == "pass_photo"){
                    console.log("Inside pass photo")
                    fac_photo_obj={
                    profile_url : facility_document_data[i].file_url,
                    profile_verified : facility_document_data[i].verified,
                    profile_rejected : facility_document_data[i].rejected};
                }
                else if(facility_document_data[i].doc_type == "addproof-photo"){
                    console.log("Inside addproof photo")
                    addproof_obj = {address_name : facility_document_data[i].file_name,   
                    address_url : facility_document_data[i].file_url,
                    address_verified : facility_document_data[i].verified,
                    address_rejected : facility_document_data[i].rejected};
                }
                else if(facility_document_data[i].doc_type == "dl-photo"){
                    console.log("Inside dl photo")
                    dl_photo_obj = {dl_lic_name : facility_document_data[i].file_name,
                    dl_lic_num : facility_document_data[i].doc_number,
                    dl_lic_url : facility_document_data[i].file_url,
                    dl_verified : facility_document_data[i].verified,
                    dl_rejected : facility_document_data[i].rejected};
                }
                // else if(facility_document_data[i].doc_type == "voter-id-proof"){
                //     console.log("Inside voter id proof")
                //     voter_id_object = {voter_id_number : facility_document_data[i].doc_number,
                //     };
                    
                // }
                // else{
                // }
              
            }
            
        }
        // console.log("pancard_obj",pancard_obj,"aadhar_obj",aadhar_obj,"fac_photo_obj",fac_photo_obj,"addproof_obj",addproof_obj,"can_cheque_obj",can_cheque_obj,"dl_photo_obj",dl_photo_obj,"new_off_file_obj",new_off_file_obj);
        }
        catch(err) {
       
        toast_type = "error";
        toast_text = err;
        }
        //////////////////facility document data ends here/////////////////////////////

        console.log("facility_data_store",$facility_data_store)
        // if($facility_data_store.facility_id="-"){
        //     routeToOnboardsummary();
        // }
        // else{
            for (var j = 0;j < $facility_data_store.addresess.length;j++) 
            {
                if ($facility_data_store.addresess[j].default_address == "1") 
                {
                   state = $facility_data_store.addresess[j].state;
                   fac_name = $facility_data_store.facility_name;
                   fac_type= $facility_data_store.facility_type;
                }
            }
            
        // }
    // console.log("$facility_data_store.first_name",$facility_data_store);    
        
    let bgv_pass_data=[
        // "ER",
        // "CRUN",
        // "Reseller"
            $facility_data_store.org_id,
            $facility_data_store.station_code,
            $facility_data_store.facility_type,

        ]  
    if($facility_data_store.org_id =="FT"){
        let casper_id_res = await get_casper_id();
        try{
            if(casper_id_res.body.status == "green"){
                console.log("casper_id_res",casper_id_res)
                for(let i=0;i<casper_id_res.body.data.length;i++){
                    console.log("inside for casper_id_res.body.data");
                    casper_id_arr.push(casper_id_res.body.data[i][0])
                }
                casper_id_arr = casper_id_arr;
                console.log("casper_id_arr",casper_id_arr)
               
            }
        }
        catch(err){
           toast_type = "error";
           toast_text = err;
        }
    }

    /////DOcument Data/////////
    for (var i = 0; i < $documents_store.documents.length; i++) {
                let doc_date_format = new Date($documents_store.documents[i].creation);
                let doc_creation_date = get_date_format(doc_date_format,"dd-mm-yyyy-hh-mm");
                $documents_store.documents[i].creation = doc_creation_date
                if($documents_store.documents[i].doc_type == "pan-photo"){
                    new_pan_name = $documents_store.documents[i].file_name;
                    new_pan_url = $documents_store.documents[i].file_url;
                    pancard_obj = {pan_num : $documents_store.documents[i].doc_number,
                    pan_attach : $documents_store.documents[i].file_url,
                    pan_name : $documents_store.documents[i].file_name,
                    };
                    
                }
                
                else if($documents_store.documents[i].doc_type == "aadhar-id-proof"){
                    new_aadhar_name = $documents_store.documents[i].file_name;
                    new_aadhar_url = $documents_store.documents[i].file_url;
                    aadhar_obj = {
                    aadhar_num : $documents_store.documents[i].doc_number,
                    aadhar_attach : $documents_store.documents[i].file_url,
                    aadhar_name : $documents_store.documents[i].file_name,
                    };
                   
                }
                else if($documents_store.documents[i].doc_type == "pass_photo"){
                    new_profile_name = $documents_store.documents[i].file_name;
                    new_profile_url = $documents_store.documents[i].file_url;
                    fac_photo_obj={
                    profile_name : $documents_store.documents[i].file_name,
                    profile_url : $documents_store.documents[i].file_url,
                   };
                   
                }
                else if($documents_store.documents[i].doc_type == "addproof-photo"){
                    new_address_name = $documents_store.documents[i].file_name;
                    new_address_url = $documents_store.documents[i].file_url;
                    addproof_obj = {address_name : $documents_store.documents[i].file_name,   
                    address_url : $documents_store.documents[i].file_url,
                    };
                    
                }
                else if($documents_store.documents[i].doc_type == "dl-photo"){
                    new_dl_name = $documents_store.documents[i].file_name;
                    new_dl_url = $documents_store.documents[i].file_url;

                    dl_photo_obj = {dl_lic_name : $documents_store.documents[i].file_name,
                    dl_lic_num : $documents_store.documents[i].doc_number,
                    dl_lic_url : $documents_store.documents[i].file_url,
                    };
                    
                }
                else if($documents_store.documents[i].doc_type == "police_info_supp_file"){
                    new_pol_name = $documents_store.documents[i].file_name;
                    new_pol_url = $documents_store.documents[i].file_url;
                    pol_photo_obj = {pol_doc_name : $documents_store.documents[i].file_name,
                    pol_doc_num : $documents_store.documents[i].doc_number,
                    pol_doc_url : $documents_store.documents[i].file_url,
                    };
                }
            } 
    let bgv_init_res = await facility_bgv_init(bgv_pass_data);   
    
    if (bgv_init_res.body.status == "green"){
        
        console.log("bgv_init_res",bgv_init_res)
        bgv_config_store.set(
        bgv_init_res.body.data
        )

    }

  
    let facility_bgv_check_res = await facility_bgv_check();
    console.log("facility_bgv_check_res",facility_bgv_check_res)
    try {
        if(!facility_bgv_check_res || facility_bgv_check_res.body.data.length == "0"){
            if(!$bgv_data_store.basic_info_dob){
                var eighteenYearsAgo = new Date();
                $bgv_data_store.basic_info_dob = get_date_format(new Date(eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18)),"yyyy-mm-dd");
                
            }
            console.log("$bgv_data_store", $bgv_data_store.basic_info_dob)
        }
        
        else{
            $bgv_data_store = facility_bgv_check_res.body.data[0];
            gend_selected = $bgv_data_store.gender;
            add_is_perm = $bgv_data_store.address_type;
            curr_same = $bgv_data_store.current_address_is_same;
            police_add_per = $bgv_data_store.police_address_type;
            personal_email = $bgv_data_store.email_id;
            if(!$bgv_data_store.basic_info_dob){
                
                var eighteenYearsAgo = new Date();
                $bgv_data_store.basic_info_dob = get_date_format(new Date(eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18)),"yyyy-mm-dd");
               
            }
            
                console.log("new date",$bgv_data_store.basic_info_dob)
    }
    }
     catch(err) {
        toast_type = "error";
        toast_text = err;
        
    }
    

    let get_states_res = await get_states();
    try {
        if(get_states_res.body.status == "green"){
           
            get_state_data = get_states_res.body.data;
            // console.log("get_state_data",get_state_data[0].state_name)
            if($bgv_config_store.is_basic_info_mandatory == "1"){
                temp = "a";
                is_pol_active="";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "active";
                is_dl_active="";

            }
            else if($bgv_config_store.is_address_info_mandatory == "1"){
                temp = "b";
                is_pol_active="";
                is_pan_active = "";
                is_add_active = "active";
                is_basic_active = "";
                is_dl_active="";
            }
            else if($bgv_config_store.is_pan_info_mandatory == "1"){
                temp = "c";
                is_pol_active="";
                is_pan_active = "active";
                is_add_active = "";
                is_basic_active = "";
                is_dl_active="";
            }
            else if($bgv_config_store.is_driving_license_mandatory == "1"){
                temp = "d";
                is_pol_active="";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "";
                is_dl_active="active";
            }
            else if($bgv_config_store.is_police_verification_mandatory == "1"){
                temp = "e";
                is_pol_active="active";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "";
                is_dl_active="";
            }
        }
        
    } catch(err) {
        toast_text = err;
        toast_type = "error";
       
    }
    ////Get current Date///
    
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log("today",today);

    show_spinner = false;
    ///Get current Date///

    
    });


    async function state_dep_city(){
        let city_data_res;
        if(!$bgv_data_store.state){
        console.log("INside no state from api")
         city_data_res =  await get_cities(new_selected_state);
        }
        try {
        if(!city_data_res){
            console.log("No Data")
        }
        else{
            city_data = city_data_res.body.data;
            city_data.sort((a, b) => (a > b) ? 1 : -1);
            // console.log("city_data_res",city_data)
        }
        
    } catch(err) {
        console.log("Error")
       
    }
    }

    const onFileSelected = (e,doctext) => {

        let img = e.target.files[0];
        if (img.size <= allowed_pdf_size) {
       
        if(doctext == "photo_upload"){
          console.log("Photo log uploaded")  
        if(!fac_photo_obj.profile_url){
               new_profile_name = img.name;
        }
        else{
            new_profile_name = fac_photo_obj.profile_name;
        }
            // fac_photo_obj.profile_name = img.name;
            // console.log("fac_photo_obj.profile_name",fac_photo_obj.profile_name)
        }
        else if(doctext == "aadhar_upload"){
            if(!fac_photo_obj.aadhar_name){
               new_aadhar_name = img.name;
            }
            else{
                new_aadhar_name = fac_photo_obj.aadhar_name;
            }
        }
        // aadhar_obj.aadhar_name = img.name;}
        else if(doctext == "address_upload"){   
            if(!fac_photo_obj.address_name){
               new_address_name = img.name;
            }
            else{
                new_address_name = fac_photo_obj.address_name;
            }

            // console.log("address inside")
        // addproof_obj.address_name = img.name;
        // console.log("aadhar_obj.aadhar_name",aadhar_obj.aadhar_name)
        }
        else if(doctext == "pancard_upload"){
            if(!fac_photo_obj.pan_name){
               new_pan_name = img.name;
            }
            else{
                new_pan_name = fac_photo_obj.pan_name;
            }
        }
        // pancard_obj.pan_name = img.name;
        else if(doctext == "police_upload"){
            if(!fac_photo_obj.pol_doc_name){
               new_pol_name = img.name;
            }
            else{
                new_pol_name = fac_photo_obj.pol_doc_name;
            }
        }
        // pol_photo_obj.pol_doc_name = img.name;
        else if(doctext == "license_upload"){
            if(!fac_photo_obj.dl_lic_name){
               new_dl_name = img.name;
            }
            else{
                new_dl_name = fac_photo_obj.dl_lic_name;
            }
        }
        // dl_photo_obj.dl_lic_name = img.name;

        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
        // file_data = reader.result;
        // console.log("reader",reader.result);
        if(doctext == "photo_upload"){
            // if(!fac_photo_obj.profile_url){
               new_profile_url = reader.result;
               doc_present.push("profile_present")
               throwError("photo_up_msg","");

            // }
            // else{
            //     new_profile_url =fac_photo_obj.profile_url;
            // }
            // fac_photo_obj.profile_url = reader.result;
            console.log("photo_data",new_profile_url);
            toast_text = "Photo Added Successfully";
            toast_type = "success";
        }
        else if(doctext == "aadhar_upload"){
            // if(!fac_photo_obj.profile_url){
                new_aadhar_url = reader.result;
                doc_present.push("aadhar_present")
                throwError("aadhar_up_msg","")


            // }
            // else{
            //     new_aadhar_url =fac_photo_obj.profile_url;
            // }
            // aadhar_obj.aadhar_attach = reader.result;
            console.log("aadhar_data",reader.result);
            toast_text = "Document Added Successfully";
            toast_type = "success";
        }
        else if(doctext == "address_upload"){
            // if(!fac_photo_obj.address_url){
               new_address_url = reader.result;
                doc_present.push("address_present")
                throwError("add_up_msg","")


            // }
            // else{
            //     new_address_url =fac_photo_obj.address_url;
            // }
            // addproof_obj.address_url = reader.result;
            console.log("address_data",reader.result);
            toast_text = "Address Document Added Successfully";
            toast_type = "success";
        }
        else if(doctext == "pancard_upload"){
            // if(!fac_photo_obj.pan_attach){
               new_pan_url = reader.result;
            doc_present.push("pan_present")
            throwError("pan_up_msg","")


            // }
            // else{
            //     new_pan_url =fac_photo_obj.pan_attach;
            // }
            // pancard_obj.pan_attach= reader.result;
            console.log("pan_data",reader.result);
            toast_text = "Pan Card Uploaded Successfully";
            toast_type = "success";
        }
        else if(doctext == "police_upload"){
            // if(!fac_photo_obj.pol_doc_url){
               new_pol_url = reader.result;
               
                throwError("pol_up_msg","")
            doc_present.push("police_present")
            // }
            // pol_photo_obj.pol_doc_url = reader.result;
            console.log("police_data",reader.result);
            toast_text = "Document Uploaded Successfully";
            toast_type = "success";
        }
        else if(doctext == "license_upload"){
            // if(!fac_photo_obj.dl_lic_url){
               new_dl_url = reader.result;
            doc_present.push("dl_present")
            throwError("dl_up_msg","");
            // }
            // else{
            //     new_dl_url =fac_photo_obj.dl_lic_url;
            // }
            // dl_photo_obj.dl_lic_url = reader.result;
            console.log("dl_data",reader.result);
            toast_text = "Licence Uploaded Successfully";
            toast_type = "success";
        }
        };
        reader.onerror = function (error) {
           toast_type = "error";
           toast_text =error;
        };
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
    function delete_files(doctext){
        if(doctext == "photo_upload"){
            new_profile_name = null;
            new_profile_url = null;
            if(doc_present.includes("profile_present")){
            doc_present.splice(doc_present.indexOf("profile_present"), 1);
            console.log("delte ted file array",doc_present)
            }

        }
        else if(doctext == "aadhar_upload"){
            new_aadhar_name = null;
            new_aadhar_url = null;
            if(doc_present.includes("aadhar_present")){
                doc_present.splice(doc_present.indexOf("aadhar_present"), 1);
            console.log("delte ted file array",doc_present)
            }
        }
        else if(doctext == "address_upload"){
           new_address_name=null;
           new_address_url=null;
           if(doc_present.includes("address_present")){
                doc_present.splice(doc_present.indexOf("address_present"), 1);
            console.log("delte ted file array",doc_present)
           }
        }
        else if(doctext == "pancard_upload"){
            new_pan_name = null;
            new_pan_url=null;
            if(doc_present.includes("pan_present")){
                doc_present.splice(doc_present.indexOf("pan_present"), 1);
            }
            console.log("delte ted file array",doc_present)
        }
        else if(doctext == "license_upload"){
           new_dl_name=null;
           new_dl_url=null; 
           if(doc_present.includes("dl_present")){
                doc_present.splice(doc_present.indexOf("dl_present"), 1);
            console.log("delte ted file array",doc_present)
           }
        }
        else if(doctext == "police_upload"){
            new_pol_name=null;
            new_pol_url=null;  
            if(doc_present.includes("police_present")){
                doc_present.splice(doc_present.indexOf("police_present"), 1);
            console.log("delte ted file array",doc_present)
            }
        }
    }

    async function submit_photo(){
        console.log("inside submit photo")
        console.log("submit_photo",fac_photo_obj.profile_name,fac_photo_obj.profile_url) 
        console.log("inside submit photo after")
        // if(fac_photo_obj.profile_name == "" && fac_photo_obj.profile_url == ""){
            console.log("ibnside submit not ")
        
            // if(!fac_photo_obj.profile_url && !fac_photo_obj.profile_name){
                console.log("Photo not submitted")
            let photo_load = {
                resource_id:$facility_id.facility_id_number,
                file_name:new_profile_name,
                pod:new_profile_url,
                doc_category:"pass_photo",
                doc_type:"pass_photo"
                }
                return await uploadDocs(photo_load);
            // }
            
            // }
        }
    async function submit_aadhar(){
        // if(!aadhar_obj.aadhar_name && !aadhar_obj.aadhar_attach){
            // if(!aadhar_obj.aadhar_name && !aadhar_obj.aadhar_attach){
            let aadhar_load = {
            resource_id:$facility_id.facility_id_number,
            file_name:new_aadhar_name,
            pod:new_aadhar_url,
            doc_category:"aadhar-id-proof",
            doc_type:"aadhar-id-proof"
            }
            return await uploadDocs(aadhar_load); 
            // }
        }
    async function submit_address(){
        console.log("inside submit address")
        // if(!addproof_obj.address_name && !addproof_obj.address_url){
        
            let address_load = {
            resource_id:$facility_id.facility_id_number,
            file_name:new_address_name,
            pod:new_address_url,
            doc_category:"addproof-photo",
            doc_type:"addproof-photo"
            }
            return await uploadDocs(address_load); 
        // }
        }   
    async function submit_pancard(){
        // if(!pancard_obj.pan_name && !pancard_obj.pan_attach){
        
            let pan_load = {
            resource_id:$facility_id.facility_id_number,
            file_name:new_pan_name,
            pod:new_pan_url,
            doc_category:"pan-photo",
            doc_type:"pan-photo"
            }
            return await uploadDocs(pan_load); 
        // }
    }
    async function submit_licence(){
        // if(!dl_photo_obj.dl_lic_name && !dl_photo_obj.dl_lic_url){
        
            let dl_load = {
            resource_id:$facility_id.facility_id_number,
            file_name:new_dl_name,
            pod:new_dl_url,
            doc_category:"dl-photo",
            doc_type:"dl-photo"
            }
            return await uploadDocs(dl_load); 
        // }
    }
    async function submit_police(){
        // if(!pol_photo_obj.pol_doc_name && !pol_photo_obj.pol_doc_url){
        
            let pol_load = {
            resource_id:$facility_id.facility_id_number,
            file_name:new_pol_name,
            pod:new_pol_url,
            doc_category:"police_info_supp_file",
            doc_type:"police_info_supp_file"
            }
            return await uploadDocs(pol_load); 
        // }
    }
////////////////////////////////////////////////////////////////////////////////////
    function throwError(id,msg){
        document.getElementById(id).innerHTML = msg;
    }

    async function submitBasicDets(){
        show_spinner = true;
            if(!new_profile_url && !new_profile_name){
                throwError("photo_up_msg","Upload Profile Photo")
                if(!new_aadhar_name && !new_aadhar_url){
                throwError("aadhar_up_msg","Upload Aadhaar Photo")
                show_spinner = false
                return
                }
                else{
                    throwError("aadhar_up_msg","")
                }
            return
            }
            else{
                throwError("photo_up_msg","")
            }
            if(!new_aadhar_name && !new_aadhar_url){
                throwError("aadhar_up_msg","Upload Aadhar Photo")
                show_spinner = false
                return
            }
            else{
                throwError("aadhar_up_msg","")
            }

        // console.log("$bgv_data_store.adhar_card_number",$bgv_data_store.adhar_card_number)
            if(!$bgv_data_store.adhar_card_number){
                throwError("aadharmsg","Enter valid Aadhar Number")
                show_spinner = false
                return 
            }
            else if(!$bgv_data_store.adhar_card_number.toString().match(aadhar_card_pattern)){  
                if($bgv_data_store.pancard_number == $bgv_data_store.adhar_card_number || 
                    $bgv_data_store.license_number == $bgv_data_store.adhar_card_number){
                    let check_doc_res =await check_doc_exist($bgv_data_store.adhar_card_number);  
                    // console.log("check_doc_res",check_doc_res)
                    if(check_doc_res == "red"){
                        check_doc_res.body.message;   
                    }
                    show_spinner = false
                    throwError("aadharmsg","Document No is Already Linked With Other Facility")
                 
                } 
                throwError("aadharmsg","Invalid Aadhar Number")
                show_spinner = false
                return 
            }
            else{
                throwError("aadharmsg","")
            }
            if(!$bgv_data_store.first_name){    
                throwError("fir_name_msg","Invalid First Name")
                show_spinner = false
                return    
            }
            else{
                throwError("fir_name_msg","")
            }
            if(!$bgv_data_store.last_name){   
                throwError("last_name_msg","Invalid Last Name")
                show_spinner = false
                return 
            }
            else{
                throwError("last_name_msg","")
            }
            if(!$bgv_data_store.father_name){
                throwError("fat_name_msg","Invalid Father Name")
                show_spinner = false
                return
            }
            else{
                throwError("fat_name_msg","")
            }
            if(!personal_email){
            throwError("email_msg","Invalid Email Id")
            show_spinner = false
            return
            }
            else if(!personal_email.match(email_pattern)){
            throwError("email_msg","Invalid Email Id")
            show_spinner = false
            return
            }
            else if($bgv_config_store.is_email_verification_mandatory == "1" && verification_success == false){
                throwError("email_msg","Verify Email Id")
                show_spinner = false
            return
            }
            else{
                throwError("email_msg","")
                show_spinner = false
            }
            console.log("$bgv_data_store phone",$bgv_data_store.phone_number.toString())
            if(!$bgv_data_store.phone_number){
                throwError("phone_msg","Invalid Phone Number")
                show_spinner = false
                return
            }
            else if(!$bgv_data_store.phone_number.toString().match(phone_num_pattern)){
                throwError("phone_msg","Invalid Phone Number")
                return
            }
            else{
                throwError("phone_msg","")
            }
            if(!$bgv_data_store.basic_info_dob){
                throwError("dob_msg","Select Date Of Birth")
                show_spinner = false
                return  
            }
            else{
                throwError("dob_msg","")
            }
            if(!$bgv_data_store.spouse_name){
                throwError("spo_msg","Enter Spouse Name")
                show_spinner = false
                return  
            }
            else{
                throwError("spo_msg","")
            }
            if(!gend_selected){
                throwError("gend_msg","Select Gender")
                show_spinner = false
                return  
            }
            else{
                throwError("gend_msg","")
                show_spinner = false
            }
            if($facility_data_store.org_id =="FT"){
                if(!$bgv_data_store.delivery_model){
                    throwError("del_msg","Select Delivery Model")
                    show_spinner = false
                    return 
                }
                else{
                    throwError("del_msg","")
                }
                if(!$bgv_data_store.station_model){
                throwError("stat_msg","Select Station Model")
                show_spinner = false
                return
                }
                else{
                    throwError("stat_msg","")
                }
                if(!$bgv_data_store.hub_name){
                    throwError("hub_msg","Select Hub Name")
                    show_spinner = false
                    return 
                }
                else{
                    show_spinner = false
                    throwError("hub_msg","")
                }
            }
                
            let basic_sub_data = {
            fir_name : $bgv_data_store.first_name,
            aadhar_num : $bgv_data_store.adhar_card_number,
            last_name : $bgv_data_store.last_name,
            father_name : $bgv_data_store.father_name,
            email : personal_email,
            phone : $bgv_data_store.phone_number,
            dob : $bgv_data_store.basic_info_dob,
            spouse : $bgv_data_store.spouse_name,
            gend : gend_selected,
            delivery_mod :$bgv_data_store.delivery_model,
            station_mod : $bgv_data_store.station_model,
            casper_id : $bgv_data_store.hub_name

        }
        show_spinner = false
            return await submit_basic_details(basic_sub_data);
            

        }    
  
    async function submitAddDets(){
        show_spinner = true
        console.log("doc display",doc_present)
        console.log("here in submitAddDets",addproof_obj.address_name,addproof_obj.address_url)
            if(!new_address_name && !new_address_url){
                throwError("add_up_msg","Upload Address Document Photo")
                show_spinner = false
                return
            }

            if(!curr_same){
                throwError("curr_msg","Select Is Current Address Same")
                show_spinner = false
                return
            }
            else{
                show_spinner = false
                throwError("curr_msg","")
            }
            if(!$bgv_data_store.full_address){
                throwError("full_add_msg","Invalid Address")
                show_spinner = false
                return
            }
            else{
                show_spinner = false
                throwError("full_add_msg","")
            }
            if(!$bgv_data_store.state && !new_selected_state){
                throwError("state_msg","Invalid State")
                show_spinner = false
                return  
            }
            else{
                throwError("state_msg","")
                show_spinner = false
            }

            if(!$bgv_data_store.district){   
                throwError("dist_msg","Invalid District Name")
                show_spinner = false
                return 
            }
            else{
                throwError("dist_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.city){   
                throwError("citymsg","Select City")
                show_spinner = false
                return 
            }
            else{
                throwError("citymsg","")
                show_spinner = false
            }

            if(!$bgv_data_store.pin_code){
                throwError("pin_msg","Invalid Pincode")
                show_spinner = false
                return  
            }
            else{
                throwError("pin_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.landmark){
            throwError("land_msg","Invalid Landmark")
            show_spinner = false
            return
            }
            else{
                throwError("land_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.residence_type){
                throwError("resid_msg","Select Residence Type")
                show_spinner = false
                return  
            }
            else{
                throwError("resid_msg","")
            }
            console.log("$bgv_data_store.period_of_stay",$bgv_data_store.period_of_stay)
            if(!$bgv_data_store.period_of_stay ){
                throwError("stay_per_msg","Enter Period Of Stay")
                show_spinner = false
                return
            }
            // else if(){
                    
            // }
            else{
                throwError("stay_per_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.stay_from){
                throwError("st_from_msg","Select Stay from Date")
                show_spinner = false
                return  
            }
            else{
                throwError("st_from_msg","")
            }
            if(!$bgv_data_store.stay_till){
                throwError("st_till_msg","Select Stay till Date")
                show_spinner = false
                return  
            }
            else{
                throwError("st_till_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.contact_number){    
                throwError("contact_msg","Invalid Contact Number")
                show_spinner = false
                return    
            }
            else if(!$bgv_data_store.contact_number.toString().match(phone_num_pattern)){
                throwError("contact_msg","Invalid Family Contact Number")
                return
            }
            else{
                throwError("contact_msg","")
                show_spinner = false
            }
            console.log("new_selected_state",new_selected_state);
            if($bgv_data_store.state){
                new_selected_state = $bgv_data_store.state;
            }
            else{
                new_selected_state = new_selected_state;
            }

        let addr_data = {
        // address_type : curr_same,
        // area = 
        city : $bgv_data_store.city,
        contact_number : $bgv_data_store.contact_number,
        current_address_is_same : curr_same,
        district : $bgv_data_store.district,
        // field_type = 
        full_address : $bgv_data_store.full_address,
        landmark : $bgv_data_store.landmark,
        period_of_stay : $bgv_data_store.period_of_stay,
        pin_code : $bgv_data_store.pin_code,
        // rejReason = 
        residence_type : $bgv_data_store.residence_type,
        state : new_selected_state,
        stay_from : $bgv_data_store.stay_from,
        stay_till : $bgv_data_store.stay_till,
    }
    console.log("addr_data",addr_data)
    show_spinner = false
        return await  submit_address_details(addr_data);
    }
    async function submitPanDets(){
        show_spinner = true
            if(!new_pan_url && !new_pan_name){
                throwError("pan_up_msg","Upload Pancard Photo")
                show_spinner = false
                return
            }

            else if(!$bgv_data_store.pancard_number.match(pan_card_pattern)){  
                if($bgv_data_store.adhar_card_number == $bgv_data_store.pancard_number || 
                $bgv_data_store.license_number == $bgv_data_store.pancard_number){
                    let check_doc_res =await check_doc_exist($bgv_data_store.pancard_number);
                    if(check_doc_res == "red"){
                        check_doc_res.body.message;   
                    }
                    throwError("pan_num_msg","Document No is Already Linked With Other Facility")
                    show_spinner = false
                } 
                throwError("pan_num_msg","Invalid Pancard Number")
                show_spinner = false
                return
            }
            else{
                throwError("pan_num_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.pan_full_name){
                throwError("pan_full_name","Invalid Pan Full Name")
                show_spinner = false
                return  
            }
            else{
                throwError("pan_full_name","")
                show_spinner = false
            }

            if(!$bgv_data_store.pan_dob){   
                throwError("pan_dob_msg","Select Date Of Birth")
                show_spinner = false
                return 
            }
            else{
                throwError("pan_dob_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.pan_father_name){   
                throwError("pan_fat_msg","Enter Father Name ")
                show_spinner = false
                return 
            }
            else{
                throwError("pan_fat_msg","")
                show_spinner = false
            }

        let pan_data = {
        pan_dob: $bgv_data_store.pan_dob,
        pan_father_name: $bgv_data_store.pan_father_name,
        pan_full_name: $bgv_data_store.pan_full_name,
        pancard_number: $bgv_data_store.pancard_number
        }
        show_spinner = false
        return await submit_pancard_details(pan_data);
        
    }

    async function submitDlDets(){
        show_spinner = true
        if(!new_dl_name && !new_dl_url){
            throwError("dl_up_msg","Upload Driving Licence Photo")
            show_spinner = false
        }
            if(!$bgv_data_store.license_number){
            throwError("lic_num_msg","Enter Valid Driving Licence Number")
            show_spinner = false
                return
            }
            else if(!$bgv_data_store.license_number.match(driving_license_pattern)){
                
                if($bgv_data_store.adhar_card_number == $bgv_data_store.license_number || 
                pancard_obj.pan_num == $bgv_data_store.license_number){
                    let check_doc_res =await check_doc_exist($bgv_data_store.license_number);  
                    // console.log("check_doc_res",check_doc_res)
                    if(check_doc_res == "red"){
                        check_doc_res.body.message;   
                    }
                    throwError("lic_num_msg","Document No is Already Linked With Other Facility")
                    show_spinner = false
                }
                throwError("lic_num_msg","Enter Valid Driving Licence Number")
                show_spinner = false
                return
            }
            else{
                throwError("lic_num_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.name_license){
                throwError("lic_name_msg","Enter Valid Name As On Driving Licence")
                show_spinner = false
                return  
            }
            else{
                throwError("lic_name_msg","")
                show_spinner = false
            }

            if(!$bgv_data_store.dl_dob){   
                throwError("lic_dob_msg","Select Date Of Birth As On Driving Licence")
                show_spinner = false
                return 
            }
            else{
                throwError("lic_dob_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.dl_issue_date){   
                throwError("dl_issue_msg","Select Licence Issue Date")
                show_spinner = false
                return 
            }
            else{
                throwError("dl_issue_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.dl_expiry_date){   
                throwError("dl_expiry_msg","Select Licence Expiry Date")
                show_spinner = false
                return 
            }
            else{
                throwError("dl_expiry_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.dl_issue_date){   
                throwError("dl_issue_st_msg","Select Licence Issue State")
                show_spinner = false
                return 
            }
            else{
                throwError("dl_issue_st_msg","")
                show_spinner = false
            }
            let dl_data = {
            dl_dob: $bgv_data_store.dl_dob,
            dl_expiry_date: $bgv_data_store.dl_expiry_date,
            dl_issue_date: $bgv_data_store.dl_issue_date,
            dl_state: $bgv_data_store.dl_state,
            license_number: $bgv_data_store.license_number,
            name_license: $bgv_data_store.name_license,
            }
            show_spinner = false
            return await submit_dl_details(dl_data);
        
    }
    async function submitPolDets(){
        show_spinner = true
        console.log("Inside submitPolDets",$bgv_data_store.police_address_type,"pol_add_per",police_add_per)
        if(!new_pol_name && !new_pol_url){
            throwError("pol_up_msg","Upload Police Document Photo")
            show_spinner = false
        }
            if(!$bgv_data_store.police_address_type && !police_add_per){
                throwError("pol_add_type","Select Address Type")
                show_spinner = false
                return
            }
            else{
                throwError("pol_add_type","")
                show_spinner = false
            }
            if(!$bgv_data_store.candidate_name){
                throwError("pol_name_msg","Enter Valid Name")
                return }
            else if(!$bgv_data_store.candidate_name.match(cand_and_guard_pattern)){
                throwError("pol_name_msg","Enter Valid Name")
                show_spinner = false
                return  
            }
            else{
                throwError("pol_name_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.guardian_name){
                throwError("guard_msg","Select Guardian's Name")
                show_spinner = false
                return }
            else if(!$bgv_data_store.guardian_name.match(cand_and_guard_pattern)){   
                throwError("guard_msg","Select Guardian's Name")
                show_spinner = false
                return 
            }
            else{
                throwError("guard_msg","")
                show_spinner = false
            }
            if(!$bgv_data_store.police_verified_address){   
                throwError("pol_ver_add","Enter Police Verified Address")
                show_spinner = false
                return 
            }
            else{
                throwError("pol_ver_add","")
                show_spinner = false
            }
            
        
        let police_data = {
        candidate_name: $bgv_data_store.candidate_name,
        guardian_name: $bgv_data_store.guardian_name,
        police_address_type: police_add_per,
        police_verified_address: $bgv_data_store.police_verified_address,
        }
        show_spinner = false
        return await submit_police_details(police_data);
        
    }
    
    async function next_clicked(new_type){
        show_spinner = true;
        show_spinner = show_spinner;
        console.log("SHo spinner",show_spinner)
        let photo_res,aadhar_res,address_res,pol_res,dl_res,pan_res;
        
        if(new_type == "basicInfo"){
            console.log("Decoding aadhar_obj.aadhar_attach",fac_photo_obj.profile_url,aadhar_obj.aadhar_attach)
            let sub_bas_res = await submitBasicDets();
            try{
                if(sub_bas_res.body.status == "green"){
                   console.log("doc_present",doc_present)
                    
                    if(!fac_photo_obj.profile_url){
                        // if(doc_present.includes("profile_present")){
                        photo_res = await submit_photo();
                        
                            try{
                                if(photo_res.body.status == "green"){
                                    photo_res = "green"
                                }
                                else{
                                    toast_type = "error"
                                    toast_msg = "Photo Upload Failed"
                                }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            }
                        // }
                        
                    }
                    else if(doc_present.includes("profile_present")){
                        photo_res = await submit_photo();
                        
                            try{
                                if(photo_res.body.status == "green"){
                                    photo_res = "green"
                                }
                                else{
                                    toast_type = "error"
                                    toast_msg = "Photo Upload Failed"
                                }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            }
                        }
                    if(!aadhar_obj.aadhar_attach){
                        // if(doc_present.includes("aadhar_present")){
                        aadhar_res = await submit_aadhar();
                            try{
                                    if(aadhar_res.body.status == "green"){
                                        aadhar_res = "green"
                                    }
                                    else{
                                        toast_type = "error"
                                        toast_msg = "Photo Upload Failed"
                                    }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            }
                        // }
                        
                    }
                    else if(doc_present.includes("aadhar_present")){
                        aadhar_res = await submit_aadhar();
                            try{
                                    if(aadhar_res.body.status == "green"){
                                        aadhar_res = "green"
                                    }
                                    else{
                                        toast_type = "error"
                                        toast_msg = "Photo Upload Failed"
                                    }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            } 
                    }
                    
                    if(doc_present.length == "0" || (aadhar_res =="green" && photo_res == "green") || aadhar_res == "green" || photo_res == "green"){
                    console.log("Inside Successs")
                    show_spinner = false;
                    toast_text = "Basic Details Submitted Successfully";
                    toast_type = "success";
                    if($bgv_config_store.is_address_info_mandatory =="1"){
                    temp="b";
                    is_add_active = "active";
                    is_basic_active = "";
                    }
                    else if($bgv_config_store.is_pan_info_mandatory =="1"){
                    temp="c";
                    is_pan_active = "active";
                    is_add_active = "";
                    is_basic_active = "";
                    }
                    else if($bgv_config_store.is_driving_license_mandatory =="1"){
                    temp="d"
                    is_dl_active="active";
                    is_pan_active = "";
                    is_add_active = "";
                    is_basic_active = "";
                    }
                    else if($bgv_config_store.is_police_verification_mandatory =="1"){
                    temp="e"
                    is_pol_active="active";
                    is_pan_active = "";
                    is_add_active = "";
                    is_basic_active = "";
                    is_dl_active="";
                    } 
                    else{
                        temp="f";
                    }
                }
                show_spinner = false
                }
                else{
                    show_spinner = false
                    toast_text = "Document submission failed";
                    toast_type = "error";
                }
            }
            catch(err){
                show_spinner = false
                // toast_type = "error";
                // toast_text = err;
            }
            
        }
        else if(new_type == "addressInfo"){
           
            console.log("show spiiner true")
            let sub_add_res = await submitAddDets();
            try{
                if(sub_add_res.body.status == "green"){
                    if(!fac_photo_obj.profile_url){
                        // if(doc_present.includes("profile_present")){
                            address_res = await submit_address();
                        
                            try{
                                if(address_res.body.status == "green"){
                                    address_res = "green"
                                }
                                else{
                                    toast_type = "error"
                                    toast_msg = "Photo Upload Failed"
                                }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            }
                        // }
                        
                    }
                    else if(doc_present.includes("address_present")){
                        address_res = await submit_address();
                            try{
                                    if(address_res.body.status == "green"){
                                        address_res = "green"
                                    }
                                    else{
                                        toast_type = "error"
                                        toast_msg = "Photo Upload Failed"
                                    }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            } 
                    }
                    
                    if(doc_present.length == "0" || address_res =="green"){
                    show_spinner = false;
                    toast_text = "Address Details Submitted Successfully";
                    toast_type = "success";
                    if($bgv_config_store.is_pan_info_mandatory =="1"){
                    temp="c";
                    is_pan_active = "active";
                    is_add_active = "";
                    is_basic_active = "";
                    }
                    else if($bgv_config_store.is_driving_license_mandatory =="1"){
                    temp="d"
                    is_dl_active="active";
                    is_pan_active = "";
                    is_add_active = "";
                    is_basic_active = "";
                    }
                    else if($bgv_config_store.is_police_verification_mandatory =="1"){
                    temp="e"
                    is_pol_active="active";
                    is_pan_active = "";
                    is_add_active = "";
                    is_basic_active = "";
                    is_dl_active="";
                    }
                    else{
                        temp="f";
                    }
                }
            }
                show_spinner = false
            }
            catch(err){
                show_spinner = false
                // toast_type = "error";
                // toast_text = err;
            }
            
        }
        else if(new_type == "panInfo"){
            
            let sub_pan_res = await submitPanDets();
            try{
                if(sub_pan_res.body.status =="green"){
                    if(!pancard_obj.pan_attach){
                    pan_res = await submit_pancard();
                        
                            try{
                                if(pan_res.body.status == "green"){
                                    pan_res = "green"
                                }
                                else{
                                    toast_type = "error"
                                    toast_msg = "Photo Upload Failed"
                                }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            }
                }
                else if(doc_present.includes("pan_present")){
                    pan_res = await submit_pancard();
                            try{
                                    if(pan_res.body.status == "green"){
                                        pan_res = "green"
                                    }
                                    else{
                                        toast_type = "error"
                                        toast_msg = "Photo Upload Failed"
                                    }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            } 
                }

                    
                }
                if(doc_present.length == "0" || pan_res =="green"){
                
                show_spinner = false;
                toast_text = "Pan Card Details Submitted Successfully";
                toast_type = "success";
                if($bgv_config_store.is_driving_license_mandatory =="1"){
                temp="d"
                is_dl_active="active";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "";
                }
                else if($bgv_config_store.is_police_verification_mandatory =="1"){
                temp="e"
                is_pol_active="active";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "";
                is_dl_active="";
                }
                else{
                        temp="f";
                    }
                }
                
                show_spinner = false
            }
            catch(err){
                show_spinner = false
                // toast_type = "error";
                // toast_text = err;
            } 
        }
        else if(new_type == "dlInfo"){
            
            let sub_dl_res = await submitDlDets();
            try{  
                if(sub_dl_res.body.status =="green"){
                    if(!dl_photo_obj.dl_lic_url){
                    dl_res = await submit_licence();
                        
                            try{
                                if(dl_res.body.status == "green"){
                                    dl_res = "green"
                                }
                                else{
                                    toast_type = "error"
                                    toast_msg = "Photo Upload Failed"
                                }
                            }
                            catch(err){
                                toast_type = "error"
                                toast_msg = err;
                            }
                        }
                    else if(doc_present.includes("dl_present")){
                        dl_res = await submit_licence();
                        try{
                                if(dl_res.body.status == "green"){
                                    dl_res = "green"
                                }
                                else{
                                    toast_type = "error"
                                    toast_msg = "Photo Upload Failed"
                                }
                        }
                        catch(err){
                            toast_type = "error"
                            toast_msg = err;
                        } 
                    }
                        
                    }
                if(doc_present.length == "0" || dl_res =="green"){

                    show_spinner = false;
                toast_text = "Licence Details Submitted Successfully";
                toast_type = "success";
                if($bgv_config_store.is_police_verification_mandatory =="1"){
                temp="e"
                is_pol_active="active";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "";
                is_dl_active="";
                }
                else{
                        temp="f";
                }
                }
                show_spinner = false
            }
            catch(err){
                show_spinner = false
                // toast_type = "error";
                // toast_text = err;
            }   
        }
        else if(new_type == "policeInfo"){
           
            let sub_pol_res = await submitPolDets();
            try{    
                if(sub_pol_res.body.status =="green"){
                    console.log("doc_present",doc_present)
                    if(!pol_photo_obj.pol_doc_url){
                
                    pol_res = await submit_police();
                        
                        try{
                            if(pol_res.body.status == "green"){
                                pol_res = "green"
                            }
                            else{
                                toast_type = "error"
                                toast_msg = "Photo Upload Failed"
                            }
                        }
                        catch(err){
                            toast_type = "error"
                            toast_msg = err;
                        }
                    }
                    else if(doc_present.includes("pol_present")){
                        pol_res = await submit_police();
                        try{
                                if(pol_res.body.status == "green"){
                                    pol_res = "green"
                                }
                                else{
                                    toast_type = "error"
                                    toast_msg = "Photo Upload Failed"
                                }
                        }
                        catch(err){
                            toast_type = "error"
                            toast_msg = err;
                        } 
                    }
                    
                }
            if(doc_present.length == "0" || pol_res =="green"){
                show_spinner = false;
                toast_text = "Police Verification Details Submitted Successfully";
                toast_type = "success";
                temp="f";
                }
                show_spinner = false
            }
            catch(err){
                show_spinner = false
                // toast_type = "error";
                // toast_text = err;
            }    
        }
    }
    async function back_btn_click(new_type){
        if(new_type == "policeInfo"){
            show_spinner = true;
                if($bgv_config_store.is_driving_license_mandatory =="1"){
                temp="d"
                is_pol_active="";
                is_dl_active="active";
                }
                else if($bgv_config_store.is_pan_info_mandatory =="1"){
                temp="c";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "active";
                
                }
                else if($bgv_config_store.is_address_info_mandatory =="1"){
                temp="b";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "";
                is_add_active = "active";
                
                }
                else if($bgv_config_store.is_basic_info_mandatory =="1"){
                temp="a";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "active";
                }
                show_spinner = false
                }
                
        else if(new_type == "dlInfo"){
            show_spinner = true;
                if($bgv_config_store.is_pan_info_mandatory =="1"){
                temp="c";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "active";
                
                }
                else if($bgv_config_store.is_address_info_mandatory =="1"){
                temp="b";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "";
                is_add_active = "active";
                
                }
                else if($bgv_config_store.is_basic_info_mandatory =="1"){
                temp="a";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "active";
                }
                show_spinner = false
                }
                
            
        else if(new_type == "panInfo"){
            show_spinner = true;
                
                if($bgv_config_store.is_address_info_mandatory =="1"){
                temp="b";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "";
                is_add_active = "active";
                
                }
                else if($bgv_config_store.is_basic_info_mandatory =="1"){
                temp="a";
                is_pol_active="";
                is_dl_active="";
                is_pan_active = "";
                is_add_active = "";
                is_basic_active = "active";
                }
                show_spinner = false
                }
                
            
            // catch(err){
            //     show_spinner = false
            //     toast_type = "error";
            //     toast_text = err; 
            // }
        // }
        else if(new_type == "addressInfo"){
            show_spinner = true;
                if($bgv_config_store.is_basic_info_mandatory =="1"){
                    temp="a";
                    is_pol_active="";
                    is_dl_active="";
                    is_pan_active = "";
                    is_add_active = "";
                    is_basic_active = "active";
                } 
                show_spinner = false
        }
                
            
        
        else if(new_type == "basicInfo"){
            show_spinner = true;
                if(sub_bas_res.body.status =="green"){
                    show_spinner = false;
                    let replaceState = false;
                    goto(routePrev, { replaceState });
                    show_spinner = false
                }
        }
    }
    function routeToOnboardsummary() {
        let replaceState = false;
        goto(routePrev, { replaceState });
    }

    function routeToBgvSuccess() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }

    routeNext = "bgvsuccesspopup";

    routePrev = "onboardsummary?unFacID="+$facility_id.facility_id_number;


    function verify_new_otp(){
        if(!personal_email.match(email_pattern)){
            toast_type = "error"
            toast_text = "Please Enter Email Id and then click on verify button";
            return
        }
        else{
        otp_model_new.style.display = "block";
        }
    }
    function close_otp_model(){
        otp_model_new.style.display = "none";
    }
    

    async function send_otp_func(){
        console.log("otp")
        if(!personal_email || $bgv_data_store.email_id != personal_email){
        let sent_otp_res = await send_otp(personal_email);
        try {
            if(sent_otp_res.body.status == "green"){
                toast_text = "OTP Sent Successfully";
                toast_type = "success";
                verification_success = true;
            }
            else if($facility_data_store.email_verified == 1){
                verification_success = true;
            }
            else{
                toast_text = "OTP Sending Failed";
                toast_type = "error";
            }
            
        } catch (error) {
            toast_type = "error";
            toast_text = error;
        }
        }
        
    }
    async function verify_email_otp(){
        let verify_email_res =  await verify_email(otp_num,personal_email)
        try {
            if(verify_email_res == "green"){
                toast_text = verify_email_res.body.message.message;
                toast_type = "success";
            }
            else{
                toast_text = verify_email_res.body.message.message;
                toast_type = "error";
            }
            
        } catch (error) {
            toast_type = "error";
            toast_text = error;
        }
    }
    
</script>

{#if show_spinner}
    <Spinner />
{/if}

<div class="mainContent ">
    <div class="breadcrumb ">
        <div class="breadcrumb-section">

            <div class="breadcrumbtextbgv justify-between xs:justify-end">
                <div class="leftinfobgv">
                    <p>
                        <span class="text-blackshade pr-1 text-2xl">Background Verification - {fac_name}</span>
                        
                        <span class="userDesignationbgv">(Associate - {fac_type} / ID - {$facility_data_store.name})</span>
                    </p>
                    <p class="text-lg font-light text-greycolor xs:hidden sm:hidden">Submit required details of
                        the associate to
                        make background verificaton</p>
                </div>

                <div class="rightinfobgv flex xs:mt-3 sm:mt-3">
                    <div class="hidden">
                        <div class="bgveripending ">
                            <img src="{$img_url_name.img_name}/timer.png" class="mr-2 w-auto h-4" alt=""> Verification Pending
                        </div>
                    </div>

                    <button type="button"
                        class="px-p15 text-sm text-white font-medium py-p10 rounded bg-bgGreen opacity-40">Submit
                        BGV</button>
                    <button on:click={routeToOnboardsummary} type="button"
                        class="px-p15 text-sm text-white font-medium py-p10 rounded bg-erBlue ml-3">Back</button>
                </div>
            </div>

        </div>
    </div>
    <div class="contentsection flexwrapSm">
        
            
        <div class="tablinksForm w100xs">
           
            <!-- {#each copy_mandatory_arr as mandatory_details,i} -->
            <ul class="bgtablinks ">
                
                {#if $bgv_config_store.is_basic_info_mandatory =="1"}
                
                <li class="tabactivelink">
                    <a href="#" class="tabAchorSection {is_basic_active}">
                        <div class="iconSection">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35"
                                fill="none">
                                <path
                                    d="M29.9322 23.7412C29.8965 22.3958 29.4332 21.0968 28.6094 20.0325C27.7856 18.9682 26.6442 18.1939 25.3508 17.822L24.9862 17.717L24.4166 16.5662C24.3827 16.4977 24.3303 16.44 24.2654 16.3997C24.2004 16.3593 24.1255 16.3379 24.0491 16.3379H20.7131V14.9229C21.8069 14.0342 22.5744 12.6919 22.6618 11.1768C23.0185 11.0251 23.3105 10.7531 23.487 10.408C23.6635 10.063 23.7132 9.66695 23.6274 9.28902C23.5818 9.08199 23.4851 8.88964 23.3463 8.72944C23.2074 8.56923 23.0307 8.44624 22.8323 8.37163V6.71775L22.8786 6.61856C22.9748 6.49998 23.0456 6.3629 23.0867 6.21582C23.1277 6.06874 23.1382 5.91479 23.1173 5.76352C23.0452 5.23865 22.9067 4.72505 22.7052 4.23507C21.8444 2.13924 19.8018 0.784973 17.5025 0.784973C15.2032 0.784973 13.1608 2.1404 12.2988 4.23828C12.097 4.72993 11.9585 5.24523 11.8865 5.77179C11.8642 5.92614 11.8746 6.08345 11.9171 6.23352C11.9595 6.38358 12.0331 6.52303 12.1329 6.64283L12.1682 6.7241V8.3702C11.9694 8.44479 11.7924 8.56791 11.6532 8.72835C11.5141 8.8888 11.4173 9.08149 11.3717 9.28888C11.2837 9.66735 11.3326 10.0648 11.5098 10.4106C11.687 10.7564 11.981 11.0282 12.3396 11.1779C12.4272 12.6914 13.1936 14.0319 14.2874 14.9207V16.3379H10.9514C10.875 16.3379 10.8 16.3593 10.7351 16.3996C10.6701 16.44 10.6177 16.4977 10.5838 16.5662L10.0149 17.716L9.64992 17.821C8.35672 18.1923 7.21544 18.966 6.39164 20.0297C5.56783 21.0935 5.10435 22.3921 5.06841 23.737C5.06841 23.7397 5.06841 23.7424 5.06841 23.7451L5.00497 32.7686C5.00075 33.1562 5.15041 33.5297 5.42114 33.8072C5.55344 33.9444 5.71163 34.054 5.88655 34.1297C6.06148 34.2053 6.24967 34.2456 6.44024 34.2481H28.5602C28.7508 34.2455 28.9389 34.2053 29.1138 34.1296C29.2887 34.054 29.4469 33.9444 29.5791 33.8072C29.7129 33.6747 29.8186 33.5167 29.8902 33.3426C29.9618 33.1685 29.9977 32.9818 29.9958 32.7936L29.9324 23.7534C29.9324 23.7507 29.9323 23.7439 29.9322 23.7412ZM29.1587 30.3822C28.8474 30.1632 28.4822 30.0334 28.1026 30.0066L26.1819 29.8667V28.2324H29.1436L29.1587 30.3822ZM23.7944 17.1582L25.1137 19.8242H17.9104V17.1582H23.7944ZM19.4827 20.6445V22.4902H15.7229V20.6445H19.4827ZM15.1077 16.3379V15.4561C15.8479 15.839 16.6685 16.0405 17.5019 16.0439C18.335 16.0486 19.1564 15.8472 19.8928 15.4576V16.3379H15.1077ZM12.6991 5.88274C12.7615 5.42503 12.8819 4.97711 13.0572 4.54973C13.7922 2.76104 15.5368 1.60522 17.5017 1.60522C19.4667 1.60522 21.2111 2.75981 21.9451 4.54672C22.1197 4.97247 22.2395 5.41867 22.3017 5.8746C22.3075 5.91674 22.3041 5.95963 22.2917 6.00034C22.2794 6.04104 22.2584 6.0786 22.2302 6.11044C22.2011 6.14362 22.1652 6.17011 22.125 6.18812C22.0847 6.20612 22.041 6.21521 21.9969 6.21476L13.0044 6.22071C12.9603 6.2212 12.9166 6.21216 12.8763 6.1942C12.836 6.17624 12.8001 6.14979 12.7709 6.11666C12.7426 6.08527 12.7215 6.04807 12.7091 6.00766C12.6967 5.96725 12.6933 5.92461 12.6991 5.88274V5.88274ZM21.7249 7.02085L21.2381 7.92969H13.7624L13.2793 7.02003L21.7249 7.02085ZM13.1252 10.876V10.8687C13.1283 10.7737 13.0973 10.6806 13.0377 10.6065C12.9781 10.5324 12.8939 10.4821 12.8003 10.4647C12.6155 10.432 12.4483 10.3347 12.3285 10.1903C12.2087 10.0458 12.1439 9.86354 12.1459 9.67586C12.147 9.61122 12.1559 9.54696 12.1725 9.48446C12.1963 9.38077 12.2528 9.28749 12.3337 9.2184C12.4146 9.14932 12.5156 9.1081 12.6218 9.10082C12.7231 9.0912 12.8171 9.04379 12.885 8.96804C12.953 8.89228 12.9899 8.79372 12.9885 8.69197V8.28249L13.1443 8.54752C13.1817 8.6119 13.236 8.66482 13.3013 8.70051C13.3667 8.73621 13.4405 8.75332 13.5149 8.75H21.4856C21.5598 8.75334 21.6334 8.73622 21.6985 8.70051C21.7637 8.6648 21.8177 8.61187 21.8547 8.54752L22.012 8.2762V8.69231C22.0107 8.79374 22.0475 8.89197 22.1151 8.96758C22.1827 9.04319 22.2763 9.09066 22.3772 9.10062C22.4833 9.1082 22.5843 9.14951 22.6653 9.21851C22.7463 9.28752 22.8031 9.3806 22.8274 9.48418C22.8422 9.5469 22.8494 9.61116 22.8489 9.67559C22.852 9.86245 22.7885 10.0443 22.67 10.1888C22.5514 10.3332 22.3853 10.4308 22.2015 10.4642C22.1079 10.4816 22.0236 10.5319 21.9638 10.6059C21.904 10.6799 21.8726 10.7729 21.8752 10.868V10.8756C21.8752 13.2729 19.8975 15.2233 17.5006 15.2233C15.1037 15.2233 13.1252 13.2729 13.1252 10.876ZM5.85693 28.2324H8.8186V29.8772L7.21899 30.0222C6.71266 30.0645 6.23144 30.2609 5.84012 30.5849L5.85693 28.2324ZM9.5022 33.4277H6.44024C6.27418 33.4221 6.11715 33.3508 6.00356 33.2295C5.94626 33.173 5.90092 33.1055 5.87024 33.0311C5.83956 32.9567 5.82418 32.8769 5.82501 32.7964L5.82836 32.334H5.84675C5.84675 31.5137 6.45515 30.9277 7.29405 30.8509L8.81847 30.7061V32.0107C8.81847 32.0622 8.8286 32.1131 8.84829 32.1606C8.86798 32.2081 8.89684 32.2513 8.93322 32.2877C8.9696 32.3241 9.01279 32.3529 9.06032 32.3726C9.10785 32.3923 9.15879 32.4024 9.21023 32.4023H9.5022V33.4277ZM8.84267 20.084C8.79609 20.178 8.78747 20.2863 8.8186 20.3865V27.4121H5.86268L5.88838 23.7519C5.91873 22.6471 6.28081 21.577 6.92752 20.6808C7.57423 19.7845 8.47566 19.1036 9.51457 18.7265L8.84267 20.084ZM24.678 33.4277H10.3225V32.4023H24.678V33.4277ZM15.8596 31.582V29.2315C15.928 29.3042 16.0624 29.3262 16.1672 29.3262H16.1706C16.2245 29.328 16.2782 29.319 16.3285 29.2996C16.3788 29.2801 16.4247 29.2508 16.4634 29.2132L16.8868 28.7866L17.3038 29.2192C17.3418 29.2588 17.3875 29.2904 17.438 29.312C17.4885 29.3336 17.5428 29.3448 17.5977 29.345C17.6527 29.3452 17.7071 29.3343 17.7577 29.313C17.8083 29.2917 17.8542 29.2605 17.8925 29.2211L18.3095 28.7913L18.7329 29.213C18.7717 29.2507 18.8177 29.2802 18.8681 29.2996C18.9186 29.3191 18.9725 29.3281 19.0265 29.3262H19.0299C19.0756 29.3301 19.1217 29.3236 19.1646 29.3072C19.2075 29.2908 19.2461 29.2649 19.2776 29.2315V31.582H15.8596ZM25.3616 31.582H20.0979V28.2043C20.1017 28.1236 20.0805 28.0437 20.0372 27.9755C19.9938 27.9073 19.9305 27.8541 19.8559 27.8232C19.7812 27.7923 19.6988 27.7852 19.62 27.8029C19.5411 27.8206 19.4697 27.8621 19.4153 27.9219L19.0175 28.3454L18.5995 27.9312C18.5609 27.8942 18.5153 27.8655 18.4653 27.8468C18.4153 27.8281 18.362 27.8197 18.3087 27.8223H18.3076C18.2538 27.8198 18.2001 27.8283 18.1496 27.8473C18.0992 27.8663 18.0532 27.8954 18.0144 27.9327L17.5987 28.3541L17.183 27.9362C17.1444 27.8984 17.0985 27.8687 17.0481 27.8492C16.9976 27.8296 16.9438 27.8204 16.8897 27.8223H16.8886C16.835 27.8197 16.7814 27.8281 16.7311 27.8468C16.6808 27.8655 16.6348 27.8942 16.5959 27.9312L16.1757 28.3524L15.7738 27.9254C15.7147 27.8655 15.6395 27.8241 15.5573 27.8062C15.4751 27.7884 15.3894 27.795 15.3109 27.8251C15.2332 27.8545 15.166 27.9061 15.1177 27.9736C15.0693 28.0411 15.0421 28.1214 15.0393 28.2043V31.582H9.63892V20.6445H11.3479C11.4567 20.6445 11.561 20.6013 11.6379 20.5244C11.7148 20.4475 11.7581 20.3432 11.7581 20.2344C11.7581 20.1256 11.7148 20.0213 11.6379 19.9444C11.561 19.8674 11.4567 19.8242 11.3479 19.8242H9.88658L11.2059 17.1582H17.0901V19.8242H14.0823C13.9735 19.8242 13.8692 19.8674 13.7923 19.9444C13.7153 20.0213 13.6721 20.1256 13.6721 20.2344C13.6721 20.3432 13.7153 20.4475 13.7923 20.5244C13.8692 20.6013 13.9735 20.6445 14.0823 20.6445H14.9026V22.9128C14.9063 23.0217 14.9531 23.1247 15.0326 23.1992C15.1121 23.2738 15.2179 23.3138 15.3268 23.3106H19.8705C20.0971 23.3106 20.303 23.1392 20.303 22.9128V20.6445H25.3616V31.582ZM27.5559 20.0659C28.5201 21.055 29.0759 22.3712 29.1125 23.752L29.1378 27.4121H26.1819V20.3865C26.213 20.2864 26.2044 20.1781 26.1578 20.0841L25.4865 18.7276C26.2683 19.012 26.9758 19.4695 27.5559 20.0659V20.0659ZM28.9969 33.2295C28.8833 33.3508 28.7263 33.4221 28.5602 33.4277H25.4983V32.4023H25.7903C25.8941 32.4023 25.9937 32.3611 26.0672 32.2876C26.1406 32.2142 26.1819 32.1146 26.1819 32.0107V30.6897L28.0427 30.8265C28.6267 30.8692 29.1087 31.3163 29.1689 31.8475L29.1758 32.775C29.1775 32.944 29.1133 33.107 28.9969 33.2295V33.2295Z"
                                    fill="#19191D" />
                                <path
                                    d="M11.5527 21.517C11.444 21.517 11.3396 21.5602 11.2627 21.6371C11.1858 21.714 11.1426 21.8183 11.1426 21.9271V22.3578C11.1426 22.4666 11.1858 22.5709 11.2627 22.6478C11.3396 22.7247 11.444 22.7679 11.5527 22.7679C11.6615 22.7679 11.7658 22.7247 11.8428 22.6478C11.9197 22.5709 11.9629 22.4666 11.9629 22.3578V21.9271C11.9629 21.8183 11.9197 21.714 11.8428 21.6371C11.7658 21.5602 11.6615 21.517 11.5527 21.517Z"
                                    fill="#19191D" />
                                <path
                                    d="M11.5527 23.2462C11.444 23.2462 11.3396 23.2894 11.2627 23.3663C11.1858 23.4432 11.1426 23.5475 11.1426 23.6563V28.168C11.1426 28.2768 11.1858 28.3811 11.2627 28.4581C11.3396 28.535 11.444 28.5782 11.5527 28.5782C11.6615 28.5782 11.7658 28.535 11.8428 28.4581C11.9197 28.3811 11.9629 28.2768 11.9629 28.168V23.6563C11.9629 23.5475 11.9197 23.4432 11.8428 23.3663C11.7658 23.2894 11.6615 23.2462 11.5527 23.2462Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor ">Basic Details</p>
                            <p class="contentDescriptionText ">Submit associate besic details</p>
                        </div>
                        {#if $bgv_data_store.basic_information_status == "verified"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                        {:else if $bgv_data_store.basic_information_status == "rejected"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/backlist.png" alt="">
                        </div>
                        {:else}
                        <p></p>
                        {/if}
                    </a>
                </li>
                {/if}
                
                {#if $bgv_config_store.is_address_info_mandatory =="1"}
                <li class="tabactivelink">
                    <a href="#" class="tabAchorSection {is_add_active}">
                        <div class="iconSection">

                            <svg width="35" height="35" viewBox="0 0 30 30" fill="none">
                                <path
                                    d="M20.8498 20.2002C20.777 20.0034 20.59 19.873 20.3805 19.873H18.7024C20.7264 16.7218 22.9284 12.7587 22.9284 10.4272C22.9284 6.05615 19.3722 2.5 15.0012 2.5C10.6301 2.5 7.0739 6.05615 7.0739 10.4272C7.0739 12.7587 9.2759 16.7218 11.2999 19.873H9.62127C9.41179 19.873 9.22478 20.0034 9.15203 20.2002L6.70672 26.8272C6.65008 26.9805 6.67205 27.1519 6.7658 27.2856C6.85906 27.4199 7.01238 27.5 7.17595 27.5H22.8254C22.9889 27.5 23.1423 27.4199 23.2355 27.2861C23.3293 27.1519 23.3513 26.9805 23.2946 26.8272L20.8498 20.2002ZM15.0012 3.5C18.821 3.5 21.9284 6.60742 21.9284 10.4272C21.9284 13.7813 16.53 21.3999 15.0012 23.4893C13.4723 21.3999 8.0739 13.7813 8.0739 10.4272C8.0739 6.60742 11.1813 3.5 15.0012 3.5ZM7.89324 26.5L9.9699 20.873H11.9533C13.3258 22.9384 14.4835 24.4743 14.6027 24.6313C14.697 24.7563 14.8444 24.8296 15.0012 24.8296C15.1579 24.8296 15.3054 24.7563 15.3996 24.6313C15.5188 24.4743 16.6765 22.9384 18.049 20.873H20.0319L22.1081 26.5H7.89324Z"
                                    fill="#19191D" />
                                <path
                                    d="M20.0957 10.457C20.0957 7.63183 17.7969 5.3335 14.9717 5.3335C12.1465 5.3335 9.84766 7.63183 9.84766 10.457C9.84766 13.2822 12.1465 15.581 14.9717 15.581C17.7969 15.581 20.0957 13.2822 20.0957 10.457ZM14.9717 14.581C12.6977 14.581 10.8477 12.731 10.8477 10.457C10.8477 8.1831 12.6977 6.3335 14.9717 6.3335C17.2456 6.3335 19.0957 8.1831 19.0957 10.457C19.0957 12.731 17.2456 14.581 14.9717 14.581Z"
                                    fill="#19191D" />
                            </svg>

                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">Address Details</p>
                            <p class="contentDescriptionText">Submit address information</p>
                        </div>
                        {#if $bgv_data_store.address_status == "verified"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                        {:else if $bgv_data_store.address_status == "rejected"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/backlist.png" alt="">
                        </div>
                        {/if}
                    </a>
                </li>
                {/if}
                {#if $bgv_config_store.is_pan_info_mandatory =="1"}
                <li class="tabactivelink">
                    <a href="#" class="tabAchorSection {is_pan_active}">
                        <div class="iconSection">
                            <svg width="35" height="35" viewBox="0 0 30 30" fill="none">
                                <path
                                    d="M26.875 26.25H3.125C1.4025 26.25 0 24.8475 0 23.125V6.875C0 5.1525 1.4025 3.75 3.125 3.75H26.875C28.5975 3.75 30 5.1525 30 6.875V23.125C30 24.8475 28.5975 26.25 26.875 26.25ZM3.125 5C2.09125 5 1.25 5.84125 1.25 6.875V23.125C1.25 24.1587 2.09125 25 3.125 25H26.875C27.9088 25 28.75 24.1587 28.75 23.125V6.875C28.75 5.84125 27.9088 5 26.875 5H3.125Z"
                                    fill="#19191D" />
                                <path
                                    d="M9.375 15C7.6525 15 6.25 13.5975 6.25 11.875C6.25 10.1525 7.6525 8.75 9.375 8.75C11.0975 8.75 12.5 10.1525 12.5 11.875C12.5 13.5975 11.0975 15 9.375 15ZM9.375 10C8.34125 10 7.5 10.8412 7.5 11.875C7.5 12.9088 8.34125 13.75 9.375 13.75C10.4087 13.75 11.25 12.9088 11.25 11.875C11.25 10.8412 10.4087 10 9.375 10Z"
                                    fill="#19191D" />
                                <path
                                    d="M14.375 21.25C14.03 21.25 13.75 20.97 13.75 20.625V19.375C13.75 18.3413 12.9087 17.5 11.875 17.5H6.875C5.84125 17.5 5 18.3413 5 19.375V20.625C5 20.97 4.72 21.25 4.375 21.25C4.03 21.25 3.75 20.97 3.75 20.625V19.375C3.75 17.6525 5.1525 16.25 6.875 16.25H11.875C13.5975 16.25 15 17.6525 15 19.375V20.625C15 20.97 14.72 21.25 14.375 21.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 16.25H18.125C17.78 16.25 17.5 15.97 17.5 15.625C17.5 15.28 17.78 15 18.125 15H25.625C25.97 15 26.25 15.28 26.25 15.625C26.25 15.97 25.97 16.25 25.625 16.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 11.25H18.125C17.78 11.25 17.5 10.97 17.5 10.625C17.5 10.28 17.78 10 18.125 10H25.625C25.97 10 26.25 10.28 26.25 10.625C26.25 10.97 25.97 11.25 25.625 11.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 21.25H18.125C17.78 21.25 17.5 20.97 17.5 20.625C17.5 20.28 17.78 20 18.125 20H25.625C25.97 20 26.25 20.28 26.25 20.625C26.25 20.97 25.97 21.25 25.625 21.25Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">PAN Details</p>
                            <p class="contentDescriptionText">Submit PAN details as per documents</p>
                        </div>
                        <!-- <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div> -->
                        {#if $bgv_data_store.pan_status == "verified"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                        {:else if $bgv_data_store.pan_status == "rejected"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/backlist.png" alt="">
                        </div>
                        {/if}
                    </a>
                </li>
                {/if}
                {#if $bgv_config_store.is_driving_license_mandatory =="1"}
                <li class="tabactivelink">
                    <a href="#" class="tabAchorSection {is_dl_active}">
                        <div class="iconSection">

                            <svg width="35" height="35" viewBox="0 0 30 30" fill="none">
                                <path
                                    d="M26.875 26.25H3.125C1.4025 26.25 0 24.8475 0 23.125V6.875C0 5.1525 1.4025 3.75 3.125 3.75H26.875C28.5975 3.75 30 5.1525 30 6.875V23.125C30 24.8475 28.5975 26.25 26.875 26.25ZM3.125 5C2.09125 5 1.25 5.84125 1.25 6.875V23.125C1.25 24.1587 2.09125 25 3.125 25H26.875C27.9088 25 28.75 24.1587 28.75 23.125V6.875C28.75 5.84125 27.9088 5 26.875 5H3.125Z"
                                    fill="#19191D" />
                                <path
                                    d="M9.375 15C7.6525 15 6.25 13.5975 6.25 11.875C6.25 10.1525 7.6525 8.75 9.375 8.75C11.0975 8.75 12.5 10.1525 12.5 11.875C12.5 13.5975 11.0975 15 9.375 15ZM9.375 10C8.34125 10 7.5 10.8412 7.5 11.875C7.5 12.9088 8.34125 13.75 9.375 13.75C10.4087 13.75 11.25 12.9088 11.25 11.875C11.25 10.8412 10.4087 10 9.375 10Z"
                                    fill="#19191D" />
                                <path
                                    d="M14.375 21.25C14.03 21.25 13.75 20.97 13.75 20.625V19.375C13.75 18.3413 12.9087 17.5 11.875 17.5H6.875C5.84125 17.5 5 18.3413 5 19.375V20.625C5 20.97 4.72 21.25 4.375 21.25C4.03 21.25 3.75 20.97 3.75 20.625V19.375C3.75 17.6525 5.1525 16.25 6.875 16.25H11.875C13.5975 16.25 15 17.6525 15 19.375V20.625C15 20.97 14.72 21.25 14.375 21.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 16.25H18.125C17.78 16.25 17.5 15.97 17.5 15.625C17.5 15.28 17.78 15 18.125 15H25.625C25.97 15 26.25 15.28 26.25 15.625C26.25 15.97 25.97 16.25 25.625 16.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 11.25H18.125C17.78 11.25 17.5 10.97 17.5 10.625C17.5 10.28 17.78 10 18.125 10H25.625C25.97 10 26.25 10.28 26.25 10.625C26.25 10.97 25.97 11.25 25.625 11.25Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.625 21.25H18.125C17.78 21.25 17.5 20.97 17.5 20.625C17.5 20.28 17.78 20 18.125 20H25.625C25.97 20 26.25 20.28 26.25 20.625C26.25 20.97 25.97 21.25 25.625 21.25Z"
                                    fill="#19191D" />
                            </svg>
                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">Driving License Details</p>
                            <p class="contentDescriptionText">Submit DL details as per documents</p>
                        </div>
                        <!-- <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div> -->
                        {#if $bgv_data_store.license_status == "verified"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                        {:else if $bgv_data_store.license_status == "rejected"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/backlist.png" alt="">
                        </div>
                        {/if}
                    </a>
                </li>
                {/if}
                {#if $bgv_config_store.is_police_verification_mandatory =="1"}
                <li class="tabactivelink">
                    <a href="#" class="tabAchorSection {is_pol_active}">
                        <div class="iconSection">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path
                                    d="M20.2734 26.3085C19.95 26.3085 19.6875 26.571 19.6875 26.8945C19.6875 27.2179 19.95 27.4804 20.2734 27.4804C20.5969 27.4804 20.8594 27.2179 20.8594 26.8945C20.8594 26.571 20.5969 26.3085 20.2734 26.3085Z"
                                    fill="#19191D" />
                                <path
                                    d="M25.8063 21.0811C25.2095 20.2033 24.3723 19.5328 23.3851 19.142L19.0868 17.441C20.2108 16.3475 20.8593 14.8402 20.8593 13.2422C20.8593 12.6103 20.7605 11.995 20.5656 11.4058C20.7445 11.3028 20.8593 11.1108 20.8593 10.8984V9.10317L21.8819 7.05784L22.8791 6.55926C23.0777 6.46001 23.203 6.2571 23.203 6.0352V4.27734C23.203 4.02515 23.0417 3.80126 22.8024 3.72146L21.1361 3.16605L17.1114 0.118769C17.0096 0.0417187 16.8854 0 16.7577 0H13.2421C13.1144 0 12.9902 0.0417187 12.8884 0.118769L8.86376 3.16599L7.19747 3.7214C6.95818 3.80115 6.79681 4.02509 6.79681 4.27728V6.03509C6.79681 6.25704 6.9222 6.45989 7.12072 6.55915L8.11792 7.05772L9.14056 9.10305V10.8984C9.14056 11.1108 9.25522 11.3027 9.43423 11.4058C9.23917 11.9948 9.14056 12.6101 9.14056 13.2422C9.14056 14.8401 9.78895 16.3474 10.9125 17.4405L6.61394 19.1421C5.62693 19.5327 4.78986 20.2033 4.1932 21.0811C3.59654 21.9588 3.28125 22.9838 3.28125 24.0451V29.414C3.28125 29.7376 3.54363 29.9999 3.86719 29.9999H14.4133C14.4137 29.9999 14.4142 30 14.4146 30C14.415 30 14.4155 29.9999 14.4159 29.9999H15.5841C15.5845 29.9999 15.585 30 15.5854 30C15.5859 30 15.5863 29.9999 15.5867 29.9999H26.1328C26.4564 29.9999 26.7188 29.7376 26.7188 29.414V24.0457C26.7186 22.9842 26.4032 21.9591 25.8063 21.0811ZM20.9281 19.4299L17.3437 25.3681V23.5939C17.3437 23.2155 17.2187 22.8408 16.9921 22.5392L15.9579 21.1602C16.4389 20.8462 16.7577 20.3035 16.7577 19.6875V18.8322C17.1942 18.6954 17.6113 18.5085 18.0043 18.2729L20.9281 19.4299ZM9.07868 6.35905C9.02196 6.24567 8.93003 6.15368 8.81659 6.09702L7.96862 5.67304V4.69968L9.32577 4.24728C9.38636 4.22706 9.44325 4.19712 9.49417 4.15857L13.4389 1.17187H16.5609L20.5056 4.15857C20.5565 4.19712 20.6134 4.22706 20.674 4.24728L22.0311 4.69968V5.67304L21.1831 6.09702C21.0697 6.15374 20.9778 6.24567 20.921 6.35905L19.9112 8.37889H10.0886L9.07868 6.35905ZM10.3124 9.55076H19.6874V10.4741L18.1551 10.978C17.1323 11.314 16.0686 11.4844 14.9934 11.4844C14.4546 11.4844 13.9126 11.4409 13.3823 11.3553C12.8531 11.2699 12.3246 11.1407 11.8119 10.9715L10.6802 10.597C10.6298 10.5382 10.567 10.4884 10.493 10.4522C10.4345 10.4237 10.3736 10.4062 10.3124 10.3981V9.55076ZM10.3124 13.2422C10.3124 12.7407 10.3903 12.2529 10.5433 11.786L11.4442 12.0842C12.016 12.2729 12.6053 12.4169 13.1956 12.5123C13.7874 12.6078 14.3923 12.6563 14.9935 12.6563C16.1931 12.6563 17.3799 12.4663 18.5211 12.0914L19.4563 11.7839C19.6097 12.2516 19.6875 12.7402 19.6875 13.2422C19.6875 14.7974 18.9197 16.2455 17.6326 17.1209C17.6236 17.1266 17.6148 17.1328 17.606 17.1389C17.1287 17.4594 16.6027 17.6865 16.0421 17.8136C15.3634 17.9678 14.6367 17.9678 13.9577 17.8136C13.3939 17.6858 12.8645 17.4566 12.3836 17.1321C11.0867 16.2584 10.3124 14.8043 10.3124 13.2422ZM15.5859 19.0719V19.6875C15.5859 20.0105 15.3229 20.2734 14.9999 20.2734C14.8436 20.2734 14.6965 20.2124 14.5858 20.1017C14.475 19.9909 14.414 19.8438 14.414 19.6875V19.0719C14.6083 19.0913 14.8039 19.1015 14.9999 19.1015C15.1959 19.1015 15.3915 19.0913 15.5859 19.0719ZM11.9949 18.2723C12.3885 18.5083 12.8058 18.6953 13.2421 18.8321V19.6875C13.2421 20.1568 13.425 20.5982 13.7571 20.9304C13.8447 21.0179 13.9401 21.0948 14.0413 21.161L13.008 22.5388C12.7812 22.8408 12.6562 23.2155 12.6562 23.5939V25.3684L9.07177 19.4295L11.9949 18.2723ZM4.45306 28.8281V24.0451C4.45306 22.3518 5.47054 20.8549 7.04519 20.2317L7.96692 19.8668L12.6919 27.6953L13.3758 28.8281H4.45306ZM16.1717 27.3095L15.2552 28.8281H14.7446L13.828 27.3099V23.5939C13.828 23.4677 13.8695 23.3431 13.9452 23.2423L14.9999 21.836L16.0548 23.2427C16.1302 23.3431 16.1717 23.4677 16.1717 23.5939V27.3095ZM16.624 28.8281L22.033 19.8672L22.954 20.2317C24.5291 20.8551 25.5468 22.3522 25.5468 24.0457V28.8281H16.624Z"
                                    fill="#19191D" />
                                <path
                                    d="M15 2.51953C13.7077 2.51953 12.6562 3.57094 12.6562 4.86328C12.6562 6.15562 13.7077 7.20702 15 7.20702C16.2923 7.20702 17.3437 6.15562 17.3437 4.86328C17.3437 3.57094 16.2923 2.51953 15 2.51953ZM15 6.03515C14.3538 6.03515 13.8281 5.50945 13.8281 4.86328C13.8281 4.21711 14.3538 3.6914 15 3.6914C15.6462 3.6914 16.1719 4.21711 16.1719 4.86328C16.1719 5.50945 15.6462 6.03515 15 6.03515Z"
                                    fill="#19191D" />
                                <path
                                    d="M23.7891 26.3085H22.6172C22.2936 26.3085 22.0312 26.5709 22.0312 26.8945C22.0312 27.2181 22.2936 27.4804 22.6172 27.4804H23.7891C24.1126 27.4804 24.375 27.2181 24.375 26.8945C24.375 26.5709 24.1126 26.3085 23.7891 26.3085Z"
                                    fill="#19191D" />
                            </svg>


                        </div>
                        <div class="contentTitles">
                            <p class="contentheadingAnchor">Police Verification Details</p>
                            <p class="contentDescriptionText">Submit Police verification as per documents</p>
                        </div>
                        <!-- <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div> -->
                        {#if $bgv_data_store.police_verification_status == "verified"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/checked.png" alt="">
                        </div>
                        {:else if $bgv_data_store.police_verification_status == "rejected"}
                        <div class="markSection pl-3 xs:hidden sm:hidden">
                            <img src="{$img_url_name.img_name}/backlist.png" alt="">
                        </div>
                        {/if}
                    </a>
                </li>
                {/if}
            </ul>
         
        </div>


        <!-- Basic Details -->
        <!-- {#if mandatory_det_arr.includes("is_basic_info_mandatory=0")} -->
        <!-- {#if demoflag == "is_basic_info_mandatory"} -->
     
        <!-- {#if $bgv_config_store.is_basic_info_mandatory =="1"} -->
            {#if temp=="a"}
            <div class="formSection">
            <div class="onboardForm ">
                <div class="formTextSection">
                    <p class="smxslabel"> Submit basic details of associate</p>
                    <p class="formHeadingLabel xs:hidden sm:hidden">Submit basic details of associate</p>
                    <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                        required </p>
                </div>
                
                <form action="#">
                    <div class="formElements">

                        <div class="flex">
                            <div class="formGroup py-1">
                                <label class="formLable ">Passport Size Photo <span
                                        class="mandatoryIcon">*</span></label>
                                <!-- <div class="formInnerGroup ">

                                    <span class="profileimage">
                                        <img src="{$img_url_name.img_name}/Maskprofile.jpg" class="associateProfilephoto"
                                            alt="">
                                        <span>dhiraj-shah.jpeg </span>
                                        <span><img src="{$img_url_name.img_name}/closeblue.png" alt=""></span>
                                    </span>
                                </div> -->
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <label class="cursor-pointer">
                                                <div class="uploadbutton">Upload</div>
                                                <!-- <input type="file" class="hidden"> -->
                                                <input
                                                                    type="file"
                                                                    class="hidden"
                                                                    bind:value = "{new_profile_url}"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"photo_upload"
                                                                        )}
                                                                        
                                                                />
                                                                <!-- <div class="text-red-500">{adhar_card_message}</div> -->

                                            </label>
                                            <div class="flex">
                                                {#if new_profile_name}
                                                <p>{new_profile_name}</p>
                                               <img
                                               on:click={() => delete_files("photo_upload")}
                                               class="pl-2 cursor-pointer"
                                               src="{$img_url_name.img_name}/blackclose.svg"
                                               alt=""
                                               
                                           />
                                           {/if}
                                           </div>
                                           <div class="text-red-500" id="photo_up_msg"></div>
                                        
                                           
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span> Photo must
                                            be clear and in JPG, PNG, or PDF format to process faster
                                            verification
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup py-1">
                                <label class="formLable ">Aadhar Card Copy <span
                                        class="mandatoryIcon">*</span></label>
                                
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <label class="cursor-pointer">
                                                <div class="uploadbutton">Upload</div>
                                                <!-- <input type="file" class="hidden"> -->
                                                <input
                                                type="file"
                                                class="hidden"
                                                bind:value = "{new_aadhar_url}"
                                                on:change={(
                                                    e
                                                ) =>
                                                    onFileSelected(
                                                        e,"aadhar_upload"
                                                    )}
                                                    
                                            />
                                            <!-- <div class="text-red-500">{adhar_card_message}</div> -->
                                            </label>
                                            <div class="flex">
                                                {#if new_aadhar_name}
                                                <p>{new_aadhar_name}</p>
                                               <img
                                               on:click={() => delete_files("aadhar_upload")}
                                               class="pl-2 cursor-pointer"
                                               src="{$img_url_name.img_name}/blackclose.svg"
                                               alt=""
                                               
                                           />
                                           {/if}
                                        </div>
                                        <div class="text-red-500" id="aadhar_up_msg"></div>

                                           
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span> Photo must
                                            be clear and in JPG, PNG, or PDF format to process faster
                                            verification
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Aadhar Number 
                                    <br><span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="number" class="inputboxbgv" bind:value={$bgv_data_store.adhar_card_number}>
                                            <!-- {#if aadhar_num_c == "1"} -->
                                            <div class="text-red-500" id="aadharmsg"></div>
                                            <!-- {/if} -->
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    {#each NorthEStates as n_state}
                                        {#if n_state == state}
                                        <div>
                                            <p class="text-red-500">Voter ID can be accepted for this facility 
                                            </p>
                                        </div>
                                        {/if}
                                       
                                    {/each}
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span>( Voter ID only for North East)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">First Name <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.first_name}">
                                            
                                            <div class="text-red-500" id="fir_name_msg"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span> First name
                                            must be same as per attached aadhar card to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Last Name <span class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.last_name}">
                                            
                                            <div class="text-red-500" id="last_name_msg"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span> Last name
                                            must be same as per attached aadhar card to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Father’s Name<span
                                        class="mandatoryIcon">*</span></label>
                                <div class=" sm:w-full xs:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.father_name}">
                                            
                                            <div class="text-red-500" id="fat_name_msg"></div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                       

                        <div class="flex">
                            <div class="formGroup ">
                                <div class="text-right">
                                    
                                    
                                    <label class="formLable">Personal Email ID<span
                                        class="mandatoryIcon">*</span></label>
                                    <p class="smNotebgv formLable">(for Rabbit ID Creation) </p>
                                </div>
                                
                                <div class="flex justify-between formInnerGroup">
                                    <!-- <p class="text-greycolor text-base">dhiraj.shah@gmail.com</p> -->
                                    <input type="text" class="inputboxbgv" bind:value="{personal_email}">
                                    
                                    
                                    
                                    {#if $facility_data_store.email_verified =="1"}
                                    <p class="veriTextEmail ml-2 mr-5"><img src="{$img_url_name.img_name}/checked.png"
                                            class="mr-1 object-contain" alt=""> Verified</p>
                                        {:else}<p></p>
                                    {/if}
                                </div>
                               
                                {#if $bgv_config_store.is_email_verification_mandatory =="1"}
                                <div class="ml-2">   
                                    <div class="ErBlueButton w-auto mt-3 cursor-pointer " on:click={verify_new_otp}>Verify</div>
                                </div>
                                {/if}

                            </div>
                            
                            <div class="text-red-500 ml-2" id="email_msg"></div>
                        </div>
                        

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable">Phone Number<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="number" class="inputboxbgv" bind:value="{$bgv_data_store.phone_number}">
                                    
                                            <div class="text-red-500" id="phone_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">DOB<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="date" id = "dob" class="inputboxbgv" bind:value="{$bgv_data_store.basic_info_dob}"
                                            max={new Date().toISOString().split('T')[0]}>
                                            
                                        <div class="text-red-500" id="dob_msg"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Date of Birth<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="date" id = "dob" class="inputboxbgv" bind:value="{$}"
                                           >
                                            
                                        <div class="text-red-500" id="dob_msg"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div> -->
                        

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Spouse Name <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.spouse_name}">
                                            
                                            <div class="text-red-500" id="spo_msg"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <!-- <p class="smNotebgv"> If Applicable
                                        </p> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex mt-2">
                            <div class="formGroupBaseLine ">
                                <label class="formLable">Gender<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">

                                    <div class="text-center items-center flex ">

                                        <div class="flex items-center mr-4">
                                            <input id="radio1" type="radio" name="radio" class="hidden"
                                                 bind:group="{gend_selected}" value="Male"/> 
                                            <label for="radio1" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Male</label>
                                        </div>

                                        <div class="flex items-center ">
                                            <input id="radio2" type="radio" name="radio" class="hidden" bind:group="{gend_selected}" value="Female"/>
                                            <label for="radio2" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Female</label>
                                        </div>
                                        </div>
                                        <div class="text-red-500" id="gend_msg"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {#if $facility_data_store.org_id =="FT"}
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Delivery Model<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                <select class="inputboxbgv" bind:value="{$bgv_data_store.delivery_model}">
                                    <option value="">Select</option> 
                                    <option value="Normal Delivery">Normal Delivery</option> 
                                    <option value="Duet Model Delivery">Duet Model (EV) Delivery</option>
                                    <option value="Not Applicable" >Not Applicable</option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                    <div class="text-red-500" id="del_msg"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Station Model<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                <select class="inputboxbgv" bind:value="{$bgv_data_store.station_model}">
                                    <option value="">Select</option> 
                                    <option value="ODH">ODH</option> 
                                     <option value="LMA">LMA</option>
                                     <option value="APM" >APM</option>
                                     <option value="CBM" >CBM</option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                    <div class="text-red-500" id="stat_msg"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Hub Name for Casper ID<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                <select class="inputboxbgv" bind:value="{$bgv_data_store.hub_name}">
                                    <option class="pt-6" value="">Select</option>
                                        {#each casper_id_arr as casper_data}
                                        <option>{casper_data}</option>
                                        {/each}
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                    <div class="text-red-500" id="hub_msg"></div>
                                </div>
                            </div>
                        </div>
                        {/if}
                    

                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterAction">
                    <div on:click={routeToOnboardsummary} class="backButton">
                        <img src="{$img_url_name.img_name}/arrowleft.png" alt="">
                    </div>
                    <!-- <button on:click={()=>{temp="b"}} class="saveandproceed">Save &
                        Proceed</button> -->
                        <button on:click={() => next_clicked("basicInfo")} class="saveandproceed">Save &
                            Proceed</button>
                </div>
            </div>
        </div>
        {/if}


        <!-- Address Details -->
        {#if temp=="b"}
        <!-- {#if demoflag == "is_address_info_mandatory"} -->
        <!-- {#if $bgv_config_store.is_address_info_mandatory =="1"} -->
        <!-- {#if $bgv_config_store } -->
        <!-- {#if mandatory_det_arr.includes("is_address_info_mandatory=01")} -->
        <div class="formSection {is_address_visible}">
            <div class="onboardForm ">
                <div class="formTextSection">
                    <p class="smxslabel"> Submit address details </p>
                    <p class="formHeadingLabel xs:hidden sm:hidden">Submit address details </p>
                    <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                        required </p>
                </div>
                <form action="#">
                    <div class="formElements">
                        <div class="flex">
                            <div class="formGroup py-1">
                                <label class="formLable ">Address Proof Copy <span
                                        class="mandatoryIcon">*</span></label>
                                
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <label class="cursor-pointer">
                                                <div class="uploadbutton">Upload</div>
                                                <!-- <input type="file" class="hidden"> -->
                                                <input
                                                                    type="file"
                                                                    class="hidden"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"address_upload"
                                                                        )}
                                                                        bind:value = "{new_address_url}"
                                                                />

                                            </label>
                                            <div class="flex">
                                                {#if new_address_name}
                                                <p>{new_address_name}</p>
                                               <img
                                               on:click={() => delete_files("address_upload")}
                                               class="pl-2 cursor-pointer"
                                               src="{$img_url_name.img_name}/blackclose.svg"
                                               alt=""
                                               
                                           />
                                           {/if}
                                        </div>
                                        <div class="text-red-500" id="add_up_msg"></div>
                                            
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span> Photo must
                                            be clear and in JPG, PNG, or PDF format to process faster
                                            verification
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex mt-2">
                            <div class="formGroupBaseLine ">
                                <label class="formLable text-right xs:text-left sm:text-left">Current Address
                                    same as <br> this address?
                                    <span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">

                                    <div class="text-center items-center flex ">

                                        <div class="flex items-center mr-4">
                                             <!-- <input id="radio1" type="radio" name="radio" class="hidden"
                                                 bind:group="{gend_selected}" value="Male"/> 
                                            <label for="radio1" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Male</label>
                                        </div> -->
                                            <input id="radio13" type="radio" name="radio1" class="hidden"
                                            bind:group="{curr_same}" value="Yes"/>
                                            <label for="radio13" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Yes</label>
                                        </div>

                                        <div class="flex items-center ">
                                            <input id="radio23" type="radio" name="radio1" class="hidden" 
                                            bind:group="{curr_same}" value="No"/>
                                            <label for="radio23" class="radioLable">
                                                <span class="radioCirle"></span>
                                                No</label>
                                        </div>
                                        </div>
                                        <div class="text-red-500" id="curr_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Full Address <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv"
                                                bind:value="{$bgv_data_store.full_address}">
                                                <div class="text-red-500" id="full_add_msg"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">State<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    {#if !$bgv_data_store.state}
                                    <select class="inputboxbgv" bind:value="{new_selected_state}">
                                        <option class="pt-6">Select</option>
                                        {#each get_state_data as state_data}
                                        <option>{state_data.state_name}</option>
                                        {/each}
                                        </select>
                                        {:else}
                                    <select class="inputboxbgv" bind:value="{$bgv_data_store.state}">
                                        <option class="pt-6">Select</option>
                                        {#each get_state_data as state_data}
                                        <option>{state_data.state_name}</option>
                                        {/each}
                                    </select>
                                    {/if}
                                    <div class="formSelectArrow ">
                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                    <div class="text-red-500" id="state_msg"></div>
                                   
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <!-- <label class="formLable ">District<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">

                                    <select class="inputboxbgv">
                                        <option class="pt-6">Select</option>
                                        <option>Pune</option>
                                        <option>Mumbai</option>
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                </div> -->
                                <label class="formLable ">District<span
                                    class="mandatoryIcon">*</span></label>
                                 <div class="xs:w-full sm:w-full">
                                <div class="flex  items-center">
                                    <div class="formInnerGroup ">
                                        <input type="text" class="inputboxbgv"
                                            bind:value="{$bgv_data_store.district}">
                                            <div class="text-red-500" id="dist_msg"></div>
                                    </div>
                                    <div>
                                        <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">City / Taluka / Town<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    {#if !$bgv_data_store.state}
                                    <select class="inputboxbgv" bind:value="{$bgv_data_store.city}">
                                        <!-- <option class="pt-6" value = "">Select</option> -->
                                        <option class="pt-6">Select</option>
                                        {#each city_data as new_city}
                                        <option>{new_city.location_name}</option> 
                                        {/each} 
                                    </select>
                                    {:else}
                                    <p></p>
                                    <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.city}">
                                    {/if}

                                    <div class="formSelectArrow ">
                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                    <div class="text-red-500" id="citymsg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Pin Code<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.pin_code}">
                                    <div class="text-red-500" id="pin_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Landmark<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.landmark}">
                                    <div class="text-red-500" id="land_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex mt-2">
                            <div class="formGroupBaseLine ">
                                <label class="formLable text-right">Residential Type<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">

                                    <div class="text-center items-center flex ">

                                        <div class="flex items-center mr-4">
                                            <!-- <input id="radio1" type="radio" name="radio" class="hidden"
                                                 bind:group="{gend_selected}" value="Male"/> 
                                            <label for="radio1" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Male</label> -->
                                            <input id="radio133" type="radio" name="radio11" class="hidden"
                                                bind:group="{$bgv_data_store.residence_type}" value="Own"/>
                                            <label for="radio133" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Own</label>
                                        </div>

                                        <div class="flex items-center mr-4">
                                            <input id="radio233" type="radio" name="radio11" class="hidden" 
                                            bind:group="{$bgv_data_store.residence_type}" value="Rent"/>
                                            <label for="radio233" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Rent</label>
                                        </div>
                                        <div class="flex items-center ">
                                            <input id="radio234" type="radio" name="radio11" class="hidden" 
                                            bind:group="{$bgv_data_store.residence_type}" value="Other"/>
                                            <label for="radio234" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Other</label>
                                        </div>
                                        
                                    </div>
                                    <div class="text-red-500" id="resid_msg"></div>

                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Period of Stay<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="number" class="inputboxbgv" bind:value="{$bgv_data_store.period_of_stay}">
                                    <div class="text-red-500" id="stay_per_msg"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Stay From <span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img src="{$img_url_name.img_name}/calender.svg" class="placeholderIcon" alt="">
                                    </span>
                                    <input type="date" class="inputbox"  
                                    max={new Date().toISOString().split('T')[0]}
                                    bind:value="{$bgv_data_store.stay_from}">
                                    <div class="text-red-500" id="st_from_msg"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Stay Till <span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img src="{$img_url_name.img_name}/calender.svg" class="placeholderIcon" alt="">
                                    </span>
                                    <input type="date" class="inputbox"  
                                    min={new Date().toISOString().split('T')[0]}
                                    bind:value="{$bgv_data_store.stay_till}">
                                    <div class="text-red-500" id="st_till_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Family Contact Number<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="number" class="inputboxbgv"   bind:value="{$bgv_data_store.contact_number}">
                                    <div class="text-red-500" id="contact_msg"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterActionSubmit">
                    <div on:click={() => back_btn_click("addressInfo")} class="backButton">
                        <img src="{$img_url_name.img_name}/arrowleft.png" alt="">
                    </div>
                    <div>
                        <button on:click={() => next_clicked("addressInfo")} class="saveandproceed">Save and Proceed</button>

                    </div>
                </div>
            </div>
        </div>
        {/if}


        <!-- PAN Details -->
        {#if temp=="c"}
        <!-- {#if demoflag == "is_pan_info_mandatory"} -->
        <!-- {#if $bgv_config_store.is_pan_info_mandatory =="1"} -->
        <!-- {#if mandatory_det_arr.includes("is_pan_info_mandatory1")} -->
        <div class="formSection {is_pan_visible}">
            <div class="onboardForm ">
                <div class="formTextSection">
                    <p class="smxslabel"> Submit PAN Card details </p>
                    <p class="formHeadingLabel xs:hidden sm:hidden">Submit PAN Card details </p>
                    <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                        required </p>
                </div>
                <form action="#">
                    <div class="formElements">
                        <div class="flex">
                            <div class="formGroup py-1">
                                <label class="formLable ">PAN Card Copy <span
                                        class="mandatoryIcon">*</span></label>
                                        <div class="xs:w-full sm:w-full">
                                            <div class="flex  items-center">
                                                <div class="formInnerGroup ">
                                                    <label class="cursor-pointer">
                                                        <div class="uploadbutton">Upload</div>
                                                        <!-- <input type="file" class="hidden"> -->
                                                        <input
                                                                    type="file"
                                                                    class="hidden"
                                                                    bind:value = "{new_pan_url}"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"pancard_upload"
                                                                        )}
                                                                        
                                                                />

                                                    </label>
                                                <div class="flex">
                                                    {#if new_pan_name}
                                                    <p>{new_pan_name}</p>
                                                   <img
                                                   on:click={() => delete_files("pancard_upload")}
                                                   class="pl-2 cursor-pointer"
                                                   src="{$img_url_name.img_name}/blackclose.svg"
                                                   alt=""
                                                   
                                               />
                                               {/if}
                                            </div>
                                            <div class="text-red-500" id="pan_up_msg"></div>
                                                    
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="smNotebgv"><span class="font-medium">Note:</span> Photo must
                                                    be clear and in JPG, PNG, or PDF format to process faster
                                                    verification
                                                </p>
                                            </div>
                                        </div>
                            </div>
                        </div>


                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">PAN Card Number <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.pancard_number}">
                                            <div class="text-red-500" id="pan_num_msg"></div>

                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span>PAN number
                                            must be same as per attached PAN card to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Full Name as on PAN Card<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.pan_full_name}">
                                            <div class="text-red-500" id="pan_full_name"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span>Full Name
                                            must be same as per attached PAN card to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">DOB as on Pancard <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="date" class="inputboxbgv" bind:value="{$bgv_data_store.pan_dob}">
                                            <div class="text-red-500" id="pan_dob_msg"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span>DOB must be
                                            same as per attached PAN card to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Father's Name as on PAN Card<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.pan_father_name}">
                                            <div class="text-red-500" id="pan_fat_msg"></div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span> Father’s
                                            name must be same as per attached PAN card to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterActionSubmit">
                    <div on:click={() => back_btn_click("panInfo")} class="backButton">
                        <img src="{$img_url_name.img_name}/arrowleft.png" alt="">
                    </div>
                    <div>

                        <button on:click={() => next_clicked("panInfo")} class="saveandproceed">Save and Proceed</button>
                    </div>
                </div>
            </div>
        </div>
        {/if}


        <!-- Driving License Details -->
        {#if temp=="d"}
        <!-- {#if demoflag == "is_driving_license_mandatory"} -->
        <!-- {#if $bgv_config_store.is_driving_license_mandatory == "1"} -->
        <!-- {#if mandatory_det_arr.includes("is_driving_license_mandatory1")} -->
        <div class="formSection {is_dl_visible}" >
            <div class="onboardForm ">
                <div class="formTextSection">
                    <p class="smxslabel"> Submit Driving license details </p>
                    <p class="formHeadingLabel xs:hidden sm:hidden">Submit Driving license details </p>
                    <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                        required </p>
                </div>
                <form action="#">
                    <div class="formElements">
                        <div class="flex">
                            <div class="formGroup py-1">
                                <label class="formLable ">Driving License Copy <span
                                        class="mandatoryIcon">*</span></label>
                                        <div class="xs:w-full sm:w-full">
                                            <div class="flex  items-center">
                                                <div class="formInnerGroup ">
                                                    <label class="cursor-pointer">
                                                        <div class="uploadbutton">Upload</div>
                                                        <!-- <input type="file" class="hidden"> -->
                                                        <input
                                                                    type="file"
                                                                    class="hidden"
                                                                    bind:value = "{new_dl_url}"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"license_upload"
                                                                        )}
                                                                        
                                                                />

                                                    </label>
                                                    <div class="flex">
                                                        {#if new_dl_name}
                                                        <p>{new_dl_name}</p>
                                                       <img
                                                       on:click={() => delete_files("license_upload")}
                                                       class="pl-2 cursor-pointer"
                                                       src="{$img_url_name.img_name}/blackclose.svg"
                                                       alt=""
                                                       
                                                   />
                                                   {/if}
                                                </div>
                                                <div class="text-red-500" id="dl_up_msg"></div>
                                                   
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="smNotebgv"><span class="font-medium">Note:</span> Photo must
                                                    be clear and in JPG, PNG, or PDF format to process faster
                                                    verification
                                                </p>
                                            </div>
                                        </div>
                            </div>
                        </div>


                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Driving License Number <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.license_number}">
                                            <div class="text-red-500" id="lic_num_msg"></div>
                                        </div>
                                        <div>
                                            <img src="{$img_url_name.img_name}/edit.png" class="editbgv" alt="">
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span>Driving
                                            license number must be same as per attached DL copy to avoid
                                            rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Name as on Driving License<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="text" class="inputboxbgv"  bind:value="{$bgv_data_store.name_license}">
                                            <div class="text-red-500" id="lic_name_msg"></div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span>Name must be
                                            same as per attached attched DL copy to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">DOB as on Driving License<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <input type="date" class="inputboxbgv"  bind:value="{$bgv_data_store.dl_dob}">
                                            <div class="text-red-500" id="lic_dob_msg"></div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span>DOB must be
                                            same as per attached DL copy to avoid rejection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Date of Issue <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img src="{$img_url_name.img_name}/calender.svg" class="placeholderIcon" alt="">
                                    </span>
                                    <input type="date" class="inputbox" 
                                    max={new Date().toISOString().split('T')[0]}
                                    bind:value="{$bgv_data_store.dl_issue_date}">
                                    <div class="text-red-500" id="dl_issue_msg"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Date of Expiry <span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <span class="searchicon">
                                        <img src="{$img_url_name.img_name}/calender.svg" class="placeholderIcon" alt="">
                                    </span>
                                    <input type="date" class="inputbox" 
                                    min={new Date().toISOString().split('T')[0]}
                                    bind:value="{$bgv_data_store.dl_expiry_date}">
                                    <div class="text-red-500" id="dl_expiry_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Issuing State<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">

                                    <select class="inputboxbgv" bind:value="{$bgv_data_store.dl_state}">
                                        <option class="pt-6">Select</option>
                                        <!-- <option>Haveli</option>
                                        <option>Mulshi</option>  -->
                                        {#each get_state_data as states}
                                        <option>{states.state_name}</option>
                                        {/each}
                                    </select>
                                    <div class="formSelectArrow ">
                                        <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">
                                    </div>
                                    <div class="text-red-500" id="dl_issue_st_msg"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterActionSubmit">
                    <div on:click={() => back_btn_click("dlInfo")} class="backButton">
                        <img src="{$img_url_name.img_name}/arrowleft.png" alt="">
                    </div>
                    <div>

                        <button on:click={() => next_clicked("dlInfo")}  class="saveandproceed">Save and Proceed</button>
                    </div>
                </div>
            </div>
        </div>
        {/if}



        <!-- Police Verification Details -->
        {#if temp=="e"}
        <!-- {#if demoflag == "is_police_verification_mandatory"} -->
        <!-- {#if $bgv_config_store.is_police_verification_mandatory == "1"} -->
    <!-- {#if mandatory_det_arr.includes("is_police_verification_mandatory1")} -->
        <div class="formSection {is_police_visible}">
            <div class="onboardForm ">
                <div class="formTextSection">
                    <p class="smxslabel"> Submit police verification details </p>
                    <p class="formHeadingLabel xs:hidden sm:hidden">Submit police verification details </p>
                    <p class="formRequiredtext "><span class="text-mandatorysign">* </span>marked fields are
                        required </p>
                </div>
                <form action="#">
                    <div class="formElements">

                        <div class="flex">
                            <div class="formGroupbgv items-center ">
                                <label class="formLable ">Police verification Copy </label>
                                <div class="xs:w-full sm:w-full">
                                    <div class="flex  items-center">
                                        <div class="formInnerGroup ">
                                            <label class="cursor-pointer">
                                                <div class="uploadbutton">Upload</div>
                                                <!-- <input type="file" class="hidden"> -->
                                                <input
                                                                    type="file"
                                                                    class="hidden"
                                                                    bind:value = "{new_pol_url}"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"police_upload"
                                                                        )}
                                                                        
                                                                />
                                            </label>
                                            <div class="flex">
                                                {#if new_pol_name}
                                                <p>{new_pol_name}</p>
                                               <img
                                               on:click={() => delete_files("police_upload")}
                                               class="pl-2 cursor-pointer"
                                               src="{$img_url_name.img_name}/blackclose.svg"
                                               alt=""
                                               
                                           />
                                           {/if}
                                        </div>
                                        <div class="text-red-500" id="pol_up_msg"></div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="smNotebgv"><span class="font-medium">Note:</span> Photo must
                                            be clear and in JPG, PNG, or PDF format to process faster
                                            verification
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex mt-2">
                            <div class="formGroupBaseLine ">
                                <label class="formLable">Address Type<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">

                                    <div class="text-center items-center flex ">

                                        <div class="flex items-center mr-4">
                                            <!-- <input id="radio1" type="radio" name="radio" class="hidden"
                                                 bind:group="{gend_selected}" value="Male"/> 
                                            <label for="radio1" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Male</label>
                                        </div> -->

                                            <input id="radio112" type="radio" name="radio22" class="hidden"
                                            bind:group="{police_add_per}" value="Permanant"/> 
                                            <label for="radio112" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Permanant</label>
                                        </div>

                                        <div class="flex items-center ">
                                            <input id="radio222" type="radio" name="radio22" class="hidden"
                                             bind:group="{police_add_per}" value="Temporary"/>
                                            <label for="radio222" class="radioLable">
                                                <span class="radioCirle"></span>
                                                Temporary</label>
                                        </div>
                                        <div class="text-red-500" id="pol_add_type"></div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Name<span class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.candidate_name}">
                                    <div class="text-red-500" id="pol_name_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Guardian's Name<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="text" class="inputboxbgv" bind:value="{$bgv_data_store.guardian_name}">
                                    <div class="text-red-500" id="guard_msg"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="formGroup ">
                                <label class="formLable ">Verified Address<span
                                        class="mandatoryIcon">*</span></label>
                                <div class="formInnerGroup ">
                                    <input type="text" class="inputboxbgv"
                                    bind:value="{$bgv_data_store.police_verified_address}">
                                    <div class="text-red-500" id="pol_ver_add"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div class="onboardFormNot ">
                <div class="formFooterActionSubmit">
                    <div on:click={() => back_btn_click("policeInfo")} class="backButton">
                        <img src="{$img_url_name.img_name}/arrowleft.png" alt="">
                    </div>
                    <div>
                        <button on:click={() => next_clicked("policeInfo")} class="saveandproceed">Save</button>
                        <button class="saveandproceed hidden">Sumbit</button>
                    </div>
                </div>
            </div>
        </div>
        {/if}
        
    </div>
</div>

{#if temp=="f"}
<div on:click="{routeToOnboardsummary}">
    <div class="modalWrappersuccess"
        id="modal-id">
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class="modalsuccessbody ">
            <div class="">
                <div class="mainbodyModal">

                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none"
                        class="w-16 h-16 flex items-center text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M39 0C17.4962 0 0 17.4962 0 39C0 60.5038 17.4962 78 39 78C60.5038 78 78 60.5038 78 39C78 17.4962 60.5038 0 39 0ZM60.797 28.7368L35.8722 53.4662C34.406 54.9323 32.0602 55.0301 30.4962 53.5639L17.3008 41.5414C15.7368 40.0752 15.6391 37.6316 17.0075 36.0677C18.4737 34.5038 20.9173 34.406 22.4812 35.8722L32.9398 45.4511L55.2256 23.1654C56.7895 21.6015 59.2331 21.6015 60.797 23.1654C62.3609 24.7293 62.3609 27.1729 60.797 28.7368Z"
                            fill="#6AC259" />
                    </svg>

                    <h2 class="successTextgreen ">Details Submitted Successfully</h2>
                        <!-- <p class="successDes">Now Intiate for background verification</p> -->
                </div>

            </div>
        </div>
    </div>
</div>
{/if}


<!--Email OTP Modal-->
<div class="hidden" id="otp_model_new">
    <div class="viewDocmodal " >
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class=" w-full  max-w-2xl  relative mx-auto my-auto  shadow-lg rounded-lg bg-white xs:mx-2">
            <div class="">
                <div class="viewDocmainbodyModal">
                    <div class="flex justify-between mb-5">
                        <div class="leftmodalInfo">
                            <p class="font-medium">
                               Email OTP Verification
                            </p>
                        </div>
                        <div class="rightmodalclose">
                            <img 
                            on:click={close_otp_model}
                            class="pl-2 cursor-pointer"
                            src="{$img_url_name.img_name}/blackclose.svg"
                            alt=""
                            
                        />
                        </div>
                    </div>
                    <hr>

                    <div class="innermodal py-4 px-4">

                        <div class="grid grid-cols-5 gap-4 items-end ">
                            <div class="formField col-span-4">
                                <label class="text-greycolor font-light text-sm text-left ">Enter OTP  </label>
                                <div class="w-full ">
                                    <input type="text" class="inputboxVMT" bind:value={otp_num}>
                                </div>
                            </div>
                            <button class="ErBlueButton w-auto mt-3 " on:click={send_otp_func}>Send OTP</button>

                          </div>

                          <button class="px-4 py-2 rounded-sm text-white bg-bgGreenlight w-auto mt-4 " on:click={verify_email_otp}>Verify Email OTP</button>

                    </div>

                </div>

            </div>
        </div>
    </div>
</div>

<!--Mobile OTP Modal-->

<Toast type={toast_type}  text={toast_text}/>


