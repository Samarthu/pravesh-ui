<script>

        import { DateInput, DatePicker } from "date-picker-svelte";
            import { onMount } from "svelte";
            import { bank_data_to_store,cheque_data_to_store} from "../../stores/onboardsummary_store";
            // import{bank_details_store} from "../../stores/bank_details_store"
            import { facility_data,facility_bgv_init,facility_bgv_check,all_facility_tags,
                    show_fac_tags,submit_fac_tag_data,remove_tag,tag_audit_trail,service_vendor,
                    get_loc_scope,client_details,erp_details,child_data,add_gst_dets,
                    facility_document,addnew_cheque_details,bank_details_info,cheque_details,gst_details} from "../../services/onboardsummary_services";
            import {img_url_name} from '../../stores/flags_store';
            import {facility_id} from "../../stores/facility_id_store"
            import {facility_data_store} from "../../stores/facility_store"
            import Spinner from "./spinner.svelte";
            import {logged_user} from '../../services/supplier_services';
            import  {  page } from '$app/stores';
            import {documents_store} from '../../stores/document_store';
            import { goto } from "$app/navigation";
            import { allowed_pdf_size } from "../../services/pravesh_config";    
            import {get_date_format} from "../../services/date_format_servives";
            import Toast from './toast.svelte';
            import { SvelteToast, toast } from '@zerodevx/svelte-toast'
            import {success_toast ,error_toast,warning_toast} from '../../services/toast_theme';
            import {approve_reject_status} from "../../services/vmt_verify_services";

        let show_spinner = false;
        let toast_text;
        let toast_type;
        let reject_doc;
        let approve_doc;
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
        export let bank_values_from_store;
       
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
        export let can_cheque_obj = {
            can_cheque_name:null,
            can_cheque_url:null,
            can_cheque_verified:null,
            can_cheque_rejected:null,
            can_cheque_num:null,
            can_cheque_type:null
        };
        export let blk_cheque_obj = {
            blk_cheque_name:null,
            blk_cheque_url:null,
            blk_cheque_verified:null,
            blk_cheque_rejected:null,
            blk_cheque_num:null,
            blk_cheque_type:null
        }
        export let passbook_obj = {
            passbook_name:null,
            passbook_url:null,
            passbook_verified:null,
            passbook_rejected:null,
            passbook_num:null,
            passbook_type:null
        }
        export let acc_stmt_obj = {
            acc_stmt_name:null,
            acc_stmt_url:null,
            acc_stmt_verified:null,
            acc_stmt_rejected:null,
            acc_stmt_num:null,
            acc_stmt_type:null
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
        let bank_details_res,
        facility_modified_date,facility_created_date,facility_doc_date;
        // let client_det_res;
        export let bank_new_date;
        let client_det_arr=[];
        let gst_doc_arr=[];
        // $: cheque_date = new Date();
        let file_data;
        let showbtn = 0;
        let cheque_data;
        let selectTag,addRemark,selectsearch;
        let facility_address,facility_postal,facility_password,city,location_id,status_name;
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
        let image_path;
        export let is_adhoc_facility;
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

        onMount(async () => {
            console.log("bank values from stoer",bank_values_from_store)
        let cheque_details_res = await cheque_details();
        try{
            
            if(cheque_details_res.body.status == "green" && cheque_details_res != "null"){
            
            $cheque_data_to_store.cheque_details_data = cheque_details_res.body.data;
            
            cheque_data_to_store.subscribe((value) => {
                cheque_values_from_store = value.cheque_details_data;
            });
            }
            // console.log("cheque_values_from_store",cheque_values_from_store)
            // cheque_values_from_store=cheque_values_from_store
        }
        catch(err) {
           
            toast_type = "error";
            toast_text = err;
            
        }
        });
        function chequeDetails() {
        chequeModel.style.display = "block";
        }

        function closechequeDetails() {
            chequeModel.style.display = "none";
            
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
            reject_doc = "can_cheque"
            approve_doc = "can_cheque"
            image_path = $page.url.origin+can_cheque_obj.can_cheque_url;
            // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+can_cheque_obj.can_cheque_url);
            alt_image = "cancel cheque proof";
        }
        else if(data == "blk_cheque"){
            reject_doc = "blk_cheque"
            approve_doc = "blk_cheque"
            image_path = $page.url.origin+blk_cheque_obj.blk_cheque_url;
            alt_image = "blank cheque proof";
        }
        else if(data == "passbook"){
            reject_doc = "passbook"
            approve_doc = "passbook"
            image_path = $page.url.origin+passbook_obj.passbook_url;
            alt_image = "passbook proof";
        }
        else if(data == "acc_stmt"){
            reject_doc = "acc_stmt"
            approve_doc = "acc_stmt"
            image_path = $page.url.origin+acc_stmt_obj.acc_stmt_url;
            alt_image = "account statement proof";
        }
        else if(data == "cheque_disp"){
            for(let i=0;i<cheque_values_from_store.length;i++){
                if(cheque_values_from_store[i].cheque_number == doc_number){
                    image_path = $page.url.origin+cheque_values_from_store[i].file_url;
                    // document.getElementById("img_model_url").getAttribute('src',$page.url.origin+cheque_values_from_store[i].cheque_url);
                    alt_image = "cheque proof";
                }
            }
           
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

    async function docApproveRejected(doc_cat,doc_name){
    
    let document_load,new_status,new_doc_name
    if(doc_name.reject_doc){
            new_doc_name = doc_name.reject_doc;
        }
        else if(doc_name.approve_doc){
            new_doc_name = doc_name.approve_doc;
        }
    console.log("doc_cat",doc_cat)
    show_spinner = true;
    if(doc_cat == "approve"){
        new_status="DV"
    }
    else if(doc_cat == "reject"){
        new_status="RJ"
    }

    if(new_doc_name == "can_cheque"){
        document_load = {
        "resource_id":$facility_id.facility_id_number,
        "doc_number":can_cheque_obj.can_cheque_num,
        "status_type":new_status,
        "status":"true",
        "doc_type":can_cheque_obj.can_cheque_type
        }
    }
    else if(new_doc_name == "blk_cheque"){
        document_load = {
        "resource_id":$facility_id.facility_id_number,
        "doc_number":blk_cheque_obj.blk_cheque_num,
        "status_type":new_status,
        "status":"true",
        "doc_type":blk_cheque_obj.blk_cheque_type
        }
    }
    else if(new_doc_name == "acc_stmt"){
        document_load = {
        "resource_id":$facility_id.facility_id_number,
        "doc_number":acc_stmt_obj.acc_stmt_num,
        "status_type":new_status,
        "status":"true",
        "doc_type":acc_stmt_obj.acc_stmt_type
        }
    }
    else if(new_doc_name == "passbook"){
        document_load = {
        "resource_id":$facility_id.facility_id_number,
        "doc_number":passbook_obj.passbook_num,
        "status_type":new_status,
        "status":"true",
        "doc_type":passbook_obj.passbook_type
        }
    }
    let doc_res = await approve_reject_status(document_load)
    
    try{
        if(doc_res.body.status == "green"){
            show_spinner = false;
            // toast_text = doc_res.body.message;
            // toast_type = "success";
            success_toast(doc_res.body.message)


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
                // toast_type = "error";
                // toast_text = err;
                error_toast(err)

                closeApproveViewModel();
            }
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
            file_data = reader.result;
            console.log("reader",reader.result);
            
            if(doctext == "gst_upload"){
                gst_data = reader.result;
                // console.log("photo_data",reader.result);
                // toast_text = "Photo Uploaded Successfully";
                // toast_type = "success";
                success_toast("Photo Uploaded Successfully")

            }
            else if(doctext == "cheque_upload"){
                cheque_data = reader.result;
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
    };
        
    }
    
    async function cheque_button_click() {
        // show_spinner = true;
        let new_cheque_date = new Date(cheque_date)
        if(!bank_name.match(text_pattern)){
        bank_name_message = "Invalid Bank Name";
        return
        }
        if(!type){
            type_message = "Invalid type";
            return;
        }
        else{
            type_message= "";
        }
        if(!cheque_date){
            cheque_date_message = "Invalid Cheque Date";
            return;
        }
        else{
            cheque_date_message = "";
        }
        if(!cheque_number || isNaN(cheque_number)){
            cheque_number_message = "Invalid Cheque Number";
            return;
        }
        else{
            cheque_number_message=""
        }
        if(!amount || isNaN(amount)){
            amount_message = "Invalid Amount";
            return;
            
        }
        else{
            amount_message=""
        }
        
        if(!checkupload){
            cheque_upload_message = "Invalid Cheque Upload"
            return;
        }
        else{
            cheque_upload_message = "";
        }
        
            const cheque_details_form = {
                bank_name,
                type,
                cheque_date:(get_date_format(new_cheque_date,"yyyy-mm-dd")),
                cheque_number,
                amount,
                recrun_number,
                file_number,
                file_data,
                file_name:img_name,
                facility_id:($facility_id.facility_id_number),
            };
            let cheque_add_res = await addnew_cheque_details(cheque_details_form);
            // console.log("cheque_add_res",cheque_add_res);
            try{
                show_spinner = true;
                if(cheque_add_res.body.status== "green"){
                    show_spinner = false;
                    // toast_text = "Cheque Details Added Successfully";
                    // toast_type = "success";
                    success_toast("Cheque Details Added Successfully")

                    let cheque_details_res = await cheque_details();
                    try{
                        if(cheque_details_res.body.status == "green" && cheque_details_res != "null"){
                        
                        $cheque_data_to_store.cheque_details_data = cheque_details_res.body.data;
                        
                        cheque_data_to_store.subscribe((value) => {
                            cheque_values_from_store = value.cheque_details_data;
                        });
                        }
                        
                        // cheque_values_from_store=cheque_values_from_store
                    }
                    catch(err) {
                        show_spinner = false;
                        // toast_type = "error";
                        // toast_text = err;
                        error_toast(err)
                    }

                }
                else if(cheque_add_res.body.status == "red"){
                    show_spinner = false;
                    // toast_type = "error";
                    // toast_text = cheque_add_res.body.message;
                    error_toast(cheque_add_res.body.message)
                }
                else{
                    show_spinner = false;
                    // toast_text = "Error in Adding Cheque Details";
                    // toast_type = "danger";
                    error_toast("Error in Adding Cheque Details")
                }

            }
            catch(err){
                show_spinner = false;
                // toast_text = "Error in Adding Cheque Details";
                // toast_type = "danger";
                error_toast(err)

            }
    }
    
    </script>
    {#if show_spinner}
        <Spinner />
    {/if}
 
 <!-- Bank Details -->

 <div class="bg-white w-full Bank_Details_Section ">
     <div class="detailsHeader_summary ">
         <div class="right flex justify-between w-full items-center py-2 xsl:flex-wrap">
             <div>
                 <!-- <p class="verifyText"><img src="{$img_url_name.img_name}/timer.png" alt="" class="pr-1">
                     Verification Pending</p> -->
                     {#if !bank_values_from_store}
                            <p></p>
                             {:else}
                             {#if bank_values_from_store.approved == "1"}
                             
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
                             
                             <p class="statusContent font-normal xs:w-5/12">
                                 <img
                                     src="{$img_url_name.img_name}/timer.png"
                                     class="pr-2"
                                     alt=""
                                 />Bank Verification Pending
                             </p>
                             {/if} 
                         {/if}  
             </div>
             {#if bank_values_from_store.modified_by == "-" && bank_new_date =="-"}
             <p class="flex items-center smButtonText">
                <!-- <a href="" class="smButton bg-erBlue text-white" on:click={()=>{goto("bankdetails")}}>
                    Edit
                </a> -->
                <button class="smButton bg-erBlue text-white" on:click={()=>{
                    $documents_store.documents=[];
                    goto("bankdetails")}}>
                   Edit
                </button>
            </p>
             {:else}
             <div class="flex">
                 <p class="detailsUpdate mr-4">
                     <span><span class="font-medium">Last updated -> </span> {#if !bank_new_date} <p>-</p> {:else}{bank_new_date}{/if} <span
                             class="font-medium"> By -> </span> {#if !bank_values_from_store.modified_by}<p>-</p>{:else}{bank_values_from_store.modified_by}{/if}</span>
                 </p>
                 <p class="flex items-center smButtonText">
                     <!-- <a href="" class="smButton bg-erBlue text-white" on:click={()=>{goto("bankdetails")}}>
                         Edit
                     </a> -->
                     <button class="smButton bg-erBlue text-white" on:click={()=>{
                         $documents_store.documents=[];
                         goto("bankdetails")}}>
                        Edit
                     </button>
                 </p>
             </div>
             {/if}
         </div>
     </div>

     <div class="grid grid-cols-3 gap-4 pb-5 xsl:grid-cols-1" >

         <div class="Bank_DetailsColFirst" style="border-right: 1px solid lightgray">
            
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/bank.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Bank Name</p>
                         <p class="detailData">{bank_values_from_store.bank_name}</p>
                     </div>
                 </div>

             </div>
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/account.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Account Number</p>
                         <p class="detailData">{bank_values_from_store.account_number}</p>
                     </div>
                 </div>

             </div>
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/account.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">IFSC Code</p>
                         <p class="detailData">{bank_values_from_store.ifsc_code}</p>
                     </div>
                 </div>

             </div>
             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/pincode.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Branch</p>
                         <p class="detailData">{bank_values_from_store.branch_name} - {bank_values_from_store.branch_pin_code}</p>
                     </div>
                 </div>
             </div>

             <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/account.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Bank Type</p>
                         <p class="detailData">{bank_values_from_store.bank_type}</p>
                     </div>
                 </div>

             </div>
             <!-- <div class="userInfoSec3 ">
                 <div class="flex items-start">
                     <img src="{$img_url_name.img_name}/pincode.png" alt="">
                     <div class="pl-4">
                         <p class="detailLbale">Branch</p>
                         <p class="detailData">{bank_values_from_store.branch_name} - {bank_values_from_store.branch_pin_code}</p>
                     </div>
                 </div>
             </div> -->
            
         </div>

         <div class="Bank_DetailsColSec">
             <div class="px-5 py-4 text-erBlue font-medium">
                 <label for="">Documents</label>
             </div>

             <div class="userInfoSecPadding">
                 <div class="wrapperInfoFirst">
                     <div class="flex items-start justify-between w-full">
                         <div class="flex">
                             <img src="{$img_url_name.img_name}/bankdoc.png" alt="">
                             <div class="pl-4">
                                 <p class="detailLbale">Bank Document</p>
                             </div>
                         </div>
                         {#if is_adhoc_facility == false}
                         <div class="pl-4">
                             <p class="flex items-center smButtonText" on:click={chequeDetails}>
                                 <a href="" class="smButton">
                                     Cheque Details
                                 </a>
                             </p>

                         </div>
                        {/if}
                     </div>

                 </div>
                 <div class="attachment mt-5">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                         <div class="pl-4 flex items-center w-full justify-between mb-3">
                             <p class="detailLbale">Cancel Cheque Attachment</p>
                             {#if can_cheque_obj.can_cheque_rejected == "1"}
                             <p class="rejectText pr-3">
                                 <img
                                     src="{$img_url_name.img_name}/reject.png"
                                     alt=""
                                     class="pr-2"
                                 /> Rejected
                             </p>
                             {:else if can_cheque_obj.can_cheque_verified == "1"}
                             
                                 <p class="verifiedTextGreen pr-3">
                                     <img
                                         src="{$img_url_name.img_name}/checked.png"
                                         alt=""
                                         class="pr-1"
                                     />
                                     Verified
                                 </p>
                            
                             {:else if can_cheque_obj.can_cheque_verified == "0" && can_cheque_obj.can_cheque_rejected == "0"}
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
                    </div>
                     
                 </div>
                 <div class="wrapperInfo ">
                     <div class="flex items-start">
                         <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                         <div class="pl-4 flex items-center">
                            
                            {#if can_cheque_obj.can_cheque_name == null}
                            <p>Not Provided</p>
                            {:else}
                            <img src={$page.url.origin+can_cheque_obj.can_cheque_url} class="w-5 mr-2" alt="">
                             <p class="detailLbale">{can_cheque_obj.can_cheque_name}</p>
                             {/if}
                         </div>
                     </div>
                     <div class="userStatus ">
                         <p class="verifyText">
                             {#if can_cheque_obj.can_cheque_url}
                             <a href="" class="smButton">
                                 <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("can_cheque")}}">
                             </a>
                             {/if}
                         </p>
                     </div>
                 </div>

                 <div class="attachment mt-5">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center w-full justify-between mb-3">
                            <p class="detailLbale">Blank Cheque Attachment</p>
                            {#if blk_cheque_obj.blk_cheque_rejected == "1"}
                            <p class="rejectText pr-3">
                                <img
                                    src="{$img_url_name.img_name}/reject.png"
                                    alt=""
                                    class="pr-2"
                                /> Rejected
                            </p>
                            {:else if blk_cheque_obj.blk_cheque_verified == "1"}
                            
                                <p class="verifiedTextGreen pr-3">
                                    <img
                                        src="{$img_url_name.img_name}/checked.png"
                                        alt=""
                                        class="pr-1"
                                    />
                                    Verified
                                </p>
                           
                            {:else if blk_cheque_obj.blk_cheque_verified == "0" && blk_cheque_obj.blk_cheque_rejected == "0"}
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
                    </div>
                    
                </div>
                <div class="wrapperInfo ">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center">
                           
                           {#if blk_cheque_obj.blk_cheque_name == null}
                           <p>Not Provided</p>
                           {:else}
                           <img src={$page.url.origin+blk_cheque_obj.blk_cheque_url} class="w-5 mr-2" alt="">
                            <p class="detailLbale">{blk_cheque_obj.blk_cheque_name}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            {#if blk_cheque_obj.blk_cheque_url}
                            <a href="" class="smButton">
                                <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("blk_cheque")}}">
                            </a>
                            {/if}
                        </p>
                    </div>
                </div>

                <div class="attachment mt-5">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center  w-full justify-between mb-3">
                            <p class="detailLbale">Passbook Attachment</p>
                            {#if passbook_obj.passbook_rejected == "1"}
                            <p class="rejectText pr-3">
                                <img
                                    src="{$img_url_name.img_name}/reject.png"
                                    alt=""
                                    class="pr-2"
                                /> Rejected
                            </p>
                            {:else if passbook_obj.passbook_verified == "1"}
                            
                                <p class="verifiedTextGreen pr-3">
                                    <img
                                        src="{$img_url_name.img_name}/checked.png"
                                        alt=""
                                        class="pr-1"
                                    />
                                    Verified
                                </p>
                           
                            {:else if passbook_obj.passbook_verified == "0" && passbook_obj.passbook_rejected == "0"}
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
                    </div>
                    
                </div>
                <div class="wrapperInfo ">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center">
                           
                           {#if passbook_obj.passbook_name == null}
                           <p>Not Provided</p>
                           {:else}
                           <img src={$page.url.origin+passbook_obj.passbook_url} class="w-5 mr-2" alt="">
                            <p class="detailLbale">{passbook_obj.passbook_name}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            {#if passbook_obj.passbook_url}
                            <a href="" class="smButton">
                                <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("passbook")}}">
                            </a>
                            {/if}
                        </p>
                    </div>
                </div>

                <div class="attachment mt-5">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center  w-full justify-between mb-3">
                            <p class="detailLbale">Account Statement Attachment</p>
                            {#if acc_stmt_obj.acc_stmt_rejected == "1"}
                            <p class="rejectText pr-3">
                                <img
                                    src="{$img_url_name.img_name}/reject.png"
                                    alt=""
                                    class="pr-2"
                                /> Rejected
                            </p>
                            {:else if acc_stmt_obj.acc_stmt_verified == "1"}
                            
                                <p class="verifiedTextGreen pr-3">
                                    <img
                                        src="{$img_url_name.img_name}/checked.png"
                                        alt=""
                                        class="pr-1"
                                    />
                                    Verified
                                </p>
                           
                            {:else if acc_stmt_obj.acc_stmt_verified == "0" && acc_stmt_obj.acc_stmt_rejected == "0"}
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
                    </div>
                    
                </div>
                <div class="wrapperInfo ">
                    <div class="flex items-start">
                        <img src="{$img_url_name.img_name}/addressproof.png" class="invisible" alt="">
                        <div class="pl-4 flex items-center">
                           
                           {#if acc_stmt_obj.acc_stmt_name == null}
                           <p>Not Provided</p>
                           {:else}
                           <img src={$page.url.origin+acc_stmt_obj.acc_stmt_url} class="w-5 mr-2" alt="">
                            <p class="detailLbale">{acc_stmt_obj.acc_stmt_name}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="userStatus ">
                        <p class="verifyText">
                            {#if acc_stmt_obj.acc_stmt_url}
                            <a href="" class="smButton">
                                <img src="{$img_url_name.img_name}/view.png" alt="" on:click="{()=>{openViewModel("acc_stmt")}}">
                            </a>
                            {/if}
                        </p>
                    </div>
                </div>





             </div>
            
         </div>
         

     </div> 
  
 </div>
<!-- Cheque Details modal -->

<div class="hidden" id="chequeModel">
    <div class=" viewDocmodal  " id="modal-id">
        <div class="bglightcolormodal" />
        <div class="allDocmodalsuccessbody rounded-lg">
            <div class="">
                <div class="viewDocPanmainbodyModal">
                    <div class="flex justify-between mb-3">
                        <div class="leftmodalInfo">
                            <p class="text-lg text-erBlue font-medium  ">
                                <span class=""> Cheque Details </span>
                            </p>
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
                        <button
                            class="rightmodalclose"
                            on:click={closechequeDetails}
                        >
                            <img src="{$img_url_name.img_name}/blackclose.svg" alt="" />
                    </button>
                    </div>
                    <div class="innermodal">
                        <hr />
                        <div class="scrollbar ">
                            <div class="mainContainerWrapper ">
                                <div class="DocCardlist ">
                                    {#if !cheque_values_from_store}
                                    <p>No Cheque Details found</p>
                                    {:else}
                                    {#each cheque_values_from_store as new_cheque}
                                        <div class="cardDocWrapper ">
                                            <div
                                                class="grid grid-cols-2 xs:grid-cols-1 gap-4"
                                            >
                                                <div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Bank Name
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.bank_name}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Cheque Type
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.type}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Cheque Date
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.cheque_date}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Cheque Number
                                                        </div>
                                                        <div class="detailData">
                                                            {new_cheque.cheque_number}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Amount
                                                        </div>
                                                        <div class="detailData">
                                                            Rs {new_cheque.amount}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            Recrun Number
                                                        </div>
                                                        <div class="detailData">
                                                            {#if new_cheque.recrun_number == "" || new_cheque.recrun_number == null}
                                                                <p>-</p>
                                                            {:else}
                                                                {new_cheque.recrun_number}
                                                            {/if}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="grid grid-cols-2 gap-4 mb-1"
                                                    >
                                                        <div
                                                            class="detailLbale"
                                                        >
                                                            View Cheque
                                                        </div>
                                                        <div
                                                            class="userStatus "
                                                        >
                                                            <p
                                                                class="verifyText"
                                                            >
                                                                <a
                                                                    href=""
                                                                    class="smButton"
                                                                >
                                                                    <img
                                                                        src="{$img_url_name.img_name}/view.png"
                                                                        alt="cheque img" on:click="{()=>{openViewModel("cheque_disp",new_cheque.cheque_number)}}"
                                                                    />
                                                                </a>
                                                                
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                    {/if}
                                </div>
                                <div class="addDocumentSection ">
                                    <div class="addSecform hidden">
                                        <div
                                            class="addButtonSection my-3 py-16 text-center hidden"
                                        >
                                            <div class="updateAction">
                                                <button class="ErBlueButton"
                                                    >Add New GST Details</button
                                                >
                                            </div>
                                        </div>
                                        <div class="my-3 py-4 px-4 ">
                                            <p class="text-lg font-medium">
                                                Add new GST details
                                            </p>

                                            <div
                                                class="flex  py-1 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    Address
                                                </div>
                                                <div class="formInnerGroup">
                                                    <input
                                                        class="inputboxcursortext"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-3 items-center flex-wrap"
                                            >
                                                <div class="light14grey mb-1">
                                                    City
                                                </div>
                                                <div class="formInnerGroup ">
                                                    <select
                                                        class="inputboxpopover"
                                                        bind:value={gst_city_select}
                                                    >
                                                        <option class="pt-6"
                                                            >Select</option
                                                        >
                                                        {#each city_data as new_city}
                                                        <option class="pt-6"
                                                            >{new_city}</option
                                                        >
                                                        {/each}
                                                    </select>
                                                    <div
                                                        class="formSelectArrow "
                                                    >
                                                        <img
                                                            src="{$img_url_name.img_name}/selectarrow.png"
                                                            class="w-5 h-auto"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="flex  py-1 items-center flex-wrap"
                                            >
                                                <div class="light14grey  mb-1">
                                                    GST State
                                                </div>
                                                <div class="formInnerGroup">
                                                    <input
                                                        class="inputboxcursortext"
                                                        type="text"
                                                    />
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
                                                            type="file"
                                                            class="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div
                                                class="flex items-center justify-end mt-5"
                                            >
                                                <div
                                                    class="updateAction text-erBlue"
                                                >
                                                    Cancel
                                                </div>
                                                <div class="updateAction ml-5">
                                                    <button class="ErBlueButton"
                                                        >Upload</button
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class=" bg-lighterGrey rounded-lg h-full"
                                    >
                                        {#if temp6 == "cheque"}
                                            <div
                                                class="addButtonSection my-3 py-3  text-center"
                                            >
                                                <div
                                                    class="updateAction mt-5"
                                                    on:click={() => {
                                                        temp6 = "cheque-2";
                                                    }}
                                                >
                                                    <button class="ErBlueButton"
                                                        >Add New Cheque Details</button
                                                    >
                                                </div>
                                            </div>
                                        {/if}

                                        {#if temp6 == "cheque-2"}
                                            <div class="my-0 py-4 px-4 ">
                                                <div
                                                    class="h-80 max-h-80 overflow-y-scroll pr-4 border-b-2"
                                                >
                                                    <p
                                                        class="text-lg font-medium"
                                                    >
                                                        Add New Cheque Details
                                                    </p>

                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Bank Name
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <!-- <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                        </select> -->
                                                            <input
                                                                type="text"
                                                                class="inputboxcursortext"
                                                                bind:value={bank_name}
                                                            />
                                                            <div class="text-red-500">{bank_name_message}</div>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Cheque Type
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <!-- <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                        </select> -->
                                                            <select
                                                                class="inputboxpopover"
                                                                bind:value={type}
                                                            >
                                                                <option
                                                                    value="-1"
                                                                    >Select</option
                                                                >
                                                                <option
                                                                    value="Crossed Cheque"
                                                                    >Crossed
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Bearer Cheque"
                                                                    >Bearer
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Order Cheque"
                                                                    >Order
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Open cheque"
                                                                    >Open cheque</option
                                                                >
                                                                <option
                                                                    value="Post-Dated Cheque"
                                                                    >Post-Dated
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Stale Cheque"
                                                                    >Stale
                                                                    Cheque</option
                                                                >
                                                                <option
                                                                    value="Self Cheque"
                                                                    >Self Cheque</option
                                                                >
                                                                <option
                                                                    value="Banker’s Cheque"
                                                                    >Banker’s
                                                                    Cheque</option
                                                                >
                                                            </select>
                                                            <div class="text-red-500">{type_message}</div>
                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14grey mb-1"
                                                        >
                                                            Cheque Date
                                                        </div>
                                                        <div
                                                            class="formInnerGroup "
                                                        >
                                                            <!-- <select class="inputboxpopover">
                                                            <option class="pt-6">Select</option>
                                                        </select> -->
                                                            <DateInput
                                                                class="inputboxpopover"
                                                                placeholder="Cheque Date"
                                                                format="dd/MM/yyyy"
                                                                bind:value={cheque_date}
                                                            />
                                                            <div class="text-red-500">{cheque_date_message}</div>

                                                            <div
                                                                class="formSelectArrow "
                                                            >
                                                                <img
                                                                    src="{$img_url_name.img_name}/selectarrow.png"
                                                                    class="w-5 h-auto"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Cheque Number
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxcursortext"
                                                                type="text"
                                                                bind:value={cheque_number}
                                                            />
                                                            <div class="text-red-500">{cheque_number_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Amount
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                                bind:value={amount}
                                                            />
                                                            <div class="text-red-500">{amount_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Recrun Number
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxcursortext"
                                                                type="text"
                                                                bind:value={recrun_number}
                                                            />
                                                            <div class="text-red-500">{recrun_number_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-1 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            File Number
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <input
                                                                class="inputboxpopover"
                                                                type="text"
                                                                bind:value={file_number}
                                                            />
                                                            <div class="text-red-500">{file_number_message}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex  py-3 items-center flex-wrap"
                                                    >
                                                        <div
                                                            class="light14greylong  mb-1"
                                                        >
                                                            Upload Cheque
                                                        </div>
                                                        <div
                                                            class="formInnerGroup"
                                                        >
                                                            <label
                                                                class="cursor-pointer flex"
                                                            >
                                                                <div
                                                                    class="ErBlueButton"
                                                                >
                                                                    Select File
                                                                </div>
                                                                <!-- <input type="file" class="hidden"  bind:value={upload_cheque}> -->
                                                                <input
                                                                    type="file"
                                                                    class="hidden"
                                                                    on:change={(
                                                                        e
                                                                    ) =>
                                                                        onFileSelected(
                                                                            e,"cheque_upload"
                                                                        )}
                                                                        bind:value = "{checkupload}"
                                                                />
                                                                <div class="text-red-500">{cheque_upload_message}</div>
                                                            </label>
                                                            <p>{cheque_img}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="flex items-center justify-end mt-5"
                                                >
                                                    <div
                                                        class="updateAction text-erBlue"
                                                        on:click={() => {
                                                            temp6 = "cheque";
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                    <div
                                                        class="updateAction ml-5"
                                                    >
                                                        <button
                                                            class="ErBlueButton"
                                                            on:click={cheque_button_click}
                                                            >Submit</button
                                                        >
                                                    </div>
                                                </div>
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
    </div>
</div>
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
                <button type="button" class="btnreject px-pt21 py-p9px bg-bgmandatorysign text-white rounded-br5 font-medium mr-2" on:click={()=>{docApproveRejected("reject",{reject_doc})}}>Reject</button>
                <button type="button" class="btnApprove px-pt21 py-p9px bg-bgGreenApprove text-white rounded-br5 font-medium mr-2" on:click={()=>{docApproveRejected("approve",{approve_doc})}}>Approve</button>
       
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
<Toast type={toast_type}  text={toast_text}/>
<SvelteToast />