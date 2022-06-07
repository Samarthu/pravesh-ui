
     <script>
        
            import { onMount } from "svelte";
            import { bank_data_to_store,cheque_data_to_store } from "../../stores/onboardsummary_store";
        
            import {get_date_format} from "../../services/date_format_servives";
            import {bank_details,cheque_details,facility_document,show_fac_tags,get_loc_scope,
                facility_data,facility_bgv_init,all_facility_tags,gst_details,client_details,add_gst_dets,
                list_child_data,remove_child,reset_deact_status,child_data} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store";
            import { paginate, LightPaginationNav } from "svelte-paginate";
            // const { paginate,LightPaginationNav } = require('svelte-paginate');
            import Spinner from "./spinner.svelte";
            import {logged_user} from '../../services/supplier_services';
            // import  {  page } from '$app/stores';
            import { page } from '$app/stores';
            import {documents_store} from '../../stores/document_store';
            import { goto } from "$app/navigation";
            import { allowed_pdf_size } from "../../services/pravesh_config";
            import {uploadDocs} from "../../services/bgv_services";
            import Toast from './toast.svelte';
            import {get_cas_user, activate_cas_user , create_cas_user} from "../../services/vmt_verify_services"
            // import {check_facility_status} from '.././onboardsummaryComponent.svelte';

            let show_spinner = false;
            let toast_text;
            let toast_type;
            let routeNext = "";
            let routeBgv = "";
            let temp2 = "gst1";
            let child = "linkchild";
            let childlink = "childlink"; 
            let all_tags_obj= {};
        let query;
            let tags_for_ass_arr=[];
            let check_selected = false;
            let id_new_date='';
            let all_tags_res;
            export let fac_photo_obj = {
                profile_url:null,
                profile_verified:null,
                profile_rejected:null
            }
            export let addproof_obj = {
                address_name:null,
                address_url:null,
                address_verified:null,
                address_rejected:null
            };
        export let gst_doc_obj = {
                gst_name:null,
                gst_url:null,
                gst_doc_num:null,
                gst_verified:null,
                gst_rejected:null
            };
        export let pancard_obj = {
                pan_num:null,
                pan_attach:null,
                pan_name:null,
                pan_verified:null,
                pan_rejected:null
        }
        export let admin;
        let child_selected_arr=[];
        let new_child_selected_arr = [];
        let child_check = false;
        let unique_id;
        let show_gst_view_btn = false;
        
            let text_pattern = /^[a-zA-Z_ ]+$/;
        //     let recrun_pattern =  /^[^-\s](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9 _-]+)$/;
            let city_select;
            let city_select_flag=0;
            let cheque_data;
        export let facility_created_date;
        let bank_details_res;
        let facility_doc_date,facility_modified_date;
            let client_det_arr=[];
            export let gst_doc_arr;
            let file_data;
            // let showbtn = 0;
        export let facility_address;
        export let facility_password;
        export let city;
        export let facility_postal;
        export let is_adhoc_facility;
        let gst_edit_btn = 0;
        //     let facility_address,facility_postal,facility_password,city,location_id,status_name;
            let new_fac_remarks = [];

            let city_data=[];
            let scope_data=[];
            let result;
            let gst_city_link_state="";
            let gst_state_code = "";
            let gst_city_loc_id="";
        //     /////////////////////svelte plugin pagiantion//////////
            let items=[];
            let currentPage = 1;
            let pageSize = 10;
            let paginatedItems=[];
            let push_pop = false;
        //     let change_to = "Associate_details";
        //     //////GST vars////////////
            let username;
            
            let gst_address=""
            let gst_city_select=""
            let gst_number=""
            let gst_file=""
            let gst_upload_message ="";
            let gst_number_message ="";
            let gst_city_message ="";
            let gst_add_message = "";
            let gst_img = "";
            let gst_uniq_name = "";
            let gst_data="";
            let gst_file_data= "";
            let gst_checkbox = false;
            let gst_details_data=[];
        // ///////Document view Model/////////
            let alt_image="";
            let image_path;
            let cas_flag = 0;
            let active_flag = 0;
            let create_cas_flag = 0;
        // /////////Document view Model//////
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
                console.log("citySelect",city_select);
                link_child(city_select)
                }
            }
            let searchTerm;
            $:if(searchTerm == ''){
                clearedSearchFunc();
            }
            $:new_pages = [];
            $:for(let i=0;i<scope_data.length;i++){
                
                console.log("gst_city_select 1",gst_city_select);
                if(scope_data[i].location_name == gst_city_select){
                    gst_city_link_state = scope_data[i].location_state;
                    gst_city_loc_id = scope_data[i].location_id;
                    gst_state_code = scope_data[i].state_code;
                }
                }
            
            $:if(gst_checkbox === true){
                gst_checkbox = true;
            }
            $:if(check_selected === true){
                check_selected =true;
            }
            $:paginatedItems = paginate({ items, pageSize, currentPage })


    onMount(async () => {

    //     let facility_data_res = await facility_data();
    //     try{
    //         if(facility_data_res != "null"){
    //     let id_date_format = new Date($facility_data_store.details_updated_on);
    //     id_new_date = get_date_format(id_date_format,"dd-mm-yyyy-hh-mm");
        
    //     // new_fac_remarks = $facility_data_store.remarks.split("\n");
       
        
    //     let new_facility_date_format = new Date($facility_data_store.creation);
    //     facility_created_date = get_date_format(new_facility_date_format,"dd-mm-yyyy-hh-mm");
        
    //     console.log("facility_created_date",facility_created_date)
    //     let new_doc_date_format = new Date($facility_data_store.creation);
    //     facility_doc_date =get_date_format(new_doc_date_format,"dd-mm-yyyy-hh-mm");
        
    //     let facility_date_format = new Date($facility_data_store.modified);
    //     facility_modified_date = get_date_format(facility_date_format,"dd-mm-yyyy-hh-mm");
        
        

    //         if($facility_data_store.status.includes("Rejected")){
               
    //             $facility_data_store.status = "Rejected";
    //             status_name = $facility_data_store.status;
    //         }
    //         if ($facility_data_store.password == "") {
    //             facility_password = "-";
    //         }
    //         for (var j = 0;j < $facility_data_store.addresess.length;j++){
    //             for(let k=0;k<scope_data.length;k++){
    //                 if($facility_data_store.addresess[j].state == scope_data[k].location_state){
    //                     gst_doc_type[j] = "gst-certificate-" + scope_data[k].state_code;
    //                 }
    //             }
    //             gst_doc_type=gst_doc_type
                
    //             if ($facility_data_store.addresess[j].default_address == "1") {
    //                 facility_address =$facility_data_store.addresess[j].address;
    //                 facility_postal =$facility_data_store.addresess[j].postal;
    //                 city = $facility_data_store.addresess[j].city;
    //                 location_id = $facility_data_store.addresess[j].location_id;

    //             }
    //         }
    //     }
    // }
    // catch(err){
    //     console.log("error",err)
    // }

    //     let facility_data_res = await facility_data();
    //     try{
    //         if(facility_data_res != "null"){
              
    //     facility_data_store.set(
    //         JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
        
    //     )
    //         for (var j = 0;j < $facility_data_store.addresess.length;j++){
    //             for(let k=0;k<scope_data.length;k++){
    //                 if($facility_data_store.addresess[j].state == scope_data[k].location_state){
    //                     gst_doc_type[j] = "gst-certificate-" + scope_data[k].state_code;
    //                 }
    //             }
    //             gst_doc_type=gst_doc_type
                
    //             if ($facility_data_store.addresess[j].default_address == "1") {
    //                 facility_address =$facility_data_store.addresess[j].address;
    //                 facility_postal =$facility_data_store.addresess[j].postal;
    //                 city = $facility_data_store.addresess[j].city;
    //                 location_id = $facility_data_store.addresess[j].location_id;

    //             }
    //         }
            
    //         for (var i = 0; i < facility_document_data.length; i++) {
    //             for(let j=0; j<gst_doc_type.length;j++){
    //                 if(facility_document_data[i].doc_type == gst_doc_type[j]){
    //                     gst_doc_obj = {gst_name : facility_document_data[i].file_name,
    //                         gst_url : facility_document_data[i].file_url,
    //                         gst_doc_num : facility_document_data[i].doc_number,
    //                         gst_verified : facility_document_data[i].verified,
    //                         gst_rejected : facility_document_data[i].rejected};
                        
                        
    //                     // var gst_name = facility_document_data[i].file_name;
    //                     // var gst_url = facility_document_data[i].file_url;
    //                     // var gst_doc_num = facility_document_data[i].doc_number;
    //                     // gst_verified = facility_document_data[i].verified;
    //                     // gst_rejected = facility_document_data[i].rejected;
    //                     gst_doc_arr.push({"gst_name":gst_doc_obj.gst_name,"gst_url":gst_doc_obj.gst_url,"gst_doc_num":gst_doc_obj.gst_doc_num});
    //                 }
    //             }
    //         }
    //         gst_doc_arr=gst_doc_arr;
    //         console.log("gst_doc_arr",gst_doc_arr)
    //         console.log("gst_doc_arr",gst_doc_arr.gst_doc_num)
    //     }
    // }
    // catch(err) {
    //     toast_type = "error";
    //     toast_text = facility_data_res.body.message;
        
    //     }
        let loc_data_res =  await get_loc_scope();
        try {
        if(loc_data_res.body.status == "green"){
             for(let i=0;i<loc_data_res.body.data.length;i++){
                city_data.push(loc_data_res.body.data[i].location_name);
                scope_data.push(loc_data_res.body.data[i]);
                
            }
            city_data.sort((a, b) => (a > b) ? 1 : -1);
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
    
        // console.log("is adhoc",is_adhoc_facility)
        //     if(is_adhoc_facility == true){
        //         console.log("inside id isadhoc")
        //         // gst_details.style.display = "none";
        //     }
    
    });

    const onFileSelected = (e,doctext) => {
       if(doctext == "gst_edit_upload"){
        console.log("in file reader gst")
        let gst_url = "";
           for(let i=0;i<gst_doc_arr.length;i++){
            console.log("in file reader for loop",gst_doc_arr)
               if(e == gst_doc_arr[i].doc_number){
                            var request = new XMLHttpRequest();
                            request.open('GET', gst_doc_arr[i].file_url, true);
                            request.responseType = 'blob';
                            request.onload = function() {
                                var reader = new FileReader();
                                reader.readAsDataURL(request.response);
                                reader.onload =  function(e){
                                    gst_url = e.target.result;
                                    console.log('DataURL:', e.target.result);
                                    console.log("in file reader if loop",gst_url)
                                };
                            };
                            request.send();
                console.log("in file reader if loop",gst_url)
                gst_file_data = gst_url;
                console.log("in file reader if loop",gst_file_data)
               }
           }
            
            
       }
       else{
        let img = e.target.files[0];
        if (img.size <= allowed_pdf_size) {
            console.log("img", img);
            
            if(doctext == "gst_upload"){
                console.log("Photo log uploaded")  
                gst_img = img.name;
            }
            else if(doctext == "cheque_upload"){
            cheque_img = img.name;
            }
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function () {
            // file_data = reader.result;
            console.log("reader",reader.result);
            
            if(doctext == "gst_upload"){
                gst_data = reader.result;
                // console.log("photo_data",reader.result);
                toast_text = "Photo Uploaded Successfully";
                toast_type = "success";
            }
            else if(doctext == "cheque_upload"){
                cheque_data = reader.result;
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
        
    }
    function closeViewModel(){
        document.getElementById("img_model").style.display = "none";
    }
    function openViewModel(data,doc_number){
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
                if(doc_number == gst_doc_arr[i].doc_number){
                image_path = $page.url.origin+gst_doc_arr[i].file_url;
                alt_image = "gst proof";
            }
            }
        }
        
        
    }
    
            
    //     function editWorkDetail() {
    //     let replaceState = false;
    //     goto(routeNext, { replaceState });
    // }  
    async function gstModel() {
        console.log("gst_doc_arr",gst_doc_arr)
        gst_city_link_state="";
        modalidgst.style.display = "block";
        let gst_details_res = await gst_details();
        try{
            if(gst_details_res != "null"){
                gst_details_data=[];
                console.log("gst_details_res",gst_details_res)
                
                for(let i=0;i < gst_details_res.body.data.length;i++){
                            // for(let j = 0;j<gst_doc_arr.length;j++){ 
                                
                            //     console.log("matching",gst_details_res.body.data[i].gstn,gst_doc_arr[j].doc_number)
                            //     if(gst_details_res.body.data[i].gstn == gst_doc_arr[j].doc_number){
                            //         console.log("Matched")
                            //         show_gst_view_btn = true;
                            //     } 
                            //     // else{ 
                            //     //     console.log("Inside else")
                            //     //     show_gst_view_btn = false;
                            //     // }  
                               
                            // }
                            gst_details_data.push(gst_details_res.body.data[i]);

                            
                }
                for(let i=0;i<gst_details_data.length;i++){
                    console.log("gst_details_data",gst_details_data[i])
                    gst_details_data[i].show_view_btn = false;
                    for(let j = 0;j<gst_doc_arr.length;j++){ 
                                
                    //     console.log("matching",gst_details_res.body.data[i].gstn,gst_doc_arr[j].doc_number)
                        if(gst_details_data[i].gstn == gst_doc_arr[j].doc_number){
                            // console.log("Matched")
                            gst_details_data[i].show_view_btn = true;
                    } 
                              
                }
            }
                


                gst_details_data=gst_details_data;
                console.log("gst_details_data here",gst_details_data,show_gst_view_btn)
            }
            
        }
        catch(err) {
            toast_type = "error";
            toast_text = gst_details_res.body.message;
            
        }
    }
    function closeGST() {
        modalidgst.style.display = "none";
        gst_address = "";
        gst_city_select = "-1";
        gst_city_link_state = "";
        gst_number = "";
        gst_file ="";
        gst_img = "";

    }
    async function gst_edit_click(new_gst){
        console.log("new_gst",new_gst)
        gst_edit_btn = 1;
        for(let i=0;i<gst_doc_arr.length;i++){

             let gst_doc_type =  "gst-certificate-" + new_gst.gstn.substring(0, 2);
             console.log("gst_doc_type",gst_doc_type)
            
            if(gst_doc_arr[i].doc_type == gst_doc_type){
                console.log("inside if",gst_doc_arr)
                // onFileSelected(new_gst.gstn,"gst_edit_upload")
                // console.log("gst_file_datagst_file_data",gst_file_data)
                gst_file = gst_doc_arr[i].file_url
                gst_img = gst_doc_arr[i].file_name

            }else{
                console.log("inside else")
                gst_file = "";
                gst_img = "";
            }
        }
        
        // console.log("gst_edit_click",address,city,state,gstn,gst_url,gst_name);
        if(temp2 != "gst2"){
            temp2 = "gst2";
        }
        else{
            temp2 = temp2;
        }
        

        gst_address = new_gst.address;
        gst_city_select = new_gst.city;
        gst_city_link_state = new_gst.state;
        gst_number = new_gst.gstn;
        gst_file = gst_file;
        gst_img = gst_img;
        gst_uniq_name = new_gst.name;
       
    }

    async function gst_edit_submit(){
        console.log("gst_doc_arr",gst_doc_arr)
        console.log("gst_edit_btn here",gst_edit_btn,gst_uniq_name)
        let gst_doc_submit_res;
        let gst_add_res;
        let def_add = 0;
        show_spinner = true;
        if(!gst_address.match(text_pattern)){
            gst_add_message = "Enter Valid Address";
            show_spinner = false;
            return  
        }
        if(!gst_city_select){
            gst_city_message = "Select Valid City";
            show_spinner = false;
            return;
        }
        console.log("gst details for gst number",gst_number,gst_state_code,pancard_obj.pan_num,gst_number.trim().length,gst_number.substring(0, 2),gst_number.substring(2, 12),gst_number.substring(13,14))
        if (gst_number == undefined) {
            gst_number_message = "Invalid GST Number";
            show_spinner = false;
        return;
        }
        
        if(gst_checkbox == true){
            def_add = 1;
        }
        else{
            def_add = 0;
        }
            const gst_details_form = {
                "address":gst_address,
                "city":gst_city_select,
                "state":gst_city_link_state,
                "tier":"2",
                "location_id":gst_city_loc_id,
                "default_address":def_add,
                "gstn":gst_number,
                "name":gst_uniq_name,
                "address_type":"Facility Address",
                "doctype":"Facility Address"
            }
            
            let new_gst_payload = {
                "facility_id":$facility_id.facility_id_number,
                "address":[gst_details_form]
            }
            console.log("new_gst_payload",new_gst_payload)
            
            gst_add_res = await add_gst_dets(new_gst_payload);
            try {
                if(gst_add_res.body.status == "green"){
                    console.log("gst_add_res",gst_add_res)
                    toast_type = "success";
                    toast_text = "GST Details Added Successfully";
                    
                    // let new_doc_type = "gst-certificate-"+gst_state_code;
                    // console.log("new_doc_type",new_doc_type)
                    // const gst_file_data = {"documents":[{"file_name":gst_img,"doc_category":"GST Certificate","status":"created","resource_id":$facility_id.facility_id_number,"user_id":username,"doc_number":gst_number,"pod":gst_file,"doc_type":new_doc_type,"facility_id":$facility_data_store.facility_id}]}
                    // gst_doc_submit_res = await uploadDocs(gst_file_data);
                    // try {
                    //     if(gst_doc_submit_res.body.status == "green"){
                    //                 show_spinner = false;
                    //                 toast_type = "success";
                    //                 toast_text = "GST Document Added Successfully";
                    //     }
                    //     else if(gst_doc_submit_res.body.status == "red"){
                    //         toast_type = "error";
                    //         toast_text = gst_doc_submit_res.body.message;
                    //         show_spinner = false;
                    //     }
                    // } catch (err) {
                    //     show_spinner = false;
                    //     toast_type = "error";
                    //     toast_text = "Error in Uploading GST Certificate";
                    // }
                }
                else{
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = gst_add_res.body.message;
                }
                
            } catch (err) {
                show_spinner = false;
                toast_type = "error";
                toast_text = "Error in Adding GST Details";
            }
            
            if(gst_add_res.body.status=="green"){
                let gst_details_res = await gst_details();
                try{
                    
                    if(gst_details_res != "null"){
                        gst_details_data=[];
                        console.log("gst_details_res ss",gst_details_res)
                        for(let i=0;i < gst_details_res.body.data.length;i++){
                            console.log("inside for")
                            
                            // for(let i = 0;i<gst_doc_arr.length;i++){
                            //     console.log("inside an for")
                                // if(gst_details_res.body.data[i].gstn == gst_doc_arr[i].doc_number){
                                    
                                    gst_details_data.push(gst_details_res.body.data[i]);
                                    console.log("gst_details_data b4",gst_details_data)
                                // }  
                            // }
                        }
                        gst_details_data=gst_details_data;
                        console.log("gst_details_data here",gst_details_data)
                    }
                    show_spinner = false;
                }
                catch(err) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = gst_details_res.body.message;
                    
                }
            }  
    }


    async function gst_submit_click(){
        let gst_doc_submit_res;
        let gst_add_res;
        let def_add = 0;
        show_spinner = true;
        if(!gst_address.match(text_pattern)){
            gst_add_message = "Enter Valid Address";
            show_spinner = false;
            return  
        }
        if(!gst_city_select){
            gst_city_message = "Select Valid City";
            show_spinner = false;
            return;
        }
        console.log("gst details for gst number",gst_number,gst_state_code,pancard_obj.pan_num,gst_number.trim().length,gst_number.substring(0, 2),gst_number.substring(2, 12),gst_number.substring(13,14))
        if (gst_number == undefined || gst_number.trim().length < 15 || gst_number.substring(0, 2) != gst_state_code || gst_number.substring(2, 12) != pancard_obj.pan_num || gst_number.substring(13,14) != "Z") {
            gst_number_message = "Invalid GST Number";
            show_spinner = false;
            return;
        }
        if(!gst_file){
            gst_upload_message = "Invalid File Upload"
            show_spinner = false;
            return;
        }
        if(gst_checkbox == true){
            def_add = 1;
        }
        else{
            def_add = 0;
        }
            const gst_details_form = {
                "address":gst_address,
                "city":gst_city_select,
                "state":gst_city_link_state,
                "tier":"2",
                "location_id":gst_city_loc_id,
                "default_address":def_add,
                "gstn":gst_number,
                "name":"",
                "address_type":"Facility Address",
                "doctype":"Facility Address"
            }
            
            let new_gst_payload = {
                "facility_id":$facility_id.facility_id_number,
                "address":[gst_details_form]
            }
            console.log("new_gst_payload",new_gst_payload)
            
            gst_add_res = await add_gst_dets(new_gst_payload);
            try {
                if(gst_add_res.body.status == "green"){
                     show_spinner = false;
                    // console.log("gst_add_res",gst_add_res)
                    // toast_type = "success";
                    // toast_text = "GST Details Added Successfully";
                    
                    let new_doc_type = "gst-certificate-"+gst_state_code;
                    // console.log("new_doc_type",new_doc_type)
                    const gst_file_data = {"documents":[{"file_name":gst_img,"doc_category":"GST Certificate","status":"created","resource_id":$facility_id.facility_id_number,"user_id":username,"doc_number":gst_number,"pod":gst_data,"doc_type":new_doc_type,"facility_id":$facility_data_store.facility_id}]}
                    gst_doc_submit_res = await uploadDocs(gst_file_data);
                    try {
                        if(gst_doc_submit_res.body.status == "green"){
                                    toast_type = "success";
                                    toast_text = "GST Details Added Successfully";
                        }
                        else if(gst_doc_submit_res.body.status == "red"){
                            toast_type = "error";
                            toast_text = gst_doc_submit_res.body.message;
                        }
                       
                    } catch (err) {
                        show_spinner = false;
                        toast_type = "error";
                        toast_text = "Error in Uploading GST Certificate";
                    }
                }
            } catch (err) {
                show_spinner = false;
                toast_type = "error";
                toast_text = "Error in Adding GST Details";
            }
            location.reload();
            // let new_doc_type = "gst-certificate-"+gst_state_code;
            //         console.log("new_doc_type",new_doc_type)
            //         const gst_file_data = {"documents":[{"file_name":gst_img,"doc_category":"GST Certificate","status":"created","resource_id":$facility_id.facility_id_number,"user_id":username,"doc_number":"","pod":gst_data,"doc_type":new_doc_type,"facility_id":$facility_data_store.facility_id}]}
            // console.log("gst_doc_arr",gst_doc_arr)
            // if(gst_doc_submit_res.body.status == "green" && gst_add_res.body.status=="green"){
            //     // gst_details_data=[];
            //     let gst_details_res = await gst_details();
            //     try{
            //         if(gst_details_res != "null"){
            //             console.log("gst_details_res",gst_details_res)
            //                 console.log("gst_doc_arr",gst_doc_arr)
            //             for(let i=0;i < gst_details_res.body.data.length;i++){
            //                 console.log("gst_details_res",gst_details_res.body.data[i].gstn)
            //                 console.log("gst_doc_arr",gst_doc_arr[i].doc_number)
            //                 for(let i = 0;i<gst_doc_arr.length;i++){
            //                     if(gst_details_res.body.data[i].gstn == gst_doc_arr[i].doc_number){
            //                         // console.log("gst_details_res.body.data[i].gstn",gst_details_res.body.data)
            //                         gst_details_data.push(gst_details_res.body.data[i]);
            //                     }  
            //                 }
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
    }
            
    async function linkChild() {
        let no_com = document.getElementById("comma");
        linkChildModel.style.display = "block";

        let list_child_data_res = await list_child_data();
        // console.log("list_child_data_res",list_child_data_res)
        try {
            if (list_child_data_res.body.status == "green") {
                childlink = "childlink2";
                for (let i = 0; i < list_child_data_res.body.data[0].parent_child.length; i++) {
                    // console.log("list_child_data_temp", list_child_data_res.body.data[0].parent_child)
                    console.log("list_child_data_res", list_child_data_res.body.data[0])
                    child_selected_arr.push(list_child_data_res.body.data[0].parent_child[i]);
                }
                console.log("child_selected_arr in link child", child_selected_arr)
            }
        } catch (err) {
            toast_type = "error";
            toast_text = list_child_data_res.body.message;
        }

    }
    function reset_deact_func(){
        if($facility_data_store.is_blacklisted == 0){
            Reset_confirmation_modal.style.display = "block";
        }
        else if($facility_data_store.is_blacklisted == 1){
            toast_type = "error";
            toast_text = "Reset Deactivation status not allowed for Blacklisted Facility!!!";
        }
    }
    function close_reset_deact_tab(){
        Reset_confirmation_modal.style.display = "none";
    }
    async function confirm_reset_deact_tab(){
        let reset_deact_res = await reset_deact_status();
        try {
            if (reset_deact_res.body.status == "green") {
                toast_type = "success";
                toast_text = reset_deact_res.body.message;
            //     let facility_data_res = await facility_data();
            //     try{
            //         if(facility_data_res != "null"){
                    
            //     facility_data_store.set(
            //         JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
                
            //     )

            //     duplicate_facility_data_store.set(
            //         JSON.parse(JSON.stringify(facility_data_res.body.data[0]))
            //     )
                
            //     let id_date_format = new Date($facility_data_store.details_updated_on);
            //     id_new_date = get_date_format(id_date_format,"dd-mm-yyyy-hh-mm");
                
                
            //     let new_facility_date_format = new Date($facility_data_store.creation);
            //     facility_created_date = get_date_format(new_facility_date_format,"dd-mm-yyyy-hh-mm");
                
            //     let new_doc_date_format = new Date($facility_data_store.creation);
            //     facility_doc_date =get_date_format(new_doc_date_format,"dd-mm-yyyy-hh-mm");
                
            //     let facility_date_format = new Date($facility_data_store.modified);
            //     facility_modified_date = get_date_format(facility_date_format,"dd-mm-yyyy-hh-mm");
                
                

            //         if($facility_data_store.status.includes("Rejected")){
                    
            //             $facility_data_store.status = "Rejected";
            //             status_name = $facility_data_store.status;
            //         }
            //         if ($facility_data_store.password == "") {
            //             facility_password = "-";
            //         }
            //         for (var j = 0;j < $facility_data_store.addresess.length;j++){
            //             for(let k=0;k<scope_data.length;k++){
            //                 if($facility_data_store.addresess[j].state == scope_data[k].location_state){
            //                     gst_doc_type[j] = "gst-certificate-" + scope_data[k].state_code;
            //                 }
            //             }
            //             gst_doc_type=gst_doc_type
                        
            //             if ($facility_data_store.addresess[j].default_address == "1") {
            //                 facility_address =$facility_data_store.addresess[j].address;
            //                 facility_postal =$facility_data_store.addresess[j].postal;
            //                 city = $facility_data_store.addresess[j].city;
            //                 location_id = $facility_data_store.addresess[j].location_id;

            //             }
            //         }
                    
            //         for (var i = 0; i < facility_document_data.length; i++) {
            //             for(let j=0; j<gst_doc_type.length;j++){
            //                 if(facility_document_data[i].doc_type == gst_doc_type[j]){
            //                     gst_doc_obj = {gst_name : facility_document_data[i].file_name,
            //                         gst_url : facility_document_data[i].file_url,
            //                         gst_doc_num : facility_document_data[i].doc_number,
            //                         gst_verified : facility_document_data[i].verified,
            //                         gst_rejected : facility_document_data[i].rejected};
                                
            //                     gst_doc_arr.push({"gst_name":gst_doc_obj.gst_name,"gst_url":gst_doc_obj.gst_url,"gst_doc_num":gst_doc_obj.gst_doc_num});
            //                 }
            //             }
            //         }
            //         gst_doc_arr=gst_doc_arr;
            //         // console.log("gst_doc_arr",gst_doc_arr)
            //     }
            // }
            // catch(err) {
            //     toast_type = "error";
            //     toast_text = facility_data_res.body.message;
                
            //     }
            window.location.reload();
            }
        } catch (err) {
            toast_type = "error";
            toast_text = reset_deact_res.body.message;
        }
    }

    
    function check_facility_status(message) {
        if (!$facility_data_store.status && $facility_data_store.status != undefined && ($facility_data_store.status.toLowerCase() == "deactive" || $facility_data_store.is_blacklisted == 1)) {
            if (message != undefined){
                toast_text = message;
                toast_type = "error";
            }
            else{
                toast_text = "Request not allowed for Deactive/Blacklisted Facility";
                toast_type = "error";
            return false;
            }
        }
        return true;
    }

    async function link_child(data){
        client_det_arr = [];
        if (!check_facility_status("Add Child Facilities not allowed for Deactive/Blacklisted Facility")) {
        return;
        }
        show_spinner = true;
        let client_det_res = await client_details(data);
        // console.log("client_det_res",client_det_res)
        try{
           
            if(client_det_res.body.status == "green"){
                
                show_spinner = false;
                
                for(let i=0;i<client_det_res.body.data.length;i++){
                    // for(let j=0;j<client_det_res.body.data.length;j++){
                    client_det_res.body.data[i]["checked"] = false;
                    client_det_arr.push(client_det_res.body.data[i]);
                    // }
                }
                console.log("client_det_arr here",client_det_arr)
                client_det_arr=client_det_arr;
                items = client_det_arr;
                
                
                paginatedItems = paginate({ items, pageSize, currentPage })
                
            }
            else{
                paginatedItems = [];
                show_spinner = false;
            }
        }
        catch(err){
            show_spinner = false;
            toast_type = "error";
            toast_text = err;
        }
        
    }


    async function checkbox_clicked(item){
        let new_object = {facility_name:item.facility_name, name:item.name , unique_name:""}
        unique_id = item.name
        
        // child_check = document.getElementById("child_checkbox"+item.name).checked;
        
        child_check = !item["checked"];   

        console.log("item and check value",item,child_check)
        if(child_check == true){
            if (!child_selected_arr.filter(e => e.name === item.name).length > 0) {
                   console.log("pushing")
                   child_selected_arr.push(new_object);
                   new_child_selected_arr.push(new_object);
                }
        
        }
        else if(child_check == false && child_selected_arr.length > 0){
            
            for(let j = 0;j<child_selected_arr.length;j++){
                var new_index = "";
                if (child_selected_arr.filter(e => e.name === item.name).length > 0) {
                    // console.log("markde",item.name,child_selected_arr[j].name)
                    if(item.name == child_selected_arr[j].name){
                        new_index = child_selected_arr[j]
                    }
                    // console.log("popping",child_selected_arr.indexOf(new_index))
                    const index = child_selected_arr.indexOf(new_index);
                    // console.log("INDEx",index)
                    if(index > -1) {
                        child_selected_arr.splice(index, 1);
                        
                    }
                }
               
            }

            for(let j = 0;j<new_child_selected_arr.length;j++){
                var new_index = "";
                if (new_child_selected_arr.filter(e => e.name === item.name).length > 0) {
                    // console.log("markde",item.name,child_selected_arr[j].name)
                    if(item.name == new_child_selected_arr[j].name){
                        new_index = new_child_selected_arr[j]
                    }
                    // console.log("popping",new_child_selected_arr.indexOf(new_index))
                    const index = new_child_selected_arr.indexOf(new_index);
                    // console.log("INDEx",index)
                    if(index > -1) {
                        
                        new_child_selected_arr.splice(index, 1);
                    }
                }
               
            }

        }
        console.log("child_selected_arr neww",child_selected_arr,new_child_selected_arr)

    }

    async function child_submit_fun(){
        show_spinner = true;
        console.log("Spinner")
        if(new_child_selected_arr.length == 0){
            show_spinner = false;
            toast_type = "error";
            toast_text = "Please select atleast one child";
        }
        else{
        console.log("new_child_selected_arrnew_child_selected_arr",new_child_selected_arr)
        let new_child_obj = [];
        childlink = "childlink2";
        for(let i = 0;i<new_child_selected_arr.length;i++){
            new_child_obj.push(
            {"parent_facility_id":$facility_id.facility_id_number,
            "status":"active",
            "child_facility_id":new_child_selected_arr[i].name,
            "child_id":new_child_selected_arr[i].facility_name,
            "parent_name":$facility_data_store.facility_name,
            "parent_id":$facility_data_store.facility_id})
        }
       
        // console.log("new_child_obj",new_child_obj)
       let child_submit_res = await child_data(new_child_obj);

       try{
           if(child_submit_res.body.status == "green"){
            toast_text = child_submit_res.body.message;
            toast_type = "success";
            let list_child_data_res = await list_child_data();
                try {
                    if (list_child_data_res.body.status == "green") {
                       
                        child_selected_arr = [];
                        new_child_selected_arr = [];
                        
                        for (let i = 0; i < list_child_data_res.body.data[0].parent_child.length; i++) {
                            // console.log("list_child_data_temp", list_child_data_res.body.data[0].parent_child)
                            child_selected_arr.push(list_child_data_res.body.data[0].parent_child[i]);
                        }
                        child_selected_arr=child_selected_arr
                        city = city;
                        console.log("child_selected_arr in link child", child_selected_arr)
                    }
                } catch (err) {
                    toast_type = "error";
                    toast_text = err;
                }
                // document.getElementById("child_checkbox"+unique_id).checked = false;
                link_child(city_select);
                show_spinner = false;
                
            }
           else{
            show_spinner = false;
            toast_text = "Child Adding Failed";
            toast_type = "error";
           }
       }
       catch(err){
        show_spinner = false;
        toast_text = err;
        toast_type = "error";
       }
    }
        
    }

    
    async function delete_child(child_id){
        show_spinner = true;
        console.log("child_id",child_id)
        let delete_child_res =await remove_child(child_id);
        console.log("delete_child_res",delete_child_res)
        try {
            if(delete_child_res.body.status == "green"){
                toast_type = "success";
                toast_text = delete_child_res.body.message;
                let list_child_data_res = await list_child_data();
                try {
                    if (list_child_data_res.body.status == "green") {
                        child_selected_arr = [];
                        for (let i = 0; i < list_child_data_res.body.data[0].parent_child.length; i++) {
                            // console.log("list_child_data_temp", list_child_data_res.body.data[0].parent_child)
                            child_selected_arr.push(list_child_data_res.body.data[0].parent_child[i]);
                        }
                        city = city;
                        console.log("child_selected_arr in link child", child_selected_arr)
                    }
                } catch (err) {
                    show_spinner = false;
                    toast_type = "error";
                    toast_text = err;
                }
                link_child(city_select);
                console.log("child_check",child_check)
                show_spinner = false;
            }
        } catch (error) {
            show_spinner = false;
            toast_type = "error";
            toast_text = delete_child_res.body.message;
        }

    
    }

    function linkChildModelclose() {
        city_select = "-1";
        linkChildModel.style.display = "none";
    }
    

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
        client_det_arr = [];
        let client_det_res=await client_details(city_select);
        // try{
        //     show_spinner = true;
        //     if(client_det_res.body.status == "green"){
        //         paginatedItems = [];
        //         show_spinner = false;
        //         for(let i=0;i<client_det_res.body.data.length;i++){
                    
        //                 client_det_arr.push(client_det_res.body.data[i]);
                    
        //         }
                
        //         items=client_det_arr;
      
        //         paginatedItems = paginate({ items, pageSize, currentPage })
        //         console.log("safter search",paginatedItems)
        //         result = true;
                
                
        //     }
        //     else{
        //         show_spinner = false;
        //     }
        // }
        // catch(err) {
        //     show_spinner = false;
        //     toast_type = "error";
        //     toast_text = err;
        // }
        try{
           
           if(client_det_res.body.status == "green"){
               
               show_spinner = false;
               
               for(let i=0;i<client_det_res.body.data.length;i++){
                   // for(let j=0;j<client_det_res.body.data.length;j++){
                   client_det_res.body.data[i]["checked"] = false;
                   client_det_arr.push(client_det_res.body.data[i]);
                   // }
               }
               console.log("client_det_arr here",client_det_arr)
               client_det_arr=client_det_arr;
               items = client_det_arr;
               
               
               paginatedItems = paginate({ items, pageSize, currentPage })
               
           }
           else{
               paginatedItems = [];
               show_spinner = false;
           }
       }
       catch(err){
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
        items = searchArray;
        console.log("searchArray",items)
        paginatedItems = paginate({ items, pageSize, currentPage })
        console.log("paginated search",paginatedItems)
    }
   

    async function openCasUser(){
        let get_cas_user_res = await get_cas_user()
        show_spinner = true;
        console.log("get_cas_user_res",get_cas_user_res)

        if(get_cas_user_res.body.status == "green"){
            show_spinner = false;
            toast_text = "User is active";
            toast_type = "success";
        }
        else{
            showCasUser.style.display = "block";
            show_spinner = false;
            if(get_cas_user_res.message = "User is Deactive in CAS" || get_cas_user_res.status == "red"){
                cas_flag = 1;
                toast_text = "user is deactive"
                toast_type = "error"
            }
            else{
                cas_flag = 2;
            }
        }
    }

    async function activate_cas(){
        let activate_cas_res = await activate_cas_user()
        show_spinner = true;
        try {
            if(activate_cas_res.body.status == "green"){
                show_spinner = false;
                active_flag = 1;
                toast_text = "CAS is Active"
                toast_type = "success"
            }
        } catch (error) {
            toast_text = "Error occured while CAS Activation"
            toast_type = "error"
        }
    }

    async function create_cas(){
        let create_cas_user_res = await create_cas_user()
        show_spinner = true;
        try {
            if(create_cas_user_res.body.status == "green"){
                show_spinner = false;
                create_cas_flag = 1;
                toast_text = "CAS User is Created"
                toast_type = "success"
            }
        } catch (error) {
            toast_text = "Error occured while CAS creation"
            toast_type = "error"
        }
    }

    function closeCasUser(){
        showCasUser.style.display = "none";
    }
    
    </script>
        {#if show_spinner}
            <Spinner />
        {/if}
     
     <!-- Associate Details -->
     <div class="bg-white w-full associate_Details_Section ">
         <div class="detailsHeader_summary ">
            
             <div class="right flex justify-end">
                 <p class="detailsUpdate mr-4">
                     <span><span class="font-medium">Last updated -> </span>{#if !facility_created_date}<p>-</p>{:else}{facility_created_date}{/if} <span
                             class="font-medium"> By -> </span> {#if !$facility_data_store.owner} <p>-</p> {:else}{$facility_data_store.owner}{/if}</span>
                 </p>
                 <p class="flex items-center smButtonText">
                     <!-- TODO -->
                     <!-- <a href="" class="smButton bg-erBlue text-white" on:click={()=>{goto("associatedetails")}}>
                         Edit
                     </a> -->
                     <button class="smButton bg-erBlue text-white" on:click={()=>{goto("associatedetails")}}>
                        Edit

                     </button>
                     {#if $facility_data_store.status == "Deactive"}
             
                        <button
                            class="flex smButton bg-erBlue text-white ml-5"
                            on:click="{reset_deact_func}">Reset Deactivation Status</button
                        >
             {/if}
                 </p>
                 <div class="userStatus ml-4">
                    <p class="flex items-center smButtonText" on:click="{openCasUser}">
                        <a href="" class="smButton modal-open">
                            CAS User Status
                        </a>
                    </p>
                </div>
                 
             </div>
             

         </div>

         <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1" >
             <div class=" grid grid-cols-3 w-full px-5 mt-5  gap-4">
                 
                 {#if fac_photo_obj.profile_url == null}
                 <div class="">
                    <img src="{$img_url_name.img_name}/delivery.png" class="w-28 h-28 xsl:h-auto" alt="">
                </div>
                <div class="w-auto col-span-2 mt-6 xsl:mt-3">
                <div class="text-2xl xsl:text-xl break-all">{#if $facility_data_store.facility_name}{$facility_data_store.facility_name}{:else}<p>-</p>{/if}</div>
                <p class="imgName">{#if $facility_data_store.facility_name}{$facility_data_store.facility_name}{:else}<p>-</p>{/if}
                </div>
                {:else}
                 <div class="">
                     <img src="{$page.url.origin+fac_photo_obj.profile_url}" class="w-28 h-28 xsl:h-auto" alt="">
                 </div>
                 <div class="w-auto col-span-2 mt-6 xsl:mt-3">
                 <!-- <div class="text-2xl xsl:text-xl break-all">{$facility_data_store.facility_name}</div>
                 <p class="imgName">{$facility_data_store.facility_name}</p>
                 </div> -->
                 <div class="text-2xl xsl:text-xl break-all">{#if $facility_data_store.facility_name}{$facility_data_store.facility_name}{:else}<p>-</p>{/if}</div>
                <p class="imgName">{#if $facility_data_store.facility_name}{$facility_data_store.facility_name}{:else}<p>-</p>{/if}
                </div>
                 {/if}
             </div>

             <div class="contact_details">
                 <div class="px-5 py-4 text-erBlue font-medium">
                     <label for="">Contact Details</label>
                 </div>
                 <div class="userInfoSec px-5  flex items-start ">
                     <img src="{$img_url_name.img_name}/location1.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Address & Pincode</p>
                         {#if !facility_address}
                         <p>-</p>
                         {:else}
                         <p class="detailData">{facility_address}-{facility_postal} </p>
                         {/if}
                        
                     </div>
                 </div>

                 <div class="userInfoSec3 ">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/mobilephone.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Mobile Number</p>
                            {#if !$facility_data_store.phone_number}
                            <p>-</p>
                            {:else}
                            <p class="detailData">{$facility_data_store.phone_number}</p>
                            {/if}
                         </div>
                     </div>
                     <!-- <div class="userStatus ">
                         <p class="userStatusTick"><img src="{$img_url_name.img_name}/checked.png" alt="" class="pr-1"> Verified
                         </p>
                     </div> -->
                     {#if $facility_data_store.phone_verified == "1"}
                     
                         <p class="verifiedTextGreen pr-3">
                             <img
                                 src="{$img_url_name.img_name}/checked.png"
                                 alt=""
                                 class="pr-1"
                             />
                             Mobile number Verified
                         </p>
                    
                     {:else if $facility_data_store.phone_verified == "0"}
                         <p class="verifyText pr-3">
                             <img
                                 src="{$img_url_name.img_name}/timer.png"
                                 alt=""
                                 class="pr-2"
                             />
                             User activation pending
                         </p>
                    {/if}
                 </div>

                 <div class="userInfoSec3">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/email.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Email</p>
                             {#if !$facility_data_store.facility_email}
                             <p>-</p>
                             {:else}
                             <p class="detailData">{$facility_data_store.facility_email}</p>
                             {/if}
                         </div>
                     </div>
                     <!-- {#if $facility_data_store.email_verified == "1"}
                     
                         <p class="verifiedTextGreen pr-3">
                             <img
                                 src="{$img_url_name.img_name}/checked.png"
                                 alt=""
                                 class="pr-1"
                             />
                             Verified
                         </p>
                    
                     {:else if $facility_data_store.email_verified == "0"}
                         <p class="verifyText pr-3">
                             <img
                                 src="{$img_url_name.img_name}/timer.png"
                                 alt=""
                                 class="pr-2"
                             />
                             Verification Pending
                         </p>
                    {/if} -->
                 </div>
             </div>

             <div class="Documents">
                 <div class="px-5 py-4 text-erBlue font-medium">
                     <label for="">Documents</label>
                 </div>
                 
                 <div class="userInfoSecPadding">
                     <div class="wrapperInfoFirst">
                         <div class="flex items-start">
                             <img src="{$img_url_name.img_name}/addressproof.png" alt="">
                             <div class="pl-4">
                                 <p class="detailLbale">Address proof</p>
                             </div>
                         </div>
                         <!-- <div class="userStatus ">
                             
                         </div> -->
                     {#if addproof_obj.address_rejected == "1"}
                     <p class="rejectText pr-3">
                         <img
                             src="{$img_url_name.img_name}/reject.png"
                             alt=""
                             class="pr-2"
                         /> Reject
                     </p>
                     {:else if addproof_obj.address_verified == "1"}
                     
                         <p class="verifiedTextGreen pr-3">
                             <img
                                 src="{$img_url_name.img_name}/checked.png"
                                 alt=""
                                 class="pr-1"
                             />
                             Verified
                         </p>
                    
                     {:else if addproof_obj.address_verified == "0" && addproof_obj.address_rejected == "0"}
                         <p class="verifyText pr-3">
                             <img
                                 src="{$img_url_name.img_name}/timer.png"
                                 alt=""
                                 class="pr-2"
                             />
                             Verification Pending
                         </p>
                    {/if}

                     </div>
                     <div class="wrapperInfo ">
                         <div class="flex items-start">
                             <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                             <div class="pl-4 flex items-center">
                                 <img src="{$img_url_name.img_name}/jpeg.png" class="" alt="">
                                 {#if !addproof_obj.address_name}
                                 <p>Not Provided</p>
                                 {:else}
                                 <p class="detailLbale">{addproof_obj.address_name}</p>
                                 {/if}
                             </div>
                         </div>
                         <div class="userStatus ">
                             <p class="verifyText">
                                 {#if addproof_obj.address_url}
                                 <a href="" class="smButton">
                                     <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("address")}}">
                                 </a>
                                 {/if}
                             </p>
                         </div>
                     </div>


                 </div>
                 {#if is_adhoc_facility == false}
                 {#if admin == "false"}
                 <p></p>
                 {:else}
                 <div class="userInfoSec3" id="gst_details">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/gst.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">GST Details</p>
                             <!-- <p class="detailData">{gst_name}</p> -->
                         </div>
                     </div>
                     <div class="userStatus ">
                         <p class="flex items-center smButtonText" on:click={gstModel}>
                             <a href="" class="smButton modal-open">
                                 Add
                             </a>
                         </p>
                     </div>
                 </div>
                {/if}
                {/if}
             </div>

         </div> 

         <div class="border-gray-200 px-5 py-5">
             <hr>
         </div>

         <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1" >
             <div class="appcredentials">
                 <div class="headingWithIcon">
                     <img src="{$img_url_name.img_name}/mobileblue.png" alt="">
                     <p class="detailsTitle">Libera App Credentials</p>
                 </div>
             </div>
         </div>  

         <div class="grid grid-cols-3 gap-4  xsl:grid-cols-1 pb-5" >
             <div class="liberApp">
                 <div class="userInfoSec3 ">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/pan.png" alt="">
                         <div class="pl-4">
                             <!-- <p class="detailLbale">User ID</p>
                             <p class="detailData">dhiraj.shah@elastic.run</p> -->
                             <p class="detailLbale">User ID</p>
                            {#if !$facility_data_store.facility_id}
                            <p>-</p>
                            {:else}
                            <p class="detailData">{$facility_data_store.facility_id}</p>
                            {/if}
                         </div>
                     </div>

                 </div>
                 <div class="userInfoSec3 ">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/password.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Password</p>
                            {#if !facility_password}
                            <p>-</p>
                            {:else}
                            <p class="detailData">{facility_password}</p>
                            {/if}
                         </div>
                     </div>

                 </div>
             </div>
             {#if is_adhoc_facility == false}
             <div class="contact_details">
                 <div class="userInfoSec3">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/organization.png" alt="">
                         <div class="pl-4">
                             <p class="detailLbale">Link Child Associate</p>
                             <!-- <p class="detailData">2</p> -->
                         </div>
                     </div>
                     <div class="userStatus ">
                         <p class="flex items-center smButtonText" on:click={linkChild}>
                             <a href="" class="smButton modal-open">
                                 Link/View
                             </a>
                         </p>
                     </div>
                 </div>
                 <br>
             </div>
             {/if}
         </div> 
     </div>
     <!-- GST Details modal -->
<!--Full screen GST Details modal -->

<div class="hidden" id="modalidgst">

    <div class="modalMain">

        <div class="modalOverlay"></div>

        <div class="modalContainer">

            <div class="modalHeadCon">

                <div class="leftmodalInfo">

                    <p class="modalTitleText"> GST Details </p>

                    <p class="text-sm ">

                        <span class="font-medium text-lg">

                            {$facility_data_store.facility_name}</span

                        >

                        <span class="userDesignation">

                            - Associate- {$facility_data_store.facility_type}, {city}</span

                        >

                    </p>

                </div>

                <div class="rightmodalclose" on:click={closeGST}>

                    <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">

                </div>

            </div>

            <div class="modalContent">

                <div class="GstModalContent">

                    <div class="">

                        <div>

                            <div class="bgAddSection">

                                {#if temp2 == "gst1"}

                                <div class="addbuttongst ">

                                    <div class="updateAction" on:click={() => {

                                                        temp2 = "gst2";

                                                    }}>

                                        <button class="ErBlueButton">Add New GST Details</button>

                                    </div>

                                </div>

                                {/if}



                                {#if temp2 == "gst2"}

                                <div class="addGstForm">

                                    <div class="gstaddtitle px-4 py-4">

                                        <p class="text-lg font-medium">Add new GST details</p>

                                    </div>



                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">

                                        <div class="w-full">

                                            <div class="py-1">

                                                <div class="light14grey  mb-1">Address</div>

                                                <div class="w-full">

                                                    <input class="inputboxpopover" type="text" bind:value="{gst_address}">

                                                    <div class="text-red-500">{gst_add_message}</div>

                                                </div>

                                            </div>

                                        </div>



                                        <div class="w-full">

                                            <div class="light14grey mb-1">City</div>

                                            <div class="formInnerwidthfull ">

                                                <select

                                                    class="inputboxpopover"

                                                    bind:value={gst_city_select}

                                                >

                                                    <option class="pt-6"

                                                        value ="-1">Select</option

                                                    >

                                                    {#each city_data as new_city}

                                                    <option class="pt-6"

                                                        >{new_city}</option

                                                    >

                                                    {/each}

                                                    

                                                </select>

                                                <div class="text-red-500">{gst_city_message}</div>

                                                <div class="formSelectArrow ">

                                                    <img

                                                        src="{$img_url_name.img_name}/selectarrow.png"

                                                        class="w-5 h-auto"

                                                        alt=""

                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="flex gap-4 px-4 py-1 xsl:flex-wrap">

                                        <div class="w-full">

                                            <div class=" py-1 ">

                                                <div class="light14grey  mb-1">GST State</div>

                                                <div class="w-full">

                                                    <input class="inputboxpopover" type="text" bind:value="{gst_city_link_state}">

                                                </div>

                                            </div>

                                        </div>

                                        <div class="w-full">

                                            <div class="py-1">

                                                <div class="light14grey  mb-1">GST Number</div>

                                                <div class="w-full">

                                                    <input

                                                    class="inputboxpopover"

                                                    type="text"

                                                    bind:value="{gst_number}"

                                                />

                                                <div class="text-red-500">{gst_number_message}</div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    

                                    <div class="checkFormgroup">

                                        <input

                                            id="remember-me"

                                            name="remember-me"

                                            type="checkbox"

                                            placeholder="Your password"

                                            class="inputChecked"

                                            bind:checked = "{gst_checkbox}"

                                        />

                                        <label for="remember-me" class="onboardedText ">

                                            Default Address

                                        </label>

                                    </div>

                                    <div class="flex gap-4 px-4 xsl:flex-wrap">

                                        <div class="w-full">

                                            <div class="  py-3 ">

                                                <div class="light14greylong  mb-1">Upload GST Certificate</div>

                                                <div class="w-full">

                                                    <label class="cursor-pointer flex">

                                                        <div class="ErBlueButton">Select File</div>

                                                        <input type="file" class="hidden" on:change={(

                                                            e

                                                        ) =>

                                                            onFileSelected(

                                                                e,"gst_upload"

                                                            )}

                                                bind:value="{gst_file}">



                                                <div class="text-red-500">{gst_upload_message}</div>

                                                    </label>
                                                    <p>{gst_img}</p>



                                                </div>

                                            </div>

                                        </div>

                                        <div class="w-full">



                                        </div>

                                    </div>

                                    <div class="actionButtons">

                                        <div class="actionCancelbutton " on:click={() => {

                                            temp2 = "gst1";

                                        }}>

                                            Cancel

                                        </div>

                                        <div class="updateAction ml-5">
                                        {#if  gst_edit_btn == 1}
                                        <button class="ErBlueButton" on:click="{gst_edit_submit}">Add</button>
                                        {:else}
                                            <button class="ErBlueButton" on:click="{gst_submit_click}">Add</button>
                                        {/if}
                                        </div>

                                    </div>



                                </div>

                                {/if}

                            </div>



                        </div>

                        <div class="gstCardContainer">
                           

                            <table class="table  w-full text-center mt-2 xs:hidden sm:hidden">
                                <thead class="theadpopover h-10">
                                    <tr>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>
                                            GST State
                                        </th>
                                        <th>GST Number</th>
                                        <th>GST Certificate</th>
                                        <th>Edit</th>
                                        <th>Status</th>
                                       
                                    </tr>
                                </thead>
                                {#if !gst_details_data}

                                <p>No GST Details found</p>

                                {:else}

                                {#each gst_details_data as new_gst}
                                <tbody class="tbodypopover">
                                    <tr class="border-b">
                                        <td>{new_gst.address}</td>
                                        <td>{new_gst.city}</td>
                                        <td>{new_gst.state} </td>
                                        <td>{new_gst.gstn}</td>
                                        <td>{#if new_gst.show_view_btn == true}
                                            <!-- <p class="verifyText"> -->
                                                <button class="smButton">

                                                    <img

                                                        src="{$img_url_name.img_name}/view.png"

                                                        alt=""

                                                        on:click="{openViewModel("mult_gsts",new_gst.gstn)}"

                                                    />

                                                </button>

                                            <!-- </p> -->
                                            {/if}</td>
                                        <td>
                                            <p class="flex justify-center">
                                                    <p class="verifyText">

                                                        <button class="smButton">
                                                        <!-- {#if gst_doc.gst_doc_num == new_gst.gstn} -->
                                                       
                                                            <img

                                                                src="{$img_url_name.img_name}/edit.png"

                                                                on:click="{()=>{gst_edit_click(new_gst)}}"

                                                                alt="gst edit"

                                                            />
                                                            
                                                            <!-- {:else}
                                                          
                                                            <img

                                                                src="{$img_url_name.img_name}/edit.png"

                                                                on:click="{()=>{gst_edit_click(new_gst)}}"

                                                                alt="gst edit"

                                                            />
                                                            {/if} -->
                                                        </button>
                                            </p>
                                        </td>
                                        <td>
                                            <div class="statusSecForDoc">

                                                <p class="userStatusTick mr-8">
        
                                                    {#if gst_doc_obj.verified == "1"}
        
                                                <p
        
                                                    class="statusContentTag text-green font-normal xs:w-5/12"
        
                                                >
        
                                                    <img
        
                                                        src="{$img_url_name.img_name}/checked.png"
        
                                                        class="pr-2"
        
                                                        alt=""
        
                                                    />GST Verified
        
                                                </p>
        
                                                {:else if gst_doc_obj.rejected == "1"} 
        
                                                <p
        
                                                class="statusContentTag text-rejectcolor font-normal xs:w-5/12"
        
                                                >
        
                                                    <img
        
                                                        src="{$img_url_name.img_name}/reject.png"
        
                                                        class="pr-2"
        
                                                        alt=""
        
                                                    />GST Rejected
        
                                                </p>
        
                                                {:else if gst_doc_obj.verified == "0" && gst_doc_obj.rejected == "0"}
        
                                                <p class="statusContent font-normal xs:w-5/12">
        
                                                    <img
        
                                                        src="{$img_url_name.img_name}/timer.png"
        
                                                        class="pr-2"
        
                                                        alt=""
        
                                                    />GST Verification Pending
        
                                                </p>
        
                                                {/if}
        
                                                </p>
        
                                                
        
                                            </div>
                                        </td>
                                      
                                    </tr>
                                  
                                </tbody>
                                {/each}
                                {/if}
                            </table>
                            
                        </div>

                    </div>

                </div>



            </div>

        </div>

    </div>

</div>
<!-- GST full screen -->

<!--Full screen Link Child Associates modal -->



<div class="hidden" id="linkChildModel">

    <div class="modalMain">

        <div class="modalOverlay"></div>



        <div class="modalContainer">

            <div class="modalHeadCon sticky top-0 bg-white z-zindex99">

                <div class="leftmodalInfo">

                    <p class="modalTitleText"> Link Child Associates </p>

                    <p class="text-sm ">

                        <span class="font-medium text-lg">

                            {$facility_data_store.facility_name}</span

                        >

                        <span class="userDesignation">

                            - Associate- {$facility_data_store.facility_type}, MHPD - Mulsi

                            SP</span

                        >

                    </p>

                </div>

                <div class="rightmodalclose" on:click={linkChildModelclose}>

                    <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" alt="closemodal">

                </div>

            </div>

            <div class="modalContent">

                <div class="GstModalContent">

                    <hr>

                    <div class="scrollbar ">

                        <div class=" ">

                            <div class=" ">

                                <div class="addSecform ">

                                    <div class="my-3 py-4 px-4 ">

                                        <p class="text-lg font-medium">Linked Child Associates</p>

                                    </div>

                                    {#each child_selected_arr as new_child}
                                    {#if !child_selected_arr}
                                    <div

                                        class="light14greylong w-full mb-1 text-center"

                                    >

                                        No child assosiates are linked

                                    </div>

                                {:else}

                                    <!-- <div class="light14greylong w-full mb-1 text-center"> No child assosiates are linked</div> -->

                                    

                                    {#if childlink == "childlink2"}

                                    <div class="cardforlinkedChild px-5 border-b pb-3">

                                        <div class="flex justify-end">

                                            <div

                                            class="detailData"

                                            on:click={() => {delete_child(new_child.name)}}

                                        >

                                            <img

                                                src="{$img_url_name.img_name}/reject.png"

                                                width="25px"

                                                alt=""

                                            />

                                        </div>

                                        </div>

                                        <div class="flex ">

                                            <div class="w-1/3 ">

                                                <div class="detailLbale"> Location</div>

                                            </div>

                                            <div class="w-2/3 ">

                                                <div class="detailData"> {city_select}</div>

                                            </div>

                                        </div>

                                        <div class="flex ">

                                            <div class="w-1/3 ">

                                                <div class="detailLbale"> Facility Name</div>

                                            </div>

                                            <div class="w-2/3 ">
                                                {#if !new_child.child_facility_id}
                                                <p>-</p>
                                                {:else}
                                                <div class="detailData"> {new_child.child_facility_id}</div>
                                                {/if}
                                            </div>

                                        </div>

                                        <div class="flex ">

                                            <div class="w-1/3 ">

                                                <div class="detailLbale"> Unique ID</div>

                                            </div>

                                            <div class="w-2/3 ">

                                                <div class="detailData"> {new_child.name}</div>

                                            </div>

                                        </div>

                                    </div>

                                    {/if}
                                    {/if}
                                    {/each}











                                </div>





                            </div>

                            <div class=" ">

                                <div class=" ">

                                    <div class="bg-bglightyellow py-2 px-3 mt-2 ">

                                        <div class="flex items-center">

                                            <div class="detailLbale"> Tags added for this Associate

                                                <span class="detailData " id="rem_comma">

                                                    {#each tags_for_ass_arr as show_fac}

                                                    {show_fac}

                                                    {/each}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="flex  py-3 items-center ">

                                        <div class="light14grey mb-1">Select Location</div>

                                        <div class="formInnerGroup ">

                                            <select

                                            class="inputboxpopover"

                                            on:click={() => {

                                                child = "linkchild2";

                                            }}

                                            bind:value={city_select}

                                        >

                                            <option class="pt-6"

                                                value="-1">Select</option

                                            >

                                            {#each city_data as new_city}

                                            <option class="pt-6"

                                                >{new_city}</option

                                            >

                                            {/each}

                                        </select>

                                            <div class="formSelectArrow ">

                                                <img src="{$img_url_name.img_name}/selectarrow.png" class="w-5 h-auto" alt="">

                                            </div>

                                        </div>

                                    </div>



                                    <div class="searchSupplier " id="searchBox">

                                        <div class="formInnerGroup ">

                                            <span class="searchicon">

                                                <img

                                                    src="{$img_url_name.img_name}/search.svg"

                                                    class="placeholderIcon"

                                                    alt=""

                                                   />

                                            </span>

                                            <input bind:value="{searchTerm}"

                                                class="inputboxsearch"

                                                id="inputboxsearch"

                                                placeholder="Search"

                                                on:keypress="{enterKeyPress}"

                                                

                                            />

                                            <div class="serchCloseIconSection " id="">

                                                <div class="closeIconCon " on:click="{closeSearch}">

                                                    <img

                                                        src="{$img_url_name.img_name}/closeSearch.svg"

                                                        class="w-4 h-auto"

                                                        alt=""

                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div class=" searchClickbtn" on:click="{SearchClick}" >

                                        <p class="searchIconPlace">

                                            <img

                                                src="{$img_url_name.img_name}/search.svg"

                                                class="placeholderIcon"

                                                alt=""

                                            />

                                        </p>

                                    </div>



                                    <div class="OtherAppliedTagsTable ">

                                        <table class="table  w-full text-center mt-2 ">

                                            <thead class="theadpopover">

                                                <tr>

                                                    <th>Facility Name</th>

                                                    <th>Unique ID</th>

                                                    <th>Station</th>

                                                    <th>Mobile No</th>

                                                    <th>Select</th>

                                                </tr>

                                            </thead>

                                            <tbody class="tbodypopover">

                                                {#if child == "linkchild"}

                                                <tr class="hidden">

                                                    <td colspan="5" class="text-center">



                                                        <div class="light14greylong w-full mb-1">Select a

                                                            location to view Associates</div>

                                                    </td>

                                                </tr>

                                                {/if}

                                                {#if child == "linkchild2"}
                                                
                                                {#each paginatedItems as item}

                                                <tr class="border-b">

                                                    <td>{item.facility_name}</td>

                                                    <td>{item.name}</td>

                                                    <td>{item.station_code}</td>

                                                    <td>{item.phone_number}</td>
                                                    
                                                    <td
                                                            ><input
                                                                type="checkbox"
                                                                class=" checked:bg-blue-500 ..."
                                                                id={"child_checkbox"+item.name}
                                                                name={"child_checkbox"+item.name}
                                                                bind:checked="{item.checked}"
                                                               on:click={checkbox_clicked(item)}
                                                            /></td
                                                        > 
                                                </tr>
                                                {/each}
                                               
                                                {/if}



                                            </tbody>

                                        </table>



                                    </div>

                                </div>

                                <div class="paginationButton">

                                    <nav aria-label="Page navigation">

                                        <ul class="pagiWrapper ">

                                           

                                            <LightPaginationNav

                                                    totalItems="{client_det_arr.length}"

                                                    pageSize="{pageSize}"

                                                    currentPage="{currentPage}"

                                                    limit="{1}"

                                                    showStepOptions="{true}"

                                                    on:setPage="{(e) => currentPage = e.detail.page}"

                                                    />

                                            

                                        </ul>

                                    </nav>

                                </div>



                                <div class="LinkchildAssociate">

                                    <div class="text-right mt-3" on:click={() => {child_submit_fun()}}>

                                        <button class="ErBlueButton">Link Child Associate</button>

                                    </div>

                                </div>

                            </div>





                         

                        </div>

                    </div>



                </div>



            </div>

        </div>

    </div>

</div>

<!--Reset Deactivation Status Confirmation modal -->

<div id="Reset_confirmation_modal" class="hidden">
    <div  class="actionDialogueOnboard ">
        <div class="pancardDialogueOnboardWrapper ">
            <div class="relative bg-white rounded-lg shadow max-w-2xl w-full">
                <div class="modalHeadConmb-0">
                    <div class="leftmodalInfo">
                        <!-- <p class=""> Reject Reason</p> -->
                    </div>
                    <div class="rightmodalclose">
                        <img src="{$img_url_name.img_name}/blackclose.svg" class="modal-close cursor-pointer" on:click="{close_reset_deact_tab}">
                    </div>
                </div>
                <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8 " action="#">
    
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Are You Sure To Reset Deactivation Status!
                        </label>
                        <div class="relative">
                          <!-- <select class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value="{pan_info_res}">
                            <option value="" selected disabled>Select</option>
                            {#each rejReasonMap.panInfo as pan_info_rej}
                            <option>{pan_info_rej} </option>
                            {/each}
                          </select> -->
                          <br>
                          <br>
                          <div
                                class="flex  py-1 items-center flex-wrap"
                            >
                                <div class="formInnerGroup">
                                    <!-- <input
                                        class="inputboxpopover"
                                        type="text"
                                        bind:value="{blacklist_remark}"
                                    /> -->
                                    <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click="{close_reset_deact_tab}">Cancel</button>
                                    <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click="{confirm_reset_deact_tab}">Ok</button>
                                </div>
                            </div>
                          <!-- <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div> -->
                        </div>
                      </div>
                </form>
            </div>
        </div>
    </div> 
</div>

<!--Reset Deactivation Status Confirmation modal -->

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
                
                <img src={image_path} id="img_model_url" class="mx-auto" alt="{alt_image}">
                
                <div class="pt-3 flex justify-center">
                    <button data-modal-toggle="popup-modal" type="button" class="dialogueNobutton"  on:click="{()=>{closeViewModel()}}">Close</button>
            </form>
        </div>
    </div>
</div> 
<!-- Document view Model -->


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
                        User is Deactivated
                    </p>
                </div>
                <div class="pt-3 flex justify-center" on:click="{create_cas}">
                    <button type="button" class="dialogueSingleButton">Create User</button>
                </div>
                {:else if active_flag == 1}
                <div class="justify-center">
                    <p>
                        User is Activated
                    </p>
                </div>
                <div class="pt-3 flex justify-center" on:click="{create_cas}">
                    <button type="button" class="dialogueSingleButton">Create User</button>
                </div>
                {:else if create_cas_flag == 1}
                <div class="justify-center">
                    <p>
                        User is created
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
